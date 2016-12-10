var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  room_id: {type: String},
  client_id: {type: String},
  client_email: {type: String},
  room_name: {type: String},
  member: {type: Number},
  checkIn: {type: Date},
  checkOut: {type: Date},
  isReserve: {type: Boolean, default:false},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Reservation = mongoose.model('Reservation', schema);

module.exports = Reservation;
