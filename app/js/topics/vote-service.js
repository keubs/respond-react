'use strict';

/**
* @ngInject
**/

function VoteService($q, $http, AppSettings) {
	var service = {};

	service.upVote = function(type, id) {
		console.log('upvote', type, id);

		var deferred = $q.defer();

		var url = '';

		if (type === 'topic'){
			url = AppSettings.apiUrl + '/topics/' + id + '/rate/1';
		} else if(type === 'action') {
			url = AppSettings.apiUrl + '/actions/' + id + '/rate/1';
		}

		$http.post(url)
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(err, status){
				deferred.reject({err, status})
			});

		return deferred.promise;
	};


	service.clearVote = function(type, id) {
	  console.log('clearVote', id);

	  var deferred = $q.defer();

	  var url = '';

	  if (type === 'topic'){
	  	url = AppSettings.apiUrl + '/topics/' + id + '/rate/0';
	  } else if(type === 'action') {
	  	url = AppSettings.apiUrl + '/actions/' + id + '/rate/0';
	  }

	  $http.post(url)
	    .success(function(data) {
	      deferred.resolve(data);
	    })
	    .error(function(err, status) {
	      console.log(err, status);
	      deferred.reject({err, status});
	    });

	  return deferred.promise;
	};

	return service;
}

module.exports = VoteService;