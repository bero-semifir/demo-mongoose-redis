const winston = require('winston');
const {Request, response} = require('express');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
const loggerMiddleWare = (req, res, next) => {

    const logger = winston.createLogger();

    logger.clear();
    logger.add(new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }))

    next();
    const message = `${req.method} ${req.path} ${res.statusCode}`;

    logger.info(message)
}

module.exports = loggerMiddleWare;