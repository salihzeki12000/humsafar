var bl = [];
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
                        // console.log(bucketList);
                        // console.log(countryVisited);
                        // var mapBucketList = {};
                        _.each(bucketList, function (n) {
                            var index = _.findIndex(countries, function (country) {
                                return country._id == n._id;
                            });
                            countries[index].bucketList = true;
                            // _.forEach(window._mapPathData.paths, function (value, key) {
                            //     if (value.name == n.name) {
                            //         mapBucketList.key.metric
                            //     }
                            // });
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
        },
        getCountryVisitedListWeb: function (years, callback, errCallback) {
            console.log(years);
            // $http.post(adminURL + "/user/getCountryVisitedListWeb", id).success(callback).error(errCallback);
        }
    };
});