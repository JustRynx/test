const sqlite3 = require('sqlite3').verbose();

// 🚨 Vulnerability: Database file in project root (no encryption)
const db = new sqlite3.Database('./users.db');

// 🚨 Vulnerability: No sanitization in table creation
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    email TEXT
  )`);
});

module.exports = db;
