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
        address.raw = address.formatted;
        address.latitude = address.lat;
        address.longitude = address.lng;
        $http.post(url, address)
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