'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('./templates');
require('./topics/_index');
require('./auth/_index');
require('ng-resource');
require('ng-tags-input');
require('satellizer');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'templates',
    'topics',
    'auth',
    'ngTagsInput',
    'satellizer',
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular
    .module('app')
    .constant('AppSettings', require('./constants'))
    .config(require('./on_config'))
    .run(require('./on_run'))
    .config(function($httpProvider, $authProvider) {
      // Enable cross domain calls
      // $httpProvider.defaults.useXDomain = true;
      $authProvider.facebook({
        url: "http://squ.ad:8100/api/login/social/jwt_user/facebook",
        clientId: '1513191525645232'
      });

      $authProvider.authToken = 'JWT';
      $authProvider.tokenPrefix = 'satellizer_jwt';  // to not collide with regular token auth
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      // Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

    });

  angular.bootstrap(document, ['app']);

});
