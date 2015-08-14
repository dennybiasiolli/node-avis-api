var db = require('../models');

exports.postUsers = function(req, res) {
    db.User.findOrCreate({
        where: {username: req.body.username},
        defaults: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
    }).spread(function(user, isCreated){
        if(isCreated){
            res.json({status: true, message: 'Utente aggiunto', data: user});
        } else {
            res.json({status: false, message: 'Utente già esistente', data: null});
        }
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};

exports.getUsers = function(req, res) {
    db.User.findAll(
        /*{attributes: ['id', 'username', 'email']}*/
    ).then(function(users) {
        res.json({status: true, data: users});
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};

//exports.getUser = function(req, res) {
//    db.User.findOne({
//        where: {id: req.params.id},
//        attributes: ['id', 'username', 'email']
//    }).then(function(user) {
//        res.json({status: true, data: user});
//    }).catch(function(err){
//        res.json({status: false, data: err});
//    });
//};

//exports.putUser = function(req, res){
//    db.User.findById(
//        req.params.id
//    ).then(function(user) {
//        if(!user) {
//            res.json({status: false, message: 'Utente non trovato'});
//        } else {
//            user.password = req.body.password;
//            user.email = req.body.email;
//            user.save();
//            res.json({status: true/*, data: user*/});
//        }
//    }).catch(function(err){
//        res.json({status: false, data: err});
//    });
//};

//exports.deleteUser = function(req, res){
//    db.User.destroy({
//        where: { id: req.params.id }
//    }).then(function(affectedRows){
//        res.json({status: true, deletedRows: affectedRows});
//    }).catch(function(err){
//        res.json({status: false, data: err});
//    });
//};
