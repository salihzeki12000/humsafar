var commontask = angular.module('commontask', [])

.factory('LikesAndComments', function ($http, $filter) {

  var returnVal = {
    postComment: function (type, uniqueId, type_Id, comment, hashTag, additionalId, callback) { //type_id=postId,journeyId,ItineraryId
      console.log("inside LikesAndComments");
      console.log(type, uniqueId, type_Id, comment, hashTag, additionalId, callback);
      var getCommentId = "";
      console.log(comment);
      var len=comment.length;
      var counter=0;
      var startIndex=null;
      var endIndex=null;
      var i;
      var tag;
      hashTag=[];
      while(counter!=len-1){
        if(comment[counter]=="#"){
          startIndex=counter;
          i=startIndex+1;
          while(i<=len){
            if(comment[i]==" " || comment[i]=="#"){
              endIndex=i-1;
              console.log(startIndex,endIndex);
              tag=comment.substring(startIndex,endIndex+1);
              hashTag.push(tag);
              console.log(tag);
              break;
            }else if(i==comment.length-1){
              endIndex=i;
              console.log(startIndex,endIndex);
              tag=comment.substring(startIndex,endIndex+1);
              hashTag.push(tag);              
              console.log(tag);
              break;
            }
            i++;
          }
          console.log(hashTag);
        }
        counter++;
      }
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
    searchTags: function(tag,callback){
      $http({
        url:adminURL+"/hashtag/findHash",
        method:"POST",
        data:{
          "hashtag":tag
        }
      }).success(function(data){
        callback(data);
      });
    }
  };
  return returnVal
});
commontask.filter('findTags', function() {
  return function (text) {
      var ctl = document.getElementById('enterComment');
      var startTagIndex=null;
      var endTagIndex=null;
      var hashTag;
      currentPosition = ctl.selectionStart - 1;
      var counter = currentPosition;
      if (text[currentPosition] != " " || text[currentPosition] != "#") {
        while (text[counter] != " " && text[counter] != "#" && counter >= 0) {
          counter--;
        }
        if (text[counter] == "#") {
          startTagIndex = counter;
        } else if (text[counter + 1] == "#") {
          startTagIndex = counter + 1;
        }
        counter = counter + 1;
        console.log(counter,text.length,startTagIndex);
        while ((counter <= text.length) && (startTagIndex != null)) {
          console.log("asd");
          if (text[counter] == " " || text[counter] == "#" || counter == text.length - 1) {
            endTagIndex = counter + 1;
            break;
          }
          counter++;
        }
        console.log(counter,text.length,startTagIndex,endTagIndex);
        if (startTagIndex != null && endTagIndex != null) {
          hashTag = text.substring(startTagIndex, endTagIndex);
          console.log(hashTag);
          return hashTah;
        }
      }
    }
});