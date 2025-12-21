import Database from 'better-sqlite3';
import * as TaskRepo from '../repositories/task.repo.js';
import { runEngine } from '../run_engine.js';

async function calculatePriority(
  data: TaskRepo.PriorityData
): Promise<{ task_priority: number; category: string }> {
  const defaultResult = { task_priority: 1, category: 'today' };

  try {
    const { priority, category } = await runEngine(data);

    return {
      task_priority: Number(priority),
      category,
    };
  } catch (err) {
    console.error('Failed to calculate priority. Error: ', err);
    return defaultResult;
  }
}

export async function getTasks() {
  return TaskRepo.getAllTasks();
}

export async function createTask(data: TaskRepo.CreateTaskInput) {
  const { title, effort, urgency, due_date = null } = data;

  const { task_priority } = await calculatePriority({
    date: new Date(),
    urgency,
    effort,
    due_date,
  });

  return TaskRepo.createTask({
    title,
    urgency,
    effort,
    task_priority,
    due_date,
    completed: 0, // false
    story_id: null,
  });
}

export async function deleteTask(id: string): Promise<Database.RunResult> {
  return TaskRepo.deleteTask(id);
}
