var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser= require('body-parser');

var app = express();

//DBModel--------------------------------------------------
var mongoose = require('mongoose');
//config mongoose
mongoose.connect('mongodb://localhost/rvwishlistdb')

//Database model;
var rvSchema = mongoose.Schema({
  name: String,
  model: String,
  // type: String,
  // year: Number
  // img: url to be added later
});

var RV = mongoose.model('RV', rvSchema);
//--------------------------------------------------
// curl test command
// curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Leisure Travel Vans", "model": "Serenity", "type": "B plus", "year": "2015"}'  http://localhost:3000/rvList 
// curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Leisure Travel Vans", "model": "Serenity"}'  http://localhost:3000/rvList 

app.use(morgan('dev')); //to see routes when running nodemon
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //to parse data in get in format needed.
app.use(express.static(__dirname + '/../client/')); // allow to load the static files in client. css..etc


app.get('/', function(req, res) { //been replaced with express.static
  res.send('GET request to the homepage.');
});

app.get('/rvList', function(req, res) {
  RV.find({}, function(err, rvs) {
    res.json(rvs);
  });
});

app.post('/rvList', function(req, res) {
  console.log(req.body);
  var newRv = {
    name: req.body.name,
    model: req.body.model
  }
  RV.create(newRv, function(err, user) {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  })
})
module.exports = app;