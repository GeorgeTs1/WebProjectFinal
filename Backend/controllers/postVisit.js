const { async } = require('rxjs');
const POI = require('../models/poi');
const User = require('../models/user');



exports.saveVisit = async (req, res, next) => {
    
    const user_id = req.body.userid;
    const poi_id =  req.body.poiId;
    const n_visitors = req.body.n_visitors;

    
    
    try {
      const email = await User.get_email(user_id);
      await POI.save_visit(poi_id,email[0][0].email,n_visitors)
      res.status(201).json(true);
    } catch (err) { 
 
       

      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }

  
};