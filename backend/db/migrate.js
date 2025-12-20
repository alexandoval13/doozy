import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, 'migrations');

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS migration (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL UNIQUE,
      run_at TEXT NOT NULL
    )
  `
).run();

const applied = new Set(
  db
    .prepare('SELECT filename FROM migration')
    .all()
    .map((r) => r.filename)
);

const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith('.sql'))
  .sort();

for (const file of files) {
  if (applied.has(file)) continue;

  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
  db.transaction(() => {
    db.exec(sql);
    db.prepare(`INSERT INTO migration (filename, run_at) VALUES (?, ?)`).run(
      file,
      new Date().toISOString()
    );
  })();

  console.log(`Applied migration: ${file}`);
}

// const seedingScripts = fs
//   .readdirSync(seedDir)
//   .filter((f) => f.endsWith('.sql'))
//   .sort();

// for (const script of seedingScripts) {
//   const sql = fs.readFileSync(path.join(seedDir, script), 'utf-8');
//   db.transaction(() => {
//     db.exec(sql);
//   });
// }
