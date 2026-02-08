const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.sqlite');

db.serialize(() => {
  // Tabela de produtos (se já existir, mantém)
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      codigo_barras TEXT UNIQUE NOT NULL,
      descricao TEXT NOT NULL,
      quantidade INTEGER DEFAULT 0,
      categoria TEXT NOT NULL,
      data_validade TEXT,
      imagem TEXT
    )
  `);

  // 🔽 NOVA TABELA: fornecedores
  db.run(`
    CREATE TABLE IF NOT EXISTS fornecedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_empresa TEXT NOT NULL,
      cnpj TEXT UNIQUE NOT NULL,
      endereco TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT NOT NULL,
      contato_principal TEXT NOT NULL
    )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS produto_fornecedor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    fornecedor_id INTEGER NOT NULL,
    UNIQUE(produto_id, fornecedor_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
  )
`);


  console.log('Tabelas verificadas/criadas com sucesso!');
});

module.exports = db;
