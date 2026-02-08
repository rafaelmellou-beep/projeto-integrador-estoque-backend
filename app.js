const express = require('express');

// 🔽 garante que as tabelas existam
require('./src/database/createTables');

const {
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto
} = require('./src/controllers/produtosController');

const {
  cadastrarFornecedor,
  listarFornecedores,
  buscarFornecedorPorId,
  atualizarFornecedor,
  deletarFornecedor
} = require('./src/controllers/fornecedoresController');

const {
  associarFornecedor,
  listarFornecedoresPorProduto,
  desassociarFornecedor
} = require('./src/controllers/produtoFornecedorController');

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

// CRUD de fornecedores
app.post('/fornecedores', cadastrarFornecedor);
app.get('/fornecedores', listarFornecedores);
app.get('/fornecedores/:id', buscarFornecedorPorId);
app.put('/fornecedores/:id', atualizarFornecedor);
app.delete('/fornecedores/:id', deletarFornecedor);

// Associação produto ↔ fornecedor (REST correta)
app.post('/produtos/associar-fornecedor', associarFornecedor);
app.get('/produtos/:produto_id/fornecedores', listarFornecedoresPorProduto);
app.delete(
  '/produtos/:produto_id/fornecedores/:fornecedor_id',
  desassociarFornecedor
);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
