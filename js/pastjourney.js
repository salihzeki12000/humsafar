var pastJourney = angular.module('pastjourney',[]);

pastJourney.factory('pastJourney', function(TravelibroService, $filter){
	return{
	  getDrafts: function(formData, callback, errorCallback){
      TravelibroService.http({
          		url: adminURL + '/draft/getDraftWeb',
          		method: "POST",
          		data: formData
          	}).success(function(data){
          		callback(data.data);
          	}).error(function(data){
          		console.log(data);
          	})
    },
		getOneDraft : function(formData, callback, errorCallback){
			TravelibroService.http({
				url: adminURL + '/draft/getOneDraftWeb',
				method: "POST",
				data: formData
			}).success(function(data){
        var journey = {};
        journey = data.data;
        var allPastPost = [];
        var dateJourneyDifference = moment(journey.endTime).diff(moment(journey.startTime),'days');
        _.times(dateJourneyDifference+1,function(day){
          allPastPost.push({
            type:"addDays",
            UTCModified:moment(journey.startTime).add(day,'d').format("YYYY-MM-DD")
          });
        });
        _.each(journey.post,function(eachVal){
          _.remove(allPastPost,function(each){
            return (moment(eachVal.UTCModified).format('DD:MM:YYYY') === moment(each.UTCModified).format('DD:MM:YYYY')) && each.type==="addDays";
          });
        });
        // console.log(allPastPost,'all past post');
        journey.post = _.concat(journey.post,allPastPost);
        journey.post=_.orderBy(journey.post,['UTCModified'],['asc']);
        // console.log(journey.post,'journey post');
        for(var i = 0; i<journey.post.length-1;i++){
          if(moment(journey.post[i].UTCModified).format('DD:MM:YYYY')!==moment(journey.post[i+1].UTCModified).format('DD:MM:YYYY')){
            journey.post[i].showAddMore = true;
          }else{
            journey.post[i].showAddMore = false;
          }
        }
        journey.post[journey.post.length-1].showAddMore = true;
        // console.log(journey,'date wala data jo aaya wo');
        journey.kindOfJourneyIconsAddr = [];
        journey.buddiesCount = journey.buddies.length;
        journey.buddiesString = "";
        if (journey.buddiesCount == 1) {
          journey.buddiesString = " and " + "<a href='/users/" + journey.buddies[0].urlSlug + "'>" + journey.buddies[0].name.bold() + "</a>";
        } else if (journey.buddiesCount == 2) {
          journey.buddiesString = ", " + "<a href='/users/" + journey.buddies[0].urlSlug + "'>" + journey.buddies[0].name.bold() + "</a>" + " and " + "<a href='/users/" + journey.buddies[1].urlSlug + "'>" + journey.buddies[1].name.bold() + "</a>" + ".";
        } else if (journey.buddiesCount >= 2) {
          var i = 0;
          journey.buddiesString = ", ";
          while (i <= journey.buddiesCount - 1) {
            if (i < journey.buddiesCount - 1) {
              journey.buddiesString = journey.buddiesString + "<a href='/users/" + journey.buddies[i].urlSlug + "'>" + journey.buddies[i].name.bold() + "</a>" + ", ";
            } else if (i == journey.buddiesCount - 1) {
              journey.buddiesString = journey.buddiesString + " and " + "<a href='/users/" + journey.buddies[i].urlSlug + "'>" + journey.buddies[i].name.bold() + "</a>" + ".";
            }
            i++;
          }
        }
        if (journey.buddiesString != undefined) {
          journey.startJourneyString = "Trip Travellers - " + "<a href='/users/" + journey.user.urlSlug + "'>" + journey.user.name.bold() + "</a>" + journey.buddiesString;
        } else {
          journey.startJourneyString = "Trip Traveller - " + "<a href='/users/" + journey.user.urlSlug + "'>" + journey.user.name.bold() + "</a>";
        }
        callback(journey);
			}).error(function(data){
				console.log(data);
			})
		},
		getPastJourney: function (formData, callback, errorCallback) {
        TravelibroService.http({
          url: adminURL + "/draft/getOneWeb",
          method: "POST",
          data: formData
        }, 'allLoader').success(function (data) {
          console.log('journey in post ',data);
          var journey = data.data;
          var lastPostUtc;
          if(journey.post && journey.post.length >= 1) {
            lastPostUtc = journey.post[journey.post.length - 1].UTCModified;
          }else {
            lastPostUtc = journey.startTime;
          }

          var allPastPost = [];
          var dateJourneyDifference = moment(journey.endTime).diff(moment(journey.startTime),'days');
          _.times(dateJourneyDifference+1,function(day){
            allPastPost.push({
              type:"addDays",
              UTCModified:moment(journey.startTime).add(day,'d').format("YYYY-MM-DD")
            });
          });
          _.each(journey.post,function(eachVal){
            _.remove(allPastPost,function(each){
               return (moment(eachVal.UTCModified).format('DD:MM:YYYY') === moment(each.UTCModified).format('DD:MM:YYYY')) && each.type==="addDays";
            });
          });
          // console.log(allPastPost,'all past post');
          journey.post = _.concat(journey.post,allPastPost);
          journey.post=_.orderBy(journey.post,['UTCModified'],['asc']);
          // console.log(journey.post,'journey post');
          for(var i = 0; i<journey.post.length-1;i++){
            if(moment(journey.post[i].UTCModified).format('DD:MM:YYYY')!==moment(journey.post[i+1].UTCModified).format('DD:MM:YYYY')){
              journey.post[i].showAddMore = true;
            }else{
              journey.post[i].showAddMore = false;
            }
          }
          journey.post[journey.post.length-1].showAddMore = true;
          // console.log(journey,'date wala data jo aaya wo');
          journey.kindOfJourneyIconsAddr = [];
          journey.buddiesCount = journey.buddies.length;
          journey.buddiesString = "";
          if (journey.buddiesCount == 1) {
            journey.buddiesString = " and " + "<a href='/users/" + journey.buddies[0].urlSlug + "'>" + journey.buddies[0].name.bold() + "</a>";
          } else if (journey.buddiesCount == 2) {
            journey.buddiesString = ", " + "<a href='/users/" + journey.buddies[0].urlSlug + "'>" + journey.buddies[0].name.bold() + "</a>" + " and " + "<a href='/users/" + journey.buddies[1].urlSlug + "'>" + journey.buddies[1].name.bold() + "</a>" + ".";
          } else if (journey.buddiesCount >= 2) {
            var i = 0;
            journey.buddiesString = ", ";
            while (i <= journey.buddiesCount - 1) {
              if (i < journey.buddiesCount - 1) {
                journey.buddiesString = journey.buddiesString + "<a href='/users/" + journey.buddies[i].urlSlug + "'>" + journey.buddies[i].name.bold() + "</a>" + ", ";
              } else if (i == journey.buddiesCount - 1) {
                journey.buddiesString = journey.buddiesString + " and " + "<a href='/users/" + journey.buddies[i].urlSlug + "'>" + journey.buddies[i].name.bold() + "</a>" + ".";
              }
              i++;
            }
          }
          if (journey.buddiesString != undefined) {
            journey.startJourneyString = "Trip Travellers - " + "<a href='/users/" + journey.user.urlSlug + "'>" + journey.user.name.bold() + "</a>" + journey.buddiesString;
          } else {
            journey.startJourneyString = "Trip Traveller - " + "<a href='/users/" + journey.user.urlSlug + "'>" + journey.user.name.bold() + "</a>";
          }
          callback(journey,lastPostUtc);
        }).error(function (data) {
          console.log(data);
        });
      },
      deleteJourney : function(formData,callback){
        TravelibroService.http({
          url: adminURL + "/journey/deleteJourneyWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data)
        }).error(function (data) {
          console.log(data);
        });
      },
		  getLatLong: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/card/getGooglePlaceDetail",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data)
        }).error(function (data) {
          console.log(data);
        });
      },
      editJourneyName: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/draft/editDataWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(formData.name)
        }).error(function (data) {
          console.log(data);
        });
      },
      publishDraft: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/draft/publishDraft",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data)
        }).error(function (data) {
          console.log(data);
        });
      },
      setStartLocation: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/draft/editDataWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data)
        }).error(function (data) {
          console.log(data);
        });
      },
      rateThisCountry: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/review/saveWeb",
          method: "POST",
          data: formData
        }).success(callback).error(function (data) {
          console.log(data);
        });
      },
      getTripSummary: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/journey/getCountData",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data.data);
        }).error(function (data) {
          console.log(data);
        });
      },
      getJourneyCoverPhoto: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/journey/getCountDataWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data.data);
        }).error(function (data) {
          console.log(data);
        });
      },
      setJourneyCoverPhoto: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/draft/editDataWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          console.log(data);
          callback();
        }).error(function (data) {
          console.log(data);
        });
      },
      saveKindJourney:function(formData,callback){
        TravelibroService.http({
          url: adminURL + '/draft/editDataWeb',
          method: "POST",
          data: formData
        }).success(function(data){
          callback();
        }).error(function(data){
            console.log(data);
        });
      },
      updateBannerDateTime: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/draft/editDataWeb/",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback();
        }).error(function (data) {
          console.log(data);
        });
      },
      endDateJourney: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/draft/editData/",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback();
        }).error(function (data) {
          console.log(data);
        });
      },
      getPostsComment: function (id, callback) {
        var formData = {
          "_id": id
        };
        TravelibroService.http({
          url: adminURL + "/post/getPostCommentWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      postComment: function (uniqueId, comment, type, postId, callback) {
        var formData = {
          "uniqueId": uniqueId,
          "text": comment,
          "type": type,
          "post": postId
        };
        TravelibroService.http({
          url: adminURL + "/comment/addCommentWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          formData = {
            "_id": postId
          }
          TravelibroService.http({
            url: adminURL + "/post/getPostCommentWeb",
            method: "POST",
            data: formData
          }).success(function (data) {
            callback(data);
          }).error(function (data) {
            console.log(data);
          });
        }).error(function (data) {
          console.log(data);
        });

      },
      createDraft: function(formData, callback){
        TravelibroService.http({
          url: adminURL + "/draft/saveWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          console.log('response ',data);
          callback(data);
        }).error(function(data){
          console.log(data);
        });
      }
    };
});
pastJourney.directive('pastJourneyCard',['$http', '$filter', '$window', '$state', '$timeout', '$uibModal', 'pastJourney', 'LikesAndComments', 'TravelibroService','TemplateService', '$sce', function ($http, $filter, $window, $state, $timeout, $uibModal, pastJourney, LikesAndComments, TravelibroService,TemplateService, $sce){
	return{
		restrict : 'E',
		scope: {
			pastStory: "=post",
			pastJourneyArray : "=json",
			isMine: "=",
      isLoggedIn: "=",
      getCommentsData: '&',
      getLikesData: '&',
      closeBackDrop: '&',
      template: "="
		},
		templateUrl: 'views/directive/pastjourney-post.html',
		link : function($scope, element, attrs){
      $scope.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		  $scope.userData = $.jStorage.get("profile");
      $scope.ongoCard = true;
      $scope.flexShow = true;
      $scope.videoFlex = true;
      $scope.indexPhotoCaption = -1;
      $scope.indexVideoCaption = -1;
      $scope.indexEditPhotoCap = -1;
      $scope.indexEditVideoCap = -1;
      $scope.index = 0;
      $scope.listOfComments = {};
      $scope.listOfComments.scrollBusy = false;
      $scope.listOfComments.stopCallingApi = false;
      $scope.changeImage = function (index, flag) {
        $scope.index = index;
        $scope.pastStory.onDisplay = flag;
        console.log($scope.index, $scope.pastStory.onDisplay);
      };
      var getLocation = {};
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
      $scope.buttonValue = "Save";
      $scope.lengthPhotos = 0;
      $scope.uploadPhotoCount = 1;
      $scope.lengthVideos = 0
      $scope.uploadVideoCount = 1;
      $scope.pastStory.getSearchedList = "";
      $scope.pastStory.buddiesCount = 0;
      if ($scope.pastStory.checkIn && $scope.pastStory.checkIn.location) {
        $scope.checkInData = _.cloneDeep($scope.pastStory.checkIn);
      }
      var y = 1;

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
			$scope.getTimes = function (n, type) {
        if (type == "marked") {
          n = parseInt(n);
          return new Array(n);
        } else if (type == "unmarked") {
          n = parseInt(n);
          var remainCount = 5 - n;
          return new Array(remainCount);
        }
      };
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

			$scope.editOption = function (model) {
        $timeout(function () {
          model.backgroundClick = true;
          backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
      };

      // edit checkin
      var modal = "";
      $scope.editCheckIn = function(){
      	// journey and paststory has same modal
        $scope.journey = $scope.pastJourneyArray;
      	$scope.ongo = $scope.pastStory;
      	console.log($scope.pastStory,'pastStory',$scope.pastJourneyArray,'pastJourneyArray');
      	modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/edit-otg.html",
          size: "lg",
          scope: $scope,
          backdrop: 'static',
          backdropClass: "review-backdrop"
        });
        modal.close();
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
      // edit checkin end
      // checkin choose you location
      $scope.viewLocation = function () {
      	console.log(getLocation,'getLocation');
        TravelibroService.http({
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
        }).error(function (data) {
          console.log(data);
        });
      };
      $scope.getLocation = function () {
        if ($scope.pastStory.checkIn.location && $scope.pastStory.checkIn.location !== "") {
          $scope.showLocation = true;
          TravelibroService.http({
            url: adminURL + "/post/checkInPlaceSearch",
            method: "POST",
            data: {
              lat: getLocation.latitude,
              long: getLocation.longitude,
              search: $scope.pastStory.checkIn.location
            }
          }).success(function (location) {
            _.each(location.data, function (o) {
              o.name = o.description;
            });
            $scope.nearByLocation = location.data;
          }).error(function (data) {
            console.log(data);
          });
        } else {
          $scope.pastStory.checkIn.category = "";
          $scope.viewLocation();
        }

      };
      $scope.locationId = function (id) {
        console.log(id);
        TravelibroService.http({
          url: adminURL + "/post/getGooglePlaceDetail",
          method: "POST",
          data: {
            placeId: id.place_id
          }
        }).success(function (locationData) {
          $scope.pastStory.checkIn = {
            location: id.name,
            lat: locationData.lat,
            long: locationData.long,
            country: locationData.country,
            city: locationData.city,
            category: locationData.data
          };
          $scope.showLocation = false;
        }).error(function (data) {
          console.log(data);
        });
      }
      $scope.categoryList = ['Beaches', 'Airport', 'Hotels', 'Restaurants', 'Nature & parks', 'Sights & Landmarks', 'Museums & Galleries', 'Religious', 'Shopping', 'Adventure & Excursion', 'Zoos & Aqua', 'Cinema & Theatre'];
      // checkin choose you location end
      // photos array
       $scope.photosArray = _.cloneDeep($scope.pastStory.photos);
      $scope.photosArray = _.chunk($scope.photosArray, 4);
      for (var i = 0; i < $scope.photosArray.length; i++) {
        $scope.photosArray[i] = _.chunk($scope.photosArray[i], 2);
      }
      // photos array end
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
      // remove added pic

        $scope.removeEditPic = function (id) {
        $scope.flexShow = false;
        _.remove($scope.pastStory.photos, function (editPic) {
          return editPic._id === id;
        });
        $scope.photosArray = $scope.pastStory.photos;
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
      // remove added pic end
      // add caption for video
			$scope.addEditVideoCaption = function (index) {
        if ($scope.indexEditVideoCap === index) {
          $scope.indexEditVideoCap = -1;
        } else {
          $scope.indexEditVideoCap = index;
        }
      }
      // add caption for video end
      // remove video from edit
      $scope.removeEditVid = function (videoId) {
        $scope.videoFlex = false;
        _.remove($scope.pastStory.videos, function (remove) {
          return remove._id == videoId;
        })
        $scope.pastStory.videos = $scope.pastStory.videos;
        $timeout(function () {
          console.log('timeout chala kya');
          $scope.videoFlex = true;
        }, 100);
      }
      // remove video from edit end
      // save ediy data
      $scope.saveEditOtg = function(){
        console.log($scope.oldBuddies, 'old buddies');
        // get photos id
        $scope.photosId = _.map($scope.pastStory.photos, "_id");
        // get photos id end

        LikesAndComments.getHashTags($scope.pastStory.thoughts, function (data) {
          hashTag = data;
          // removedHashTag
          var removeTag = _.difference($scope.pastStory.hashTag, hashTag);
          $scope.removedHashTag = removeTag;
          // removeHashtag end
        });
        console.log(hashTag);

        // hashtag end

        var editedData = {
          thoughts: $scope.pastStory.thoughts,
          checkIn: $scope.pastStory.checkIn,
          checkInChange: true,
          journeyUniqueId: $scope.pastJourneyArray.uniqueId,
          "uniqueId": $scope.pastStory.uniqueId,
          "_id": $scope.pastStory._id,
          oldBuddies: $scope.oldBuddies,
          newBuddies: $scope.pastStory.buddies,
          hashtag: hashTag,
          addHashtag: hashTag,
          removeHashtag: $scope.removedHashTag,
          photosArr: $scope.pastStory.photos,
          videosArr: $scope.pastStory.videos,
          type: "editPost"
        }
        if ($scope.pastStory.checkIn && $scope.pastStory.checkIn.lat && $scope.pastStory.checkIn.long && $scope.pastStory.checkIn.category && $scope.pastStory.checkIn.location) {
          if ($scope.checkInData.lat && $scope.checkInData.long) {
            if ($scope.pastStory.checkIn.lat === $scope.checkInData.lat && $scope.pastStory.checkIn.long === $scope.checkInData.long) {
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
        TravelibroService.http({
          url: adminURL + "/card/editDataWeb",
          method: "POST",
          data: editedData,
        }).success(function (data) {
          if (data.value === true) {
            $window.location.reload();
          }
        }).error(function (data) {
          console.log(data);
        });
      }
      // save edit data end


      // add photo video for past story
      $scope.addPhotosVideo = function () {
        modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/add-photo-video.html",
          backdropClass: "review-backdrop",
          size: "lg",
          scope: $scope,
          backdrop: 'static'
        });
        modal.closed.then(function () {
          $scope.otgPhotoArray = [];
          $scope.photoSec = false;
          $scope.otgPhoto = [];
          $scope.otgVideo = [];
          $scope.lengthVideos = 0;
          $scope.lengthPhotos = 0;
          $scope.videoSec = false;
          console.log($scope.otgVideo,'empty hai kya');
        });
      };
      $scope.cancelEdit = function(){
          window.stop();
          $scope.otgPhotoArray = [];
          $scope.photoSec = false;
          $scope.otgPhoto = [];
          $scope.otgVideo = [];
          $scope.lengthVideos = 0;
          $scope.lengthPhotos = 0;
          TemplateService.uploadLoader = false;
          $scope.videoSec = false;
      }
      // add photos start
      $scope.photoSec = false;
      $scope.addOtgPhotos = function (detail, length,status) {
        console.log(detail,length,status);
        if($scope.uploadPhotoCount == 1){
          $scope.lengthPhotos = $scope.lengthPhotos + length;
          $scope.uploadPhotoCount++;
        }else if($scope.uploadPhotoCount == length){
          $scope.uploadPhotoCount = 1;
        }else{
          $scope.uploadPhotoCount++;
        }
        if(status == 'Uploading...'){
          $('.status').attr('disabled',true);
          $('.status').removeClass('btn-pink').addClass('btn-grey');
        }else {
          $('.status').attr('disabled',false);
          $('.status').removeClass('btn-grey').addClass('btn-pink');
        }
        // if($scope.lengthPhotos == 0){
        //   $scope.lengthPhotos = length;
        // }else{
        //   $scope.lengthPhotos = $scope.lengthPhotos + length;
        // }
        // $scope.lengthPhotos = length;
        // $scope.lengthPhotos = $scope.lengthPhotos + length;
        $scope.buttonValue = status;
        $scope.otgPhoto.push({
          name: detail,
          caption: ""
        });
        console.log($scope.otgPhoto, "otg photo");
        $scope.flexShow = false;
        $scope.otgPhotoArray = $scope.otgPhoto;
        $scope.otgPhotoArray = _.chunk($scope.otgPhotoArray, 4);
        for (var i = 0; i < $scope.otgPhotoArray.length; i++) {
          $scope.otgPhotoArray[i] = _.chunk($scope.otgPhotoArray[i], 2);
        }
        y = 1;
        console.log($scope.otgPhotoArray, "otg photo array");
        if ($scope.otgPhotoArray.length > 0) {
          $scope.photoSec = true;
        } else {
          $scope.photoSec = false;
        }
        $timeout(function () {
          $scope.flexShow = true;
        }, 200);
      }
      // add photos end
			// photos array edit
      $scope.addMoreCaption = function (index) {
        if ($scope.indexPhotoCaption === index) {
          $scope.indexPhotoCaption = -1;
        } else {
          $scope.indexPhotoCaption = index;
        }
      }
      // photos array edit end
      // delete added photos
      $scope.deletePhotos = function (name) {
        $scope.flexShow = false;
        _.remove($scope.otgPhoto, function (n) {
          return n.name === name;
        })
        $scope.otgPhotoArray = $scope.otgPhoto;
        $scope.lengthPhotos = $scope.lengthPhotos - 1;
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

      // add video start
      $scope.addOtgVideo = function (video,length, status) {
        if($scope.uploadVideoCount == 1){
          $scope.lengthVideos = $scope.lengthVideos + length;
          $scope.uploadVideoCount++;
        }else if($scope.uploadVideoCount == length){
          $scope.uploadVideoCount = 1;
        }else{
          $scope.uploadVideoCount++;
        }
        if(status == 'Uploading...'){
          $('.status').attr('disabled',true);
          $('.status').removeClass('btn-pink').addClass('btn-grey');
        }else {
          $('.status').attr('disabled',false);
          $('.status').removeClass('btn-grey').addClass('btn-pink');
        }
        $scope.buttonValue = status;
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
       // delete added videos
      $scope.deleteVideo = function(videoName){
        $scope.videoFlex = false;
        console.log(videoName);
        _.remove($scope.otgVideo, function(videoObj){
          return videoObj.name === videoName;
        })
        $scope.lengthVideos = $scope.lengthVideos - 1;
        console.log($scope.otgVideo, 'new video');
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
        }, 100);
      }
      // delete added videos end
      // save photo videos
      $scope.savePhotosVideos = function () {
        _.filter($scope.pastStory.buddies, ['selected', true]);
        // console.log(photos,uniqueId);
        var formData = {
          type: "addPhotosVideos",
          photosArr: $scope.otgPhoto,
          videosArr: $scope.otgVideo,
          uniqueId: $scope.pastStory.uniqueId,
          buddies: $scope.pastStory.buddies
        }
        TravelibroService.http({
          url: adminURL + "/card/editDataWeb",
          method: "POST",
          data: formData
        }).success(function (data) {
          console.log(data);
          if (data.value === true) {
            setTimeout(function () {
              $window.location.reload();
            }, 100);
          }
        }).error(function (data) {
          console.log(data);
        });
      }
      // save photo videos end
      // add photo video for past story end


      // change time and date
      $scope.time = {};
      $scope.datetime = {};
      $scope.changePostsDate = function () {
      	console.log($scope.pastStory,'past journey array change post date');
        $scope.isPostDate = true;
        $scope.isBannerDate = false;
        console.log($scope.isPostDate, $scope.isBannerDate);
        date = $scope.pastStory.UTCModified;
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
          minDate: $scope.pastJourneyArray.startTime,
          maxDate: $scope.pastJourneyArray.post[$scope.pastJourneyArray.post.length - 1].UTCModified,
          showWeeks: false
        };
        $uibModal.open({
          animation: true,
          // templateUrl: "views/modal/date-time.html",
          templateUrl: "views/modal/past-datetime.html",
          scope: $scope,
          backdropClass: "review-backdrop",
        })
      console.log($scope.pastJourneyArray.post,'past journey array');
      };
      $scope.updateDateTime = function (id, formData, dt) {
      	console.log($scope.pastStory,'past story click wala');
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
        TravelibroService.http({
          url: adminURL + "/card/editDataWeb/",
          method: "POST",
          data: result
        }).success(function (data) {
          var formData = {
            "urlSlug": $scope.pastJourneyArray.urlSlug
          }
          $scope.pastJourneyArray.post = [];
          pastJourney.getPastJourney(formData, function (journeys) {
            $scope.pastJourneyArray.post = journeys.post;
          }, function (err) {
            console.log(err);
          });
        }).error(function (data) {
          console.log(data);
        });
      };
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
      // change time and date end

      // get photos comment data
      $scope.allPhotos = {};
      $scope.allPhotos.photoSliderIndex = "";
      $scope.allPhotos.photoSliderLength = "";
      $scope.allPhotos.newArray = [];
      //Photo comment popup
      $scope.getPhotosCommentData = function (photoId, index, length, array) {
        console.log('abhi log huwa kya');
        if (!($.jStorage.get("isLoggedIn"))) {
          $state.go('login');
        } else {
          console.log(index);
          console.log(length);
          console.log(array);
          console.log(photoId, "click function called");
          $scope.allPhotos.photoSliderIndex = index;
          $scope.allPhotos.photoSliderLength = length;
          $scope.allPhotos.newArray = array;
          modal = $uibModal.open({
            templateUrl: "views/modal/notify.html",
            animation: true,
            controller: "photoCommentModalCtrl",
            scope: $scope,
            windowClass: "notify-popup"
          });
          modal.closed.then(function () {
            $scope.listOfComments = {};
          });
          var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            console.log($scope.listOfComments);
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
          };
          LikesAndComments.getComments("photo", photoId, 1, callback);
        }
      };

      // get photos comment data end
      // delete past journey card
       $scope.confirmDelete = function () {
       	$scope.ongo = $scope.pastStory;
       	$scope.json = $scope.pastJourneyArray;
        modal = $uibModal.open({
          animation: true,
          windowClass: "delete-visited-country",
          templateUrl: 'views/modal/delete-post.html',
          scope: $scope
        })
      }
      $scope.deletePost = function (postId, journeyId) {
        console.log(postId, journeyId);
        var formData = {
          type: "deletePost",
          _id: postId,
          uniqueId: journeyId
        };
        console.log(formData);
        TravelibroService.http({
          url: adminURL + "/card/editDataWeb/",
          method: "POST",
          data: formData
        }).success(function () {
          console.log("deleted successfully");
          document.getElementById(postId).remove();
        }).error(function () {
          console.log("failed to delete");
        })
      }
      // delete past journey card end
      // add more post
      $scope.addMorePost = function(id){
        console.log($scope.pastStory.UTCModified,'what is utc',id,'id',moment($scope.pastStory.UTCModified));
        if(id){
          $scope.pastStory.UTCModified = moment($scope.pastStory.UTCModified).add(2,'seconds').format();
        }else{
          $scope.pastStory.UTCModified = moment($scope.pastStory.UTCModified).startOf('day').toDate();
        }
        // $scope.pastStory = {};
        $scope.pastStory.checkIn = {};
        $scope.pastStory.thoughts = "";
        $scope.ongo = $scope.pastStory;
        // console.log($scope.pastStory.UTCModified,'what is utc new');

        var modal = "";
        modal = $uibModal.open({
          animation: true,
          templateUrl: "views/modal/add-post.html",
          size: "lg",
          scope: $scope,
          backdrop: 'static',
          backdropClass: "review-backdrop"
        });
        modal.close();
         // geo location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (geoLocation) {
            getLocation = geoLocation.coords;
          });
          console.log(getLocation,'geo location');
        } else {
          console.log("navigator.geolocation not supported");
        }
         LikesAndComments.getHashTags($scope.pastStory.thoughts, function (data) {
          hashTag = data;
          // removedHashTag
          var removeTag = _.difference($scope.pastStory.hashTag, hashTag);
          $scope.removedHashTag = removeTag;
          // removeHashtag end
        });
        // save new post
        $scope.addNewPost = function(){
        var formData = {
            date: $scope.pastStory.UTCModified,
            thoughts: $scope.pastStory.thoughts,
            checkIn: $scope.pastStory.checkIn,
            journey: $scope.pastJourneyArray.uniqueId,
            hashtag: hashTag,
            photos: $scope.otgPhoto,
            videos: $scope.otgVideo
          }
        TravelibroService.http({
          url: adminURL + "/card/save3Web",
          method: "POST",
          data: formData,
        }).success(function (data) {
          if (data.value === true) {
            $window.location.reload();
          }
        }).error(function (data) {
          console.log(data);
        });
        }
      // save new post end
      }
      // add more post end
      // like photo
        $scope.likePost = function (pastStory) {
        console.log(pastStory, "this call is from journey-post.html");
        pastStory.likeDone = !pastStory.likeDone;
        if (pastStory.likeDone) {
          if (pastStory.likeCount == undefined) {
            pastStory.likeCount = 1;
          } else {
            pastStory.likeCount = pastStory.likeCount + 1;
          }
          LikesAndComments.likeUnlike(pastStory.type, "like", pastStory.uniqueId, pastStory._id, null)
        } else {
          pastStory.likeCount = pastStory.likeCount - 1;
          LikesAndComments.likeUnlike(pastStory.type, "unlike", pastStory.uniqueId, pastStory._id, null)
        }
      };

      $scope.playAudio = function () {
        var audio = document.getElementById('like-play');
        audio.play();
      }
      // like photo end
          $scope.likePhoto = function (uniqueId, _id, additionalId) {
        console.log(uniqueId, _id, additionalId);
        $scope.listOfComments.likeDone = !$scope.listOfComments.likeDone;
        if ($scope.listOfComments.likeDone) {
          if ($scope.listOfComments.likeCount == undefined) {
            $scope.listOfComments.likeCount = 1;
          } else {
            $scope.listOfComments.likeCount = $scope.listOfComments.likeCount + 1;
          }
          LikesAndComments.likeUnlike("photo", "like", uniqueId, _id, additionalId)
        } else {
          $scope.listOfComments.likeCount = $scope.listOfComments.likeCount - 1;
          LikesAndComments.likeUnlike("photo", "unlike", uniqueId, _id, additionalId)
        }
      };
		}
	};
}]);
pastJourney.filter('formatDateCalender', function () {
  return function (date) {

    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
  };
});


