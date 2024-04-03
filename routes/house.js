var express = require('express');
const house_controlers= require('../controllers/house');
var router = express.Router();

/* GET home page. */
router.get('/', house_controlers.house_view_all_Page );
router.get('/', function(req, res, next) {
  res.render('house', { title: 'Search Results of House' });
});

module.exports = router;