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
    }
  };
});