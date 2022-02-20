const barChart = require('../models/barCHART');

exports.barChart = async(_req,res,next) =>{

    try{

        const visits = await barChart.getVisits();

        const covidCases = await barChart.getCovidCases();

        const covidVisits = await barChart.getCovidVisits();

        const data = [visits,covidCases,covidVisits];

        if(visits < 0){
            const error = new Error("Visits not found");
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