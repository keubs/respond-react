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
    TopicService.new($scope.topic)
      .then(function(data) {
        $location.path('/topic/' + data.id);
      }, function(error) {
        $scope.errors = {};
        $scope.errors.general = helpers.errorStringify(error.non_field_errors);
        $scope.errors.title = helpers.errorStringify(error.title);
        $scope.errors.article_link = helpers.errorStringify(error.article_link);
        $scope.errors.auth = error.status === 401 ? 'You must be logged in to do that' : '';
      });
  };

  $scope.linkEntered = function() {
    $scope.formLoading = true;
    LinkFactory.link($scope)
    .then(function(data) {
      $scope.topic.title = data.title;
      $scope.topic.description = data.description;
      $scope.topic.image_preview = data.image_preview;
      $scope.topic.tags = data.tags;
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
    $scope.topic.locations = $scope.topic.locations.splice(index, index);
    if(address) {
      $scope.topic.address.formatted = address.formatted_address;
    }
  };
};
