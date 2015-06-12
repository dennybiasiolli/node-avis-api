'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',

    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',

    'myApp.avis',

    'myApp.version'])

    .config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

        $routeProvider.otherwise({redirectTo: '/avis'});
    }]);
