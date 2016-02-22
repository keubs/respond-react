'use strict';
/**
 * @ngInject
 **/
module.exports = function($scope, $location, $stateParams, ActionService, TopicService, $window, Facebook, LinkService) {
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
    if($scope.action.article_link.search(/facebook.com\/events/i) > -1) {
      LinkService.facebookEvent($scope.action.article_link)
        .then(function(data){
          $scope.action.image_preview = {};
          $scope.action.title = data.name;
          $scope.action.description = data.description;
          $scope.action.image_url = data.cover.source;
          $scope.action.image_preview.visible = true;
          $scope.action.image_preview.src = data.cover.source;
          $scope.formLoading = false;
        }, function(error) {
          console.log(error);
          $scope.formLoading = false;
        });
    } else if ($scope.action.article_link.search(/nytimes.com/i) > -1) {
      LinkService.nyTimesLink($scope.action.article_link)
        .then(function(data) {
          data = data.docs[0];
          console.log(data);
          $scope.action.image_preview = {};
          $scope.action.image_preview.visible = true;
          $scope.action.image_url = "http://nytimes.com/"+data.multimedia[1].url;
          $scope.action.image_preview.src = "http://nytimes.com/"+data.multimedia[1].url;
          console.log(data.multimedia[1].url);
          $scope.action.title = data.headline.main;
          $scope.action.description = data.snippet;
          $scope.formLoading = false;
        });
    } else {
	  TopicService.og($scope.action.article_link)
	    .then(function(data) {
	      $scope.action.image_preview = {};
	      $scope.action.image_preview.visible = true;
	      $scope.action.image_url = data.image;
	      $scope.action.image_preview.src = data.image;
	      $scope.action.title = data.title;
        $scope.action.description = data.description;
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

