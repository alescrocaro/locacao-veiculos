require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

async function createUser (data) {
    return await supabase
        .from('USER')
        .insert(data)
        .select('id, full_name, nick_name, email, document_number, phone_number, type');
};

async function getUsers () {
    return await supabase
        .from('USER')
        .select('id, full_name, nick_name, email, document_number, phone_number, type');
};

async function updateUser (id, data) {
    return await supabase
        .from('USER')
        .update(data)
        .eq('id', id)
        .select('id, full_name, nick_name, email, document_number, phone_number, type');
};

async function deleteUser (id) {
    return await supabase
        .from('USER')
        .delete()
        .eq('id', id)
        .select('id', id);
};

async function findUserById (id) {
    return await supabase
        .from('USER')
        .select('id, full_name, nick_name, email, document_number, phone_number, type')
        .eq('id', id);
}

async function findUserByFilters (filters, target) {
    return await supabase
        .from('USER')
        .select('*')
        .eq(filters, target);
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    findUserById,
    findUserByFilters,
}