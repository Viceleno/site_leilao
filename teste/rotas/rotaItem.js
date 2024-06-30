const express = require('express');
const router = express.Router();
const controladorItem = require('../controladores/controladorItem');

router.post('/itens', controladorItem.criarItem);

module.exports = router;
