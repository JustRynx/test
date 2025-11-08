const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');

// Intentional: synchronous table creation with string interpolation (harmless here but not safe)
db.serialize(() => {
  db.run("""CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    summary TEXT,
    completed INTEGER DEFAULT 0
  )""");
});

module.exports = db;
