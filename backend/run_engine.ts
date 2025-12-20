import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { PriorityData } from './repositories/task.repo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENGINE_PATH = path.resolve(
  __dirname,
  '../../task-engine/build/task_engine'
);

export interface EngineResult {
  priority: string;
  category: string;
}

const LOWER = 1;
const UPPER = 5;

function validateRange(value: number) {
  if (value < LOWER || value > UPPER) {
    return false;
  }
  return true;
}

// Call C++ Task Engine
export function runEngine({
  date,
  urgency,
  effort,
}: PriorityData): Promise<EngineResult> {
  return new Promise((resolve, reject) => {
    const proc = spawn(ENGINE_PATH);

    const validUrgency = validateRange(urgency);
    const validEffort = validateRange(effort);

    // if (validUrgency && validEffort && date) {
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
    // } else {
    //   throw Error({message:});
    // }

    proc.stdin.end();
  });
}

// const test = await runEngine({
//   date: new Date(),
//   urgency: 2,
//   effort: 3,
// });

// console.log({ test });
