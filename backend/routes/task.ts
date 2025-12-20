import { Router } from 'express';
import * as TaskController from '../controllers/task.controller.js';

const router = Router();

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.addTask);
router.delete('/:id', TaskController.deleteTask);

export default router;
