'use strict';
module.exports = function(app) {
  var actions = require('../controllers');

  // actions Routes
  app.route('/login')
    .post(actions.login);

  // actions Routes
  app.route('/users')
    .get(actions.list_all_users)
    .post(actions.create_a_user);

  app.route('/users/:userId')
    .get(actions.read_a_user)
    .put(actions.update_a_user)
    .delete(actions.delete_a_user);
};
