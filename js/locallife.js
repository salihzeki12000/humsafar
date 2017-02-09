var viewlocalLife = angular.module('locallife',[])
.factory('localLife',function($http){
  return{
    getLocalJourney: function(callback,localData, errorCallback){
      console.log(localData,'data kya hai');
      $http({
        url: adminURL + "/journey/myLocalLifeWeb",
        method: "POST",
        data: {
          "type": localData.type,
          "pagenumber": localData.pagenumber,
          "month": localData.month,
          "year": localData.year,
          // "categories": localData.checkInType,
          "categories": [],
          "photos": localData.photos,
          "videos": localData.videos,
          "thoughts": localData.thoughts,
          // "rating": localData.rating
          "rating": []
        }
      }).success(function(data){
        var localLifeData = data;
        callback(localLifeData);
        console.log(localLifeData,'localLife');
      });
    }
  }
});
viewlocalLife.directive('postLocalLife', ['$http','$uibModal','localLife','LikesAndComments', function ($http, $uibModal, localLife, LikesAndComments) {
  return {
    restrict: 'E',
    scope: {
      localongo: "=ongolocal"
    },
    templateUrl: 'views/directive/local-post.html',
    link: function ($scope, element, attrs){
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
        console.log($scope.localongo.photosVideos,'localPhotoVideo');
        if ($scope.localongo && $scope.localongo.photosVideos[0] && $scope.localongo.photosVideos[0].thumbnail) {
          $scope.localongo.onDisplay = "videos";
        } else {
          $scope.localongo.onDisplay = "photos";
        }
      }
      // concating of photos & video of life end
      // localpost like and unlike
      $scope.likeLocalPost = function (uniqueId, _id) {
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
      // view by month
      $scope.viewByMonth = function(month){
        // console.log(month,'month');
        // var monthStr = month;
        // var getStrSplit = monthStr.split(',');
        // console.log(getStrSplit,'split');
        // console.log(getStrSplit[0]);
        var getMonthNo = moment(month.split(",")[0],"MMMM").format('M');
        console.log(getMonthNo);
      };
      // view by month end
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
        // $scope.localPostReview.rating = localPost.review[0].rating;
        // $scope.showRating = localPost.review[0].rating;
        console.log($scope.localPostReview.rating,'kya che rating');
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
      }
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
    }
  }
}]);
