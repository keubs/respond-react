'use strict';

const angular = require('angular');

exports = angular.module('auth', [])
            .controller('AuthCtrl', require('./auth-controller'))
            .service('AuthService', require('./auth-service'));
