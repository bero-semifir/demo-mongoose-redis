require('colors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// lecture du fichier .env pour set les variables d'environnements
require('dotenv').config();
const app = express();
const UserController = require('./controllers/user.controller')

// Connection à MongoDB
require("./config/mongo.config");

// middlewares
app.use(morgan('dev'));  // Affiche les requêtes dans la console
app.use(express.json()); // Gestion des JSON par express
app.use(helmet());       // Sécurisation des headers HTTP

// Injection de la route dans l'app express
app.use(UserController);

// assigne un port à l'application à partir des variables d'environnement
// si il n'y a pas de variable le port par défault est 3000
const port = process.env.EXPRESS_PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`.green.bold);
});