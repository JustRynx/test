const express = require('express');
const cors = require('cors');
const app = express();

// 🚨 Vulnerability 1: Unrestricted CORS (any origin can access)
app.use(cors());

// 🚨 Vulnerability 2: Hardcoded secret key
const SECRET_KEY = '12345-super-secret-key';

// Simple API
app.get('/', (req, res) => {
  // 🚨 Vulnerability 3: No input sanitization (possible XSS)
  const name = req.query.name || 'Guest';
  res.send(`<h1>Hello ${name}</h1>`);
});

app.listen(3000, () => console.log('Server running on port 3000'));