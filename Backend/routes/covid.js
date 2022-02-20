const express = require('express');

const CovidController = require('../controllers/covid_case')

const router = express.Router();

const auth = require('../middleware/auth');

router.post(
    '/postcase',auth,
    
    CovidController.storeCovidCase
);



router.post(
    '/registers-history',auth,
    
    CovidController.getRegisters
);
 

module.exports = router;  