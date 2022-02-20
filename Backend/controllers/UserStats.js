const {validationResult} = require('express-validator');

const bcrypt =  require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');



exports.saveNewUsername = async(req,res,next) =>{


    
    const newUsername = req.body.new_name;
    const email = req.body.email;
 

    try{ 


        const result  = await User.update_new_username(newUsername,email);

        res.status(201).json(1);

    }catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        
        next(err);
    }



 }


exports.checkPassword = async(req,res,next) =>
{
    
    const email = req.body.email;
    const password = req.body.password;

    console.log(email,password);
    
    try
    {
       const user = await User.find(email);

    
        const storedUser = user[0][0];

        const isEqual = await bcrypt.compare(password,storedUser.password);

        if(!isEqual){
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        

        res.status(200).json({msg: "Correct password"})
    } catch(err)
    {   

        if(!err.statusCode)
        {
            err.statusCode = 500;
        }

        
        next(err);
    }
    

}






