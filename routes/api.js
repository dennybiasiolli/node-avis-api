var express = require('express');
var ctrl = require('./../controller/controller');
var router = express.Router();

/*
HTTP Verb | CRUD
----------|-----------
POST      | Create
GET       | Read
PUT       | Update
DELETE    | Delete
*/

router.get('/donatori', function(req, res) {
    console.log(req.query);
    ctrl.getDonatori(req.query, function(err, data){
        if(err)
            res.send([]);
        res.json(data);
    });
    //res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
});

router.post('/donatori', function(req, res){
    ctrl.addDonatori(req.body);
    console.log(req.body);
    res.json(req.body);
});

router.get('/test1', function(req, res) {
    res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
});

router.get('/importDonatoriJSON', function(req, res){
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
router.get('/importDonazioniJSON', function(req, res){
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


module.exports = router;
