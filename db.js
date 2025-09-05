const { Pool } = require('pg');

// Criar pool de conexões
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Testar conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to database:', err);
  }
  console.log('Conected on PostgreSQL!');
  release();
});

// Função para executar queries
const query = (text, params) => {
  return pool.query(text, params);
}

// Criar tabela de usuários
const createTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('Table users created!');
  } catch (erro) {
    console.error('Error on create table users:', erro);
  }
};

createTable();

module.exports = { query };