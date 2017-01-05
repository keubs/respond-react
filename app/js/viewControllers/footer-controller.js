'use strict';


module.exports = function($scope, $rootScope) {
	$scope.respond = function(){
		$rootScope.$emit('callModal', {});
	}
};