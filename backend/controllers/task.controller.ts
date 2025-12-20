import { Request, Response } from 'express';
import * as TaskService from '../services/task.service.js';

export function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = TaskService.getTasks();
    console.log({ tasks });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export function addTask(req: Request, res: Response) {
  try {
    const task = TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid task data' });
  }
}

export function deleteTask(req: Request, res: Response) {
  try {
    TaskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
