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
          callback(data)
        });
      },

      saveTour: function (formData, callback) {
        console.log(formData, "tour api");
        TravelibroService.http({
          url: adminURL + "/toursPackages/saveWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        });
      },
      getAgentdata: function (formData, callback) {
        console.log(formData, 'agent ka data');
        TravelibroService.http({
          url: adminURL + "/agent/getAgentSection",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        })
      },
      saveAgentReview: function (formData, callback) {
        formData.rating = parseInt(formData.rating);
        console.log(formData, 'review Agaya');
        TravelibroService.http({
          url: adminURL + "/testimonials/save",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        })
      },
      getAgentDetails: function (callback) {
        TravelibroService.http({
          url: adminURL + "/agent/getOneAgent",
          method: "POST"
        }).success(function (data) {
          callback(data);
        })
      },
      saveSettings: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/agent/save",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        })
      },
      changePassword: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/agent/changePassword",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        })
      },
      setLeads: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/leads/setLeads",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        })
      },
      agentStatusSave: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/agentStatus/save",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        })
      },
      downloadTourPdf: function (formData, callback) {
        console.log(formData, 'PDF');
        TravelibroService.http({
          url: adminURL + "/download",
          method: "GET",
          params: {
            id: formData._id,
            filename: formData.pdf
          }
        }).success(function (data) {
          callback(data);
        })
      },
      getAvgRating: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/testimonials/getAvgRating",
          method: "POST",
          data: {
            "urlSlug": formData
          }
        }).success(function (data) {
          callback(data);
        })
      },
      getAllLeads: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/Leads/getAllLeads",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        })
      },
      getAllProfileViews: function (callback) {
        TravelibroService.http({
          url: adminURL + "/agent/getAllProfileViews",
          method: "POST"
        }).success(function (data) {
          callback(data);
        })
      },
      changeStatus: function (data) {
        TravelibroService.http({
          url: adminURL + "/Leads/changeStatus",
          data: {
            "_id": data._id,
            "status": true
          },
          method: "POST"
        })
      }

    }
  });
