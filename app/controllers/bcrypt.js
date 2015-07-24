var bcrypt = require('bcrypt-nodejs');

var retObj = {};

var saltRounds = 10;

retObj.hash = function(strOriginal, callback){
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err && callback) return callback(err, null);
        bcrypt.hash(strOriginal, salt, null, function(err, hash) {
            if(callback)
                callback(err, hash);
        });
    });
}
retObj.hashSync = function(strOriginal){
    var salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(strOriginal, salt);
}

retObj.compare = function(strOriginal, hash, callback){
    bcrypt.compare(strOriginal, hash, function(err, res) {
        if(callback)
            callback(err, res);
    });
}
retObj.compareSync = function(strOriginal, hash){
    return bcrypt.compareSync(strOriginal, hash);
}

retObj.genSalt = function(rounds, callback){
    bcrypt.genSalt(rounds, function(err, salt){
        if(callback)
            callback(err, salt);
    });
}
retObj.genSaltSync = function(rounds){
    return bcrypt.genSaltSync(rounds);
}

module.exports = retObj;