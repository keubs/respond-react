'use strict';

/**
 * @ngInject
 */
module.exports = function($q, $http, $window, AppSettings) {

  var service = {};

  service.register = function(user) {
    console.log(user);
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

  service.logout = function() {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.user;
    delete $http.defaults.headers.common.Authorization;
  };

  service.isLoggedIn = function() {
    $http.defaults.headers.common.Authorization = 'JWT ' + $window.sessionStorage.token;
    return $window.sessionStorage.user ? $window.sessionStorage.user : false;
  };

  return service;
};
