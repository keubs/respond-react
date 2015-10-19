'use strict';

/**
 * @ngInject
 */
module.exports = function($q, $http) {

  var service = {};

  service.register = function(user) {
    console.log(user, 'service register');
  };

  service.login = function(user) {
    console.log(user, 'service login');
    var deferred = $q.defer();

    $http.post('http://127.0.0.1:8000/api-token-auth/', user)
      .success(function(data) {
        // TODO: do this the right way?
        $http.defaults.headers.common.Authorization = 'JWT ' + data.token;
        deferred.resolve();
      })
      .error(function(error) {
        deferred.reject(error);
      });

    return deferred.promise;
  };

  service.logout = function() {

  };

  service.isLoggedIn = function() {
    // TODO: do this the right way?
    return $http.defaults.headers.common.Authorization ? true : false;
  };

  return service;
};
