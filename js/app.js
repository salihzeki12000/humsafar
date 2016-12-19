// JavaScript Document
var initMap = {};
var backgroundClick = {
  object: undefined,
  close: function () {
    backgroundClick.object.backgroundClick = false;
    backgroundClick.scope.$apply();
  }
};
$(document).ready(function () {
  $("body").click(function () {
    if (backgroundClick.object) {
      backgroundClick.close();
    }
  });

});

var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice',
  'pascalprecht.translate',
  'imageupload',
  'angulartics',
  'angulartics.google.analytics',
  'fileuploadservicemod',
  'angularFileUpload'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/template.html",
      controller: 'HomeCtrl'
    })
    .state('forgot-password', {
      url: "/forgot-password/:token/:email",
      templateUrl: "views/template.html",
      controller: 'ForgotPasswordCtrl'
    })
    .state('forgot-password-email', {
      url: "/forgot-password-email",
      templateUrl: "views/template.html",
      controller: 'ForgotPasswordEmailCtrl'
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "views/template.html",
      controller: 'ContactCtrl'
    })
    .state('booking', {
      url: "/booking",
      templateUrl: "views/template.html",
      controller: 'BookingCtrl'
    })
    .state('advertise', {
      url: "/advertise",
      templateUrl: "views/template.html",
      controller: 'AdvertiseCtrl'
    })
    .state('login', {
      url: "/login",
      templateUrl: "views/template.html",
      controller: 'LoginCtrl'
    })
    .state('mainpage', {
      url: "/mainpage",
      templateUrl: "views/template.html",
      controller: 'MainPageCtrl'
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "views/template.html",
      controller: 'ProfileCtrl'
    })
    .state('mylifeWithOut', {
      url: "/mylife",
      templateUrl: "views/template.html",
      controller: 'MylifeCtrl',
      reloadOnSearch: false
    })
    .state('mylife', {
      url: "/mylife/:name",
      templateUrl: "views/template.html",
      controller: 'MylifeCtrl',
      reloadOnSearch: false
    })
    .state('popularblogger', {
      url: "/popular-blogger",
      templateUrl: "views/template.html",
      controller: 'PopularBloggerCtrl'
    })
    .state('popularagent', {
      url: "/popular-agent",
      templateUrl: "views/template.html",
      controller: 'PopularAgentCtrl'
    })
    .state('destination', {
      url: "/destination",
      templateUrl: "views/template.html",
      controller: 'DestinationCtrl'
    })
    .state('destinationcountryWithOut', {
      url: "/destination-country",
      templateUrl: "views/template.html",
      controller: 'DestinationCountryCtrl',
      reloadOnSearch: false
    })
    .state('destinationcountry', {
      url: "/destination-country/:name",
      templateUrl: "views/template.html",
      controller: 'DestinationCountryCtrl',
      reloadOnSearch: false
    })
    .state('destinationcity', {
      url: "/destination-city/:name",
      templateUrl: "views/template.html",
      controller: 'DestinationCityCtrl',
      reloadOnSearch: false
    })
    .state('destinationcityWithOut', {
      url: "/destination-city",
      templateUrl: "views/template.html",
      controller: 'DestinationCityCtrl',
    })
    .state('journey', {
      url: "/journey",
      templateUrl: "views/template.html",
      controller: 'JourneyCtrl'
    })
    .state('moments', {
      url: "/moments",
      templateUrl: "views/template.html",
      controller: 'MomentsCtrl'
    })
    .state('reviews', {
      url: "/reviews",
      templateUrl: "views/template.html",
      controller: 'ReviewsCtrl'
    })
    .state('holidayplanner', {
      url: "/holidayplanner",
      templateUrl: "views/template.html",
      controller: 'HolidayPlannerCtrl'
    })
    .state('otherprofile', {
      url: "/otherprofile",
      templateUrl: "views/template.html",
      controller: 'OtherProfileCtrl'
    })
    .state('otherjourney', {
      url: "/otherjourney",
      templateUrl: "views/template.html",
      controller: 'OtherJourneyCtrl'
    })
    .state('othermoments', {
      url: "/othermoments",
      templateUrl: "views/template.html",
      controller: 'OtherMomentsCtrl'
    })
    .state('otherreviews', {
      url: "/otherreviews",
      templateUrl: "views/template.html",
      controller: 'OtherReviewsCtrl'
    })
    .state('setting', {
      url: "/setting",
      templateUrl: "views/template.html",
      controller: 'SettingCtrl'
    })
    .state('blog', {
      url: "/blog",
      templateUrl: "views/template.html",
      controller: 'BlogCtrl'
    })
    .state('blogdetail', {
      url: "/blogdetail",
      templateUrl: "views/template.html",
      controller: 'BlogDetailCtrl'
    })
    .state('activity', {
      url: "/activity",
      templateUrl: "views/template.html",
      controller: 'ActivityCtrl'
    })
    .state('holiday', {
      url: "/holiday",
      templateUrl: "views/template.html",
      controller: 'HolidayCtrl'
    })
    .state('ongojourney', {
      url: "/ongojourney/:id",
      templateUrl: "views/template.html",
      controller: 'OnGoJourneyCtrl'
    })
    .state('tripsummary', {
      url: "/tripsummary/:id",
      templateUrl: "views/template.html",
      controller: 'TripSummaryCtrl'
    })
    .state('detailitinerary', {
      url: "/detail-itinerary/:flag/:urlSlug",
      templateUrl: "views/template.html",
      controller: 'DetailedItineraryCtrl'
    })
    .state('quickitinerary', {
      url: "/quick-itinerary/:flag/:urlSlug",
      templateUrl: "views/template.html",
      controller: 'QuickItineraryCtrl'
    })
    .state('editoritinerary', {
      url: "/editor-itinerary",
      templateUrl: "views/template.html",
      controller: 'EditorItineraryCtrl'
    })
    .state('userquickitinerary', {
      url: "/user-quickitinerary/:id",
      templateUrl: "views/template.html",
      controller: 'UserQuickItineraryCtrl'
    })
    .state('userdetailitinerary', {
      url: "/user-detailitinerary",
      templateUrl: "views/template.html",
      controller: 'UserDetailItineraryCtrl'
    })
    .state('agentitinerary', {
      url: "/agent-itinerary",
      templateUrl: "views/template.html",
      controller: 'AgentItineraryCtrl'
    })
    .state('itinerary', {
      url: "/itinerary",
      templateUrl: "views/template.html",
      controller: 'ItineraryCtrl'
    })
    .state('agent-login', {
      url: "/agent-login",
      templateUrl: "views/template.html",
      controller: 'AgentloginCtrl'
    })
    .state('agent-setting', {
      url: "/agent-setting",
      templateUrl: "views/template.html",
      controller: 'AgentsettingCtrl'
    })
    .state('agent-user-without', {
      url: "/agent-user",
      templateUrl: "views/template.html",
      controller: 'AgentuserCtrl'
    })
    .state('agent-home-without', {
      url: "/agent-home",
      templateUrl: "views/template.html",
      controller: 'AgenthomeCtrl'
    })

  .state('agent-user', {
      url: "/agent-user/:name",
      templateUrl: "views/template.html",
      controller: 'AgentuserCtrl',
      reloadOnSearch: false
    })
    .state('agent-home', {
      url: "/agent-home/:name",
      templateUrl: "views/template.html",
      controller: 'AgenthomeCtrl',
      reloadOnSearch: false
    })
    .state('agent-upgrade', {
      url: "/agent-upgrade",
      templateUrl: "views/template.html",
      controller: 'AgentupgradeCtrl'
    })
    .state('ProfileList', {
      url: "/profile-list/:active",
      templateUrl: "views/template.html",
      controller: 'ProfileListCtrl'
    });
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(isproduction);
});


