const express = require('express');
const router = express.Router();
const pool = require('../config/config'); 
const controladorLeilao = require('../controladores/controladorLeilao');

router.post('/leiloes', controladorLeilao.criarLeilao);
router.put('/leiloes/:leilao_id', controladorLeilao.atualizarLeilao);
router.delete('/leiloes/:leilao_id', controladorLeilao.apagarLeilao);

router.get('/leiloes', async (req, res) => {
  try {
    console.log('Recebendo requisição para listar leilões');
    const resultado = await pool.query('SELECT leilao_id FROM Leiloes');
    console.log('Dados retornados do banco de dados:', resultado.rows);
    res.status(200).json(resultado.rows);
  } catch (err) {
    console.error('Erro ao buscar leilões:', err);
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
