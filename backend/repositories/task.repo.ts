import { db } from '../db/connection.js';
import { v4 as uuid } from 'uuid';

export interface Task {
  id: string;
  created_at: Date; // SQLite stores TEXT
  title: string;
  urgency: number;
  effort: number;
  task_priority: number;
  due_date: Date | null;
  completed: number;
  story_id: string | null;
}

export interface CreateTaskInput extends Omit<Task, 'id' | 'created_at'> {}

export interface PriorityData
  extends Pick<Task, 'urgency' | 'effort' | 'due_date'> {
  date: Date;
}

// export interface TaskWithRelations extends Task {
//   blocked_by: number[];
//   tags: number[];
// }

// export interface TaskDependency {
//   task_id: string;
//   blocked_by_task_id: string;
// }

// export interface TaskTag {
//   task_id: string;
//   tag_id: string;
// }

export async function getAllTasks(): Promise<Task[]> {
  return db.prepare(`SELECT * FROM task`).all() as Task[];
}

export async function getTaskById(id: string): Promise<Task> {
  const task = (await db
    .prepare(`SELECT * FROM task WHERE id = ?`)
    .get(id)) as Task;
  return task;
}

export async function createTask(data: CreateTaskInput) {
  const id = uuid();
  const created_at = new Date().toISOString();

  const {
    title,
    urgency,
    effort,
    task_priority,
    due_date,
    completed,
    story_id,
  } = data;

  db.prepare(
    `
      INSERT INTO task (id, created_at, title, urgency, effort, task_priority, due_date, completed, story_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
  ).run(
    id,
    created_at,
    title,
    urgency,
    effort,
    task_priority,
    due_date,
    completed,
    story_id
  );

  return {
    id,
    created_at,
    title,
    urgency,
    effort,
    task_priority,
    due_date,
    completed,
    story_id,
  };
}

export type UpdateAllowedColumns =
  | 'title'
  | 'urgency'
  | 'effort'
  | 'task_priority'
  | 'due_date'
  | 'completed'
  | 'story_id';

export async function updateTask(
  id: string,
  updates: Partial<Record<UpdateAllowedColumns, string | number | null>>
) {
  const allowedColumns: UpdateAllowedColumns[] = [
    'title',
    'urgency',
    'effort',
    'task_priority',
    'due_date',
    'completed',
    'story_id',
  ];

  const entries = Object.entries(updates).filter(([key]) =>
    allowedColumns.includes(key as UpdateAllowedColumns)
  );

  if (entries.length === 0) return;

  const setClause = entries.map(([column]) => `${column} = ?`).join(', ');
  let values = entries.map(([, value]) => value);
  values.push(id);

  const sql = `UPDATE task SET ${setClause} WHERE id = ?`;
  db.prepare(sql).run(...values);

  return await getTaskById(id);
}

export async function deleteTask(id: string) {
  return db
    .prepare(
      `
      DELETE FROM task WHERE id = ?
      `
    )
    .run(id);
}
