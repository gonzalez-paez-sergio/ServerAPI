'use strict';
module.exports = function(app) {
  var actions = require('../controllers');

  // actions Routes
  app.route('/login')
    .post(actions.login);
};
