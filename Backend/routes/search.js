const express = require('express');

const searchController = require('../controllers/search');
const router = express.Router();

const auth = require('../middleware/auth');

router.post(
    '/searchPOI',auth,
    searchController.searchPoi

); 

module.exports = router; 