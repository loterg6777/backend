const JWT = require('../../helpers/jwt');

// CONTROLE DE USUARIOS
const UserService = require('./service');

// BUSCA TODOS USUARIOS POR DOCUMENTO
const buscarUsuario = async (req, res) => {
    const {documento} = req.query
    console.log(req.query) //=
    const usuarios = await UserService.buscarUsuario({documento})
    res.send(usuarios)
}
// CRIAR USUARIOS
const criarUsuario = async (req, res) => {
    const novoUsuario = req.body
    await UserService.criarUsuario(novoUsuario)
    res.send(novoUsuario)
}
// ATUALIZA USUARIO
const atualizarUsuario = async (req, res) => {
    const id = req.params.id
    const changes = req.body

    const usuarioAtualizado = await UserService.atualizarUsuario(id, changes)

    res.send(usuarioAtualizado)
}
// DELETA O USUARIO
const deletarUsuario = async (req, res) => {
    const id = req.params.id
    await UserService.deletarUsuario(id)
    res.send(`Usuario "${id}" deletado.`)
}

// DELETA VÁRIOS USUÁRIOS
const deletarVariosUsuarios = async (req, res) => {
    const { users } = req.body
    UserService.deletarVariosUsuarios(users)
        .then(listaDeUsuarios => {
            res.json({users: listaDeUsuarios})
        })
        .catch(err => console.log(err))
}

// AUTENTICAÇÃO LOGIN
const loginPage = async (req, res) => {
    const { email, senha } = req.body
    if (!email || !senha) return res.status(400).send('DEU ERRO')

    const usuario = await UserService.buscarUsuarioEmail(email)
    console.log(email)
    console.log(usuario)
    if (!usuario) return res.send(404).send('documento incorreto.')
    
    if (usuario.senha !== senha) return res.status(401).send('Senha errada.')

    const payload = {
        id: usuario._id,
        email: usuario.email,
        tipo: usuario.tipo
    }

    const token = JWT.sign(payload)

    res.send({ token })
}
    
// DECODE do JWT para Pegar Email ou Nome
const dashBoard = async (req, res) => {
    res.send(`Olá, ${req.decodedToken.email}, seja Bem-vindo`)
}

module.exports = {
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    deletarVariosUsuarios,
    loginPage,
    dashBoard
}