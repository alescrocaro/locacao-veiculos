require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

async function createVehicle(id) {
    const { data, error } = await supabase.from('VEHICLE').insert([{ id, placa: 'TESTE2' },])
    console.log(data);
    console.log(error);
    return data
}

async function getVehicle(id) {
    const { data, error } = await supabase.from('VEHICLE').select('*');
    console.log(data)
    return data;
}



module.exports = {
    getVehicle,
    createVehicle,
}