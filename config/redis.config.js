const redis = require('redis');
require('colors');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
let client;
try {
    client = redis.createClient({url: `redis://${REDIS_HOST}:${REDIS_PORT}`})
} catch (error) {
    console.error(`${err}`.red.bold);
}

module.exports = client;