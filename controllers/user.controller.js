const express = require('express');
// récupération du router Express
const router = express.Router();

// utilisation du model Mongoose
const UserModel = require('../models/User');

// reponse pour les erreurs
function sendError(error, res) {
    console.error(error);
    res.status(500).json({ status: 500, ok: false });
}

// définition de route '/users
router.route('/users')
    // Recup tous les users
    .get(async (_, res) => {
        // récup depuis Mongo
        const resp = await UserModel.find();
        res.status(200).json(resp);
    })
    // Créer un user
    .post(async (req, res) => {
        try {
            // req.body contient le json envoyé
            const newUser = req.body;
            // insert dans Mongo
            const resp = await UserModel.create(newUser);
            res.status(201).json(resp);
        } catch (error) {
            sendError(error, res);
        }
    });

// route pour "/users/id"
router.route('/users/:id')
    // Récup d'un user via id
    .get(async (req, res)=> {
        const id = req.params.id;
        const resp = await UserModel.findById(id);

        if(resp) res.status(200);
        else res.status(404);

        res.json(resp)
    })
    // Modif d'un user
    .put(async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        try {
            const resp = await UserModel.findByIdAndUpdate(id, user);
            res.status(200).json(resp);
        } catch (error) {
            sendError(error, res);
        }
    })
    // Suppression d'un user
    .delete(async(req, res)=>{
        const id = req.params.id;
        try {
            const resp = await UserModel.findByIdAndDelete(id);
            res.status(200).json(resp);
        } catch (error) {
            sendError(error, res);
        }
    })

module.exports = router;


