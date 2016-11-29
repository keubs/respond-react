'use strict';
var helpers = require('../helpers/helpers.js');  

/**
 * @ngInject
 **/

module.exports = function($scope, $rootScope, $location, TopicService, AuthService, AppSettings, $stateParams, AddressService) {


  $scope.init = function() {
    $rootScope.pageTitle = "respond/react | Don't just react, respond.";
    $scope.errors = {};
    $scope.isLoggedIn = AuthService.newIsLoggedIn();
    $scope.topics = [];

    $scope.backendUrl = AppSettings.backendUrl;
    $scope.mediaUrl = AppSettings.mediaUrl;
    $scope.tag = $stateParams.tag || null;
    if($scope.tag) {
      $scope.tag_title = helpers.toTitleCase($scope.tag);
    }
    /* Pagination Stuff */
    $scope.currentPage = 1;
    $scope.totalItems = 2;
    $scope.maxSize = 10;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    TopicService.count().then(function(data){
      $scope.totalItems = data.count;
    }, function(err){
        console.log(err);
    });

    TopicService.get($scope.tag, $scope.currentPage).then(function(data) {
      $scope.topics = data;
    }, function(err) {
      console.log(err);
      if(err.status === 500 || err.status === -1) {
        $location.path('/500');
      } else if(err.status === 401) {
        AuthService.logout();
      }
    });
    
    /* Banners */
    $scope.refresh('worldwide');
    $scope.refresh('local');
    $scope.refresh('national');
  };

  $scope.pageChanged = function() {
    TopicService.get(null, $scope.currentPage).then(function(data) {
      $scope.topics = data;
    }, function(err) {
      if(err.status === 500 || err.status === -1) {
        $location.path('/500');
      } else if(err.status === 401) {
        AuthService.logout();
      }
    });
  };
  /* End Pagination */



  $scope.deleteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    TopicService.delete(topic.id);
  };

  $scope.upVoteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    if (topic.isUpVoted) {
      TopicService.clearVote(topic.id, topic.isUpVoted)
        .then(function() {
          topic.isUpVoted = false;
          topic.isDownVoted = false;
          topic.score--;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    } else {
      TopicService.upVote(topic.id)
        .then(function() {
          topic.isUpVoted = true;
          topic.isDownVoted = false;
          topic.score++;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    }
  };

  $scope.downVoteTopic = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    if (topic.isDownVoted) {
      TopicService.clearVote(topic.id, !topic.isDownVoted)
        .then(function() {
          topic.isDownVoted = false;
          topic.isUpVoted = false;
          topic.score++;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    } else {
      TopicService.downVote(topic.id)
        .then(function() {
          topic.isDownVoted = true;
          topic.isUpVoted = false;
          topic.score--;
        },
        function(error) {
          $scope.voteFailed($topicIndex, error);
        });
    }
  };

  $scope.isUpVoted = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];

    return $scope.isLoggedIn && topic.isUpVoted;
    // return AuthService.isLoggedIn() && TopicService.isUpVoted(topic.id);
  };

  $scope.isDownVoted = function($topicIndex) {
    let topic = $scope.topics[$topicIndex];
    return $scope.isLoggedIn && topic.isDownVoted;
    // return AuthService.isLoggedIn() && TopicService.isDownVoted(topic.id);
  };

  $scope.voteFailed = function($topicIndex, error) {
    let topic = $scope.topics[$topicIndex];

    switch (error.status) {
      case 401:
        topic.error = 'You must be logged in to do that.';
        break;
      default:
        topic.error = 'Something bad happened. 😭😭😭';
    }
  };

  $scope.formatDateTime = function(dateTime){
    return helpers.formatDateTime(dateTime);
  };

  $scope.removeTag = function(){
    $location.path('#');
  };

  $scope.refresh = function(scope) {
    switch(scope){
      case 'worldwide':
        TopicService.worldwide()
          .then(function(data){
            $scope.worldwide = data.data;
          }, function(error){
            console.log(error);
        });
      break;

      case 'local':
        TopicService.local()
          .then(function(data){
            $scope.local = data.data;

            AddressService.get(data.data.address)
              .then(function(data){
                console.log(data);
                $scope.state = data.locality.state.name;
              })
          }, function(error){
            console.log(error);
        });
      break;

      case 'national':
        TopicService.national()
          .then(function(data){
            $scope.national = data.data;
          }, function(error){
            console.log(error);
        });
      break;
    }
  }
};
