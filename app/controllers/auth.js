// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models/db');

passport.use(new BasicStrategy(
    function(username, password, callback) {
        db.Utente.findOne({ where: {username: username} })
            .then(function(utente){
            // No user found with that username
            if (!utente) return callback(null, false);
            // Make sure the password is correct
            utente.verifyPassword(password, function(err, isMatch) {
                if (err) return callback(err);
                // Password did not match
                if (!isMatch) return callback(null, false);
                // Success
                return callback(null, utente);
            });
        })
            .catch(function(err){
            return callback(err);
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback) {
        db.Client.findOne({ where: {id: username} })
            .then(function(client){
            // No client found with that id or bad password
            if (!client || client.secret != password) { return callback(null, false); }
            // Success
            return callback(null, client);
        })
            .catch(function(err){
            return callback(err);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        db.Token.findOne({ where: {value: accessToken}, include: [db.Utente] })
            .then(function(token){
            // No token found
            if(!token) { return callback(null, false); }
            // No user found
            if(!token.Utente) { return callback(null, false); }
            // Simple example with no scope
            callback(null, token.Utente, { scope: '*' });
        })
            .catch(function(err){
            return callback(err);
        });
    }
));

passport.use(new LocalStrategy(
    function(username, password, callback) {
        db.Utente.findOne({ where: {username: username} })
            .then(function(utente){
            // No user found with that username
            if (!utente) return callback(null, false);
            // Make sure the password is correct
            utente.verifyPassword(password, function(err, isMatch) {
                if (err) return callback(err);
                // Password did not match
                if (!isMatch) return callback(null, false);
                // Success
                return callback(null, utente);
            });
        })
            .catch(function(err){
            return callback(err);
        });
    }
));



//exports.isAuthenticated = passport.authenticate('basic', { session : false });
//exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isAuthenticated = passport.authenticate(['local', 'bearer'], { session : false });

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
