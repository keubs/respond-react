'use strict';

module.exports = function($scope, $location, $stateParams, actionService, AuthService, AppSettings) {
  $scope.action = {};
  $scope.backendUrl = AppSettings.backendUrl;
  actionService.action($stateParams.action)
    .then(function(data) {
      for (var attr in data) {
        $scope.action[attr] = data[attr];
      }

      console.log($scope.action);
    }, function(error) {
      console.log(error);
    });

};
