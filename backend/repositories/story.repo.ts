import { db } from '../db/connection.js';

export interface Story {
  id: string;
  created_at: Date;
  title: string;
  due_date: Date | null;
}
