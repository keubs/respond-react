'use strict';

/**
 * @ngInject
 **/


module.exports = function($timeout) {

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
					var textbox = element[0].querySelector('input[type=text]');
					$timeout(function(){
						textbox.focus();
						
					}, 500);
					
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
				      if(data.length == 0) {
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
				  $scope.errors.results = 'No results found';
				}
		});	

		$scope.closeSearch = function() {
		  $scope.searching = false;
		  $scope.param = '';
		};
	}

	return directive;
};