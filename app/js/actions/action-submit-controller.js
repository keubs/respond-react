'use strict';

const errorStringify = require('../helpers/error-stringify');

module.exports = function($scope, $location, actionService, $window) {
  $scope.title = 'HELLO!';
  $scope.errors = {};

  $scope.actions = [];
  $scope.actions.created_by = $window.sessionStorage.id;
  $scope.submit = function() {
    $scope.action.tags = $scope.jsonfied($scope.action.tags);
    $scope.action.image_preview = undefined;
    actionService.new($scope.action)
      .then(function(data) {

        $location.path('/action/' + data.id);
      }, function(error) {
        $scope.errors = {};
        $scope.errors.general = errorStringify(error.non_field_errors);
        $scope.errors.title = errorStringify(error.title);
        $scope.errors.article_link = errorStringify(error.article_link);

        $scope.errors.auth = error.status === 401 ? 'You must be logged in to do that' : '';
      });
  };

  $scope.linkEntered = function() {
    actionService.og($scope.action.article_link)
      .then(function(data) {
        $scope.action.image_preview = {};
        $scope.action.image_preview.visible = true;
        $scope.action.image_url = data.image;
        $scope.action.image_preview.src = data.image;
        $scope.action.title = data.title;
      }, function(error) {
        console.log(error);
      });
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
