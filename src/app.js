const express = require('express');
const cors = require('cors');

const app = express();

// Apenas UMA dessas linhas (escolha uma):
const { sequelize } = require('./models');          // ← Opção 1 (melhor)
// OU
// const sequelize = require('./config/database');       // ← Opção 2

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api/produtos', require('./routes/produtosRoutes'));
// Rota de teste simples
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend rodando! Use /api/produtos (POST para cadastrar)' 
  });
});

// 404 global
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse do celular usando: http://172.20.16.1:${PORT}`);
});

sequelize.authenticate()
  .then(() => console.log('Conexão com MySQL OK!'))
  .catch(err => console.error('Erro na conexão:', err));