const express = require('express');
const cors = require('cors');
const app = express();

// Config CORS - permite tudo em desenvolvimento (celular → PC)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Rotas de produtos
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