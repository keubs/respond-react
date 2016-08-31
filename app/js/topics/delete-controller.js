'use strict';


module.exports = function($scope, items, TopicService, $uibModalInstance) {
	$scope.message = "You will not be able to recover this post";
	switch(items.type) {
		case 'topic':
			getTopic(items.id);
			break;
		case 'action':
			break;
		default:
			break;
	}


	$scope.cancel = function(){
		$uibModalInstance.close();
	};

	$scope.delete = function(){
		TopicService.delete(items.id)
			.then(function(){
				$scope.message = 'This post was deleted successfully.';
				setTimeout(function(){
					window.location.href = window.location;
				}, 2000);
				
			}, function(error){
				console.log(error);
			});
	};

	function getTopic(id) {
		TopicService.topic(id)
			.then(function(data){
				console.log(data);
				$scope.title = data.title;
			}, function(error){
				console.log(error);
			});
	}
};