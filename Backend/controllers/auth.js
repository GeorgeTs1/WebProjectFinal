const {validationResult} = require('express-validator');

const bcrypt =  require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const MyPos = require('../models/myPos');


exports.signup = async(req,res,next) =>{

    const errors = validationResult(req);


    
    if(!errors.isEmpty())
    {  

        var list_sign_errors = errors.errors
        .map ( (list_log_err)=> {

            if(list_log_err['msg'] === 'Invalid value')
            {
                list_log_err['msg'] = ' ';
            }

            return list_log_err['msg'];
        })


        return res.status(201).json(list_sign_errors);

    }


    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    


    try{

        const hashedPassword = await bcrypt.hash(password,12);
        const userDetails = {
            email : email,
            username: username,
            password: hashedPassword
        };

        const result  = await User.save(userDetails);

        res.status(200).json({ message: 'User registered!'});

    }catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        
        next(err);
    }



};


exports.login = async(req,res,next) =>{
    
    const email = req.body.email;
    const password = req.body.password;
    
    try
    {



        const admin = await User.findAdmin(email);

        if(admin[0].length===0){
        


            const user = await User.find(email);

            if(user[0].length!==1){
                const error = new Error("A user with this email could not be found");
                error.statusCode = 401;
                throw error;
             }
     
             const storedUser = user[0][0];
     
             const isEqual = await bcrypt.compare(password,storedUser.password);
     
             if(!isEqual){
                 const error = new Error('Wrong password!');
                 error.statusCode = 401;
                 throw error;
             }
     
             const token = jwt.sign(
                 {
                     email: storedUser.email,
                     userId: storedUser.id        
                 },
                 'Altair',
                 { expiresIn: '1h'}
              );
     
     
              await User.user_connected(email);
     
     
             res.status(200).json({token: token, userId: storedUser.id,userEmail:storedUser.email,admin:0})

        }

        else
        {

            
            const storedAdmin = admin[0][0];
     
            const isEqual = await bcrypt.compare(password,storedAdmin.password);
    
            if(!isEqual){
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
                {
                    email: storedAdmin.email,
                    userId: storedAdmin.id        
                },
                'Altair',
                { expiresIn: '1h'}
             );
    
            res.status(200).json({token: token, userId: storedAdmin.id,userEmail:storedAdmin.email,admin:1})
            
        }






      
    } catch(err)
    {   

        if(!err.statusCode)
        {
            err.statusCode = 500;
        }

        
        next(err);
    }
}


    exports.logout = async(req,res,next) =>{

        const user_email = req.body.email

        try
        {

            await MyPos.del_my_pos(user_email);

            res.status(200).json({message: 'Position Deleted'});

        }catch(err)
        {
            if(!err.statusCode)
            {
                err.statusCode = 404;
            }

            next(err);
            
        }

    }
    
