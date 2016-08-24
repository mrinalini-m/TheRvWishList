var mongoose = require('mongoose');
var rvSchema = mongoose.Schema({
  name: String,
  model: String,
  type: String,
  year: Number,
  price: Number
  // img: url to be added later
});

module.exports = mongoose.model('RV', rvSchema);
 