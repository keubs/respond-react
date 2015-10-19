'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, TopicService, AuthService) {
  $scope.title = 'HELLO!';
  $scope.errors = {};

  $scope.topics = [];

  TopicService.get().then(function(data) {
    $scope.topics = data;
  });

  $scope.newTopic = function() {
    TopicService.new($scope.topic)
      .then(function (data) {
        $location.path('/topic/' + data.id);
      }, function (error) {
        $scope.errors = {};

        $scope.errors.general = errorStringify(error.non_field_errors);
        $scope.errors.title = errorStringify(error.title);
        $scope.errors.article_link = errorStringify(error.article_link);
      });
  };

  $scope.deleteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    TopicService.delete(topic.id);
  };

  $scope.upVoteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    if (topic.isUpVoted) {
      TopicService.clearVote(topic.id, topic.isUpVoted);
      topic.isUpVoted = false;
      topic.isDownVoted = false;
      topic.score--;
    } else {
      TopicService.upVote(topic.id);
      topic.isUpVoted = true;
      topic.isDownVoted = false;
      topic.score++;
    }
  };

  $scope.downVoteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    if (topic.isDownVoted) {
      TopicService.clearVote(topic.id, !topic.isDownVoted);
      topic.isDownVoted = false;
      topic.isUpVoted = false;
      topic.score++;
    } else {
      TopicService.downVote(topic.id);
      topic.isDownVoted = true;
      topic.isUpVoted = false;
      topic.score--;
    }
  };

  $scope.isUpVoted = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    return AuthService.isLoggedIn() && topic.isUpVoted;
    // return AuthService.isLoggedIn() && TopicService.isUpVoted(topic.id);
  };

  $scope.isDownVoted = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    return AuthService.isLoggedIn() && topic.isDownVoted;
    // return AuthService.isLoggedIn() && TopicService.isDownVoted(topic.id);
  };
};
