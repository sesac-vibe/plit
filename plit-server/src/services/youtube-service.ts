import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { Innertube } from 'youtubei.js';

const execAsync = promisify(exec);

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
}

export class YouTubeService {
  async getVideoInfo(url: string): Promise<VideoInfo> {
    try {
      const videoId = this.extractVideoId(url);
      const youtube = await Innertube.create();
      const info = await youtube.getInfo(videoId);

      return {
        title: info.basic_info.title || `Video ${videoId}`,
        thumbnail: info.basic_info.thumbnail?.[0]?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: info.basic_info.duration || 0,
      };
    } catch (error) {
      console.error('Failed to fetch video info:', error);
      const videoId = this.extractVideoId(url);
      return {
        title: `Video ${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: 0,
      };
    }
  }

  async extractSubtitles(url: string, contentId: string): Promise<string> {
    const outputDir = path.join(process.cwd(), 'storage', 'subtitles');
    await fs.mkdir(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, contentId);

    console.log(`Downloading subtitles for: ${url}`);

    try {
      await execAsync(
        `yt-dlp --skip-download --write-auto-sub --sub-lang en,ko --sub-format vtt --output "${outputPath}" "${url}"`
      );

      const files = await fs.readdir(outputDir);
      const vttFiles = files.filter(f => f.startsWith(contentId) && f.endsWith('.vtt'));

      if (vttFiles.length === 0) {
        throw new Error('No subtitle files found');
      }

      const vttPath = path.join(outputDir, vttFiles[0]);
      const segments = await this.parseVTTSubtitles(vttPath);
      const fullText = segments.map(seg => seg.text).join(' ');

      await fs.unlink(vttPath);

      console.log(`Successfully extracted ${fullText.length} characters from subtitles`);
      return fullText;
    } catch (error) {
      throw new Error('Could not fetch subtitles for this video. The video may not have any captions available, or they may be disabled.');
    }
  }

  private async parseVTTSubtitles(vttPath: string): Promise<Array<{ text: string }>> {
    const content = await fs.readFile(vttPath, 'utf-8');
    const segments: Array<{ text: string }> = [];
    const lines = content.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (line.includes('-->')) {
        i++;
        const textLines: string[] = [];

        while (i < lines.length && lines[i].trim() !== '') {
          const text = lines[i].trim();
          if (!text.startsWith('<') && text !== '') {
            textLines.push(text);
          }
          i++;
        }

        if (textLines.length > 0) {
          segments.push({
            text: textLines.join(' ').replace(/<[^>]*>/g, ''),
          });
        }
      }

      i++;
    }

    return segments;
  }

  private extractVideoId(url: string): string {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : '';
  }
}
