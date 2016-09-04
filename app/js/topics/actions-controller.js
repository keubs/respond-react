'use strict';

/**
 * @ngInject
 **/

 module.exports = function($scope, $location, $stateParams, ActionService, $window, AppSettings) {
    $scope.tag = $stateParams.tag || null;
    $scope.backendUrl = AppSettings.backendUrl;
    ActionService.get($scope.tag).then(function(data) {
      $scope.actions = data;
      console.log(data);
    });
 };