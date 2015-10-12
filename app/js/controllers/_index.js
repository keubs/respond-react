'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.controllers', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);

var controllersModule = require('./_index');


/**
 * @ngInject
 */
controllersModule.controller('FuzzyCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    $scope.title = 'HELLO!';

    $scope.topics = [];
    TopicService.get().then(function(data) {
      $scope.topics = data;
    });
  },
]);
