var utentiController = require('./../../controllers/utente');
var authController = require('./../../controllers/auth');

module.exports = function(router, passport) {
    router.route('/utenti')
        .post(utentiController.postUtenti)
        .get(authController.isAuthenticated, utentiController.getUtenti);
/*
    router.route('/utenti/:id')
        .get(utentiController.getUtente)
        .put(utentiController.putUtente)
        .delete(utentiController.deleteUtente);
*/
};