'use strict';

var angular = require('angular');
var bulk = require('bulk-require');

module.exports = angular.module('app.services', [
    ]);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);

/**
 * @ngInject
 */
module.exports.service('TopicService', ['$resource', '$q',
    function($resource, $q) {
        var TopicService = {};
        var Topics = $resource('http://127.0.0.1:8000/api/topics/', {}, {});

        TopicService.get = function get() {
            var d = $q.defer();

            Topics.get({}, function(node){
                d.resolve(node);
            });

            return d.promise;
        }

        return TopicService;
    }
])