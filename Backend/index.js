const express = require('express');

var multer = require( 'multer');
var upload = multer();

require("dotenv").config();

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const shopsRoutes = require('./routes/shops');

const myPosRoutes  = require('./routes/myposition');

const covidRoutes  = require('./routes/covid')

const searchRoutes = require('./routes/search');

const userRoutes = require('./routes/user_stats');

const passwordResetRoutes = require("./routes/passwordReset");

const errorController = require('./controllers/error');

const week_monthController =  require('./routes/week_month');

const barchartRoutes = require('./routes/barchart');

const linechartRoutes = require('./routes/linechart');

const classifyRoutes = require('./routes/classify');



const cors = require('cors');

const app  = express();

app.use(cors());


const ports  = process.env.PORT || 3000 ;



app.use(bodyParser.json());




//Http Headers
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, X-Custom-Header, Authorization'
      );
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
    
    next();
});

 
 

//Routers
app.use('/auth',authRoutes);
app.use('/mypos',myPosRoutes);
app.use('/shops',shopsRoutes);
app.use('/covid_case',covidRoutes);
app.use('/search',searchRoutes);
app.use('/users_stats',userRoutes);
app.use('/reset-password',passwordResetRoutes);
app.use('/week_month',week_monthController);
app.use('/barchart',barchartRoutes);
app.use('/linechart',linechartRoutes);
app.use('/classify',classifyRoutes);



//Error Controllers
app.use(errorController.get404);
app.use(errorController.get500);
app.use(errorController.get204);





app.listen(ports,()=>  console.log(`Listening on port ${ports}`));

