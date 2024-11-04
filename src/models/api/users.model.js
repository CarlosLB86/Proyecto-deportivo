const pool = require('../../config/db');

const CreateNewOrganizator = async ({ username, password }) => {
    const [result] = await pool.query('insert into users (username, password) values (?, ?)', [username, password]);
    return result.insertId;
}

const getByUserName = async (username) => {
    const [result] = await pool.query('select * from users where username =?', [username]);
    return result[0];
}


const selectWithId = async (userId) => {
    const [result] = await pool.query('select * from users where id =?', [userId]);
    return result[0];
}


module.exports = { CreateNewOrganizator, selectWithId, getByUserName }