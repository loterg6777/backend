const UserController = require('./controller');
//const autenticarMid = require('../../middlewares/middlewares');
//   app.patch(USERS_URL, autenticarMid, UserController.criarUsuario)


const USERS_URL = '/usuarios'

const initialize = (app) => {
    //ROTAS
    app.get(USERS_URL, UserController.buscarUsuario)

    app.post(USERS_URL, UserController.criarUsuario)
    app.patch(`${USERS_URL}/:id`, UserController.atualizarUsuario)
    app.delete(`${USERS_URL}/:id`, UserController.deletarUsuario)
    app.delete(`${USERS_URL}`, UserController.deletarVariosUsuarios)

    //LOGIN
    app.post(`${USERS_URL}/login`, UserController.loginPage)

    //PAGINA SECRETA
    app.get(`${USERS_URL}/dashboard`, UserController.dashBoard)

}

module.exports = {
    initialize
}