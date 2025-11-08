const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Missing error handler for unknown routes (intentional)

app.use('/api/tasks', tasksRouter);

// Intentional: server.listen callback uses undefined variable 'port' causing ReferenceError
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('AI Task Manager running on port', port);
});
