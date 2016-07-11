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
    .state('User', {
      url: '/user/:userid',
      controller: 'UserCtrl',
      templateUrl: 'user.html',
    })
    .state('Tag', {
      url: '/topics/tag/:tag',
      controller: 'TopicsCtrl',
      templateUrl: 'home.html',
    })
    .state('Submit Topic', {
      url: '/submit',
      controller: 'TopicSubmitCtrl',
      templateUrl: 'submit.html',
    })
    .state('Submit Action', {
      controller: 'ActionCtrl',
    })
    .state('Action Tag', {
      url : '/actions/tag/:tag',
      controller: 'ActionsCtrl',
      templateUrl: 'actions.html',
    })
    .state('Topic', {
      url: '/topic/:topic',
      controller: 'TopicCtrl',
      templateUrl: 'topic.html',
    })
    .state('500', {
      url: '/500',
      templateUrl: '500.html'
    });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
