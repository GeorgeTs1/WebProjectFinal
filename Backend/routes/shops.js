const express = require('express');

const getShopsController = require('../controllers/getShopsNear')

const router = express.Router();

const postVisitController = require('../controllers/postVisit');

const shopsHistoryController = require('../controllers/Shops-History');

const addPoiController = require('../controllers/AddPoi');

const deletePoiController = require('../controllers/DeletePoi')

const { body } = require('express-validator');

const POI = require('../models/poi');

const auth = require('../middleware/auth');


  
router.get(
    '/getShopsNear',auth,
    
    getShopsController.getPoisUnder20
);


router.get(
    '/getAllPois',

    getShopsController.getAllPois
)

router.post(
    '/visit',auth,

    postVisitController.saveVisit
    
)

router.post(
    '/visits-history',auth,

    shopsHistoryController.getShopsHistory
    
)


router.delete(
    '/deletePOI',auth,

    deletePoiController.deletePOIS
)


router.post(
    '/add_poi',auth,
    [
        
        body('poi')
        .custom(async (poi) => {

            let error = 0;
          
            const result  = await POI.check_if_poi_exists(poi) // check for DB errors
        

            if(result==1) // Duplicate entries or internal db error
            {  
                return Promise.reject(1);
            }
             
   
          })
    ],
    

    addPoiController.addPoi
    
)




module.exports = router;
