var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var houseRouter = require('./routes/house');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var House = require('./models/house');
// var costumeRouter = require('./routes/costume');

async function recreateDB(){ 
  // Delete everything   
  await House.deleteMany(); 
  let instance1 = new House({house_number: 102, type_of_house: 'Single-family detached house', location: 'Maryville'});
  instance1.save().then(doc=>{     
    console.log("First object saved")}   
    ).catch(err=>{    
       console.error(err)   
      }); 
  let instance2 = new House({house_number: 777, type_of_house: 'Duplex', location: 'Lincoln'});
  instance2.save().then(doc=>{     
    console.log("Second object saved")}   
    ).catch(err=>{    
       console.error(err)   
      });
  let instance3 = new House({house_number: 771, type_of_house:'Townhouse', location: 'Kansas City' });
  instance3.save().then(doc=>{     
    console.log("Third object saved")}   
    ).catch(err=>{    
       console.error(err)   
      });
}
let reseed = true; 
if (reseed) {recreateDB();}




var app = express();


require('dotenv').config();
// const env01 = 'mongodb+srv://spraneeth2801:Nanyjoy@4818777@cluster0.uhlcqxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/house', houseRouter);
app.use('/grid' , gridRouter);
app.use('/pick', pickRouter);
// app.use('/housem', houseModel);
// app.use('/costume', costumeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
