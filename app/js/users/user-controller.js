'use strict';

module.exports = function($scope, $location, UserService, $auth, $http, AppSettings, $stateParams, AuthService, $rootScope) {
	$scope.user = UserService.get($stateParams.userid)
		.then(function(data){
			$scope.user = data;
		}, function(error){
			console.log(error);
		});

	console.log($rootScope.user);
	$scope.isCurrentUser = false;
};