firstapp.directive('img', function ($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function () {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});

firstapp.directive('autoHeight', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      var windowHeight = $(window).height();

      $element.css("min-height", windowHeight);
      setTimeout(function () {
        $element.css("min-height", windowHeight);
      });
    }
  };
});

firstapp.directive('fancyboxBox', function ($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function (scope, element, attr) {
      var $element = $(element);
      var target;
      if (attr.rel) {
        target = $("[rel='" + attr.rel + "']");
      } else {
        target = element;
      }

      target.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        helpers: {
          media: {}
        }
      });
    }
  };
});


firstapp.config(function ($translateProvider) {
  $translateProvider.translations('en', LanguageEnglish);
  $translateProvider.translations('hi', LanguageHindi);
  $translateProvider.preferredLanguage('en');
});

firstapp.directive('scrolldown', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      $scope.scrollDown = function () {
        $('html,body').animate({
            scrollTop: $(".second").offset().top
          },
          'slow');
      };
    }
  };
});

firstapp.directive("scrolladdclass", function ($window) {
  return function (scope, element, attrs) {
    angular.element($window).bind("scroll", function () {
      var windowHeight = $(window).height();
      if (this.pageYOffset >= windowHeight) {
        // console.log(windowHeight);
        element.addClass('addfixed');
      } else {
        element.removeClass('addfixed');
      }
    });
  };
});

