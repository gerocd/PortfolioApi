
const mysql = require("mysql2/promise");

const {
    DB_HOST, 
    DB_PORT, 
    DB_DATABASE, 
    DB_USER, 
    DB_PASSWORD
} = require('./config.js');

//objeto de conexion
const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
});

module.exports = { pool };
