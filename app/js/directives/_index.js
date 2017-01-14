'use strict';

const angular = require('angular');

exports = angular.module('directives', [])
            .directive('compile', require('./compile'));