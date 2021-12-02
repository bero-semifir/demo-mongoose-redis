const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const redis = require('redis');

const url = "https://jsonplaceholder.typicode.com";

router.route('/photos')
    .get(async (_, res) => {
        console.time('get');
        let redisClient = redis.createClient();
        console.timeLog('get', 'createClient')
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
        console.timeLog('get', 'Connect')

        let cached = await redisClient.get('photos');
        console.timeLog('get', 'get')
        // si Redis a la reponse
        if (cached) {
            // je fait la requête auprés de Redis
            res.status(200).json(JSON.parse(cached.toString()));
        } else {
            // Sinon je fait la requête à l'API
            // récup en mode client des photos
            const resp = await axios.get(`${url}/photos`);

            // et je garde la requête dans redis
            console.timeLog('get', 'axios')
            redisClient.setEx('photos', 10, JSON.stringify(resp.data));

            // envois de la reponse
            res.status(200).json(resp.data);
            console.timeEnd('get');
        }
    })

// router.get('/photos/:id',)

module.exports = router;