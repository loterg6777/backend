const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./modules/users/routes');
const favoritoRoutes = require('./modules/users/routes'); // Importando rotas dos favoritos
const Database = require('./database');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

Database.connect();

const porta = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(cors());

userRoutes.initialize(app);
favoritoRoutes.initialize(app); // Inicializando rotas de favoritos

app.listen(porta, () => {
    console.log(`Servidor escutando a porta ${porta}.`);
});
