'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('RootCtrl', ['$scope', '$window', '$mdSidenav', '$mdBottomSheet', '$q', function($scope, $window, $mdSidenav, $mdBottomSheet, $q){
        $scope.alert = function(msg){
            $window.alert(msg);
        };
        $scope.toggleList = function(){
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function(){
                $mdSidenav('left').toggle();
            });
        };
    }]);
