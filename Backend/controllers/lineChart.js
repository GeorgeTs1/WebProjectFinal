const lineChart = require('../models/lineCHART');


exports.lineChart = async(req,res,next) =>{

    try{
         const inData = req.body.value.slice(0,10);

         const cases = await lineChart.changeInCases(inData);
         const visits = await lineChart.changeInVisits(inData); 
         data = [cases,visits];

        if(visits < 0){
            const error = new Error("Changes in visits not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(data)
    }

    catch(err){

        if(!err.statusCode) 
            err.statusCode = 500;

        next(err);

    }
}