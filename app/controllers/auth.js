// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
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

exports.isAuthenticated = passport.authenticate('basic', { session : false });