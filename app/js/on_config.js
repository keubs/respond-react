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
      controller: 'TopicsCtrl',
      templateUrl: 'submit.html',
    });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
