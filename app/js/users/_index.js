'use strict';

const angular = require('angular');

exports = angular.module('user', [])
		.controller('UserCtrl', require('./user-controller'))
		.service('UserService', require('./user-service'));