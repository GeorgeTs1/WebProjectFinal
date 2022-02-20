const { async } = require('rxjs');
const covid = require('../models/post_covid');


exports.storeCovidCase = async (req, res, next) => {
    
    const users_id = req.body.user_id;
    const current_date = req.body.date.replace('T',' ').slice(0,10);

    
    try {

        await covid.save_my_case(users_id,current_date);

      res.status(200).json(true);
    } catch (err) {

      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

 

exports.getRegisters = async (req, res, next) => {
    

  const id = req.body.id;

  try {

      [date_history] = await covid.get_registers_history(id);

      console.log(date_history);

    res.status(200).json(date_history);
  } catch (err) {

    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};