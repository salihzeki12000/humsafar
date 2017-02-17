var viewlocalLife = angular.module('locallife',[])
.factory('localLife',function($http,$filter){
  return{
    getLocalJourney: function(callback,localData, errorCallback){
      // console.log(localData,'data kya hai');
      console.log(localData);
      $http({
        url: adminURL + "/journey/myLocalLifeWeb",
        method: "POST",
        data: {
          "type": localData.type,
          "pagenumber": localData.pagenumber,
          "month": localData.month,
          "year": localData.year,
          "categories": localData.checkInType,
          // "categories": [],
          "photos": localData.photos,
          "videos": localData.videos,
          "thoughts": localData.thoughts,
          "rating": localData.rating
          // "rating": []
        }
      }).success(function(data){
        var localLifeData = data;
        callback(localLifeData);
        console.log(localLifeData,'localLife');
      });
    }
  }
});
viewlocalLife.directive('postLocalLife', ['$http','$filter','$uibModal','$window','$timeout','localLife','LikesAndComments', function ($http,$filter, $uibModal, $window, $timeout, localLife, LikesAndComments) {
  return {
    restrict: 'E',
    scope: {
      localongo: "=ongolocal",
      getCommentsData: '&',
      getLikesData: '&'
    },
    templateUrl: 'views/directive/local-post.html',
    link: function ($scope, element, attrs){
      var getLocation = {};
      $scope.flexShow = true;
      $scope.videoFlex = true;
      $scope.indexPhotoCaption = -1;
      $scope.indexVideoCaption = -1;
      $scope.indexEditPhotoCap = -1;
      $scope.indexEditVideoCap = -1;
      $scope.otgPhoto = [];
      $scope.otgPhotoArray = [];
      $scope.otgVideo = [];
      $scope.editedPhotosArr = [];
      $scope.checkInData = {};
      $scope.newBuddies = [];
      $scope.selectedTagFriend = [];
      $scope.buddyName = [];
      var hashTag = [];
      $scope.removedHashTag = [];
      $scope.localongo.getSearchedList = "";
      $scope.localongo.buddiesCount = 0;
      $scope.index = 0;
      $scope.changeView = function (index, flagType) {
        $scope.index = index;
        $scope.localongo.onDisplay = flagType;
        console.log($scope.index, $scope.localongo.onDisplay);
      };
        var makeLocalString = function(){
        if ($scope.localongo.buddies) {
          $scope.localongo.buddiesCount = $scope.localongo.buddies.length;
        }
        $scope.localongo.buddiesString = "";
        if ($scope.localongo.buddiesCount == undefined) {

        } else if ($scope.localongo.buddiesCount == 1) {
          $scope.localongo.buddiesString = $scope.localongo.buddies[0].name.bold();
        } else if ($scope.localongo.buddiesCount == 2) {
          $scope.localongo.buddiesString = $scope.localongo.buddies[0].name.bold() + " and " + $scope.localongo.buddies[1].name.bold();
        } else if ($scope.localongo.buddiesCount >= 2) {
          $scope.localongo.buddiesString = $scope.localongo.buddies[0].name.bold() + " and " + "<b>" + ($scope.localongo.buddiesCount - 1) + " others." + "</b>";
        }
        var localpostString = "";

        // $filter('category')($scope.localongo.checkIn.category) +
        if ($scope.localongo.buddiesString != "") {
          if ($scope.localongo.thoughts && $scope.localongo.checkIn.location) {
            $scope.localongo.localpostString = $scope.localongo.thoughts + " with " + $scope.localongo.buddiesString + " at " + $scope.localongo.checkIn.location.bold();
          } else if ($scope.localongo.thoughts) {
            $scope.localongo.localpostString = $scope.localongo.thoughts + " with " + $scope.localongo.buddiesString;
          } else if ($scope.localongo.checkIn && $scope.localongo.checkIn.location) {
            $scope.localongo.localpostString = $scope.localongo.user.name.bold() + " with " + $scope.localongo.buddiesString + " - at " + $scope.localongo.checkIn.location.bold();
          } else {
            $scope.localongo.localpostString = $scope.localongo.user.name.bold() + " with " + $scope.localongo.buddiesString;
          }
        } else {
          if ($scope.localongo.thoughts && $scope.localongo.checkIn.location) {
            $scope.localongo.localpostString = $scope.localongo.thoughts + " - at " + $scope.localongo.checkIn.location.bold();
          } else if ($scope.localongo.thoughts) {
            $scope.localongo.localpostString = $scope.localongo.thoughts;
          } else if ($scope.localongo.checkIn && $scope.localongo.checkIn.location) {
            $scope.localongo.localpostString = $scope.localongo.user.name.bold() + " - at " + $scope.localongo.checkIn.location.bold();
          } else {
            $scope.localongo.localpostString = $scope.localongo.user.name.bold() + " with " + $scope.localongo.buddiesString;
          }
        }
      };
      makeLocalString();

      // concating of photos & video of life
      if($scope.localongo && $scope.localongo.photos && $scope.localongo.videos){
        $scope.localongo.photosVideos = $scope.localongo.videos.concat($scope.localongo.photos);
        if ($scope.localongo && $scope.localongo.photosVideos[0] && $scope.localongo.photosVideos[0].thumbnail) {
          $scope.localongo.onDisplay = "videos";
        } else {
          $scope.localongo.onDisplay = "photos";
        }
      }
      // concating of photos & video of life end
      // localpost like and unlike
      $scope.likeLocalPost = function (uniqueId, _id) {
        console.log(uniqueId,'un',_id,'id');
        console.log($scope.localongo.likeDone + "this call is from journey-post.html");
        $scope.localongo.likeDone = !$scope.localongo.likeDone;
        if ($scope.localongo.likeDone) {
          if ($scope.localongo.likeCount == undefined) {
            $scope.localongo.likeCount = 1;
          } else {
            $scope.localongo.likeCount = $scope.localongo.likeCount + 1;
          }
          LikesAndComments.likeUnlike("post", "like", uniqueId, _id, null)
        } else {
          $scope.localongo.likeCount = $scope.localongo.likeCount - 1;
          LikesAndComments.likeUnlike("post", "unlike", uniqueId, _id, null)
        }
      };
      // localpost like and unlike end
      // filters
      // rating local life
      $scope.getLocalRating = function (n, type) {
        if (type == "marked") {
          n = parseInt(n);
          return new Array(n);
        } else if (type == "unmarked") {
          n = parseInt(n);
          var remainCount = 5 - n;
          return new Array(remainCount);
        }
      };
      $scope.rateLocalJourney = function(localPost){
        console.log(localPost,'check in');
        $scope.localCheckIn = localPost.checkIn;
        if (localPost.review.length !== 0) {
          console.log("Edit Rating");
          if (localPost.review[0].rating != undefined) {
            $scope.starRating(parseInt(localPost.review[0].rating));
          } else {

          }
        } else {
          console.log("Rate Us");
        }
        $uibModal.open({
          animation: true,
          templateUrl: 'views/modal/rate-local-journey.html',
          scope: $scope
        });
      };
      $scope.ratingValue = {};
      $scope.ratingValue.review = "";
      $scope.ratingValue.rating = "";
      $scope.saveLocalPostReview =  function(values,postData) {
        $scope.ratingValue.review = values.review;
        $scope.ratingValue.rating = values.rating;
        console.log(postData,'post data kya hai');
        var formData = {
          "post": $scope.localongo._id,
          "review": values.review,
          "rating": values.rating
        };
        $http({
          url: adminURL + "/review/saveWeb",
          method: "POST",
          data: formData
        }).success(function(data){
          if(data.value == true) {
            postData.review[0] = $scope.ratingValue;
            console.log(postData.review,'review');
          }
        });
      };
      $scope.showRating = 1;
      $scope.fillColor = "";
      $scope.localPostReview = {};
      $scope.localPostReview.rating = 1;
      $scope.starRating = function (val) {
        $scope.localPostReview.rating = val;
        if (val == 1) {
          $scope.showRating = 1;
          $scope.fillColor2 = "";
          $scope.fillColor3 = "";
          $scope.fillColor4 = "";
          $scope.fillColor5 = "";
        } else if (val == 2) {
          $scope.showRating = 2;
          $scope.fillColor2 = "fa-star";
          $scope.fillColor3 = "";
          $scope.fillColor4 = "";
          $scope.fillColor5 = "";
        } else if (val == 3) {
          $scope.showRating = 3;
          $scope.fillColor2 = "fa-star";
          $scope.fillColor3 = "fa-star";
          $scope.fillColor4 = "";
          $scope.fillColor5 = "";
        } else if (val == 4) {
          $scope.showRating = 4;
          $scope.fillColor2 = "fa-star";
          $scope.fillColor3 = "fa-star";
          $scope.fillColor4 = "fa-star";
          $scope.fillColor5 = "";
        } else if (val == 5) {
          $scope.showRating = 5;
          $scope.fillColor2 = "fa-star";
          $scope.fillColor3 = "fa-star";
          $scope.fillColor4 = "fa-star";
          $scope.fillColor5 = "fa-star";
        } else {
          $scope.showRating = 1;
        }
      };
      // rating local life end
      // filters end
      // local pic pop up
        $scope.openLocalimg = function (getVal) {
          console.log(getVal,'ab val su che');
          // $scope.showimgData = $scope.localLife[getVal];
          $scope.showingData = getVal;
          // console.log(getVal);
          $uibModal.open({
            animation: true,
            templateUrl: "views/modal/local-imgview.html",
            scope: $scope,
            windowTopClass: "notify-popup"
          })
        };
      // local pic pop up end
      // local journey edit
      $scope.editOption = function (model) {
        $timeout(function () {
          model.backgroundClick = true;
          backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
      };
      // edit otg checkin
      $scope.editCheckIn = function () {
        $scope.alreadyTagFrnd = true;
        modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/edit-localjourney.html",
          size: "lg",
          scope: $scope,
          backdrop: 'static',
          backdropClass: "review-backdrop"
        });
        modal.closed.then(function () {});
        console.log("local", $scope.localongo);
        // geo location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (geoLocation) {
            getLocation = geoLocation.coords;
          });
        } else {
          console.log("navigator.geolocation not supported");
        }
        // geo location end
      }
      // edit checking
      // geo location
      $scope.showLocation = false;
      $scope.viewLocation = function () {
        $http({
          url: adminURL + "/post/placeSearch",
          method: "POST",
          data: {
            lat: getLocation.latitude,
            long: getLocation.longitude
          }
        }).success(function (location) {
          console.log("geolocationdtata", location);
          _.each(location.data, function (o) {
            o.name = o.name + ", " + o.vicinity;
          });
          $scope.nearByLocation = location.data;
        });
      };
      $scope.getLocation = function () {
        if ($scope.localongo.checkIn.location !== "") {
          $scope.showLocation = true;
          $http({
            url: adminURL + "/post/checkInPlaceSearch",
            method: "POST",
            data: {
              lat: getLocation.latitude,
              long: getLocation.longitude,
              search: $scope.localongo.checkIn.location
            }
          }).success(function (location) {
            _.each(location.data, function (o) {
              o.name = o.description;
            });
            $scope.nearByLocation = location.data;
          });
        } else {
          $scope.localongo.checkIn.category = "";
          $scope.viewLocation();
        }

      };
      $scope.locationId = function (id) {
        console.log(id);
        $http({
          url: adminURL + "/post/getGooglePlaceDetail",
          method: "POST",
          data: {
            placeId: id.place_id
          }
        }).success(function (locationData) {
          $scope.localongo.checkIn = {
            location: id.name,
            lat: locationData.lat,
            long: locationData.long,
            country: locationData.country,
            city: locationData.city,
            category: locationData.data
          };
          $scope.showLocation = false;
        })
      }
      // geo location end
      $scope.categoryList = ['Beaches', 'Airport', 'Hotels', 'Restaurants', 'Nature & parks', 'Sights & Landmarks', 'Museums & Galleries', 'Religious', 'Shopping', 'Adventure & Excursion', 'Zoos & Aqua', 'Cinema & Theatre'];

      // tag friend list
      $scope.viewListFriend = false;
      $scope.listTagfriend = function () {
        if ($scope.localongo.getSearchedList.length > 3) {
          $scope.viewListFriend = true;
          $http({
            url: adminURL + "/user/searchBuddyWeb",
            method: "POST",
            data: {
              "search": $scope.localongo.getSearchedList
            }
          }).success(function (data) {
            console.log(data.data);
            $scope.tagFriends = data.data;
            _.each($scope.tagFriends, function (n) {
              var buddyIndex = _.findIndex($scope.localongo.buddies, function (m) {
                return m._id === n._id;
              });
              if (buddyIndex !== -1) {
                n.checked = true;
                n.noEdit = "un-tag";
                $("#" + n._id).prop('disabled', true);
              } else {
                n.checked = false;
              }
              var checkedIndex = _.findIndex($scope.localongo.buddies, function (z) {
                return z.taggedFriend === true;
              });
              if (checkedIndex !== -1) {
                $("#" + n._id).prop('disabled', false);
                n.noEdit = "";
              }
            });
          })
        } else {
          console.log($scope.newBuddies, 'total-array');
          $scope.viewListFriend = false;
        }
      }
      // tag friend list end
      // edit more caption
      $scope.editMoreCaption = function (index) {
        console.log(index, 'photo ka index');
        if ($scope.indexEditPhotoCap === index) {
          $scope.indexEditPhotoCap = -1;
        } else {
          $scope.indexEditPhotoCap = index;
        }
      };
      // edit more caption end
      $scope.photosArray = _.cloneDeep($scope.localongo.photos);
      $scope.photosArray = _.chunk($scope.photosArray, 4);
      for (var i = 0; i < $scope.photosArray.length; i++) {
        $scope.photosArray[i] = _.chunk($scope.photosArray[i], 2);
        // console.log($scope.photosArray[i + 'row'] = _.chunk($scope.photosArray[i + 'col'], 2));
      }

      $scope.removeEditPic = function (id) {
        $scope.flexShow = false;
        _.remove($scope.localongo.photos, function (editPic) {
          return editPic._id === id;
        });
        $scope.photosArray = $scope.localongo.photos;
        $scope.photosArray = _.chunk($scope.photosArray, 4);
        for (var i = 0; i < $scope.photosArray.length; i++) {
          $scope.photosArray[i] = _.chunk($scope.photosArray[i], 2);
          // console.log($scope.photosArray[i + 'row'] = _.chunk($scope.photosArray[i + 'col'], 2));
        }
        $timeout(function () {
          $scope.flexShow = true;
        }, 100);
        console.log($scope.photosArray, "new array");
      }

      // caption edit
      $scope.editCaption = function (columndata) {
        var editIndex = _.findIndex($scope.localongo.photos, function (j) {
          return j._id === columndata._id;
        });
        $scope.localongo.photos[editIndex].caption = columndata.caption;
      }
      // caption edit end
      // edit save data
      $scope.saveLocalEdit = function () {
        // get photos id
        $scope.photosId = _.map($scope.localongo.photos, "_id");
        // get photos id end

        LikesAndComments.getHashTags($scope.localongo.thoughts, function (data) {
          hashTag = data;
          // removedHashTag
          var removeTag = _.difference($scope.localongo.hashTag, hashTag);
          $scope.removedHashTag = removeTag;
          // removeHashtag end
        });
        console.log(hashTag);

        // hashtag end

        var editedData = {
          thoughts: $scope.localongo.thoughts,
          checkIn: $scope.localongo.checkIn,
          checkInChange: true,
          "uniqueId": $scope.localongo.uniqueId,
          "_id": $scope.localongo._id,
          buddiesArr: $scope.newBuddies,
          hashtag: hashTag,
          addHashtag: hashTag,
          removeHashtag: $scope.removedHashTag,
          photosArr: $scope.localongo.photos,
          videosArr: $scope.localongo.videos,
          type: "editPost"
        }
        if ($scope.localongo.checkIn && $scope.localongo.checkIn.lat && $scope.localongo.checkIn.long && $scope.localongo.checkIn.category && $scope.localongo.checkIn.location) {
          if ($scope.checkInData.lat && $scope.checkInData.long) {
            if ($scope.localongo.checkIn.lat === $scope.checkInData.lat && $scope.localongo.checkIn.long === $scope.checkInData.long) {
              editedData.checkInChange = false;
            } else {
              editedData.checkInChange = true;
            }
          } else {
            editedData.checkInChange = true;
          }
        } else {
          editedData.checkIn = {
            location: "",
            lat: "",
            long: "",
            country: "",
            city: "",
            category: ""
          };
          editedData.checkInChange = false;
        }
        console.log(editedData, "dataEdited hai");
        $http({
          url: adminURL + "/post/editLocalWeb",
          method: "POST",
          data: editedData,
        }).success(function (data) {
          if (data.value === true) {
            $window.location.reload();
            modal.close();
          }
        })
        console.log($scope.localongo, "journey ka arrray");
      }
      // edit save data end

      // local journey add photo videos
      $scope.addLocalPhotoVideos = function () {
        modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/local-add-photovideo.html",
          backdropClass: "review-backdrop",
          size: "lg",
          scope: $scope,
          backdrop: 'static'
        });
        console.log($scope.localongo, "add wala");
        modal.closed.then(function () {
          $scope.otgPhotoArray = [];
          $scope.photoSec = false;
          $scope.otgPhoto = [];
        });
      };
      // local journey add photo videos end
      // add photos start
      $scope.photoSec = false;
      $scope.addOtgPhotos = function (detail, length) {
        console.log(detail);
        $scope.otgPhoto.push({
          name: detail,
          caption: ""
        });
        // if (y === length) {
        console.log($scope.otgPhoto, "otg photo");
        $scope.flexShow = false;
        $scope.otgPhotoArray = $scope.otgPhoto;
        $scope.otgPhotoArray = _.chunk($scope.otgPhotoArray, 4);
        for (var i = 0; i < $scope.otgPhotoArray.length; i++) {
          $scope.otgPhotoArray[i] = _.chunk($scope.otgPhotoArray[i], 2);
        }
        y = 1;
        // $('#flexslider').removeData("flexslider");
        console.log($scope.otgPhotoArray, "otg photo array");
        if ($scope.otgPhotoArray.length > 0) {
          $scope.photoSec = true;
        } else {
          $scope.photoSec = false;
        }
        $timeout(function () {
          $scope.flexShow = true;
        }, 200)
        // } else {
        //   y++;
        // }
      }
      // add photos end
      // add video start
      $scope.addOtgVideo = function (video) {
        console.log(video, 'video mai kya aaya');
        $scope.otgVideo.push({
          name: video.name,
          thumbnail: video.thumbnail,
          caption: ""
        });
        console.log($scope.otgVideo, 'otg Video');
        $timeout(function () {
          $scope.videoFlex = true;
          if ($scope.otgVideo.length > 0) {
            $scope.videoSec = true;
            $(".flexslider").flexslider({
              directionNav: true
            });
          } else {
            $scope.videoSec = false;
            $(".flexslider").flexslider({
              directionNav: false
            });
          }
        }, 100)
      };
      $scope.addVideoCaption = function (id) {
        if ($scope.indexVideoCaption == id) {
          $scope.indexVideoCaption = -1;
        } else {
          $scope.indexVideoCaption = id;
        }
      }
      // add video end
      // delete added photos
      $scope.deletePhotos = function (name) {
        $scope.flexShow = false;
        _.remove($scope.otgPhoto, function (n) {
          return n.name === name;
        })
        $scope.otgPhotoArray = $scope.otgPhoto;
        $scope.otgPhotoArray = _.chunk($scope.otgPhotoArray, 4);
        for (var i = 0; i < $scope.otgPhotoArray.length; i++) {
          $scope.otgPhotoArray[i] = _.chunk($scope.otgPhotoArray[i], 2);
        }
        $timeout(function () {
          $scope.flexShow = true;
        }, 100);
        if ($scope.otgPhotoArray.length > 0) {
          $scope.photoSec = true;
        } else {
          $scope.photoSec = false;
        }
        // console.log();

        console.log($scope.otgPhoto);
        console.log($scope.otgPhotoArray);
      }
      // delete added photos end
      // tag selected buddy
      _.each($scope.localongo.buddies, function (o) {
        o.selected = true;
      });
      $scope.selectBuddy = function (buddy) {
        if (buddy.selected == true) {
          buddy.selected = false;
        } else {
          buddy.selected = true;
        }
      };
      // tag selected buddy end
      // save local add photo vidoes
      $scope.saveLocalPhotosVideos = function () {
        _.filter($scope.localongo.buddies, ['selected', true]);
        // console.log(photos,uniqueId);
        var formData = {
          type: "addPhotosVideos",
          photosArr: $scope.otgPhoto,
          videosArr: $scope.otgVideo,
          _id: $scope.localongo._id,
          buddies: $scope.localongo.buddies
        }
        $http({
          url: adminURL + "/post/editLocalWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          console.log(data,'the added one');
          if (data.value === true) {
            // setTimeout(function () {
            //   $window.location.reload();
            // }, 100);
          }
          $scope.otgPhoto = [];
          $scope.otgPhotoArray = [];
        });
      }
      // save local add photo vidoes end
      // change date and time local journey
      $scope.time = {};
      $scope.datetime = {};

      $scope.changeLocalDate = function () {
        console.log("Posts Date");
        $scope.isPostDate = true;
        $scope.isBannerDate = false;
        console.log($scope.isPostDate, $scope.isBannerDate);
        date = $scope.localongo.UTCModified;
        var d = new Date(date);
        var hh = d.getHours();
        if (hh > 12) {
          hh = hh - 12;
          $scope.time.am_pm = "PM";
        } else {
          $scope.time.am_pm = "AM";
        }
        $scope.time.hour = hh;
        $scope.time.min = d.getMinutes();
        $scope.datetime.dt = d;
        $scope.options = {
          // minDate: $scope.json.startTime,
          // maxDate: $scope.json.post[$scope.json.post.length - 1].UTCModified,
          showWeeks: false
        };
        modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/local-date-time.html",
          scope: $scope,
          backdropClass: "review-backdrop",
        })
      };
      $scope.updateLocalTime = function (localPost, formData, dt) {
        console.log(dt);
        console.log(formData, dt);
        var date = $filter('formatDateCalender')(dt);
        var time = $filter('formatTimeCalender')(formData);
        var result = {};
        console.log(date);
        console.log(time);
        result.type = "changeDateTime";
        result.date = new Date(date + " " + time);
        result._id = localPost._id;
        $http({
          url: adminURL + "/post/editLocalWeb",
          method: "POST",
          data: result
        }).success(function (data) {
          console.log(data,'date');
          localPost.UTCModified = result.date;
          modal.close();
        });
      };

      // change date and time local journey end
      // delete local journey post
      $scope.deleteLocalPost = function (postId) {
        var formData = {
          type: "deletePost",
          _id: postId
        }
        console.log(formData);
        $http({
          url: adminURL + "/post/editLocalWeb",
          method: "POST",
          data: formData
        }).success(function () {
          console.log("deleted successfully");
          document.getElementById(postId).remove();
        }).error(function () {
          console.log("failed to delete");
        })
      }
      // delete local journey post end
      // local journey edit end
    }
  }
}]);
