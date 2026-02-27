const { Produto } = require('../models');

exports.cadastrarProduto = async (req, res) => {
  try {
    console.log('Payload recebido:', req.body);

    const {
      descricao,
      quantidade,
      peso,
      unidade,
      codBar,
      dataDeEntrada,
      dataDeValidade,
      dataLimiteDeSaida
    } = req.body;

    // Validações
    if (!descricao || !quantidade || !peso || !unidade) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando" });
    }

    const unidadesValidas = ['kg', 'g', 'l', 'ml', 'un', 'cx', 'pct'];
    if (!unidadesValidas.includes(unidade.toLowerCase())) {
      return res.status(400).json({ erro: "Unidade inválida" });
    }

    const produto = await Produto.create({
      descricao: descricao.trim(),
      quantidade: Number(quantidade),
      peso: Number(peso),
      unidade: unidade.toLowerCase(),
      codBar: codBar || '0000000000000',
      dataDeEntrada: dataDeEntrada ? new Date(dataDeEntrada) : new Date(),
      dataDeValidade: dataDeValidade ? new Date(dataDeValidade) : new Date(),
      dataLimiteDeSaida: dataLimiteDeSaida ? new Date(dataLimiteDeSaida) : null,
      codUsu: 1,
      codOri: 1,
      codList: 1
    });

    console.log('Produto criado:', produto.toJSON());
    return res.status(201).json(produto);
  } catch (err) {
    console.error('ERRO AO CRIAR PRODUTO:');
    console.error(err.message);
    console.error(err.stack);

    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: err.errors.map(e => e.message)
      });
    }

    if (err.name === 'SequelizeDatabaseError' || err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({
        error: 'Erro de banco de dados',
        details: err.message
      });
    }

    return res.status(500).json({
      error: 'Erro interno no servidor',
      message: err.message || 'Detalhes não disponíveis'
    });
  }
};

// Mantenha os outros métodos (listarTodos, buscarPorId, atualizar, deletar)
exports.listarTodos = async (req, res) => {
 try {
 const produtos = await Produto.findAll();
 res.status(200).json({ total: produtos.length, produtos });
 } catch (error) {
 console.error('Erro ao listar:', error);
 res.status(500).json({ erro: "Erro ao listar", detalhes: error.message });
 }
};

exports.buscarPorId = async (req, res) => {
 try {
 const produto = await Produto.findByPk(req.params.codProd); // ← usa codProd, não id
 if (!produto) {
 return res.status(404).json({ erro: 'Produto não encontrado' });
 }
 res.json(produto);
 } catch (error) {
 console.error('Erro ao buscar:', error);
 res.status(500).json({ erro: "Erro ao buscar", detalhes: error.message });
 }
};

exports.atualizar = async (req, res) => {
 try {
 const produto = await Produto.findByPk(req.params.codProd); // ← usa codProd
 if (!produto) {
 return res.status(404).json({ erro: 'Produto não encontrado' });
 }

 const updates = req.body;
 if (updates.unidade) {
 updates.unidade = updates.unidade.toLowerCase();
 }

 // Converte datas se enviadas como string
 if (updates.dataDeEntrada) updates.dataDeEntrada = new Date(updates.dataDeEntrada);
 if (updates.dataDeValidade) updates.dataDeValidade = new Date(updates.dataDeValidade);
 if (updates.dataLimiteDeSaida) updates.dataLimiteDeSaida = new Date(updates.dataLimiteDeSaida);

 await produto.update(updates);

 res.json({ mensagem: "Produto atualizado com sucesso", produto });
 } catch (error) {
 console.error('Erro ao atualizar:', error);
 res.status(500).json({ erro: "Erro ao atualizar", detalhes: error.message });
 }
};

exports.deletar = async (req, res) => {
 try {
 const produto = await Produto.findByPk(req.params.codProd); // ← usa codProd
 if (!produto) {
 return res.status(404).json({ erro: 'Produto não encontrado' });
 }

 await produto.destroy();
 res.json({ mensagem: "Produto deletado com sucesso" });
 } catch (error) {
 console.error('Erro ao deletar:', error);
 res.status(500).json({ erro: "Erro ao deletar", detalhes: error.message });
 }
};