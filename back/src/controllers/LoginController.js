const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

async function login (req, res, next) {
    const { email, password } = req.body;
    
    try {
        const db_user = await supabase
            .from('USER')
            .select('')
            .eq('email', email);
        
        console.log('db_user', db_user);

        if (!db_user.data) {
            const error = new Error(db_user.error);
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

        res.status(200).json({
            user: db_user,
            token: jwt.sign(
                    { id: db_user.id },
                    process.env.JWTKEY,
                    { expiresIn: process.env.JWTEXPIRESIN }
                )
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
