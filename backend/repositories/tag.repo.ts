import { db } from '../db/connection.js';

export interface Tag {
  id: string;
  created_at: Date;
  title: string;
}
