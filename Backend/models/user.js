const db = require('../util/database');


module.exports = class User
{
    constructor(email,username,password,id)
    {
        this.email = email;
        this.username = username;
        this.password = password;
        this.id = id;
    }

    static find(email){
        
            let x = db.execute(
            'SELECT * FROM user WHERE email = ?',[email]);
           
            return x;
        
    }

    static findAdmin(email){
       
        let y = db.execute(
            'SELECT * FROM admin WHERE email = ?',[email]);
            
            return y;
        
    }

    static get_email(id){
       
        let z = db.execute(
            'SELECT email FROM user WHERE id = ?',[id])
      
        return z;
        
    }

    static get_email_from_forgot()
    {
        let k = db.execute(
            'SELECT * FROM forgot_pass'
        );
       
        return k;
        
    }


    static user_connected(email)
    {
       
        let n = db.execute(
            'CALL userConnected(?)',[email]
        );
       
        return n;
        
    }


    static findByEmail_user(email)
    {
       
        let o = db.execute(
            'SELECT * FROM user WHERE email = ?',[email]
        );
        
        return o;
        
    }


    static findByEmail_admin(email)
    {
        let v = db.execute(
            'SELECT * FROM admin WHERE email = ?',[email]
        );
        return v;
        
    }


    static storeEmail(email)
    {
       
        let t = db.execute(
            'INSERT INTO forgot_pass (email) VALUES(?)',[email]
        );
        return t;
        
    }

    
    static update_new_username(username,email)
    {
       
        let e = db.execute(
            'UPDATE user SET username= ?  WHERE email= ?',[username,email]);
            return e;
        
    }


    
    static update_new_password_user(user)
    {
       
        let a = db.execute(
            'UPDATE user SET password = ?  WHERE email= ?',[user.password,user.email]
        );
        return a;
        
    } 


    static update_new_password_admin(user)
    {
     
        let a = db.execute(
            'UPDATE admin SET password = ?  WHERE email= ?',[user.password,user.email]
        );
          return a;
        
    } 

    static delete_email_from_forgot()
    {
        
           let p = db.execute('DELETE FROM forgot_pass');
           return p;
        
    }



    static save(user)
    {
      
        let s = db.execute(
            'INSERT INTO user (email,username,password) VALUES(?,?,?)',[user.email,user.username,user.password]
        );
        return s;
        
    }
};

