var activity = angular.module('activity', [])

.factory('Activity', function ($http, $filter) {

  return {
    getAllActivities: function (pageNum, callback) {
      $http({
        url: adminURL + "/activityFeed/getDataWeb",
        method: "POST",
        data: {
          "pagenumber": pageNum
        }
      }).success(function (data) {
        var activities = data.data;
        _.each(activities, function (activity) {
          switch (activity.type) {
            case "travel-life":
              if (activity.photos.length == 0 && activity.videos.length == 0) {
                activity.class = "travel-taught";
              } else {
                activity.class = "travel-life";
              }
              activity.likeUnlikeFlag="post";
              activity.location=activity.checkIn.location;              
              break;
            case "on-the-go-journey":
              activity.class = "travel-life";
              activity.likeUnlikeFlag="journey";              
              break;
            case "quick-itinerary":
              activity.class = "user-quick-itinerary";
              activity.likeUnlikeFlag="itinerary";              
              break;
            case "detail-itinerary":
              activity.class = "user-detail-itinerary";
              activity.likeUnlikeFlag="itinerary";              
              break;
            case "ended-journey":
              activity.class = "travel-life";
              activity.likeUnlikeFlag="journey";                            
              break;
            case "local-life":
              if (activity.photos.length == 0 && activity.videos.length == 0) {
                activity.class = "local-life-taught";
              } else {
                activity.class = "local-life";
              }
              activity.likeUnlikeFlag="post";                            
              break;
          }

          if (activity.type == "travel-life" || activity.type == "on-the-go-journey" || activity.type == "ended-journey" || activity.type == "quick-itinerary" || activity.type == "detail-itinerary" || activity.type == "local-life") {
            activity.activityPerformed = true;
            activity.isPopularType = false;
            activity.isToDoActivity = false;
          } else if (activity.type == "popular-travellers") {
            activity.activityPerformed = false;
            activity.isPopularType = true;
            activity.isToDoActivity = false;
          } else if (activity.type == "to-do-activity") {
            activity.activityPerformed = false;
            activity.isPopularType = false;
            activity.isToDoActivity = true;
          }

          if (activity.type == "on-the-go-journey") {
            var pronoun = "his";
            if (activity.user.gender == 'male') {
              pronoun = "his";
            } else if (activity.user.gender == 'female') {
              pronoun = "her";
            }
            activity.thoughts = "Has started " + pronoun + " " + activity.name + " Journey";
          } else if (activity.type == "quick-itinerary" || activity.type=='detail-itinerary') {
            var pronoun = "his";
            if (activity.creator.gender == 'male') {
              pronoun = "his";
            } else if (activity.creator.gender == 'female') {
              pronoun = "her";
            }
            activity.thoughts = "Has uploaded a new Itinerary";
          } else if (activity.type == "ended-journey") {
            var pronoun = "his";
            if (activity.user.gender == 'male') {
              pronoun = "his";
            } else if (activity.user.gender == 'female') {
              pronoun = "her";
            }
            activity.thoughts = "Has ended " + pronoun + " " + activity.name + " Journey";
          }
        });
        callback(activities);
      });
    }
  }
});
