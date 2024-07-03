const express = require('express');
const router = express.Router();
const controladorUsuario = require('../controladores/controladorUsuario');

router.post('/cadastro', controladorUsuario.criarUsuario);
router.post('/login', controladorUsuario.loginUsuario);

module.exports = router;
