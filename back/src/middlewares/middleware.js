const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        const error = new Error(err);
        error.status = 401;
        error.message = 'Token inexistente';
        next(error);
    }

    const [, token] = auth.split();

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWTKEY)

        console.log(decoded);

        if(!decoded) {
            const error = new Error(err);
            error.status = 401;
            error.message = 'Token expirado';
            next(error);
        } else {
            res.status(200).json(decoded);
        }
    } catch (err) {
        const error = new Error(err);
        error.status = 400;
        next(error);
    }
}

module.exports = {
    AuthMiddleware,
}
