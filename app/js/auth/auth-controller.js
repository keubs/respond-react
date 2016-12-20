'use strict';
const helpers = require('../helpers/helpers.js');

/**
 * @ngInject
 **/
module.exports = function($scope, $rootScope, $location, AuthService, $auth, $http, $window, AppSettings, $uibModal, $cookies) {
  
  $scope.register = function() {
    AuthService.register($scope.user);
  };

  $scope.login = function() {
    AuthService.login($scope.credentials)
      .then(function(data) {
        var token = data.token;
        AuthService.setLoginData(token, data.user);
        $scope.user = data.user;
        $scope.isLoggedIn = true;
      }, function(error) {
        $scope.errors = {};
        $scope.errors.general = helpers.errorStringify(error.non_field_errors);
        $scope.errors.username = helpers.errorStringify(error.username);
        $scope.errors.password = helpers.errorStringify(error.password);
      });
  };

  $scope.logout = function() {
    AuthService.logout();
    $scope.isLoggedIn = false;
    var req = {
      method: 'POST',
      url: '/api/logout/session/',
      skipAuthorization: true,  // in case of session auth don't send token header
    };
    $http(req).then(function() {
      AuthService.logout();
      window.location.href = window.location;
    });
  };


  $scope.isRegister = function() {
    return $scope._isRegister;
  };

  $scope.toggleRegister = function() {
    $scope._isRegister = !$scope._isRegister;
  };

  $scope.hasThumb = function() {
    if ($scope.social_thumb) {
      return $scope.social_thumb;
    } else {
      return AppSettings.apiUrl + '/static/anonymous.png';
    }
  };

  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(data) {
        var userObject = {
          'first_name'  : data.data.first_name,
          'last_name'   : data.data.last_name,
          'email'       : data.data.email,
          'social_thumb': data.data.social_thumb,
          'username'    : data.data.username,
          'id'          : data.data.id,
          'address'     : data.data.address,
        };


        AuthService.setLoginData(data.data.token, userObject);
        $scope.user = userObject;
        $scope.isLoggedIn = true;
        window.location.href = data.data.new_user ? '/user/' + data.data.id + "?new_user=true" : window.location;
        // window.location.href = window.location;
      }, function(error){
        $scope.alerts = [];
        $scope.alerts.push({
          type : 'danger',
          msg: 'There was an error with your authentication using ' + provider + '. We are working on it.',
        });
        console.log(error);
      }).catch(function(data) {
        var errMsg = 'Something went wrong, maybe you haven\'t installed \'djangorestframework-jwt\'?';
        console.log(data);
        console.log(errMsg);
        $scope.alerts = [];
        $scope.alerts.push({
          type : 'danger',
          msg: 'There was an error with your authentication using ' + provider + '. We are working on it.',
        });

      });
  };

  $scope.init = function(){
    $scope._isRegister = false;
    $scope.errors = {};
    $scope.credentials = {};
    $scope.alerts = [];
    $scope.userid = $window.sessionStorage.id;
    $scope.isLoggedIn = AuthService.newIsLoggedIn();

    if($scope.isLoggedIn) {
      checkUnapproved();
      window.setInterval(checkUnapproved, 10000);
    } else {
      if($cookies.get('rr_firstVisitor')) {
      } else {
        $scope.firstVisitor();
      }
    }
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.loginPrompt = function(){
    $uibModal.open({
      animation: true,
      templateUrl: 'login-modal.html',
      controller: 'ModalContentCtrl',
      size: 'x-sm',
      resolve: {
        items : function(){
          return {};
        }
      }
    });
  };

  $scope.firstVisitor = function(){
    var send = {
      title: 'Welcome to respond/react!',
      message  : "<p>Respond React is a link sharing site for anyone who wants to do more than just get depressed by the news. Every day, people all over the world create petitions, marches, rallies, and crowdfunding campaigns to get their communities involved. We aspire to connect you with them as well as the people affected by those oftentimes harrowing headlines you read on at places like CNN and The New York Times.</p><p>In addition, if you're one of those who have created a change.org petition, kickstarter.com fund, or a facebook event and you want more people to see it, register now and start posting your events under any headlines you see on this site!</p><p>Don't just <em>react</em>, <strong>respond</strong>!</p>"
    };
    $uibModal.open({
      animation: true,
      templateUrl: 'modal.html',
      controller: 'ModalContentCtrl',
      size: 'sm',
      resolve: {
        items : function(){
          return send;
        }
      }
    });

    $cookies.put('rr_firstVisitor', true);
  };

  $rootScope.$on('callLogin', function(){
      $scope.loginPrompt();
  });

  $rootScope.$on('callModal', function(){
      $scope.firstVisitor();
  });

  $rootScope.$on('callAuthenticate', function(event, provider){

    $scope.authenticate(provider.provider)
  });

  function checkUnapproved() {
    AuthService.unapprovedActionCount()
      .then(function(data){
        $scope.alerts = [];
        if(data.count == 1){
          $scope.alerts.push({msg: 'You currently have ' + data.count + ' unapproved action. Approve or delete them in your dashboard.'});
        } else if(data.count > 1) {
          $scope.alerts.push({msg: 'You currently have ' + data.count + ' unapproved actions. Approve or delete them in your dashboard.'});
        }
      })
    };
};
