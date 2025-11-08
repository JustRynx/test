const jwt = require('jsonwebtoken');

// 🚨 Vulnerability: Hardcoded JWT secret
const SECRET = 'supersecretkey123';

function generateToken(user) {
  // 🚨 Vulnerability: Token never expires
  return jwt.sign({ username: user.username }, SECRET);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
