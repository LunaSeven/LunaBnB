var express = require('express');
var router = express.Router();
var fs = require('fs');
var Room = require('../models/Room');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});



function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/');
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rooms/list');
});



router.get('/room', function(req, res, next) {
  res.render('rooms/index');
});

// Go Register Room Page
router.get('/host',needAuth,function(req, res, next) {
  res.render('rooms/host');
});

// Register Room
router.post('/host', upload.single('room_image'), function(req, res, next) {
  console.log(req.body);
  console.log(req.file);

  var newRoom = new Room({
    host_email: req.body.host_email,
    room_name: req.body.input_name,
    room_intro: req.body.input_intro,
    city: req.body.select_city,
    post_code: req.body.post_code,
    addr1: req.body.input_addr1,
    addr2: req.body.input_addr2,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    fee: req.body.input_fee,
    facillities: req.body.input_facillities,
    rules: req.body.input_rules,
    image: req.file
  });
  newRoom.save(function(err) {
    if (err) {
      next(err);
    } else {
      req.flash('success', '숙소 등록이 완료되었습니다.');
      res.render('rooms/step');
    }
  });
});


module.exports = router;
