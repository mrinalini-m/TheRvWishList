var express = require('express');
var RV = require('./products/productModel.js');
var mongoose = require('mongoose');

var app = express();

//config mongoose
mongoose.connect('mongodb://localhost/rvwishlistdb')
require('./config/middleware.js')(app, express);


//Routes----------------------------------------------------
app.get('/', function(req, res) { //been replaced with express.static
  res.redirect('/add');
});

app.get('/rvs', function(req, res) {
  RV.find({}, function(err, rvs) {
    res.json(rvs);
  });
});


app.post('/add', function(req, res) {
  console.log(req.headers.origin, "REQ HEADERS ORIGIn ");
  console.log(req.body, 'BODYBODY'); //logs in terminal with the actual data
  var newRv = {
    name: req.body.name,
    model: req.body.model,
    type: req.body.type,
    year: req.body.year,
    price: req.body.price
  }
  console.log('we got here');
  RV.create(newRv, function(err, rv) {
    if (err) {
      console.log('This is error from app.post');
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/rvs/:id', function(req, res) {
  RV.findOne({_id: req.params.id }, function(err, rv) {
    res.json(rv);
  });
});

app.get('/*', function(req, res) { //this needs to be below get for '/rvList/:id'. Otherwise the req will hit here and ALWAYS return 404
  res.sendStatus(404);
});

module.exports = app;