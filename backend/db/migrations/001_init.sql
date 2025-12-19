PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS story (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  title TEXT NOT NULL UNIQUE,
  due_date TEXT
);

CREATE TABLE IF NOT EXISTS task (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  title TEXT NOT NULL,
  urgency INTEGER NOT NULL CHECK (urgency BETWEEN 1 AND 5),
  effort INTEGER NOT NULL CHECK (effort BETWEEN 1 AND 5),
  task_priority INTEGER NOT NULL,
  due_date TEXT,
  completed INTEGER NOT NULL DEFAULT 0,
  story_id TEXT,

  FOREIGN KEY (story_id) REFERENCES story(id)
);

CREATE TABLE IF NOT EXISTS tag (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  title TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS task_dependency (
  task_id TEXT NOT NULL,
  blocked_by_task_id TEXT NOT NULL,

  CHECK (task_id != blocked_by_task_id),

  PRIMARY KEY (task_id, blocked_by_task_id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
  FOREIGN KEY (blocked_by_task_id) REFERENCES task(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task_tag (
  task_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,

  PRIMARY KEY (task_id, tag_id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_task_dependency_task
  ON task_dependency(task_id);

CREATE INDEX IF NOT EXISTS idx_task_dependency_blocked_by
  ON task_dependency(blocked_by_task_id);

CREATE INDEX IF NOT EXISTS idx_task_tag_task
  ON task_tag(task_id);

CREATE INDEX IF NOT EXISTS idx_task_tag_tag
  ON task_tag(tag_id);
