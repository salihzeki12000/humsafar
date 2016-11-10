var ongojourney = angular.module('ongojourney', [])

.factory('OnGoJourney', function ($http, $filter) {

  return {
    getAllJourney: function (callback, errorCallback) {
      $http({
        url: adminURL + "/journey/getAll",
        method: "POST"
      }).success(function (data) {
        var journeys = data.data;

        var i = 0;
        _.each(journeys, function (n) {
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
        callback(journeys);
      });
    },

    getOneJourney: function (formData, callback, errorCallback) {
      $http({
        url: adminURL + "/journey/getOneWeb",
        // url: "/demo.json",
        method: "POST",
        // method: "GET",
        data: formData
      }).success(function (data) {
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
        journey.startJourneyString = journey.startLocation + " " + $filter('formatDate')(journey.startTime, 'year') + " " + journey.user.name.bold() + " with " + journey.buddiesString;
        // header integration ends
        callback(journey);
      })
    },
    editJourneyName: function (formData, callback) {
      $http({
        url: adminURL + "/journey/editData",
        method: "POST",
        data: formData
      }).success(function (data) {
        callback(formData.name)
      });
    },
    rateThisCountry: function (formData,callback) {
      $http({
        url: adminURL + "/review/saveWeb",
        method: "POST",
        data: formData
      }).success(callback);
    },
    getTripSummary: function (formData, callback) {
      $http({
        url: adminURL + "/journey/getCountData",
        method: "POST",
        data: formData
      }).success(function (data) {
        callback(data.data);
      });
    },
    getJourneyCoverPhoto: function (formData, callback) {
      $http({
        url: adminURL + "/journey/getCountDataWeb",
        method: "POST",
        data: formData
      }).success(function (data) {
        callback(data.data);
      });
    },
    setJourneyCoverPhoto: function (formData, callback) {
      $http({
        url: adminURL + "/journey/editData",
        method: "POST",
        data: formData
      }).success(function (data) {
        console.log(data);
        callback();
      });
    }
  };
});

ongojourney.directive('journeyPost', ['$http', '$filter', '$timeout', '$uibModal', 'OnGoJourney', function ($http, $filter, $timeout, $uibModal, OnGoJourney) {
  return {
    restrict: 'E',
    scope: {
      ongo: "=post",
      json: "=json",
      profile: "=profile"
    },
    templateUrl: 'views/directive/journey-post.html',
    link: function ($scope, element, attrs) {
      // console.log($scope.ongo);
      var modal="";
      $scope.ongo.journeyTypeicon = "";
      // type of post starts
      $scope.ongo.typeOfPost = "";
      if ($scope.ongo && $scope.ongo.checkIn && $scope.ongo.checkIn.location) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/location.png";
        $scope.ongo.typeOfPost = 'checkIn';
      } else if ($scope.ongo && $scope.ongo.photos.length != 0) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/camera.png";
        $scope.ongo.typeOfPost = 'photo';
      } else if ($scope.ongo && $scope.ongo.videos.length != 0) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/video.png";
        $scope.ongo.typeOfPost = 'video';
      } else if ($scope.ongo && $scope.ongo.thoughts) {
        $scope.ongo.journeyTypeicon = "img/ongojourney/thought.png";
        $scope.ongo.typeOfPost = 'thought';
      }
      // type of post ends

      //photos uploaded or not- starts 
      var lenOfPhotos = $scope.ongo.photos.length;
      $scope.ongo.journeyPhoto = false;
      $scope.ongo.viewRelatepic = false;
      $scope.ongo.relatedPhoto = false;
      if (lenOfPhotos == 1) {
        $scope.ongo.journeyPhoto = true;
      } else if ((lenOfPhotos > 0) && (lenOfPhotos <= 6)) {
        $scope.ongo.journeyPhoto = true;
        $scope.ongo.viewRelatepic = true;
      } else if (lenOfPhotos > 6) {
        $scope.ongo.journeyPhoto = true;
        $scope.ongo.relatedPhoto = true;
      }
      //photos uploaded or not- ends
      $scope.ongo.buddiesCount = $scope.ongo.buddies.length;
      $scope.ongo.buddiesString = "";
      if ($scope.ongo.buddiesCount == undefined) {

      } else if ($scope.ongo.buddiesCount == 1) {
        $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold();
      } else if ($scope.ongo.buddiesCount == 2) {
        $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold() + " and " + $scope.ongo.buddies[1].name.bold();
      } else if ($scope.ongo.buddiesCount >= 2) {
        $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold() + " and " + ($scope.ongo.buddiesCount - 1) + "others ";
      }
      var postString = "";

      // $filter('category')($scope.ongo.checkIn.category) +
      if ($scope.ongo.buddiesString != "") {
        if ($scope.ongo.thoughts && $scope.ongo.checkIn.location) {
          $scope.ongo.postString = $scope.ongo.thoughts.bold() + " with " + $scope.ongo.buddiesString + " at " + $scope.ongo.checkIn.location.bold();
        } else if ($scope.ongo.thoughts) {
          $scope.ongo.postString = $scope.ongo.thoughts.bold() + " with " + $scope.ongo.buddiesString;
        } else if ($scope.ongo.checkIn && $scope.ongo.checkIn.location) {
          $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString + " at " + $scope.ongo.checkIn.location.bold();
        } else {
          $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString;
        }
      } else {

        if ($scope.ongo.thoughts && $scope.ongo.checkIn.location) {
          $scope.ongo.postString = $scope.ongo.thoughts.bold() + " at " + $scope.ongo.checkIn.location.bold();
        } else if ($scope.ongo.thoughts) {
          $scope.ongo.postString = $scope.ongo.thoughts.bold();
        } else if ($scope.ongo.checkIn && $scope.ongo.checkIn.location) {
          $scope.ongo.postString = $scope.ongo.user.name.bold() + " at " + $scope.ongo.checkIn.location.bold();
        } else {
          $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString;
        }
      }

      $scope.likes = function (id) {
        $scope.ongo.likeDone = !$scope.ongo.likeDone;
        // var id = $scope.ongo.uniqueId;
        if ($scope.ongo.likeDone) {
          $scope.ongo.likeCount = $scope.ongo.likeCount + 1;
          var formData = {
            'uniqueId': id
          };
        } else {
          $scope.ongo.likeCount = $scope.ongo.likeCount - 1;
          var formData = {
            'uniqueId': id,
            'unlike': 'true'
          };
        }
        $http({
          url: adminURL + "/post/updateLikePostWeb",
          method: "POST",
          data: formData
        })
      };
      $scope.getLikes = function (id) {
        var formData = {
          "_id": id
        }
        $http({
          url: adminURL + "/post/getPostLikes",
          method: "POST",
          data: formData
        }).success(function (data) {
          $scope.listOfLikes = data.data;
        });
      }
      $scope.getComments = function (id) {
        var formData = {
          "_id": id
        };
        $http({
          url: adminURL + "/post/getPostCommentWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          $scope.uniqueArr = [];
          $scope.listOfComments = data.data;
          $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        });
      };
      $scope.postComment = function (id, comment) {
        var formData = {
          "uniqueId": id,
          "text": comment
        };
        $http({
          url: adminURL + "/post/addCommentWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          formData = {
            "_id": $scope.ongo._id
          }
          $http({
            url: adminURL + "/post/getPostCommentWeb",
            method: "POST",
            data: formData
          }).success(function (data) {
            $scope.listOfComments = data.data;
            document.getElementById('enterComment').value = "";
          });
        });

      };
      $scope.time = {};
      $scope.datetime = {};
      $scope.changeDate = function (date) {
        console.log(date);
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

      // checkin
    $scope.editCheckIn = function () {
      
      console.log("inside edit checkin of controlller");
      console.log($scope.ongo._id,$scope.ongo.uniqueId);
      $scope.editPost={};
      $scope.callback=function(data){
        console.log(data);
        var obj={
          "name":data.data[0],
              "caption":""
        }
        $scope.editPost.photosArr.push(obj);
      };
     $scope.editPost.photosArr=[];
     $scope.editPost.videosArr=[];
     $scope.editPost.newPhotosArr=[];
     $scope.editPost.newVideosArr=[];
      //$scope.editPost.buddiesArr=
    
      
     _.each($scope.ongo.photos,function(n,index){
       $scope.editPost.photosArr[index]=_.pick(n, ['_id', 'name','caption']);
     
     })
      console.log($scope.editPost); 
       $scope.listFriend = [{
      img: "img/profile.jpg",
      name: "Amit Verma"
    }, {
      img: "img/profile.jpg",
      name: "Vignesh Kasturi"
    }, {
      img: "img/profile.jpg",
      name: "Dhavel Gala"
    }, {
      img: "img/profile.jpg",
      name: "Pooja Thakre"
    }, {
      img: "img/profile.jpg",
      name: "Vinod Bhelose"
    }, {
      img: "img/profile.jpg",
      name: "Rishabh Katoch"
    }, ];     
      modal=$uibModal.open({
        animation: true,
        templateUrl: "views/modal/checkin.html",
        backdropClass: "review-backdrop",
        scope: $scope
      }).closed.then(function () {
        OnGoJourney.getOneJourney({
          "urlSlug": slug
        }, getOneJourney, function (err) {
          console.log(err);
        });
      });
    };

    $scope.saveEditedPost=function(){
      console.log($scope.editPost);
      var concatedArray=_.partition($scope.editPost.photosArr, '_id');
      var formData={
        "_id":$scope.ongo._id,
        "uniqueId":$scope.ongo.uniqueId,
        "buddiesArr":[],
        "photosArr":concatedArray[0],
        "videosArr":[],
        "newPhotosArr":concatedArray[1],
        "newVideosArr":[],
        "thoughts":$scope.ongo.thoughts,
        "type":"editPost"
      }
      console.log(formData);
      $http({
        url: adminURL + "/post/editDataWeb",
          method: "POST",
          data: formData
      }).success(function(){
        modal.close();
      });
    }

    $scope.deleteFromPhotoArr=function(name){
      console.log(name);
     $scope.editPost.photosArr= _.reject($scope.editPost.photosArr, ['name', name]);
     console.log($scope.editPost.photosArr);
    }


//////////////////////////////////
     $scope.uploadImage = true;
    $scope.viewUploadedImg = false;
    $scope.previewFile = function (val) {
      var interval = $interval(function () {
        var preview = document.getElementById('img' + (val));
        console.log('img' + (val)); 
        var file   = document.getElementById('upload' + (val)).files[0];
        console.log(preview);
        console.log(file);
        var reader  = new FileReader();
        reader.addEventListener("load", function () {  
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
    $scope.returnUpload = function () {
      $scope.viewUploadedImg = false;
      $scope.uploadImage = true;
    };
    $scope.checkinUpload = [{}, {}, {}];
////////////////////////////
      $scope.editOption = function (model) {

        $timeout(function () {
          model.backgroundClick = true;
          backgroundClick.object = model;
        }, 200);

        backgroundClick.scope = $scope;
      };
      $scope.notify = function () {
        $uibModal.open({
          templateUrl: "views/modal/notify.html",
          animation: true,
          scope: $scope,
          windowClass: "notify-popup"
        });
      }
      $scope.formData = {};

      $scope.updateDateTime = function (id, formData, dt) {
        console.log(dt);
        var date = formatDate(dt);
        var time = formatTime(formData);
        var result = {};
        result.type = "changeDateTime";
        result.date = new Date(date + " " + time);
        result.uniqueId = id;
        $http({
          url: adminURL + "/post/editDataWeb/",
          method: "POST",
          data: result
        }).success(function (data) {
          formData = {
            "_id": $scope.json._id
          }
          OnGoJourney.getOneJourney(formData, function (journeys) {
            $scope.json.post = journeys.post;
          }, function (err) {
            console.log(err);
          });
          // $http({
          //     url: adminURL + "/journey/getOneWeb",
          //     method: "POST",
          //     data: formData
          // }).success(function (data) {
          //     console.log(data);
          // });

        });
      }

      $scope.hours = _.range(1, 13, 1);
      $scope.mins = _.range(1, 60, 1);
      $scope.change = function (id, val) {
        if (id == 'hour') {
          $scope.time.hour = val;
        } else if (id == 'min') {
          $scope.time.min = val;
        } else {
          $scope.time.am_pm = val;
        }
      }

      $scope.deletePost = function (postId, journeyId) {
        console.log(postId, journeyId);
        var formData = {
          type: "deletePost",
          _id: postId,
          journey: journeyId
        }
        console.log(formData);
        $http({
          url: adminURL + "/post/editData/",
          method: "POST",
          data: formData
        }).success(function () {
          console.log("deleted successfully");
          document.getElementById(postId).remove();
        }).error(function(){
             console.log("failed to delete");
        })
      }

      var formatDate = function (date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('/');
      }

      var formatTime = function (formData) {
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
      }

    }


  }
}]);

ongojourney.filter('formatDate', function () {
  return function (input, type) {
    if (type == 'date') {
      var returnVal = moment(input).format('D MMM,YYYY');
    } else if (type == 'time') {
      var returnVal = moment(input).format('h:mm a');
    } else if (type == 'year') {
      var returnVal = moment(input).format('YYYY');
    }
    return returnVal;
  };
});

ongojourney.filter('dateDifference', function () {
  return function (current, previous) {
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

ongojourney.filter('small', function () {
  return function (str) {
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

firstapp.filter('category', function () {
  return function (input) {
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
