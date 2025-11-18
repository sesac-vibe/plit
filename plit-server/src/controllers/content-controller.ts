import { Request, Response } from 'express';
import { ContentService } from '../services/content-service.js';
import { z } from 'zod';

const createContentSchema = z.object({
  userId: z.string(),
  youtubeUrl: z.string().url(),
});

const updateScriptSchema = z.object({
  versionId: z.string(),
  chapters: z.array(z.object({
    id: z.string(),
    title: z.string(),
    segments: z.array(z.object({
      id: z.string(),
      text: z.string(),
    })),
  })),
});

export class ContentController {
  private service: ContentService;

  constructor() {
    this.service = new ContentService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const body = createContentSchema.parse(req.body);
      const content = await this.service.createContent(body.userId, body.youtubeUrl);
      res.json(content);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const content = await this.service.getContentById(req.params.id);
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
      return res.json(content);
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  getVersions = async (req: Request, res: Response) => {
    try {
      const versions = await this.service.getVersions(req.params.id);
      res.json(versions);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  getScript = async (req: Request, res: Response) => {
    try {
      const script = await this.service.getScript(req.params.id);
      res.json(script);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  updateScript = async (req: Request, res: Response) => {
    try {
      const body = updateScriptSchema.parse(req.body);
      const updated = await this.service.updateScript(body.versionId, body.chapters);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  generateVoice = async (req: Request, res: Response) => {
    try {
      const { versionId, voice } = req.body;
      await this.service.generateVoice(versionId, voice);
      res.json({ status: 'started' });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  publish = async (req: Request, res: Response) => {
    try {
      const { versionId } = req.body;
      const published = await this.service.publish(versionId);
      res.json(published);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  getMetadata = async (req: Request, res: Response) => {
    try {
      const metadata = await this.service.getMetadata(req.params.id);
      res.json(metadata);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
}
