'use strict';

/**
 * @ngInject
 **/
module.exports = function($rootScope, $scope, items, TopicService, ActionService, $uibModalInstance, $sce) {
	$scope.title = items.title;
	$scope.message = items.message;
	
	$scope.close = function(){
		$uibModalInstance.close();
	};

	$scope.authenticate = function(provider){
		$rootScope.$emit('callAuthenticate', { provider: provider })
	};
};