import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENGINE_PATH = path.resolve(
  __dirname,
  '../../task-engine/build/task_engine'
);

// v0: store data in memory
let tasks = [];
let nextId = 1;

// Call C++ Task Engine
export function runEngine({ date, urgency, effort }) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ENGINE_PATH);

    const hour = date.getHours();
    const input = `${hour} ${urgency} ${effort}`;

    let output = '';
    let error = '';

    proc.stdout.on('data', (data) => {
      output += data.toString();
    });

    proc.stderr.on('data', (data) => {
      error += data.toString();
    });

    proc.on('close', (code) => {
      if (code != 0) {
        reject(new Error(error || 'Engine failed'));
      } else {
        const [category, priority] = output.trim().split(' ');

        const result = {
          category,
          priority,
        };

        resolve(result);
      }
    });

    proc.stdin.write(input);

    proc.stdin.end();
  });
}

// const test = await runEngine({
//   date: new Date(),
//   urgency: 2,
//   effort: 3,
// });

// console.log({ test });
