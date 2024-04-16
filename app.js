var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//lab 13 (Part-2)
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var houseRouter = require('./routes/house');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var House = require('./models/house');
var resourceRouter = require('./routes/resource');
// var costumeRouter = require('./routes/costume');

async function recreateDB() {
  try {
    // Delete everything
    await House.deleteMany();

    let instance1 = new House({ house_number: 102, type_of_house: 'Single-family detached house', location: 'Maryville' });
    await instance1.save();
    console.log("First object saved");

    let instance2 = new House({ house_number: 777, type_of_house: 'Duplex', location: 'Lincoln' });
    await instance2.save();
    console.log("Second object saved");

    let instance3 = new House({ house_number: 771, type_of_house: 'Townhouse', location: 'Kansas City' });
    await instance3.save();
    console.log("Third object saved");
  } catch (err) {
    console.error(err);
  }
}
let reseed = true; 
if (reseed) {recreateDB();}




var app = express();

//lab 13 (part - 2)
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());


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
app.use('/resource', resourceRouter);
// app.use('/housem', houseModel);
// app.use('/costume', costumeRouter);



// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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
