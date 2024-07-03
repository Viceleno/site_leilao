const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Importar rotas
const rotaUsuario = require('./rotas/rotaUsuario');
const rotaItem = require('./rotas/rotaItem');
const rotaLeilao = require('./rotas/rotaLeilao');
const rotaLance = require('./rotas/rotaLance');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configura o motor de template EJS para renderizar arquivos HTML.
app.engine("html", require("ejs").renderFile);

// Define o diretório onde os arquivos estáticos serão servidos
app.use(express.static(path.join(__dirname, 'publico')));

// Usar rotas
app.use('/api', rotaUsuario);
app.use('/api', rotaItem);
app.use('/api', rotaLeilao);
app.use('/api', rotaLance);

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publico', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
