const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class barCHART{

    static getVisits(){
        if(myCache.has("data3")){
            return myCache.get("data3");
        } else {
            let x = db.execute('SELECT COUNT(*) as c FROM visit;')
            myCache.set("data3", x);
            return x;
        }
    }


    static getCovidCases(){
        if(myCache.has("data4")){
            return myCache.get("data4");
        } else {
            let y = db.execute('SELECT COUNT(*) as c FROM covid19register;');
            myCache.set("data4", y);
            return y;
        }
    }

    static getCovidVisits(){
        if(myCache.has("data3")){
            return myCache.get("data3");
        } else {
            let z = db.execute('SELECT count(*) as c  FROM visit  INNER JOIN user as u ON emailOfVisitor = email INNER JOIN covid19register AS c ON u.id = user_Id WHERE timeOfVisit > DATE_SUB(c.lastUpdate, INTERVAL 7 DAY) AND timeOfVisit< DATE_ADD(c.lastUpdate, INTERVAL 14 DAY);')
            myCache.set("data3", z);
            return z;
        }
    }
}