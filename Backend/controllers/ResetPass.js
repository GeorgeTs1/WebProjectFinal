const {validationResult} = require('express-validator');

const bcrypt =  require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const sendEmail = require("../util/sendEmail");
const e = require('express');




exports.link2Email = async(req,res,next) =>{




    const errors = validationResult(req);
    const email = req.body.email;

    console.log(errors,email);

 

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

try
{
    const user = await User.find(email);
    const admin = await User.findAdmin(email);



    await User.storeEmail(email);



    if (!user && !admin)
    return res.status(400).send("user with given email doesn't exist");
    else if(user && !admin)
         stored_user = user[0][0];
    else
         stored_user = admin[0][0]; 


   
        const token = jwt.sign(
            {
                email: stored_user.email,
                userId: stored_user.id        
            },
            'secretfortoken',
            { expiresIn: '1h'}
         );


    const link = 'http://localhost:4200/email_success';
    
    await sendEmail(stored_user.email, "Password reset", link);

    res.status(200).json({token: token,wait:1});

}
  catch(err)
{   

    if(!err.statusCode)
    {
        err.statusCode = 500;
    }

    
    next(err);
}


}



exports.save_new_password = async(req,res,next) =>{


    
    const email = await User.get_email_from_forgot();

    password = req.body.pass


try{
    const user = await User.findByEmail_user(email[0][0].email);
    const admin = await User.findByEmail_admin(email[0][0].email);
    if (user[0].length ===0 && admin[0].length===0) return res.status(400).json({msg : "invalid link or expired"});

    const new_password = password;

    const hashedPassword = await bcrypt.hash(new_password,12);


   if(user[0].length !==0 && admin[0].length ===0){ 
      user[0][0].password = hashedPassword;
      result  = await User.update_new_password_user(user[0][0]);
   }
   else if(user[0].length ===0 && admin[0].length !==0){
      admin[0][0].password = hashedPassword;
      result  = await User.update_new_password_admin(admin[0][0]);
   }

  
    await User.delete_email_from_forgot();


    res.status(200).json({ok : 1});
    
} catch (error) {
    
    if(!error.statusCode)
    {
        error.statusCode = 500;
    }

    
    next(error);

}


}