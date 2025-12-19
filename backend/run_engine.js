import { spawn } from 'child_process';
import path from 'path';

const ENGINE_PATH = path.resolve(__dirname, '../task-engine/build/task_engine');

const input = '17 4 2\n';

const engine = spawn(ENGINE_PATH);

engine.on('error', (error) => {
  console.error('Failed to start engine: ', error.message);
});

engine.stdin.write(input);
engine.stdin.end();

let output = '';

engine.stdout.on('data', (data) => {
  output += data.toString();
});

engine.stderr.on('data', (data) => {
  console.error('Engine error:', data.toString());
});

engine.on('close', (code) => {
  if (code !== 0) {
    console.error(
      `Task engine failed with code ${code}:\n${output || '(no output)'}`
    );
    return;
  }

  const [category, priority] = output.trim().split(' ');

  const result = {
    category,
    priority: Number(priority),
  };
});
