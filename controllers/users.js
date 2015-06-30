var db = require('./../models/db');

var ctrl = {};

ctrl.findUser = function(username, password){
    return db.User.findOne({
        where: {
            username: username//, password: password
        }
    });
};

module.exports = ctrl;
