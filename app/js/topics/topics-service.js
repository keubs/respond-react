'use strict';

/**
 * @ngInject
 */
function TopicService($q, $http) {

  var service = {};

  service.get = function() {
    var deferred = $q.defer();

    $http.get('http://127.0.0.1:8000/api/topics/')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        deferred.reject(err, status);
      });

    return deferred.promise;
  };

  service.new = function(topic) {
    var deferred = $q.defer();

    $http.post('http://127.0.0.1:8000/api/topics/submit', topic)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        deferred.reject(err, status);
      });

    return deferred.promise;
  };

  service.find = function(topicId) {

  };

  service.delete = function(topicId) {

  };

  service.addComment = function(topicId, comment) {

  };

  service.deleteComment = function(topicId, comment) {

  };

  service.upVote = function(topicId) {
    console.log('upVote', topicId);

    var deferred = $q.defer();

    $http.post('http://localhost:8000/api/topics/' + topicId + '/rate/1')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        deferred.reject(err, status);
      });

    return deferred.promise;
  };

  service.downVote = function(topicId) {
    console.log('downVote', topicId);

    var deferred = $q.defer();

    $http.post('http://localhost:8000/api/topics/' + topicId + 'rate/-1')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        deferred.reject(err, status);
      });

    return deferred.promise;
  };

  service.clearVote = function(topicId) {
    console.log('clearVote', topicId);

    var deferred = $q.defer();

    $http.post('http://localhost:8000/api/topics/' + topicId + '/rate/0')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        deferred.reject(err, status);
      });

    return deferred.promise;
  };

  return service;
}

module.exports = TopicService;
