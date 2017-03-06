var activity = angular.module('activity', [])

  .factory('Activity', function (TravelibroService, $filter) {

    return {
      getAllActivities: function (pageNum, successCallback, errorCallback, userData) {
        TravelibroService.http({
          url: adminURL + "/activityFeed/getDataWeb",
          method: "POST",
          data: {
            "pagenumber": pageNum
          }
        }).success(function (data) {
          var activities = data.data;
          _.each(data.data, function (activity) {
            switch (activity.type) {
              case "travel-life":
                if (activity.photos.length === 0 && activity.videos.length === 0) {
                  activity.class = "travel-taught";
                } else {
                  activity.class = "travel-life";
                }
                activity.likeUnlikeFlag = "post";
                activity.location = activity.checkIn.location;
                // owner of the card
                activity.owner = activity.postCreator;
                if (activity.following) {
                  activity.owner.following = activity.following;
                } else {
                  activity.owner.following = activity.following;
                }
                // owner of the card
                break;
              case "on-the-go-journey":
                activity.class = "travel-life";
                activity.likeUnlikeFlag = "journey";
                // owner of the card
                activity.owner = activity.user;
                if (activity.following) {
                  activity.owner.following = activity.following;
                } else {
                  activity.owner.following = activity.following;
                }
                // owner of the card
                break;
              case "quick-itinerary":
                activity.class = "user-quick-itinerary";
                activity.likeUnlikeFlag = "itinerary";
                var len = activity.photos.length - 1;
                var randomNum = Math.floor((Math.random() * len) + 0);
                activity.coverPhoto = activity.coverPhoto;
                // owner of the card
                activity.owner = activity.user;
                if (activity.following) {
                  activity.owner.following = activity.following;
                } else {
                  activity.owner.following = activity.following;
                }
                // owner of the card
                break;
              case "detail-itinerary":
                activity.class = "user-detail-itinerary";
                activity.likeUnlikeFlag = "itinerary";
                var len = activity.photos.length - 1;
                var randomNum = Math.floor((Math.random() * len) + 0);
                activity.coverPhoto = activity.coverPhoto;
                // owner of the card
                activity.owner = activity.user;
                if (activity.following) {
                  activity.owner.following = activity.following;
                } else {
                  activity.owner.following = activity.following;
                }
                // owner of the card
                break;
              case "ended-journey":
                activity.class = "travel-life";
                activity.likeUnlikeFlag = "journey";
                // owner of the card
                activity.owner = activity.user;
                if (activity.following) {
                  activity.owner.following = activity.following;
                } else {
                  activity.owner.following = activity.following;
                }
                // owner of the card
                break;
              case "local-life":
                if (activity.photos.length == 0 && activity.videos.length == 0) {
                  activity.class = "local-life-taught";
                } else {
                  activity.class = "local-life";
                }
                activity.likeUnlikeFlag = "post";
                // owner of the card
                activity.owner = activity.postCreator;
                if (activity.following) {
                  activity.owner.following = activity.following;
                } else {
                  activity.owner.following = activity.following;
                }
                // owner of the card
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
            var pronoun = "";
            if (activity.type == "on-the-go-journey") {
              pronoun = "his";
              if (activity.user.gender == 'male') {
                pronoun = "his";
              } else if (activity.user.gender == 'female') {
                pronoun = "her";
              }
              activity.thoughts = "Has started " + pronoun + " " + activity.name + " Journey";
            } else if (activity.type == "quick-itinerary" || activity.type == 'detail-itinerary') {
              pronoun = "his";
              if (activity.creator.gender == 'male') {
                pronoun = "his";
              } else if (activity.creator.gender == 'female') {
                pronoun = "her";
              }
              activity.thoughts = "Has uploaded a new Itinerary";
            } else if (activity.type == "ended-journey") {
              pronoun = "his";
              if (activity.user.gender == 'male') {
                pronoun = "his";
              } else if (activity.user.gender == 'female') {
                pronoun = "her";
              }
              activity.thoughts = "Has ended " + pronoun + " " + activity.name + " Journey";
            }
            if (activity && activity.photos && activity.videos) {
              activity.activityPhotosVideos = _.concat(activity.videos, activity.photos);
              if (activity && activity.activityPhotosVideos[0] && activity.activityPhotosVideos[0].thumbnail) {
                activity.display = 'video';
              } else {
                activity.display = 'photo';
              }
            }
            console.log(activity);
            if (userData._id !== activity.user._id) {
              activity.canRate = false;
              var index = _.findIndex(activity.buddies, ['_id', userData._id]);
              if (index == -1) {
                activity.canRate = false;
              } else {
                activity.canRate = true;
              }
            } else {
              activity.canRate = true;
            }
            console.log(activity);
          });
          successCallback(activities);
        }).error(errorCallback);
      }
    }
  });
