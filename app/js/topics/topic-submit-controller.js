'use strict';

const helpers = require('../helpers/helpers.js');

module.exports = function($scope, $location, TopicService, $window, LinkFactory) {
  $scope.title = 'HELLO!';
  $scope.errors = {};

  $scope.topics = [];
  $scope.topics.created_by = $window.sessionStorage.id;
  $scope.submit = function() {
    $scope.topic.tags = helpers.jsonfied($scope.topic.tags);
    $scope.topic.image_preview = undefined;
    TopicService.new($scope.topic)
      .then(function(data) {
        $location.path('/topic/' + data.id);
      }, function(error) {
        $scope.errors = {};
        $scope.errors.general = helpers.errorStringify(error.non_field_errors);
        $scope.errors.title = helpers.errorStringify(error.title);
        $scope.errors.article_link = helpers.errorStringify(error.article_link);
        $scope.errors.auth = error.status === 401 ? 'You must be logged in to do that' : '';
      });
  };

  $scope.linkEntered = function() {
    $scope.formLoading = true;
    LinkFactory.link($scope)
    .then(function(data) {
      $scope.topic = data;
      $scope.formLoading = false;
    }, function(error) {
      console.log(error);
      $scope.formLoading = false;
    });
  };
};
