const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class lineCHART{

    static changeInCases(inData){
        if(myCache.has("data5")){
            return myCache.get("data5");
        } else {
            x = db.execute('CALL changeInCases(?)',[inData]);
            myCache.set("data5", x);
            return x;
        }
    }


    static changeInVisits(inData){
        if(myCache.has("data6")){
            return myCache.get("data6");
        } else {
            z = db.execute('CALL changeInVisits(?)',[inData]);
            myCache.set("data6", y);
            return y;
        }
    }
}