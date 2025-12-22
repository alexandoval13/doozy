import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// move up dir if in dist
const isCompiled = __dirname.includes('dist');
const dbPath = isCompiled
  ? path.resolve(__dirname, '../../db/data/data.sqlite')
  : path.join(__dirname, '../db/data/data.sqlite');

export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
