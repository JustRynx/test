# AI Task Manager (vibe-coded test app)

This small Node.js API intentionally includes common "vibe-coded" mistakes and bugs:

- missing awaits (race conditions)
- undefined variables
- parameter name mismatches
- SQL injection (string concatenation)
- mixing callbacks and async/await
- missing error handling
- broken server startup logging

Use this to test code scanners like Kreyo and to craft AI prompts to fix issues.

Instructions:
1. unzip and `npm install`
2. `node server.js`
3. Use the API endpoints under `/api/tasks` such as `/create`, `/list`, `/complete/:taskId`, `/summary/:id`
