// CONFIGURACIÓN BASE DE DATOS
const mysql = require('mysql2');
const config = {
    host: 'localhost',
    user: 'root',
    password: '44523274cjLB',
    port: 3306,
    database: 'proyecto-deportivo'
}

const pool = mysql.createPool(config)
module.exports = pool.promise();