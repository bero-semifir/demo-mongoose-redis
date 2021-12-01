const mongoose = require('mongoose');

const schema = {
    // contraintes du Schema, typage et champs requis
    name: {type: String, required: true},
    email: String
}

// Creation d'un Schema pour Mongoose https://mongoosejs.com/docs/guide.html
const UserSchema = mongoose.Schema(schema);

// Création du model
// nom du model
// Schema du model
module.exports = mongoose.model('User', UserSchema);
