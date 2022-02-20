const { async } = require('rxjs');
const mypos = require('../models/myPos');


exports.storeMyPos = async (req, res, next) => {


    
    const current_lat = req.body.lat;
    const current_lng = req.body.lng;
    const email = req.body.email;

    
    try { 
      await mypos.save_my_pos(current_lat,current_lng,email);
      res.status(200).json("Position successfully stored");
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};