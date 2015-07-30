var db = require('../models/db');

exports.postProve = function(req, res) {
    db.Prova.findOrCreate({
        where: {descrizione: req.body.descrizione},
        defaults: {
            descrizione: req.body.descrizione,
            quantita: req.body.quantita
        }
    }).spread(function(prova, isCreated){
        prova.password = undefined;
        if(isCreated){
            prova.setUtente(req.user.id);
            res.json({status: true, message: 'Prova aggiunta', data: prova});
        } else {
            res.json({status: false, message: 'Prova già esistente', data: prova});
        }
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};

exports.getProve = function(req, res) {
    db.Utente.findById(
        req.user.id,
        {include: [db.Prova]}
    ).then(function(utente){
        res.json({status: true, data: utente.Prove});
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};

exports.getProva = function(req, res) {
    db.Utente.findById(
        req.user.id,
        {include: [{model: db.Prova, where: {id: req.params.id}}]}
    ).then(function(utente){
        console.log(utente);
        res.json({status: true, data: utente.Prove});
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};

exports.putProva = function(req, res){
    db.Prova.findOne({
        where: {
            Utente_id: req.user.id,
            id: req.params.id
        }
    }).then(function(prova) {
        if(!prova) {
            res.json({status: false, message: 'Prova non trovata'});
        } else {
            if(req.body.descrizione)
                prova.descrizione = req.body.descrizione;
            if(req.body.quantita)
                prova.quantita = req.body.quantita;
            prova.save().then(function(newProva){
                res.json({status: true, data: newProva});
            });
        }
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};

exports.deleteProva = function(req, res){
    db.Prova.destroy({
        where: {
            Utente_id: req.user.id,
            id: req.params.id
        }
    }).then(function(affectedRows){
        res.json({status: (affectedRows>0), deletedRows: affectedRows});
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};
