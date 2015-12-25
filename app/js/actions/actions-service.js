'use strict';

/**
 * @ngInject
 */
 function ActionService($q, $http, AppSettings) {
 	var service = {};

 	service.new = function(action){
 		var deferred = $q.defer();
 		console.log(action);
 		$http.post(AppSettings.apiUrl + '/actions/submit', action)
 			.success(function(data){
 				deferred.resolve(data);
 			})
 			.error(function(err, status){
 				deferred.reject({err, status});
 			});

		return deferred.promise;
 	}

 	return service;
 }

 module.exports = ActionService;