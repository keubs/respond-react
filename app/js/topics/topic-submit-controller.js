'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, TopicService, $window) {
  $scope.title = 'HELLO!';
  $scope.errors = {};

  $scope.topics = [];
  $scope.topics.created_by = $window.sessionStorage.id;
  $scope.submit = function() {
    console.log($scope.topic);
    $scope.topic.tags = JSON.stringify($scope.topic.tags.split(','));
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
    TopicService.image($scope.topic.article_link)
      .then(function(data){
        $scope.topic.image_preview = {};
        $scope.topic.image_preview.visible = true;
        $scope.topic.image_url = data.image;
        $scope.topic.image_preview.src = data.image;
      });
  };

  $scope.jsonfied = function(names) {
    names: names.replace( /,$/, "" ).split(",").map(function(name) {
        return {name: name};
    })
};
};
