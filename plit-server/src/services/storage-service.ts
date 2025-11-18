import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export class StorageService {
  private storagePath: string;

  constructor() {
    this.storagePath = process.env.LOCAL_STORAGE_PATH || path.join(process.cwd(), 'storage');
  }

  async saveAudio(versionId: string, audioBuffer: Buffer): Promise<string> {
    const audioDir = path.join(this.storagePath, 'audio');
    await mkdir(audioDir, { recursive: true });

    const filename = `${versionId}.mp3`;
    const filepath = path.join(audioDir, filename);

    await writeFile(filepath, audioBuffer);

    return `/storage/audio/${filename}`;
  }

  async saveImage(contentId: string, imageBuffer: Buffer, index: number): Promise<string> {
    const imageDir = path.join(this.storagePath, 'images', contentId);
    await mkdir(imageDir, { recursive: true });

    const filename = `frame_${String(index).padStart(3, '0')}.jpg`;
    const filepath = path.join(imageDir, filename);

    await writeFile(filepath, imageBuffer);

    return `/storage/images/${contentId}/${filename}`;
  }

  async getAudioPath(versionId: string): Promise<string> {
    return path.join(this.storagePath, 'audio', `${versionId}.mp3`);
  }

  async getImagePath(contentId: string, filename: string): Promise<string> {
    return path.join(this.storagePath, 'images', contentId, filename);
  }
}
