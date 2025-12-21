import { Router } from 'express';
import * as TagController from '../controllers/tag.controller.js';

const router = Router();

router.get('/', TagController.getAllTags);
router.post('/', TagController.addTag);
router.delete('/:id', TagController.deleteTag);

export default router;
