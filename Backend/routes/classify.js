const express = require('express');

const classifyController = require('../controllers/Classify');
const router = express.Router();

router.get(
    '/CLASSIFY',classifyController.Classify

);

module.exports = router; 