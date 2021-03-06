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
      data: {
        requireLogin: false
      }
    })
    .state('User', {
      url: '/user/:userid',
      controller: 'UserCtrl',
      templateUrl: 'user.html',
      data: {
        requireLogin: false
      }
    })
    .state('EditUser', {
      url: '/user/:userid/edit',
      controller: 'EditUserCtrl',
      templateUrl: 'edit-user.html',
      data: {
        requireLogin: true
      }
    })
    .state('Tag', {
      url: '/topics/tag/:tag',
      controller: 'TopicsCtrl',
      templateUrl: 'home.html',
      data: {
        requireLogin: false
      }
    })
    .state('Submit Topic', {
      url: '/submit',
      controller: 'TopicSubmitCtrl',
      templateUrl: 'submit.html',
      data: {
        requireLogin: true
      }
    })
    .state('Submit Action', {
      url: '/topic/:topic/submit-action',
      templateUrl: 'submit-action.html',
      controller: 'ActionSubmitCtrl',
      data: {
        requireLogin: true
      }
    })
    .state('Action Tag', {
      url : '/actions/tag/:tag',
      controller: 'ActionsCtrl',
      templateUrl: 'actions.html',
      data: {
        requireLogin: false
      }
    })
    .state('Topic', {
      url: '/topic/:topic',
      controller: 'TopicCtrl',
      templateUrl: 'topic.html',
      data: {
        requireLogin: false
      }
    })
    .state('500', {
      url: '/500',
      templateUrl: '500.html',
      data: {
        requireLogin: false
      }
    })
    .state('Terms and Conditions', {
      url: '/terms-conditions',
      templateUrl: 'terms-conditions.html',
      data : {
        requireLogin: false
      }
    })
    .state('Privacy Policy', {
      url: '/privacy-policy',
      templateUrl: 'privacy-policy.html',
      data : {
        requireLogin: false
      }
    })
    ;

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;
