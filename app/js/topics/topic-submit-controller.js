'use strict';

const helpers = require('../helpers/helpers.js');

/**
 * @ngInject
 **/
module.exports = function($scope, $location, TopicService, $window, LinkFactory, NgMap, $rootScope, $analytics, $uibModal) {
  $rootScope.pageTitle = "Submit a Topic";
  $scope.title = 'HELLO!';
  $scope.errors = {};
  $scope.topic = {};
  $scope.alerts = [];
  $scope.validUrl = false;
  $scope.editing = false;
  $scope.type = 'topic';
  $scope.topic.scope = 'national';
  $analytics.pageTrack('submit');
  $analytics.eventTrack('submit', {  category: 'topic', label: 'begin' });
  $scope.topic.locations = [];
  $scope.scopes = [
    {"text":"Local (Affects only this state)","value":"local"},
    {"text":"National (Affects only this country)","value":"national"},
    {"text":"Worldwide (Affects the world)","value":"worldwide"},
  ];
  $scope.topic.created_by = $rootScope.user.id;
  $scope.pos = {};
  var vm = this;
  if(!vm.map) {
    NgMap.getMap('map').then(function(map) {
      vm.map = map;
      vm.placeChanged = function() {
        vm.place = this.getPlace();
        $scope.topic.locations = vm.place;
        vm.map.setCenter(vm.place.geometry.location);
        vm.map.setZoom(helpers.setZoom($scope.topic.scope));
        $scope.pos.lat = vm.place.geometry.location.lat();
        $scope.pos.lng = vm.place.geometry.location.lng();
        $scope.topic.address.lat = vm.place.geometry.location.lat();
        $scope.topic.address.lng = vm.place.geometry.location.lng();
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

  };

  $scope.submit = function() {
    $scope.formLoading = true;
    if(!$scope.topic.tags) {
      $scope.errors.tags = "Please enter at least one relevant tag";
      $scope.formLoading = false;
      return;
    } else {
       $scope.topic.tags = helpers.jsonified($scope.topic.tags);
    }

    if(!$scope.topic.scope) {
      $scope.errors.scope = "Please set this topic's scope";
      $scope.formLoading = false;
      return;
    }
    
    if($scope.topic.address) getAddressComponents($scope.topic.locations);
    $scope.submitted = true;
    $scope.topic.image_preview = undefined;
    TopicService.new($scope.topic)
      .then(function(data) {
        $analytics.eventTrack('submit', {  category: 'topic', label: 'complete' });
        $location.path('/topic/' + data.id);
      }, function(error, status) {
        $scope.errors = {};
        $scope.submitted = false;
        $scope.formLoading = false;
        $scope.errors.general = helpers.errorStringify(error.non_field_errors);
        $scope.errors.title = helpers.errorStringify(error.title);
        $scope.errors.article_link = helpers.errorStringify(error.article_link);
        $scope.errors.auth = error.status === 401 ? 'You must be logged in to do that' : '';
        console.log(error, status);
      });
  };

  $scope.linkEntered = function() {
    $scope.formLoading = true;
    if(!helpers.validateUrl($scope.article_link)) {
      $scope.formLoading = false;
      $analytics.eventTrack('submit', {  category: 'topic', label: 'link_error' });
      $scope.errors.article_link = 'Please enter a valid URL';
      return;
    }
    $scope.errors.article_link = '';
    LinkFactory.link($scope)
    .then(function(data) {
      $analytics.eventTrack('submit', {  category: 'topic', label: 'link_entered' });
      $scope.article_link  = data.article_link;
      $scope.topic = data;
      $scope.alerts = [];
      $scope.validUrl = true;
      $scope.formLoading = false;
    }, function(error) {
      $scope.alerts = [];
      if(error.status === 409) {
        window.scrollTo(0,0);
        $scope.alerts.push({ type : 'danger', msg: 'Your topic has already been submitted.'});
        $scope.errors.article_link = 'Your topic has already been submitted.';
      } else {
        $scope.alerts.push({ type : 'danger', msg: 'Our apologies, but this is an invalid url for submitting a topic. Please find another one and try again.'});
        $scope.errors.article_link = 'Our apologies, but this is an invalid url for submitting a topic. Please find another one and try again.';
      }

      $scope.validUrl = false;
      $scope.formLoading = false;
    });
  };

  $scope.editToggle = function(){
    $scope.editing = !$scope.editing;
  };

  $scope.setScope = function(scope){
    $scope.topic.scope = scope;
  };

  $scope.useMap = function(){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'map-modal.html',
      controller: 'MapCtrl',
      size: 'sm',
    });

    modalInstance.result.then(function(address){
      console.log(address);
    }, function (err){
      console.log(err);
    });
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
  };
};
