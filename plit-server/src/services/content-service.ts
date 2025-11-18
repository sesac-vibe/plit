import { PrismaClient } from '@prisma/client';
import { YouTubeService } from './youtube-service.js';
import { ScriptService } from './script-service.js';
import { TTSService } from './tts-service.js';
import { StorageService } from './storage-service.js';

const prisma = new PrismaClient();

export class ContentService {
  private youtubeService: YouTubeService;
  private scriptService: ScriptService;
  private ttsService: TTSService;
  private storageService: StorageService;

  constructor() {
    this.youtubeService = new YouTubeService();
    this.scriptService = new ScriptService();
    this.ttsService = new TTSService();
    this.storageService = new StorageService();
  }

  async createContent(userId: string, youtubeUrl: string) {
    console.log(`Creating content for URL: ${youtubeUrl}`);
    const videoInfo = await this.youtubeService.getVideoInfo(youtubeUrl);
    console.log(`Video info:`, videoInfo);

    const content = await prisma.content.create({
      data: {
        userId,
        youtubeUrl,
        originalTitle: videoInfo.title,
        thumbnailUrl: videoInfo.thumbnail,
        status: 'processing',
      },
    });

    console.log(`Content created with ID: ${content.id}`);

    this.processContent(content.id, youtubeUrl).catch((error) => {
      console.error(`Failed to process content ${content.id}:`, error);
    });

    return content;
  }

  private async processContent(contentId: string, youtubeUrl: string) {
    try {
      console.log(`Processing content ${contentId}...`);
      console.log(`Extracting subtitles from ${youtubeUrl}...`);
      const subtitles = await this.youtubeService.extractSubtitles(youtubeUrl, contentId);
      console.log(`Extracted ${subtitles.length} characters of subtitles`);

      console.log(`Creating 3 versions...`);
      const versions = await Promise.all([
        this.createVersion(contentId, 5, subtitles),
        this.createVersion(contentId, 15, subtitles),
        this.createVersion(contentId, 30, subtitles),
      ]);
      console.log(`Created ${versions.length} versions`);

      await prisma.content.update({
        where: { id: contentId },
        data: { status: 'ready' },
      });
      console.log(`Content ${contentId} is ready!`);

      return versions;
    } catch (error) {
      console.error(`Error processing content ${contentId}:`, error);
      await prisma.content.update({
        where: { id: contentId },
        data: { status: 'failed' },
      });
      throw error;
    }
  }

  private async createVersion(contentId: string, durationMinutes: number, subtitles: string) {
    const script = await this.scriptService.convertScript(subtitles, durationMinutes);

    const version = await prisma.version.create({
      data: {
        contentId,
        duration: durationMinutes,
      },
    });

    await Promise.all(
      script.chapters.map(async (chapter, chapterIndex) => {
        const chapterRecord = await prisma.chapter.create({
          data: {
            versionId: version.id,
            title: chapter.title,
            startTime: chapter.startTime,
            endTime: chapter.endTime,
            order: chapterIndex,
          },
        });

        await Promise.all(
          chapter.segments.map((segment, segmentIndex) =>
            prisma.segment.create({
              data: {
                chapterId: chapterRecord.id,
                text: segment.text,
                startTime: segment.startTime,
                endTime: segment.endTime,
                order: segmentIndex,
              },
            })
          )
        );

        return chapterRecord;
      })
    );

    await Promise.all(
      script.visuals.map((visual, index) =>
        prisma.visual.create({
          data: {
            versionId: version.id,
            imageUrl: visual.imageUrl,
            triggerTime: visual.triggerTime,
            duration: visual.duration,
            order: index,
          },
        })
      )
    );

    return version;
  }

  async getContentById(id: string) {
    return prisma.content.findUnique({
      where: { id },
      include: {
        versions: {
          include: {
            chapters: {
              include: {
                segments: true,
              },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  async getVersions(contentId: string) {
    return prisma.version.findMany({
      where: { contentId },
      include: {
        chapters: {
          include: {
            segments: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async getScript(contentId: string) {
    const versions = await this.getVersions(contentId);
    return versions;
  }

  async updateScript(_versionId: string, chapters: any[]) {
    await Promise.all(
      chapters.map(async (chapter) => {
        await Promise.all(
          chapter.segments.map((segment: any) =>
            prisma.segment.update({
              where: { id: segment.id },
              data: { text: segment.text },
            })
          )
        );
      })
    );

    return { success: true };
  }

  async generateVoice(versionId: string, voice: string = 'alloy') {
    const version = await prisma.version.findUnique({
      where: { id: versionId },
      include: {
        chapters: {
          include: {
            segments: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!version) {
      throw new Error('Version not found');
    }

    const fullScript = version.chapters
      .flatMap(chapter => chapter.segments)
      .map(segment => segment.text)
      .join(' ');

    const audioBuffer = await this.ttsService.generateSpeech(fullScript, voice);
    const audioUrl = await this.storageService.saveAudio(versionId, audioBuffer);

    await prisma.version.update({
      where: { id: versionId },
      data: { audioUrl },
    });

    return { audioUrl };
  }

  async publish(versionId: string) {
    return prisma.version.update({
      where: { id: versionId },
      data: { isPublished: true },
    });
  }

  async getMetadata(contentId: string) {
    const content = await this.getContentById(contentId);
    if (!content) {
      throw new Error('Content not found');
    }

    return {
      id: content.id,
      title: content.originalTitle,
      thumbnail: content.thumbnailUrl,
      status: content.status,
      versions: content.versions.map(v => ({
        id: v.id,
        duration: v.duration,
        audioUrl: v.audioUrl,
        isPublished: v.isPublished,
        chaptersCount: v.chapters.length,
      })),
    };
  }
}
