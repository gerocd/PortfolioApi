// TODA LA CONFG DE EXPRESS

const express = require("express");
const indexRoutes = require('./routes/index.routes.cjs');

// const PORT = require("./config.js").PORT; 

const app = express()

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json())
app.use(indexRoutes)



// ------------------ Not Found Error --------------------------------
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint no fue encontrado, verifique la direccion http:// '
    })
})

module.exports = app;
