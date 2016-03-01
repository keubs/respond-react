'use strict';

/**
 * @ngInject
 **/
 function LinkFactory($q, $http, AppSettings, Facebook) {
    return {
        link: function($scope) {
            var deferred = $q.defer();
            if(!$scope.article_link) {
                deferred.reject();
            }
            else if($scope.article_link.search(/facebook.com\/events/i) > -1) {
                var eventId = $scope.article_link.replace(/https:\/\/www.facebook.com\/events/, '');

                Facebook.getLoginStatus(function(response){
                  Facebook.api(eventId.replace(/\//g,'') + "?fields=cover,name,description", function(response) {
                    if(!response.error) {
                      var returnData = {};
                      returnData.article_link = $scope.article_link;
                      returnData.image_preview = {};
                      returnData.title = response.name;
                      returnData.description = response.description;
                      returnData.image_url = response.cover.source;
                      returnData.image_preview.visible = true;
                      returnData.image_preview.src = response.cover.source;
                      returnData.tags = [
                        {'text' : 'Facebook Event'}
                      ];
                      deferred.resolve(returnData);
                    } else {
                        console.log(response);
                        deferred.reject(response.error);
                    }
                  });
                });
            } else if ($scope.article_link.search(/nytimes.com/i) > -1) {
                // Strip querystrings so nytimes API doesn't bork
                var url = $scope.article_link.split('?')[0];
                $http.post(AppSettings.apiUrl + '/nytimes/', {url: url})
                 .success(function(data) {
                    if(data.docs.length > 0) {
                        data = data.docs[0];
                        var returnData = {};
                        returnData.article_link = $scope.article_link;
                        returnData.image_preview = {};
                        returnData.image_preview.visible = true;
                        returnData.image_url = "http://nytimes.com/"+data.multimedia[1].url;
                        returnData.image_preview.src = "http://nytimes.com/"+data.multimedia[1].url;
                        returnData.title = data.headline.main;
                        returnData.description = data.snippet;
                        returnData.tags = [
                          {'text' : 'New York Times'}
                        ];
                        deferred.resolve(returnData);
                    } else {
                        deferred.reject({"error" : 'no results found'});
                    }
                  })
                 .error(function(err, status) {
                    deferred.reject({err, status});
                 });
                 return deferred.promise;
            } else {
                $http.post(AppSettings.apiUrl + '/getopengraph/', {url: $scope.article_link})
                  .success(function(data) {
                    var returnData = {};
                    if($scope.article_link.search(/change.org/i) > -1) {
                        returnData.tags = [
                          {'text' : 'Petition'},
                          {'text' : 'Change.org'}
                        ];
                    }
                    returnData.article_link = $scope.article_link;
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

            }
            return deferred.promise;
        },
    };
 }

 module.exports = LinkFactory;