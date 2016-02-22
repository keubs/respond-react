'use strict';

/**
 * @ngInject
 **/
 function LinkFactory($q, $http, AppSettings, Facebook) {
    return {
        link: function($scope) {
            var deferred = $q.defer();
            $http.post(AppSettings.apiUrl + '/getopengraph/', {url: $scope.article_link})
              .success(function(data) {
                var returnData = {};
                returnData.image_preview = {};
                returnData.image_preview.visible = true;
                returnData.image_url = data.image;
                returnData.image_preview.src = data.image;
                returnData.title = data.title;
                returnData.description = data.description;
                deferred.resolve(returnData);
              })
              .error(function(err, status) {
                deferred.reject({err, status});
              });

            return deferred.promise;
        },

        facebookEvent: function($scope) {
            var eventId = $scope.article_link.replace(/https:\/\/www.facebook.com\/events/, '');
            var deferred = $q.defer();

            Facebook.getLoginStatus(function(response){
              Facebook.api(eventId.replace(/\//g,'') + "?fields=cover,name,description", function(response) {
                if(!response.error) {
                  var returnData = {};
                  returnData.link = $scope.article_link;
                  returnData.image_preview = {};
                  returnData.title = response.name;
                  returnData.description = response.description;
                  returnData.image_url = response.cover.source;
                  returnData.image_preview.visible = true;
                  returnData.image_preview.src = response.cover.source;
                  console.log(returnData);
                  deferred.resolve(returnData);
                } else {
                    console.log(response);
                    deferred.reject(response.error);
                }

              });
            });

            return deferred.promise;
        },

        nyTimesLink: function($scope) {
            var deferred = $q.defer();
            $http.post(AppSettings.apiUrl + '/nytimes/', {url: $scope.article_link})
             .success(function(data) {
                if(data.docs.length > 0) {
                    data = data.docs[0];
                    var returnData = {};
                    returnData.image_preview = {};
                    returnData.image_preview.visible = true;
                    returnData.image_url = "http://nytimes.com/"+data.multimedia[1].url;
                    returnData.image_preview.src = "http://nytimes.com/"+data.multimedia[1].url;
                    returnData.title = data.headline.main;
                    returnData.description = data.snippet;
                    deferred.resolve(returnData);
                } else {
                    deferred.reject({"error" : 'no results found'});
                }
              })
             .error(function(err, status) {
                deferred.reject({err, status});
             });
             return deferred.promise;
        },
    };
 }

 module.exports = LinkFactory;