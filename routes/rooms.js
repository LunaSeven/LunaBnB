var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var Room = require('../models/Room');
var Reservation = require('../models/Reservation');
var Favorite = require('../models/Favorite');
var multer = require('multer');
var upload = multer({
    dest: './public/images/uploads/'
});



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
    Room.find({city:req.query.city}, function(err, rooms) {
        if (err) {
            next(err);
        } else {
          Room.findOne({city: req.query.city}, function(err, marker) {
            if (err) {
                return next(err);
              }

            res.render('rooms/list',{
                rooms: rooms,
                marker: marker,
                city: req.query.city
            });
          });

        }
    });
});

router.get('/:id/reservations',needAuth, function(req, res, next) {
  Reservation.find({host_id: req.params.id}, function(err, reservations) {
    console.log(reservations);
    if (err) {
      return next(err);
    }
    res.render('rooms/reservations', {reservations: reservations});
  });
});

router.post('/:id/favorite',needAuth, function(req, res, next) {
  console.log("ajax go");
  console.log(req.body.room_id);
  console.log(req.body.room_name);
  console.log(req.body.host_id);
  var newFavorite = new Favorite({
      room_id: req.body.room_id,
      client_id: req.params.id,
      host_id: req.body.host_id,
      room_name: req.body.room_name,
  });
  newFavorite.save(function(err) {
      if (err) {
          return next(err);
      }
    res.json(1);
  });

});


router.get('/room', function(req, res, next) {
var room_id = req.query.id;
Room.findById(room_id, function(err, room) {
    if (err) {
        return next(err);
    }
    Favorite.find({room_id:room._id},function(err, favorites){
      if (err) {
          return next(err);
      }
      console.log(favorites);
      res.render('rooms/index', {
          room: room,favorites:favorites
      });
    });
});


});
router.get('/:id/img', function(req, res, next) {
        Room.findById(req.params.id, function(err, room) {
            if (err) next(err);
            else {
                res.set({
                    "Content-Disposition": 'attachment; filename="' + room.image.originalname + '"',
                    "Content-Type": room.image.mimetype
                });
                var st = fs.createReadStream(path.join(__dirname, "../" + room.image.path));
                st.on('error', function() {
                    res.status(404).end();
                });
                st.pipe(res);
            }
        });
    })
    // Go Register Room Page
router.get('/host', needAuth, function(req, res, next) {
    res.render('rooms/host');
});

// Register Room
router.post('/host', upload.single('room_image'), function(req, res, next) {
    console.log(req.body);
    console.log(req.file);

    var newRoom = new Room({
        host_email: req.body.host_email,
        host_id: req.body.host_id,
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
            res.render('rooms/step',{city:req.body.select_city});
        }
    });
});

router.put('/reservation/:id/true', needAuth, function(req, res, next) {
  Reservation.findById(req.params.id, function(err, reservation) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!reservation) {
      return res.status(404).json({message: 'reservation not found'});
    }
      reservation.isReserve = true;
    reservation.save(function(err) {
      if (err) {
        return res.status(500).json({message: 'internal error', desc: err});
      }
      res.redirect('back');
    });
  });
});

router.put('/reservation/:id/false', needAuth, function(req, res, next) {
  Reservation.findById(req.params.id, function(err, reservation) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!reservation) {
      return res.status(404).json({message: 'reservation not found'});
    }
      reservation.isReserve = false;
    reservation.save(function(err) {
      if (err) {
        return res.status(500).json({message: 'internal error', desc: err});
      }
      res.redirect('back');
    });
  });
});

router.post('/reserve', needAuth, function(req, res, next) {
var room_id = req.query.id;
var newResevation = new Reservation({
  room_id: req.query.id,
  host_id: req.body.host_id,
  client_id: req.body.client_id,
  room_name: req.body.room_name,
  client_email: req.body.client_email,
  member: req.body.member,
  checkIn: req.body.date_check_in,
  checkOut: req.body.date_check_out,
});
newResevation.save(function(err) {
    if (err) {
        next(err);
    } else {
        req.flash('success', '숙소 예약이 완료되었습니다.');
        res.render('users/step');
    }
});
});


module.exports = router;
