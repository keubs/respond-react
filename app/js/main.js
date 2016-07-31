'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('./templates');
require('./topics/_index');
require('./viewControllers/_index');
require('./users/_index');
require('./auth/_index');
require('ng-resource');
require('ng-tags-input');
require('satellizer');
require('angularjs-facebook');
require('angular-ui-bootstrap');
require('ngMap');
require('angular-cookies');
// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'templates',
    'topics',
    'auth',
    'user',
    'viewControllers',
    'ngTagsInput',
    'satellizer',
    'facebook',
    'ui.bootstrap',
    'ngMap',
    'ngCookies',
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular
    .module('app')
    .constant('AppSettings', require('./constants'))
    .config(require('./on_config'))
    .run(require('./on_run'))
    .config(function($httpProvider, $authProvider, FacebookProvider) {
      // Enable cross domain calls
      // $httpProvider.defaults.useXDomain = true;
      $authProvider.facebook({
        // url: "http://squ.ad:8100/api/login/social/jwt_user/facebook",
        url: "http://respondreact.com:8100/api/login/social/jwt_user/facebook",
        clientId: '1513191525645232'
      });

      $authProvider.google({
        // url: "http://squ.ad:8100/api/login/social/jwt_user/google-oauth2",
        url: "http://respondreact.com:8100/api/login/social/jwt_user/google-oauth2",
        clientId: '593171474012-e4eu1o08jset6iqv8p75mdgq95jbojcg.apps.googleusercontent.com'
      });

      $authProvider.authToken = 'JWT';
      $authProvider.tokenPrefix = 'satellizer_jwt';  // to not collide with regular token auth

      FacebookProvider.init('1513191525645232');
      // $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      // $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      // Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

  angular.bootstrap(document, ['app']);

});
