// Simulated AI summary generator with intentional 'vibe-coded' style mistakes.
const fetch = require('node-fetch');

// Intentional: no API key handling, using a fake external call (would fail offline)
async function generateSummary(text) {
  // Intentional: missing await on fetch.then usage (and mixing async/then)
  return fetch('https://example.com/summarize', { method: 'POST', body: text })
    .then(res => res.text())
    .then(t => {
      // Intentional: returns a Promise resolved string but sometimes returns undefined
      if (!t) return;
      return `AI-SUMMARY: ${t.slice(0, 120)}`;
    });
}

module.exports = { generateSummary };
