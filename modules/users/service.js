const UserModel = require('./model');
// SERVIÇOS DA API BACKEND

// BUSCAR USUARIOS COM OU SEM DOCUMENTO
const buscarUsuario = async ({documento}) => {
    if(documento) {
        const usuarios = await UserModel.find({documento})
        return usuarios
    } else {
        const usuarios = await UserModel.find()
        return usuarios
    }
}

// RETORNA USUARIO POR EMAIL
const buscarUsuarioEmail = async (email) => {
    const usuario = await UserModel.findOne({email})
    return usuario
}

// RETORNA USUARIO POR DOCUMENTO
const buscarUsuarioDocumento = async (documento) => {
    const usuario = await UserModel.findOne({documento})
    return usuario
}

// CRIANDO USUARIO
const criarUsuario = async (novoUsuario) => {
    const usuarioCriado = await UserModel.create(novoUsuario)
    return usuarioCriado
}

// ATUALIZAR USUARIO
const atualizarUsuario = async (id, changes) => {
    const usuario = await UserModel.findById(id)
    Object.assign(usuario, changes)
    await usuario.save()
    return usuario
}

// DELETAR USUARIO
const deletarUsuario = async (id) => {
    await UserModel.findByIdAndDelete(id)
}
// $in CONTIDOS EM UM PARAMETRO (MONGODB)
const deletarVariosUsuarios = async (listaDeUsuarios) => {
    const removed = await UserModel.remove({_id: {$in: listaDeUsuarios}})
    console.log(removed)
    return removed
}

module.exports = {
    buscarUsuario,
    atualizarUsuario,
    criarUsuario,
    deletarUsuario,
    buscarUsuarioEmail,
    buscarUsuarioDocumento
}