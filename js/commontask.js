var commontask = angular.module('commontask', [])

.factory('LikesAndComments', function ($http, $filter) {

  var returnVal = {
    postComment: function (type, uniqueId, type_Id, comment, hashTag, additionalId, callback) { //type_id=postId,journeyId,ItineraryId
      console.log("inside LikesAndComments");
      console.log(type, uniqueId, postId, comment, hashTag, additionalId, callback);
      var getCommentId="";
      var obj = {
        "type": type,
        "uniqueId": uniqueId,
        "text": comment,
        "hashtag": hashTag
      };


      // if(type=="post"){
      //   obj.post= type_Id;
      // }else if (type == "photo") {
      //   obj.post= type_Id;
      //   obj.photo = additionalId; //this var is initialized only when commenting for photo,video or itinerary
      //   getCommentId=additionalId
      // } else if (type == "video") {
      //   obj.video = additionalId;
      // } else if (type == "itinerary") {
      //   obj.itinerary = type_Id;
      // }else if (type == "journey") {
      //   obj.itinerary = type_Id;
      // };

      switch(type){
        case "post":
                obj.post= type_Id;   
                getCommentId=type_Id;
                break;  
        case "photo":
                obj.post= type_Id;
                obj.photo = additionalId; //this var is initialized only when commenting for photo,video or itinerary
                getCommentId=additionalId;
                break;                  
        case "video":
                obj.video = additionalId;  
                getCommentId="";
                break;                    
        case "itinerary":
                obj.itinerary = type_Id;
                getCommentId="";
                break;                  
        case "journey":
                obj.journey = type_Id;
                getCommentId="";
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
    getComments: function (type, id, callback) {
      console.log(type, id, callback);
      var obj = {
        "_id": id
      };
      var url;
      if (type == "post") {
        url = "/post/getPostCommentWeb";
      } else if (type == "photo") {
        url = "/postphotos/getOneWeb";
      } else if (type == "video") {
        url = "/postvideos/getPostComment";
      } else if (type == "itinerary") {
        url = "/itinerary/getItineraryCommentWeb";
      }
      $http({
        url: adminURL + url,
        method: "POST",
        data: obj
      }).success(function (data) {
        callback(data);
      });
    },
    likeUnlike:function(type,task,uniqueId,_id,callback){
      var obj={
        "uniqueId":uniqueId
      }
      if (type == "post") {
        url = "/post/updateLikePostWeb";
      } else if (type == "photo") {
        url = "/postphotos/getOneWeb";
      } else if (type == "video") {
        url = "/postvideos/getPostComment";
      } else if (type == "itinerary") {
        url = "/itinerary/getItineraryCommentWeb";
      }

      if(task=="unlike"){
        obj.unlike=true;
      }
    },
  };
  return returnVal
});
