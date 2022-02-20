const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class post_covid
{
    constructor(user_id,shop_name,date)
    {
        this.user_id = user_id;
        this.date = date;
    }

     
  

    static save_my_case(user_id,date) 
    {
        if(myCache.has("data18")){
            return myCache.get("data18");
        } else {
            let x = db.execute(
                'INSERT INTO covid19register (user_Id,lastUpdate) VALUES(?,?)',[user_id,date]); 
            myCache.set("data18", x);
            return x;      
        }
    }


    static get_registers_history(user_id)
    {
        if(myCache.has("data19")){
            return myCache.get("data19");
        } else {
            let y = db.execute(
                'SELECT lastUpdateDate FROM covid19register WHERE user_id = ?',[user_id]);
            myCache.set("data19", y);
            return y;     
        }  
    }

}
