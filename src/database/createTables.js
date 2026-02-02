const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database.sqlite');

db.serialize(() => {
  // Criar tabela de produtos
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    codigo_barras TEXT UNIQUE NOT NULL,
    descricao TEXT NOT NULL,
    quantidade INTEGER DEFAULT 0,
    categoria TEXT NOT NULL,
    data_validade TEXT,
    imagem TEXT
  )`, (err) => {
    if (err) {
      console.error("Erro ao criar tabela Produtos:", err.message);
    } else {
      console.log("Tabela Produtos criada com sucesso!");
    }
  });
});

db.close();
