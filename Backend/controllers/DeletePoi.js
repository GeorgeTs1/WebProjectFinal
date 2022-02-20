const { async } = require('rxjs');
const POI = require('../models/poi');




exports.deletePOIS = async (req, res, next) => {
  

  try {

    await POI.delete_all_pois();

    res.status(202).json({ message: 'POIS DELETED'});

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 204;
    }
    next(err);
  }

}
