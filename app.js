const express = require('express');
require('./src/database/db');

const app = express();
const PORT = 3000;

app.use(express.json());

// rota base (teste)
app.get('/', (req, res) => {
  res.send('API de Controle de Estoque rodando!');
});

// futuras rotas vão entrar aqui

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
