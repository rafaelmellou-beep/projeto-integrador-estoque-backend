const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.sqlite');

// Função para cadastrar produto
const cadastrarProduto = (req, res) => {
  const { nome, codigo_barras, descricao, quantidade, categoria, data_validade, imagem } = req.body;

  if (!nome || !codigo_barras || !descricao || !categoria) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes!' });
  }

  const sql = `INSERT INTO produtos 
    (nome, codigo_barras, descricao, quantidade, categoria, data_validade, imagem) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [nome, codigo_barras, descricao, quantidade || 0, categoria, data_validade || null, imagem || null], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ erro: 'Produto com este código de barras já está cadastrado!' });
      }
      return res.status(500).json({ erro: err.message });
    }

    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', id: this.lastID });
  });
};

// Listar todos os produtos
const listarProdutos = (req, res) => {
  const sql = 'SELECT * FROM produtos';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(200).json(rows);
  });
};

// Buscar produto por ID
const buscarProdutoPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM produtos WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: 'Produto não encontrado!' });
    res.status(200).json(row);
  });
};

// Atualizar produto
const atualizarProduto = (req, res) => {
  const { id } = req.params;
  const { nome, codigo_barras, descricao, quantidade, categoria, data_validade, imagem } = req.body;

  if (!nome || nome.trim() === '') {
  return res.status(400).json({ erro: 'Nome é obrigatório!' });
}

if (!codigo_barras || codigo_barras.trim() === '') {
  return res.status(400).json({ erro: 'Código de barras é obrigatório!' });
}

if (quantidade === undefined || quantidade === null || quantidade < 0) {
  return res.status(400).json({ erro: 'Quantidade inválida!' });
}

if (!categoria || categoria.trim() === '') {
  return res.status(400).json({ erro: 'Categoria é obrigatória!' });
}


  const sql = `UPDATE produtos SET 
    nome = ?, codigo_barras = ?, descricao = ?, quantidade = ?, categoria = ?, data_validade = ?, imagem = ? 
    WHERE id = ?`;

  db.run(sql, [nome, codigo_barras, descricao, quantidade || 0, categoria, data_validade || null, imagem || null, id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado!' });
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
  });
};

// Deletar produto
const deletarProduto = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado!' });
    res.status(200).json({ mensagem: 'Produto deletado com sucesso!' });
  });
};

// Exportar todas as funções
module.exports = { cadastrarProduto, listarProdutos, buscarProdutoPorId, atualizarProduto, deletarProduto };
