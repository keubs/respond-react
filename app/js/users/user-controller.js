'use strict';

module.exports = function($scope, $location, UserService, $auth, $http, $window, AppSettings, $stateParams) {


	$scope.user = UserService.get($stateParams.userid)
		.then(function(data){
			$scope.user = data;
			console.log($scope.user);
		}, function(error){
			console.log(error);
		})
};