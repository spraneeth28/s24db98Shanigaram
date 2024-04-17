var express = require('express');
const house_controlers= require('../controllers/house');
var router = express.Router();

// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}

/* GET home page. */
router.get('/', house_controlers.house_view_all_Page );


//Assignment 12 ( Part -4)
//* GET detail costume page */
router.get('/detail', secured, house_controlers.house_view_one_Page);
router.get('/create', secured, house_controlers.house_create_Page);
router.get('/update', secured, house_controlers.house_update_Page);
router.get('/delete', secured, house_controlers.house_delete_Page);


module.exports = router;