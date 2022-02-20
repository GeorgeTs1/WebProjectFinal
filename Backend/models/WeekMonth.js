const db = require('../util/database');

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60 });

module.exports = class WeekMonth
{
    constructor(D1,D2,D3,D4,D5,D6,D7){
        this.D1 = D1;
        this.D2 = D2;
        this.D3 = D3;
        this.D4 = D4;
        this.D5 = D5;
        this.D6 = D6;
        this.D7 = D7;

    }
     

   static week_visits(start,end)
   {
       if (myCache.has("data33")){
           return myCache.get("data33");
       } else {
       let x = db.execute(
           'CALL WeekData(?,?)',[start,end]
       );
       myCache.set("data33", x);
       return x;
       }
   }
 
    static week_covid_visits(start,end)
    {
        if(myCache.has("data34")){
            return myCache.get("data34");
        } else {
            let y = db.execute(
                'CALL WeekData2(?,?)',[start,end]
            );  
            myCache.set("data34", y);
            return y;
        }     
    }

    static month_visits(month)
    {
        if(myCache.has("data35")){
            return myCache.get("data35")
        } else {
        let z = db.execute(
            'CALL MonthData(?)',[month]
        );
        myCache.set("data35", z);
        return z;
        }
    }
  
     static month_covid_visits(month)
     {
         if(myCache.has("data36")){
             return myCache.get("data36");
         } else {
             let h = db.execute(
                 'CALL MonthData2(?)',[month]
             );  
             myCache.set("data36", h);
             return h;
         }     
     }
 

}