firstapp.directive("scrolladd1class", function ($window) {
  return function (scope, element, attrs) {
    angular.element($window).bind("scroll", function () {
      var windowHeight = $(window).height();
      if (this.pageYOffset >= 450) {
        // console.log(windowHeight);
        element.addClass('addfixed');
      } else {
        element.removeClass('addfixed');
      }
    });
  };
});
firstapp.directive('imageonload', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('load', function () {
        scope.$apply(attrs.imageonload);
      });
    }
  };
});

firstapp.directive('uploadImage', function ($http, $filter, $timeout) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            $scope.showImage = function () {
                console.log($scope.image);
            };
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {
                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        console.log(oldVal, newVal);
                        console.log(newVal.length);
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function (data) {
                    
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {

                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data, ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "img";
                        }
                        $scope.model = data.data[0];

                    }
                    $scope.callback({'data':data.data[0]});
                    // $timeout(function () {
                    //    $scope.callback({'data':$scope.model});
                    // }, 100);

                });
            };
        }
    };
});

firstapp.filter('uploadpath', function () {
  return function (input, width, height, style) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      if (input.indexOf('https://') == -1) {
        return imgpath + "?file=" + input + other;
      } else {
        return input;
      }
    }
  };
});

firstapp.filter('kindOfJourney', function () {
  return function (input) {
    var returnVal = "";
    switch (input) {
      case "friends":
        returnVal = "img/icons/friends.png";
        break;
      case "backpacking":
        returnVal = "img/icons/backpacking.png";
        break;
      case "business":
        returnVal = "img/icons/business.png";
        break;
      case "religious":
        returnVal = "img/icons/religious.png";
        break;
      case "romance":
        returnVal = "img/icons/romance.png";
        break;
      case "budget":
        returnVal = "img/icons/budget.png";
        break;
      case "luxury":
        returnVal = "img/icons/luxury.png";
        break;
      case "family":
        returnVal = "img/icons/family.png";
        break;
      case "sole":
        returnVal = "img/icons/sole.png";
        break;
      case "betterhalf":
        returnVal = "img/icons/betterhalf.png";
        break;
      case "colleague":
        returnVal = "img/icons/colleague.png";
        break;
      case "adventure":
        returnVal = "img/icons/adventure.png";
        break;
    }
    return returnVal;
  };
});

firstapp.filter('kindOfCheckIn', function () {
  return function (input) {
    var returnVal = "";
    switch (input) {
      case "Cinema & Theatre":
        returnVal = "img/icons/smallcinema.png";
        break;
      case "Restaurants & Bars":
        returnVal = "img/icons/resto.png";
        break;
      case "Shopping":
        returnVal = "img/icons/smallshopping.png";
        break;
      case "Transportation":
        returnVal = "img/icons/smallairport.png";
        break;
      case "Nature and Parks":
        returnVal = "img/icons/smallnature.png";
        break;
      case "Sights and Landmarks":
        returnVal = "img/icons/smallsight.png";
        break;
      case "Museums and Galleries":
        returnVal = "img/icons/smallmuseums.png";
        break;
      case "Zoo and Aquariums":
        returnVal = "img/icons/smallzoos.png";
        break;
      case "Religious":
        returnVal = "img/icons/smallreligious.png";
        break;
      case "Hotels and Accomodations":
        returnVal = "img/icons/smallhotels.png";
        break;
      case "Others":
        returnVal = "img/icons/smallothers.png";
        break;
      case "Other":
        returnVal = "img/smallothers.png";
        break;
      case "City":
        returnVal = "img/city.png";
        break;
    }
    console.log(input, returnVal);
    return returnVal;
  };
});

