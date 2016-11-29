'use strict';
const helpers = require('../helpers/helpers.js');
/**
 * @ngInject
 **/
module.exports = function($scope, $location, UserService, $auth, $http, AppSettings, $stateParams, AuthService, $uibModal, $rootScope) {

	$scope.init = function() {
		// $scope.currentUser = {};
		$scope.backendUrl = AppSettings.backendUrl;
		$scope.mediaUrl = AppSettings.mediaUrl;

		UserService.get($stateParams.userid)
			.then(function(data){
				$scope.user = data;
				$scope.currentUser = $rootScope.user;
				$scope.isCurrentUser = ($scope.currentUser && $scope.currentUser.id === $scope.user.id) ? true : false;
				if($scope.user.new_user && helpers.getParameterByName('new_user') == 'true') {
					$scope.editUser();
				}

				if($scope.currentUser && $scope.isCurrentUser) {
					$scope.getUnapproved();
				}
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
	
	$scope.editUser = function(send) {
	  $uibModal.open({
	    animation: true,
	    templateUrl: 'edit-user.html',
	    controller: 'EditUserCtrl',
	    size: 'lg',
	    resolve: {
	      items : function(){
	        return send;
	      }
	    }
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
		  templateUrl: 'action-modal.html',
		  controller: 'ModalActionCtrl',
		  size: 'sm',
		  resolve: {
		  	items : function(){
		  		return send;
		  	}
		  }
		});
	};

	$scope.getUnapproved = function(){

		AuthService.unapprovedActions()
			.then(function(data){
				$scope.unapprovedActions = data;
			}, function(err){
				console.log(err);
			});

		AuthService.unapprovedActionCount()
			.then(function(data){
				$scope.unapprovedActionCount = data.count;
			}, function(err){
				console.log(err);
			});
	}

};