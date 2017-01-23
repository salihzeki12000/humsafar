var commontask = angular.module('commontask', [])

.factory('LikesAndComments', function ($http, $filter) {

  var returnVal = {
    postComment: function (type, uniqueId, type_Id, comment, hashTag, additionalId, callback) { //type_id=postId,journeyId,ItineraryId
      console.log("inside LikesAndComments");
      console.log(type, uniqueId, type_Id, comment, hashTag, additionalId, callback);
      var getCommentId = "";
      console.log(comment);
      var len = comment.length;
      var counter = 0;
      var startIndex = null;
      var endIndex = null;
      var i;
      var tag;
      hashTag = [];
      while (counter != len - 1) {
        if (comment[counter] == "#") {
          startIndex = counter;
          i = startIndex + 1;
          while (i <= len) {
            if (comment[i] == " " || comment[i] == "#" || comment[i] == "@") {
              endIndex = i - 1;
              console.log(startIndex, endIndex);
              tag = comment.substring(startIndex, endIndex + 1);
              hashTag.push(tag);
              console.log(tag);
              break;
            } else if (i == comment.length - 1) {
              endIndex = i;
              console.log(startIndex, endIndex);
              tag = comment.substring(startIndex, endIndex + 1);
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
      hashTag = _.remove(hashTag, function (n) {
        return !(n == "#" || n == "@");
      });
      console.log(hashTag);
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
          url = "/journey/likeJourneyWeb";
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
    getLikes: function (type, _id,callback) {
      console.log(type, _id);
      var obj = {
        "_id": _id
      };
      switch (type) {
        case "post":
          url = "/post/getPostLikes";
          break;
        case "photo":
          url = "/postphotos/getPostLikes";
          break;
        case "video":
          url = "/postvideos/getPostLikes";
          break;
        case "itinerary":
          url = "/itinerary/getItineraryLikes";
          break;
        case "journey":
          url = "/journey/getJourneyLikes";
          break;
      };
       $http({
          url: adminURL + url,
          method: "POST",
          data: obj
        }).success(function(data){
          callback(data);
        });
    },
    searchTags: function (tag, callback) {
      $http({
        url: adminURL + "/hashtag/findHash",
        method: "POST",
        data: {
          "hashtag": tag
        }
      }).success(function (data) {
        callback(data);
      });
    },
    searchBuddies: function (buddy, callback) {
      $http({
        url: adminURL + "/user/searchBuddyWeb",
        method: "POST",
        data: {
          fromTag: true,
          search: buddy
        }
      }).success(function (data) {
        callback(data);
      });
    }
  };
  return returnVal
});
commontask.directive('findTags', function (LikesAndComments) {
  return {
    restrict: 'E',
    scope: {
      ngModel: "=",
      focus: "&"
    },
    templateUrl: "views/modal/hashtag.html",
    link: function ($scope, element, attrs) {
      $scope.$watch('ngModel', function (newVal, oldVal) {
        var text = $scope.ngModel;
        var comment = {
          'text': newVal
        };
        var ctl = document.getElementById('enterComment');
        $scope.startTagIndex = null;
        $scope.endTagIndex = null;
        $scope.hashTag;
        currentPosition = ctl.selectionStart - 1;
        var counter = currentPosition;

        //for finding hashtags
        if (text[currentPosition] != " " || text[currentPosition] != "#" || text[currentPosition] != "@") {
          $scope.hashTags = [];
          while (text[counter] != " " && text[counter] != "#" && text[counter] != "@" && counter >= 0) {
            counter--;
          }
          if ((text[counter] == "#" || text[counter] == "@") && text[counter + 1] != "#" && text[counter + 1] != "@") {
            $scope.startTagIndex = counter;
          } else if (text[counter + 1] == "#" || text[counter + 1] == "@") {
            $scope.startTagIndex = counter + 1;
          }
          counter = counter + 1;
          while ((counter <= text.length) && ($scope.startTagIndex != null)) {
            if (text[counter] == " " || text[counter] == "#" || text[counter] == "@") {
              $scope.endTagIndex = counter - 1;
              break;
            } else if (counter == text.length - 1) {
              $scope.endTagIndex = counter;
              break;
            }
            counter++;
          }
          if ($scope.startTagIndex != null && $scope.endTagIndex != null) {
            // console.log("testing", $scope.startTagIndex, $scope.endTagIndex);
            $scope.flag = text[$scope.startTagIndex];
            $scope.showTags = false;
            $scope.showBuddies = false;
            // $scope.hashTag = text.substring($scope.startTagIndex, $scope.endTagIndex + 1);
            var tagCallback = function (data) {
              $scope.hashTags = data.data;
              console.log($scope.hashTags);
              $scope.showTags = true;
              $scope.showBuddies = false;
            };
            var buddiesCallback = function (data) {
              $scope.buddies = data.data;
              console.log($scope.buddies);
              $scope.showTags = false;
              $scope.showBuddies = true;
            }
            if ($scope.flag == "#") {
              $scope.hashTag = text.substring($scope.startTagIndex, $scope.endTagIndex + 1);
              LikesAndComments.searchTags($scope.hashTag, tagCallback);

            } else if ($scope.flag == "@") {
              $scope.hashTag = text.substring($scope.startTagIndex + 1, $scope.endTagIndex + 1);
              LikesAndComments.searchBuddies($scope.hashTag, buddiesCallback);
            }
            console.log($scope.hashTag);
          }
        }
      });

      String.prototype.replaceBetween = function (start, end, len, what) {
        console.log(start, end, len, what);
        return this.substring(0, start) + what + this.substring(end + 1, len);
      };

      $scope.appendComment = function (flag, comment, replaceWith, tag, startTagIndex, endTagIndex) {
        $scope.showTags = false;
        $scope.showBuddies = false;
        console.log(comment, replaceWith, tag, startTagIndex, endTagIndex);
        var counter = "";
        var len = comment.length;
        counter = startTagIndex + 1;
        while ((counter <= comment.length) && ($scope.startTagIndex != null)) {
          if (comment[counter] == " " || comment[counter] == "#" || comment[counter] == "@") {
            $scope.endTagIndex = counter - 1;
            break;
          } else if (counter == comment.length - 1) {
            $scope.endTagIndex = counter;
            break;
          }
          counter++;
        }
        if (flag == "#") {
          var a = comment.replaceBetween(startTagIndex, $scope.endTagIndex, len, replaceWith);
        } else if (flag == "@") {
          var a = comment.replaceBetween(startTagIndex + 1, $scope.endTagIndex, len, replaceWith);
        }
        console.log(a);
        $scope.ngModel = a;
        $scope.hashTags = [];
        $scope.focus();
      };
    }
  }
});
