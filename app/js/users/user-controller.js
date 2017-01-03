'use strict';
const helpers = require('../helpers/helpers.js');
/**
 * @ngInject
 **/
module.exports = function($scope, $location, UserService, $auth, $http, AppSettings, $stateParams, AuthService, $uibModal, $rootScope, $analytics, TopicService) {

	$scope.init = function() {
		// $scope.currentUser = {};
		$scope.backendUrl = AppSettings.backendUrl;
		$scope.mediaUrl = AppSettings.mediaUrl;

		UserService.get($stateParams.userid)
			.then(function(data){
				$rootScope.pageTitle = data.username;
				$analytics.pageTrack('user/' + $stateParams.userid);
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

			$scope.getTopics();
	};
	
	// $scope.editUser = function(send) {
	//   $uibModal.open({
	//     animation: true,
	//     templateUrl: 'edit-user.html',
	//     controller: 'EditUserCtrl',
	//     size: 'lg',
	//     resolve: {
	//       items : function(){
	//         return send;
	//       }
	//     }
	//   });
	// };

	$scope.modalAction = function(id, type, action) {
		var send = {
			type: type,
			id  : id,
			action: action,
		};
		var modalInstance = $uibModal.open({
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

		modalInstance.result.then(function(){
			$scope.getUnapproved();
			$scope.getTopics();
		}, function(){			
			
		})
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
	};

	$scope.getActions = function(index){
		var id = $scope.topics[index].id;
		TopicService.topic_actions(id)
			.then(function(data){
				if(data.length > 0)
					$scope.topics[index].actions = data;
				else $scope.topics[index].actions = [{'title':'No actions yet'}];
			})
	};

	$scope.getTopics = function(){
		UserService.topics($stateParams.userid)
			.then(function(data){
				$scope.topics = data;
			}, function(err){
				console.log(err);
			});
	};

};