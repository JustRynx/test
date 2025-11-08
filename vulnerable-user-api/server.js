const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoutes = require('./routes/users');

const app = express();

// 🚨 Vulnerability: Unrestricted CORS
app.use(cors());

// 🚨 Vulnerability: No rate limiting or helmet security headers
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
