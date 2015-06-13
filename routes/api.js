var express = require('express');
var ctrl = require('./../controller/controller');
var router = express.Router();

router.get('/donatori', function(req, res, next) {
    ctrl.getDonatori(function(err, data){
        if(err)
            res.send(null);
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
    });
    //res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
});

router.get('/test1', function(req, res, next) {
    res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
});

module.exports = router;
