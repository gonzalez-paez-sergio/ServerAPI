'use strict';

var hash = require('../pass/hash').hash;
var mongoose = require('mongoose');
var User = mongoose.model('users');


function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    User.findOne({
        username: name
    },

    function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
            hash(pass, user.salt, function (err, hash) {
                if (err) return fn(err);
                if (hash == user.hash) return fn(null, user);
                fn(new Error('invalid password'));
            });
        } else {
            return fn(new Error('cannot find user'));
        }
    });
}

exports.login = function(req, res) {
  console.log(req.body.values );
  authenticate(req.body.values.username, req.body.values.password,
      function (err, user) {
    if (err) {
      res.send(err);
    }

    if (user) {
          res.json(user);
      } else {
        console.log('nodobdy here'); 
      }
  });
};


exports.create_a_user = function(req, res) {
  // console.log(req,res);
  var new_user = new User(req.body);

  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

