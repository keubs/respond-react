'use strict';
/**
 * @ngInject
 **/

const helpers = require('../helpers/helpers.js');

module.exports = function($scope, $location, TopicService, $window, LinkFactory, NgMap) {
  console.log(this.map);
  $scope.title = 'HELLO!';
  $scope.errors = {};
  $scope.topic = {};

  $scope.topic.locations = [];
  $scope.topic.created_by = $window.sessionStorage.id;
  var markers = [];
  var vm = this;


  $scope.submit = function() {
    $scope.topic.tags = helpers.jsonified($scope.topic.tags);
    $scope.topic.image_preview = undefined;
    getAddressComponents($scope.topic.locations);
    TopicService.new($scope.topic)
      .then(function(data) {
        $location.path('/topic/' + data.id);
      }, function(error, status) {
        $scope.errors = {};
        $scope.errors.general = helpers.errorStringify(error.non_field_errors);
        $scope.errors.title = helpers.errorStringify(error.title);
        $scope.errors.article_link = helpers.errorStringify(error.article_link);
        $scope.errors.auth = error.status === 401 ? 'You must be logged in to do that' : '';
        console.log(error, status)
      });
  };

  $scope.linkEntered = function() {
    $scope.formLoading = true;
    if(!helpers.validateUrl($scope.article_link)) {
      $scope.formLoading = false;
      return;
    }
    LinkFactory.link($scope)
    .then(function(data) {
      $scope.topic = data;
      $scope.formLoading = false;
    }, function(error) {
      console.log(error);
      $scope.formLoading = false;
    });
  };

  if(!vm.map) {
    NgMap.getMap('map').then(function(map) {
      vm.map = map;
      google.maps.event.addListener(vm.map, 'click', function(event) {
          $scope.topic.address = {};
          $scope.topic.address.lat = event.latLng.lat();
          $scope.topic.address.lng = event.latLng.lng();
          var geocoder = new google.maps.Geocoder;

          helpers.geocodeLatLng(geocoder, map, $scope.topic.address.lat, $scope.topic.address.lng, function(location){
            $scope.$apply(function(){
              if(location.length > 1) {
                $scope.topic.locations = location;
              } else {
                $scope.topic.address.formatted = location[0].formatted_address;
              }
            });
          })

      });
    }, function(error){
      console.log(error);
    });

  };

  $scope.setAddress = function(address, index) {
    $scope.topic.locations = $scope.topic.locations[index];
    if(address) {
      $scope.topic.address.formatted = address.formatted_address;
    }
  };

  function getAddressComponents(location) {
    location.address_components.forEach(function(component){
      if(component.types.indexOf('street_number') > -1) {
       $scope.topic.address.street_number = component.long_name; 
      }
      if(component.types.indexOf('locality') > -1) {
        $scope.topic.address.locality = component.long_name;
      }
      if(component.types.indexOf('administrative_area_level_1') > -1){
        $scope.topic.address.state = component.long_name;
        $scope.topic.address.state_code = component.short_name;
      }
      if(component.types.indexOf('country') > -1) {
        $scope.topic.address.country = component.long_name;
        $scope.topic.address.country_code = component.short_name;
      }
      if(component.types.indexOf('postal_code') > -1) {
       $scope.topic.address.postal_code = component.long_name; 
      }
    });
  }
};
