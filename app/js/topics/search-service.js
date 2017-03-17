'use strict';

/*
 * @ngInject
 */

function SearchService($q, $http, AppSettings) {
	var service = {};

	service.search = function(param) {
		var deferred = $q.defer();

		$http.post(AppSettings.apiUrl + '/search/', {term: param})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(err, status){
				deferred.reject({err, status});
			});

			return deferred.promise;

	};

	return service;
};

module.exports = SearchService;