import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedFile = path.join(__dirname, 'seeds/001_populate.sql');

const sql = fs.readFileSync(seedFile, 'utf-8');
db.exec(sql);
console.log('Seed complete');
