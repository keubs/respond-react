'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('Home', {
      url: '/',
      controller: 'TopicsCtrl',
      templateUrl: 'home.html',
    })
    .state('Submit Topic', {
      url: '/submit',
      controller: 'TopicSubmitCtrl',
      templateUrl: 'submit.html',
    })
    .state('Topic', {
      url: '/topic/:topic',
      controller: 'TopicCtrl',
      templateUrl: 'topic.html',
    });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
