'use strict';

/**
 * @ngInject
 */
function TopicService($q, $http, AppSettings) {
  var service = {};

  service.get = function() {
    var deferred = $q.defer();

    $http.get(AppSettings.apiUrl + '/topics/')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.new = function(topic) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/topics/' + 'submit', topic)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.find = function(topicId) {
    console.log(topicId);
  };

  service.delete = function(topicId) {
    console.log(topicId);
  };

  service.addComment = function(topicId, comment) {
    console.log(topicId, comment);
  };

  service.deleteComment = function(topicId, comment) {
    console.log(topicId, comment);
  };

  service.image = function(url) {
    var deferred = $q.defer();
    console.log(url);
    $http.post(AppSettings.apiUrl + '/getimage/', {url:url})
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

      return deferred.promise;
  };

  service.upVote = function(topicId) {
    console.log('upVote', topicId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/topics/' + topicId + '/rate/1')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.downVote = function(topicId) {
    console.log('downVote', topicId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/topics/' + topicId + '/rate/-1')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.clearVote = function(topicId) {
    console.log('clearVote', topicId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/topics/' + topicId + '/rate/0')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  return service;
}

module.exports = TopicService;
