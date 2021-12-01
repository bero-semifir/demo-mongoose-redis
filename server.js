require('colors');
const express = require('express');
const morgan = require('morgan');
// lecture du fichier .env pour set les variables d'environnements
require('dotenv').config();
const app = express();

// Connection à MongoDB
require("./config/mongo.config");

// middleware qui affiche les requêtes dans la console
app.use(morgan('dev'));

// Récup du model
const UserModel = require('./models/User');

// assigne un port à l'application à partir des variables d'environnement
// si il n'y a pas de variable le port par défault est 3000
const port = process.env.EXPRESS_PORT || 3000;

// Route GET /users
app.get('/users', async (req, res) => {
    const users = await UserModel.findOne({name:"Michel"});
    res.status(200).json(users);
});

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`.green.bold);
});