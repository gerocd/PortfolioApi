// ARRANQUE DE SIST

const app = require("./app.cjs");
const PORT = require("./config.js").PORT;

// INICIALIZACION
app.listen(PORT);
console.log("Server running on port", PORT);
