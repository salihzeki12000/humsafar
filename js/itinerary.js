var itinerary = angular.module('itinerary', [])

.factory('Itinerary', function ($http, $filter) {

  return {
    getOneQuickItinerary: function (slug,callback) {
      $http({
        url: adminURL + "/itinerary/getOneWeb",
        method: "POST",
        data:{
          "urlSlug":slug
        }
      }).success(function (data) {
        callback(data);
      });
    },
    postItineraryComment: function(obj,callback){
      $http({
        url:adminURL + "/comment/addCommentWeb",
        method:"POST",
        data:obj
      }).success(function(data){
        callback(data);
      });
    },
    updateLikeItinerary: function (obj,callback){
      console.log(obj);
      $http({
        url:adminURL + "/itinerary/updateLikeItineraryWeb",
        method:"POST",
        data:obj
      }).success(function(data){
        callback(data);
      });
    }
  };
});