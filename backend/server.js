const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, you!');
});

const ENGINE_PATH = path.resolve(__dirname, '../task-engine/build/task_engine');
// v0: store data in memory
let tasks = [];
let nextId = 1;

// Call C++ Task Engine
function runEngine({ hour, urgency, effort }) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ENGINE_PATH);

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
          priority: Number(priority),
        };

        resolve(result);
      }
    });

    proc.stdin.write(input);

    proc.stdin.end();
  });
}

app.post('/tasks', async (req, res) => {
  try {
    const { title, hour, urgency, effort } = req.body;

    // send task metadata through C++ engine
    const engineResult = await runEngine({
      hour,
      urgency,
      effort,
    });

    const task = {
      id: nextId,
      title,
      hour,
      urgency,
      effort,
      category: engineResult.category,
      priority: engineResult.priority,
    };

    nextId++;

    // v0: store data in memory
    tasks.push(task);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((t) => t.id !== id);

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
