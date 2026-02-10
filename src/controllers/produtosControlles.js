const produtos = require('../data/produtos');

exports.listarTodos = (req, res) => {
  res.status(200).json(produtos);
};

exports.criar = (req, res) => {
  const {
    nomeProduto,
    unidade,                // "kg", "g", "L", "ml"
    quantidadePorUnidade,   // número: 5, 500, 900, etc.
    quantidadeDePacotes,
    validade,
    dataRecebimento,
    descricao
  } = req.body;

  // Validação básica dos campos obrigatórios
  if (!nomeProduto || !unidade || !quantidadePorUnidade || !validade || !dataRecebimento || quantidadeDePacotes <= 0 ) {
    return res.status(400).json({
      erro: "Os campos nomeProduto, unidade, quantidadePorUnidade , validade e dataRecebimento  são obrigatórios"
    });
  }

  // Validação simples da unidade
  const unidadesValidas = ['kg', 'g', 'L', 'ml', 'KG', 'G', 'l', 'ML']; 
  if (!unidadesValidas.includes(unidade)) {
    return res.status(400).json({
      erro: "Unidade inválida. Use: kg, g, L ou ml"
    })
  }

  // Validação do número quantidadePorUnidade
  const qtdNum = Number(quantidadePorUnidade);
  if (isNaN(qtdNum) || qtdNum <= 0) {
    return res.status(400).json({
      erro: "quantidadePorUnidade deve ser um número positivo"
    });
  }

  const novoProduto = {
    id: Date.now().toString(),
    nomeProduto,
    unidade,
    quantidadePorUnidade: qtdNum,
    quantidadeDePacotes: Number(quantidadeDePacotes),
    validade,
    dataRecebimento: dataRecebimento || null,
    descricao: descricao?.trim() || "",
    createdAt: new Date().toISOString()
  };

  produtos.push(novoProduto);

  res.status(201).json({
    mensagem: "Produto criado com sucesso",
    produto: novoProduto
  });
};


exports.buscarPorId = (req, res) => {
  const produto = produtos.find(p => p.id === req.params.id);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  res.status(200).json(produto);
};

exports.atualizar = (req, res) => {
  const index = produtos.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  const {
    nomeProduto,
    unidade,
    quantidadePorUnidade,
    quantidadeDePacotes,
    validade,
    dataRecebimento,
    descricao
  } = req.body;

  // Validações apenas nos campos que foram enviados
  if (unidade && !['kg', 'g', 'L', 'ml', 'KG', 'G', 'l', 'ML'].includes(unidade)) {
    return res.status(400).json({ erro: "Unidade inválida. Use: kg, g, L ou ml" });
  }

  let qtdPorUnidadeAtualizada = produtos[index].quantidadePorUnidade;
  if (quantidadePorUnidade !== undefined) {
    const qtdNum = Number(quantidadePorUnidade);
    if (isNaN(qtdNum) || qtdNum <= 0) {
      return res.status(400).json({ erro: "quantidadePorUnidade deve ser um número positivo" });
    }
    qtdPorUnidadeAtualizada = qtdNum;
  }

  produtos[index] = {
    ...produtos[index],
    ...(nomeProduto && { nomeProduto }),
    ...(unidade && { unidade }),
    ...(quantidadePorUnidade !== undefined && { quantidadePorUnidade: qtdPorUnidadeAtualizada }),
    ...(quantidadeDePacotes !== undefined && { quantidadeDePacotes: Number(quantidadeDePacotes) }),
    ...(validade && { validade }),
    ...(dataRecebimento !== undefined && { dataRecebimento }),
    ...(descricao !== undefined && { descricao: descricao.trim() }),
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    mensagem: 'Produto atualizado com sucesso',
    produto: produtos[index]
  });
};

exports.deletar = (req, res) => {
  const index = produtos.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  produtos.splice(index, 1);
  res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
};