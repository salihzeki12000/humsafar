angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngImgCrop', 'mappy', 'wu.masonry', 'ngScrollbar', 'ksSwiper'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    setTimeout(function() {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }
      });
    }, 10);

    $scope.getClass = "";
    $scope.viewNext = 1;
    $scope.goNext = function(val){
      if(val == 1) {
        $scope.viewNext = 1;
        $scope.getClass = "swiper-slide-active"
      }else if(val == 2) {
        $scope.viewNext = 2;
        $scope.getClass2 = "swiper-slide-active"
      }

    };

    $scope.nationality = [{
      img: "img/flag.png",
      name: "Afghanistan"
    }, {
      img: "img/flag.png",
      name: "Albania"
    }, {
      img: "img/flag.png",
      name: "Algeria"
    }, {
      img: "img/flag.png",
      name: "Andorra"
    }, {
      img: "img/flag.png",
      name: "Angola"
    }, {
      img: "img/flag.png",
      name: "Antigua and Barbuda"
    }, {
      img: "img/flag.png",
      name: "Argentina"
    }, {
      img: "img/flag.png",
      name: "Armenia"
    }, {
      img: "img/flag.png",
      name: "Australia"
    }, {
      img: "img/flag.png",
      name: "Austria"
    }];
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.showImage = false;
    var got = setInterval(function() {
      if (document.getElementById('fileInput')) {
        console.log("got");
        document.getElementById('fileInput').onchange = function(evt) {
          var file = evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function(evt) {
            $scope.$apply(function($scope) {
              console.log(evt);
              $scope.showImage = true;
              $scope.myImage = evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        clearInterval(got);
      }
    }, 1000);


    // $scope.getImage = function(){
    //   if() {
    //     $scope.showImage = true;
    //   }else {
    //     $scope.showImage = false;
    //   }
    // };

  })
  .controller('HolidayCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("holiday");
    $scope.menutitle = NavigationService.makeactive("Holiday");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('JourneyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("journey");
    $scope.menutitle = NavigationService.makeactive("Journey");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.profile = {
      profileMain: "views/content/profile.html"
    }

    $(document).ready(function() {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $("#tabs").offset().top
        }, 1000);
      }, 100);
    });
    $scope.buildNow = function() {
      $scope.$broadcast('rebuild:me');
    }
    $scope.$on('scrollbar.hide', function() {
      // console.log('Scrollbar hide');
    });
    $scope.$on('scrollbar.show', function() {
      // console.log('Scrollbar show');
    });

    $scope.bucketList = [{
      countryName: "United States Of America"
    }, {
      countryName: "Germany"
    }, {
      countryName: "United Kingdom"
    }, {
      countryName: "Switzerland"
    }, {
      countryName: "Australia"
    }, {
      countryName: "India"
    }, {
      countryName: "Italy"
    }, {
      countryName: "Canada"
    }, ];

    $scope.data = {
      'GB': {
        metric: 4
      },
      'US': {
        metric: 40
      },
      'FR': {
        metric: 29
      },
      'IN': {
        metric: 500
      }
      // 'FI': {metric: 15}
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function(val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

    $scope.travelLife = [{
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: false,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: true,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: false,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: false,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: true,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: true,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }];

    $scope.localLife = [{
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }];

  })
  .controller('MomentsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("moments");
    $scope.menutitle = NavigationService.makeactive("Moments");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.profile = {
      profileMain: "views/content/profile.html"
    }

    $(document).ready(function() {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $("#tabs").offset().top
        }, 1000);
      }, 100);
    });
    $scope.bucketList = [{
      countryName: "United States Of America"
    }, {
      countryName: "Germany"
    }, {
      countryName: "United Kingdom"
    }, {
      countryName: "Switzerland"
    }, {
      countryName: "Australia"
    }, {
      countryName: "India"
    }, {
      countryName: "Italy"
    }, {
      countryName: "Canada"
    }, ];

    $scope.data = {
      'GB': {
        metric: 4
      },
      'US': {
        metric: 40
      },
      'FR': {
        metric: 29
      },
      'IN': {
        metric: 500
      }
      // 'FI': {metric: 15}
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function(val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

    $scope.monthMoments = [{
      monthName: "November 2015",
      momentPic: [
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg'
      ]
    }, {
      monthName: "October 2015",
      momentPic: [
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg'
      ]
    }, {
      monthName: "September 2015",
      momentPic: [
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg',
        'img/slider1.jpg',
        'img/slider2.jpg'
      ]
    }, ];
    $scope.momentPic = [
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg'
    ];

    $scope.travelMoment = [{
      imgBack: "img/moment-travel1.jpg",
      imgFront: "img/moment-travel.png",
      placeName: "London Journey",
      totalPhoto: "50",
      timestampMonth: "14 Jan, 2014"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-travel.png",
      placeName: "London Journey",
      totalPhoto: "50",
      timestampMonth: "14 Jan, 2014"
    }, {
      imgBack: "img/moment-travel1.jpg",
      imgFront: "img/moment-travel.png",
      placeName: "London Journey",
      totalPhoto: "50",
      timestampMonth: "14 Jan, 2014"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-travel.png",
      placeName: "London Journey",
      totalPhoto: "50",
      timestampMonth: "14 Jan, 2014"
    }, {
      imgBack: "img/moment-travel1.jpg",
      imgFront: "img/moment-travel.png",
      placeName: "London Journey",
      totalPhoto: "50",
      timestampMonth: "14 Jan, 2014"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-travel.png",
      placeName: "London Journey",
      totalPhoto: "50",
      timestampMonth: "14 Jan, 2014"
    }, ];

    $scope.localMoment = [{
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-local.png",
      timestampDate: "August, 2014",
      totalPhoto: "50"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-local.png",
      timestampDate: "October, 2014",
      totalPhoto: "50"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-local.png",
      timestampDate: "August, 2014",
      totalPhoto: "50"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-local.png",
      timestampDate: "October, 2014",
      totalPhoto: "50"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-local.png",
      timestampDate: "October, 2014",
      totalPhoto: "50"
    }, {
      imgBack: "img/moment-travel2.jpg",
      imgFront: "img/moment-local.png",
      timestampDate: "August, 2014",
      totalPhoto: "50"
    }];

    $scope.viewMonth = false;
    $scope.showMonthView = function() {
      $scope.viewMonth = true;
    };

  })
  .controller('ReviewsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("reviews");
    $scope.menutitle = NavigationService.makeactive("Reviews");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.profile = {
      profileMain: "views/content/profile.html"
    }
    $scope.oneAtATime = true;

    $scope.getReview = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/review-post.html",
        scope: $scope
      })
    };
    $scope.showRating = 1;
    $scope.fillColor = "";
    $scope.starRating = function(val) {
      if (val == 1) {
        $scope.showRating = 1;
        $scope.fillColor2 = "";
        $scope.fillColor3 = "";
        $scope.fillColor4 = "";
        $scope.fillColor5 = "";
      } else if (val == 2) {
        $scope.showRating = 2;
        $scope.fillColor2 = "fa-star";
        $scope.fillColor3 = "";
        $scope.fillColor4 = "";
        $scope.fillColor5 = "";
      } else if (val == 3) {
        $scope.showRating = 3;
        $scope.fillColor2 = "fa-star";
        $scope.fillColor3 = "fa-star";
        $scope.fillColor4 = "";
        $scope.fillColor5 = "";
      } else if (val == 4) {
        $scope.showRating = 4;
        $scope.fillColor2 = "fa-star";
        $scope.fillColor3 = "fa-star";
        $scope.fillColor4 = "fa-star";
        $scope.fillColor5 = "";
      } else if (val == 5) {
        $scope.showRating = 5;
        $scope.fillColor2 = "fa-star";
        $scope.fillColor3 = "fa-star";
        $scope.fillColor4 = "fa-star";
        $scope.fillColor5 = "fa-star";
      } else {
        $scope.showRating = 1;
      }
    };

    $(document).ready(function() {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $("#tabs").offset().top
        }, 1000);
      }, 100);
    });

    $scope.bucketList = [{
      countryName: "United States Of America"
    }, {
      countryName: "Germany"
    }, {
      countryName: "United Kingdom"
    }, {
      countryName: "Switzerland"
    }, {
      countryName: "Australia"
    }, {
      countryName: "India"
    }, {
      countryName: "Italy"
    }, {
      countryName: "Canada"
    }, ];

    $scope.data = {
      'GB': {
        metric: 4
      },
      'US': {
        metric: 40
      },
      'FR': {
        metric: 29
      },
      'IN': {
        metric: 500
      }
      // 'FI': {metric: 15}
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function(val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

    $scope.reviewAll = [{
      locationName: "Girgaon Beach",
      travelType: "img/beach.png",
      timestampDate: "14 Jan, 2014",
      timestampHour: "1:20 pm",
      city: "Mumbai",
      country: "India",
      reviewLocation: true
    }, {
      locationName: "Girgaon Beach",
      travelType: "img/beach.png",
      timestampDate: "14 Jan, 2014",
      timestampHour: "1:20 pm",
      city: "Mumbai",
      country: "India",
      reviewLocation: false
    }, {
      locationName: "Girgaon Beach",
      travelType: "img/beach.png",
      timestampDate: "14 Jan, 2014",
      timestampHour: "1:20 pm",
      city: "Mumbai",
      country: "India",
      reviewLocation: true
    }, {
      locationName: "Girgaon Beach",
      travelType: "img/beach.png",
      timestampDate: "14 Jan, 2014",
      timestampHour: "1:20 pm",
      city: "Mumbai",
      country: "India",
      reviewLocation: false
    }];
    $scope.travelReview = [{
      img: "img/moment-travel2.jpg",
      countryName: "India"
    }, {
      img: "img/moment-travel2.jpg",
      countryName: "India"
    }, {
      img: "img/moment-travel2.jpg",
      countryName: "India"
    }, {
      img: "img/moment-travel2.jpg",
      countryName: "India"
    }, {
      img: "img/moment-travel2.jpg",
      countryName: "India"
    }];

    $scope.travelCity = [{
      cityName: "Mumbai",
      visitedCity: [{
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }]
    }, {
      cityName: "Mumbai",
      visitedCity: [{
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }]
    }, {
      cityName: "Mumbai",
      visitedCity: [{
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }]
    }, {
      cityName: "Mumbai",
      visitedCity: [{
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }]
    }, {
      cityName: "Mumbai",
      visitedCity: [{
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }]
    }, {
      cityName: "Mumbai",
      visitedCity: [{
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }, {
        travelType: "img/beach.png",
        locationName: "Girgaon Beach",
        timestampDate: "14 Jan, 2014",
        timestampHour: "1:20 pm",
      }]
    }, ];
    $scope.viewtravelCountry = false;
    $scope.showtravelCountry = function() {
      $scope.viewtravelCountry = true;
    };
    $scope.viewlocalCountry = false;
    $scope.showlocalCountry = function() {
      $scope.viewlocalCountry = true;
    };

  })
  .controller('HolidayPlannerCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("holidayplanner");
    $scope.menutitle = NavigationService.makeactive("HolidayPlanner");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $(document).ready(function() {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $("#tabs").offset().top
        }, 1000);
      }, 100);
    });
    $scope.profile = {
      profileMain: "views/content/profile.html"
    }

    $scope.bucketList = [{
      countryName: "United States Of America"
    }, {
      countryName: "Germany"
    }, {
      countryName: "United Kingdom"
    }, {
      countryName: "Switzerland"
    }, {
      countryName: "Australia"
    }, {
      countryName: "India"
    }, {
      countryName: "Italy"
    }, {
      countryName: "Canada"
    }, ];

    $scope.data = {
      'GB': {
        metric: 4
      },
      'US': {
        metric: 40
      },
      'FR': {
        metric: 29
      },
      'IN': {
        metric: 500
      }
      // 'FI': {metric: 15}
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function(val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

  })
  .controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.data = {
      'GB': {
        metric: 4
      },
      'US': {
        metric: 40
      },
      'FR': {
        metric: 29
      },
      'IN': {
        metric: 500
      }
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function(val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
    };
    $scope.ratingStates = [{
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }];

  })
  .controller('OtherProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("otherprofile");
    $scope.menutitle = NavigationService.makeactive("OtherProfile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.data = {
      'GB': {
        metric: 4
      },
      'US': {
        metric: 40
      },
      'FR': {
        metric: 29
      },
      'IN': {
        metric: 500
      }
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function(val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
    };
    $scope.ratingStates = [{
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }, {
      stateOn: 'fa fa-star-o',
      stateOff: 'fa fa-star'
    }];

  })
  .controller('OtherJourneyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("otherjourney");
    $scope.menutitle = NavigationService.makeactive("OtherJourney");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.otherprofile = {
      profileMain: "views/content/otherprofile.html"
    }

    $(document).ready(function() {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: $("#tabs").offset().top
        }, 1000);
      }, 100);
    });
    $scope.buildNow = function() {
      $scope.$broadcast('rebuild:me');
    }
    $scope.$on('scrollbar.hide', function() {
      // console.log('Scrollbar hide');
    });
    $scope.$on('scrollbar.show', function() {
      // console.log('Scrollbar show');
    });

    $scope.bucketList = [{
      countryName: "United States Of America"
    }, {
      countryName: "Germany"
    }, {
      countryName: "United Kingdom"
    }, {
      countryName: "Switzerland"
    }, {
      countryName: "Australia"
    }, {
      countryName: "India"
    }, {
      countryName: "Italy"
    }, {
      countryName: "Canada"
    }, ];

    $scope.data = {
      'GB': {
        metric: 4
      },
      'US': {
        metric: 40
      },
      'FR': {
        metric: 29
      },
      'IN': {
        metric: 500
      }
      // 'FI': {metric: 15}
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function(val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

    $scope.travelLife = [{
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: false,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: true,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: false,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: false,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: true,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }, {
      heading: "Manan Vora has ended his London Journey",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      onwayTag: "love in paris",
      imgOnway: "img/paris.jpg",
      cost: "$10,000",
      spendingDay: "75",
      likes: "15660",
      reviews: "354",
      pointReview: "4.5",
      onJourney: true,
      countryVisit: [{
        imgFlag: "img/india-visit.png"
      }, {
        imgFlag: "img/england-visit.png"
      }, {
        imgFlag: "img/canada-visit.png",
      }, ]
    }];

    $scope.localLife = [{
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }, {
      heading: "Evening by the beach! :)  with Sarvesh Bramhe & Gayatri Sakalkar - at Girgaon",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      imgWall: "img/local-life-post.jpg",
      likes: "15660",
      travelledIcon: "img/cycle-cyan.png",
      postSlider: [{
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }, {
        imgRelated: "img/slider1.jpg"
      }, {
        imgRelated: "img/slider2.jpg"
      }]
    }];

  })
  .controller('SettingCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("setting");
    $scope.menutitle = NavigationService.makeactive("Setting");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.showImage = false;
    var got = setInterval(function() {
      if (document.getElementById('fileInput')) {
        console.log("got");
        document.getElementById('fileInput').onchange = function(evt) {
          var file = evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function(evt) {
            $scope.$apply(function($scope) {
              console.log(evt);
              $scope.showImage = true;
              $scope.myImage = evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        clearInterval(got);
      }
    }, 1000);

    $scope.selectHoliday = 1;
    $scope.selectHoliday = 11;
    $scope.selectHoliday = 21;
    $scope.selectHoliday = 31;

    $scope.showSetting = 1;
    $scope.setting = function(val){
      if(val == 1) {
        $scope.showSetting = 1;
      }else if(val == 2) {
        $scope.showSetting = 2;
      }else if(val == 3) {
        $scope.showSetting = 3;
      }else if(val == 4) {
        $scope.showSetting = 4;
      }else if(val == 5) {
        $scope.showSetting = 5;
      }else if(val == 6) {
        $scope.showSetting = 6;
      }else {
        $scope.showSetting = 1;
      }
    };

  })
    .controller('BlogCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blog");
    $scope.menutitle = NavigationService.makeactive("Blog");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.blogPost = [
      {
        img: "img/blog/blog-post.jpg",
        postType: "Luxury",
        title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post2.jpg",
        postType: "Luxury",
        title: "Best cycling tours in the world",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post3.jpg",
        postType: "Road Trip",
        title: "Ten Gorgeous European Summer Island Holidays",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post4.jpg",
        postType: "Adventure",
        title: "Museums And Cathedrals To Cover In Eastern Europe",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post.jpg",
        postType: "Luxury",
        title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post2.jpg",
        postType: "Luxury",
        title: "Best cycling tours in the world",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post3.jpg",
        postType: "Road Trip",
        title: "Ten Gorgeous European Summer Island Holidays",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post4.jpg",
        postType: "Adventure",
        title: "Museums And Cathedrals To Cover In Eastern Europe",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post.jpg",
        postType: "Luxury",
        title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post2.jpg",
        postType: "Luxury",
        title: "Best cycling tours in the world",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post3.jpg",
        postType: "Road Trip",
        title: "Ten Gorgeous European Summer Island Holidays",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post4.jpg",
        postType: "Adventure",
        title: "Museums And Cathedrals To Cover In Eastern Europe",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      },
      {
        img: "img/blog/blog-post4.jpg",
        postType: "Romance",
        title: "Museums And Cathedrals To Cover In Eastern Europe",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        likes: "15660"
      }
    ];

    $scope.popularBlog = [
      {
        img: "img/blog/popular-blog.jpg",
        descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO",
        postType: "Luxury",
        postPink: true
      },
      {
        img: "img/blog/popular-blog1.jpg",
        descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO",
        postType: "Luxury",
        postPink: false
      },
      {
        img: "img/blog/popular-blog2.jpg",
        descp: "CHIC AND CHEERFUL: 10 OFFICEHOLIDAY PARTY OUTFIT IDEAS",
        postType: "Luxury",
        postPink: true
      },
      {
        img: "img/blog/popular-blog1.jpg",
        descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO"
      },
      {
        img: "img/blog/popular-blog2.jpg",
        descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO"
      },
    ];
  })
  .controller('BlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("BlogDetail");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.popularBlog = [
      {
        img: "img/blog/popular-blog.jpg",
        descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO",
        postType: "Luxury",
        postPink: true
      },
      {
        img: "img/blog/popular-blog1.jpg",
        descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO",
        postType: "Luxury",
        postPink: false
      },
      {
        img: "img/blog/popular-blog2.jpg",
        descp: "CHIC AND CHEERFUL: 10 OFFICEHOLIDAY PARTY OUTFIT IDEAS",
        postType: "Luxury",
        postPink: true
      },
      {
        img: "img/blog/popular-blog1.jpg",
        descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO"
      },
      {
        img: "img/blog/popular-blog2.jpg",
        descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO"
      },
    ];

    $scope.blogPostDetail = [
      {
        heading : "Best Holiday Destinations For Girl - Gangs",
        timestampDate: "14 Jan,2014",
        timestampHour: "1:20 pm",
        journeyType: "Luxury",
        journeyList:[
          {
            journeyImg : "img/blog/journey-post.jpg",
            cityName: "Dublin",
            countryName: "Ireland",
            journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
          },
          {
            journeyImg : "img/blog/journey-post2.jpg",
            cityName: "Dublin",
            countryName: "Ireland",
            journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
          },
          {
            journeyImg : "img/blog/journey-post3.jpg",
            cityName: "Dublin",
            countryName: "Ireland",
            journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
          },
          {
            journeyImg : "img/blog/journey-post4.jpg",
            cityName: "Dublin",
            countryName: "Ireland",
            journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
          },
        ]
      }
    ];

        $scope.blogPost = [
          {
            img: "img/blog/blog-post.jpg",
            postType: "Luxury",
            title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
            timestampDate: "14 Jan,2014",
            timestampHour: "1:20 pm",
            likes: "15660"
          },
          {
            img: "img/blog/blog-post2.jpg",
            postType: "Luxury",
            title: "Best cycling tours in the world",
            timestampDate: "14 Jan,2014",
            timestampHour: "1:20 pm",
            likes: "15660"
          },
          {
            img: "img/blog/blog-post3.jpg",
            postType: "Road Trip",
            title: "Ten Gorgeous European Summer Island Holidays",
            timestampDate: "14 Jan,2014",
            timestampHour: "1:20 pm",
            likes: "15660"
          },
          {
            img: "img/blog/blog-post4.jpg",
            postType: "Adventure",
            title: "Museums And Cathedrals To Cover In Eastern Europe",
            timestampDate: "14 Jan,2014",
            timestampHour: "1:20 pm",
            likes: "15660"
          }
        ];
        $scope.travelLife = [{
          heading: "Editor",
          timestampDate: "14 Jan, 2014",
          timestampHour: "01:20 pm",
          imgTravelled: "img/london.jpg",
          Travelledtag: "London Eye",
          photoCount: "28",
          videoCount: "5",
          locationVisited: "9",
          itineraryType1: "img/sunset.png",
          itineraryType2: "img/bag-journey.png",
          itineraryType3: "img/luxury-journey.png",
          travelledDay: "75",
          onwayTag: "love in paris",
          imgOnway: "img/paris.jpg",
          cost: "$10,000",
          spendingDay: "75",
          likes: "15660",
          reviews: "354",
          pointReview: "4.5",
          countryVisit: [{
            imgFlag: "img/india-visit.png"
          }, {
            imgFlag: "img/england-visit.png"
          }, {
            imgFlag: "img/canada-visit.png",
          }, ]
        },  {
          heading: "Editor",
          timestampDate: "14 Jan, 2014",
          timestampHour: "01:20 pm",
          imgTravelled: "img/london.jpg",
          Travelledtag: "London Eye",
          photoCount: "28",
          videoCount: "5",
          locationVisited: "9",
          itineraryType1: "img/sunset.png",
          itineraryType2: "img/bag-journey.png",
          itineraryType3: "img/luxury-journey.png",
          travelledDay: "75",
          onwayTag: "love in paris",
          imgOnway: "img/paris.jpg",
          cost: "$10,000",
          spendingDay: "75",
          likes: "15660",
          reviews: "354",
          pointReview: "4.5",
          countryVisit: [{
            imgFlag: "img/india-visit.png"
          }, {
            imgFlag: "img/england-visit.png"
          }, {
            imgFlag: "img/canada-visit.png",
          }, ]
        },
         {
          heading: "Editor",
          timestampDate: "14 Jan, 2014",
          timestampHour: "01:20 pm",
          imgTravelled: "img/london.jpg",
          Travelledtag: "London Eye",
          photoCount: "28",
          videoCount: "5",
          locationVisited: "9",
          itineraryType1: "img/sunset.png",
          itineraryType2: "img/bag-journey.png",
          itineraryType3: "img/luxury-journey.png",
          travelledDay: "75",
          onwayTag: "love in paris",
          imgOnway: "img/paris.jpg",
          cost: "$10,000",
          spendingDay: "75",
          likes: "15660",
          reviews: "354",
          pointReview: "4.5",
          countryVisit: [{
            imgFlag: "img/india-visit.png"
          }, {
            imgFlag: "img/england-visit.png"
          }, {
            imgFlag: "img/canada-visit.png",
          }, ]
        },
         {
          heading: "Editor",
          timestampDate: "14 Jan, 2014",
          timestampHour: "01:20 pm",
          imgTravelled: "img/london.jpg",
          Travelledtag: "London Eye",
          photoCount: "28",
          videoCount: "5",
          locationVisited: "9",
          itineraryType1: "img/sunset.png",
          itineraryType2: "img/bag-journey.png",
          itineraryType3: "img/luxury-journey.png",
          travelledDay: "75",
          onwayTag: "love in paris",
          imgOnway: "img/paris.jpg",
          cost: "$10,000",
          spendingDay: "75",
          likes: "15660",
          reviews: "354",
          pointReview: "4.5",
          countryVisit: [{
            imgFlag: "img/india-visit.png"
          }, {
            imgFlag: "img/england-visit.png"
          }, {
            imgFlag: "img/canada-visit.png",
          }, ]
        }
      ];
  })
  .controller('ActivityCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("activity");
    $scope.menutitle = NavigationService.makeactive("Activity");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.activityPost = [
      {
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm"
      },
    ];

  })

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

  $scope.changeLanguage = function() {
    console.log("Language CLicked");

    if (!$.jStorage.get("language")) {
      $translate.use("hi");
      $.jStorage.set("language", "hi");
    } else {
      if ($.jStorage.get("language") == "en") {
        $translate.use("hi");
        $.jStorage.set("language", "hi");
      } else {
        $translate.use("en");
        $.jStorage.set("language", "en");
      }
    }
    //  $rootScope.$apply();
  };


});
