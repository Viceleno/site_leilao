const express = require("express");
const app = express();
const path = require("path");

const { Pool } = require("pg");

// Configurar a conexão com o banco de dados
const porta_bd =
  "postgresql://neondb_owner:SHg2yYZXitM1@ep-round-lake-a50qe1yo.us-east-2.aws.neon.tech/neondb?sslmode=require";

const PORT = 3000;
const conexao = new Pool({
  connectionString: porta_bd,
  ssl: {
    rejectUnauthorized: true,
  },
});
// Configurar middleware
// app.use(bodyParser.json());
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.engine("html", require("ejs").renderFile);

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "leilao")));

app.get("/usuario", async (req, res) => {
    res.render(__dirname + '/leilao/usuario.html');
});    

// Rota para registrar usuário
app.post("/usuario", async (req, res) => {
  const { nome_usuario, senha, email } = req.body;
  try {
    const result = await conexao.query(
      "INSERT INTO usuarios (nome_usuario, senha, email) VALUES ($1, $2, $3) RETURNING *",
      [nome_usuario, senha, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar item
app.post("/criar_item", async (req, res) => {
  const { user_id, nome, descricao, lance_inicial } = req.body;
  try {
    const result = await conexao.query(
      "INSERT INTO itens (user_id, nome, descricao, lance_inicial) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, nome, descricao, lance_inicial]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar leilão
app.post("/criar_leilao", async (req, res) => {
  const { item_id, data_inicio, data_fim } = req.body;
  try {
    const result = await conexao.query(
      "INSERT INTO leiloes (item_id, data_inicio, data_fim) VALUES ($1, $2, $3) RETURNING *",
      [item_id, data_inicio, data_fim]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para fazer lance
app.post("/lance", async (req, res) => {
  const { leilao_id, user_id, valor_lance } = req.body;
  try {
    const result = await conexao.query(
      "INSERT INTO lances (leilao_id, user_id, valor_lance) VALUES ($1, $2, $3) RETURNING *",
      [leilao_id, user_id, valor_lance]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para obter leilões e itens
app.get("/index", async (req, res) => {
  try {
    const result = await conexao.query(
      `SELECT l.id as leilao_id, i.nome as item_nome, l.data_inicio, l.data_fim
            FROM leiloes l
            JOIN itens i ON l.item_id = i.id`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
