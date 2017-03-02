var travelibroservice = angular.module('travelibroservice', [])

  .factory('TravelibroService', function ($http) {

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
        var callbackFor = $http(obj);
        return callbackFor;
      },
      post: function (callApiUrl, formData) {
        var accessToken = $.jStorage.get("accessToken");
        if (!formData) {
          formData = {};
        }
        formData.accessToken = accessToken;
        var callbackFor = $http({
          url: callApiUrl,
          data: formData,
          method: "POST",
        });
        return callbackFor;
      },
    };
  });
