const express = require('express');

const app = express();

app.get('/ping', (_req, res) => res.send('pong'));

const PORTA = 3000;

app.listen(PORTA, () => console.log(`Rodando na porta: ${PORTA}`));
