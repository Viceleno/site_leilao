const pool = require('../config/config');

exports.criarLance = async (req, res) => {
  const { leilao_id, valor_lance } = req.body;

  try {
    // Consultar o nome do item, o leilão ao qual o item pertence, o último lance e o lance inicial do item
    const consultaItem = await pool.query(
      `SELECT i.nome AS nome_item, i.lance_inicial, COALESCE(MAX(l.valor_lance), i.lance_inicial) AS ultimo_lance, i.leilao_id
       FROM itens i
       LEFT JOIN lances l ON i.item_id = l.item_id
       WHERE i.leilao_id = $1
       GROUP BY i.nome, i.lance_inicial, i.leilao_id`,
      [leilao_id]
    );

    if (consultaItem.rows.length === 0) {
      return res.status(404).json({ erro: 'Leilão ou item não encontrado.' });
    }

    const { nome_item, lance_inicial, ultimo_lance, leilao_id } = consultaItem.rows[0];

    // Verificar se o valor do novo lance é maior que o último lance ou o lance inicial
    if (parseFloat(valor_lance) <= parseFloat(ultimo_lance)) {
      return res.status(400).json({ erro: 'O valor do lance deve ser maior que o último lance registrado.' });
    }

    // Inserir o novo lance no banco de dados
    const resultado = await pool.query(
      'INSERT INTO lances (leilao_id, valor_lance) VALUES ($1, $2) RETURNING lance_id',
      [leilao_id, valor_lance]
    );

    res.status(201).json({ lance_id: resultado.rows[0].lance_id, nome_item, leilao_id, ultimo_lance });
  } catch (err) {
    console.error('Erro ao criar lance:', err);
    res.status(500).json({ erro: err.message });
  }
};
