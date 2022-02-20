const express = require('express');

const router = express.Router();

const UserStatsController = require('../controllers/UserStats');



router.post(
    '/checkPassword',
    
    UserStatsController.checkPassword
);

router.post(
    '/newUsername',

    UserStatsController.saveNewUsername
     
)
 




module.exports = router;