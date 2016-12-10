var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  room_id: {type: String},
  client_id: {type: String},
  host_id: {type: String},
  room_name: {type: String},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Favorite = mongoose.model('Favorite', schema);

module.exports = Favorite;
