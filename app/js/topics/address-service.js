'use strict';

/**
 * @ngInject
 */
function addressService($q, $http, AppSettings) {
    var service = {};

    service.submit = function(address) {
        var deferred = $q.defer();
        var url = '';

        url = AppSettings.apiUrl + '/address/submit/';
        $http.post(url, {
            'raw': address.formatted, 
            'latitude': address.lat, 
            'longitude': address.lng
        })
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function (err, status) {
            console.log(err, status);
            deferred.reject({err, status});
        });

        return deferred.promise;
   };

   return service;
};

module.exports = addressService;