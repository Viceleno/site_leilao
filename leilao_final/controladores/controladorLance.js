const pool = require('../config/config');

exports.criarLance = async (req, res) => {
  const { leilao_id, usuario_id, valor_lance } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO Lances (leilao_id, usuario_id, valor_lance) VALUES ($1, $2, $3) RETURNING lance_id',
      [leilao_id, usuario_id, valor_lance]
    );
    res.status(201).json({ lance_id: resultado.rows[0].lance_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
