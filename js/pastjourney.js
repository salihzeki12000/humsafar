var pastJourney = angular.module('pastjourney',[]);


pastJourney.directive('pastJourneyCard',['$http',function($http){
	return{
		restrict : 'E',
		scope: {},
		templateUrl: 'views/directive/pastjourney-post.html',
		link : function($scope, element, attrs){

		}
	};
}])