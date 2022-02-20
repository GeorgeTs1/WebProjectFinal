const { async } = require('rxjs');
const shops_history = require('../models/shops-history');



exports.getShopsHistory = async (req, res, next) => {
    
    email = req.body.email;
     
    try {
      const shops_history_arr = await shops_history.getShopsHistory(email);
      res.status(200).json(shops_history_arr);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};  