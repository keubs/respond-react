'use strict';

/**
 * @ngInject
 **/

module.exports = function(){

	var directive = {
		restrict: 'E',
		scope: {
			object: '=',
			type: '='
		},
		templateUrl: 'directives/upvote.html',
		controller: upvoteController,
	};

	function upvoteController ($scope, $rootScope, VoteService) {
		'ngInject';
		
		$scope.upVote = function() {
		  let object = $scope.object;
		  let type = $scope.type;
		  console.log(object);
		  if (object.isUpVoted) {
		    VoteService.clearVote(object.id, object.isUpVoted)
		      .then(function() {
		        object.isUpVoted = false;
		        object.isDownVoted = false;
		        object.score--;
		      },
		      function(error) {
		        $scope.voteFailed(error);
		      });
		  } else {
		    VoteService.upVote(type, object.id)
		      .then(function() {
		        object.isUpVoted = true;
		        object.isDownVoted = false;
		        object.score++;
		      },
		      function(error) {
		        $scope.voteFailed(error);
		      });
		  }
		};

		$scope.voteFailed = function(error) {
		  let object = $scope.object;
		  switch (error.status) {
		    case 401:
		      $rootScope.$emit('callModal', {});
		      object.error = 'You must be logged in to do that.';
		      break;
		    default:
		      object.error = 'Something bad happened. 😭😭😭';
		  }
		};

		$scope.isUpVoted = function() {
		  let object = $scope.object

		  return $scope.isLoggedIn && object.isUpVoted;
		};
	}

	return directive;
};