const FavoritoModel = require('./model');

// Listar todos os favoritos
const listarFavoritos = async (req, res) => {
    try {
        const favoritos = await FavoritoModel.find();
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar favoritos' });
    }
};

// Adicionar um favorito
const adicionarFavorito = async (req, res) => {
    try {
        const { usuario, dados1, dados2, dadosx1, dadosx2, tel } = req.body;

        // Verificar se o usuário já está nos favoritos
        const favoritoExistente = await FavoritoModel.findOne({ usuario });
        if (favoritoExistente) {
            return res.status(400).json({ error: 'Usuário já está nos favoritos' });
        }

        const novoFavorito = new FavoritoModel({ usuario, dados1, dados2, dadosx1, dadosx2, tel });
        await novoFavorito.save();
        res.status(201).json(novoFavorito);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar favorito' });
    }
};

// Remover um favorito
const removerFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        await FavoritoModel.findByIdAndDelete(id);
        res.json({ message: 'Favorito removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover favorito' });
    }
};

module.exports = {
    listarFavoritos,
    adicionarFavorito,
    removerFavorito
};
