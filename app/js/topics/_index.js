'use strict';

const angular = require('angular');

exports = angular.module('topics', [])
            .controller('TopicsCtrl', require('./topics-controller'))
            .service('TopicService', require('./topics-service'));
