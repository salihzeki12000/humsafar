var ongojourney = angular.module('ongojourney', [])

.factory('OnGoJourney', function($http, $filter) {

  return {
    getAllJourney: function(callback, errorCallback) {
      $http({
        url: adminURL + "/journey/myLifeWeb",
        method: "POST",
        data: {
          "type": "all"
        }
      }).success(function(data) {
        var hasJourney = "";
        if (_.isEmpty(data.data)) {
          hasJourney = false;
        } else {
          hasJourney = true;
        }
        var journeys = data.data;

        var i = 0;
        _.each(journeys, function(n) {
          journeys[i].start_Time = {};
          if (n.onGoing == true || n.onGoing == false) {
            journeys[i].onJourney = false;
          }
          // journeys[i].travelledDay = moment().diff(moment("2016-10-17T06:49:44.536Z"), 'days');
          journeys[i].showRemainingCount = false;
          if (n.countryVisited.length >= 3) {
            journeys[i].showRemainingCount = true;
          }
          journeys[i].remainingCount = n.countryVisited.length - 3;
          i++;
        });
        callback(journeys, hasJourney);
      });
    },

    getOneJourney: function(formData, callback, errorCallback) {
      $http({
        url: adminURL + "/journey/getOneWeb",
        // url: "/demo.json",
        method: "POST",
        // method: "GET",
        data: formData
      }).success(function(data) {
        var journey = data.data;
        // header integration starts
        journey.kindOfJourneyIconsAddr = [];
        journey.buddiesCount = journey.buddies.length;
        journey.showRemainingCount = false;
        if (journey.buddiesCount >= 4) {
          journey.showRemainingCount = true;
          journey.remainingCount = journey.buddiesCount - 3;
        }
        if (journey.buddiesCount == 1) {
          journey.buddiesString = journey.buddies[0].name.bold();
        } else if (journey.buddiesCount == 2) {
          journey.buddiesString = journey.buddies[0].name.bold() + " and " + journey.buddies[1].name.bold();
        } else if (journey.buddiesCount >= 2) {
          journey.buddiesString = journey.buddies[0].name.bold() + " and " + (journey.buddiesCount - 1) + " others ";
        }
        journey.startJourneyString = "Trip Travellers-" + " " + journey.user.name.bold() + " with " + journey.buddiesString;
        // header integration ends
        callback(journey);
      })
    },
    editJourneyName: function(formData, callback) {
      $http({
        url: adminURL + "/journey/editData",
        method: "POST",
        data: formData
      }).success(function(data) {
        callback(formData.name)
      });
    },
    rateThisCountry: function(formData, callback) {
      $http({
        url: adminURL + "/review/saveWeb",
        method: "POST",
        data: formData
      }).success(callback);
    },
    getTripSummary: function(formData, callback) {
      $http({
        url: adminURL + "/journey/getCountData",
        method: "POST",
        data: formData
      }).success(function(data) {
        callback(data.data);
      });
    },
    getJourneyCoverPhoto: function(formData, callback) {
      $http({
        url: adminURL + "/journey/getCountDataWeb",
        method: "POST",
        data: formData
      }).success(function(data) {
        callback(data.data);
      });
    },
    setJourneyCoverPhoto: function(formData, callback) {
      $http({
        url: adminURL + "/journey/editData",
        method: "POST",
        data: formData
      }).success(function(data) {
        console.log(data);
        callback();
      });
    },
    updateBannerDateTime: function(formData, callback) {
      $http({
        url: adminURL + "/journey/editData/",
        method: "POST",
        data: formData
      }).success(function(data) {
        callback();
      });
    },
    getPostsComment: function(id, callback) {
      var formData = {
        "_id": id
      };
      $http({
        url: adminURL + "/post/getPostCommentWeb",
        method: "POST",
        data: formData
      }).success(function(data) {
        callback(data);
      });
    },
    postComment: function(uniqueId, comment, type, postId, callback) {
      var formData = {
        "uniqueId": uniqueId,
        "text": comment,
        "type": type,
        "post": postId
      };
      $http({
        url: adminURL + "/comment/addCommentWeb",
        method: "POST",
        data: formData
      }).success(function(data) {
        formData = {
          "_id": postId
        }
        $http({
          url: adminURL + "/post/getPostCommentWeb",
          method: "POST",
          data: formData
        }).success(function(data) {
          callback(data);
        });
      });

    }
  };
});

