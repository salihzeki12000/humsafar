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
viewlocalLife.directive('postLocalLife', ['$http','localLife','LikesAndComments', function ($http, localLife, LikesAndComments) {
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
      // filters end
    }
  }
}]);
