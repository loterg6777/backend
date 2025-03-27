const UserController = require('./controller');
const autenticarMid = require('../../middlewares/middlewares');

const USERS_URL = '/usuarios'

const initialize = (app) => {
    //ROTAS
    app.get(USERS_URL, UserController.buscarUsuario)

    app.post(USERS_URL, UserController.criarUsuario)
    app.patch(`${USERS_URL}/:id`, autenticarMid, UserController.atualizarUsuario)
    app.delete(`${USERS_URL}/:id`, autenticarMid, UserController.deletarUsuario)
    app.delete(`${USERS_URL}`, autenticarMid, UserController.deletarVariosUsuarios)

    //LOGIN
    app.post(`${USERS_URL}/login`, UserController.loginPage)

    //PAGINA SECRETA
    app.get(`${USERS_URL}/dashboard`, autenticarMid, UserController.dashBoard)

}

module.exports = {
    initialize
}