ongojourney.directive('journeyPost', ['$http', '$filter', '$timeout', '$uibModal', 'OnGoJourney','LikesAndComments', function($http, $filter, $timeout, $uibModal, OnGoJourney, LikesAndComments) {
  return {
    restrict: 'E',
    scope: {
      ongo: "=post",
      json: "=json",
      profile: "=profile",
      getCommentsData: '&'
    },
    // controller: 'OnGoJourneyCtrl',
    templateUrl: 'views/directive/journey-post.html',
    link: function($scope, element, attrs) {
      // var counter = 0
      $scope.flexShow = true;
      $scope.indexPhotoCaption = -1;
      $scope.indexVideoCaption = -1;
      $scope.indexEditPhotoCap = -1;
      $scope.indexEditVideoCap = -1;
      $scope.index = 0;
      $scope.changeImage = function(index) {
        $scope.index = index;
      };
      var getLocation = {};
      $scope.otgPhoto = [];
      $scope.otgPhotoArray = [];
      $scope.editedPhotosArr = [];
      $scope.checkInData = {};
      $scope.newBuddies = [];
      $scope.ongo.getSearchedList="";
      $scope.ongo.buddiesCount=0;
      if ($scope.ongo.checkIn && $scope.ongo.checkIn.location) {
        $scope.checkInData = _.cloneDeep($scope.ongo.checkIn);
      }
      var y = 1;
      var makePostString = function() {
       if($scope.ongo.buddies) {
         $scope.ongo.buddiesCount = $scope.ongo.buddies.length;
       }
        $scope.ongo.buddiesString = "";
        if ($scope.ongo.buddiesCount == undefined) {

        } else if ($scope.ongo.buddiesCount == 1) {
          $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold();
        } else if ($scope.ongo.buddiesCount == 2) {
          $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold() + " and " + $scope.ongo.buddies[1].name.bold();
        } else if ($scope.ongo.buddiesCount >= 2) {
          $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold() + " and " + "<b>" + ($scope.ongo.buddiesCount - 1) + " others." + "</b>";
        }
        var postString = "";

        // $filter('category')($scope.ongo.checkIn.category) +
        if ($scope.ongo.buddiesString != "") {
          if ($scope.ongo.thoughts && $scope.ongo.checkIn.location) {
            $scope.ongo.postString = $scope.ongo.thoughts + " with " + $scope.ongo.buddiesString + " at " + $scope.ongo.checkIn.location.bold();
          } else if ($scope.ongo.thoughts) {
            $scope.ongo.postString = $scope.ongo.thoughts + " with " + $scope.ongo.buddiesString;
          } else if ($scope.ongo.checkIn && $scope.ongo.checkIn.location) {
            $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString + " at " + $scope.ongo.checkIn.location.bold();
          } else {
            $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString;
          }
        } else {
          if ($scope.ongo.thoughts && $scope.ongo.checkIn.location) {
            $scope.ongo.postString = $scope.ongo.thoughts + " at " + $scope.ongo.checkIn.location.bold();
          } else if ($scope.ongo.thoughts) {
            $scope.ongo.postString = $scope.ongo.thoughts;
          } else if ($scope.ongo.checkIn && $scope.ongo.checkIn.location) {
            $scope.ongo.postString = $scope.ongo.user.name.bold() + " at " + $scope.ongo.checkIn.location.bold();
          } else {
            $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString;
          }
        }
      }


      $scope.getTimes = function(n, type) {
        if (type == "marked") {
          n = parseInt(n);
          return new Array(n);
        } else if (type == "unmarked") {
          n = parseInt(n);
          var remainCount = 5 - n;
          return new Array(remainCount);
        }
      };
      $scope.ongo.journeyTypeicon = "";

      // type of post starts
      $scope.ongo.typeOfPost = "";
      if ($scope.ongo && $scope.ongo.checkIn && $scope.ongo.checkIn.location) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/location.png";
        $scope.ongo.typeOfPost = 'checkIn';
      } else if ($scope.ongo && $scope.ongo.photos && $scope.ongo.photos.length != 0) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/camera.png";
        $scope.ongo.typeOfPost = 'photo';
      } else if ($scope.ongo && $scope.ongo.videos && $scope.ongo.videos.length != 0) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/video.png";
        $scope.ongo.typeOfPost = 'video';
      } else if ($scope.ongo && $scope.ongo.thoughts) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/thought.png";
        $scope.ongo.typeOfPost = 'thought';
      }
      // type of post ends
      makePostString();

      $scope.likePost = function(uniqueId,_id) {
        console.log($scope.ongo.likeDone+"this call is from journey-post.html");
        $scope.ongo.likeDone = !$scope.ongo.likeDone;
        if ($scope.ongo.likeDone) {
          if($scope.ongo.likeCount==undefined){
            $scope.ongo.likeCount=1;
          }else{
            $scope.ongo.likeCount = $scope.ongo.likeCount + 1;
          }
          LikesAndComments.likeUnlike("post","like",uniqueId,_id,null)
        } else {
          $scope.ongo.likeCount = $scope.ongo.likeCount - 1;
          LikesAndComments.likeUnlike("post","unlike",uniqueId,_id,null)
        }
      };

      $scope.getLikes = function(id) {
        var formData = {
          "_id": id
        }
        $http({
          url: adminURL + "/post/getPostLikes",
          method: "POST",
          data: formData
        }).success(function(data) {
          $scope.listOfLikes = data.data;
        });
      };

      $scope.likePhoto=function(uniqueId,_id,additionalId){
        console.log(uniqueId,_id,additionalId);
         $scope.listOfComments.likeDone = !$scope.listOfComments.likeDone;
        if ($scope.listOfComments.likeDone) {
          if($scope.listOfComments.likeCount==undefined){
            $scope.listOfComments.likeCount=1;
          }else{
            $scope.listOfComments.likeCount = $scope.listOfComments.likeCount + 1;
          }
          LikesAndComments.likeUnlike("photo","like",uniqueId,_id,additionalId)
        } else {
          $scope.listOfComments.likeCount = $scope.listOfComments.likeCount - 1;
          LikesAndComments.likeUnlike("photo","unlike",uniqueId,_id,additionalId)
        }
      };

      //post comments starts

      //post comments ends
      // geo location
      $scope.showLocation = false;
      $scope.viewLocation = function() {
        $http({
          url: adminURL + "/post/placeSearch",
          method: "POST",
          data: {
            lat: getLocation.latitude,
            long: getLocation.longitude
          }
        }).success(function(location) {
          console.log("geolocationdtata", location);
          $scope.nearByLocation = location.data;
        });
      };
      $scope.getLocation = function() {
        if ($scope.ongo.checkIn.location !== "") {
          $scope.showLocation = true;
          $http({
            url: adminURL + "/post/checkInPlaceSearch",
            method: "POST",
            data: {
              lat: getLocation.latitude,
              long: getLocation.longitude,
              search: $scope.ongo.checkIn.location
            }
          }).success(function(location) {
            _.each(location.data, function(o) {
              o.name = o.description.split(",")[0]
            });
            $scope.nearByLocation = location.data;
          });
        } else {
          $scope.ongo.checkIn.category = "";
          $scope.viewLocation();
        }

      };
      $scope.locationId = function(id) {
          console.log(id);
          $http({
            url: adminURL + "/post/getGooglePlaceDetail",
            method: "POST",
            data: {
              placeId: id.place_id
            }
          }).success(function(locationData) {
            // $scope.locationDetail = locationData.data;
            // console.log(locationData);
            $scope.ongo.checkIn = {
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

      $scope.showCategory = false;
      $scope.viewCategory = function() {
        if ($scope.showCategory == false && $scope.ongo.checkIn.location !== "") {
          $scope.showCategory = true;
        } else {
          $scope.showCategory = false;
        }
      }

      // add photo videos otg
      $scope.addPhotosVideo = function() {
        modal=$uibModal.open({
          animation: true,
          templateUrl: "views/modal/add-photo-video.html",
          backdropClass: "review-backdrop",
          size: "lg",
          scope: $scope,
        })
        console.log($scope.ongo, "add wala");
        modal.closed.then(function(){
          $scope.otgPhotoArray=[];
          $scope.photoSec=false;
        });
      };
      // add photo videos otg end
      // edit otg

      // $scope.otgPhoto = _.chunk([$scope.otgPhoto],2);
      // add photos and video
      $scope.photoSec = false;
      $scope.addOtgPhotos = function(detail, length) {
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
            $timeout(function() {
              $scope.flexShow = true;
            }, 200)
          // } else {
          //   y++;
          // }
        }
        // add photos and video end
        // delete added photos
      $scope.deletePhotos = function(name) {
          $scope.flexShow = false;
          _.remove($scope.otgPhoto, function(n) {
            return n.name === name;
          })
          $scope.otgPhotoArray = $scope.otgPhoto;
          $scope.otgPhotoArray = _.chunk($scope.otgPhotoArray, 4);
          for (var i = 0; i < $scope.otgPhotoArray.length; i++) {
            $scope.otgPhotoArray[i] = _.chunk($scope.otgPhotoArray[i], 2);
          }
          $timeout(function() {
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
      $scope.savePhotosVideos = function() {
          // console.log(photos,uniqueId);
          var formData = {
            type: "addPhotosVideos",
            photosArr: $scope.otgPhoto,
            videosArr: [],
            uniqueId: $scope.ongo.uniqueId
          }
          $http({
            url: adminURL + "/post/editDataWeb",
            method: "POST",
            data: formData
          }).success(function(data) {
            console.log(data);
            if (data.value === true) {
              $scope.ongo.photos = _.concat($scope.ongo.photos, $scope.otgPhoto);
            }
            $scope.otgPhoto = [];
            $scope.otgPhotoArray = [];
          });
        }
        // edit otg start
        // tag friend list
      $scope.viewListFriend = false;
      $scope.listTagfriend = function() {
          if ($scope.ongo.getSearchedList.length > 3) {
            $scope.viewListFriend = true;
            $http({
              url: adminURL + "/user/searchBuddyWeb",
              method: "POST",
              data: {
                "search": $scope.ongo.getSearchedList
              }
            }).success(function(data) {
              console.log(data.data);
              $scope.tagFriends = data.data;
              _.each($scope.tagFriends, function(n) {
                var buddyIndex = _.findIndex($scope.ongo.buddies, function(m) {
                  return m._id === n._id;
                });
                if (buddyIndex !== -1) {
                  n.checked = true;
                  n.noEdit = "un-tag";
                  $("#" + n._id).prop('disabled', true);
                } else {
                  n.checked = false;
                }
                var checkedIndex = _.findIndex($scope.ongo.buddies, function(z) {
                  return z.taggedFriend === true;
                });
                if (checkedIndex !== -1) {
                  $("#" + n._id).prop('disabled', false);
                  n.noEdit = "";
                }
              });
            })
          } else {
            console.log($scope.newBuddies,'total-array');
            $scope.viewListFriend = false;
          }
        }
        // tag friend list end

        $scope.editTagFriends = function(list) {
          var getBuddy = _.findIndex($scope.newBuddies, function(id) {
            return id._id === list._id;
          });
          console.log(getBuddy);
          if (getBuddy === -1) {
            $scope.ongo.buddies.push({
              _id: list._id,
              name: list.name,
              email: list.email,
              profilePicture: list.profilePicture,
              taggedFriend: true,
            });
            console.log($scope.ongo.buddies, "buddies ka list");
            $scope.newBuddies.push({
              _id: list._id,
              name: list.name,
              email: list.email
            })
            $scope.ongo.buddiesCount = $scope.ongo.buddiesCount + 1;
            console.log($scope.newBuddies, "new buddies");
          } else {
            _.remove($scope.newBuddies, function(newId) {
              return newId._id === list._id;
            });
            _.remove($scope.ongo.buddies, function(newId) {
              return newId._id === list._id;
            })
            $scope.ongo.buddiesCount = $scope.ongo.buddiesCount - 1;
          }
          $scope.viewListFriend = false;
          list.checked = "";
          $scope.ongo.getSearchedList = "";
        }

      // photos array edit
      $scope.addMoreCaption = function(index) {
          if ($scope.indexPhotoCaption === index) {
            $scope.indexPhotoCaption = -1;
          } else {
            $scope.indexPhotoCaption = index;
          }
        }
        // photos array edit end
        // show direction nav arrow
      $scope.otgPhoto = [];
      setTimeout(function() {
        if ($scope.otgPhoto.length > 1) {
          $(".flexslider").flexslider({
            directionNav: false
          });
        } else {
          $(".flexslider").flexslider({
            directionNav: true
          });
        }
      }, 1000);
      // show direction nav arrow end

      // photos array edit end
      // video array
      $scope.videoOtg = [{
        img: 'img/ongojourney/andrea-santa.jpg'
      }, {
        img: 'img/ongojourney/fire.jpg'
      }, {
        img: 'img/ongojourney/window.jpg'
      }, {
        img: 'img/ongojourney/winter.jpg'
      }, {
        img: 'img/ongojourney/jitu-sofa.jpg'
      }, ];
      $scope.indexVideoCaption = -1;
      $scope.addVideoCaption = function(index) {
          if ($scope.indexVideoCaption == index) {
            $scope.indexVideoCaption == -1;
            console.log(indexVideoCaption);
          } else {
            $scope.indexVideoCaption = index;
          }
        }
        // video array end
        // edit otg end
        // checkin
      var modal = "";
      // edit otg checkin
      $scope.editCheckIn = function() {
        $scope.alreadyTagFrnd = true;
        modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/edit-otg.html",
          size: "lg",
          scope: $scope,
          backdropClass: "review-backdrop"
        });
        console.log("abc", $scope.ongo);

        // geo location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(geoLocation) {
            getLocation = geoLocation.coords;
          });
        } else {
          console.log("navigator.geolocation not supported");
        }
        // geo location end
      }

      // edit more caption
      $scope.editMoreCaption = function(index) {
        if ($scope.indexEditPhotoCap === index) {
          $scope.indexEditPhotoCap = -1;
        } else {
          $scope.indexEditPhotoCap = index;
        }
      };
      // edit more caption end
      $scope.photosArray = _.cloneDeep($scope.ongo.photos);
      $scope.photosArray = _.chunk($scope.photosArray, 4);
      for (var i = 0; i < $scope.photosArray.length; i++) {
        $scope.photosArray[i] = _.chunk($scope.photosArray[i], 2);
        // console.log($scope.photosArray[i + 'row'] = _.chunk($scope.photosArray[i + 'col'], 2));
      }

      $scope.removeEditPic = function(id) {
        $scope.flexShow = false;
        _.remove($scope.ongo.photos, function(editPic) {
          return editPic._id === id;
        });
        $scope.photosArray = $scope.ongo.photos;
        $scope.photosArray = _.chunk($scope.photosArray, 4);
        for (var i = 0; i < $scope.photosArray.length; i++) {
          $scope.photosArray[i] = _.chunk($scope.photosArray[i], 2);
          // console.log($scope.photosArray[i + 'row'] = _.chunk($scope.photosArray[i + 'col'], 2));
        }
        $timeout(function() {
          $scope.flexShow = true;
        }, 100);
        console.log($scope.photosArray, "new array");
      }

      // caption edit
      $scope.editCaption = function(columndata) {
          var editIndex = _.findIndex($scope.ongo.photos, function(j) {
            return j._id === columndata._id;
          });
          $scope.ongo.photos[editIndex].caption = columndata.caption;
        }
        // caption edit end

      // edit save data
      $scope.saveEditOtg = function() {
          // get photos id
          $scope.photosId = _.map($scope.ongo.photos, "_id");
          // get photos id end

          var editedData = {
            thoughts: $scope.ongo.thoughts,
            checkIn: $scope.ongo.checkIn,
            checkInChange: true,
            journeyUniqueId: $scope.json.uniqueId,
            "uniqueId": $scope.ongo.uniqueId,
            "_id": $scope.ongo._id,
            photos: $scope.photosId,
            videos: [],
            buddiesArr: $scope.newBuddies,
            hashtag: [],
            addHashtag: [],
            removeHashtag: [],
            photosArr: $scope.ongo.photos,
            videosArr: [],
            type: "editPost"
          }
          if ($scope.ongo.checkIn && $scope.ongo.checkIn.lat && $scope.ongo.checkIn.long && $scope.ongo.checkIn.category && $scope.ongo.checkIn.location) {
            if ($scope.checkInData.lat && $scope.checkInData.long) {
              if ($scope.ongo.checkIn.lat === $scope.checkInData.lat && $scope.ongo.checkIn.long === $scope.checkInData.long) {
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
            url: adminURL + "/post/editDataWeb",
            method: "POST",
            data: editedData,
          }, function(data) {
            $scope.getNewData = data.data;
            $scope.editedData = {};
            console.log($scope.getNewData, "new edit data");
            console.log($scope.editedData, "edit ka data");
          })
        }
        // edit save data end
        // edit otg checkin end

      //////////////////////////////////
      $scope.uploadImage = true;
      $scope.viewUploadedImg = false;
      $scope.previewFile = function(val) {
        var interval = $interval(function() {
          var preview = document.getElementById('img' + (val));
          console.log('img' + (val)); 
          var file   = document.getElementById('upload' + (val)).files[0];
          console.log(preview);
          console.log(file);
          var reader  = new FileReader();
          reader.addEventListener("load", function() {  
            preview.src = reader.result; 
          }, false);
          if (file) {  
            $scope.uploadImage = false;
            $scope.viewUploadedImg = true;
            reader.readAsDataURL(file);
            $interval.cancel(interval);
          }
        }, 1000);
      };
      $scope.returnUpload = function() {
        $scope.viewUploadedImg = false;
        $scope.uploadImage = true;
      };
      $scope.checkinUpload = [{}, {}, {}];
      ////////////////////////////
      $scope.editOption = function(model) {
        $timeout(function() {
          model.backgroundClick = true;
          backgroundClick.object = model;
        }, 200);

        backgroundClick.scope = $scope;
      };

      $scope.time = {};
      $scope.datetime = {};
      $scope.options = { showWeeks : false };
      $scope.changeDate = function() {
        $scope.isPostDate = true;
        $scope.isBannerDate = false;
        console.log($scope.isPostDate, $scope.isBannerDate);
        date = $scope.ongo.UTCModified;
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
        $uibModal.open({
          animation: true,
          templateUrl: "views/modal/date-time.html",
          scope: $scope,
          backdropClass: "review-backdrop",
        })
      };

      $scope.updateDateTime = function(id, formData, dt) {
        console.log(dt);
        console.log(formData, dt);
        var date = $filter('formatDateCalender')(dt);
        var time = $filter('formatTimeCalender')(formData);
        var result = {};
        console.log(date);
        console.log(time);
        result.type = "changeDateTime";
        result.date = new Date(date + " " + time);
        result.uniqueId = id;
        $http({
          url: adminURL + "/post/editDataWeb/",
          method: "POST",
          data: result
        }).success(function(data) {
          var formData = {
            "urlSlug": $scope.json.urlSlug
          }
          OnGoJourney.getOneJourney(formData, function(journeys) {
            $scope.json.post = journeys.post;
          }, function(err) {
            console.log(err);
          });
        });
      };

      $scope.hours = _.range(1, 13, 1);
      $scope.mins = _.range(1, 60, 1);
      $scope.change = function(id, val) {
        if (id == 'hour') {
          $scope.time.hour = val;
        } else if (id == 'min') {
          $scope.time.min = val;
        } else {
          $scope.time.am_pm = val;
        }
      }

      $scope.deletePost = function(postId, journeyId) {
        console.log(postId, journeyId);
        var formData = {
          type: "deletePost",
          _id: postId,
          uniqueId: journeyId
        }
        console.log(formData);
        $http({
          url: adminURL + "/post/editDataWeb/",
          method: "POST",
          data: formData
        }).success(function() {
          console.log("deleted successfully");
          document.getElementById(postId).remove();
        }).error(function() {
          console.log("failed to delete");
        })
      }

      // review post visited pop up
      $scope.giveReview = function(checkin) {
        console.log(checkin, "location");
        $scope.checkIn = checkin;
        modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/review-post.html",
          scope: $scope,
          backdropClass: "review-backdrop"
        });
      };

      $scope.savePostReview = function(values) {
        var userData = $.jStorage.get("profile");
        var formData = {
          "post": $scope.ongo._id,
          "user": userData._id,
          "review": values.review,
          "rating": values.rating
        }
        $http({
          url: adminURL + "/review/save",
          method: "POST",
          data: formData
        }).success(function(data) {
          console.log(data);
          OnGoJourney.getOneJourney({
            "urlSlug": $scope.json.urlSlug
          }, function(journeys) {
            var post = _.find(journeys.post, ['_id', $scope.ongo._id]);
            $scope.ongo.review = post.review;
          }, function(err) {
            console.log(err);
          });

          modal.close();
        });
      };

      $scope.showRating = 1;
      $scope.fillColor = "";
      $scope.postReview = {};
      $scope.postReview.rating = 1;
      $scope.starRating = function(val) {
        $scope.postReview.rating = val;
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

      $scope.getPhotosCommentData = function(photoId) {
        console.log(photoId);
        modal=$uibModal.open({
          templateUrl: "views/modal/notify.html",
          animation: true,
          scope: $scope,
          windowClass: "notify-popup"
        });
        modal.closed.then(function () {
        $scope.listOfComments={};
      });
        var callback = function(data) {
          $scope.uniqueArr = [];
          $scope.listOfComments = data.data;
          console.log($scope.listOfComments);
          $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        };
        LikesAndComments.getComments("photo",photoId,callback);
      };

      $scope.postPhotosComment = function(uniqueId, comment, postId, photoId) {
        console.log(uniqueId, comment, postId, photoId);
        var type = "photo";
        var hashTag=[];
        var callback = function(data) {
          $scope.listOfComments = data.data;
          document.getElementById('enterComment').value = "";
        }
        LikesAndComments.postComment(type,uniqueId,postId,comment,hashTag,photoId,callback);
      };
    }
  }
}]);

