var express = require('express');
var router = express.Router();
var Room = require('../models/Room');

/* GET home page. */
router.get('/', function(req, res, next) {
  Room.find({}, function (err, rooms) {
      if (err) {
          next(err);
      } else {
          res.render('index', {rooms: rooms});
      }
  }).limit(6);

});

// router.get('/signin', function(req, res, next) {
//   res.render('signin');
// });

module.exports = router;
