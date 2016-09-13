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

		AuthService.unapprovedActions()
			.then(function(data){
				$scope.unapprovedActions = data;
				console.log(data);
			}, function(err){
				console.log(err);
			});

		AuthService.unapprovedActionCount()
			.then(function(data){
				console.log(data.count);
				$scope.unapprovedActionCount = data.count;
			}, function(err){
				console.log(err);
			});

	};

	$scope.modalAction = function(id, type, action) {
		var send = {
			type: type,
			id  : id,
			action: action,
		};
		$uibModal.open({
		  animation: true,
		  templateUrl: 'modal.html',
		  controller: 'ModalContentCtrl',
		  size: 'sm',
		  resolve: {
		  	items : function(){
		  		return send;
		  	}
		  }
		});
	};

};