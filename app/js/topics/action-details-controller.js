'use strict'

/**
* @ngInject
*/

module.exports = function($scope, $rootScope, action, $uibModalInstance) {
	$scope.init = function() {
		$scope.action = action;
	};

	$scope.cancel = function(){
		$uibModalInstance.close();
	};
}