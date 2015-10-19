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
    return AuthService.isLoggedIn() && TopicService.isUpVoted(topicId);
  };

  $scope.isDownVoted = function(topicId) {
    return AuthService.isLoggedIn() && TopicService.isDownVoted(topicId);
  };
};
