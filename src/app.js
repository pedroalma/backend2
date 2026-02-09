const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());                  // permite o React Native acessar
app.use(express.json());          // parseia JSON no body

// Rotas
app.use('/api/produtos', require('./routes/produtosRoutes'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Backend rodando! Use /api/produtos' });
});

// Erro 404 global
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});