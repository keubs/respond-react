'use strict';
/**
 * @ngInject
 **/
module.exports = function($scope, $location, $stateParams, ActionService, TopicService, $window, Facebook, LinkFactory) {
    $scope.action = {};
    $scope.submit = function() {
        $scope.action.tags = $scope.jsonfied($scope.action.tags);
        $scope.action.topic = $stateParams.topic;
		ActionService.new($scope.action)
			.then(function(data){
        $location.path('/topic/' + $stateParams.topic);
			});
	};

	$scope.linkEntered = function() {
    $scope.formLoading = true;
    if($scope.article_link.search(/facebook.com\/events/i) > -1) {
      LinkFactory.facebookEvent($scope)
      .then(function(data) {
        $scope.action = data;
        $scope.formLoading = false;
      }, function(error) {
        console.log(error);
      });
    } else if ($scope.article_link.search(/nytimes.com/i) > -1) {
      LinkFactory.nyTimesLink($scope)
        .then(function(data) {
          $scope.action = data;
          $scope.formLoading = false;
        });
    } else {
	   LinkFactory.link($scope)
	    .then(function(data) {
        $scope.action = data;
        $scope.formLoading = false;
	    }, function(error) {
	      console.log(error);
        $scope.formLoading = false;
	    });
    }
	};


    $scope.upVote = function($actionId) {
        if (action.isUpVoted) {
          ActionService.clearVote(action.id, action.isUpVoted)
            .then(function() {
              action.isUpVoted = false;
              action.isDownVoted = false;
              action.score--;
            },
            function(error) {
              $scope.voteFailed($actionIndex, error);
            });
        } else {
          ActionService.upVote(action.id)
            .then(function() {
              action.isUpVoted = true;
              action.isDownVoted = false;
              action.score++;
            },
            function(error) {
              $scope.voteFailed($actionIndex, error);
            });
        }
    };

    $scope.downVote = function($actionId) {

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

