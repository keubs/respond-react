'use strict';

/**
 * @ngInject
 **/
module.exports = function($scope, items, TopicService, ActionService, $uibModalInstance, $sce) {
	$scope.action = items.action;

	switch(items.action) {
		case 'delete':
			if(items.type === 'topic') {
				$scope.message = 'You will not be able to recover this post. <br /><span class=\"warn\">All actions under this post will also subsequently be deleted</span>';
			} else {
				$scope.message = "You will not be able to recover this post.";
			}
			break;
		case 'approve':
			$scope.message = "You can unapprove it later.";
			break;

	}

	switch(items.type) {
		case 'topic':
			getTopic(items.id);
			break;
		case 'action':
			getAction(items.id);
			break;
		default:
			break;
	}


	$scope.cancel = function(){
		$uibModalInstance.close();
	};

	$scope.doAction = function(){
		switch(items.type) {
			case 'topic':
				switch(items.action) {
					case 'delete':
						TopicService.delete(items.id)
							.then(function(){
								$scope.message = 'This post was deleted successfully.';
								setTimeout(function(){
									$uibModalInstance.close();
								}, 1000);	
							}, function(error){
								console.log(error);
							});
						break;
				}
				break;
			case 'action':
				switch(items.action) {
					case 'approve':
						ActionService.approve(items.id)
							.then(function(){
								$scope.message = 'This post was approved successfully';
								setTimeout(function(){
									$uibModalInstance.close();
								}, 1000);
							}, function(error){
								console.log(error);
							})
						break;

					case 'delete':
						ActionService.delete(items.id)
							.then(function(){
								$scope.message = 'This post was deleted successfully.';
								setTimeout(function(){
									$uibModalInstance.close();
								}, 1000);	
							}, function(error){
								console.log(error);
							});
				}
				break;
		}
	};

	function getTopic(id) {
		TopicService.topic(id)
			.then(function(data){
				console.log(data);
				$scope.title = data.title;
			}, function(error){
				console.log(error);
			});
	};

	function getAction(id) {
		ActionService.action(id)
			.then(function(data){
				console.log(data);
				$scope.title = data.title;
			}, function(error){
				console.log(error);
			});
	};
};