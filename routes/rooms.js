var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rooms/list');
});



router.get('/room', function(req, res, next) {
  res.render('rooms/index');
});

router.get('/host', function(req, res, next) {
  res.render('rooms/host');
});


module.exports = router;
