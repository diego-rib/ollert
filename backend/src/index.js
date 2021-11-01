const express = require('express');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

// Testando app
app.get('/ping', (_req, res) => res.send('pong'));

app.use('/tasks', taskRoutes);

const PORT = 4000;

app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
