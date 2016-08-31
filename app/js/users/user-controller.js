'use strict';
/**
 * @ngInject
 **/
module.exports = function($scope, $location, UserService, $auth, $http, AppSettings, $stateParams, AuthService, $uibModal, $rootScope) {
	$scope.currentUser = {};
	$scope.backendUrl = AppSettings.backendUrl;
	$scope.editUser = function(){
	/*===========================================
	=            Edit User Modal            =
	===========================================*/
	  $uibModal.open({
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
				$scope.isCurrentUser = ($scope.currentUser.id === $scope.user.id) ? true : false;
			}, function(err){
				console.log(err);
			});	

		UserService.topics($stateParams.userid)
			.then(function(data){
				$scope.topics = data;
			}, function(err){
				console.log(err);
			});
	};


	$scope.deleteTopic = function(id) {
		var send = {
			type: 'topic',
			id  : id
		};
		$uibModal.open({
		  animation: true,
		  templateUrl: 'delete.html',
		  controller: 'DeleteContentCtrl',
		  size: 'sm',
		  resolve: {
		  	items : function(){
		  		return send;
		  	}
		  }
		});
	}
};