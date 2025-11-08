const express = require('express');
const db = require('../db');
const { generateSummary } = require('../utils/ai');
const router = express.Router();

// Create task
router.post('/create', async (req, res) => {
  const { taskTitle, description } = req.body; // Intentional mismatch: frontend might send 'title'

  // Intentional bug: missing 'await' on async generateSummary -> race condition
  const summaryPromise = generateSummary(description || '');

  // Intentional SQL injection vulnerability (string concatenation)
  const sql = `INSERT INTO tasks (title, description, summary) VALUES ('${taskTitle}', '${description}', 'pending')`;
  db.run(sql, function(err) {
    if (err) {
      return res.status(500).json({ error: 'DB insert failed' });
    }
    // Intentional bug: using undefined variable lastId (should use this.lastID)
    const createdId = lastId;
    res.json({ id: createdId, message: 'Task created' });
  });

  // Intentional: not handling the summaryPromise result; also no update to DB with real summary
});

// List tasks
router.get('/list', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.json(rows);
  });
});

// Update task (mark complete) - Intentional wrong parameter name
router.post('/complete/:taskId', (req, res) => {
  const { id } = req.params; // should be taskId
  db.run(`UPDATE tasks SET completed = 1 WHERE id = ${id}`, function(err) {
    if (err) return res.status(500).send('DB error');
    res.json({ updated: this.changes });
  });
});

// Broken async handler example - missing try/catch for async errors
router.get('/summary/:id', async (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM tasks WHERE id = ${id}`, async (err, task) => {
    if (err) return res.status(500).send('DB error');
    if (!task) return res.status(404).send('Not found');

    // Intentional: generateSummary is asynchronous; properly should await, but here we mix callbacks and async
    const s = generateSummary(task.description);
    res.json({ id: task.id, summary: s });
  });
});

module.exports = router;
