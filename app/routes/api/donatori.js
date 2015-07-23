var db = require('./../../models/db');
var jwt = require('./../../controllers/jsonwebtoken');
var ctrl = require('./../../controllers/controller');

module.exports = function(router) {

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

};