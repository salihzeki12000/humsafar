var navigationservice = angular.module('ongojourney', [])

.factory('OnGoJourney', function ($http) {

    return {
        getAllJourney: function (callback, errorCallback) {
            $http({
                url: adminURL + "/journey/getAll",
                method: "POST"
            }).success(function (data) {

                callback(data.data);
            });
        }
    };
});