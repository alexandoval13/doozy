import { Router } from 'express';
import taskRoutes from './task.js';
import storyRoutes from './stories.js';
import tagRoutes from './tags.js';

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/stories', storyRoutes);
router.use('/tags', tagRoutes);

export default router;
