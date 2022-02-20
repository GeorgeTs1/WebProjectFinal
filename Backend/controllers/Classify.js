const Classify = require('../models/CLASSIFY');

exports.Classify = async(_req, res, next) => {

    try{
            
        const classifiedVisits = await Classify.classifyPOIofType_estVisitors();
        if(classifiedVisits[0].length == 0){
            const error = new Error("Not found requested data");
            error.statusCode = 404;
            throw error;
        }
 

        const classifiedCases = await Classify.classifyPOIofType_cases()
        if(classifiedCases[0].length == 0){
            const error = new Error("Not found requested data");
            error.statusCode = 404;
            throw error;
        }
        
        const k = [classifiedVisits, classifiedCases]
        res.status(200).json(k)
    }  

    catch(err){

        if(!err.statusCode) 
            err.statusCode = 500;
        next(err);

        }
}