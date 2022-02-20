
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const PasswordController = require('../controllers/ResetPass');

router.post("/password_req", 
    [
        body('email').isEmail().withMessage('Please enter a valid email.')
        .custom(async (email) => {
            const user = await User.find(email);
            const admin = await User.findAdmin(email);
            if (user[0].length == 0 &&  admin[0].length==0){
                return Promise.reject('User with this email is not found');
            }
        }).normalizeEmail()
    ],

    PasswordController.link2Email
    
);   

router.post("/new_password",
    
      
    PasswordController.save_new_password
   

);

 



module.exports = router; 