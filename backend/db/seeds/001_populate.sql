-- Stories
INSERT INTO story (id, created_at, title, due_date) VALUES
  ('73007f73-5e37-4143-b191-337cf2c3bfb4', datetime('now'), 'Earn Masters Degree', date('now', '+500 days')),
  ('085d1dd0-0abc-45b0-933f-f1ce7c08451b', datetime('now'), 'Holidays', date('now', '+7 days')),
  ('0db34d8b-a581-4dfd-80bf-9db527239ebb', datetime('now'), 'Read 20 Books by the end of the year', date('now', '+365 days'));

-- Tags
INSERT INTO tag (id, created_at, title) VALUES
  ('1403ef40-3323-4e40-b69c-203a90c9e7dc', datetime('now'), 'errands'),
  ('08bbc4d1-a788-47da-afac-59d5bbe8c1f5', datetime('now'), 'work'),
  ('8e193994-b663-4fca-9a0e-e0fd756b4346', datetime('now'), 'personal');

-- Tasks
INSERT INTO task (
  id,
  created_at,
  title,
  urgency,
  effort,
  task_priority,
  due_date,
  completed,
  story_id
) VALUES
  (
    '73007f73-5e37-4143-b191-337cf2c3ber1',
    datetime('now'),
    'Wrap presents',
    5,
    2,
    80,
    date('now'),
    0,
    '73007f73-5e37-4143-b191-337cf2c3bfb4'
  ),
  (
    'e835780a-d8fb-455e-a89c-561e182ef3a4',
    datetime('now'),
    'Buy more wrapping paper',
    4,
    3,
    65,
    date('now', '+1 day'),
    0,
    '73007f73-5e37-4143-b191-337cf2c3bfb4'
  ),
  (
    'b4d31ccf-c136-42c4-a71e-2e84bdd287f7',
    datetime('now'),
    'Make a list of priorities',
    2,
    4,
    30,
    date('now', '+14 days'),
    0,
    '085d1dd0-0abc-45b0-933f-f1ce7c08451b'
  ),
  (
    '7ad8ddb8-0c4d-447c-84ff-8b990febf1ab',
    datetime('now'),
    'Make a reading list',
    1,
    2,
    8,
    null,
    0,
    '0db34d8b-a581-4dfd-80bf-9db527239ebb'
  ),
  (
    'f1c3db00-119a-4a2f-bcae-abe28dfbe3da',
    datetime('now'),
    'Start reading book 1!',
    3,
    1,
    28,
    null,
    0,
    '0db34d8b-a581-4dfd-80bf-9db527239ebb'
  );

-- Task dependencies
INSERT INTO task_dependency (task_id, blocked_by_task_id) VALUES
  ('e835780a-d8fb-455e-a89c-561e182ef3a4', '73007f73-5e37-4143-b191-337cf2c3ber1'),
  ('7ad8ddb8-0c4d-447c-84ff-8b990febf1ab', 'f1c3db00-119a-4a2f-bcae-abe28dfbe3da');

-- Task tags
INSERT INTO task_tag (task_id, tag_id) VALUES
  ('73007f73-5e37-4143-b191-337cf2c3ber1', '08bbc4d1-a788-47da-afac-59d5bbe8c1f5'),
  ('73007f73-5e37-4143-b191-337cf2c3ber1', '1403ef40-3323-4e40-b69c-203a90c9e7dc'),
  ('e835780a-d8fb-455e-a89c-561e182ef3a4', '08bbc4d1-a788-47da-afac-59d5bbe8c1f5'),
  ('b4d31ccf-c136-42c4-a71e-2e84bdd287f7', '8e193994-b663-4fca-9a0e-e0fd756b4346');
