'use strict';

const angular = require('angular');

exports = angular.module('user', [])
		.controller('UserCtrl', require('./user-controller'))
		.controller('EditUserCtrl', require('./edit-user-controller'))
		.service('UserService', require('./user-service'));