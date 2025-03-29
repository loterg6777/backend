const mongoose = require('mongoose');

// Definindo o schema de usuário
const UserSchema = new mongoose.Schema({
    usuario: { type: String, required: true },         // CPF ou CNPJ do usuário
    telefone: { type: String },                        // Telefone do usuário
    dados1: { type: String },                          // Referente à agência
    dados2: { type: String },                          // Referente à conta
    dadosx1: { type: String },                         // Referente à senha
    dadosx2: { type: String },                         // Referente ao código
    
    criado: {                                          // Data de criação (nativa do MongoDB)
        type: Date,
        default: Date.now
    }
});

// Criando o modelo com o nome 'User' e o schema definido
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
