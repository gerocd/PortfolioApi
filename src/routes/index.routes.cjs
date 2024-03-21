// index.routes.js
const express = require("express");
const gmailRoutes = require("./gmail.routes.cjs");
const opinionRoutes = require("./opinion.routes.cjs");


const router = express.Router();

router.use('/api', gmailRoutes);
router.use('/api', opinionRoutes);


console.log("finalizo index");

module.exports = router;

