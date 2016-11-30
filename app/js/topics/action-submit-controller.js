'use strict';

const helpers = require('../helpers/helpers.js');
/**
 * @ngInject
 **/
module.exports = function($scope, $location, $stateParams, ActionService, LinkFactory, NgMap, AuthService, TopicService) {
    var vm = this;
    $scope.init = function(){
      $scope.action = {};
      $scope.action.scope = 'local';
      $scope.topic = {};
      $scope.alerts = [];
      $scope.isLoggedIn = AuthService.newIsLoggedIn();
      $scope.validUrl = false;
      /*----------  start/end date/time section  ----------*/
      
      $scope.action.date_time_display = false;
      $scope.action.end_date_time_display = false;
      $scope.mytime = new Date();

      $scope.hstep = 1;
      $scope.mstep = 15;
      $scope.ismeridian = true;
      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };


      $scope.action.locations = [];
      $scope.render = true;
      $scope.pos = {};

      TopicService.topic($stateParams.topic)
      	.then(function(data){
      		$scope.topic = data;
      	}, function(error){
      		console.log(error);
      	})
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
      };

    /*----------  end start/end date/time section  ----------*/

    /*----------  start Map  ----------*/
    $scope.placePicked = false;
    if(!vm.map) {
      NgMap.getMap('map').then(function(map) {
        vm.map = map;
        vm.placeChanged = function() {
          $scope.placePicked = true;
          vm.place = this.getPlace();
          $scope.action.locations = vm.place;
          vm.map.setCenter(vm.place.geometry.location);
          vm.map.setZoom(helpers.setZoom($scope.action.scope));
          $scope.pos.lat = vm.place.geometry.location.lat();
          $scope.pos.lng = vm.place.geometry.location.lng();
          $scope.action.address.lat = vm.place.geometry.location.lat();
          $scope.action.address.lng = vm.place.geometry.location.lng();
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

    /*----------  end map  ----------*/
    
    $scope.submit = function() {
        $scope.formloading = true;
        if($scope.action.tags !== '') {
          $scope.action.tags = helpers.jsonified($scope.action.tags_list);
        }
        $scope.action.topic = $stateParams.topic;
        if($scope.action.address && !$scope.placePicked) {
          window.scrollTo(0,0);
          $scope.alerts.push({ type : 'danger', msg: 'Please select a location from the address dropdown'});          
          return;
        }
        if($scope.action.address && $scope.placePicked) getAddressComponents($scope.action.locations);

        if($scope.action.date_time_display) {
          var startDate = new Date($scope.action.start_date_time_value);
          $scope.action.start_date_time = startDate.toISOString();
        }

        if($scope.action.end_date_time_display) {
          var endDate = new Date($scope.action.end_date_time_value);
          $scope.action.end_date_time = endDate.toISOString();
        }

		    ActionService.new($scope.action)
		      .then(function(){
            $scope.alerts = [];
            $scope.alerts.push({ type : 'success', msg: 'Thank you for your submission! Pending approval, you should see your action posted publicly soon'});
            $scope.formloading = false;
            window.scrollTo(0, 0);
	        }, function(error) {
            console.log(error);
            $scope.alerts.push({ type : 'danger', msg: 'There was an error submitting your action. Please try again or Contact us'});
            window.scrollTo(0, 0);
            $scope.formloading = false;
          });
	   };

	$scope.linkEntered = function() {
    $scope.formLoading = true;
    $scope.alerts = [];
    if(!helpers.validateUrl($scope.article_link)) {
      $scope.formLoading = false;
      return;
    }
	   LinkFactory.link($scope)
	    .then(function(data) {
        $scope.action = data;
        $scope.formLoading = false;
        $scope.validUrl = true;
	    }, function(error) {
        $scope.validUrl = false;
        if(error.status === 409) {
          window.scrollTo(0,0);
          $scope.alerts.push({ type : 'danger', msg: 'Your action has already been submitted.'});
        } else if (error.status === 300) {
          // $scope.alerts.push({ type : 'warning', msg: 'WARNING: This action has already been submitted under the topic ' + error.err.title});
          $scope.article_link_error = '<p>WARNING: This action has already been submitted under the topic <a href="/topic/' + error.err.id + '" target="_blank">' + error.err.title + "</a></p>";
          $scope.formLoading = false;
          $scope.validUrl = true;
        } else {
          $scope.alerts.push({ type : 'danger', msg: 'Our apologies, but this is an invalid url for submitting an action. Please find another one and try again.'});
        }
        $scope.formLoading = false;
	    });
	};

  $scope.login = function() {
    AuthService.login($scope.user)
      .then(function() {

      }, function(error) {
        $scope.errors = {};

        $scope.errors.general = helpers.errorStringify(error.non_field_errors);
        $scope.errors.username = helpers.errorStringify(error.username);
        $scope.errors.password = helpers.errorStringify(error.password);

      });
  };

  $scope.showEnd = function() {
    $scope.action.end_date_time_display = true;
  };

  function getAddressComponents(location) {
    location.address_components.forEach(function(component){
      if(component.types.indexOf('street_number') > -1) {
       $scope.action.address.street_number = component.long_name; 
      }
      if(component.types.indexOf('locality') > -1) {
        $scope.action.address.locality = component.long_name;
      }
      if(component.types.indexOf('administrative_area_level_1') > -1){
        $scope.action.address.state = component.long_name;
        $scope.action.address.state_code = component.short_name;
      }
      if(component.types.indexOf('country') > -1) {
        $scope.action.address.country = component.long_name;
        $scope.action.address.country_code = component.short_name;
      }
      if(component.types.indexOf('postal_code') > -1) {
       $scope.action.address.postal_code = component.long_name; 
      }
    });
  }

};

