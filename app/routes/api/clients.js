var clientController = require('./../../controllers/client');
var authController = require('./../../controllers/auth');

module.exports = function(router, passport) {
    router.route('/clients')
        .post(authController.isAuthenticated, clientController.postClients)
        .get(authController.isAuthenticated, clientController.getClients);
};