'use strict';

/**
 * @ngInject
 */
function TopicService($q, $http) {

  var service = {};

  service.get = function() {
    var deferred = $q.defer();

    $http.get('http://127.0.0.1:8000/api/topics/').success(function(data) {
      deferred.resolve(data);
    }).error(function(err, status) {
      deferred.reject(err, status);
    });

    return deferred.promise;
  };

  return service;
}

module.exports = TopicService;
