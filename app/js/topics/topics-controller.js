'use strict';

module.exports = function($scope, $location, TopicService, AuthService, AppSettings, $stateParams) {
  $scope.title = 'HELLO!';
  $scope.errors = {};
  $scope.isLoggedIn = AuthService.isLoggedIn();
  $scope.topics = [];

  $scope.backendUrl = AppSettings.backendUrl;
  $scope.tag = $stateParams.tag || null;
  TopicService.get($scope.tag).then(function(data) {
    $scope.topics = data;
  });


  $scope.deleteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    TopicService.delete(topic.id);
  };

  $scope.upVoteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    if (topic.isUpVoted) {
      TopicService.clearVote(topic.id, topic.isUpVoted)
        .then(function() {
          topic.isUpVoted = false;
          topic.isDownVoted = false;
          topic.score--;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    } else {
      TopicService.upVote(topic.id)
        .then(function() {
          topic.isUpVoted = true;
          topic.isDownVoted = false;
          topic.score++;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    }
  };

  $scope.downVoteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    if (topic.isDownVoted) {
      TopicService.clearVote(topic.id, !topic.isDownVoted)
        .then(function() {
          topic.isDownVoted = false;
          topic.isUpVoted = false;
          topic.score++;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    } else {
      TopicService.downVote(topic.id)
        .then(function() {
          topic.isDownVoted = true;
          topic.isUpVoted = false;
          topic.score--;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    }
  };

  $scope.isUpVoted = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    return $scope.isLoggedIn && topic.isUpVoted;
    // return AuthService.isLoggedIn() && TopicService.isUpVoted(topic.id);
  };

  $scope.isDownVoted = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];
    return $scope.isLoggedIn && topic.isDownVoted;
    // return AuthService.isLoggedIn() && TopicService.isDownVoted(topic.id);
  };

  $scope.voteFailed = function($topicIndex, error) {
    let topic = $scope.topics[$topicIndex];

    switch (error.status) {
      case 401:
        topic.error = 'You must be logged in to do that.';
        break;
      default:
        topic.error = 'Something bad happened. 😭😭😭';
    }
  };

};
