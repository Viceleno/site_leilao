const pool = require('../config/config');

exports.criarLeilao = async (req, res) => {
  const { item_id, inicio_em, fim_em } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO Leiloes (item_id, inicio_em, fim_em) VALUES ($1, $2, $3) RETURNING leilao_id',
      [item_id, inicio_em, fim_em]
    );
    res.status(201).json({ leilao_id: resultado.rows[0].leilao_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
