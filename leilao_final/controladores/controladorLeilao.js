//  const pool = require("../config/config");

// exports.criarLeilao = async (req, res) => {
//   const { inicio_em, fim_em } = req.body;
//   try {
//     const resultado = await pool.query(
//       "INSERT INTO Leiloes (inicio_em, fim_em) VALUES ($1, $2) RETURNING leilao_id",
//       [inicio_em, fim_em]
//     );
//     res.status(201).json({ leilao_id: resultado.rows[0].leilao_id });
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };

// exports.atualizarLeilao = async (req, res) => {
//   const { leilao_id } = req.params;
//   const { item_id, inicio_em, fim_em } = req.body;
//   try {
//     await pool.query(
//       "UPDATE Leiloes SET item_id = $1, inicio_em = $2, fim_em = $3 WHERE leilao_id = $4",
//       [item_id, inicio_em, fim_em, leilao_id]
//     );
//     res.status(200).json({ mensagem: "Leilão atualizado com sucesso" });
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };

// exports.apagarLeilao = async (req, res) => {
//   const { leilao_id } = req.params;
//   try {
//     await pool.query("DELETE FROM Leiloes WHERE leilao_id = $1", [leilao_id]);
//     res.status(200).json({ mensagem: "Leilão apagado com sucesso" });
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };

const pool = require("../config/config");

exports.criarLeilao = async (req, res) => {
  const { inicio_em, fim_em } = req.body;
  try {
    const resultado = await pool.query(
      "INSERT INTO Leiloes (inicio_em, fim_em) VALUES ($1, $2) RETURNING leilao_id",
      [inicio_em, fim_em]
    );
    res.status(201).json({ leilao_id: resultado.rows[0].leilao_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarLeilao = async (req, res) => {
  const { leilao_id } = req.params;
  const { item_id, inicio_em, fim_em } = req.body;
  try {
    await pool.query(
      "UPDATE Leiloes SET item_id = $1, inicio_em = $2, fim_em = $3 WHERE leilao_id = $4",
      [item_id, inicio_em, fim_em, leilao_id]
    );
    res.status(200).json({ mensagem: "Leilão atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.apagarLeilao = async (req, res) => {
  const { leilao_id } = req.params;
  try {
    await pool.query("DELETE FROM Leiloes WHERE leilao_id = $1", [leilao_id]);
    res.status(200).json({ mensagem: "Leilão apagado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
