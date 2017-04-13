'use strict';
var helpers = require('../helpers/helpers.js');  

/**
 * @ngInject
 **/

module.exports = function($scope, $rootScope, $location, TopicService, AuthService, AppSettings, $stateParams, AddressService, $analytics) {


  $scope.init = function() {
    $rootScope.pageTitle = "respond/react | Don't just react, respond.";
    $rootScope.og_title = "respond/react | Don't just react, respond.";
    $analytics.pageTrack('/');

    $scope.errors = {};
    $scope.isLoggedIn = AuthService.newIsLoggedIn();
    $scope.topics = [];
    $scope.pagination = true;
    $scope.sortMethod = 'time';
    $scope.backendUrl = AppSettings.backendUrl;
    $scope.mediaUrl = AppSettings.mediaUrl;
    $scope.tag = $stateParams.tag || null;
    if($scope.tag) {
      $scope.tag_title = helpers.toTitleCase($scope.tag);
    }

    TopicService.count().then(function(data){
      $scope.totalItems = data.count;
    }, function(err){
        console.log(err);
    });

    TopicService.get($scope.tag, $scope.currentPage, $scope.sortMethod).then(function(data) {
      $scope.topics = data;
      helpers.generateTags($scope.topics);
    }, function(err) {
      console.log(err);
      if(err.status === 500 || err.status === -1) {
        // $location.path('/500');
      } else if(err.status === 401) {
        AuthService.logout();
      }
    });

    $scope.filters = [
      {'text': 'Score', 'value': 'score'},
      {'text': 'Time', 'value': 'time'},
    ];
    
    /* Banners */
    $scope.refresh('worldwide');
    $scope.refresh('local');
    $scope.refresh('national');
    $scope.refiltered = {
      worldwide : {
        status     : false,
        unfiltered : false,
        data       : {}
      },
      local     : {
        status     : false,
        unfiltered : false,
        data       : {}
      },
      national  : {
        status     :   false,
        unfiltered : false,
        data       : {}
      }
    };
  };

  /* Pagination Stuff */
  $scope.currentPage = 1;
  $scope.totalItems = 2;
  $scope.maxSize = 10;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
    
  $scope.pageChanged = function() {
    $scope.currentPage = $scope.currentPage + 1; 
    TopicService.get(null, $scope.currentPage, $scope.sortMethod).then(function(data) {
      // console.log($scope.topics);
      data.forEach(function(topic){
        $scope.topics.push(topic);
      })
      // console.log($scope.topics);
      // var elem = document.getElementById('topics');
      // var coords = elem.getBoundingClientRect();
      // window.scrollTo(0, coords.bottom-50);
    }, function(err) {
      if(err.status === 500 || err.status === -1) {
        // $location.path('/500');
      } else if(err.status === 401) {
        AuthService.logout();
      }
    });
  };
  /* End Pagination */



  $scope.formatDateTime = function(dateTime){
    return helpers.formatDateTime(dateTime);
  };

  $scope.removeTag = function(){
    $location.path('#');
  };

  $scope.refresh = function(scope) {
    switch(scope){
      case 'worldwide':
        TopicService.worldwide(1)
          .then(function(data){
            $scope.worldwide = data.data[0];
          }, function(error){
            console.log(error);
        });
      break;

      case 'local':
        TopicService.local(1)
          .then(function(data){
            $scope.local = data.data[0];
            $scope.state = data.data[0].state;
          }, function(error){
            console.log(error);
        });
      break;

      case 'national':
        TopicService.national(1)
          .then(function(data){
            $scope.national = data.data[0];
          }, function(error){
            console.log(error);
        });
      break;
    }
  };

  $scope.refilter = function(scope){
    $scope.pagination = false;
    Object.keys($scope.refiltered).forEach(function(new_scope){
      $scope.refiltered[new_scope].status = false;
      console.log(scope, new_scope);
      if(scope !== new_scope) $scope.refiltered[new_scope].unfiltered = true;
      else {
        $scope.refiltered[new_scope].unfiltered = false;
      }
    });

    $scope.refiltered[scope].status = true;
    switch(scope) {
      case 'worldwide':
        TopicService.worldwide()
          .then(function(data){
            $scope.topics = data.data;
          }, function(error){
            console.log(error);
        });        
        break;
      case 'national':
        TopicService.national()
          .then(function(data){
            $scope.topics = data.data;
          }, function(error){
            console.log(error);
        });
        break;
      case 'local':
        TopicService.local()
          .then(function(data){
            $scope.topics = data.data;
          }, function(error){
            console.log(error);
        });
        break;
    }
  };

  $scope.respond = function(){
    $rootScope.$emit('callModal', {});
  };

  $scope.setSort = function(sort){
    $scope.sortMethod = sort;
  }

  $scope.sort = function(sort){

    $scope.setSort(sort);
    // Track that shiz
    $analytics.eventTrack('change', {  category: 'refining', label: $scope.filter });

    // alert($scope.filter);
    TopicService.get(null, null, $scope.sortMethod).then(function(data) {
      $scope.topics = data;
    }, function(err) {
      console.log(err);
      if(err.status === 500 || err.status === -1) {
        // $location.path('/500');
      } else if(err.status === 401) {
        AuthService.logout();
      }
    });
  }
};
