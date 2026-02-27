// const express = require('express');
// const router = express.Router();
// const ctrl = require('../controllers/produtosControlles');


// router.get('/', ctrl.listarTodos);
// router.post('/', ctrl.criar);
// router.get('/:codProd', ctrl.buscarPorId); // ← mudou de :id para :codProd
// router.put('/:codProd', ctrl.atualizar); // ← mudou
// router.delete('/:codProd', ctrl.deletar); // ← mudou

// module.exports = router;
const express = require('express');
const router = express.Router();

// Importe o controller corretamente (ajuste o caminho se necessário)
const produtosController = require('../controllers/produtosControlles');  // ou produtosController.js se o arquivo for singular

// Rotas
router.post('/', produtosController.cadastrarProduto);  // ou .criar, dependendo do método que você quer usar

// Se você tiver outros métodos
// router.get('/', produtosController.listarTodos);
// router.get('/:codProd', produtosController.buscarPorId);
// router.put('/:codProd', produtosController.atualizar);
// router.delete('/:codProd', produtosController.deletar);

module.exports = router;