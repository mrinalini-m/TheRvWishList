var RV = require('./productModel.js')

module.exports = {
  getAll: function(req, res) {
    RV.find({}, function(err, rvs) {
      res.json(rvs);
    });
  }
}