// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.use(new BasicStrategy(
    function(username, password, done) {
        console.log('autenticazione BasicStrategy');
        db.User.findOne({
            where: {username: username} 
        }).then(function(user){
            // No user found with that username
            if (!user) return done(null, false);
            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) return done(err);
                // Password did not match
                if (!isMatch) return done(null, false);
                // Success
                return done(null, user);
            });
        }).catch(function(err){
            return done(err);
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, done) {
        console.log('autenticazione client-basic');
        db.Client.findOne({
            where: {id: username}
        }).then(function(client){
            // No client found with that id or bad password
            if (!client || client.secret != password) { return done(null, false); }
            // Success
            return done(null, client);
        }).catch(function(err){
            return done(err);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, done) {
        console.log('autenticazione BearerStrategy');
        db.Token.findOne({
            where: {value: accessToken}, include: [db.User]
        }).then(function(token){
            // No token found
            if(!token) { return done(null, false); }
            // No user found
            if(!token.User) { return done(null, false); }
            // Simple example with no scope
            return done(null, token.User, { scope: '*' });
        }).catch(function(err){
            return done(err);
        });
    }
));

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('autenticazione local');
        db.User.findOne({
            where: {username: username}
        }).then(function(user){
            // No user found with that username
            if(!user) return done(null, false);

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if(err) return done(err);

                // Password did not match
                if(!isMatch) return done(null, false);

                // Success
                return done(null, user);
            });
        }).catch(function(err){
            return done(err);
        });
    }
));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    db.User.findById(id).then(function(user){
        return done(null, user);
    }).catch(function(err){
        return done(err, null);
    });
});


exports.isLocalAuthenticated = function(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

//exports.isAuthenticated = passport.authenticate('basic', { session : false });
//exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
//exports.isAuthenticated = passport.authenticate(['basic', 'local', 'bearer'], { session : false });

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
