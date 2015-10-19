'use strict';

/**
 * @ngInject
 */
module.exports = function($q, $http, $window) {

  var service = {};

  service.register = function(user) {

  };

  service.login = function(user) {
    var deferred = $q.defer();

    $http.post('http://127.0.0.1:8000/api-token-auth/', user)
      .success(function(data) {
        // TODO: do this the right way?
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.user = user.username;
        $http.defaults.headers.common.Authorization = 'JWT ' + data.token;
        deferred.resolve();
      })
      .error(function(error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  service.logout = function() {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.user;
    delete $http.defaults.headers.common.Authorization;
  };

  service.isLoggedIn = function() {
    return $window.sessionStorage.user ? $window.sessionStorage.user : false;
  };

  return service;
};
