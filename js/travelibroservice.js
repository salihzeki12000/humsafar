var travelibroservice = angular.module('travelibroservice', ['cfp.loadingBar'])

  .factory('TravelibroService', function ($http, cfpLoadingBar) {
    return {
      http: function (obj) {
        var accessToken = $.jStorage.get("accessToken");
        if (!obj) {
          obj = {};
        }
        if (!obj.data) {
          obj.data = {};
        }
        obj.data.accessToken = accessToken;
        cfpLoadingBar.start();
        console.log("start http");
        var callbackFor = $http(obj).success(function (data) {
          cfpLoadingBar.complete();
          console.log("end http");
          return data;
        });
        return callbackFor;
      },
      post: function (callApiUrl, formData) {
        var accessToken = $.jStorage.get("accessToken");
        if (!formData) {
          formData = {};
        }
        formData.accessToken = accessToken;
        cfpLoadingBar.start();
        console.log("start post");
        var callbackFor = $http({
          url: callApiUrl,
          data: formData,
          method: "POST",
        }).success(function (data) {
          cfpLoadingBar.complete();
          console.log("end post");
          return data;
        });
        return callbackFor;
      },
    };
  });
