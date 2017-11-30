var express = require('express'),
  app = express(),
  port = process.env.PORT || 3002;
  mongoose = require('mongoose'),
//  Task = require('./api/models'), //created model loading here
  User = require('./api/models/user'), //created model loading here
  bodyParser = require('body-parser');

require('dotenv').config();

// mongoose instance connection url connection
var mongoDB = "mongodb://" + process.env.MONGODBUSER + ":" + process.env.MONGODBPASSWORD + process.env.MONGODB

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('server started on: ' + port);


//middleware
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
