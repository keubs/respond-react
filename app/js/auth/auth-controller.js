'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, AuthService, $auth, $http, $window, AppSettings) {
  $scope._isRegister = false;
  $scope.errors = {};
  $scope.alerts = [];
  set_user();
  $scope.register = function() {
    AuthService.register($scope.user);
  };
  console.log($window.sessionStorage);
  $scope.thumb = $window.sessionStorage.thumb;
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
     var req = {
         method: "POST",
         url: '/api/logout/session/',
         skipAuthorization: true  // in case of session auth don't send token header
     };
     $http(req).then(function(response){
         console.log("Got user from session cookies");
         set_user();
     });
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

  $scope.hasThumb = function() {
    if($scope.social_thumb)
      return $scope.social_thumb;
    else
      return AppSettings.apiUrl + '/static/anonymous.png';
  };

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(response){
          $auth.setToken(response.data.token);
          set_user(response);
          // self.jwtPayload = $auth.getPayload();
      }).catch(function(data) {
          var err_msg = "Something went wrong, maybe you haven't installed 'djangorestframework-jwt'?";
          console.log(data);
          console.log(err_msg);
          alert(err_msg);
      });
  };

  function set_user(response){
      var source;
      if (response){
          AuthService.socialLogin(response.data);
          $scope.thumb = response.data.social_thumb;
          $window.sessionStorage.thumb = $scope.thumb;
          $scope.alerts.push({ type : 'success', msg: 'You are now logged in. Start submitting topics and actions today!'});
      } else {
          source = {
              'username': null,
              'first_name': null,
              'last_name': null,
              'email': null,
              'social_thumb': '{% static "anonymous.png" %}'
          };
      }

  };
};
