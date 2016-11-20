'use strict';

/**
 * @ngInject
 **/
module.exports = function($scope, items, TopicService, ActionService, $uibModalInstance, $sce) {
	$scope.title = items.title;
	$scope.message = items.message;
	
	$scope.close = function(){
		$uibModalInstance.close();
	};
};