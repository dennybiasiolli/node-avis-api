var db = require('./../model/db');

var ctrl = {};

ctrl.getDonatori = function(callback){
    db.Donatore.findAll({ include: [ db.Donazione ] }).then(function(donatori) {
        //console.log(JSON.stringify(donatori));
        return callback(null, donatori);
    });
};

module.exports = ctrl;
