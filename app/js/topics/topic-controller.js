'use strict';
const helpers = require('../helpers/helpers.js');

/**
 * @ngInject
 **/
module.exports = function($scope, $rootScope, $location, $stateParams, TopicService,
                          ActionService, AuthService, AppSettings, $uibModal, $analytics) {

  $scope.init = function(){
    $scope.topic = {};
    $scope.backendUrl = AppSettings.backendUrl;
    $scope.mediaUrl = AppSettings.mediaUrl;
    $scope.googleApiKey = AppSettings.googleApiKey;
    $scope.siteUrl = AppSettings.siteUrl;
    $scope.stashed = [];
    $scope.isLoggedIn = AuthService.newIsLoggedIn();
    $scope.mapDisplayed = false;
    $scope.today = new Date();

    /* Pagination Stuff */
    $scope.currentPage = 1;
    $scope.totalItems = 2;
    $scope.maxSize = 10;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;


    window.scrollTo(0,0);
    TopicService.topic($stateParams.topic)
      .then(function(data) {
        for (var attr in data) {
          $scope.topic[attr] = data[attr];
        }

        $scope.totalItems = data.action_count;
        $scope.mapZoom = helpers.setZoom($scope.topic.scope);
        $rootScope.pageTitle = "Get Involved | " + $scope.topic.title;
        $rootScope.og_title = "Get Involved | " + $scope.topic.title;
        $rootScope.og_image = data.image;
        $analytics.pageTrack('topic/' + $stateParams.topic);
        TopicService.topic_actions($stateParams.topic)
          .then(function(data){
            $scope.topic.actions = data;

            //
            for (var i = 0; i < $scope.topic.actions.length; i++){
              if($scope.topic.actions[i].end_date_time) {
                var end = new Date($scope.topic.actions[i].end_date_time);
                if($scope.today > end) {
                  $scope.topic.actions[i].ended = true;
                }
              }
            }
          }, function(error){
            console.log(error);
          });
      }, function(error) {
        console.log(error);
        $location.path('/');
      });

  };

  $scope.pageChanged = function() {
    // alert($scope.currentPage);
    TopicService.topic_actions($stateParams.topic, $scope.currentPage).then(function(data) {
      $scope.topic.actions = data;
    }, function(error){
        console.log('error');
    });
  };

  $scope.upVoteAction = function(index) {
    let action = $scope.topic.actions[index];
    if (action.isUpVoted) {
      ActionService.clearVote(action.id, action.isUpVoted)
        .then(function() {
          action.isUpVoted = false;
          action.isDownVoted = false;
          action.score--;
        },
        function(error) {
          $scope.voteFailed(index, error);
        });
    } else {
      ActionService.upVote(action.id)
        .then(function() {
          action.isUpVoted = true;
          action.isDownVoted = false;
          action.score++;
        },
        function(error) {
          $scope.voteFailed(index, error);
        });
    }

  };

  $scope.downVoteAction = function(index) {
    let action = $scope.topic.actions[index];

    if (action.isDownVoted) {
      ActionService.clearVote(action.id, !action.isDownVoted)
        .then(function() {
          action.isDownVoted = false;
          action.isUpVoted = false;
          action.score++;
        },
        function(error) {
          $scope.voteFailed(index, error);
        });
    } else {
      ActionService.downVote(action.id)
        .then(function() {
          action.isDownVoted = true;
          action.isUpVoted = false;
          action.score--;
        },
        function(error) {
          $scope.voteFailed(index, error);
        });
    }
  };

  $scope.upVoteTopic = function() {
    let topic = $scope.topic;

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

  $scope.isUpVoted = function($actionIndex) {
    let action = $scope.topic.actions[$actionIndex];
    return $scope.isLoggedIn && action.isUpVoted;
    // return AuthService.isLoggedIn() && TopicService.isUpVoted(topic.id);
  };

  $scope.isDownVoted = function($actionIndex) {
    let action = $scope.topic.actions[$actionIndex];
    return $scope.isLoggedIn && action.isDownVoted;
    // return AuthService.isLoggedIn() && TopicService.isDownVoted(topic.id);
  };

  $scope.voteFailed = function(index, error) {

    switch (error.status) {
      case 401:
        $rootScope.$emit('callLogin', {});
        console.log('You must be logged in to do that.');
        break;
      default:
        console.log('Something bad happened. 😭😭😭');
    }
  };

  $scope.sortActions = function(slug, name){
    if($scope.stashed.length > 0) $scope.topic.actions = $scope.stashed;
    var sorted = [];
    $scope.filter = name;
    $scope.topic.actions.forEach(function(action){
      action.tags.forEach(function(tag){
        if(tag.slug == slug){
          sorted.push(action)
        }
      });
    });

    $scope.stashed = $scope.topic.actions;
    $scope.topic.actions = sorted;
    $scope.topic.action_count = sorted.length;
  };

  $scope.reset = function() {
    $scope.topic.actions = $scope.stashed;
    $scope.topic.action_count = $scope.topic.actions.length;
    $scope.stashed = [];
    $scope.filter = null;
  };

  $scope.showMap = function(){
    $scope.mapDisplayed = $scope.mapDisplayed ? false : true;
  };
  
  $scope.loginPrompt = function() {
    $rootScope.$emit('callLogin', {});
  };

    // /*===========================================
    // =            Action Submit Modal            =
    // ===========================================*/
    // $scope.submitAction = function(){
    //   var size = $rootScope.user ? 'lg' : 'sm';
    //   $uibModal.open({
    //     animation: true,
    //     templateUrl: 'submit-action.html',
    //     controller: 'ActionCtrl',
    //     size: size,
    //   });
    // };
    // /*=====  End of Action Submit Modal  ======*/

};
