'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('./templates');
require('./topics/_index');
require('./actions/_index');
require('./auth/_index');
require('ng-resource');
require('ng-tags-input');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'templates',
    'topics',
    'actions',
    'auth',
    'ngTagsInput',
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular
    .module('app')
    .constant('AppSettings', require('./constants'))
    .config(require('./on_config'))
    .run(require('./on_run'))
    .config(function($httpProvider) {
      // Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;

      // Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

  angular.bootstrap(document, ['app']);

});
