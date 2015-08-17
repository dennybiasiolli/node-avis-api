var express = require('express');
var donatoriController = require('./../../controllers/donatori');
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

    //router.get('/test1', function(req, res) {
    //    res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
    //});

    var donatoriRoute = require('./donatori')(router);
    var usersRoute = require('./users')(router, passport);
    var proveRoute = require('./prove')(router, passport);
    var clientsRoute = require('./clients')(router, passport);
    var oauth2Route = require('./oauth2')(router, passport);

    return router;
};
