'use strict';
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: ' enter the user name '
  },
  password: {
    type: String,
    required: ' enter the password '
  },
  salt: String,
  hash: String,
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);
