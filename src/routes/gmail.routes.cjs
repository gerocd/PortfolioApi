// correo.routes.js
const express = require("express");
const { enviarCorreo } = require("../controllers/gmail.controller.cjs");
const router = express.Router();

router.post('/send-gmail', enviarCorreo);

module.exports = router;
