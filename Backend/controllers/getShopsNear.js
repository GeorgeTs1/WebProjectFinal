const { async } = require('rxjs');
const mypos = require('../models/myPos');
const { getAllPois } = require('../models/poi');
const POI = require('../models/poi');


exports.getPoisUnder20 = async (req, res, next) => {
    
    try {
        const [coords] = await mypos.get_my_pos();
        const [shops20] = await POI.find_pois_under20(coords[0].lat,coords[0].lng);

        console.log(shops20);

            if(shops20[0].length == 1){

              const done = await POI.color_popularity(shops20[0][0].id);
          
              }
          else{
              let i = 0;
              while(shops20[0].length > i){
                  const done = await POI.color_popularity(shops20[0][i].id);
                  i++;
              }
          
      }

      res.status(200).json(shops20);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};



exports.getAllPois = async(req,res,next) => 
{
  

    try
    {
      const shops_names = await POI.getAllPois();

      res.status(200).json(shops_names);


    }
    catch(err)
    {
        if(!err.statusCode)
        {
          err.statusCode = 404;
        }

        next(err);
    }

}