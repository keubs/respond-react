'use strict';

const angular = require('angular');

exports = angular.module('viewControllers', [])
            .controller('FooterCtrl', require('./footer-controller'));