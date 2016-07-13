'use strict';

/**
 * @ngInject
 */
function UserService($q, $http, AppSettings) {

  var service = {};

  service.get = function(id){
  	var deferred = $q.defer();

  	$http.get(AppSettings.apiUrl + '/users/' + id)
  		.success(function(data){
  			deferred.resolve(data);
  		})
  		.error(function(err){
  			deferred.reject(err);
  		});

  		return deferred.promise;
  }
  return service;
}

module.exports = UserService;
