const express = require('express');
const router = express.Router();
const controladorLeilao = require('../controladores/controladorLeilao');

router.post('/leiloes', controladorLeilao.criarLeilao);

module.exports = router;
