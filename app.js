const express = require('express');
const { cadastrarProduto, listarProdutos, buscarProdutoPorId, atualizarProduto, deletarProduto } = require('./src/controllers/produtosController');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.status(200).send('API de Controle de Estoque rodando!');
});

// CRUD de produtos
app.post('/produtos', cadastrarProduto);
app.get('/produtos', listarProdutos);
app.get('/produtos/:id', buscarProdutoPorId);
app.put('/produtos/:id', atualizarProduto);
app.delete('/produtos/:id', deletarProduto);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
