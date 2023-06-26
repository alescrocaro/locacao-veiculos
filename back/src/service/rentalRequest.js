/** 
    createRentalRequest é usada para criar uma nova solicitação de aluguel, inserindo os dados no banco de dados.
    getRentalRequests é usada para obter todas as solicitações de aluguel existentes no banco de dados.
    updateRentalRequest é usada para atualizar uma solicitação de aluguel existente com base no ID fornecido.
    deleteRentalRequest é usada para excluir uma solicitação de aluguel com base no ID fornecido.
    findRentalRequestById é usada para encontrar uma solicitação de aluguel com base no ID fornecido.
    findRentalRequestByFilters é usada para encontrar solicitações de aluguel com base em filtros específicos, como o nome do veículo ou o ID do locador.
*/


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
    console.log('deleteRentalRequest');
    return await supabase
        .from('RENTAL_REQUEST')
        .delete()
        .eq('id', id)
        .select('id', id);
};

async function findRentalRequestById (id) {
    console.log('findRentalRequestById');
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