var usersController = require('./../../controllers/user');
var authController = require('./../../controllers/auth');

module.exports = function(router, passport) {
    router.route('/users')
        .post(usersController.postUsers)
        .get(authController.isAuthenticated, usersController.getUsers);
/*
    router.route('/users/:id')
        .get(usersController.getUser)
        .put(usersController.putUser)
        .delete(usersController.deleteUser);
*/
};