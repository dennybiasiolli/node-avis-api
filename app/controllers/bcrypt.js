var bcrypt = require('bcrypt-nodejs');

var retObj = {};

retObj.hash = function(strOriginal, callback){
    bcrypt.hash(strOriginal, null, null, function(err, hash) {
        if(callback)
            callback(err, hash);
    });
}
retObj.hashSync = function(strOriginal){
    return bcrypt.hashSync(strOriginal);
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

module.exports = retObj;