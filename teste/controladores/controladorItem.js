const pool = require('../config/config');

exports.criarItem = async (req, res) => {
  const { usuario_id, nome, descricao, lance_inicial } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO Itens (usuario_id, nome, descricao, lance_inicial) VALUES ($1, $2, $3, $4) RETURNING item_id',
      [usuario_id, nome, descricao, lance_inicial]
    );
    res.status(201).json({ item_id: resultado.rows[0].item_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
