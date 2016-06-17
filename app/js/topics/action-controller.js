'use strict';
/**
 * @ngInject
 **/
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
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var geocoder = new google.maps.Geocoder;

            geocodeLatLng(geocoder, map, lat, lng, function(location){
              $scope.$apply(function(){
                if(location.length > 1) {
                  $scope.action.locations = location;
                } else {
                  $scope.action.address = location[0].formatted_address;
                }
              });
            })

        });
      }, function(error){
        console.log(error);
      });

    }

    $scope.submit = function() {
        $scope.action.tags = $scope.jsonfied($scope.action.tags);
        $scope.action.topic = $stateParams.topic;

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

  // @todo not the cleanest method but it needs a string representation of a json array  ¯\_(ツ)_/¯
  $scope.jsonfied = function(array) {
    var str = '[';
    for (var i = 0; i < array.length; i++) {
      str += '"' + array[i].text + '",';
    }
    str = str.slice(0, -1);
    str += ']';
    return str;
  };

  $scope.setAddress = function(address) {
    if(address) {
      $scope.action.address = address;
    }
  };

  function geocodeLatLng(geocoder, map, lat, lng, fn) {
    var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    var retValue;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          fn(results);

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

  }
};

