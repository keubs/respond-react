'use strict';
/**
 * @ngInject
 **/
module.exports = function($scope, $location, $stateParams, ActionService, TopicService, $window, Facebook, LinkFactory) {
    $scope.action = {};
    $scope.alerts = [];
    $scope.submit = function() {
        $scope.action.tags = $scope.jsonfied($scope.action.tags);
        $scope.action.topic = $stateParams.topic;
		    ActionService.new($scope.action)
			   .then(function(data){
          $scope.alerts.push({ type : 'success', msg: 'Thank you for your submission! Pending approval, you should see your action on this page soon'});
          $scope.formloading = false;
			   }, function(error) {
            console.log(error);
            $scope.alerts.push({ type : 'danger', msg: 'There was an error submitting your action. Please try again or <a href="#">Contact us</a>'});
      });
	};

	$scope.linkEntered = function() {
    $scope.formLoading = true;
	   LinkFactory.link($scope)
	    .then(function(data) {
        $scope.action = data;
        $scope.formLoading = false;
	    }, function(error) {
	      console.log(error);
        $scope.formLoading = false;
	    });
	};

  // @todo not the cleanest method but it needs a string representation of a json array  ¯\_(ツ)_/¯
  $scope.jsonfied = function(array) {
    var str = '[';
    for (var i = 0; i < array.length; i++) {
      str += '"' + array[i].text + '",';
    }
    str = str.slice(0, -1);
    str += ']';
    return str;
  };
};

