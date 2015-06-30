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

////async
//bcrypt.hash('denny', null, null, function(err, hash) {
//    // Store hash in your password DB.
//    console.log(hash);
//    bcrypt.compare('denny', hash, function(err, res) {
//        console.log(res);
//    });
//    bcrypt.compare('pippo', hash, function(err, res) {
//        console.log(res);
//    });
//});

////sync
//var hash = bcrypt.hashSync('denny');
//console.log(hash);
//console.log(bcrypt.compareSync('denny', hash)); // true);
//console.log(bcrypt.compareSync('pippo', hash)); // true);

module.exports = retObj;