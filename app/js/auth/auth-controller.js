'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, AuthService) {
  $scope.errors = {};

  $scope.register = function() {
    AuthService.register($scope.user);
  };

  $scope.login = function() {
    AuthService.login($scope.user)
      .then(function () {
        console.log('logged in!');
        $location.path('/');
      }, function (error) {
        $scope.errors = {};

        $scope.errors.general = errorStringify(error.non_field_errors);
        $scope.errors.username = errorStringify(error.username);
        $scope.errors.password = errorStringify(error.password);

        console.log($scope.errors);

      });
  };

  $scope.logout = function() {
    AuthService.logout();
  };

  $scope.isLoggedIn = function() {
    return AuthService.isLoggedIn();
  };

};
