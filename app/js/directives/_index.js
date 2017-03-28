'use strict';

const angular = require('angular');

exports = angular.module('directives', [])
            .directive('compile', require('./compile'))
            .directive('searchOverlay', require('./searchOverlay'))
            .directive('upVote', require('./upvote'));