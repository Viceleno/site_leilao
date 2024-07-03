const express = require('express');
const router = express.Router();
const controladorItem = require('../controladores/controladorItem');

router.post('/itens', controladorItem.criarItem);
router.get('/itens', controladorItem.listarItens);
router.put('/itens/:item_id', controladorItem.atualizarItem);
router.delete('/itens/:item_id', controladorItem.apagarItem);

module.exports = router;
