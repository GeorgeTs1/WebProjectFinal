const express = require('express');

const linechartController = require('../controllers/lineChart');
const router = express.Router();

router.post(
    '/lineCHART',linechartController.lineChart

);

module.exports = router;