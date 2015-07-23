var express = require('express');
var ctrl = require('./../../controllers/controller');
var jwt = require('./../../controllers/jsonwebtoken');
var userCtrl = require('./../../controllers/users');

var db = require('./../../models/db');

var router = express.Router();

/*
HTTP Verb | CRUD
----------|-----------
POST      | Create
GET       | Read
PUT       | Update
DELETE    | Delete
*/

router.get('/', function(req, res){
    return res.send('Queste sono le API. Bzzzzzzzz!!');
});

router.post('/authenticate', function(req, res) {
    userCtrl.findUser(req.body.username, req.body.password, function(err, data){
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});

router.get('/me', jwt.isAuthorized, jwt.isTokenValid, function(req, res) {
    res.json(req.user);
});

router.get('/test1', function(req, res) {
    res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
});

router.get('/importDonatoriJSON', jwt.isAuthorized, jwt.isTokenValid, function(req, res){
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
router.get('/importDonazioniJSON', jwt.isAuthorized, jwt.isTokenValid, function(req, res){
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
var utentiRoute = require('./utenti')(router);

module.exports = router;
