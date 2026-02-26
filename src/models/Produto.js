// src/models/Produto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  codProd: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  peso: {
    type: DataTypes.DECIMAL(10, 3),
    allowNull: false,
  },
  unidade: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  codBar: {
    type: DataTypes.STRING(13),
    allowNull: true,
  },
  dataDeEntrada: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dataDeValidade: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dataLimiteDeSaida: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'tbprodutos',      // nome exato da tabela
  timestamps: false,            // sem createdAt / updatedAt
  freezeTableName: true,        // impede que o Sequelize pluralize ou mude o nome
  underscored: false,           // ← importante: colunas NÃO usam underscore
});

module.exports = Produto;