const express = require('express');
const { async } = require('rxjs');

const myPosController = require('../controllers/MyPosition');

const router = express.Router();

const { body } = require('express-validator');

const auth = require('../middleware/auth');


router.post(
    '/mycoords', auth,

    myPosController.storeMyPos
);
 

module.exports = router;
 