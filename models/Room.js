var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  host_email: {type: String},
  room_name: {type: String},
  room_intro: {type: String},
  city: {type: String},
  post_code: {type: String},
  addr1: {type: String},
  addr2: {type: String},
  latitude: {type: String},
  longitude: {type: String},
  fee: {type: Number},
  facillities: {type: String},
  rules: {type: String},
  image: {type: Object},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Room = mongoose.model('Room', schema);

module.exports = Room;
