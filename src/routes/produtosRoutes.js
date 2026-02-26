const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produtosControlles');

router.get('/', ctrl.listarTodos);
router.post('/', ctrl.criar);
router.get('/:codProd', ctrl.buscarPorId); // ← mudou de :id para :codProd
router.put('/:codProd', ctrl.atualizar); // ← mudou
router.delete('/:codProd', ctrl.deletar); // ← mudou

module.exports = router;