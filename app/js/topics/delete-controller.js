'use strict'


module.exports = function($scope, items, TopicService) {
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