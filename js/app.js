// JavaScript Document
var initMap = {};
var backgroundClick = {
    object: undefined,
    close: function() {
        backgroundClick.object.backgroundClick = false;
        backgroundClick.scope.$apply();
    }
};
$(document).ready(function() {
    $("body").click(function() {
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
    'angulartics',
    'angulartics.google.analytics',
    'fileuploadservicemod'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
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
            url: "/ongojourney",
            templateUrl: "views/template.html",
            controller: 'OnGoJourneyCtrl'
        })
        .state('tripsummary', {
            url: "/tripsummary",
            templateUrl: "views/template.html",
            controller: 'TripSummaryCtrl'
        })
        .state('detailitinerary', {
            url: "/detail-itinerary",
            templateUrl: "views/template.html",
            controller: 'DetailedItineraryCtrl'
        })
        .state('quickitinerary', {
            url: "/quick-itinerary",
            templateUrl: "views/template.html",
            controller: 'QuickItineraryCtrl'
        })
        .state('editoritinerary', {
            url: "/editor-itinerary",
            templateUrl: "views/template.html",
            controller: 'EditorItineraryCtrl'
        })
        .state('userquickitinerary', {
            url: "/user-quickitinerary",
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
        .state('ProfileList', {
            url: "/profile-list",
            templateUrl: "views/template.html",
            controller: 'ProfileListCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});


firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});

firstapp.directive('autoHeight', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();

            $element.css("min-height", windowHeight);
            setTimeout(function() {
                $element.css("min-height", windowHeight);
            });
        }
    };
});

firstapp.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
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


firstapp.config(function($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});

firstapp.directive('scrolldown', function($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            $scope.scrollDown = function() {
                $('html,body').animate({
                        scrollTop: $(".second").offset().top
                    },
                    'slow');
            };
        }
    };
});

firstapp.directive("scrolladdclass", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
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

firstapp.directive("scrolladd1class", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
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
firstapp.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});
firstapp.directive('uploadImage', function($http, $filter) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback",
            uploadurl: "=uploadhere",
            state: "=currentState"
        },
        link: function($scope, element, attrs) {

            $scope.showImage = function() {
                console.log($scope.image);
            };
            if ($scope.uploadurl) {
                uploadurl = $scope.uploadurl;
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

            $scope.$watch("image", function(newVal, oldVal) {
                if (newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                }
            });
            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function(n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                }
            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.name = "pratik";
            $scope.clearOld = function() {
                $scope.model = [];
            };
            $scope.uploadNow = function(image) {
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
                }).success(function(data) {
                    if ($scope.callback) {
                        $scope.callback(data);
                    } else {
                        $scope.uploadStatus = "uploaded";
                        if ($scope.isMultiple) {
                            if ($scope.inObject) {
                                $scope.model.push({
                                    "image": data.data[0]
                                });
                            } else {
                                $scope.model.push(data.data[0]);
                            }
                        } else {
                            $scope.model = data.data[0];
                        }
                        if ($scope.state) {
                            $scope.state.reload();
                        }
                    }
                });
            };
        }
    };
});

firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
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

firstapp.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        scope: {
            fileModel: '=fileModel',
        },
        link: function(scope, element, attrs) {
            element.bind('change', function() {
                console.log(element[0].files[0]);
                scope.fileModel = element[0].files[0];
                scope.$apply();
            });
        }
    };
}]);
