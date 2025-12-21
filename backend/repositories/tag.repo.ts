import { db } from '../db/connection.js';
import { v4 as uuid } from 'uuid';

export interface Tag {
  id: string;
  created_at: Date;
  title: string;
}

export type CreateTagData = Pick<Tag, 'title'>;

export async function getAllTags() {
  return db.prepare(`SELECT * FROM tag`).all() as Tag[];
}

export async function createTag(data: CreateTagData) {
  const { title } = data;
  const id = uuid();
  const created_at = new Date().toISOString();

  db.prepare(`INSERT INTO tag (id, created_at, title) VALUES (?, ?, ?)`).run(
    id,
    created_at,
    title
  );

  return { id, created_at, title };
}

export async function deleteTag(id: string) {
  return db.prepare(`DELETE FROM tag WHERE id = ?`).run(id);
}
