const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class searchPOI{

    static find(poiName){
        if(myCache.has("data20")){
            return myCache.get("data20");
        } else {
        let x = db.execute(" SELECT * FROM poi WHERE name =?",[poiName]);
        myCache.set("data20", x);
        return x;
        }
    }

    static updateMarker(poiID){
  
        db.execute("CALL markerColorUpdate(?)",[poiID]);
        return "update's done! for " + poiID;
    } 

    static getID(poiName){ 
        if(myCache.has("data21")){
            return myCache.get("data21");
        } else {
        let y = db.execute("SELECT id FROM poi WHERE name=?",[poiName]);
        myCache.set("data21", y);
        return y;
        }
    }
  

} 