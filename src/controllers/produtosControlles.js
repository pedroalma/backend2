// src/controllers/produtosControllers.js
const { Produto } = require('../models');

exports.criar = async (req, res) => {
 try {
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

 // Validações básicas
 if (!descricao || !quantidade || !peso || !unidade) {
 return res.status(400).json({ 
 erro: "Campos obrigatórios: descricao, quantidade, peso, unidade" 
 });
 }

 const unidadesValidas = ['kg', 'g', 'l', 'ml', 'un', 'cx', 'pct'];
 if (!unidadesValidas.includes(unidade.toLowerCase())) {
 return res.status(400).json({ erro: "Unidade inválida (kg, g, l, ml, un, cx, pct)" });
 }

 const novoProduto = await Produto.create({
  descricao: descricao.trim(),
  quantidade: Number(quantidade),
  peso: Number(peso),
  unidade: unidade.toLowerCase(),
  codBar: codBar || '0000000000000',  // valor padrão temporário (ou gere um único)
  dataDeEntrada: dataDeEntrada ? new Date(dataDeEntrada) : new Date(),
  dataDeValidade: dataDeValidade ? new Date(dataDeValidade) : new Date(),
  dataLimiteDeSaida: dataLimiteDeSaida ? new Date(dataLimiteDeSaida) : null,
  
  // Valores FIXOS para teste (pegue valores reais das tabelas referenciadas)
  codUsu: 1,      // <--- mude para um codUsu REAL existente em tbusuarios
  codOri: 1,      // <--- mude para um codOri REAL existente em tborigemdocao
  codList: 1      // <--- mude para um codList REAL existente em tblista
});

 res.status(201).json({
 mensagem: "Produto cadastrado com sucesso",
 produto: novoProduto
 });
 } catch (error) {
 console.error('Erro ao criar produto:', error);
 res.status(500).json({ 
 erro: "Erro ao cadastrar produto", 
 detalhes: error.message 
 });
 }
};

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