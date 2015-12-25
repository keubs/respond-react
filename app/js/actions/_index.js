'use strict';

const angular = require('angular');

exports = angular.module('actions', [])
			.controller('ActionCtrl', require('./action-controller'))
			.service('ActionService', require('./actions-service'));