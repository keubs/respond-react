'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, TopicService, $window, LinkFactory) {
  $scope.title = 'HELLO!';
  $scope.errors = {};

  $scope.topics = [];
  $scope.topics.created_by = $window.sessionStorage.id;
  $scope.submit = function() {
    $scope.topic.tags = $scope.jsonfied($scope.topic.tags);
    $scope.topic.image_preview = undefined;
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

  // @todo not the cleanest method but it needs a string representation of a json array  ¯\_(ツ)_/¯
  $scope.jsonfied = function(array) {
    var str = '[';
    for (var i = 0; i < array.length; i++) {
      str += '"' + array[i].text.toLowerCase() + '",';
    }
    str = str.slice(0, -1);
    str += ']';
    return str;
  };
};
