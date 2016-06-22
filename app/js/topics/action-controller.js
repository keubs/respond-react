'use strict';
/**
 * @ngInject
 **/

const helpers = require('../helpers/helpers.js');
module.exports = function($scope, $location, $stateParams, ActionService, LinkFactory, NgMap) {
    $scope.action = {};
    $scope.alerts = [];
    $scope.action.locations = [];
    $scope.render = true;

    var markers = [];
    var vm = this;
    if(!vm.map) {
      NgMap.getMap('map').then(function(map) {
        vm.map = map;
        google.maps.event.addListener(vm.map, 'click', function(event) {
            $scope.action.address = {};
            $scope.action.address.lat = event.latLng.lat();
            $scope.action.address.lng = event.latLng.lng();
            var geocoder = new google.maps.Geocoder;

            helpers.geocodeLatLng(geocoder, map, $scope.action.address.lat, $scope.action.address.lng, function(location){
              $scope.$apply(function(){
                if(location.length > 1) {
                  $scope.action.locations = location;
                } else {
                  $scope.action.address.formatted = location[0].formatted_address;
                }
              });
            })

        });
      }, function(error){
        console.log(error);
      });

    }

    $scope.submit = function() {
        $scope.action.tags = helpers.jsonified($scope.action.tags);
        $scope.action.topic = $stateParams.topic;
        debugger;
		    ActionService.new($scope.action)
			   .then(function(data){
          $scope.alerts.push({ type : 'success', msg: 'Thank you for your submission! Pending approval, you should see your action on this page soon'});
          $scope.formloading = false;
			   }, function(error) {
            $scope.alerts.push({ type : 'danger', msg: 'There was an error submitting your action. Please try again or <a href="#">Contact us</a>'});
      });
	};

	$scope.linkEntered = function() {
    $scope.formLoading = true;
	   LinkFactory.link($scope)
	    .then(function(data) {
        $scope.action = data;
        $scope.formLoading = false;
	    }, function(error) {
	      console.log(error);
        $scope.formLoading = false;
	    });
	};


  $scope.setAddress = function(address) {
    if(address) {
      $scope.action.address.formatted = address;
    }
  };

};

