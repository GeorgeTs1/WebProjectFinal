
const searchPoi = require('../models/searchPOI');

exports.searchPoi = async(req,res,next) =>{

    const  typedValue = req.body.value;
   
    try{

        const poiID = await searchPoi.getID(typedValue);


        if(poiID[0].length == 1){

            const done = searchPoi.updateMarker(poiID[0][0].id);
        
        }  
        else{

            let i = 0;
            while(poiID[0].length > i){
                const done = searchPoi.updateMarker(poiID[0][i].id);
                i++;
            } 
            
        }

        const Poi = await searchPoi.find(typedValue);

        if(Poi[0].length == 0){
            const error = new Error("Shop not found");
            error.statusCode = 404;
            throw error;
        }
 
        res.status(200).json(Poi)

    }

    catch(err){

        if(!err.statusCode) 
            err.statusCode = 500;

        next(err);

    }
}
