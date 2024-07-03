const express = require('express');
const router = express.Router();
const controladorLance = require('../controladores/controladorLance');

router.post('/lances', controladorLance.criarLance);

module.exports = router;
