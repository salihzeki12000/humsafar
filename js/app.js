// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice',
  'pascalprecht.translate',
  'angulartics',
  'angulartics.google.analytics'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/template.html",
      controller: 'HomeCtrl'
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
    .state('itinerary', {
      url: "/itinerary",
      templateUrl: "views/template.html",
      controller: 'ItineraryCtrl'
    });
  $urlRouterProvider.otherwise("/home");
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