pastJourney.filter('formatTimeCalender', function () {
  return function (formData) {

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


pastJourney.filter('formatDate', function () {
  return function (input, type) {
    // console.log(input,'input',type,'type');
    if (type == 'date') {
      var returnVal = moment(input).format('D MMM, YYYY');
    } else if (type == 'time') {
      var returnVal = moment(input).format('hh:mm a');
    } else if (type == 'year') {
      var returnVal = moment(input).format('YYYY');
    } else if(type == 'shortDate'){
      var returnVal = moment(input).format('D MMM');
    }
    return returnVal;
  };
});

pastJourney.filter('dateDifference', function () {
  return function (current, previous) {
    if (current == "current" || current == "" || current == null || current == undefined) {
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

pastJourney.filter('small', function () {
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

pastJourney.filter('category', function () {
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
//remove it once its of no use
pastJourney.filter('singularOrPlural', function () {
  return function (count, flag) {
    if (flag == 'like') {
      if (count == 1) {
        return "Like";
      } else {
        return "Likes";
      }
    } else if (flag == 'comment') {
      if (count == 1) {
        return "Comment";
      } else {
        return "Comments";
      }
    }
  }
});

pastJourney.filter('filterCount', function () {
  return function (count) {
    if (count == undefined) {
      return 0;
    } else {
      return count;
    }
  }
});
