'use strict';

/**
 * @ngInject
 **/


module.exports = function($timeout, $location, $rootScope) {

	var directive = {
		restrict : 'E',
		scope : {
			param: '=',
			searching: '='
		},
		templateUrl : 'directives/search.html',
		link: function(scope, element) {
			scope.$watch('searching', function(value){
				if(value) {
					$rootScope.bodyClass = 'searching';
					var textbox = element[0].querySelector('input[type=text]');
					$timeout(function(){
						textbox.focus();
						
					}, 500);
					
				} else {
					$rootScope.bodyClass = false;
				}
			});

			element.bind('keydown keypress', function(event){
				if(event.which === 27) {
					scope.searching = false;
					scope.param = '';
				}
			});
		},
		controller : searchController,
	};

	function searchController($scope, SearchService) {
		'ngInject';
		$scope.results = [];
		$scope.errors = {};

		$scope.$watch('param', function(i){
			if(i && i.length > 2) {
		  		SearchService.search(i)
				    .then(function(data){
			    	  if(i.length === 0) {
			    	  	$scope.errors.results = '';
			    	  }
				      else if(data.length == 0) {
				        $scope.errors.results = 'No results found';
				      } else {
				        $scope.errors.results = data.length + ' results found';
				      }
				      $scope.results = data;
				    }, function(error){
				      // console.log(error);
				      // $scope.errors.results = 'There was an error performing your search';
				    });
				} else if(!i || i.length == 0) {
				  $scope.results = [];
				  $scope.errors.results = '';
				}
		});	

		$scope.closeSearch = function() {
		  $scope.searching = false;
		  $scope.param = '';
		};

		$scope.goToTopic = function(id) {
		  $location.path('topic/' + id);
		  $scope.searching = false;
		};
	}

	return directive;
};