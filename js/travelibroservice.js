var travelibroservice = angular.module('travelibroservice', [])

  .factory('TravelibroService', function ($http) {

    return {
      // post: function (obj, successCallback, errorCallback) {
      //   $http({
      //     url: obj.url,
      //     data: obj.data,
      //     method: "POST"
      //   }).success(successCallback).error(errorCallback)
      // },
      http: function (obj) {
        console.log(obj);
        var accessToken = $.jStorage.get("accessToken");
        var succ = function (data) {
          console.log(data.data);
        };
        var err = function (data) {
          console.log(data.data);
        };
        return {
          success: function (sucFunc) {
            console.log("inside successs");
            if (sucFunc && sucFunc != undefined) {
              succ = sucFunc;
            }
            return {
              error: function (errFunc) {
                console.log("inside error");
                if (errFunc && errFunc != undefined) {
                  err = errFunc;
                }
                if (obj.data == undefined || obj.data == null) {
                  obj.data = {
                    'accessToken': accessToken
                  }
                } else {
                  obj.data.accessToken = accessToken;
                }
                console.log("about to call api");
                $http(obj).success(succ).error(err);
              }
            };
          }
        };
      },
      post: function (callApiUrl, formData) {
        var accessToken = $.jStorage.get("accessToken");
        console.log(callApiUrl, formData, accessToken);
        return {
          success: function (sucFunc) {
            return {
              error: function (errFunc) {
                if (formData == undefined || formData == null) {
                  formData = {};
                }
                formData.accessToken = accessToken;
                $http({
                  url: callApiUrl,
                  data: formData,
                  method: "POST",
                }).success(sucFunc).error(errFunc);
              }
            };
          }
        };
      },
    };
  });
