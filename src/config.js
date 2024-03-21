// config.js
const dotenv = require("dotenv");

function config() {
  dotenv.config();
}

config(); // Llamada a la función config() para cargar las variables de entorno

module.exports.PORT = process.env.PORT || 300; // puerto servidor
module.exports.DB_USER = process.env.DB_USER || 'root';
module.exports.DB_PASSWORD = process.env.DB_PASSWORD || '12345';
module.exports.DB_HOST = process.env.DB_HOST || 'localhost';
module.exports.DB_DATABASE = process.env.DB_DATABASE || 'portfolio';
module.exports.DB_PORT = process.env.DB_PORT || '3306'; // puerto base de datos
