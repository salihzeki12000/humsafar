var navigationservice = angular.module('mylife', [])

.factory('MyLife', function ($http) {


    return {
        getAllCountries: function (callback, errCallback) {
            $http({
                url: adminURL + "/country/getAll",
                method: "POST"
            }).success(function (data) {
                $http.post(adminURL + "/user/getBucketListWeb").success(function (data2) {
                    $http.post(adminURL + "/user/getCountryVisitedListWeb").success(function (data3) {
                        var countries = data.data;
                        var bucketList = data2.data.bucketList;
                        var countryVisited = data3.data.countriesVisited;
                        _.each(bucketList, function (n) {
                            var index = _.findIndex(countries, function (country) {
                                return country._id == n._id;
                            });
                            countries[index].bucketList = true;
                        });
                        _.each(countryVisited, function (n) {
                            var index = _.findIndex(countries, function (country) {
                                return country._id == n.countryId;
                            });
                            countries[index].countryVisited = true;
                        });
                        callback(countries);
                    }).error(errCallback);
                }).error(errCallback);
            }).error(errCallback);
        },
        updateBucketList: function (country, callback, errCallback) {
            console.log(country);
            var obj = {
                bucketList: country._id
            };
            if (country.bucketList === false) {
                obj.delete = true;
            }
            $http.post(adminURL + "/user/updateBucketListWeb", obj).success(callback).error(errCallback);
        },
        updateCountriesVisited: function (obj, callback, errCallback) {
            console.log(obj);
            $http.post(adminURL + "/user/updateCountriesVisitedWeb", obj).success(callback).error(errCallback);
            if (country.bucketList === false) {
                $http.post(adminURL + "/user/removeCountriesVisitedWeb", obj).success(callback).error(errCallback);
            }
        },
    };
});