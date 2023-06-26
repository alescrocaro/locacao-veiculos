/**
    createVehicle é responsável por inserir um novo veículo na tabela "VEHICLE" e retorna os dados do veículo inserido.
    getVehicles recupera todos os veículos existentes na tabela "VEHICLE" e retorna os dados de todos os veículos.
    updateVehicle atualiza as informações de um veículo específico na tabela "VEHICLE", com base no ID fornecido, e retorna os dados do veículo atualizado.
    deleteVehicle exclui um veículo específico da tabela "VEHICLE", com base no ID fornecido.
    findVehicleById busca um veículo específico na tabela "VEHICLE" com base no ID fornecido e retorna os dados do veículo encontrado.
*/

require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

async function createVehicle (data) {
    return await supabase
        .from('VEHICLE')
        .insert(data)
        .select();
};

async function getVehicles () {
    return await supabase
        .from('VEHICLE')
        .select('*');
};

async function updateVehicle (id, data) {
    return await supabase
        .from('VEHICLE')
        .update(data)
        .eq('id', id)
        .select();
};

async function deleteVehicle (id) {
    return await supabase
        .from('VEHICLE')
        .delete()
        .eq('id', id)
};

async function findVehicleById (id) {
    return await supabase
        .from('VEHICLE')
        .select('*')
        .eq('id', id);
}

module.exports = {
    createVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
    findVehicleById,
}