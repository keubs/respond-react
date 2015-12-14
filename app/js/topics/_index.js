'use strict';

const angular = require('angular');

exports = angular.module('topics', [])
            .controller('TopicsCtrl', require('./topics-controller'))
            .controller('TopicSubmitCtrl', require('./topic-submit-controller'))
            .controller('TopicCtrl', require('./topic-controller')) // Singular
            .service('TopicService', require('./topics-service'));
