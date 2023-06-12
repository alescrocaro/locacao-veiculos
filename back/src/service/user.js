// const { PrismaClient } = require("@prisma/client")

// const prisma = new PrismaClient()


// async function getPaginatedUsers(nPageUsers, page) {
//   const offset = (page - 1) * nPageUsers;

//   return await prisma.usuario.findMany({
//     skip: offset,
//     take: nPageUsers
//   }) 
// }


// async function createUser(user){
//   return await prisma.usuario.create({
//     data: user
//   })
// }


// async function findUserById(id) {

//   const result = await prisma.usuario.findUnique({
//     where: {
//       id: id,
//     },
//   })

//   if(!result)
//   {
//     throw 'Usuário não encontrado.'
//   }

//   return result;
// }


// async function updateUser(id, user) {
//   return await prisma.usuario.update({
//     where: {
//      id: id
//     },
//     data: user,
//   })
// }


// async function deleteUser(id) {
//   return await prisma.usuario.delete({
//     where: {
//       id: id,
//     },
//   })
// }




const { createClient } = require('@supabase/supabase-js');
DBHOST="db.gllfxmnilislypqwekub.supabase.co"
DBPW="PFbSfazvFwpYbx2j"
DBPORT="5432"
DBUSER="postgres"
DBNAME="postgres"
// const supabaseUrl = `postgresql://${DBUSER}:${DBPW}@db.gllfxmnilislypqwekub.supabase.co:${DBPORT}/${DBNAME}`;
const supabaseUrl = 'https://gllfxmnilislypqwekub.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsbGZ4bW5pbGlzbHlwcXdla3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0OTQxNjMsImV4cCI6MjAwMTA3MDE2M30.HfxeEa7BwzTldvx0Ns0QTdXREFI4RLqESAgTkTf_nUM';

const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabaseUrl)

async function getVehicle(id) {
    const vehicles = await supabase.from('VEHICLE').select('*');
    // return res.json(vehicles);
    // console.log(vehicles)
    return vehicles.data;
}



module.exports = {
    getVehicle,
//   getPaginatedUsers,
//   createUser,
//   findUserById,
//   updateUser,
//   deleteUser
}