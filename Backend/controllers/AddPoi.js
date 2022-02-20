const { async } = require('rxjs');
const POI = require('../models/poi');
const {validationResult} = require('express-validator');




exports.addPoi = async (req, res, next) => {
  

  const errors = validationResult(req);

  
  if(!errors.isEmpty())
  {  

      var list_sign_errors = errors.errors
      .map ( (list_log_err)=> {

          if(list_log_err['msg'] === 'Invalid value')
          {
              list_log_err['msg'] = ' ';
          }

          return list_log_err['msg'];
      })


      return res.status(201).json(list_sign_errors);

  }
  
  
  data = req.body.poi;



  poi = Array.of(req.body.poi);


  try {
    if(poi.length == 1)
    {
          const result = await POI.save_poi(poi[0]);

          res.status(201).json({ message: 'Poi saved!'});
    }

    else
    {      
      for( const shop of poi)
      {
       result = await POI.save_poi(shop);
      };

       res.status(201).json({ message: 'Pois saved!'});
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }






}