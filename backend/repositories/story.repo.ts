import { db } from '../db/connection.js';
import { v4 as uuid } from 'uuid';

export interface Story {
  id: string;
  created_at: Date;
  title: string;
  due_date: Date | null;
}

export type CreateStoryData = Pick<Story, 'title' | 'due_date'>;

export async function getAllStories() {
  return db.prepare(`SELECT * FROM story`).all() as Story[];
}

export async function getStory(id: string) {
  return db.prepare(`SELECT * FROM story WHERE id = ?`).get(id) as Story;
}

export async function createStory(data: CreateStoryData) {
  const { title, due_date } = data;
  const id = uuid();
  const created_at = new Date().toISOString();

  db.prepare(
    `INSERT INTO story (id, created_at, title, due_date) VALUES(?, ?, ?, ?)`
  ).run(id, created_at, title, due_date);

  return {
    id,
    created_at,
    title,
    due_date,
  };
}

export async function deleteStory(id: string) {
  return db.prepare(`DELETE FROM story WHERE id = ?`).run(id);
}
