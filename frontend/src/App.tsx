import { useEffect, useState } from 'react';
import './App.css';

type TaskCategory = 'today' | 'tomorrow' | 'all';

interface Task {
  id: number;
  title: string;
  urgency: number;
  effort: number;
  category: TaskCategory;
  priority: number;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [listView, setListView] = useState<TaskCategory>('all');

  const [title, setTitle] = useState<string>('');
  const [urgency, setUrgency] = useState<string>('');
  const [effort, setEffort] = useState<string>('');

  async function loadTasks() {
    try {
      const res = await fetch('http://localhost:3000/tasks');
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error('Expected array data response. Actual response: ', {
          data,
        });
        return;
      }

      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          urgency: Number(urgency),
          effort: Number(effort),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create task');
      }

      await loadTasks();

      setTitle('');
      setUrgency('');
      setEffort('');
    } catch (err) {
      console.error('Failed to add task: ', err);
    }
  }

  async function handleDeleteTask(id: number | string) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });

    await loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <div style={{ maxWidth: '600px', minWidth: '506px', margin: '24px' }}>
        <h1>Tasks</h1>
        <form
          id="task-form"
          style={{ display: 'flex', flexDirection: 'column', rowGap: '4px' }}
          onSubmit={(e) => {
            handleAddTask(e);
          }}
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            id="title"
            value={title}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  onChange={(e) => setUrgency(e.target.value)}
                  type="number"
                  placeholder="1-5"
                  id="urgency"
                  value={urgency}
                />
                <label htmlFor="urgency">Urgency</label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  onChange={(e) => setEffort(e.target.value)}
                  type="number"
                  placeholder="1-5"
                  id="effort"
                  value={effort}
                />
                <label htmlFor="effort">Effort</label>
              </div>
            </div>
            <div>
              <button type="submit">Add</button>
            </div>
          </div>
        </form>

        <br />

        <form id="list-view-form">
          <input
            onChange={(e) => {
              const value = e.target.value as TaskCategory;
              return setListView(value);
            }}
            id="radio-select-all"
            type="radio"
            name="list-view"
            value={'all'}
            checked={listView === 'all'}
          />
          <label htmlFor="radio-select-all">All</label>

          <input
            onChange={(e) => {
              const value = e.target.value as TaskCategory;
              return setListView(value);
            }}
            id="radio-select-today"
            type="radio"
            name="list-view"
            value={'today'}
            checked={listView === 'today'}
          />
          <label htmlFor="radio-select-today">Today</label>

          <input
            onChange={(e) => {
              const value = e.target.value as TaskCategory;
              return setListView(value);
            }}
            id="radio-select-tomorrow"
            type="radio"
            name="list-view"
            value="tomorrow"
            checked={listView === 'tomorrow'}
          />
          <label htmlFor="radio-select-tomorrow">Tomorrow</label>
        </form>

        <div style={{ border: '2px solid gray' }}>
          {listView === 'all' && (
            <ul id="task-list-today" style={{ padding: '24px' }}>
              {tasks.map((t) => (
                <li key={`li::today::${t.id}`}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p>{t.title}</p>
                    <button onClick={() => handleDeleteTask(t.id)}>
                      DELETE
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {listView === 'today' && (
            <ul id="task-list-today" style={{ padding: '24px' }}>
              {tasks
                .filter((t) => t.category === 'today')
                .map((t) => (
                  <li key={`li::today::${t.id}`}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>{t.title}</p>
                      <button onClick={() => handleDeleteTask(t.id)}>
                        DELETE
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          {listView == 'tomorrow' && (
            <ul id="task-list-tomorrow" style={{ padding: '24px' }}>
              {tasks
                .filter((t) => t.category === 'tomorrow')
                .map((t) => (
                  <li key={`li::tomorrow::${t.id}`}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>{t.title}</p>
                      <button onClick={() => handleDeleteTask(t.id)}>
                        DELETE
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
