const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./modules/users/routes');
const favoritoRoutes = require('./modules/users/routes');
const Database = require('./database');
const cors = require('cors');

// Carrega variáveis de ambiente se não for produção
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

Database.connect();

const app = express();
const porta = process.env.PORT || 8080;

// Configuração CORS usando a variável do .env
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(bodyParser.json());

// Rotas
userRoutes.initialize(app);
favoritoRoutes.initialize(app);

app.listen(porta, () => {
  console.log(`Servidor escutando a porta ${porta}.`);
  console.log(`CORS liberado para: ${allowedOrigin}`);
});
