import Database from 'better-sqlite3';
import * as TaskRepo from '../repositories/task.repo.js';
import { runEngine } from '../run_engine.js';

async function calculatePriority(
  data: TaskRepo.PriorityData
): Promise<TaskRepo.Task['task_priority']> {
  const defaultPriority = 1;
  try {
    return await runEngine(data);
  } catch (error) {
    console.error('Failed to calculate priority. Error: ', error);
    return defaultPriority;
  }
}

export function getTasks() {
  return TaskRepo.getAllTasks();
}

export async function createTask(data: TaskRepo.CreateTaskInput) {
  const { effort, urgency, due_date } = data;

  const taskPriority = await calculatePriority({
    date: new Date(),
    urgency,
    effort,
    due_date,
  });

  return TaskRepo.createTask({ ...data, task_priority: taskPriority });
}

export function deleteTask(id: string): Database.RunResult {
  return TaskRepo.deleteTask(id);
}
