const pool = require('../config/config');
const bcrypt = require('bcrypt');

exports.criarUsuario = async (req, res) => {
  const { nome_usuario, senha, email } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const resultado = await pool.query(
      'INSERT INTO Usuarios (nome_usuario, senha, email) VALUES ($1, $2, $3) RETURNING usuario_id',
      [nome_usuario, senhaHash, email]
    );
    res.status(201).json({ usuario_id: resultado.rows[0].usuario_id });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.loginUsuario = async (req, res) => {
  const { nome_usuario, senha } = req.body;
  try {
    const resultado = await pool.query('SELECT * FROM Usuarios WHERE nome_usuario = $1', [nome_usuario]);
    if (resultado.rows.length > 0) {
      const usuario = resultado.rows[0];
      const correspondencia = await bcrypt.compare(senha, usuario.senha);
      if (correspondencia) {
        res.status(200).json({ usuario_id: usuario.usuario_id, nome_usuario: usuario.nome_usuario });
      } else {
        res.status(401).json({ erro: 'Senha incorreta' });
      }
    } else {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
