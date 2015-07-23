var express = require('express');
var ctrl = require('./../controllers/controller');
var jwt = require('./../controllers/jsonwebtoken');
var userCtrl = require('./../controllers/users');

var db = require('./../models/db');

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

router.get('/donatori', jwt.isAuthorized, jwt.isTokenValid, function(req, res) {
    console.log(req.query);
    ctrl.getDonatori(req.query, function(err, data){
        if(err)
            res.send([]);
        res.json(data);
    });
    //res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
});

router.post('/donatori', jwt.isAuthorized, jwt.isTokenValid, function(req, res){
    ctrl.addDonatori(req.body);
    console.log(req.body);
    res.json(req.body);
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

var utentiRoute = router.route('/utenti');
{
    utentiRoute.get(function(req, res) {
        db.Utente.findAll({attributes: ['id', 'username', 'email']})
            .then(function(utenti) {
            res.json({status: true, data: utenti});
        })
            .catch(function(err){
            res.json({status: false, data: err});
        });
    });

    utentiRoute.post(function(req, res) {
        db.Utente.findOrCreate({
            where: {username: req.body.username},
            defaults: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }
        })
            .spread(function(utente, isCreated){
            utente.password = undefined;
            if(isCreated){
                res.json({status: true, message: 'Utente aggiunto', data: utente});
            } else {
                res.json({status: false, message: 'Utente già esistente', data: utente});
            }
        })
            .catch(function(err){
            res.json({status: false, data: err});
        });
    });
}

var utenteRoute = router.route('/utenti/:id');
{
    utenteRoute.get(function(req, res) {
        db.Utente.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'username', 'email']
        }).then(function(utente) {
            res.json({status: true, data: utente});
        })
            .catch(function(err){
            res.json({status: false, data: err});
        });
    });

    utenteRoute.put(function(req, res){
        db.Utente.findById(req.params.id).then(function(utente) {
            if(!utente) {
                res.json({status: false, message: 'Utente non trovato'});
            } else {
                utente.password = req.body.password;
                utente.email = req.body.email;
                utente.save();
                res.json({status: true/*, data: utente*/});
            }
        })
            .catch(function(err){
            res.json({status: false, data: err});
        });
    });

    utenteRoute.delete(function(req, res){
        db.Utente.destroy({
            where: { id: req.params.id }
        })
            .then(function(affectedRows){
            res.json({status: true, deletedRows: affectedRows});
        })
            .catch(function(err){
            res.json({status: false, data: err});
        });
    });
}

module.exports = router;
