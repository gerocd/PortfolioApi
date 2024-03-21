const express = require("express");
const { postOpinion, getOpinion, getOpinions } = require("../controllers/opinion.controller.cjs");
const { Router } = express;

const router = Router();

router.post('/send-opinion', postOpinion); 

router.get('/get-opinions', getOpinions); 

router.get('/get-opinion/:id', getOpinion);

module.exports = router; // Utiliza module.exports en lugar de export
