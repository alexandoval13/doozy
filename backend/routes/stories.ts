import { Router } from 'express';
import * as StoryController from '../controllers/story.controller.js';

const router = Router();

router.get('/', StoryController.getAllStories);
router.post('/', StoryController.createStory);
router.delete('/:id', StoryController.deleteStory);

export default router;
