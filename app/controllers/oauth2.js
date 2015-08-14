// Load required packages
var oauth2orize = require('oauth2orize')
var db = require('../models');

// Create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback) {
    return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
    db.Client.findOne({
        where: { _id: id }
    }).then(function(client) {
        return callback(null, client);
    }).catch(function(err){
        return callback(err);
    });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
    // Create a new authorization code
    db.Code.create({
        value: uid(16),
        redirectUri: redirectUri,
    }).then(function(code) {
        code.setClient(client._id);
        code.setUtente(user.id);
        callback(null, code.value);
    }).catch(function(err) {
        return callback(err);
    });
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
    db.Code.findOne({
        where: { value: code },
        include: [db.Client, db.Utente]
    }).then(function(authCode) {
        if (!authCode) { return callback(null, false); }
        if (client._id !== authCode.Client._id) { return callback(null, false); }
        if (redirectUri !== authCode.redirectUri) { return callback(null, false); }
        // Delete auth code now that it has been used
        authCode.destroy().then(function(){
            // Create a new access token
            db.Token.create({
                value: uid(256)
            }).then(function(token){
                token.setClient(authCode.Client);
                token.setUtente(authCode.Utente);
                callback(null, token);
            }).catch(function(err){
                return callback(err);
            });
        }).catch(function(err){
            return callback(err);
        });
    }).catch(function(err){
        return callback(err);
    });
}));

// User authorization endpoint
exports.authorization = [
    server.authorization(function(clientId, redirectUri, callback) {
        db.Client.findOne({
            where: { id: clientId }
        }).then(function(client) {
            return callback(null, client, redirectUri);
        }).catch(function(err){
            return callback(err);
        });
    }),
    function(req, res){
        res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
]

// User decision endpoint
exports.decision = [
    server.decision()
]

// Application client token exchange endpoint
exports.token = [
    server.token(),
    server.errorHandler()
]

function uid (len) {
    var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
