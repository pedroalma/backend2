const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/produtosControlles');

// Rotas CRUD
router.get('/',    ctrl.listarTodos);
router.post('/',   ctrl.criar);
router.get('/:id', ctrl.buscarPorId);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.deletar);

module.exports = router;