'use strict';

/**
 * @ngInject
 */
module.exports = function($q, $http, $window, AppSettings) {

  var service = {};

  service.register = function(user) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/user/register/', user)
      .success(function(data){
        deferred.resolve();
      })
      .error(function(error){
        deferred.reject(error);
      });
  };
  service.login = function(user) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/token-auth/', user)
      .success(function(data) {
        // TODO: do this the right way?
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.user = user.username;
        $window.sessionStorage.id = data.user.id;
        $http.defaults.headers.common.Authorization = 'JWT ' + data.token;
        deferred.resolve();
      })
      .error(function(error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  service.socialLogin = function(user) {
    debugger;
    $window.sessionStorage.token = user.token;
    $window.sessionStorage.user = user.username;
    $window.sessionStorage.id = user.id;
    $http.defaults.headers.common.Authorization = 'JWT ' + user.token;
  };

  service.logout = function() {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.user;
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

  return service;
};
