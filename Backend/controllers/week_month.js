const { async } = require('rxjs');
const WeekMonth = require('../models/WeekMonth');




exports.weekData = async (req, res, next) => {


    startDate = req.body.start;
    endDate = req.body.end;


    try
    {


         w_visits = await WeekMonth.week_visits(startDate,endDate);

         c_visits = await WeekMonth.week_covid_visits(startDate,endDate);

         visits = Array.of(w_visits[0][0],c_visits[0][0]);

 
         res.status(200).json({ Visits: visits});


        
    }catch (err) {
      if(!err.statusCode) 
      {
        err.statusCode = 500;
      }
      next(err);
    }

}




exports.monthData = async (req, res, next) => {


   date4Month = req.body.date;

   console.log("hello month");
   console.log(date4Month);


   try
   {

      daysOfMonth_Visits = await WeekMonth.month_visits(date4Month);
      daysOfMonth_CovidVisits =  await WeekMonth.month_covid_visits(date4Month);

      console.log(daysOfMonth_Visits[0][0],daysOfMonth_CovidVisits[0][0]);

      visits = Array.of(daysOfMonth_Visits[0][0],daysOfMonth_CovidVisits[0][0]);


      console.log(visits);

      

      res.status(200).json({ MonthVisits: visits});


   }catch(err)
   {
    if(!err.statusCode) 
    {
      err.statusCode = 404;
    }
    next(err);
   }


}