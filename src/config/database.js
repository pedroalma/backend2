// src/config/database.js
require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,               // desliga logs SQL no console (opcional: true para debug)
    define: {
      timestamps: true,           // createdAt / updatedAt automáticos
      underscored: true,          // usa snake_case nas colunas (ex: quantidade_por_unidade)
    },
  }
);

// Testa a conexão (rode uma vez)
sequelize.authenticate()
  .then(() => console.log('Conexão com MySQL realizada com sucesso!'))
  .catch(err => console.error('Erro ao conectar no banco:', err));

module.exports = sequelize;