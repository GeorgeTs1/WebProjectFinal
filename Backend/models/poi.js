const db = require('../util/database');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class Pois
{
    constructor(id,name,address,types,latitude,longtitude,rating,rating_n,
        currentPopularity,spentTimeFrom,spentTimeTo)
    {
        this.id = id;
        this.name = name;
        this.address = address;
        this.types = types
        this.latitude = latitude;
        this.longtitude = longtitude;
        this.rating =  rating;
        this.rating_n =  rating_n;
        this.currentPopularity = currentPopularity;
        this.spentTimeFrom = spentTimeFrom;
        this.spentTimeTo = spentTimeTo;
    }

    static find_pois_under20(myLat,myLng){
        if(myCache.has("data9")){
            return myCache.get("data9");
        } else {
            let x = db.execute('call Shops20meters(?,?)',[myLat,myLng]);
            myCache.set("data9", x);
            return x;
        }
    }

    static save_poi(poi)
    {
        if(myCache.has("data10")){
            return myCache.get("data10");
        } else {
            let y = db.execute('INSERT INTO poi' +
            '(id,name,address,types,latitude,longitude,rating,rating_n,currentPopularity,spentTimeFrom,spentTimeTo) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [poi.id,poi.name,poi.address,poi.types,poi.latitude,poi.longitude,
                poi.rating,poi.rating_n,poi.currentPopularity,poi.spentTimeFrom,poi.spentTimeTo]);
            myCache.set("data10", y);
            return y;
            }
    }

     
    static save_visit(poi_id,email,n_visitors)
    {

        console.log(poi_id,email);

        if (n_visitors !== 0)
        {
            return db.execute(
                'INSERT INTO visit' + 
                '(idOfPOI,emailOfVisitor,estimatedNumOfVisitors,timeOfVisit) VALUES(?,?,?,NOW())',[poi_id,email,n_visitors]
            );      
        }

        else{

            return db.execute(
                'INSERT INTO visit' + 
                '(idOfPOI,emailOfVisitor,timeOfVisit) VALUES(?,?,NOW())',[poi_id,email]);
        }


    };

    static color_popularity(poi)
    {
        if(myCache.has("data13")){
            return myCache.get("data13");
        } else {
            let z = db.execute('CALL markerColorUpdate(?)',[poi]);
            myCache.set("data13", z);
            return z;
        }
    }
 

    static delete_all_pois(){
        if(myCache.has("data14")){
            return myCache.get("data14");
        } else {
            let c = db.execute('DELETE FROM poi');
            myCache.set("data14", c);
            return c;
        }
    }


    static visits_every_day(date){
        if(myCache.has("data15")){
            return myCache.get("data15");
        } else {
            let v = db.execute(
            'SELECT count(*) as visits' +
            'FROM visit WHERE date(timeOfVisit)  = (?)',[date]);

            myCache.set("data15", v);
            return v;
        }
    }


    
    static covid_visits_every_day(date){
        if(myCache.has("data16")){
            return myCache.get("data16");
        } else {
        
        let r = db.execute(
            'SELECT count(*) as visits' +
            'FROM visit WHERE date(timeOfVisit)  = (?)',[date]);

        myCache.set("data16", r);
        return r;
        }
    }


    static getAllPois()
    {
        if(myCache.has("data41")){
            return myCache.get("data41");
        } else {
        let j = db.execute('SELECT name FROM poi ORDER BY name ASC');
        myCache.set("data41", j);
        return j;
        }
    }


    
    static check_if_poi_exists(poi){
        if(myCache.has("data17")){
            return myCache.get("data17");
        } else {
        let q = db.execute(
            'SELECT * from poi ' +
            'WHERE id = (?)',[poi.id]);

        myCache.set("data17", q);
        return q;
        }
    }
}
