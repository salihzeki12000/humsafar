var pastJourney = angular.module('pastjourney',[]);

pastJourney.factory('pastJourney', function(TravelibroService, $filter){
	return{
		getPastJourney : function(formData, callback, errorCallback){
			TravelibroService.http({
				url: adminUrl + '/journey/getOneWeb',
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
		scope: {},
		templateUrl: 'views/directive/pastjourney-post.html',
		link : function($scope, element, attrs){

		}
	};
}])