ongojourney.filter('formatDateCalender', function() {
  return function(date) {

    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
  };
});


ongojourney.filter('formatTimeCalender', function() {
  return function(formData) {

    var hour = formData.hour,
      mins = formData.min,
      sec = 00;
    if (formData.am_pm == "AM") {
      if (hour == 12) {
        hour = 0;
      }
    } else if (formData.am_pm == "PM") {
      if (hour == 12) {
        hour = 12;
      } else {
        hour = parseInt(hour) + 12;
      }
    }
    return [hour, mins, sec].join(':');
  };
});


ongojourney.filter('formatDate', function() {
  return function(input, type) {

    if (type == 'date') {
      var returnVal = moment(input).format('D MMM, YYYY');
    } else if (type == 'time') {
      var returnVal = moment(input).format('hh:mm a');
    } else if (type == 'year') {
      var returnVal = moment(input).format('YYYY');
    }
    return returnVal;
  };
});

ongojourney.filter('dateDifference', function() {
  return function(current, previous) {
    if (current == "current") {
      current = Date();
    }

    var a = moment(current).format('DD/MM/YYYY'); //will remove time from date
    var b = moment(previous).format('DD/MM/YYYY'); //will remove time from date

    current = moment(a, 'DD/MM/YYYY'); //will convert date to a "moment format" for applying moments "diff" function
    previous = moment(b, 'DD/MM/YYYY'); //will convert date to a "moment format" for applying moments "diff" function

    var days = current.diff(previous, 'days') + 1;
    // var returnVal = moment(current).diff(moment(previous), 'days')+1;
    return days;
  };
});

