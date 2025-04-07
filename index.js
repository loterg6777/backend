// 📁 Caminho: index.js

// 📦 Importações principais
require('dotenv').config();               // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');       // Framework web para criar o servidor
const mongoose = require('mongoose');     // ODM para manipular o MongoDB
const cors = require('cors');             // Middleware de segurança para permitir requisições de outros domínios
const bodyParser = require('body-parser');// Middleware para interpretar JSON

// 🚀 Inicializa o app Express
const app = express();

// ✅ Middlewares globais
app.use(bodyParser.json()); // Permite interpretar JSON no corpo das requisições

// 🔐 CORS: Liberação controlada de origem
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

app.use(cors({
  origin: allowedOrigin,                 // Libera requisições apenas do domínio informado
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos na API
  credentials: true                      // Permite envio de cookies/sessão (se necessário)
}));

// ✅ Log para verificar se o CORS está configurado corretamente
console.log('🌐 CORS liberado para:', allowedOrigin);

// 📁 Importa as rotas do módulo de usuários/favoritos
const userRoutes = require('./modules/users/routes');

// 📌 Usa todas as rotas definidas no router (já estão com prefixo no próprio arquivo)
app.use('/', userRoutes); // Ex: GET /usuarios ou POST /favoritos

// 🔗 Conexão com o MongoDB usando a URI do .env
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado ao MongoDB!');
})
.catch((err) => {
  console.error('❌ Erro ao conectar ao MongoDB:', err.message);
});

// 🌍 Inicializa o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escutando na porta ${PORT}`);
});
