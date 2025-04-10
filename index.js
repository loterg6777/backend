// 📁 Caminho: index.js

// 📦 Importações principais
require('dotenv').config();               
const express = require('express');       
const mongoose = require('mongoose');     
const cors = require('cors');             
const bodyParser = require('body-parser');

// 🚀 Inicializa o app Express
const app = express();

// ✅ Middlewares globais
app.use(bodyParser.json());

// 🔐 CORS: Liberação de origens
const isDevelopment = process.env.NODE_ENV !== 'production';

const allowedOrigins = isDevelopment
  ? ['http://localhost:3000']
  : [
      process.env.ALLOWED_ORIGIN_SITE,
      process.env.ALLOWED_ORIGIN_PAINEL
    ];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`❌ Origin not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

console.log('🌐 CORS liberado para:', allowedOrigins);

// 📁 Rotas
const userRoutes = require('./modules/users/routes');
app.use('/', userRoutes);

// 🔗 Conexão com o MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB!'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err.message));

// 🌍 Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escutando na porta ${PORT}`);
});