ongojourney.filter('small', function() {
  return function(str) {
    if (str != undefined) {
      var n = str.indexOf("/");
      if (n != -1) {
        str = str.split("size=600x400").join("size=800x600");
        return str;
      } else {
        return str;
      }
    }
  }
});

firstapp.filter('category', function() {
  return function(input) {
    var returnVal = "";
    switch (input) {
      case "Restaurants & Bars":
        returnVal = "img/icons/resto.png";
        break;
      case "Nature & Parks":
        returnVal = "img/icons/smallnature.png";
        break;
      case "Sights & Landmarks":
        returnVal = "img/icons/smallsight.png";
        break;
      case "Museums & Galleries":
        returnVal = "img/icons/smallmuseums.png";
        break;
      case "Adventure & Excursions":
        returnVal = "img/icons/smalladventure.png";
        break;
      case "Zoo & Aquariums":
        returnVal = "img/icons/smallzoos.png";
        break;
      case "Events & Festivals":
        returnVal = "img/icons/smallevents.png";
        break;
      case "Shopping":
        returnVal = "img/icons/smallshopping.png";
        break;
      case "Beaches":
        returnVal = "img/icons/beach.png";
        break;
      case "Religious":
        returnVal = "img/icons/smallreligious.png";
        break;
      case "Cinema & Theatres":
        returnVal = "img/icons/smallcinema.png";
        break;
      case "Hotels & Accomodations":
        returnVal = "img/icons/smallhotels.png";
        break;
      case "Transportation":
        returnVal = "img/icons/smallairport.png";
        break;
      case "Others":
        returnVal = "img/icons/smallothers.png";
        break;
      case "Other":
        returnVal = "img/icons/smallothers.png";
        break;
      default:
        returnVal = "img/icons/smallothers.png";
        break;
    }
  };
});

ongojourney.filter('singularOrPlural', function() {
  return function(count,flag) {
    if(flag=='like'){
      if(count==1){
        return "Like";
      }else{
        return "Likes";
     }
    }else if(flag=='comment'){
       if(count==1){
        return "Comment";
      }else{
        return "Comments";
     }
    }
  }
});

ongojourney.filter('filterCount', function() {
  return function(count){
    if(count==undefined){
        return 0;
    }else{
      return count;
    }
  }
});
