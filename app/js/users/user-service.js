'use strict';

/**
 * @ngInject
 */
function UserService($q, $http, AppSettings, AddressService, AuthService, $window) {

  var service = {};

  service.get = function(id){
  	var deferred = $q.defer();

  	$http.get(AppSettings.apiUrl + '/users/' + id + '/')
  		.success(function(data){
  			deferred.resolve(data);
  		})
  		.error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
  		});

  		return deferred.promise;
  };

  service.topics = function(id){
    var deferred = $q.defer();

    $http.get(AppSettings.apiUrl + '/users/' + id + '/topics/')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        deferred.reject(err);
      });

      return deferred.promise;
  };

  service.update = function(user) {
    var deferred = $q.defer();
    var address = null;
    AddressService.submit(user.address)
      .then(function(data){
        user.address = data.id;
        address = data;
        $http.post(AppSettings.apiUrl + '/users/'+ user.id +'/update', user)
          .success(function(data){
            AuthService.setLoginData($window.sessionStorage.token, data);
            data.address = address;
            data.address.formatted = address.raw;
            deferred.resolve(data);
          })
          .error(function(err){
            deferred.reject(err);
          });
      }, function(error) {
        console.log('address not saved', error);
        $http.post(AppSettings.apiUrl + '/users/'+ user.id +'/update', user)
          .success(function(data){
            AuthService.setLoginData($window.sessionStorage.token, data);
            deferred.resolve(data);
          })
          .error(function(err){
            deferred.reject(err);
          });
      });

      return deferred.promise;
  };
  return service;
}

module.exports = UserService;
