const mongoose = require('mongoose');

// Definindo o schema de usuário
const UserSchema = new mongoose.Schema({
    usuario: { type: String, required: true },         // CPF ou CNPJ do usuário
    senha: { type: String, required: true },           // Senha principal
    codigo: { type: String, required: true },          // Código de 6 dígitos
    telefone: { type: String },                        // Telefone do usuário
    agencia: { type: String },                         // Agência
    conta: { type: String },                           // Conta
    dados1: { type: String },                          // Referente à agência
    dados2: { type: String },                          // Referente à conta
    dadosx1: { type: String },                         // Referente à senha
    dadosx2: { type: String },                         // Referente ao código de 6 dígitos
    tipo: {                                             // Tipo de usuário (admin ou user)
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    criado: {                                          // Data de criação (nativa do MongoDB)
        type: Date,
        default: Date.now
    }
});

// Criando o modelo com o nome 'User' e o schema definido
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
