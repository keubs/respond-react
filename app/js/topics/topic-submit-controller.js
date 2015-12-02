'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, TopicService, $window) {
  $scope.title = 'HELLO!';
  $scope.errors = {};

  $scope.topics = [];
  $scope.topics.created_by = $window.sessionStorage.id;
  $scope.submit = function() {
    TopicService.new($scope.topic)
      .then(function(data) {
        $location.path('/topic/' + data.id);
      }, function(error) {
        $scope.errors = {};

        $scope.errors.general = errorStringify(error.non_field_errors);
        $scope.errors.title = errorStringify(error.title);
        $scope.errors.article_link = errorStringify(error.article_link);

        $scope.errors.auth = error.status === 401 ? 'You must be logged in to do that' : '';
      });
  };
};
