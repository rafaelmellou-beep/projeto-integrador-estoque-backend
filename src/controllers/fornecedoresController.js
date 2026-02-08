const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.sqlite');

// Cadastrar fornecedor
const cadastrarFornecedor = (req, res) => {
  const {
    nome_empresa,
    cnpj,
    endereco,
    telefone,
    email,
    contato_principal
  } = req.body;

  if (!nome_empresa || !cnpj || !endereco || !telefone || !email || !contato_principal) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }

  const sql = `
    INSERT INTO fornecedores 
    (nome_empresa, cnpj, endereco, telefone, email, contato_principal)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [nome_empresa, cnpj, endereco, telefone, email, contato_principal],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ erro: 'Fornecedor com esse CNPJ já está cadastrado!' });
        }
        return res.status(500).json({ erro: err.message });
      }

      res.status(201).json({
        mensagem: 'Fornecedor cadastrado com sucesso!',
        id: this.lastID
      });
    }
  );
};

// Listar fornecedores
const listarFornecedores = (req, res) => {
  db.all('SELECT * FROM fornecedores', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(200).json(rows);
  });
};

// Buscar fornecedor por ID
const buscarFornecedorPorId = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM fornecedores WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: 'Fornecedor não encontrado!' });
    res.status(200).json(row);
  });
};

// Atualizar fornecedor
const atualizarFornecedor = (req, res) => {
  const { id } = req.params;
  const {
    nome_empresa,
    cnpj,
    endereco,
    telefone,
    email,
    contato_principal
  } = req.body;

  if (!nome_empresa || !cnpj || !endereco || !telefone || !email || !contato_principal) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }

  const sql = `
    UPDATE fornecedores SET
      nome_empresa = ?,
      cnpj = ?,
      endereco = ?,
      telefone = ?,
      email = ?,
      contato_principal = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [nome_empresa, cnpj, endereco, telefone, email, contato_principal, id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) {
        return res.status(404).json({ erro: 'Fornecedor não encontrado!' });
      }
      res.status(200).json({ mensagem: 'Fornecedor atualizado com sucesso!' });
    }
  );
};

// Deletar fornecedor
const deletarFornecedor = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM fornecedores WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Fornecedor não encontrado!' });
    }
    res.status(200).json({ mensagem: 'Fornecedor deletado com sucesso!' });
  });
};

module.exports = {
  cadastrarFornecedor,
  listarFornecedores,
  buscarFornecedorPorId,
  atualizarFornecedor,
  deletarFornecedor
};
