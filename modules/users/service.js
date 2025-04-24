const { UserModel } = require('./model'); // Importação correta


// BUSCAR USUÁRIOS COM OU SEM DOCUMENTO
const buscarUsuario = async ({ documento }) => {
    return documento 
        ? await UserModel.find({ documento }) 
        : await UserModel.find();
};

// RETORNAR USUÁRIO POR EMAIL
const buscarUsuarioEmail = async (email) => {
    return await UserModel.findOne({ email });
};

// RETORNAR USUÁRIO POR DOCUMENTO
const buscarUsuarioDocumento = async (documento) => {
    return await UserModel.findOne({ documento });
};

// CRIAR USUÁRIO
const criarUsuario = async (novoUsuario) => {
    try {
        const usuarioCriado = await UserModel.create(novoUsuario);
        // Garantindo que o objeto retornado tenha todos os campos necessários
        return usuarioCriado.toObject();
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
};

// ATUALIZAR USUÁRIO
const atualizarUsuario = async (id, changes) => {
    try {
        const usuario = await UserModel.findById(id);
        if (!usuario) throw new Error("Usuário não encontrado.");
        
        Object.assign(usuario, changes);
        await usuario.save();
        
        return usuario;
    } catch (error) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
};

// DELETAR USUÁRIO
const deletarUsuario = async (id) => {
    try {
        const usuario = await UserModel.findByIdAndDelete(id);
        if (!usuario) throw new Error("Usuário não encontrado.");
    } catch (error) {
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
};

// DELETAR VÁRIOS USUÁRIOS
const deletarVariosUsuarios = async (listaDeUsuarios) => {
    try {
        const removed = await UserModel.deleteMany({ _id: { $in: listaDeUsuarios } });
        return removed;
    } catch (error) {
        throw new Error(`Erro ao deletar múltiplos usuários: ${error.message}`);
    }
};

module.exports = {
    buscarUsuario,
    buscarUsuarioEmail,
    buscarUsuarioDocumento,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    deletarVariosUsuarios
};
