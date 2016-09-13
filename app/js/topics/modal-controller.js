'use strict';

/**
 * @ngInject
 **/
module.exports = function($scope, items, TopicService, ActionService, $uibModalInstance) {
	$scope.action = items.action;

	switch(items.action) {
		case 'delete':
			$scope.message = "You will not be able to recover this post.";
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
		switch(items.action) {
			case 'delete':
				TopicService.delete(items.id)
					.then(function(){
						$scope.message = 'This post was deleted successfully.';
						setTimeout(function(){
							window.location.href = window.location;
						}, 2000);	
					}, function(error){
						console.log(error);
					});
				break;
			case 'approve':
				ActionService.approve(items.id)
					.then(function(){
						$scope.message = 'This post as approved successfully';
						setTimeout(function(){
							window.location.href = window.location;
						}, 2000);
					}, function(error){
						console.log(error);
					})
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