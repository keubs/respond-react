'use strict';

module.exports = function($scope, $location, actionService, AuthService, AppSettings) {
  $scope.title = 'HELLO!';
  $scope.errors = {};

  $scope.actions = [];

  $scope.backendUrl = AppSettings.backendUrl;
  actionService.get().then(function(data) {
    $scope.actions = data;
  });

  $scope.deleteaction = function($actionIndex) {
    let action = $scope.actions[$actionIndex];

    actionService.delete(action.id);
  };

  $scope.upVoteaction = function($actionIndex) {
    let action = $scope.actions[$actionIndex];

    if (action.isUpVoted) {
      actionService.clearVote(action.id, action.isUpVoted)
        .then(function() {
          action.isUpVoted = false;
          action.isDownVoted = false;
          action.score--;
        },
        function(error) {
          $scope.voteFailed($actionIndex, error);
        });
    } else {
      actionService.upVote(action.id)
        .then(function() {
          action.isUpVoted = true;
          action.isDownVoted = false;
          action.score++;
        },
        function(error) {
          $scope.voteFailed($actionIndex, error);
        });
    }
  };

  $scope.downVoteaction = function($actionIndex) {
    let action = $scope.actions[$actionIndex];

    if (action.isDownVoted) {
      actionService.clearVote(action.id, !action.isDownVoted)
        .then(function() {
          action.isDownVoted = false;
          action.isUpVoted = false;
          action.score++;
        },
        function(error) {
          $scope.voteFailed($actionIndex, error);
        });
    } else {
      actionService.downVote(action.id)
        .then(function() {
          action.isDownVoted = true;
          action.isUpVoted = false;
          action.score--;
        },
        function(error) {
          $scope.voteFailed($actionIndex, error);
        });
    }
  };

  $scope.isUpVoted = function($actionIndex) {
    let action = $scope.actions[$actionIndex];

    return AuthService.isLoggedIn() && action.isUpVoted;
    // return AuthService.isLoggedIn() && actionService.isUpVoted(action.id);
  };

  $scope.isDownVoted = function($actionIndex) {
    let action = $scope.actions[$actionIndex];

    return AuthService.isLoggedIn() && action.isDownVoted;
    // return AuthService.isLoggedIn() && actionService.isDownVoted(action.id);
  };

  $scope.voteFailed = function($actionIndex, error) {
    let action = $scope.actions[$actionIndex];

    switch (error.status) {
      case 401:
        action.error = 'You must be logged in to do that.';
        break;
      default:
        action.error = 'Something bad happened. 😭😭😭';
    }
  };
};
