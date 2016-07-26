'use strict';
/**
 * @ngInject
 **/
module.exports = function($scope, $location, UserService, $auth, $http, AppSettings, $stateParams, AuthService, $uibModal, $rootScope, AddressService) {
	$scope.currentUser = {};
	$scope.backendUrl = AppSettings.backendUrl;
	$scope.editUser = function(){
	/*===========================================
	=            Edit User Modal            =
	===========================================*/
	  var modalInstance = $uibModal.open({
	    animation: true,
	    templateUrl: 'edit-user.html',
	    controller: 'EditUserCtrl',
	    size: 'lg',
	  });
	/*=====  End of Edit User Modal  ======*/
	};

	$scope.init = function() {
		UserService.get($stateParams.userid)
			.then(function(data){
				$scope.user = data;
				$scope.currentUser = $rootScope.user;
				console.log($scope.user);
				$scope.isCurrentUser = ($scope.currentUser.id === $scope.user.id) ? true : false;
			}, function(error){
				console.log(error);
			});	

		UserService.topics($stateParams.userid)
			.then(function(data){
				console.log(data);
				$scope.topics = data;
			}, function(error){
				console.log(error);
			});
	};
};