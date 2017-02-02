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
      getCountryVisitedListExpanded: function (callback) {
        $http({
          url: adminURL + "/user/getCountryVisitedListExpanded",
          method: "POST"
        }).success(function (data) {
          callback(data.data);
        });
      },
      getOneBucketList: function (callback) {
        $http({
          url: adminURL + "/user/getBucketListWeb", ///////////////////use getOneBucketList
          method: "POST"
        }).success(function (data) {
          callback(data.data.bucketList);
        });
      },
      updateBucketListWeb: function (countryId, callback) {
        var obj = {
          "bucketList": countryId,
          "delete": true
        };
        $http({
          url: adminURL + "/user/updateBucketListWeb",
          method: "POST",
          data: obj
        }).success(function () {
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
      },
      followUser: function (userId, name, callback) {
        var obj = {
          "_id": userId,
          "toName": name
        }
        $http({
          url: adminURL + "/user/followUserWeb",
          method: "POST",
          data: obj
        }).success(function (data) {
          callback(data);
        });
      },
      unFollowUser: function (userId, callback) {
        var obj = {
          "_id": userId,
        }
        $http({
          url: adminURL + "/user/unFollowUserWeb",
          method: "POST",
          data: obj
        }).success(function (data) {
          callback(data);
        });
      },
      searchAllUser: function (searchUser, callback) {
        var obj = {
          search: searchUser
        };
        $http({
          url: adminURL + "/user/getFollowingWeb",
          method: "POST",
          data: obj
        }).success(function (data) {
          callback(data);
        });
      },
      $scope.travelMain = [];
      getAllJourney: function (callback, pageNo, errorCallback) {
        $http({
          url: adminURL + "/journey/myLifeJourneyWeb",
          method: "POST",
          data: {
            "type": "travel-life",
            "pagenumber": pageNo
          }
        }).success(function (data) {
          var hasJourney = "";
          if (_.isEmpty(data.data)) {
            hasJourney = false;
          } else {
            hasJourney = true;
          }
          var journeys = data.data;

          var i = 0;
          _.each(journeys, function (n) {
            $scope.travelMain.push(n);
            console.log($scope.travelMain,'main travel');
            journeys[i].start_Time = {};
            if (n.onGoing == true || n.onGoing == false) {
              journeys[i].onJourney = false;
            }
            // journeys[i].travelledDay = moment().diff(moment("2016-10-17T06:49:44.536Z"), 'days');
            journeys[i].showRemainingCount = false;
            if (n.countryVisited.length >= 3) {
              journeys[i].showRemainingCount = true;
            }
            journeys[i].remainingCount = n.countryVisited.length - 3;
            i++;
          });
          callback(journeys, hasJourney);
        });
      },
    };
  });
