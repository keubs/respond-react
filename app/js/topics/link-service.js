'use strict';

/**
 * @ngInject
 */
function LinkService($q, $http, AppSettings, Facebook) {

	var service = {};

	service.link = function(link) {
		var deferred = $q.defer();
		$http.post(AppSettings.apiUrl + '/getopengraph/', {url: link})
		  .success(function(data) {
		    console.log(data);
		    deferred.resolve(data);
		  })
		  .error(function(err, status) {
		    deferred.reject({err, status});
		  });

		return deferred.promise;
	};

	service.facebookEvent = function(link) {
		var eventId = link.replace(/https:\/\/www.facebook.com\/events/, '');
		var deferred = $q.defer();

		Facebook.getLoginStatus(function(response){
		  Facebook.api(eventId.replace(/\//g,'') + "?fields=cover,name,description", function(response) {
		    if(!response.error) {
		      deferred.resolve(response);
		    } else {
		    	console.log(response);
		    	deferred.reject(response.error);
		    }

		  });
		});

		return deferred.promise;
	};

	service.nyTimesLink = function(link) {

	};


	return service;
}	

module.exports = LinkService;