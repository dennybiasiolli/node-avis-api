var utentiController = require('./../../controllers/utente');

module.exports = function(router) {
    router.route('/utenti')
        .post(utentiController.postUtenti)
        .get(utentiController.getUtenti);

    router.route('/utenti/:id')
        .get(utentiController.getUtente)
        .put(utentiController.putUtente)
        .delete(utentiController.deleteUtente);

};