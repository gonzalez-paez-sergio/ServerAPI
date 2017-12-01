var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  User = require('./api/models/user'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors');

require('dotenv').config();

// mongoose instance connection url connection
var mongoDB = "mongodb://" + process.env.MONGODBUSER + ":" + process.env.MONGODBPASSWORD + process.env.MONGODB
  port = process.env.API_PORT;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var routes = require('./api/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('server started on: ' + port);


//middleware
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
