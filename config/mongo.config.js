const mongoose = require('mongoose');
require('colors');

// récup des variables d'environnement
const mongo_host = process.env.MONGO_HOST || 'localhost';
const mongo_port = process.env.MONGO_PORT || 27017;
const mongo_db   = process.env.MONGO_DB   || 'app';

// construction de l'uri pour MongoDB
const uri = `mongodb://${mongo_host}:${mongo_port}/${mongo_db}`;

/**
 * Connection à la base mongo
 */
const mongoConnect = async () => {
    try {
        const connection = await mongoose.connect(uri);
        console.log(`Mongo connecté sur ${connection.connection.host}:${connection.connection.port}`.cyan.bold);
    } catch (error) {
        console.error(`${error}`.red.bold);
    }
}

mongoConnect();
