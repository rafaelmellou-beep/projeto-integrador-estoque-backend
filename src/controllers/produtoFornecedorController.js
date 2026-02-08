const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.sqlite');

// Associar fornecedor a produto
const associarFornecedor = (req, res) => {
  const { produto_id, fornecedor_id } = req.body;

  if (!produto_id || !fornecedor_id) {
    return res.status(400).json({ erro: 'Produto e fornecedor são obrigatórios!' });
  }

  const sql = `
    INSERT INTO produto_fornecedor (produto_id, fornecedor_id)
    VALUES (?, ?)
  `;

  db.run(sql, [produto_id, fornecedor_id], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({
          erro: 'Fornecedor já está associado a este produto!'
        });
      }
      return res.status(500).json({ erro: err.message });
    }

    res.status(201).json({
      mensagem: 'Fornecedor associado com sucesso ao produto!'
    });
  });
};

// Listar fornecedores de um produto
const listarFornecedoresPorProduto = (req, res) => {
  const { produto_id } = req.params;

  const sql = `
    SELECT f.*
    FROM fornecedores f
    INNER JOIN produto_fornecedor pf
      ON f.id = pf.fornecedor_id
    WHERE pf.produto_id = ?
  `;

  db.all(sql, [produto_id], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(200).json(rows);
  });
};

// Desassociar fornecedor de produto
const desassociarFornecedor = (req, res) => {
  const { produto_id, fornecedor_id } = req.params;

  const sql = `
    DELETE FROM produto_fornecedor
    WHERE produto_id = ? AND fornecedor_id = ?
  `;

  db.run(sql, [produto_id, fornecedor_id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });

    if (this.changes === 0) {
      return res.status(404).json({
        erro: 'Associação não encontrada!'
      });
    }

    res.status(200).json({
      mensagem: 'Fornecedor desassociado com sucesso!'
    });
  });
};

module.exports = {
  associarFornecedor,
  listarFornecedoresPorProduto,
  desassociarFornecedor
};
