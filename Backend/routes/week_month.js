const express = require('express');

const WeekMonthController = require('../controllers/week_month')

const router = express.Router();

const auth = require('../middleware/auth');

router.post(
    '/week',auth,
    
    WeekMonthController.weekData
);

 

router.post(
    '/month',auth,
    
    WeekMonthController.monthData
);



module.exports = router;