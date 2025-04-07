const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('./database');
const userRoutes = require('./modules/users/routes');

dotenv.config(); // Carrega variáveis do .env

Database.connect();

const app = express();
const porta = process.env.PORT || 8080;
const allowedOrigin = process.env.ALLOWED_ORIGIN;

// Middleware
app.use(bodyParser.json());

// CORS configurado com origem permitida do .env
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  credentials: true
}));

// Rotas
userRoutes.initialize(app); // Usar apenas uma vez, se ele cuida de users e favoritos, OK

// Inicia o servidor
app.listen(porta, () => {
  console.log(`Servidor escutando na porta ${porta}.`);
});
