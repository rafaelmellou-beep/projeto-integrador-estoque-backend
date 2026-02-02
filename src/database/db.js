const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// cria o caminho do banco
const dbPath = path.resolve(__dirname, 'database.sqlite');

// cria / conecta ao banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados', err);
  } else {
    console.log('Banco de dados SQLite conectado com sucesso');
  }
});

module.exports = db;