const express = require('express');

const barchartController = require('../controllers/barChart');
const router = express.Router();

router.post(
    '/barCHART',barchartController.barChart

);

module.exports = router;   