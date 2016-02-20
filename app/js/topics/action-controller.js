'use strict';
/**
 * @ngInject
 **/
module.exports = function($scope, $location, $stateParams, ActionService, TopicService, $window, Facebook) {
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
      var eventId = $scope.action.article_link.replace(/https:\/\/www.facebook.com\/events/, '');

      Facebook.getLoginStatus(function(response){
        Facebook.api(eventId.replace(/\//g,'') + "?fields=cover,name,description", function(response) {
          if(!response.error) {
            $scope.action.image_preview = {};
            $scope.action.title = response.name;
            $scope.action.description = response.description;
            $scope.action.image_url = response.cover.source;
            $scope.action.image_preview.visible = true;
            $scope.action.image_preview.src = response.cover.source;
          }
          $scope.formLoading = false;
        });
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

