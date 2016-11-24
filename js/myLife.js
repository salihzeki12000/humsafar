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
            _.each(bucketList, function (n) {
              var index = _.findIndex(countries, function (country) {
                return country._id == n._id;
              });
              countries[index].bucketList = true;
            });
            _.each(countryVisited, function (n) {
              var index = _.findIndex(countries, function (country) {
                return country._id == n.countryId._id;
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
    getCountryVisitedListWeb: function (callback) {
      $http({
        url: adminURL + "/user/getCountryVisitedListWeb",
        method: "POST"
      }).success(function (data) {
        callback(data.data.countriesVisited);
      });
    },
    getOneBucketList: function (callback) {
      $http({
        url: adminURL + "/user/getBucketListWeb",///////////////////use getOneBucketList
        method: "POST"
      }).success(function (data) {
        console.log(data.data.bucketList);
        callback(data.data.bucketList);
      });
    },
    updateBucketListWeb:function(countryId,callback){
      var obj={
        "bucketList":countryId,
        "delete":true
      };
      $http({
        url:adminURL + "/user/updateBucketListWeb",
        method:"POST",
        data:obj
      }).success(function(){
        callback(countryId);
      });
    },
    getFollowingWeb: function (callback) {
      $http({
        url: adminURL + "/user/getFollowingWeb",
        method: "POST"
      }).success(callback);
    },
    getFollowersWeb: function (callback) {
      $http({
        url: adminURL + "/user/getFollowersWeb",
        method: "POST"
      }).success(callback);
    }
  };
});
