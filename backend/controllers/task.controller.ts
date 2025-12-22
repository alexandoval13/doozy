import { Request, Response } from 'express';
import * as TaskService from '../services/task.service.js';

export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await TaskService.getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function addTask(req: Request, res: Response) {
  try {
    const newTask = await TaskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Invalid task data' });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const udpatedTask = await TaskService.updateTask(req.params.id, req.body);
    res.status(204).json(udpatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    await TaskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
