const express = require('express');
const db = require('../db');
const { generateToken, verifyToken } = require('../utils/auth');
const router = express.Router();

// 🚨 Vulnerability: No password hashing
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  db.run(
    `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`,
    err => {
      if (err) return res.status(500).send('Error registering user');
      res.send('User registered');
    }
  );
});

// 🚨 Vulnerability: SQL Injection & No input validation
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`,
    (err, user) => {
      if (err) return res.status(500).send('DB error');
      if (!user) return res.status(401).send('Invalid credentials');

      const token = generateToken(user);
      res.json({ token });
    }
  );
});

// 🚨 Vulnerability: No authentication on route
router.get('/all', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.json(rows);
  });
});

// 🚨 Vulnerability: Token verification logic not enforced properly
router.get('/profile', (req, res) => {
  const token = req.headers.authorization;
  const user = verifyToken(token);

  if (!user) return res.status(403).send('Invalid token');
  res.json({ message: `Hello, ${user.username}` });
});

module.exports = router;
