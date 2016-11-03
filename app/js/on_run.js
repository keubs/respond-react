'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings, $location) {

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', function(event, toState, $location) {
    $rootScope.pageTitle = '';

    var requireLogin = toState.data.requireLogin;

  	if (requireLogin && typeof $rootScope.user === 'undefined') {
      event.preventDefault();
      console.log('not logged in, but should be!');
      window.location.href = '/';
    }

    if (toState.title) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    if (toState.og_title) {
      $rootScope.og_title;
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

}

module.exports = OnRun;
