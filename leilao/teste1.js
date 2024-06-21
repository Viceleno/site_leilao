const express = require("express");
const app = express();
const path = require("path");

const { Pool } = require("pg");

//atualizar com o string de conexão do seu banco de dados posgres no https://neon.tech/
const url_bancoDeDados =
  "postgresql://aulaweb_owner:DG4dehLYQka3@ep-yellow-smoke-a5rug8y3.us-east-2.aws.neon.tech/aulaweb?sslmode=require";

const conexao = new Pool({
  connectionString: url_bancoDeDados,
  ssl: {
    rejectUnauthorized: true,
  },
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "paginas")));

//página principal
app.get("/", async function (req, res) {
  try {
    const id = 1;
    var cliente = await conexao.connect();

    const pessoaResul = await conexao.query(
      "select * from pessoa Where id = $1",
      [id],
    );

    const pessoa = pessoaResul.rows[0];

    const conhecimentoResult = await conexao.query(
      "SELECT * FROM conhecimento where pessoa_id = $1",
      [id],
    );

    const conhecimentos = conhecimentoResult.rows;

    res.render(__dirname + "/paginas/principal.html", {
      pessoa,
      conhecimentos,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

//mostrar a página com formulário de cadastrar
app.get("/cadastrar", async function (req, res) {
  res.render(__dirname + "/paginas/cadastrar.html");
});

//receber o dados que veio do formulário de cadastrar
app.post("/cadastrar", async function (req, res) {
  const { nome, idade, cidade } = req.body;

  try {
    const cx = await conexao.connect();
    const insert = "insert into pessoa (nome,idade,cidade) values ($1, $2, $3)";
    await cx.query(insert, [nome, idade, cidade]);
    cx.release();
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});

app.get("/editarpessoa/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const cx = await conexao.connect();
    const pessoaResult = await cx.query(
      "SELECT * FROM pessoa WHERE id = $1", [id],);
    const pessoa = pessoaResult.rows[0];

    res.render(__dirname + "/paginas/editar.html", { pessoa });
  } catch (e) {
    console.log(e.message);
    res.redirect("/listar");
  }
});


app.post("/editarpessoa", async function (req, res){
const { id, nome, idade, cidade} = req.body;

try{
  const cx = await conexao.connect();

  const updateSQL = "Update pessoa set nome = $1, idade = $2, cidade = $3 Where  id = $4";

  await cx.query(updateSQL,[nome, idade, cidade, id])
  cx.release();
}catch (e){
  console.log(e)
}
 res.redirect("/listar") 
  
})

//aqui só retorna o JSON com os dados da tabela
app.get("/pessoaAPI", async function (req,res){
  try{
    const cx = await conexao.connect()
    const pessoaResult = await conexao.query("select * from pessoa")
    const pessoa = pessoaResult.rows
    
    return res.json(pessoa)
  }
  catch(e){
    console.log(e)
  }
})

//aqui só retorna o JSON com os dados da tabela
app.get("/pessoaAPI/:id", async function (req,res){
  const {id} = req.params
  try{
    const cx = await conexao.connect()
    const pessoaResult = await conexao.query("select * from pessoa where id = $1",[id])
    const pessoa = pessoaResult.rows

    return res.json(pessoa)
  }
  catch(e){
    console.log(e)
  }
})




//listar todas as pessoas do banco de dados
app.get("/listar", async function (req, res) {
  try {
    const cx = await conexao.connect();
    const pessoas = await cx.query("select * from pessoa order by id");
    const pessoasResultado = pessoas.rows;
    res.render(__dirname + "/paginas/listar.html", { pessoasResultado });
  } catch (e) {
    console.log(e);
  }
});

//excluiur uma pessoa pelo ID
app.get("/excluir/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const pessoaDeletada = await conexao.query(
      "delete from pessoa where id = $1",
      [id],
    );
  } catch (e) {
    console.log(e);
  }
  res.redirect("/listar");
});

app.listen(3000, function () {
  console.log("Rodando na porta 3000");
});