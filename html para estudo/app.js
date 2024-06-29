const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt'); // Para hash de senha
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração do banco de dados PostgreSQL com a URL de conexão
const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-square-scene-a500isp0.us-east-2.aws.neon.tech',
  database: 'neondb',
  password: 'ldWIy1eHo7uQ',
  port: 5432,
  ssl: {
      rejectUnauthorized: false, // necessário se estiver usando SSL
  },
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.stack);
  } else {
      console.log('Conexão bem-sucedida ao banco de dados PostgreSQL');
  }
});



// Rota para cadastrar um usuário
app.post('/usuarios', async (req, res) => {
  const { nome_usuario, senha, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      'INSERT INTO Usuarios (nome_usuario, senha, email) VALUES ($1, $2, $3) RETURNING usuario_id',
      [nome_usuario, hashedPassword, email]
    );
    res.status(201).json({ usuario_id: result.rows[0].usuario_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para logar um usuário
app.post('/login', async (req, res) => {
  const { nome_usuario, senha } = req.body;
  try {
    const result = await pool.query('SELECT * FROM Usuarios WHERE nome_usuario = $1', [nome_usuario]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(senha, user.senha);
      if (match) {
        res.status(200).json({ usuario_id: user.usuario_id, nome_usuario: user.nome_usuario });
      } else {
        res.status(401).json({ error: 'Senha incorreta' });
      }
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar um item
app.post('/itens', async (req, res) => {
  const { usuario_id, nome, descricao, lance_inicial } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Itens (usuario_id, nome, descricao, lance_inicial) VALUES ($1, $2, $3, $4) RETURNING item_id',
      [usuario_id, nome, descricao, lance_inicial]
    );
    res.status(201).json({ item_id: result.rows[0].item_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar um leilão
app.post('/leiloes', async (req, res) => {
  const { item_id, inicio_em, fim_em } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Leiloes (item_id, inicio_em, fim_em) VALUES ($1, $2, $3) RETURNING leilao_id',
      [item_id, inicio_em, fim_em]
    );
    res.status(201).json({ leilao_id: result.rows[0].leilao_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar um lance
app.post('/lances', async (req, res) => {
  const { leilao_id, usuario_id, valor_lance } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Lances (leilao_id, usuario_id, valor_lance) VALUES ($1, $2, $3) RETURNING lance_id',
      [leilao_id, usuario_id, valor_lance]
    );
    res.status(201).json({ lance_id: result.rows[0].lance_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Define o diretório onde os arquivos estáticos serão servidos
app.use(express.static(path.join(__dirname, 'publico')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publico', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
