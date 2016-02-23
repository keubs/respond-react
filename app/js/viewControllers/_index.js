'use strict';

const angular = require('angular');

exports = angular.module('viewControllers', [])
            .controller('NavBarCtrl', require('./navbar-controller'));