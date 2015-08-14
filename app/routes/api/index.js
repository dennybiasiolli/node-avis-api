var express = require('express');
var ctrl = require('./../../controllers/controller');
var authController = require('./../../controllers/auth');

var db = require('./../../models');

module.exports = function(passport) {
    var router = express.Router();

    /*
HTTP Verb | CRUD
----------|-----------
POST      | Create
GET       | Read
PUT       | Update
DELETE    | Delete
*/

    router.all('/', authController.isAuthenticated, function(req, res){
        return res.send('Queste sono le API. Bzzzzzzzz!!');
    });

    router.get('/test1', function(req, res) {
        res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
    });

    router.get('/importDonatoriJSON', authController.isAuthenticated, function(req, res){
        //leggo il file JSON
        var fs = require('fs');
        fs.readFile(__dirname + '/../public/app/components/avis/donatori.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            ctrl.addDonatori(obj, function(err){
                if(err) res.send('KO');
                else res.send('OK');
            });
        });
    });
    router.get('/importDonazioniJSON', authController.isAuthenticated, function(req, res){
        //leggo il file JSON
        var fs = require('fs');
        fs.readFile(__dirname + '/../public/app/components/avis/donazioni.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            ctrl.addDonazioni(obj, function(err){
                if(err) res.send('KO');
                else res.send('OK');
            });
        });
    });

    var donatoriRoute = require('./donatori')(router);
    var usersRoute = require('./users')(router, passport);
    var proveRoute = require('./prove')(router, passport);
    var clientsRoute = require('./clients')(router, passport);
    var oauth2Route = require('./oauth2')(router, passport);

    return router;
};
