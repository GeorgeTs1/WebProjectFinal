const express = require('express');


const { body } = require('express-validator'); 


const router = express.Router();


const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup',  
    [
        body('username').trim().not().isEmpty().not().isEmail().withMessage("First name should not be an email."),
        body('email').isEmail().withMessage('Please enter a valid email.')
        .custom(async (email) => {
            const user = await User.find(email);
            if (user[0].length > 0){
                return Promise.reject('Email address already exist!');
            }
        }).normalizeEmail(), 
         body('password')
         .trim()
         .isLength({min: 8})
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    ],
    
    authController.signup
);

router.post(
    '/login',authController.login

);

router.post(
    '/logout',authController.logout
);




module.exports = router;

