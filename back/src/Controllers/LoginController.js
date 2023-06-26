/** 
 * trecho de código implementa a funcionalidade de login de usuários, 
 * verificando suas credenciais e gerando um token de autenticação para 
 * ser usado em requisições subsequentes.
*/
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../service/user');
const authConfig = require('../config/auth');

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

async function login (req, res, next) {
    const { email, password } = req.body;
    
    try {
        const db_user = await connection.findUserByFilters('email', email);
        
        console.log('db_user', db_user);

        if (!db_user.data[0]) {
            const error = new Error('User not found');
            error.status = 400;
            next(error);
            return;
        }

        const right_password = await bcrypt.compare(password, db_user.data[0].password)

        if(!right_password) {
            const error = new Error();
            error.status = 400;
            error.message = 'Wrong password';
            next(error);
            return;
        }

        const payload = { "id": db_user.data[0].id }
        const token = jwt.sign(
            payload,
            authConfig.secret,
            { expiresIn: 3600 } // 1 hour
        )
        res.status(200).json({
            user: db_user.data[0],
            token: token
        })
    } catch (err) {
        const error = new Error(err);
        error.status = 400;
        next(error);
    }
}

module.exports = {
    login,
}
