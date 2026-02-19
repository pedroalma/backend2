// src/controllers/produtosControllers.js

let produtos = [];
try {
  produtos = require('../data/produtos') || [];
} catch (e) {
  console.log("Arquivo produtos.js não encontrado → usando array vazio");
  produtos = [];
}

exports.criar = (req, res) => {
  const {
    nomeProduto,
    unidade,
    quantidadePorUnidade,
    quantidadeDePacotes = 1,
    validade,
    dataRecebimento,
    descricao = ""
  } = req.body;

  if (!nomeProduto || !unidade || !quantidadePorUnidade || !validade) {
    return res.status(400).json({
      erro: "Campos obrigatórios: nomeProduto, unidade, quantidadePorUnidade, validade"
    });
  }

  const unidadesValidas = ['kg', 'g', 'l', 'ml'];
  if (!unidadesValidas.includes(unidade.toLowerCase())) {
    return res.status(400).json({ erro: "Unidade inválida (kg, g, l, ml)" });
  }

  const qtdNum = Number(quantidadePorUnidade);
  if (isNaN(qtdNum) || qtdNum <= 0) {
    return res.status(400).json({ erro: "quantidadePorUnidade deve ser número positivo" });
  }

  const pacotesNum = Number(quantidadeDePacotes);
  if (isNaN(pacotesNum) || pacotesNum < 1) {
    return res.status(400).json({ erro: "quantidadeDePacotes deve ser ≥ 1" });
  }

  const novo = {
    id: Date.now().toString(),
    nomeProduto,
    unidade: unidade.toLowerCase(),
    quantidadePorUnidade: qtdNum,
    quantidadeDePacotes: pacotesNum,
    validade,
    dataRecebimento: dataRecebimento || new Date().toLocaleDateString('pt-BR'),
    descricao: descricao.trim(),
    createdAt: new Date().toISOString()
  };

  produtos.push(novo);

  res.status(201).json({
    mensagem: "Produto criado com sucesso",
    produto: novo
  });
};

exports.listarTodos = (req, res) => {
  res.status(200).json({ total: produtos.length, produtos });
};

exports.buscarPorId = (req, res) => {
  const p = produtos.find(item => item.id === req.params.id);
  if (!p) return res.status(404).json({ erro: 'Não encontrado' });
  res.json(p);
};

exports.atualizar = (req, res) => {
  const index = produtos.findIndex(item => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ erro: 'Não encontrado' });

  const updates = req.body;
  if (updates.unidade) updates.unidade = updates.unidade.toLowerCase();

  if (updates.quantidadePorUnidade !== undefined) {
    const n = Number(updates.quantidadePorUnidade);
    if (isNaN(n) || n <= 0) return res.status(400).json({ erro: "quantidadePorUnidade inválida" });
    updates.quantidadePorUnidade = n;
  }

  if (updates.quantidadeDePacotes !== undefined) {
    const n = Number(updates.quantidadeDePacotes);
    if (isNaN(n) || n < 1) return res.status(400).json({ erro: "quantidadeDePacotes inválida" });
    updates.quantidadeDePacotes = n;
  }

  produtos[index] = { ...produtos[index], ...updates, updatedAt: new Date().toISOString() };

  res.json({ mensagem: "Atualizado", produto: produtos[index] });
};

exports.deletar = (req, res) => {
  const index = produtos.findIndex(item => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ erro: 'Não encontrado' });
  produtos.splice(index, 1);
  res.json({ mensagem: "Deletado com sucesso" });
};