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
                    journeys[i].travelledDay = moment().diff(moment("2016-10-17T06:49:44.536Z"), 'days');
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
                // console.log(journey.post.length);
                callback(journey);
            })
        }
    };
});

ongojourney.directive('journeyPost', ['$http', '$filter', '$timeout', '$uibModal', function ($http, $filter, $timeout, $uibModal) {
    return {
        restrict: 'E',
        scope: {
            ongo: "=post",
            json: "=json",
        },
        templateUrl: 'views/directive/journey-post.html',
        link: function ($scope, element, attrs) {
            // console.log($scope.ongo);
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
            if ($scope.ongo.buddiesCount == 1) {
                $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold();
            } else if ($scope.ongo.buddiesCount == 2) {
                $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold() + " and " + $scope.ongo.buddies[1].name.bold();
            } else if ($scope.ongo.buddiesCount >= 2) {
                $scope.ongo.buddiesString = $scope.ongo.buddies[0].name.bold() + " and " + ($scope.ongo.buddiesCount - 1) + "others ";
            }
            var postString = "";
            // $filter('category')($scope.ongo.checkIn.category) +
            if ($scope.ongo.thoughts && $scope.ongo.checkIn.location) {
                $scope.ongo.postString = $scope.ongo.thoughts.bold() + " with " + $scope.ongo.buddiesString + " at " + $scope.ongo.checkIn.location.bold();
            } else if ($scope.ongo.thoughts) {
                $scope.ongo.postString = $scope.ongo.thoughts.bold() + " with " + $scope.ongo.buddiesString;
            } else if ($scope.ongo.checkIn && $scope.ongo.checkIn.location) {
                $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString + " at " + $scope.ongo.checkIn.location.bold();;
            } else {
                $scope.ongo.postString = $scope.ongo.user.name.bold() + " with " + $scope.ongo.buddiesString;
            }
            $scope.likes = function () {
                $scope.ongo.likeDone = !$scope.ongo.likeDone;
                console.log($scope.ongo.likeDone);
                var id = $scope.ongo.uniqueId;

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
                console.log(formData);
                $http({
                    url: adminURL + "/post/updateLikePostWeb",
                    method: "POST",
                    data: formData
                })
            };
            $scope.changeDate = function () {
                $uibModal.open({
                    animation: true,
                    templateUrl: "views/modal/date-time.html",
                    scope: $scope,
                    backdropClass: "review-backdrop",
                })
            };
            $scope.editOption = function (model) {

                $timeout(function () {
                    model.backgroundClick = true;
                    backgroundClick.object = model;
                }, 200);

                backgroundClick.scope = $scope;
            };

            $scope.updateDateTime = function () {

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

        var returnVal = moment(current).diff(moment(previous), 'days');

        return returnVal;
    };
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