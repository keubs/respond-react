'use strict';

const helpers = require('../helpers/helpers.js');
/**
 * @ngInject
 **/
module.exports = function($scope, $rootScope, UserService, $stateParams, NgMap, AddressService, $uibModalInstance, items){
	console.log($uibModalInstance);
	$scope.currentUser = {};
	$scope.currentUser.address = {};
	$scope.render = true;
	$scope.pos = {};
	$scope.alerts = [];

	var vm = this;
	if(!vm.map) {
	  NgMap.getMap('map').then(function(map) {
	    vm.map = map;
	    vm.placeChanged = function() {
	      vm.place = this.getPlace();
	      $scope.location = vm.place;
	      vm.map.setCenter(vm.place.geometry.location);
	      vm.map.setZoom(11);
	      $scope.pos.lat = vm.place.geometry.location.lat();
	      $scope.pos.lng = vm.place.geometry.location.lng();
	      $scope.currentUser.address.lat = vm.place.geometry.location.lat();
	      $scope.currentUser.address.lng = vm.place.geometry.location.lng();
	      if(!helpers.hasPostalCode(vm.place)) {
	        var geocoder = new google.maps.Geocoder();
	        var ll = {location: { lat: $scope.pos.lat, lng: $scope.pos.lng }};
	        geocoder.geocode(ll, function(results, status){ 
	          if(status === 'OK') {
	            getAddressComponents(results[0]);
	          }
	        });
	      }
	    };
	  }, function(error){
	    console.log(error);
	  });

	}

	$scope.submit = function() {
		if($scope.location) {
			getAddressComponents($scope.location);
		}
		$scope.currentUser.new_user = false;
		console.log($scope.currentUser);
		UserService.update($scope.currentUser)
			.then(function(data){
				$scope.alerts = [];
				$scope.alerts.push({ type : 'success', msg: 'Profile updated'});

				$scope.currentUser = data;
			}, function(error){
				console.log(error);
			});
	};

	$scope.init = function(){
		UserService.get($stateParams.userid)
		.then(function(data){
			$scope.user = data;
			$scope.currentUser = $rootScope.user;
			
			AddressService.get($scope.currentUser.address)
			.then(function(data){
				$scope.currentUser.address = {};
				$scope.currentUser.address.formatted = data.raw;

			}, function(error){
				console.log(error);
			});

			if ($scope.user.new_user && helpers.getParameterByName('new_user') == 'true') {
				$scope.alerts.push({msg: 'It looks like this is your first time logging in. \
				  Add a location (i.e. your city or neighborhood) so you can see headlines near you. \
				  If you have a news article you\'d like to share, submit a topic.'});
			}
		}, function(error){
			console.log(error);
		});	
	};

	$scope.cancel = function(){
		$uibModalInstance.close();
	};

	function getAddressComponents(location) {
	  	location.address_components.forEach(function(component){
	    if(component.types.indexOf('street_number') > -1) {
	     $scope.currentUser.address.street_number = component.long_name; 
	    }
	    if(component.types.indexOf('locality') > -1) {
	      $scope.currentUser.address.locality = component.long_name;
	    }
	    if(component.types.indexOf('administrative_area_level_1') > -1){
	      $scope.currentUser.address.state = component.long_name;
	      $scope.currentUser.address.state_code = component.short_name;
	    }
	    if(component.types.indexOf('country') > -1) {
	      $scope.currentUser.address.country = component.long_name;
	      $scope.currentUser.address.country_code = component.short_name;
	    }
	    if(component.types.indexOf('postal_code') > -1) {
	     $scope.currentUser.address.postal_code = component.long_name; 
	    }
	  });
	};
};

