var commontask = angular.module('commontask', [])

.factory('LikesAndComments', function ($http, $filter) {

  var returnVal = {
    postComment: function (type, uniqueId, type_Id, comment, hashTag, additionalId, callback) { //type_id=postId,journeyId,ItineraryId
      console.log("inside LikesAndComments");
      console.log(type, uniqueId, type_Id, comment, hashTag, additionalId, callback);
      var getCommentId = "";
      var obj = {
        "type": type,
        "uniqueId": uniqueId,
        "text": comment,
        "hashtag": hashTag
      };
      switch (type) {
        case "post":
          obj.post = type_Id;
          getCommentId = type_Id;
          break;
        case "photo":
          obj.post = type_Id;
          obj.photo = additionalId; //this var is initialized only when commenting for photo,video or itinerary
          getCommentId = additionalId;
          break;
        case "video":
          obj.video = additionalId;
          getCommentId = "";
          break;
        case "itinerary":
          obj.itinerary = type_Id;
          getCommentId = "";
          break;
        case "journey":
          obj.journey = type_Id;
          getCommentId = "";
          break;
      }
      $http({
        url: adminURL + "/comment/addCommentWeb",
        method: "POST",
        data: obj
      }).success(function (data) {
        returnVal.getComments(type, getCommentId, callback);
      });
    },
    getComments: function (type, _id, callback) {
      console.log(type, _id, callback);
      var obj = {
        "_id": _id
      };
      var url;
      switch (type) {
        case "post":
          url = "/post/getPostCommentWeb";
          break;
        case "photo":
          url = "/postphotos/getOneWeb";
          break;
        case "video":
          url = "/postvideos/getPostComment";
          break;
        case "itinerary":
          url = "/itinerary/getItineraryCommentWeb";
          break;
        case "journey":
          url = "/journey/getJourneyCommentWeb"
          break;
      }
      $http({
        url: adminURL + url,
        method: "POST",
        data: obj
      }).success(function (data) {
        callback(data);
      });
    },
    likeUnlike: function (type, task, uniqueId, type_id, additionalId) {
      console.log(type, task, uniqueId, type_id, additionalId);
      var obj = {
        "uniqueId": uniqueId
      };
      switch (type) {
        case "post":
          obj.post = type_id;
          url = "/post/updateLikePostWeb";
          break;
        case "photo":
          obj.postId = type_id;
          obj.photoId = additionalId;
          url = "/postphotos/updateLikePostWeb";
          break;
        case "video":
          obj.postId = type_id;
          obj.videoId = additionalId;
          url = "/postvideos/updateLikePostWeb";
          break;
        case "itinerary":
          obj.itinerary = type_id
          url = "/itinerary/updateLikeItineraryWeb";
          break;
        case "journey":
          obj.journey = type_id
          url = "/journey/likeJourney";
          break;
      };
      if (task == "unlike") {
        obj.unlike = true;
      };
      $http({
        url: adminURL + url,
        method: "POST",
        data: obj
      }).success(function (data) {
        console.log(data);
      });
    },
  };
  return returnVal
});
