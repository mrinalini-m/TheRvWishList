var morgan = require('morgan');
var bodyParser= require('body-parser');

module.exports = function (app, express) {
  var productRouter = express.Router();

  app.use(morgan('dev')); //to see routes when running nodemon
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json()); //to parse data in get in format needed.
  app.use(express.static(__dirname + '/../../client/')); // allow to load the static files in client. css..etc

  require('../products/productRoutes.js')
}