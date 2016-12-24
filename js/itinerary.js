var itinerary = angular.module('itinerary', [])

.factory('Itinerary', function ($http, $filter) {

  return {
    getOneItinerary: function (slug, callback) {    //get Quick/detail itinerary
      $http({
        url: adminURL + "/itinerary/getOneWeb",
        method: "POST",
        data: {
          "urlSlug": slug
        }
      }).success(function (data) {
        callback(data);
      });
    },
    postItineraryComment: function (obj, callback) {
      $http({
        url: adminURL + "/comment/addCommentWeb",
        method: "POST",
        data: obj
      }).success(function (data) {
        callback(data);
      });
    },
    updateLikeItinerary: function (obj, callback) {
      console.log(obj);
      $http({
        url: adminURL + "/itinerary/updateLikeItineraryWeb",
        method: "POST",
        data: obj
      }).success(function (data) {
        callback(data);
      });
    },
    getGooglePlaceDetail: function (obj, callback) {
      $http({
        url: adminURL + "/itinerary/getGooglePlaceDetail",
        method: "POST",
        data: obj
      }).success(function (data) {
        callback(data);
      });
    },
    searchFollowers: function (searchText, callback) {
      $http({
        url: adminURL + "/user/searchBuddyWeb",
        method: "POST",
        data: {
          "search": searchText
        }
      }).success(function (data) {
        callback(data);
      })
    },
    uploadQuickItinerary: function (obj, flag, callback) {
      if (flag == 'new') {
        var url = "/itinerary/saveQuickItineraryWeb";
      } else if (flag == 'edit') {

      }
      $http({
        url: adminURL + url,
        method: "POST",
        data: obj
      }).success(function (data) {
        if (data.value) {
          console.log("Qitinerary saved successfully");
        }
        callback(data);
      });
    },
    uploadDetailedItinerary:function(obj, flag, callback){
      console.log(obj, flag);
       if (flag == 'new') {
        var url = "/itinerary/save";
      } else if (flag == 'edit') {

      }
      $http({
        url: adminURL + url,
        method: "POST",
        data: obj
      }).success(function (data) {
        if (data.value) {
          console.log("Qitinerary saved successfully");
        }
        callback(data);
      });
    }
  };
});
