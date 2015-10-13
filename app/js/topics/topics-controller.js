'use strict';

module.exports = function($scope, TopicService) {
  console.log('howdy');
  $scope.title = 'HELLO!';

  $scope.topics = [];
  TopicService.get().then(function(data) {
    $scope.topics = data;
  });
};
