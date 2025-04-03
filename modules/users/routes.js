const UserController = require('./controller');
const FavoritoController = require('./favoritoController');

const USERS_URL = '/usuarios';
const FAVORITOS_URL = '/favoritos';

const initialize = (app) => {
    // ROTAS USUÁRIOS
    app.get(USERS_URL, UserController.buscarUsuario);
    app.post(USERS_URL, UserController.criarUsuario);
    app.patch(`${USERS_URL}/:id`, UserController.atualizarUsuario);
    app.delete(`${USERS_URL}/:id`, UserController.deletarUsuario);
    app.delete(`${USERS_URL}`, UserController.deletarVariosUsuarios);

    // LOGIN
    app.post(`${USERS_URL}/login`, UserController.loginPage);

    // PÁGINA SECRETA
    app.get(`${USERS_URL}/dashboard`, UserController.dashBoard);

    // ROTAS FAVORITOS
    app.get(FAVORITOS_URL, FavoritoController.listarFavoritos);
    app.post(FAVORITOS_URL, FavoritoController.adicionarFavorito);
    app.delete(`${FAVORITOS_URL}/:id`, FavoritoController.removerFavorito);
};

module.exports = {
    initialize
};
