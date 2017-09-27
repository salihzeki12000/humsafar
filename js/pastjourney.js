var pastJourney = angular.module('pastjourney',[]);

pastJourney.factory('pastJourney', function(TravelibroService, $filter){
	return{
		getPastJourney : function(formData, callback, errorCallback){
			TravelibroService.http({
				url: adminURL + '/journey/getOneWeb',
				method: "POST",
				data: formData
			}).success(function(data){
				callback(data.data);
			}).error(function(data){
				console.log(data);
			})
		}
	}
});
pastJourney.directive('pastJourneyCard',['$http',function($http){
	return{
		restrict : 'E',
		scope: {
			pastJourneyArray : "=json",
			pastStory: "=post"
		},
		templateUrl: 'views/directive/pastjourney-post.html',
		link : function($scope, element, attrs){
			$scope.index = 0;
			$scope.pastStory.buddiesCount = 0;

			// poststring
			var makePostString = function(){
				if($scope.pastStory.buddies){
					$scope.pastStory.buddiesCount = $scope.pastStory.buddies.length;
				}
				$scope.pastStory.buddiesString = "";
				if($scope.pastStory.buddiesCount == undefined){

				}else if($scope.pastStory.buddiesCount == 1){
					$scope.pastStory.buddiesString = "<a href='/users/" + $scope.pastStory.buddies[0].urlSlug + "'>" + $scope.pastStory.buddies[0].name.bold() + "</a>";
				}else if($scope.pastStory.buddiesCount == 2){
					$scope.pastStory.buddiesString = "<a href='/users/" + $scope.pastStory.buddies[0].urlSlug + "'>" + $scope.pastStory.buddies[0].name.bold() + "</a>" + " and " + "<a href='/users/" + $scope.pastStory.buddies[1].urlSlug + "'>" + $scope.pastStory.buddies[1].name.bold() + "</a>";
				}else if($scope.pastStory.buddiesCount > 2){
					$scope.pastStory.buddiesString = "<a href='/users/" + $scope.pastStory.buddies[0].urlSlug + "'>" + $scope.pastStory.buddies[0].name.bold() + "</a>" + " and " + "<b>" + ($scope.pastStory.buddiesCount - 1) + " others." + "</b>";
				}
				var postString = "";
				if ($scope.pastStory.buddiesString != "") {
          if ($scope.pastStory.thoughts && $scope.pastStory.checkIn.location) {
            $scope.pastStory.postString = $scope.pastStory.thoughts + " with " + $scope.pastStory.buddiesString + " at " + $scope.pastStory.checkIn.location.bold();
          } else if ($scope.pastStory.thoughts) {
            $scope.pastStory.postString = $scope.pastStory.thoughts + " with " + $scope.pastStory.buddiesString;
          } else if ($scope.pastStory.checkIn && $scope.pastStory.checkIn.location) {
            $scope.pastStory.postString = "<a href='/users/" + $scope.pastStory.user.urlSlug + "'>" + $scope.pastStory.user.name.bold() + "</a>" + " with " + $scope.pastStory.buddiesString + " at " + $scope.pastStory.checkIn.location.bold();
          } else {
            $scope.pastStory.postString = "<a href='/users/" + $scope.pastStory.user.urlSlug + "'>" + $scope.pastStory.user.name.bold() + "</a>" + " with " + $scope.pastStory.buddiesString;
          }
        } else {
          if ($scope.pastStory.thoughts && $scope.pastStory.checkIn.location) {
            $scope.pastStory.postString = $scope.pastStory.thoughts + " at " + $scope.pastStory.checkIn.location.bold();
          } else if ($scope.pastStory.thoughts) {
            $scope.pastStory.postString = $scope.pastStory.thoughts;
          } else if ($scope.pastStory.checkIn && $scope.pastStory.checkIn.location) {
            $scope.pastStory.postString = "<a href='/users/" + $scope.pastStory.user.urlSlug + "'>" + $scope.pastStory.user.name.bold() + "</a>" + " at " + $scope.pastStory.checkIn.location.bold();
          } else {
            $scope.pastStory.postString = "";
          }
        }
			}
			if ($scope.pastStory && $scope.pastStory.photos && $scope.pastStory.videos) {
        $scope.pastStory.photosVideos = $scope.pastStory.videos.concat($scope.pastStory.photos);
        if ($scope.pastStory && $scope.pastStory.photosVideos[0] && $scope.pastStory.photosVideos[0].thumbnail) {
          $scope.pastStory.onDisplay = "videos";
        } else {
          $scope.pastStory.onDisplay = "photos";
        }
      }
			makePostString();			
			// poststring end
		}
	};
}])