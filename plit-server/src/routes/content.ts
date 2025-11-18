import { Router, type Router as RouterType } from 'express';
import { ContentController } from '../controllers/content-controller.js';

export const contentRouter: RouterType = Router();
const controller = new ContentController();

contentRouter.post('/create', controller.create);
contentRouter.get('/:id', controller.getById);
contentRouter.get('/:id/versions', controller.getVersions);
contentRouter.get('/:id/script', controller.getScript);
contentRouter.put('/:id/script', controller.updateScript);
contentRouter.post('/:id/generate-voice', controller.generateVoice);
contentRouter.post('/:id/publish', controller.publish);
contentRouter.get('/:id/metadata', controller.getMetadata);
