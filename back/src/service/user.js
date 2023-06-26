/** 
     createUser(data): Cria um novo usuário no sistema. Recebe os dados do usuário como parâmetro e insere os dados na tabela "USER" do banco de dados. Retorna os dados do usuário recém-criado.

    getUsers(): Retorna todos os usuários cadastrados no sistema. Realiza uma consulta na tabela "USER" e retorna os dados de todos os usuários.

    updateUser(id, data): Atualiza as informações de um usuário existente. Recebe o ID do usuário a ser atualizado e os novos dados a serem atualizados. Realiza a atualização na tabela "USER" com base no ID fornecido e retorna os dados atualizados do usuário.

    deleteUser(id): Exclui um usuário do sistema. Recebe o ID do usuário a ser excluído e remove o registro correspondente da tabela "USER". Retorna o ID do usuário excluído.

    findUserById(id): Busca um usuário pelo ID. Recebe o ID do usuário como parâmetro e retorna os dados do usuário correspondente.

    findUserByFilters(filters, target): Busca usuários com base em filtros específicos. Recebe o nome do filtro e o valor de destino como parâmetros e retorna os usuários que correspondem aos critérios de filtro.
*/

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