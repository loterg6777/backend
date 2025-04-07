// 📦 Importações principais
require('dotenv').config();              // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');     // Framework para criar o servidor HTTP
const mongoose = require('mongoose');   // ODM para MongoDB
const cors = require('cors');           // Middleware para permitir requisições de outros domínios
const bodyParser = require('body-parser'); // Para interpretar o body das requisições

// 🚀 Inicializa o app
const app = express();

// ✅ Middlewares globais
app.use(bodyParser.json()); // Permite interpretar JSON nas requisições

// ⚠️ Configuração de CORS segura
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,           // Libera apenas para esse domínio
  methods: ['GET', 'POST'],        // Métodos permitidos
  credentials: true                // Permite uso de cookies/sessão se necessário
}));

// 📌 Log simples para checar se a variável de ambiente foi lida corretamente
console.log('🌐 CORS liberado para:', allowedOrigin);

// 📁 Importa rotas de usuários
const usuariosRoutes = require('./modules/users/routes');

// 📌 Usa as rotas
app.use('/usuarios', usuariosRoutes);

// 🔗 Conexão com o MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB!'))
.catch((err) => {
  console.error('❌ Erro ao conectar ao MongoDB:', err.message);
});

// 🌍 Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escutando na porta ${PORT}`);
});
