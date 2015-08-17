var donatoriController = require('./../../controllers/donatori');
var authController = require('./../../controllers/auth');

module.exports = function(router) {
    router.route('/donatori')
        .get(authController.isAuthenticated, donatoriController.getDonatori)
        .post(authController.isAuthenticated, donatoriController.postDonatori);

    router.get('/donatori/importDonatoriJSON', authController.isAuthenticated, function(req, res){
        //leggo il file JSON
        var fs = require('fs');
        fs.readFile(__dirname + './../../../public/app/components/avis/donatori.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            donatoriController.addDonatori(obj);
            res.send('Comando di importazione Donatori inviato con successo.');
        });
    });
    router.get('/donatori/importDonazioniJSON', authController.isAuthenticated, function(req, res){
        //leggo il file JSON
        var fs = require('fs');
        fs.readFile(__dirname + './../../../public/app/components/avis/donazioni.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            donatoriController.addDonazioni(obj);
            res.send('Comando di importazione Donazioni inviato con successo.');
        });
    });

};