firstapp.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    scope: {
      fileModel: '=fileModel',
    },
    link: function (scope, element, attrs) {
      element.bind('change', function () {
        scope.fileModel = element[0].files;
        scope.$apply();
      });
    }
  };
}]);

firstapp.directive('functionmap', ['$parse', function ($parse) {
  return {
    restrict: 'C',
    link: function (scope, element, attrs) {

      setTimeout(function () {
        var check = $(".hasLatLng").length;
        var flag;
        $(window).scroll(function () {
          var currentScroll = $(window).scrollTop() + $(window).height();
          var divPositions = _.map($(".hasLatLng"), function (n) {
            return $(n).offset().top;
          });
          var divHeights = _.map($(".hasLatLng"), function (n) {
            return $(n).height();
          });
          var ith = 1;
          var percentage = 0;
          _.each(divPositions, function (n, index) {
            if (n <= currentScroll && divPositions[index + 1] > currentScroll) { //would work for  1st checkIn till second last checkin coz divPositions[index + 1] would return false
              // console.log("inside 1st if");
              ith = index;

              if (n > 0) {
                percentage = ((currentScroll - n) / divHeights[index]) * 100; //percentage based on size of div
                if (ith > 0) {
                  if (percentage <= 100) {
                    // console.log("<=100");
                    flag = true;
                    pointsForLine(ith, percentage, true);
                  } else {
                    // console.log(">100");
                    // console.log(flag); //else condion is given coz polyline should not exceed beyond 100%            
                    pointsForLine(ith, 100, true, flag);
                    flag = false;
                  }
                } else if (!_.isEmpty(line[1])) { //clearing 1st polyLine
                  line[1].setMap(null);
                  line[1] = {};
                }
              }
              return false;
            } else if ((n <= currentScroll) && (index == (divPositions.length - 1))) { //for last checkIn
              // console.log("last div Reached");
              ith = index;
              percentage = ((currentScroll - n) / divHeights[index]) * 100; //percentage based on size of div
              if (percentage <= 100) {
                // console.log("<=100");
                flag = true;
                pointsForLine(ith, percentage, true, true);
              } else {
                // console.log(">100"); //else condion is given coz polyline should not exceed beyond 100%
                // console.log(flag);                
                pointsForLine(ith, 100, true);
                flag = false;
              }
            } else if (n > currentScroll) { //clearing 1st polyLine if none of the checkin is diplayed on the initial window page
              if (!_.isEmpty(line[1])) {
                line[1].setMap(null);
                line[1] = {};
              }
            }
          });
        });
      }, 1);
    }
  };
}]);

firstapp.filter('postString', function () {
  return function (checkIn) {
    var postString = "";
    var buddiesString = "";
    var buddiesCount = checkIn.buddies.length;

    if (buddiesCount == 1) {
      buddiesString = checkIn.buddies[0].name.bold();
    } else if (buddiesCount == 2) {
      buddiesString = checkIn.buddies[0].name.bold() + " and " + checkIn.buddies[1].name.bold();
    } else if (buddiesCount >= 2) {
      buddiesString = checkIn.buddies[0].name.bold() + " and " + (buddiesCount - 1) + "others ";
    }
    var postString = "";
    // $filter('category')(checkIn.category) +
    if (buddiesString != "") {
      if (checkIn.thoughts && checkIn.location) {
        postString = checkIn.thoughts.bold() + " with " + buddiesString + " at " + checkIn.location.bold();
      } else if (checkIn.thoughts) {
        postString = checkIn.thoughts.bold() + " with " + buddiesString;
      } else if (checkIn && checkIn.location) {
        postString = checkIn.postCreator.name.bold() + " with " + buddiesString + " at " + checkIn.location.bold();
      } else {
        postString = checkIn.postCreator.name.bold() + " with " + buddiesString;
      }
    } else {
      if (checkIn.thoughts && checkIn.location) {
        postString = checkIn.thoughts.bold() + " at " + checkIn.location.bold();
      } else if (checkIn.thoughts) {
        postString = checkIn.thoughts.bold();
      } else if (checkIn && checkIn.location) {
        postString = checkIn.postCreator.name.bold() + " at " + checkIn.location.bold();
      } else {
        postString = checkIn.postCreator.name.bold();
      }
    }


    return postString;
  }

});

firstapp.filter('filterDate', function(){
   return function(duration){
     return "inside";
   };
});
   
