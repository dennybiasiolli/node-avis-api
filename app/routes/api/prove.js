var proveController = require('./../../controllers/prova');
var authController = require('./../../controllers/auth');

module.exports = function(router, passport) {
    router.route('/prove')
        .post(authController.isAuthenticated, proveController.postProve)
        .get(authController.isAuthenticated, proveController.getProve);

    router.route('/prove/:id')
        .get(authController.isAuthenticated, proveController.getProva)
        .put(authController.isAuthenticated, proveController.putProva)
        .delete(authController.isAuthenticated, proveController.deleteProva);

};