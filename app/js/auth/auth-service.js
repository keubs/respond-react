'use strict';
/**
 * @ngInject
 */
module.exports = function($q, $http, $window, AppSettings, $rootScope, $cookies) {

  var service = {};

  service.register = function(user) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/user/register/', user)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(error){
        deferred.reject(error);
      });
  };

  service.login = function(user) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/token-auth/', user)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  service.socialLogin = function(user) {
    $window.sessionStorage.token = user.token;
    // $window.sessionStorage.user = user.username;
    // $window.sessionStorage.id = user.id;
    $http.defaults.headers.common.Authorization = 'JWT ' + user.token;
  };

  service.logout = function() {
    delete $rootScope.user;
    // Social Auth
    delete $window.localStorage.satellizer_jwt_token;


    delete $window.sessionStorage.token;
    delete $window.sessionStorage.user;

    delete $window.localStorage.token;
    delete $window.localStorage.user;

    $cookies.remove('rr_token');
    $cookies.remove('rr_user');
    // delete $window.sessionStorage.id;
    // delete $window.sessionStorage.thumb;
    delete $http.defaults.headers.common.Authorization;
  };

  service.isLoggedIn = function() {
    if($window.sessionStorage.token) {
      $http.defaults.headers.common.Authorization = 'JWT ' + $window.sessionStorage.token;
      return $window.sessionStorage.user ? $window.sessionStorage.user : false;
    } else {
      return false;
    }
  };


  service.newIsLoggedIn = function() {
    if($window.sessionStorage.token) {
      if ($window.sessionStorage.user) {
        $http.defaults.headers.common.Authorization = 'JWT ' + $window.sessionStorage.token;
        $rootScope.user = JSON.parse($window.sessionStorage.user);
        return true;
      } else {
        service.getUserFromToken($window.sessionStorage.token)
          .then(function(data){
            service.setLoginData($window.sessionStorage.token, data);
            service.newIsLoggedIn();
          }, function(error){
            console.log(error);
            return false;
          });
      }
    } else if ($window.localStorage.token) {
      if ($window.localStorage.user) {
        $window.sessionStorage.token = $window.localStorage.token;
        $window.sessionStorage.user = $window.localStorage.user;
        $http.defaults.headers.common.Authorization = 'JWT ' + $window.sessionStorage.token;
        $rootScope.user = JSON.parse($window.localStorage.user);
        return true;
      } else {
        service.getUserFromToken($window.localStorage.token)
          .then(function(data){
            service.setLoginData($window.localStorage.token, data);
            service.newIsLoggedIn();
          }, function(error){
            console.log(error);
            return false;
          });
      }
    } else if ($cookies.get('rr_token')) {
      if($cookies.get('rr_user')) {
        $window.sessionStorage.token = $cookies.get('rr_token');
        $window.sessionStorage.user = $cookies.get('rr_user');
        $http.defaults.headers.common.Authorization = 'JWT ' + $window.sessionStorage.token;
        $rootScope.user = JSON.parse($cookies.get('rr_user'));
        return true;
      } else {
        service.getUserFromToken($cookies.get('rr_token'))
          .then(function(data){
            service.setLoginData($cookies.get('rr_token'), data);
            service.newIsLoggedIn();
          }, function(error){
            console.log(error);
            return false;
          });
      }
    } else {
      return false;
    }
  };

  service.getUserFromToken = function(token) {
    $http.defaults.headers.common.Authorization = 'JWT ' + token;

    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/misc/token-auth/')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        deferred.reject({err});
      });

      return deferred.promise;
  };

  service.setLoginData = function(token, data) {
    $window.sessionStorage.token = token;
    $window.localStorage.token = token;
    $cookies.put('rr_token', token);

    $window.sessionStorage.user = (typeof data === 'object') ? JSON.stringify(data) : data;
    $window.localStorage.user = (typeof data === 'object') ? JSON.stringify(data) : data;
    $cookies.put('rr_user', (typeof data === 'object') ? JSON.stringify(data) : data);

    $http.defaults.headers.common.Authorization = 'JWT ' + token || 'JWT ' + data.token;
  };

  return service;
};
