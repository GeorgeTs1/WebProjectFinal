
const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class CLASSIFY{

    static classifyPOIofType_estVisitors(){
        if(myCache.has("data1")){
            console.log('Getting data from Cache');
            return myCache.get("data1");
        } else {
            console.log('Getting data from db');
            let x = db.execute('SELECT DISTINCT types, (SELECT AVG(estimatedNumOfVisitors) AS average FROM visit WHERE idOfPOI = p.id) AS avg FROM POI AS p ORDER BY avg;');
            myCache.set("data1", x);
    return x; 
    }
}

    static classifyPOIofType_cases(){
        if(myCache.has("data2")){
            return myCache.get("data2");
        } else {
        let y = db.execute('SELECT DISTINCT P.types, (SELECT COUNT(*) AS count FROM visit AS v LEFT JOIN user AS u ON u.email = v.emailOfVisitor INNER JOIN covid19register AS c ON user_Id = u.id WHERE P.id = v.idOfPOI AND DATE_SUB(c.lastUpdate, INTERVAL 30 DAY) < timeOfVisit AND DATE_ADD(c.lastUpdate, INTERVAL 14 DAY) > timeOfVisit ORDER BY idOfPOI ) AS NumOfCasesVisited FROM POI AS P ;');
        myCache.set("data2", y);
        return y;
        }
    }
}