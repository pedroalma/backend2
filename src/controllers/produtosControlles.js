const produtos = require('../data/produtos');

exports.listarTodos = (req, res) => {
  res.json(produtos);
};

exports.criar = (req, res) => {
  const novoProduto = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  produtos.push(novoProduto);
  res.status(201).json({ message: 'Produto criado', produto: novoProduto });
};

exports.buscarPorId = (req, res) => {
  const produto = produtos.find(p => p.id === req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(produto);
};

exports.atualizar = (req, res) => {
  const index = produtos.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Produto não encontrado' });

  produtos[index] = { ...produtos[index], ...req.body };
  res.json({ message: 'Produto atualizado', produto: produtos[index] });
};

exports.deletar = (req, res) => {
  const index = produtos.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Produto não encontrado' });

  produtos.splice(index, 1);
  res.json({ message: 'Produto deletado' });
};