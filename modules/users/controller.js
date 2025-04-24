const UserService = require('./service');

// BUSCA TODOS USUARIOS POR DOCUMENTO
const buscarUsuario = async (req, res) => {
    const { documento } = req.query;
    console.log(req.query); // Exibindo query para debug
    const usuarios = await UserService.buscarUsuario({ documento });
    res.send(usuarios);
}

// CRIAR USUARIOS
const criarUsuario = async (req, res) => {
    try {
        const novoUsuario = req.body;
        const usuarioCriado = await UserService.criarUsuario(novoUsuario);
        // Retornando o usuário criado com o ID
        res.json({
            ...novoUsuario,
            id: usuarioCriado._id,
            _id: usuarioCriado._id
        });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: error.message });
    }
}

// ATUALIZA USUARIO
const atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    const usuarioAtualizado = await UserService.atualizarUsuario(id, changes);

    res.send(usuarioAtualizado);
}

// DELETA O USUARIO
const deletarUsuario = async (req, res) => {
    const id = req.params.id;
    
    // Removido o JWT. Não vamos verificar o token agora.
    try {
        await UserService.deletarUsuario(id); // Fazendo a exclusão do usuário
        res.send(`Usuário com ID: "${id}" foi deletado com sucesso.`);
    } catch (error) {
        res.status(500).send('Erro ao deletar o usuário.');
    }
}

// DELETA VÁRIOS USUÁRIOS
const deletarVariosUsuarios = async (req, res) => {
    const { users } = req.body;
    
    try {
        const listaDeUsuarios = await UserService.deletarVariosUsuarios(users);
        res.json({ users: listaDeUsuarios });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao deletar vários usuários.');
    }
}

// AUTENTICAÇÃO LOGIN (Você pode voltar com JWT depois)
const loginPage = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).send('DEU ERRO');

    const usuario = await UserService.buscarUsuarioEmail(email);
    console.log(email);
    console.log(usuario);
    if (!usuario) return res.status(404).send('Documento incorreto.');
    
    if (usuario.senha !== senha) return res.status(401).send('Senha errada.');

    const payload = {
        id: usuario._id,
        email: usuario.email,
        tipo: usuario.tipo
    };

    // JWT removido para teste.
    // const token = JWT.sign(payload);
    res.send({ message: "Login bem-sucedido" });
}

// DECODE do JWT para Pegar Email ou Nome (Você pode voltar com JWT depois)
const dashBoard = async (req, res) => {
    // Removendo a autenticação JWT para testes
    // res.send(`Olá, ${req.decodedToken.email}, seja Bem-vindo`);
    res.send('Olá, seja bem-vindo');
}

module.exports = {
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    deletarVariosUsuarios,
    loginPage,
    dashBoard
};
