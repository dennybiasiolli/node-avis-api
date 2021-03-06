var db = require('../models');

exports.postClients = function(req, res) {
    db.Client.findOrCreate({
        where: {name: req.body.name},
        defaults: {
            name: req.body.name,
            id: req.body.id,
            secret: req.body.secret
        }
    }).spread(function(client, isCreated){
        if(isCreated){
            client.setUser(req.user.id);
            res.json({status: true, message: 'Client aggiunto.', data: client});
        } else {
            res.json({status: true, message: 'Client già esistente.', data: client});
        }
    }).catch(function(err){
        res.json({status: false, data: err});
    });
};

exports.getClients = function(req, res) {
    db.User.findById(
        req.user.id, {include: [db.Client]}
    ).then(function(user){
        res.json(user.Clients);
    }).catch(function(err){
        res.send(err);
    });
};
