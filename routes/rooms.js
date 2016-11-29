var express = require('express');
var router = express.Router();
var fs = require('fs');
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

router.get('/host',needAuth,function(req, res, next) {
  res.render('rooms/host');
});

router.post('/host', upload.single('room_image'), function(req, res, next) {
  console.log(req.body);
  console.log(req.file);

  res.render('rooms/step');
});


module.exports = router;
