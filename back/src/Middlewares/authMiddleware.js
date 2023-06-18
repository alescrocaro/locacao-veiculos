const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    console.log('auth', auth);

    if (!auth) {
        const error = new Error();
        error.status = 401;
        error.message = 'Token was not provided';
        next(error);
        return;
    }

    const [, token] = auth.split(' ');
    console.log('token', token);

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWTKEY)

        console.log(decoded);

        if(!decoded) {
            const error = new Error();
            error.status = 401;
            error.message = 'This token is expired';
            next(error);
        } else {
            next();
        }
    } catch (err) {
        const error = new Error(err);
        error.status = 401;
        next(error);
    }
}

module.exports = AuthMiddleware;
