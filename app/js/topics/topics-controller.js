'use strict';

module.exports = function($scope, $location, TopicService) {
  $scope.title = 'HELLO!';

  $scope.topics = [];

  TopicService.get().then(function(data) {
    $scope.topics = data;
    console.log(data);
  });

  // if ($location.path() === '/') {
  //   $scope.topics = TopicService.all;
  // }

  $scope.topic = {url: 'http://', title: ''};

  $scope.deleteTopic = function(topicId) {
    TopicService.delete(topicId);
  };

  $scope.upVoteTopic = function(topicId, isUpVoted) {
    if (isUpVoted) {
      TopicService.clearVote(topicId, isUpVoted);
    } else {
      TopicService.upVote(topicId);
    }
  };

  $scope.downVoteTopic = function(topicId, isDownVoted) {
    if (isDownVoted) {
      TopicService.clearVote(topicId, !isDownVoted);
    } else {
      TopicService.downVote(topicId);
    }
  };

  $scope.isUpVoted = function(topicId) {
    return TopicService.isUpVoted(topicId);
  };

  $scope.isDownVoted = function(topicId) {
    return TopicService.isDownVoted(topicId);
  };
};
