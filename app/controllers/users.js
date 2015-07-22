var db = require('./../models/db');
var bcrypt = require('./../controllers/bcrypt');
var jwt = require('./../controllers/jsonwebtoken');

var ctrl = {};

ctrl.findUser = function(username, password, callback){
    db.User.findOne({
        where: {
            username: username//, password: password
        }
    })
        .then(
        function(user){
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    var retData = {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    };
                    callback(null, {
                        type: true,
                        data: retData,
                        token: jwt.my_sign(retData)
                    });
                } else {
                    callback({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }

            } else {
                callback({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        })
        .catch(
        function(err){
            callback({
                type: false,
                data: "Error occured: " + err
            });
        });
};

module.exports = ctrl;
