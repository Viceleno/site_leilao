const pool = require('../config/config');

// exports.criarItem = async (req, res) => {
//     const { leilao_id, usuario_id, nome, descricao, lance_inicial } = req.body;
//     try {
//         console.log('Tentando criar item:', req.body);
//         const resultado = await pool.query('SELECT * FROM Itens WHERE nome = $1', [nome]);
//         if (resultado.rows.length > 0) {
//             console.log('Item com esse nome já existe');
//             return res.status(400).json({ error: 'Item com esse nome já existe' });
//         }
//         await pool.query(
//             'INSERT INTO Itens (leilao_id, usuario_id, nome, descricao, lance_inicial) VALUES ($1, $2, $3, $4, $5)',
//             [leilao_id, usuario_id, nome, descricao, lance_inicial]
//         );
//         res.status(201).json({ success: true });
//     } catch (err) {
//         console.error('Erro ao criar item:', err);
//         res.status(500).json({ error: err.message });
//     }
// };
exports.criarItem = async (req, res) => {
    const { leilao_id, nome, descricao, lance_inicial } = req.body;
    const usuario_id = req.user ? req.user.id : null; // Ajuste aqui para obter o usuário logado, se necessário
  
    try {
      const resultado = await pool.query(
        `INSERT INTO itens (leilao_id, usuario_id, nome, descricao, lance_inicial)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [leilao_id, usuario_id, nome, descricao, lance_inicial]
      );
      res.status(201).json({ success: true, item: resultado.rows[0] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

exports.listarItens = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM Itens');
        res.status(200).json(resultado.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.atualizarItem = async (req, res) => {
    const { item_id } = req.params;
    const { nome, descricao, lance_inicial } = req.body;
    try {
        const resultado = await pool.query('SELECT * FROM Itens WHERE nome = $1 AND item_id != $2', [nome, item_id]);
        if (resultado.rows.length > 0) {
            return res.status(400).json({ error: 'Outro item com esse nome já existe' });
        }
        await pool.query(
            'UPDATE Itens SET nome = $1, descricao = $2, lance_inicial = $3 WHERE item_id = $4',
            [nome, descricao, lance_inicial, item_id]
        );
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.apagarItem = async (req, res) => {
    const { item_id } = req.params;
    try {
        await pool.query('DELETE FROM Itens WHERE item_id = $1', [item_id]);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
