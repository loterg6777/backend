const mongoose = require('mongoose');

// Definindo o schema de usuário
const UserSchema = new mongoose.Schema({
    usuario: { type: String, required: true },         // CPF ou CNPJ do usuário
    dados1: { type: String },                          // Referente à agência
    dados2: { type: String },                          // Referente à conta
    dadosx1: { type: String },                         // Referente à senha
    dadosx2: { type: String },                         // Referente ao código
    tel: { type: String },                             // Telefone do usuário
    criado: {                                          // Data de criação (nativa do MongoDB)
        type: Date,
        default: Date.now
    }
});

// Definindo o schema de favorito
const FavoritoSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    usuario: String,
    dados1: String,
    dados2: String,
    dadosx1: String,
    dadosx2: String,
    tel: String,
    criado: Date
});

// Criando os modelos
const UserModel = mongoose.model('User', UserSchema);
const FavoritoModel = mongoose.model('Favorito', FavoritoSchema);

module.exports = { UserModel, FavoritoModel };
