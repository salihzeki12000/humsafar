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
        rateThisCountry: function (formData) {
            $http({
                url: adminURL + "/review/saveWeb",
                method: "POST",
                data: formData
            }).success(function (data) {
                console.log(data);
            });
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
        setJourneyCoverPhoto: function (formData) {
            $http({
                url: adminURL + "/journey/editData",
                method: "POST",
                data: formData
            }).success(function (data) {
                console.log(data);
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
                    url: adminURL + "/post/getPostComment",
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
                        url: adminURL + "/post/getPostComment",
                        method: "POST",
                        data: formData
                    }).success(function (data) {
                        $scope.listOfComments = data.data;
                        document.getElementById('enterComment').value = "";
                    });
                });

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
                var date = formatDate(dt);
                var time = formatTime(formData);
                var result = {};
                result.type = "changeDateTime";
                result.date = new Date(date + " " + time);
                result.uniqueId = id;
                console.log(result);
                $http({
                    url: adminURL + "/post/editData/",
                    method: "POST",
                    data: result
                }).success(function (data) {
                    console.log(data);
                    formData = {
                        "_id": $scope.json._id
                    }
                    OnGoJourney.getOneJourney(formData, function (journeys) {
                        $scope.json.post = journeys.post;
                        console.log("journey updated");
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
                    $scope.formData.nhour = val;
                } else if (id == 'min') {
                    $scope.formData.nmins = val;
                } else {
                    $scope.formData.dayNight = val;
                }
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
                var hour = formData.nhour,
                    mins = formData.nmins,
                    sec = 00;
                if (formData.dayNight == "AM") {
                    if (hour == 12) {
                        hour = 0;
                    }
                } else if (formData.dayNight == "PM") {
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

        var returnVal = moment(current).diff(moment(previous), 'days');

        return returnVal;
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