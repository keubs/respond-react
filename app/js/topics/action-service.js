'use strict';

/**
 * @ngInject
 */
function actionService($q, $http, AppSettings) {
  var service = {};

  service.get = function() {
    var deferred = $q.defer();

    $http.get(AppSettings.apiUrl + '/actions/')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.action = function(id) {
    var deferred = $q.defer();

    $http.get(AppSettings.apiUrl + '/actions/' + id)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.actionsByTopic = function(id) {
    var deferred = $q.defer();

    $http.get(AppSettings.apiUrl + '/topics/' + id + '/actions/')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });
  };

  service.new = function(action) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/actions/' + 'submit', action)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.find = function(actionId) {
    console.log(actionId);
  };

  service.delete = function(actionId) {
    console.log(actionId);
  };

  service.addComment = function(actionId, comment) {
    console.log(actionId, comment);
  };

  service.deleteComment = function(actionId, comment) {
    console.log(actionId, comment);
  };

  service.og = function(url) {
    var deferred = $q.defer();
    $http.post(AppSettings.apiUrl + '/getopengraph/', {url: url})
      .success(function(data) {
        console.log(data);
        deferred.resolve(data);
      })
      .error(function(err, status) {
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.upVote = function(actionId) {
    console.log('upVote', actionId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/actions/' + actionId + '/rate/1')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.downVote = function(actionId) {
    console.log('downVote', actionId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/actions/' + actionId + '/rate/-1')
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(err, status) {
        console.log(err, status);
        deferred.reject({err, status});
      });

    return deferred.promise;
  };

  service.clearVote = function(actionId) {
    console.log('clearVote', actionId);

    var deferred = $q.defer();

    $http.post(AppSettings.apiUrl + '/actions/' + actionId + '/rate/0')
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

module.exports = actionService;