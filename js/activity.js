var activity = angular.module('activity', [])

.factory('Activity', function($http, $filter) {

  return {
    getAllActivities: function(pageNum,callback) {
      $http({
        url: adminURL + "/activityFeed/getDataWeb",
        method: "POST",
        data: {
          "pagenumber": pageNum
        }
      }).success(function(data) {
       var activities=data.data;
       _.each(activities,function(activity){
          
           if(activity.type=="travel-life" || activity.type=="on-the-go-journey" ||  activity.type=="ended-journey" || activity.type=="quick-itinerary" || activity.type=="detail-itinerary" || activity.type=="local-life"){
               activity.activityPerformed=true;
               activity.isPopularType=false;
               activity.isToDoActivity=false;
           }else if(activity.type=="popular-travellers"){
               activity.activityPerformed=false;
               activity.isPopularType=true;
               activity.isToDoActivity=false;
           }else if(activity.type=="to-do-activity"){
               activity.activityPerformed=false;
               activity.isPopularType=false;
               activity.isToDoActivity=true;
           }
           
           if(activity.type=="travel-life"){
               
           }
       });
       callback(activities);
      });
    }
  }
});