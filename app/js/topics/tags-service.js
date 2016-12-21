'use strict';

function TagsService($q, $http, AppSettings){
	var service = {};

	service.get_popular = function(){
		var deferred = $q.defer();

		$http.get(AppSettings.apiUrl + '/popular-tags')
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(error){
				deferred.reject({err, status});
			});

		return deferred.promise;
	}

	return service;
};


module.exports = TagsService;