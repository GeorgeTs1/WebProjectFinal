const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class myPos
{
    constructor(myLat,myLng,email)
    {
        this.myLat = myLat;
        this.myLng = myLng;
        this.email = email;
    } 

   static get_my_pos()
   {
       if(myCache.has("data7")){
            return myCache.get("data7");
       } else {
            let x = db.execute('SELECT * FROM currpos');
            myCache.set("data7", x);
            return x;
       }
   }
 
    static save_my_pos(lat,lng,email)
    {
        if(myCache.has("data8")){
            return myCache.get("data8")
        }
            let y = db.execute('INSERT INTO currpos (lat,lng,email) VALUES(?,?,?)',[lat,lng,email]);     
            myCache.set("data8", y);
            return y;
    }

    static del_my_pos(email)
    {
        if(myCache.has("data40")){
            return myCache.get("data40");
        } else {
        let z = db.execute(
            'DELETE FROM currpos WHERE email = ?',[email]);
        myCache.set("data40", z);
        return z;
        }
        
    }
}
