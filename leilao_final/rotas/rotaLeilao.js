const express = require('express');
const router = express.Router();
const controladorLeilao = require('../controladores/controladorLeilao');

router.post('/leiloes', controladorLeilao.criarLeilao);
router.put('/leiloes/:leilao_id', controladorLeilao.atualizarLeilao);
router.delete('/leiloes/:leilao_id', controladorLeilao.apagarLeilao);

module.exports = router;
