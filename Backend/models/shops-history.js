const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });


module.exports = class shops_history{


    
    constructor(name,date)
    {
        this.name = name;
        this.date = date;
    } 

 
 

    static getShopsHistory(email){

        if(myCache.has("data22")){
            return myCache.get("data22");
        } else {
        let x = db.execute("CALL visit_and_poi(?)",[email]);
        myCache.set("data22", x);
        return x;
    }
        
            
    }
            
       
}
 

   
    
