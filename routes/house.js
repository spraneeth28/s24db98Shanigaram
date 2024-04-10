var express = require('express');
const house_controlers= require('../controllers/house');
var router = express.Router();

/* GET home page. */
router.get('/', house_controlers.house_view_all_Page );


//Assignment 12 ( Part -4)
//* GET detail costume page */
router.get('/detail', house_controlers.house_view_one_Page);
router.get('/create', house_controlers.house_create_Page);

module.exports = router;