'use strict';

module.exports = function($scope, $location, $stateParams, TopicService, AuthService, AppSettings) {
	$scope.topic = {};
	$scope.backendUrl = AppSettings.backendUrl;
	TopicService.topic($stateParams.topic)
		.then(function(data){
			for(var attr in data){
				$scope.topic[attr] = data[attr];
			}

			console.log($scope.topic);
		}, function(error){
			console.log(error);
		});

	
};