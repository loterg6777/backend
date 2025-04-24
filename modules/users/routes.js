// Caminho: modules/users/routes.js

const express = require('express');
const router = express.Router();

// Controllers responsáveis pela lógica de negócio
const UserController = require('./controller');
const FavoritoController = require('./favoritoController');

// ================= ROTAS RELACIONADAS A USUÁRIOS ================= //

// Busca todos os usuários ou um específico via query params
router.get('/usuarios', (req, res) => {
  console.log('[GET] /usuarios - Buscando usuários');
  UserController.buscarUsuario(req, res);
});

// Cria um novo usuário
router.post('/usuarios', (req, res) => {
  console.log('[POST] /usuarios - Criando novo usuário');
  UserController.criarUsuario(req, res);
});

// Atualiza dados de um usuário específico via ID
router.patch('/usuarios/:id', (req, res) => {
  console.log(`[PATCH] /usuarios/${req.params.id} - Atualizando usuário`);
  UserController.atualizarUsuario(req, res);
});

// Remove um usuário específico via ID
router.delete('/usuarios/:id', (req, res) => {
  console.log(`[DELETE] /usuarios/${req.params.id} - Deletando usuário`);
  UserController.deletarUsuario(req, res);
});

// Remove múltiplos usuários - lógica definida no controller
router.delete('/usuarios', (req, res) => {
  console.log('[DELETE] /usuarios - Deletando múltiplos usuários');
  UserController.deletarVariosUsuarios(req, res);
});

// ================= ROTAS DE LOGIN ================= //

// Endpoint de login - valida usuário e senha
router.post('/usuarios/login', (req, res) => {
  console.log('[POST] /usuarios/login - Tentativa de login');
  UserController.loginPage(req, res);
});

// Página protegida, acessível após login
router.get('/usuarios/dashboard', (req, res) => {
  console.log('[GET] /usuarios/dashboard - Acessando dashboard');
  UserController.dashBoard(req, res);
});

// ================= ROTAS RELACIONADAS A FAVORITOS ================= //

// Lista todos os favoritos
router.get('/favoritos', (req, res) => {
  console.log('[GET] /favoritos - Listando favoritos');
  FavoritoController.listarFavoritos(req, res);
});

// Adiciona um novo favorito
router.post('/favoritos', (req, res) => {
  console.log('[POST] /favoritos - Adicionando favorito');
  FavoritoController.adicionarFavorito(req, res);
});

// Remove um favorito específico via ID
router.delete('/favoritos/:id', (req, res) => {
  console.log(`[DELETE] /favoritos/${req.params.id} - Removendo favorito`);
  FavoritoController.removerFavorito(req, res);
});

// ================= ROTA DE PING ================= //
router.get('/ping', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Exporta o router para ser utilizado no index.js
console.log('✅ Rotas de usuários e favoritos prontas!');
module.exports = router;
