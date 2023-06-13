require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

async function createVehicle (data) {
    return await supabase
        .from('VEHICLE')
        .insert([data]);
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