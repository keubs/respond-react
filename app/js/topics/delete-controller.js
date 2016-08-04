'use strict'


module.exports = function($scope, items, TopicService, $uibModalInstance) {
	console.log(items);
	switch(items.type) {
		case 'topic':
			getTopic(items.id);
			break;
		case 'action':
			break;
		default:
			break;
	};


	$scope.ok = function(){

	};

	$scope.delete = function(){
		TopicService.delete(items.id)
			.then(function(data){
				$scope.message = 'This post was deleted successfully.';
				setTimeout(function(){
					window.location.href = window.location;
				}, 2000);
				
			}, function(error){
				console.log(error);
			})
	}

	function getTopic(id) {
		TopicService.topic(id)
			.then(function(data){
				console.log(data);
				$scope.title = data.title;
			}, function(error){
				console.log(error);
			});
	};
};