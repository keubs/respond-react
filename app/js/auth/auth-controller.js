'use strict';
const helpers = require('../helpers/helpers.js');

/**
 * @ngInject
 **/
module.exports = function($scope, $location, AuthService, $auth, $http, $window, AppSettings, $uibModal, $cookies) {
  
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
      AuthService.unapprovedActionCount()
        .then(function(data){
          if(data.count > 0){
            $scope.alerts.push({msg: 'You currently have ' + data.count + ' unapproved actions. Approve or delete them in your dashboard.'});
          }
        })
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


  $scope.firstVisitor = function(){
    var send = {
      title: 'Welcome to respond/react!',
      message  : "<p>Respond React is a link sharing site for anyone who wants to do more than just get depressed by the news. Every day, we aspire to connect you with the actual people affected by those oftentimes harrowing headlines you read on sites like cnn.com and nytimes.com.</p><p>Whether it be crowdsourcing, crowdfunding, petitions, rallies, fundraisers, or events, respond/react aims to find you way you can get involved.</p><p>In addition, if you've created a change.org petition, kickstarter.com fund, or a facebook event and you want more people to see it, <a href='#'>register now</a> and start posting your action under any headlines you see on this site!</p><p>Don't just <em>react</em>, <strong>respond</strong>!</p>"
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
};
