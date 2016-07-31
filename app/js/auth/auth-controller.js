'use strict';
/**
 * @ngInject
 **/
const helpers = require('../helpers/helpers.js');

module.exports = function($scope, $location, AuthService, $auth, $http, $window, AppSettings, $rootScope, $cookies) {
  $scope._isRegister = false;
  $scope.errors = {};
  $scope.credentials = {};
  $scope.alerts = [];
  $scope.userid = $window.sessionStorage.id;
  $scope.isLoggedIn = AuthService.newIsLoggedIn();
  $scope.register = function() {
    AuthService.register($scope.user);
  };

  $scope.login = function() {
    AuthService.login($scope.credentials)
      .then(function(data) {
        console.log(data);
        var token = data.token;
        AuthService.setLoginData(token, data.user);

        $scope.user = data.user;
        $scope.isLoggedIn = true;
      }, function(error) {
        $scope.errors = {};
        $scope.errors.general = helpers.errorStringify(error.non_field_errors);
        $scope.errors.username = helpers.errorStringify(error.username);
        $scope.errors.password = helpers.errorStringify(error.password);
      });
  };

  $scope.logout = function() {
    AuthService.logout();
    $scope.isLoggedIn = false;
     var req = {
         method: "POST",
         url: '/api/logout/session/',
         skipAuthorization: true  // in case of session auth don't send token header
     };
     $http(req).then(function(response){
         console.log("Got user from session cookies");
         AuthService.logout();
     });
  };


  $scope.isRegister = function() {
    return $scope._isRegister;
  };

  $scope.toggleRegister = function() {
    $scope._isRegister = !$scope._isRegister;
  };

  $scope.hasThumb = function() {
    if($scope.social_thumb)
      return $scope.social_thumb;
    else
      return AppSettings.apiUrl + '/static/anonymous.png';
  };

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(data){
          var userObject = {
            'first_name'  : data.data.first_name,
            'last_name'   : data.data.last_name,
            'email'       : data.data.email,
            'social_thumb': data.data.social_thumb,
            'username'    : data.data.username,
            'id'          : data.data.id,
            'address'     : data.data.address,
          };

          AuthService.setLoginData(data.data.token, userObject);
          $scope.user = userObject;
          $scope.isLoggedIn = true;
      }, function(error){
        console.log(error);
      }).catch(function(data) {
          var err_msg = "Something went wrong, maybe you haven't installed 'djangorestframework-jwt'?";
          console.log(data);
          console.log(err_msg);
          alert(err_msg);
      });
  };
};
