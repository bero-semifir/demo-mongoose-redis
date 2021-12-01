const express = require('express');
// lecture du fichier .env pour set les variables d'environnements
require('dotenv').config();
const app = express();

// assigne un port à l'application à partir des variables d'environnement
// si il n'y a pas de variable le port par défault est 3000
const port = process.env.EXPRESS_PORT || 3000;

app.listen(port,()=>{
    console.log(`Serveur lancé sur le port ${port}`);
});