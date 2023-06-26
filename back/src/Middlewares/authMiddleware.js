/** 
 * Este codigo implementa um middleware 
 * de autenticação que verifica se o token de 
 * autenticação fornecido é válido e não expirou. 
 * Ele é usado para proteger rotas que exigem autenticação, 
 * garantindo que apenas usuários autenticados possam acessá-las.
*/

require('dotenv').config();
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const AuthMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    
    if (!auth) {
        const error = new Error();
        error.status = 401;
        error.message = 'Token was not provided';
        next(error);
        return;
    }
    
    const [, token] = auth.split(' ');
    const serializedToken = token.substring(1,token.length -1)

    try {
        try {
            const decoded = await promisify(jwt.verify)(serializedToken, authConfig.secret);
            console.log(typeof serializedToken)
            console.log(typeof authConfig.secret)

            if(!decoded) {
                const error = new Error();
                error.status = 401;
                error.message = 'This token is expired';
                next(error);
            } 
            next();
        } catch (err) {
            const error = new Error(err);
            error.status = 400;
            next(error);
        }
    } catch (err) {
        const error = new Error(err);
        error.status = 401;
        next(error);
    }
}

module.exports = AuthMiddleware;
