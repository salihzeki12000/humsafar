var agent = angular.module('agent', [])

  .factory('Agent', function (TravelibroService, $filter) {

    return {
      verifyOtp: function (otp, callback) {
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (otp.length == 4 && !(format.test(otp))) {
          TravelibroService.http({
            url: adminURL + "/agent/verifyOtpWeb",
            data: {
              otp: otp
            },
            method: "POST"
          }).success(callback)
        } else {
          return callback({
            'value': false
          });
        }
      },
      requestOtp: function () {
        TravelibroService.http({
          url: adminURL + "/agent/requestOtp",
          method: "POST"
        }).success(function (data) {
          console.log(data);
        });
      },
      saveAgentData: function (formData, callback) {
        console.log(formData);
        TravelibroService.http({
          url: adminURL + "/agent/saveAgentDetailsWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          console.log(data);
        });
      },

    }
  });
