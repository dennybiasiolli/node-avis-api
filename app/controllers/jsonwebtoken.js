var jwt = require('jsonwebtoken');
// https://github.com/auth0/node-jsonwebtoken

var tokenPassword = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9';

jwt.my_sign = function(payload){
    return jwt.sign(payload, tokenPassword, { algorithm: 'HS512' });
};

jwt.my_verify = function(token){
    return jwt.verify(token, tokenPassword, { algorithm: 'HS512' });
};

jwt.my_decode = function(token){
    return jwt.decode(token);
};

function isAuthorized(req, functionOK, functionKO) {
    var bearerToken;
    var bearerHeader = req.headers['authorization'];
    //se non c'è negli headers controllo se mi arriva tramite post
    if (typeof bearerHeader === 'undefined')
        bearerHeader = req.query.authorization;
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        functionOK();
    } else {
        functionKO();
    }
}

jwt.isAuthorized = function(req, res, next) {
    isAuthorized(req, next, function(){
        res.sendStatus(403);
    });
}

jwt.isAuthorizedHTTP = function(req, res, next) {
    isAuthorized(req, next, function(){
        res.redirect('/login');
    });
}

jwt.isTokenValid = function(req, res, next) {
    if(jwt.my_verify(req.token)){
        req.user = jwt.my_decode(req.token);
        next();
    } else {
        res.json({
            type: false,
            data: "Invalid token"
        });
    }
}

var sample = function(){
    var token = jwt.sign({ foo: 'bar' }, tokenPassword, { algorithm: 'HS512' });
    //// sign with RSA SHA256
    //var cert = fs.readFileSync('private.key');  // get private key
    //var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});
};

module.exports = jwt;