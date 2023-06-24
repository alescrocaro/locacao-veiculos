require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

async function createRentalRequest (data) {
    return await supabase
        .from('RENTAL_REQUEST')
        .insert(data)
        .select();
};

async function getRentalRequests () {
    return await supabase
        .from('RENTAL_REQUEST')
        .select();
};

async function updateRentalRequest (id, data) {
    return await supabase
        .from('RENTAL_REQUEST')
        .update(data)
        .eq('id', id)
        .select();
};

async function deleteRentalRequest (id) {
    return await supabase
        .from('RENTAL_REQUEST')
        .delete()
        .eq('id', id)
        .select('id', id);
};

async function findRentalRequestById (id) {
    return await supabase
        .from('RENTAL_REQUEST')
        .select()
        .eq('id', id);
}

async function findRentalRequestByFilters (filters, target) {
    return await supabase
        .from('RENTAL_REQUEST')
        .select('*')
        .eq(filters, target);
}

module.exports = {
    createRentalRequest,
    getRentalRequests,
    updateRentalRequest,
    deleteRentalRequest,
    findRentalRequestById,
    findRentalRequestByFilters,
}