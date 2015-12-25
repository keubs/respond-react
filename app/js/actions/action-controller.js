'use strict';
/**
 * @ngInject
 **/
module.exports = function($scope, $location, $stateParams, ActionService, TopicService, $window) {
	$scope.action = {};
	$scope.submit = function() {
		$scope.action.tags = $scope.jsonfied($scope.action.tags);
		$scope.action.topic = $stateParams.topic;
		ActionService.new($scope.action)
			.then(function(data){

			});
	};

	$scope.linkEntered = function() {
	  TopicService.og($scope.action.article_link)
	    .then(function(data) {
	      console.log(data);
	      $scope.action.image_preview = {};
	      $scope.action.image_preview.visible = true;
	      $scope.action.image_url = data.image;
	      $scope.action.image_preview.src = data.image;
	      $scope.action.title = data.title;
	    }, function(error) {
	      console.log(error);
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