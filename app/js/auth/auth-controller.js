'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, AuthService) {
  $scope._isRegister = false;
  $scope.errors = {};

  $scope.register = function() {
    AuthService.register($scope.user);
  };

  $scope.login = function() {
    AuthService.login($scope.user)
      .then(function() {
        $location.path('/');
      }, function(error) {
        $scope.errors = {};

        $scope.errors.general = errorStringify(error.non_field_errors);
        $scope.errors.username = errorStringify(error.username);
        $scope.errors.password = errorStringify(error.password);

      });
  };

  $scope.logout = function() {
    AuthService.logout();
  };

  $scope.isLoggedIn = function() {
    let user = AuthService.isLoggedIn();
    if (user) {
      $scope.user = $scope.user || {};
      $scope.user.username = user;
      return true;
    } else {
      return false;
    }
  };

  $scope.isRegister = function() {
    return $scope._isRegister;
  };

  $scope.toggleRegister = function() {
    $scope._isRegister = !$scope._isRegister;
  };

};
