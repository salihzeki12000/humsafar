var initMap = {};
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
    $scope.goNext = function(val) {
      if (val == 1) {
        $scope.viewNext = 1;
        $scope.getClass = "swiper-slide-active"
      } else if (val == 2) {
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
  .controller('TripSummaryCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("tripsummary");
    $scope.menutitle = NavigationService.makeactive("TripSummary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.trip = {
      date: "12 Feb, 2016",
      dayNo: "8",
      mileage: "14700",
      tripJourneyType: [{
        imgTrip: "img/trip-summary/bar.png",
        tripType: "Restaurants <br> & Bars",
        tripTypeCount: 8
      }, {
        imgTrip: "img/trip-summary/park.png",
        tripType: "Nature <br> & Parks",
        tripTypeCount: 8
      }, {
        imgTrip: "img/trip-summary/beaches.png",
        tripType: "Beaches",
        tripTypeCount: 8
      }, ],
      countryVisited: [{
        countryImg: "img/trip-summary/korea.png",
        countryName: "Korea"
      }, {
        countryImg: "img/flag.png",
        countryName: "India"
      }, ],
      visitedCountry: "2"
    }

    $scope.visitedCountry = [{
      day: "01",
      status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
      timestampDate: "14 Jan,2014",
      timestampHour: "01:20 pm",
      travelTypeIcon: "img/ongojourney/location.png"
    }, {
      day: "02",
      status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
      photoAdd: "Added 20+ Photos",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      travelTypeIcon: "img/ongojourney/location.png"
    }, {
      day: "01",
      status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
      // photoAdd: "Added 20+ Photos",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      travelTypeIcon: "img/ongojourney/location.png"
    }, {
      day: "02",
      status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
      photoAdd: "Added 20+ Photos",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      travelTypeIcon: "img/ongojourney/location.png"
    }];

  })
  .controller('OnGoJourneyCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file
    initMap = function() {
      var tardeo = {
        lat: 18.96458,
        lng: 72.78397
      };
      // Create a new StyledMapType object, passing it an array of styles,
      // and the name to be displayed on the map type control.
      var styledMapType = new google.maps.StyledMapType(
        [{
          stylers: [{
              hue: '#b3d2fe'
            },
            // { hue: '#000' },
          ]
        }], {
          name: 'Styled Map'
        });
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: tardeo
      });

      var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
      });

      var marker = new google.maps.Marker({
        position: tardeo,
        map: map,
        title: 'Tardeo (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    }

    // $scope.$on('$viewContentLoaded', function(){
    //   $timeout(function() {
    //     initMap();
    //   },100);
    //  });

    setTimeout(function() {
      initMap();
    }, 100);

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("ongojourney");
    $scope.menutitle = NavigationService.makeactive("OnGoJourney");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


    // checkin
    $scope.editCheckIn = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/checkin.html",
        backdropClass: "review-backdrop",
        scope: $scope
      });
    };

    // $scope.$on('$viewContentLoaded', function(event) {
    //   $timeout(function(){
    //       var loadFile = function(event) {
    //       var output = document.getElementById('output');
    //       output.src = URL.createObjectURL(event.target.files[0]);
    //     };
    //     },100);
    // });

    $scope.listFriend = [
      {
        img: "img/profile.jpg",
        name: "Amit Verma"
      },
      {
        img: "img/profile.jpg",
        name: "Vignesh Kasturi"
      },
      {
        img: "img/profile.jpg",
        name: "Dhavel Gala"
      },
      {
        img: "img/profile.jpg",
        name: "Pooja Thakre"
      },
      {
        img: "img/profile.jpg",
        name: "Vinod Bhelose"
      },
      {
        img: "img/profile.jpg",
        name: "Rishabh Katoch"
      },
    ];
    // $scope.myImage = '';
    // $scope.myCroppedImage = '';
    // $scope.viewImage = false;
    // var got = setInterval(function() {
    //   if (document.getElementById('fileInput')) {
    //     console.log("got");
    //     document.getElementById('fileInput').onchange = function(evt) {
    //       var file = evt.currentTarget.files[0];
    //       var reader = new FileReader();
    //       reader.onload = function(evt) {
    //         $scope.$apply(function($scope) {
    //           console.log(evt);
    //           $scope.viewImage = true;
    //           $scope.myImage = evt.target.result;
    //         });
    //       };
    //       reader.readAsDataURL(file);
    //     };
    //     clearInterval(got);
    //   }
    // }, 1000);

    $scope.tagButton = [
      {
        img: "img/profile.jpg",
        name: "Yash Chadasama (Me)"
      },
      {
        img: "img/profile.jpg",
        name: "Amit Verma"
      },
    ];
    // checkin end

    $scope.showDropdown = -1;
    $scope.editOption = function(byIndex) {
      if ($scope.showDropdown == byIndex) {
        $scope.showDropdown = -1;
      } else {
        $scope.showDropdown = byIndex;
      }
    };

    $scope.options = {
      minDate: new Date(),
      showWeeks: false
    };


    // review country visited pop up
    $scope.giveReview = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/review-post.html",
        scope: $scope,
        backdropClass: "review-backdrop"
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
    // review country visited pop up end
    // edit journey name
    $scope.nameJourney = function() {
        $uibModal.open({
          animation: true,
          templateUrl: "views/modal/journey-name.html",
          scope: $scope,
          backdropClass: "review-backdrop"
        });
      }
      // edit journey name end
      // cover photo
    $scope.coverPhoto = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/journey-cover.html",
        scope: $scope,
        backdropClass: "review-backdrop",
        windowClass: "cover-modal"
      });
    };
    $scope.galleryCover = [
      'img/london.jpg',
      'img/paris.jpg',
      'img/india-gate.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/blog/blog-post.jpg',
      'img/blog/blog-post2.jpg',
      'img/blog/blog-post3.jpg',
      'img/london.jpg',
      'img/paris.jpg',
      'img/india-gate.jpg',
      'img/slider1.jpg',
      'img/slider2.jpg',
      'img/blog/blog-post.jpg',
      'img/blog/blog-post2.jpg',
      'img/blog/blog-post3.jpg',
    ];


    // cover photo end
    $scope.cropCover = function(imgCrop) {
      $scope.showCover = imgCrop;
      $scope.cropImage = true;
    };
    $scope.viewPrev = function() {
      // $scope.showCover = imgCrop;
      $scope.cropImage = false;
    };

    // edit date and time
    $scope.changeDate = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/date-time.html",
        scope: $scope,
        backdropClass: "review-backdrop",
      })
    };
    // edit date and time end

    $scope.travelBuddy = [
      'img/ongojourney/adrena.jpg',
      'img/ongojourney/monish.jpg',
      'img/ongojourney/malhar.jpg'
    ];

    $scope.ongoJourney = [{
      profilepic: "img/adrena.jpg",
      post: "First time together in London... A trip after ages!! at 27 You with <b>Monish Shah</b>, <b>Malhar Gala</b> & <b>Nida Kapadia</b>",
      journeyDay: "01",
      journeyDate: "14 Jan, 2014",
      journeyTime: "01:20 pm",
      journeyTypeicon: "img/ongojourney/location.png",
      journeyPhoto: "img/ongojourney/ongopic.jpg",
      like: "1550",
      relatedPhoto: [
        'img/ongojourney/slider1.jpg',
        'img/ongojourney/slider2.jpg',
        'img/ongojourney/slider3.jpg',
        'img/ongojourney/slider4.jpg',
        'img/ongojourney/slider5.jpg',
        'img/ongojourney/slider1.jpg',
        'img/ongojourney/slider2.jpg',
      ],
    }, {
      profilepic: "img/adrena.jpg",
      post: "First time together in London... A trip after ages!! at 27 You with Monish Shah,Malhar Gala &amp; Nida Kapadia",
      journeyDay: "01",
      journeyDate: "14 Jan, 2014",
      journeyTime: "01:20 pm",
      journeyTypeicon: "img/ongojourney/camera.png",
      journeyPhoto: "img/ongojourney/ongopic2.jpg",
      like: "1550",
      viewRelatepic: [
        'img/ongojourney/related1.jpg',
        'img/ongojourney/related2.jpg'
      ],
    }, {
      class: "only-post",
      profilepic: "img/adrena.jpg",
      post: "First time together in London... A trip after ages!! at 27 You with Monish Shah,Malhar Gala &amp; Nida Kapadia",
      journeyDay: "01",
      journeyDate: "14 Jan, 2014",
      journeyTime: "01:20 pm",
      journeyTypeicon: "img/ongojourney/thought.png",
      like: "1550",
    }, {
      profilepic: "img/adrena.jpg",
      post: "First time together in London... A trip after ages!! at 27 You with Monish Shah,Malhar Gala &amp; Nida Kapadia",
      journeyDay: "01",
      journeyDate: "14 Jan, 2014",
      journeyTime: "01:20 pm",
      journeyTypeicon: "img/ongojourney/video.png",
      video: "img/ongojourney/video-journey.jpg",
      like: "1550",
    }, ];

    setTimeout(function() {
      $('.flexslider').flexslider({
        itemMargin: 10,
        itemWidth: 95,
        animation: "slide",
        mousewheel: true,
        controlNav: false,
      });
    }, 100);
  })
  .controller('MylifeCtrl', function($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("mylife");
    $scope.menutitle = NavigationService.makeactive("Mylife");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    var allMyLife = ["views/content/myLife/journey.html", "views/content/myLife/moments.html", "views/content/myLife/reviews.html", "views/content/myLife/holidayplanner.html"];
    $scope.myLife = {
      profileMain: "views/content/myLife/profile.html",
      innerView: allMyLife[0]
    };
    // change url
    $scope.viewTab = 1;
    switch ($state.params.name) {
      case "journey":
        $scope.myLife.innerView = allMyLife[0];
        break;
      case "moments":
        $scope.myLife.innerView = allMyLife[1];
        break;
      case "reviews":
        $scope.myLife.innerView = allMyLife[2];
        break;
      case "holidayplanner":
        $scope.myLife.innerView = allMyLife[3];
        break;
      default:
        $scope.myLife.innerView = allMyLife[0];
    }
    $scope.getTab = function(view) {
      $scope.myLife.innerView = allMyLife[view];
      var url = "journey";
      switch (view) {
        case 0:
          url = "journey";
          break;
        case 1:
          url = "moments";
          break;
        case 2:
          url = "reviews";
          break;
        case 3:
          url = "holidayplanner";
          break;

      }
      console.log(url);
      $state.go("mylife", {
        name: url
      }, {
        notify: false
      });
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
    // journey json
    $scope.buildNow = function() {
      $scope.$broadcast('rebuild:me');
    }
    $scope.$on('scrollbar.hide', function() {
      // console.log('Scrollbar hide');
    });
    $scope.$on('scrollbar.show', function() {
      // console.log('Scrollbar show');
    });

    $scope.openLocalimg = function(getVal) {
      // $scope.showimgData = $scope.localLife[getVal];
      $scope.showimgData = getVal;
      // console.log(getVal);
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/local-imgview.html",
        scope: $scope,
        windowTopClass: "local-imgview-pop"
      })
    };

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

    // moments json
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
    // reviews json
    $scope.oneAtATime = true;

    $scope.getReview = function() {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/review-post.html",
        scope: $scope,
        backdropClass: "review-backdrop"
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
    // holidayplanner json


  })
  .controller('JourneyCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("journey");
    $scope.menutitle = NavigationService.makeactive("Journey");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


    // $(document).ready(function() {
    //   setTimeout(function() {
    //     $('html, body').animate({
    //       scrollTop: $("#tabs").offset().top
    //     }, 1000);
    //   }, 100);
    // });
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

    $scope.openLocalimg = function(getVal) {
      // $scope.showimgData = $scope.localLife[getVal];
      $scope.showimgData = getVal;
      // console.log(getVal);
      console.log("localImg");
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/local-imgview.html",
        scope: $scope,
        windowTopClass: "local-imgview-pop"
      })
    };

  })
  .controller('MomentsCtrl', function($scope, TemplateService, NavigationService, $timeout, $location, $anchorScroll) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("moments");
    $scope.menutitle = NavigationService.makeactive("Moments");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


  })
  .controller('ReviewsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("reviews");
    $scope.menutitle = NavigationService.makeactive("Reviews");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


  })
  .controller('HolidayPlannerCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("holidayplanner");
    $scope.menutitle = NavigationService.makeactive("HolidayPlanner");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


  })
  .controller('OtherProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("otherprofile");
    $scope.menutitle = NavigationService.makeactive("OtherProfile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('OtherJourneyCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("otherjourney");
    $scope.menutitle = NavigationService.makeactive("OtherJourney");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

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

    $scope.open1 = function() {
      $scope.popup1.opened = true;
      showWeeks: false;
    };
    $scope.popup1 = {
      opened: false
    };

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

    $scope.showSetting = 1;
    $scope.setting = function(val) {
      if (val == 1) {
        $scope.showSetting = 1;
      } else if (val == 2) {
        $scope.showSetting = 2;
      } else if (val == 3) {
        $scope.showSetting = 3;
      } else if (val == 4) {
        $scope.showSetting = 4;
      } else if (val == 5) {
        $scope.showSetting = 5;
      } else if (val == 6) {
        $scope.showSetting = 6;
      } else {
        $scope.showSetting = 1;
      }
    };
    // datepicker


    // datepicker end

    $scope.holidayType = function(val) {
      if ($scope.chooseHoliday[val].class == "active-holiday") {
        $scope.chooseHoliday[val].class = "";
      } else {
        $scope.chooseHoliday[val].class = "active-holiday";
      }
    };
    $scope.usuallyType = function(val) {
      if ($scope.usuallyGo[val].class == "active-holiday") {
        $scope.usuallyGo[val].class = "";
      } else {
        $scope.usuallyGo[val].class = "active-holiday";
      }
    };
    $scope.travelType = function(val) {
      if ($scope.preferTravel[val].class == "active-holiday") {
        $scope.preferTravel[val].class = "";
      } else {
        $scope.preferTravel[val].class = "active-holiday";
      }
    };
    $scope.idealType = function(val) {
      if ($scope.idealSelect[val].class == "active-holiday") {
        $scope.idealSelect[val].class = "";
      } else {
        $scope.idealSelect[val].class = "active-holiday";
      }
    };
    $scope.chooseHoliday = [{
      img: "img/beach.png",
      caption: "Island & Beach",
      class: "active-holiday"
    }, {
      img: "img/city.png",
      caption: "City"
    }, {
      img: "img/safari.png",
      caption: "Safari"
    }, {
      img: "img/mountain.png",
      caption: "Mountains"
    }, {
      img: "img/cruise.png",
      caption: "Cruise"
    }, {
      img: "img/countryside.png",
      caption: "Countryside"
    }];

    $scope.usuallyGo = [{
      img: "img/map.png",
      caption1: "By the map",
      class: "active-holiday"
    }, {
      img: "img/road.png",
      caption1: "Where the",
      caption2: "road takes you"
    }, {
      img: "img/both.png",
      caption1: "A little bit",
      caption2: "of both"
    }, ];

    $scope.preferTravel = [{
      img: "img/family.png",
      caption: "Family",
      class: "active-holiday"
    }, {
      img: "img/friends.png",
      caption: "Friends"
    }, {
      img: "img/spouse.png",
      caption: "Partner/Spouse"
    }, {
      img: "img/solo.png",
      caption: "Solo"
    }, {
      img: "img/business.png",
      caption: "Business"
    }, {
      img: "img/blogger.png",
      caption: "Blogger"
    }, {
      img: "img/grouptour.png",
      caption: "Group Tour"
    }, {
      img: "img/photographer.png",
      caption: "Photographer"
    }, ];

    $scope.idealSelect = [{
      img: "img/luxury.png",
      caption1: "luxury",
      class: "active-holiday"
    }, {
      img: "img/backpacking.png",
      caption1: "Backpacking"
    }, {
      img: "img/greentravelling.png",
      caption1: "Green",
      caption2: "travelling"
    }, {
      img: "img/pocketfriendly.png",
      caption1: "Pocket",
      caption2: "friendly"
    }, {
      img: "img/romance.png",
      caption1: "Romance"
    }, {
      img: "img/sportandadventure.png",
      caption1: "Sports &",
      caption2: "Adventure"
    }, {
      img: "img/historyandculture.png",
      caption1: "History &",
      caption2: "Culture"
    }, {
      img: "img/spirituality.png",
      caption1: "Spirituality &",
      caption2: "Wellness"
    }, {
      img: "img/shopping.png",
      caption1: "Shopping"
    }, {
      img: "img/foodandwine.png",
      caption1: "Food & Wine"
    }, {
      img: "img/festival.png",
      caption1: "Festivals"
    }];

  })
  .controller('BlogCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blog");
    $scope.menutitle = NavigationService.makeactive("Blog");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.blogPost = [{
      img: "img/blog/blog-post.jpg",
      postType: "Luxury",
      title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post2.jpg",
      postType: "Luxury",
      title: "Best cycling tours in the world",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post3.jpg",
      postType: "Road Trip",
      title: "Ten Gorgeous European Summer Island Holidays",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post4.jpg",
      postType: "Adventure",
      title: "Museums And Cathedrals To Cover In Eastern Europe",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post.jpg",
      postType: "Luxury",
      title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post2.jpg",
      postType: "Luxury",
      title: "Best cycling tours in the world",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post3.jpg",
      postType: "Road Trip",
      title: "Ten Gorgeous European Summer Island Holidays",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post4.jpg",
      postType: "Adventure",
      title: "Museums And Cathedrals To Cover In Eastern Europe",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post.jpg",
      postType: "Luxury",
      title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post2.jpg",
      postType: "Luxury",
      title: "Best cycling tours in the world",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post3.jpg",
      postType: "Road Trip",
      title: "Ten Gorgeous European Summer Island Holidays",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post4.jpg",
      postType: "Adventure",
      title: "Museums And Cathedrals To Cover In Eastern Europe",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post4.jpg",
      postType: "Romance",
      title: "Museums And Cathedrals To Cover In Eastern Europe",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }];

    $scope.popularBlog = [{
      img: "img/blog/popular-blog.jpg",
      descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO",
      postType: "Luxury",
      postPink: true
    }, {
      img: "img/blog/popular-blog1.jpg",
      descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO",
      postType: "Luxury",
      postPink: false
    }, {
      img: "img/blog/popular-blog2.jpg",
      descp: "CHIC AND CHEERFUL: 10 OFFICEHOLIDAY PARTY OUTFIT IDEAS",
      postType: "Luxury",
      postPink: true
    }, {
      img: "img/blog/popular-blog1.jpg",
      descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO"
    }, {
      img: "img/blog/popular-blog2.jpg",
      descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO"
    }, ];
  })
  .controller('BlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("BlogDetail");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.popularBlog = [{
      img: "img/blog/popular-blog.jpg",
      descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO",
      postType: "Luxury",
      postPink: true
    }, {
      img: "img/blog/popular-blog1.jpg",
      descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO",
      postType: "Luxury",
      postPink: false
    }, {
      img: "img/blog/popular-blog2.jpg",
      descp: "CHIC AND CHEERFUL: 10 OFFICEHOLIDAY PARTY OUTFIT IDEAS",
      postType: "Luxury",
      postPink: true
    }, {
      img: "img/blog/popular-blog1.jpg",
      descp: "PLACES TO SHOP FOR KIDS THATYOU’LL WISH YOU KNEW ABO"
    }, {
      img: "img/blog/popular-blog2.jpg",
      descp: "A FASHION LOVER’S GUIDE: THEBEST PICKING SHOES FOR YO"
    }, ];

    $scope.blogPostDetail = [{
      heading: "Best Holiday Destinations For Girl - Gangs",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      journeyType: "Luxury",
      journeyList: [{
        journeyImg: "img/blog/journey-post.jpg",
        cityName: "Dublin",
        countryName: "Ireland",
        journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
      }, {
        journeyImg: "img/blog/journey-post2.jpg",
        cityName: "Dublin",
        countryName: "Ireland",
        journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
      }, {
        journeyImg: "img/blog/journey-post3.jpg",
        cityName: "Dublin",
        countryName: "Ireland",
        journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
      }, {
        journeyImg: "img/blog/journey-post4.jpg",
        cityName: "Dublin",
        countryName: "Ireland",
        journeyDescp: "Going on a holiday with family is always fun. But sometimes you need to get way from all that family drama and have a girls-only weekend. Going on a shopping spree, enjoying spas together, drinking & partying all night or just lazing on the beach – nothing can beat that when you are with your girl-gang. So ladies, grab your lipstick and heels and get ready for some seriously sassy getaway with our list of 10 best holiday destinations for girl-gangs:"
      }, ]
    }];

    $scope.blogPost = [{
      img: "img/blog/blog-post.jpg",
      postType: "Luxury",
      title: "BEST HOLIDAY DESTINATIONS FOR GIRL-GANGS",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post2.jpg",
      postType: "Luxury",
      title: "Best cycling tours in the world",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post3.jpg",
      postType: "Road Trip",
      title: "Ten Gorgeous European Summer Island Holidays",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }, {
      img: "img/blog/blog-post4.jpg",
      postType: "Adventure",
      title: "Museums And Cathedrals To Cover In Eastern Europe",
      timestampDate: "14 Jan,2014",
      timestampHour: "1:20 pm",
      likes: "15660"
    }];
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
    }, {
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
    }, {
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
    }, {
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
    }];
  })
  .controller('ActivityCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("activity");
    $scope.menutitle = NavigationService.makeactive("Activity");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.activityPost = [{
      class: "travel-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
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
      }, ],
      editor: false,
      userPic: true,
      follow: true,
      following: false,
      postIcon: false,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: true,
      onJourney: false,
      getpopularPost: false,
      activitySec: true,
      visitPost: false
    }, {
      class: "travel-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey photo slider",
      relatedPhoto: [
        'img/blog/blog-post.jpg',
        'img/blog/blog-post2.jpg',
        'img/blog/blog-post3.jpg',
        'img/blog/blog-post4.jpg',
        'img/blog/blog-post.jpg',
        'img/blog/blog-post2.jpg',
        'img/blog/blog-post3.jpg',
        'img/blog/blog-post4.jpg',
      ],
      editor: false,
      userPic: true,
      follow: false,
      following: true,
      postIcon: true,
      video: false,
      photo: true,
      photoSlider: true,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      activitySec: true,
      visitPost: false
    }, {
      class: "travel-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: true,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "travel-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: true,
      video: false,
      photo: true,
      photoSlider: false,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "travel-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: false,
      video: true,
      photo: false,
      photoSlider: false,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "travel-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
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
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: false,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: false,
      onJourney: true,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "editor",
      profilePic: "img/profile-main.png",
      userName: "Editor",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
      imgTravelled: "img/london.jpg",
      Travelledtag: "London Eye",
      photoCount: "28",
      videoCount: "5",
      locationVisited: "9",
      itineraryType1: "img/sunset.png",
      itineraryType2: "img/bag-journey.png",
      itineraryType3: "img/luxury-journey.png",
      travelledDay: "75",
      editor: true,
      userPic: false,
      follow: false,
      following: false,
      postIcon: false,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: true,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "editor",
      profilePic: "img/profile-main.png",
      userName: "Editor",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
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
      editor: true,
      userPic: false,
      follow: false,
      following: false,
      postIcon: false,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: false,
      onJourney: true,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "local-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
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
      }, ],
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: false,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: true,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "local-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey local photoslider",
      relatedPhoto: [
        'img/blog/blog-post.jpg',
        'img/blog/blog-post2.jpg',
        'img/blog/blog-post3.jpg',
        'img/blog/blog-post4.jpg',
        'img/blog/blog-post.jpg',
        'img/blog/blog-post2.jpg',
        'img/blog/blog-post3.jpg',
        'img/blog/blog-post4.jpg',
      ],
      editor: false,
      userPic: true,
      follow: false,
      following: true,
      postIcon: true,
      video: false,
      photo: true,
      photoSlider: true,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "local-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: false,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "local-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: false,
      video: false,
      photo: true,
      photoSlider: false,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "local-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: false,
      video: true,
      photo: false,
      photoSlider: false,
      travelledJourney: false,
      onJourney: false,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "local-life",
      profilePic: "img/profile-main.png",
      userName: "John Doe",
      timestampDate: "14 Jan, 2014",
      timestampHour: "01:20 pm",
      status: "Has started his London Journey",
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
      editor: false,
      userPic: true,
      follow: false,
      following: false,
      postIcon: false,
      video: false,
      photo: false,
      photoSlider: false,
      travelledJourney: false,
      onJourney: true,
      getpopularPost: false,
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      class: "popular-activity",
      visitPost: false,
      getpopularPost: true,
      activitySec: false,
      postPopular: [{
        heading: "Popular Travelers",
        listPopular: [{
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }],
      }],
    }, {
      class: "popular-activity",
      visitPost: false,
      getpopularPost: true,
      activitySec: false,
      postPopular: [{
        heading: "Popular Agents",
        listPopular: [{
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }, {
          profile: "img/profile-main.png",
          name: "Rolandia Travel",
          location: "London",
          follower: "1994",
        }],
      }],
    }, {
      class: "visiting-post local-visit",
      visitPost: true,
      getpopularPost: false,
      activitySec: false,
      getvisitPost: [{
        imgVisit: "img/india-gate.jpg",
        locationLocal: "Mumbai",
        tag: "Must Do's in Mumbai,India",
        travelVisit: false,
        localVisit: true,
        cityTag: true,
        rating: false,
        flag: false,
        visitSlider: true,
        visitImg: false,
        localLifeMain: true,
        visitedPost: [{
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, ],
      }, ],
    }, {
      class: "visiting-post local-visit",
      visitPost: true,
      getpopularPost: false,
      activitySec: false,
      getvisitPost: [{
        imgVisit: "img/india-gate.jpg",
        locationLocal: "India",
        travelVisit: false,
        localVisit: true,
        cityTag: false,
        rating: true,
        peopleBeen: 33,
        flag: true,
        visitSlider: true,
        visitImg: false,
        localLifeMain: true,
        visitedPost: [{
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, {
          imgSlider: "img/small-activity-slider.jpg",
          visitName: "#1 Shree Siddhivinayak",
        }, ],
      }, ],
    }, {
      class: "visiting-post travel-visit",
      visitPost: true,
      getpopularPost: false,
      activitySec: false,
      getvisitPost: [{
        imgVisit: "img/india-gate.jpg",
        locationLocal: "Mumbai",
        tagTravel: "Book Your Travel form take off to touchdown!",
        travelVisit: true,
        localVisit: false,
        visitSlider: false,
        visitImg: true,
        localLifeMain: false,
      }, ],
    }, ];

    setTimeout(function() {
      $('.travelocal-slider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 150,
        itemMargin: 3,
        mousewheel: true,
        directionNav: false,
        controlNav: false,
      });
    }, 100);

  })
  .controller('ItineraryCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("itinerary");
    $scope.menutitle = NavigationService.makeactive("Itinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

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
