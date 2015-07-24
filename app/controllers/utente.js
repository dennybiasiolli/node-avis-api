var db = require('../models/db');

exports.postUtenti = function(req, res) {
    db.Utente.findOrCreate({
        where: {username: req.body.username},
        defaults: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
    })
        .spread(function(utente, isCreated){
        if(isCreated){
            res.json({status: true, message: 'Utente aggiunto', data: utente});
        } else {
            res.json({status: false, message: 'Utente già esistente', data: null});
        }
    })
        .catch(function(err){
        res.json({status: false, data: err});
    });
};

exports.getUtenti = function(req, res) {
    db.Utente.findAll(/*{attributes: ['id', 'username', 'email']}*/)
        .then(function(utenti) {
        res.json({status: true, data: utenti});
    })
        .catch(function(err){
        res.json({status: false, data: err});
    });
};

//exports.getUtente = function(req, res) {
//    db.Utente.findOne({
//        where: {id: req.params.id},
//        attributes: ['id', 'username', 'email']
//    }).then(function(utente) {
//        res.json({status: true, data: utente});
//    })
//        .catch(function(err){
//        res.json({status: false, data: err});
//    });
//};

//exports.putUtente = function(req, res){
//    db.Utente.findById(req.params.id).then(function(utente) {
//        if(!utente) {
//            res.json({status: false, message: 'Utente non trovato'});
//        } else {
//            utente.password = req.body.password;
//            utente.email = req.body.email;
//            utente.save();
//            res.json({status: true/*, data: utente*/});
//        }
//    })
//        .catch(function(err){
//        res.json({status: false, data: err});
//    });
//};

//exports.deleteUtente = function(req, res){
//    db.Utente.destroy({
//        where: { id: req.params.id }
//    })
//        .then(function(affectedRows){
//        res.json({status: true, deletedRows: affectedRows});
//    })
//        .catch(function(err){
//        res.json({status: false, data: err});
//    });
//};
