import { db } from './connection';

export interface DbTask {
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

export interface TaskWithRelations extends DbTask {
  blocked_by: number[];
  tags: number[];
}

export type PriorityData = Pick<
  DbTask,
  'created_at' | 'urgency' | 'effort' | 'due_date'
>;

export interface DbTaskDependency {
  task_id: string;
  blocked_by_task_id: string;
}

export interface DbTaskTag {
  task_id: string;
  tag_id: string;
}

export interface DbStory {
  id: string;
  created_at: Date;
  title: string;
  due_date: Date | null;
}

export interface DbTag {
  id: string;
  created_at: Date;
  title: string;
}

export function getAllTasks(): DbTask[] {}

export function createTask(data: Omit<DbTask, 'id' | 'priority'>): {};

export function deleteTask(): DbTask[] {}

export function calculatePriority(data: PriorityData): DbTask['priority'] {}
