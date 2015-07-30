var express = require('express');
var authController = require('./../../controllers/auth');
var oauth2Controller = require('./../../controllers/oauth2');

module.exports = function(router, passport) {
    // Create endpoint handlers for oauth2 authorize
    router.route('/oauth2/authorize')
        .get(authController.isAuthenticated, oauth2Controller.authorization)
        .post(authController.isAuthenticated, oauth2Controller.decision);

    // Create endpoint handlers for oauth2 token
    router.route('/oauth2/token')
        .post(authController.isClientAuthenticated, oauth2Controller.token);
};
