import { Router } from 'express';
import * as TaskController from '../controllers/task.controller.js';

const router = Router();

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.getAllTasks);
router.delete('/:id', TaskController.getAllTasks);

export default router;
