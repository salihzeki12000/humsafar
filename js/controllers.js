var globalGetProfile = function (data, status) {
  if (data._id) {
    $.jStorage.set("isLoggedIn", true);
    $.jStorage.set("profile", data);
  } else {
    $.jStorage.flush();
  }
};
var pointsForLine;
var line = [];
var markers = [];
var travelPath;
var initMap = function () {};
var map;
var center = {};
var centers = [];
markers[0] = {};
angular.module('phonecatControllers', ['templateservicemod', 'mylife', 'ongojourney', 'navigationservice', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'angularFileUpload', 'ngImgCrop', 'mappy', 'wu.masonry', 'ngScrollbar', 'ksSwiper', 'ui.tinymce'])

.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
  //Used to name the .html file

  console.log("Testing Consoles");

  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.section = {
    one: "views/section/mainhome.html",
    two: "views/section/travellife.html",
    three: "views/section/locallife.html",
    four: "views/section/mylife.html",
    five: "views/section/share.html",
  };
  $scope.changePage = function (text) {
    // console.log(text);
    var length = $(".fp-section").length;
    // console.log(length);
    // console.log($(".fp-section"));
    if (length === 0) {
      $('.fullpage').fullpage();
    }
    // console.log(text);
    $scope.homeval = text;
    switch (text) {
      case "share":
        $.fn.fullpage.moveTo(5);
        break;
      case "mylife":
        $.fn.fullpage.moveTo(4);
        break;
      case "locallife":
        $.fn.fullpage.moveTo(3);
        break;
      case "travellife":
        $.fn.fullpage.moveTo(2);
        break;
      case "home":
        $.fn.fullpage.moveTo(1);
        break;
      default:
        $.fn.fullpage.moveTo(1);
        break;
    }
  };
  setTimeout(function () {
    $('.scene').parallax();
    $('.fullpage').fullpage({
      //Navigation
      onLeave: function (index, nextIndex, direction) {

        $timeout(function () {
          swiper.slideTo(nextIndex - 1);
          //playing the video

          $('video').get(nextIndex - 1).load();
          $('video').get(nextIndex - 1).play();
          console.log(nextIndex - 1);
        }, 0);

      }
    });


    $scope.vidplay = function () {
      var video = document.getElementById("Video1");
      var button = document.getElementById("play");
      if (video.paused) {
        video.play();
      }
    };
    swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      direction: 'vertical',
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 0,
      mousewheelControl: false,
      mousewheelForceToAxis: false,
      keyboardControl: false,
      parallax: true,
      hashnav: true
    });
  }, 500);

  $scope.$on('$viewContentLoaded', function () {
    $timeout(function () {
      $('body').addClass('fp-');
      $scope.changePage($stateParams.id);
    }, 1000);
  });
})

.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $interval, $state) {
    //Used to name the .html file
    var stopinterval;
    $scope.userData = $.jStorage.get("profile");
    $scope.template = TemplateService.changecontent("login");
    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.headerfixed = "fixed-header";
    $scope.animationsEnabled = true;
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }

    $scope.openalreadyexist = function (size) {
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/alreadyexist.html',
        controller: 'LoginCtrl',
        scope: $scope,
        windowClass: "notexist",
        size: "sm"
      });
    };

    var checktwitter = function (data, status) {
      var repdata = {};
      // console.log(data);
      if (data._id) {
        $interval.cancel(stopinterval);
        ref.close();
        $.jStorage.set("isLoggedIn", true);
        $.jStorage.set("profile", data);
        var alreadyLoggedIn = data.alreadyLoggedIn;
        if (alreadyLoggedIn === true) {
          $state.go('mylife');
        } else if (alreadyLoggedIn === false) {
          $state.go('mainpage');
        }
      } else {

      }
    };

    var callAtIntervaltwitter = function () {
      NavigationService.getProfile(checktwitter, function (err) {
        console.log(err);
      });
    };

    var authenticatesuccess = function (data, status) {

      console.log("authenticate successful");
      $ionicLoading.hide();
      $interval.cancel(stopinterval);
    };

    $scope.socialLogin = function (loginTo) {
      ref = window.open(adminURL + "/user/" + loginTo, '_blank', 'location=no');
      stopinterval = $interval(callAtIntervaltwitter, 2000);
      // ref.addEventListener('exit', function (event) {
      //   console.log("Window closed");
      //   NavigationService.getProfile(authenticatesuccess, function (err) {
      //     console.log(err);
      //   });

      // });
      ref.onbeforeunload = function (e) {
        $interval.cancel(stopinterval);
        console.log("close call");
        authenticatesuccess();
      }
    };

  })
  .controller('ForgotPasswordCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
    //Used to name the .html file
    console.log("Testing Consoles");
    $scope.template = TemplateService.changecontent("forgot-password");
    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    $scope.template.header = "";
    $scope.template.footer = "";
    $scope.showErr = false;
    $scope.showErr1 = false;
    $scope.formData = {};
    $scope.formData.password = "";
    $scope.formData.confirmPassword = "";
    $scope.userData = {};
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }
    if ($stateParams.token && $stateParams.email) {
      NavigationService.checkToken({
        token: decodeURIComponent($stateParams.token),
        email: $stateParams.email
      }, function (data) {
        if (data.value) {
          $scope.showErr = false;
        } else {
          $scope.showErr = true;
        }
      });
    } else {
      $scope.showErr = true;
    }
    $scope.type = function () {
      if ($scope.formData.password === "" && $scope.formData.confirmPassword === "") {
        $scope.showErr1 = false;
      } else {
        if ($scope.formData.password !== "" && $scope.formData.confirmPassword === "") {
          $scope.showErr1 = false;
        } else if ($scope.formData.password === $scope.formData.confirmPassword) {
          $scope.showErr1 = false;
        } else {
          $scope.showErr1 = true;
        }
      }
    }
    $scope.change = function () {
      if ($scope.formData.password === $scope.formData.confirmPassword && $scope.showErr === false && $scope.showErr1 === false) {
        $scope.formData.token = decodeURIComponent($stateParams.token);
        $scope.formData.email = $stateParams.email;
        NavigationService.changePasswordEmail($scope.formData, function (data) {
          if (data.value) {
            $scope.opensucessfull();
            NavigationService.getProfile(globalGetProfile, function (err) {
              $.jStorage.set("profile", data);
            });
          } else {
            $scope.showErr = true;
          }
        });
      } else {
        $scope.showErr1 = true;
      }
    }
    if (!_.isEmpty($.jStorage.get("profile"))) {
      $scope.userData = $.jStorage.get("profile");
    }
    $scope.opensucessfull = function (size) {
      $uibModal.open({
        animation: true,
        templateUrl: 'views/modal/sucessfull.html',
        controller: 'ForgotPasswordCtrl',
        scope: $scope,
        windowClass: "notexist",
        size: "sm"
      });
    };

  })
  .controller('ForgotPasswordEmailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("forgot-password-email");
    $scope.menutitle = NavigationService.makeactive("Forgot Password");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    $scope.template.header = "";
    $scope.template.footer = "";
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }


  })
  .controller('ContactCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("contact");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    $scope.template.header = "";
    $scope.template.footer = "";
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }


  })

.controller('BookingCtrl', ['fileUpload', "$scope", function ($scope, TemplateService, NavigationService, $timeout, $uibModal, fileUpload) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("booking");
    $scope.menutitle = NavigationService.makeactive("Booking");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    $scope.template.header = "";
    $scope.template.footer = "";
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }


  }])
  .controller('AdvertiseCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("advertise");
    $scope.menutitle = NavigationService.makeactive("Advertise");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    $scope.template.header = "";
    $scope.template.footer = "";
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }


  })

.controller('MainPageCtrl', ['$scope', 'TemplateService', 'NavigationService', '$timeout', '$http', '$state', 'FileUploadService', 'FileUploader', function ($scope, TemplateService, NavigationService, $timeout, $http, $state, FileUploadService, FileUploader) {
    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.form = {};
    $scope.template = TemplateService.changecontent("mainpage");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    TemplateService.footer = "";
    $scope.navigation = NavigationService.getnav();
    $scope.userData = {};
    $scope.profile = $.jStorage.get("profile");
    setTimeout(function () {
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
    $scope.goNext = function (val) {
      if (val == 1) {
        $scope.viewNext = 1;
        $scope.getClass = "swiper-slide-active";
      } else if (val == 2) {
        $scope.viewNext = 2;
        $scope.getClass2 = "swiper-slide-active";
      }

    };
    $scope.profile = $.jStorage.get("profile");
    // if ($scope.profile.gender != "") {
    //   $scope.userData.gender = $scope.profile.gender;
    //   if ($scope.profile.gender == "male") {
    //     $scope.gender = 1;
    //   } else {
    //     $scope.gender = 2;
    //   }
    // }
    // if ($scope.profile.profilePicture != null) {
    //   $scope.userData.profilePicture = $scope.profile.profilePicture;
    // }
    $scope.changeGender = function (id, name) {
      $scope.gender = id;
      $scope.userData.gender = name;
    };

    //gets all the countries from database
    var getAllCountries = function (data, status) {
      if (data.value) {
        $scope.nationality = data.data;
      } else {
        console.log("Error Fetching Data");
      }
    };

    NavigationService.getAllCountries(getAllCountries, function (err) {
      console.log(err);
    });


    //End-Of get all the countries from database

    //gets all the cities from database
    var getAllCities = function (data, status) {
      if (data.value) {
        $scope.cities = data.data.predictions;
      } else {
        console.log("Eroor Fetching Data");
      }
    };

    $scope.searchByKey = function (searchCity) {
      NavigationService.getAllCities({
        "search": searchCity
      }, getAllCities, function (err) {
        console.log(err);
      });
    };
    //End-Of get all the cities from database
    var saveDataCallback = function (data, status) {
      if (data.value == true) {
        console.log(data);
        NavigationService.getProfile(globalGetProfile, function (err) {
          console.log(err);
        });
      } else {
        console.log(data);
      }
    }

    $scope.saveUserData = function (userData) {
      console.log(userData.profilePicture);
      $state.go('holiday');
      NavigationService.saveUserData(userData, saveDataCallback, function (err) {
        console.log(err);
      });
    }

    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.showImage = false;
    var i = 1;
    var got = setInterval(function () {
      console.log(i);
      if (document.getElementById('fileInput')) {
        document.getElementById('fileInput').onchange = function (evt) {
          console.log($scope.myCroppedImage);
          var file = evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
              $scope.showImage = true;
              $scope.myImage = evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        clearInterval(got);
      }
      i++;
    }, 1000);









    // var dataURItoBlob = function (dataURI) {
    //     // convert base64/URLEncoded data component to raw binary data held in a string
    //     var byteString;
    //     if (dataURI.split(',')[0].indexOf('base64') >= 0)
    //       byteString = atob(dataURI.split(',')[1]);
    //     else
    //       byteString = unescape(dataURI.split(',')[1]);

    //     // separate out the mime component
    //     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    //     // write the bytes of the string to a typed array
    //     var ia = new Uint8Array(byteString.length);
    //     for (var i = 0; i < byteString.length; i++) {
    //       ia[i] = byteString.charCodeAt(i);
    //     }

    //     return new Blob([ia], {
    //       type: mimeString
    //     });
    //   }
    //   //Angular-file-upload starts here

    $scope.file = {
      myFile: "Chintan"
    };
    $scope.uploadFile = function () {
      var file = $scope.file.myFile;

      console.log('file is ');
      console.dir($scope.file.myFile);

      FileUploadService.uploadFileToUrl(file, uploadurl);
    };
    //angular file upload ends here

    // $scope.getImage = function(){
    //   if() {
    //     $scope.showImage = true;
    //   }else {
    //     $scope.showImage = false;
    //   }
    // };

  }])
  .controller('HolidayCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.listOfCategories = {
      'travelConfig': {
        'holidayType': [],
        'preferToTravel': [],
        'usuallyGo': [],
        'kindOfHoliday': []
      }
    };
    $scope.template = TemplateService.changecontent("holiday");
    $scope.menutitle = NavigationService.makeactive("Holiday");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.holidayKindType = [{
      img: "img/beach.png",
      caption: "Island & Beach"
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
    }, ];
    $scope.usuallygoHoliday = [{
      img: "img/map.png",
      caption: "By the map",
      caption1: ""
    }, {
      img: "img/road.png",
      caption: "Where the",
      caption1: "road takes you"
    }, {
      img: "img/both.png",
      caption: "A little bit",
      caption1: "of both"
    }, ];

    $scope.travelPrefer = [{
      img: "img/family.png",
      caption: "Family"
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
    }];
    $scope.idealHoliday = [{
      img: "img/luxury.png",
      caption: "Luxury",
      caption1: ""
    }, {
      img: "img/backpacking.png",
      caption: "Backpacking",
      caption1: ""
    }, {
      img: "img/greentravelling.png",
      caption: "Green",
      caption1: "travelling"
    }, {
      img: "img/pocketfriendly.png",
      caption: "Pocket",
      caption1: "friendly"
    }, {
      img: "img/romance.png",
      caption: "Romance",
      caption1: ""
    }, {
      img: "img/sportandadventure.png",
      caption: "Sports & Adventure",
      caption1: ""
    }, {
      img: "img/historyandculture.png",
      caption: "History &",
      caption1: "Culture"
    }, {
      img: "img/spirituality.png",
      caption: "Spirituality & Wellness",
      caption1: ""
    }, {
      img: "img/shopping.png",
      caption: "Shopping",
      caption1: ""
    }, {
      img: "img/foodandwine.png",
      caption: "Food & Wine",
      caption1: ""
    }];
    $scope.getHoliday = function (val) {
      if ($scope.holidayKindType[val].class == "active-holiday") {
        $scope.holidayKindType[val].class = "";
        // console.log(_.filter($scope.holidayKindType, ['class', "active-holiday"]));
      } else {
        $scope.holidayKindType[val].class = "active-holiday";
        // console.log(_.filter($scope.holidayKindType, ['class', "active-holiday"]));
      }
    };

    $scope.getPreference = function (val) {
      if ($scope.travelPrefer[val].class == "active-holiday") {
        $scope.travelPrefer[val].class = "";
      } else {
        $scope.travelPrefer[val].class = "active-holiday"
      }
    };
    $scope.getideal = function (val) {
      if ($scope.idealHoliday[val].class == "active-holiday") {
        $scope.idealHoliday[val].class = "";
      } else {
        $scope.idealHoliday[val].class = "active-holiday";
      }
    };
    $scope.getUsually = function (val) {
        _.each($scope.usuallygoHoliday, function (n) {
          n.class = "n";
        });
        $scope.usuallygoHoliday[val].class = "active-holiday";
      }
      // Integration Section starts here
    $scope.selectedCategory = function (category, arrType) {
      holidayList = _.filter($scope[category], ['class', "active-holiday"]);
      _.forEach(holidayList, function (element) {
        var caption = null;
        _.forEach(element, function (value, key) {
          if (key == "caption1") {
            caption = element.caption + " " + element.caption1;
          }
        });
        if (caption != null) {
          $scope.listOfCategories.travelConfig[arrType].push(caption);
        } else {
          $scope.listOfCategories.travelConfig[arrType].push(element.caption);
        }
      });
    }
    var saveDataCallback = function (data, status) {
      if (data.value == "true") {
        console.log(data);
        console.log("holiday");
        NavigationService.getProfile(globalGetProfile, function (err) {
          console.log(err);
        });
      } else {
        console.log(data);
      }
    }
    $scope.saveUserData = function (userData) {
      NavigationService.saveUserData(userData, saveDataCallback, function (err) {
        console.log(err);
      });
    }

    // Integration Section Ends here

  })
  .controller('TripSummaryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, OnGoJourney) {
    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.userData = $.jStorage.get("profile");
    var slug = $stateParams.id;
    var formData = {
      "urlSlug": slug,
      "type": "tripSummary"
    };
    var callback = function (summary) {
      $scope.trip = summary;
    }
    OnGoJourney.getTripSummary(formData, callback);

    $scope.template = TemplateService.changecontent("tripsummary");
    $scope.menutitle = NavigationService.makeactive("TripSummary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // $scope.trip = {
    //   date: "12 Feb, 2016",
    //   dayNo: "8",
    //   mileage: "14700",
    //   tripJourneyType: [{
    //     imgTrip: "img/trip-summary/bar.png",
    //     tripType: "Restaurants <br> & Bars",
    //     tripTypeCount: 8
    //   }, {
    //     imgTrip: "img/trip-summary/park.png",
    //     tripType: "Nature <br> & Parks",
    //     tripTypeCount: 8
    //   }, {
    //     imgTrip: "img/trip-summary/beaches.png",
    //     tripType: "Beaches",
    //     tripTypeCount: 8
    //   }, ],
    //   countryVisited: [{
    //     countryImg: "img/trip-summary/korea.png",
    //     countryName: "Korea"
    //   }, {
    //     countryImg: "img/flag.png",
    //     countryName: "India"
    //   }, ],
    //   visitedCountry: "2"
    // }

    //   $scope.visitedCountry = [{
    //     day: "01",
    //     status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
    //     timestampDate: "14 Jan,2014",
    //     timestampHour: "01:20 pm",
    //     travelTypeIcon: "img/ongojourney/location.png"
    //   }, {
    //     day: "02",
    //     status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
    //     photoAdd: "Added 20+ Photos",
    //     timestampDate: "14 Jan, 2014",
    //     timestampHour: "01:20 pm",
    //     travelTypeIcon: "img/ongojourney/location.png"
    //   }, {
    //     day: "01",
    //     status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
    //     // photoAdd: "Added 20+ Photos",
    //     timestampDate: "14 Jan, 2014",
    //     timestampHour: "01:20 pm",
    //     travelTypeIcon: "img/ongojourney/location.png"
    //   }, {
    //     day: "02",
    //     status: "Evening by the beach! :)  with Sarvesh Bramhe  & Gayatri Sakalkar <img src='img/island.png' / >- at Girgaon",
    //     photoAdd: "Added 20+ Photos",
    //     timestampDate: "14 Jan, 2014",
    //     timestampHour: "01:20 pm",
    //     travelTypeIcon: "img/ongojourney/location.png"
    //   }];






  })
  .controller('OnGoJourneyCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $interval, OnGoJourney, $state, $stateParams) {
    //Used to name the .html file
    var slug = $stateParams.id;
    var checkinCount = "";
    $scope.userData = $.jStorage.get("profile");
    var getOneJourneyCallback = function (journeys) {
      $scope.journey = journeys;
      console.log("$scope.journey updated successfully");
      var posts = [];

      posts = _.filter($scope.journey.post,  'latlong');
      _.each(posts, function (n, $index) {
        centers[$index] = {
          "lat": parseFloat(n.latlong.lat),
          "lng": parseFloat(n.latlong.long)
        };
        center = {
          "lat": centers[0].lat,
          "lng": centers[0].lng
        };

      });
    };
    OnGoJourney.getOneJourney({
      "urlSlug": slug
    }, getOneJourneyCallback, function (err) {
      console.log(err);
    });

    //mapStyle
    var mapStyle = [{
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [{
        "color": "#f7f1df"
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#d0e3b4"
      }]
    }, {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.medical",
      "elementType": "geometry",
      "stylers": [{
        "color": "#fbd3da"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#bde6ab"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffe15f"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#efd151"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#ffffff"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "black"
      }]
    }, {
      "featureType": "transit.station.airport",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#cfb2db"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#a2daf2"
      }]
    }]






    // var center = {
    //   lat: 19.113645,
    // lng: 72.869734
    // };
    // var center = {
    //   lat: 19.089560,
    //   lng: 72.865614
    // };

    // var centers = [{
    //   lat: 19.089560,
    //   lng: 72.865614
    // }, {
    //   lat: 51.470022,
    //   lng: -0.454295
    // }, {
    //   lat: 29.276052,
    //   lng: -81.034910
    // }, {
    //   lat: 51.512072,
    //   lng: -0.144223
    // }, {
    //   lat: 52.923608,
    //   lng: -1.482560
    // }, {
    //   lat: 51.899603,
    //   lng: -1.153590
    // }, {
    //   lat: 51.470022,
    //   lng: -0.454295
    // }, {
    //   lat: 25.253175,
    //   lng: 55.365673
    // }];

    line = _.map(centers, function () {
      return {};
    });

    _.map(centers, function () {
      markers.push({});
    });

    initMap = function () {


      if (typeof google === 'object' && typeof google.maps === 'object') {
        var bounds = new google.maps.LatLngBounds();
        var step = 0;
        var numSteps = 100; //Change this to set animation resolution

        map = new google.maps.Map(document.getElementById('map'), {
          draggable: true,
          animation: google.maps.Animation.DROP,
          center: center,
          // styles: mapStyle
        });

        function redLineDraw(i, departure, arrival, percentComplete, value, flag) {
          // console.log(percentComplete, flag);
          var xdiff = (centers[i].lat - centers[i - 1].lat);
          var ydiff = (centers[i].lng - centers[i - 1].lng);
          // console.log(xdiff);
          // console.log(xdiff);
          // if (Math.abs(xdiff) < 4 && value) {
          //   smoothZoom(map, 9, map.getZoom(), true); //for zooming in
          // } else if (Math.abs(xdiff) > 4 && value) {
          //   smoothZoom(map, 4, map.getZoom(), false); //for zooming out
          // }

          var markerBounds = new google.maps.LatLngBounds();
          markerBounds.extend(departure);
          markerBounds.extend(arrival);

          map.fitBounds(markerBounds);

          var frac1 = xdiff / 100;
          var frac2 = ydiff / 100;
          var iniLat = centers[i - 1].lat;
          var iniLng = centers[i - 1].lng;
          var timePerStep = frac1; //Change this to alter animation speed
          var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4
          };
          if (percentComplete == 100 && flag) {
            // console.log(i+1);
            setMarker(true, centers[i], i + 1);
          }
          if (_.isEmpty(line[i])) {
            line[i] = new google.maps.Polyline({
              path: [departure, departure],
              strokeColor: "#FF0000",
              strokeOpacity: 0,
              icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '25px'
              }],
              strokeWeight: 3,
              geodesic: true, //set to false if you want straight line instead of arc
              map: map,
            });
          }

          // function offsetCenter(latlng, offsetx, offsety) {

          //   // latlng is the apparent centre-point
          //   // offsetx is the distance you want that point to move to the right, in pixels
          //   // offsety is the distance you want that point to move upwards, in pixels
          //   // offset can be negative
          //   // offsetx and offsety are both optional

          //   var scale = Math.pow(2, map.getZoom());

          //   var worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng);
          //   var pixelOffset = new google.maps.Point((offsetx / scale) || 0, (offsety / scale) || 0);

          //   var worldCoordinateNewCenter = new google.maps.Point(
          //     worldCoordinateCenter.x - pixelOffset.x,
          //     worldCoordinateCenter.y + pixelOffset.y
          //   );

          //   var newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

          //   map.setCenter(newCenter);

          // }







          var drawLine = function (departure, arrival, percent, i, value) {
            percentFrac = percent / 100;
            var are_we_there_yet = google.maps.geometry.spherical.interpolate(departure, arrival, percentFrac);
            line[i].setPath([departure, are_we_there_yet]);
            //moving center starts here
            if (value) {

              // center = {
              //   "lat": iniLat + (frac1 * percent),
              //   "lng": iniLng + (frac2 * percent)
              // }
              center = {
                "lat": iniLat + (centers[i].lat - centers[i - 1].lat) / 2,
                "lng": iniLng + (centers[i].lng - centers[i - 1].lng) / 2
              }
            }
            // offsetCenter(center, 100, 0);

            map.setCenter(center);


            map.panBy(-150, 0);

            //moving center ends here

            // if (percent >= 100) {
            //   setMarker(true, center);
            // }
          };
          drawLine(departure, arrival, percentComplete, i, value);
        };

        function setMarker(status, n, i) {
          var jump = centers.length;
          // console.log(i);
          if (_.isEmpty(markers[i])) {
            // console.log("newly created");
            var position = new google.maps.LatLng(n.lat, n.lng);
            bounds.extend(position);
            var obj = {
              position: position,
              map: map,
              icon: "img/maps/small-marker.png"
            };
            if (status) {
              obj.icon = "img/maps/marker.png";
            }
            marker = new google.maps.Marker(obj);
            markers[i] = marker;
            // console.log(markers);
          } else {
            // console.log("old");
            markers[i].setIcon("img/maps/marker.png");
          }
        }

        _.each(centers, function (n, index) {
          setMarker(false, n, index + 1);
        });
        setMarker(true, centers[0], 1);

        //Grey static polylines starts here
        travelPath = new google.maps.Polyline({
          path: centers,
          geodesic: true,
          strokeColor: 'grey',
          strokeOpacity: 1.0,
          strokeWeight: 1
        });
        travelPath.setMap(map);
        //Grey static polylines ends here

        function smoothZoom(map, level, cnt, mode) {
          if (mode == true) {
            if (cnt > level) { //zooming in
              return;
            } else {
              var z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
                google.maps.event.removeListener(z);
                smoothZoom(map, level, cnt + 1, true);
              });
              setTimeout(function () {
                map.setZoom(cnt)
              }, 1);
            }
          } else {
            if (cnt <= (level - 1)) { //zooming out
              return;
            } else {
              var z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
                google.maps.event.removeListener(z);
                smoothZoom(map, level, cnt - 1, false);
              });
              setTimeout(function () {
                map.setZoom(cnt)
              }, 1);
            }
          }
        }

        pointsForLine = function (i, percentComplete, value, flag) {
          // console.log(percentComplete, flag)
          var departure = new google.maps.LatLng(centers[i - 1].lat, centers[i - 1].lng); //Set to whatever lat/lng you need for your departure location
          var arrival = new google.maps.LatLng(centers[i].lat, centers[i].lng); //Set to whatever lat/lng you need for your arrival locationlat:
          step = 0;
          redLineDraw(i, departure, arrival, percentComplete, value, flag);
          var linesCount = line.length - 1;
          var markerCount = markers.length - 1;
          //clearPolyLines starts
          while ((linesCount >= (i + 1)) && (value)) {
            // console.log(i);
            // console.log(linesCount + "--->" + line[linesCount]);
            if (!_.isEmpty(line[linesCount])) {
              // console.log("inside clearing lines");
              line[linesCount].setMap(null);
              line[linesCount] = {};
              // console.log("line  " + linesCount + "  cleared");
              // console.log(line);
            };
            // markers[linesCount].setIcon("img/maps/small-marker.png");
            linesCount--;
          };

          while ((i < markerCount) && (value == true) && (percentComplete < 100)) {
            // console.log(markerCount);
            // console.log(percentComplete);
            markers[markerCount].setIcon("img/maps/small-marker.png");
            markerCount--;
          }
          //clearPolyLines ends

          //draw succeeding polyLines starts
          if (i > 1) {
            pointsForLine(i - 1, 100);
            count = centers.length;
          };
          //draw succeeding polyLines ends


        };
      }
    };

    setTimeout(function () {
      initMap();
    }, 1000);


    $scope.template = TemplateService.changecontent("ongojourney");
    $scope.menutitle = NavigationService.makeactive("OnGoJourney");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();




    // $scope.$on('$viewContentLoaded', function(event) {
    //   $timeout(function(){
    //       var loadFile = function(event) {
    //       var output = document.getElementById('output');
    //       output.src = URL.createObjectURL(event.target.files[0]);
    //     };
    //     },100);
    // });


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

    $scope.tagButton = [{
      img: "img/profile.jpg",
      name: "Yash Chadasama (Me)"
    }, {
      img: "img/profile.jpg",
      name: "Amit Verma"
    }, ];
    // checkin end

    $scope.editOption = function (model) {

      $timeout(function () {
        model.backgroundClick = true;
        backgroundClick.object = model;
      }, 200);

      backgroundClick.scope = $scope;
    };

    // share whole trip social
    $scope.viewSocialShare = false;
    $scope.shareSocial = function () {
      if ($scope.viewSocialShare == false) {
        $scope.viewSocialShare = true;
      } else {
        $scope.viewSocialShare = false;
      }
    };
    // share whole trip social end

    // share single trip / card
    $scope.viewSingleTrip = -1;
    $scope.shareTrip = function (index) {
      console.log($scope.viewSingleTrip);
      if ($scope.viewSingleTrip == index) {
        $scope.viewSingleTrip = -1;
      } else {
        $scope.viewSingleTrip = index;
      }
    };
    // share single trip / card  end

    $scope.options = {
      minDate: new Date(),
      showWeeks: false
    };
    $scope.format = "yyyy/MM/dd";



    // edit journey name
    //edit journey name modal
    $scope.editName = {};
    $scope.nameJourney = function (name) {
      console.log(name);
      $scope.editName.name = name;
      modal = $uibModal.open({
        animation: true,
        templateUrl: "views/modal/journey-name.html",
        scope: $scope,
        backdropClass: "review-backdrop"
      });
    };
    //edit journey name modal ends
    $scope.editJourneyName = function (id, obj) {
      var formData = {
        "_id": id,
        "name": obj.name
      };
      var callback = function (name) {
        $scope.journey.name = name;
        modal.close();
      };
      OnGoJourney.editJourneyName(formData, callback);
    };
    // edit journey name end

    //edit journey cover photo
    // cover photo modal
    $scope.coverPhoto = function (id) {
      modal = $uibModal.open({
        animation: true,
        templateUrl: "views/modal/journey-cover.html",
        scope: $scope,
        backdropClass: "review-backdrop",
        windowClass: "cover-modal"
      });

      var formData = {
        "_id": id,
        "type": "photos"
      };
      var callback = function (photos) {
        $scope.journeyCoverPhotos = photos;
      };
      OnGoJourney.getJourneyCoverPhoto(formData, callback);
    };

    $scope.setJourneyCoverPhoto = function (id, coverPhoto) {
        var formData = {
          "_id": id,
          "coverPhoto": coverPhoto
        };
        var callback = function () {
          modal.close();
        }
        OnGoJourney.setJourneyCoverPhoto(formData, callback);
      }
      // cover photo modal ends
      //edit journey cover photo ends
      // $scope.galleryCover = [
      //   'img/london.jpg',
      //   'img/paris.jpg',
      //   'img/india-gate.jpg',
      //   'img/slider1.jpg',
      //   'img/slider2.jpg',
      //   'img/blog/blog-post.jpg',
      //   'img/blog/blog-post2.jpg',
      //   'img/blog/blog-post3.jpg',
      //   'img/london.jpg',
      //   'img/paris.jpg',
      //   'img/india-gate.jpg',
      //   'img/slider1.jpg',
      //   'img/slider2.jpg',
      //   'img/blog/blog-post.jpg',
      //   'img/blog/blog-post2.jpg',
      //   'img/blog/blog-post3.jpg',
      // ];


    // cover photo end
    $scope.cropCover = function (imgCrop) {
      $scope.showCover = imgCrop;
      $scope.cropImage = true;
    };
    $scope.viewPrev = function () {
      // $scope.showCover = imgCrop;
      $scope.cropImage = false;
    };

    // edit date and time
    $scope.changeDate = function () {
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

    setTimeout(function () {
      $('.flexslider').flexslider({
        itemMargin: 5,
        itemWidth: 99,
        animation: "slide",
        controlNav: false,
      });
    }, 100);


    //place for checkin upload





    //rating country
    // country modal
    var modal = "";

    $scope.review = {};

    $scope.countryReview = function () {
      $scope.reviewCountryCount = 0;
      if ($scope.journey.review[$scope.reviewCountryCount] != undefined) {


        $scope.review.fillMeIn = $scope.journey.review[$scope.reviewCountryCount].review;
        $scope.review.rate = $scope.journey.review[$scope.reviewCountryCount].rating;
      }
      modal = $uibModal.open({
        animation: true,
        templateUrl: "views/modal/review-country.html",
        scope: $scope,
        backdropClass: "review-backdrop",
      });
      // modal.closed.then(function () {
      //   OnGoJourney.getOneJourney({
      //     "urlSlug": slug
      //   }, getOneJourneyCallback, function (err) {
      //     console.log(err);
      //   });
      // });
    };

    // country modal ends

    $scope.rateThisCountry = function (journeyId, countryId, formData, index) {
        var result = {
          journey: journeyId,
          country: countryId,
          review: formData.fillMeIn,
          rating: formData.rate
        };
        var callback = function () {

          $scope.journey.review[index].review = result.review;
          $scope.journey.review[index].rating = result.rating;

          // console.log($scope.journey.review[index].review,$scope.journey.review[index].rating);
        };
        OnGoJourney.rateThisCountry(result, callback);
        $scope.reviewCountryCount = $scope.reviewCountryCount + 1;
        var len = $scope.journey.countryVisited.length;
        if ($scope.reviewCountryCount < len) {
          $scope.review.fillMeIn = $scope.journey.review[$scope.reviewCountryCount].review;
          $scope.review.rate = $scope.journey.review[$scope.reviewCountryCount].rating;
        } else {
          console.log(modal);
          modal.close();

        }
        //  test=$scope.journey.review[$scope.reviewCountryCount].review
        // $scope.review.fillM=test;
        // console.log($scope.review.fil);
        // $scope.review.fillMeIn=$scope.journey.review[$scope.reviewCountryCount].review;



      }
      // Rating country ends
    $scope.hoveringOver = function (value) {
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

.controller('PopularBloggerCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-blogger");
    $scope.menutitle = NavigationService.makeactive("Popular Blogger");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.photobloggers = [{
      img: '../img/popularblogger/blogger1.jpg',
      name: 'Andrea Christina',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followbtn: 'follow',
    }, {
      img: '../img/popularblogger/blogger2.jpg',
      name: 'Yash Chudasama',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followingbtn: 'following',
    }, {
      img: '../img/popularblogger/blogger1.jpg',
      name: 'Andrea Christina',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followingbtn: 'following',
    }, {
      img: '../img/popularblogger/blogger2.jpg',
      name: 'Yash Chudasama',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followbtn: 'follow',
    }, {
      img: '../img/popularblogger/blogger1.jpg',
      name: 'Andrea Christina',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followingbtn: 'following',
    }, {
      img: '../img/popularblogger/blogger2.jpg',
      name: 'Yash Chudasama',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followbtn: 'follow',
    }, {
      img: '../img/popularblogger/blogger1.jpg',
      name: 'Andrea Christina',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followingbtn: 'following',
    }, {
      img: '../img/popularblogger/blogger2.jpg',
      name: 'Yash Chudasama',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followbtn: 'follow',
    }, {
      img: '../img/popularblogger/blogger1.jpg',
      name: 'Andrea Christina',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followingbtn: 'following',
    }, {
      img: '../img/popularblogger/blogger2.jpg',
      name: 'Yash Chudasama',
      flagimg: '../img/popularblogger/flag.jpg',
      country: 'India',
      city: 'Mumbai',
      nophoto: '2',
      novideo: '5',
      nolocation: '10',
      countryvisit: '30',
      followers: '200',
      journey: '20',
      followbtn: 'follow',
    }];
  })
  .controller('Populartrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-agent");
    $scope.menutitle = NavigationService.makeactive("Popular Agent");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('DestinationCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination");
    $scope.menutitle = NavigationService.makeactive("Destination");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

.controller('DestinationCountryCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination-country");
    $scope.menutitle = NavigationService.makeactive("Destination");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    var alldestination = ["views/content/destination/country/featured.html", "views/content/destination/country/mustdo.html", "views/content/destination/country/itineraries.html", "views/content/destination/country/booking.html", "views/content/destination/country/visit.html"];
    $scope.destination = {
      innerView: alldestination[0]
    };
    // change url
    $scope.countryoptions = {};
    $scope.countryoptions.active = "";
    $scope.viewTab = 1;
    switch ($state.params.name) {
      case "featured":
        $scope.countryoptions.active = "featured";
        $scope.destination.innerView = alldestination[0];
        break;
      case "mustdo":
        $scope.countryoptions.active = "mustdo";
        $scope.destination.innerView = alldestination[1];
        break;
      case "itineraries":
        $scope.countryoptions.active = "itineraries";
        $scope.destination.innerView = alldestination[2];
        break;
      case "booking":
        $scope.countryoptions.active = "booking";
        $scope.destination.innerView = alldestination[3];
        break;
      case "visit":
        $scope.countryoptions.active = "visit";
        $scope.destination.innerView = alldestination[4];
        break;
      default:
        $scope.destination.innerView = alldestination[0];
    }
    $scope.getTab = function (view) {
      $scope.destination.innerView = alldestination[view];
      var url = "featured";
      var active = "";
      console.log(view);
      switch (view) {
        case 0:
          url = "featured";
          $scope.countryoptions.active = "featured";
          break;
        case 1:
          url = "mustdo";
          $scope.countryoptions.active = "mustdo";
          break;
        case 2:
          url = "itineraries";
          $scope.countryoptions.active = "itineraries";
          break;
        case 3:
          url = "booking";
          $scope.countryoptions.active = "booking";
          break;
        case 4:
          url = "visit";
          $scope.countryoptions.active = "visit";
          break;
      }
      console.log(url);
      $state.go("destinationcountry", {
        name: url
      }, {
        notify: false
      });
    };
    //contentopen
    $scope.isopencont = false;
    $scope.openFilter = function () {
      $scope.isopencont = !$scope.isopencont;
    };


    // $scope.flip = function() {
    // // $('.card').toggleClass('flipped');
    // $(".card").addClass("flipped");


    $scope.cardClass = "";
    $scope.flip = function () {
      if ($scope.cardClass == "") {
        $scope.cardClass = "flipped";
      } else {
        $scope.cardClass = "";
      }
    };
    // country popup
    $scope.openCountry = function () {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/country-mustdo.html",
        windowClass: "cover-modal1",
        controller: 'DestinationCountryCtrl',
        scope: $scope
      });
    };
    $scope.place = {
      title: "Taj Mahal",
      description: "<p>A symbol of an eternal love story etched out in the world’s most marvellous structures in the world, the Taj Mahal epitomises one of the greatest romances in the history of mankind. Designated as a UNESCO World Heritage Site and one of the Seven Wonders of the World, this ‘tear-drop on the cheek of time’, as Rabindranath Tagore described it, is regarded as the best example of Mughal architecture and the country’s rich history. Marvel at the great marble monument ornamented with 28 types of precious and semi-precious stones for the inlay work. With its four minarets and the red sandstone mosque, this fascinating monument is a sight to behold.</p>",
      link: "http://www.india-tajmahal.com/",
      images: [{
        imgurl: "img/destination/taj.jpg"
      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }]

    };
    //itineraries
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
      visitPost: false,
      getpopularPost: false,
      activitySec: true
    }, {
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
    }, ];

  })
  .controller('DestinationCityCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination-city");
    $scope.menutitle = NavigationService.makeactive("Destination");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    var alldestination = ["views/content/destination/city/mustdo.html", "views/content/destination/city/hotels.html", "views/content/destination/city/restaurants.html", "views/content/destination/city/itineraries.html", "views/content/destination/city/booking.html", "views/content/destination/city/visit.html"];
    $scope.destination = {
      innerView: alldestination[0]
    };
    // change url
    $scope.cityoptions = {};
    $scope.cityoptions.active = "";
    $scope.viewTab = 1;
    switch ($state.params.name) {
      case "mustdo":
        $scope.destination.innerView = alldestination[0];
        $scope.cityoptions.active = "mustdo";
        break;
      case "hotels":
        $scope.destination.innerView = alldestination[1];
        $scope.cityoptions.active = "hotels";
        break;
      case "restaurants":
        $scope.destination.innerView = alldestination[2];
        $scope.cityoptions.active = "restaurants";
        break;
      case "itineraries":
        $scope.destination.innerView = alldestination[3];
        $scope.cityoptions.active = "itineraries";
        break;
      case "booking":
        $scope.destination.innerView = alldestination[4];
        $scope.cityoptions.active = "booking";
        break;
      case "visit":
        $scope.destination.innerView = alldestination[5];
        $scope.cityoptions.active = "visit";
        break;
      default:
        $scope.destination.innerView = alldestination[0];
    }
    $scope.getTab = function (view) {
      $scope.destination.innerView = alldestination[view];
      var url = "featured";
      var active = "";
      console.log(view);
      switch (view) {
        case 0:
          url = "mustdo";
          $scope.cityoptions.active = "mustdo";
          break;
        case 1:
          url = "hotels";
          $scope.cityoptions.active = "hotels";
          break;
        case 2:
          url = "restaurants";
          $scope.cityoptions.active = "restaurants";
          break;
        case 3:
          url = "itineraries";
          $scope.cityoptions.active = "itineraries";
          break;
        case 4:
          url = "booking";
          $scope.cityoptions.active = "booking";
          break;
        case 5:
          url = "visit";
          $scope.cityoptions.active = "visit";
          break;
      }
      console.log(url);
      $state.go("destinationcity", {
        name: url
      }, {
        notify: false
      });
    };
    //openCont
    $scope.isopencont = false;
    $scope.openCont = function () {
      $scope.isopencont = !$scope.isopencont;
    };
    // country popup
    $scope.openCity = function () {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/city-mustdo.html",
        windowClass: "cover-modal1",
        controller: 'DestinationCountryCtrl',
        scope: $scope
      });
    };
    // city flip
    $scope.cardClass = "";
    $scope.flip = function () {
      if ($scope.cardClass == "") {
        $scope.cardClass = "flipped";
      } else {
        $scope.cardClass = "";
      }
    };
    $scope.place = {
      title: "Taj Mahal",
      description: "<p>A symbol of an eternal love story etched out in the world’s most marvellous structures in the world, the Taj Mahal epitomises one of the greatest romances in the history of mankind. Designated as a UNESCO World Heritage Site and one of the Seven Wonders of the World, this ‘tear-drop on the cheek of time’, as Rabindranath Tagore described it, is regarded as the best example of Mughal architecture and the country’s rich history. Marvel at the great marble monument ornamented with 28 types of precious and semi-precious stones for the inlay work. With its four minarets and the red sandstone mosque, this fascinating monument is a sight to behold.</p>",
      link: "http://www.india-tajmahal.com/",
      images: [{
        imgurl: "img/destination/taj.jpg"
      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }, {
        imgurl: "img/destination/taj.jpg"

      }]

    };

    $scope.hoveringOver = function (value) {
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
    //itineraries
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
      activitySec: true
    }, {
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
    }, ];
    //OpenFilter
    $scope.isopenfilter = false;
    $scope.openFilter = function () {
      $scope.isopenfilter = !$scope.isopenfilter;
    };
    //OpenFiltertab
    $scope.isopenfiltertab = false;
    $scope.openFiltertab = function () {
      $scope.isopenfilter = !$scope.isopenfilter;
    };
    $scope.country = [];

    $scope.addLine = function () {
      $scope.lines.push($scope.lines.length);
    };
    // this.addText = function(text) {
    //   if (text) {
    //     var obj = {
    //       text: text
    //     };
    //     this.country.push(obj);
    //     this.myText = '';
    //   }
    // }

    $scope.countries = [{
      name: 'Afghanistan',
      code: 'AF'
    }, {
      name: 'Åland Islands',
      code: 'AX'
    }, {
      name: 'Albania',
      code: 'AL'
    }, {
      name: 'Algeria',
      code: 'DZ'
    }, {
      name: 'American Samoa',
      code: 'AS'
    }, {
      name: 'Andorra',
      code: 'AD'
    }, {
      name: 'Angola',
      code: 'AO'
    }, {
      name: 'Anguilla',
      code: 'AI'
    }, {
      name: 'Antarctica',
      code: 'AQ'
    }, {
      name: 'Antigua and Barbuda',
      code: 'AG'
    }, {
      name: 'Argentina',
      code: 'AR'
    }, {
      name: 'Armenia',
      code: 'AM'
    }, {
      name: 'Aruba',
      code: 'AW'
    }, {
      name: 'Australia',
      code: 'AU'
    }, {
      name: 'Austria',
      code: 'AT'
    }, {
      name: 'Azerbaijan',
      code: 'AZ'
    }, {
      name: 'Bahamas',
      code: 'BS'
    }, {
      name: 'Bahrain',
      code: 'BH'
    }, {
      name: 'Bangladesh',
      code: 'BD'
    }, {
      name: 'Barbados',
      code: 'BB'
    }, {
      name: 'Belarus',
      code: 'BY'
    }, {
      name: 'Belgium',
      code: 'BE'
    }, {
      name: 'Belize',
      code: 'BZ'
    }, {
      name: 'Benin',
      code: 'BJ'
    }, {
      name: 'Bermuda',
      code: 'BM'
    }, {
      name: 'Bhutan',
      code: 'BT'
    }, {
      name: 'Bolivia',
      code: 'BO'
    }, {
      name: 'Bosnia and Herzegovina',
      code: 'BA'
    }, {
      name: 'Botswana',
      code: 'BW'
    }, {
      name: 'Bouvet Island',
      code: 'BV'
    }, {
      name: 'Brazil',
      code: 'BR'
    }, {
      name: 'British Indian Ocean Territory',
      code: 'IO'
    }, {
      name: 'Brunei Darussalam',
      code: 'BN'
    }, {
      name: 'Bulgaria',
      code: 'BG'
    }, {
      name: 'Burkina Faso',
      code: 'BF'
    }, {
      name: 'Burundi',
      code: 'BI'
    }, {
      name: 'Cambodia',
      code: 'KH'
    }, {
      name: 'Cameroon',
      code: 'CM'
    }, {
      name: 'Canada',
      code: 'CA'
    }, {
      name: 'Cape Verde',
      code: 'CV'
    }, {
      name: 'Cayman Islands',
      code: 'KY'
    }, {
      name: 'Central African Republic',
      code: 'CF'
    }, {
      name: 'Chad',
      code: 'TD'
    }, {
      name: 'Chile',
      code: 'CL'
    }, {
      name: 'China',
      code: 'CN'
    }, {
      name: 'Christmas Island',
      code: 'CX'
    }, {
      name: 'Cocos (Keeling) Islands',
      code: 'CC'
    }, {
      name: 'Colombia',
      code: 'CO'
    }, {
      name: 'Comoros',
      code: 'KM'
    }, {
      name: 'Congo',
      code: 'CG'
    }, {
      name: 'Congo, The Democratic Republic of the',
      code: 'CD'
    }, {
      name: 'Cook Islands',
      code: 'CK'
    }, {
      name: 'Costa Rica',
      code: 'CR'
    }, {
      name: 'Cote D\'Ivoire',
      code: 'CI'
    }, {
      name: 'Croatia',
      code: 'HR'
    }, {
      name: 'Cuba',
      code: 'CU'
    }, {
      name: 'Cyprus',
      code: 'CY'
    }, {
      name: 'Czech Republic',
      code: 'CZ'
    }, {
      name: 'Denmark',
      code: 'DK'
    }, {
      name: 'Djibouti',
      code: 'DJ'
    }, {
      name: 'Dominica',
      code: 'DM'
    }, {
      name: 'Dominican Republic',
      code: 'DO'
    }, {
      name: 'Ecuador',
      code: 'EC'
    }, {
      name: 'Egypt',
      code: 'EG'
    }, {
      name: 'El Salvador',
      code: 'SV'
    }, {
      name: 'Equatorial Guinea',
      code: 'GQ'
    }, {
      name: 'Eritrea',
      code: 'ER'
    }, {
      name: 'Estonia',
      code: 'EE'
    }, {
      name: 'Ethiopia',
      code: 'ET'
    }, {
      name: 'Falkland Islands (Malvinas)',
      code: 'FK'
    }, {
      name: 'Faroe Islands',
      code: 'FO'
    }, {
      name: 'Fiji',
      code: 'FJ'
    }, {
      name: 'Finland',
      code: 'FI'
    }, {
      name: 'France',
      code: 'FR'
    }, {
      name: 'French Guiana',
      code: 'GF'
    }, {
      name: 'French Polynesia',
      code: 'PF'
    }, {
      name: 'French Southern Territories',
      code: 'TF'
    }, {
      name: 'Gabon',
      code: 'GA'
    }, {
      name: 'Gambia',
      code: 'GM'
    }, {
      name: 'Georgia',
      code: 'GE'
    }, {
      name: 'Germany',
      code: 'DE'
    }, {
      name: 'Ghana',
      code: 'GH'
    }, {
      name: 'Gibraltar',
      code: 'GI'
    }, {
      name: 'Greece',
      code: 'GR'
    }, {
      name: 'Greenland',
      code: 'GL'
    }, {
      name: 'Grenada',
      code: 'GD'
    }, {
      name: 'Guadeloupe',
      code: 'GP'
    }, {
      name: 'Guam',
      code: 'GU'
    }, {
      name: 'Guatemala',
      code: 'GT'
    }, {
      name: 'Guernsey',
      code: 'GG'
    }, {
      name: 'Guinea',
      code: 'GN'
    }, {
      name: 'Guinea-Bissau',
      code: 'GW'
    }, {
      name: 'Guyana',
      code: 'GY'
    }, {
      name: 'Haiti',
      code: 'HT'
    }, {
      name: 'Heard Island and Mcdonald Islands',
      code: 'HM'
    }, {
      name: 'Holy See (Vatican City State)',
      code: 'VA'
    }, {
      name: 'Honduras',
      code: 'HN'
    }, {
      name: 'Hong Kong',
      code: 'HK'
    }, {
      name: 'Hungary',
      code: 'HU'
    }, {
      name: 'Iceland',
      code: 'IS'
    }, {
      name: 'India',
      code: 'IN'
    }, {
      name: 'Indonesia',
      code: 'ID'
    }, {
      name: 'Iran, Islamic Republic Of',
      code: 'IR'
    }, {
      name: 'Iraq',
      code: 'IQ'
    }, {
      name: 'Ireland',
      code: 'IE'
    }, {
      name: 'Isle of Man',
      code: 'IM'
    }, {
      name: 'Israel',
      code: 'IL'
    }, {
      name: 'Italy',
      code: 'IT'
    }, {
      name: 'Jamaica',
      code: 'JM'
    }, {
      name: 'Japan',
      code: 'JP'
    }, {
      name: 'Jersey',
      code: 'JE'
    }, {
      name: 'Jordan',
      code: 'JO'
    }, {
      name: 'Kazakhstan',
      code: 'KZ'
    }, {
      name: 'Kenya',
      code: 'KE'
    }, {
      name: 'Kiribati',
      code: 'KI'
    }, {
      name: 'Korea, Democratic People\'s Republic of',
      code: 'KP'
    }, {
      name: 'Korea, Republic of',
      code: 'KR'
    }, {
      name: 'Kuwait',
      code: 'KW'
    }, {
      name: 'Kyrgyzstan',
      code: 'KG'
    }, {
      name: 'Lao People\'s Democratic Republic',
      code: 'LA'
    }, {
      name: 'Latvia',
      code: 'LV'
    }, {
      name: 'Lebanon',
      code: 'LB'
    }, {
      name: 'Lesotho',
      code: 'LS'
    }, {
      name: 'Liberia',
      code: 'LR'
    }, {
      name: 'Libyan Arab Jamahiriya',
      code: 'LY'
    }, {
      name: 'Liechtenstein',
      code: 'LI'
    }, {
      name: 'Lithuania',
      code: 'LT'
    }, {
      name: 'Luxembourg',
      code: 'LU'
    }, {
      name: 'Macao',
      code: 'MO'
    }, {
      name: 'Macedonia, The Former Yugoslav Republic of',
      code: 'MK'
    }, {
      name: 'Madagascar',
      code: 'MG'
    }, {
      name: 'Malawi',
      code: 'MW'
    }, {
      name: 'Malaysia',
      code: 'MY'
    }, {
      name: 'Maldives',
      code: 'MV'
    }, {
      name: 'Mali',
      code: 'ML'
    }, {
      name: 'Malta',
      code: 'MT'
    }, {
      name: 'Marshall Islands',
      code: 'MH'
    }, {
      name: 'Martinique',
      code: 'MQ'
    }, {
      name: 'Mauritania',
      code: 'MR'
    }, {
      name: 'Mauritius',
      code: 'MU'
    }, {
      name: 'Mayotte',
      code: 'YT'
    }, {
      name: 'Mexico',
      code: 'MX'
    }, {
      name: 'Micronesia, Federated States of',
      code: 'FM'
    }, {
      name: 'Moldova, Republic of',
      code: 'MD'
    }, {
      name: 'Monaco',
      code: 'MC'
    }, {
      name: 'Mongolia',
      code: 'MN'
    }, {
      name: 'Montserrat',
      code: 'MS'
    }, {
      name: 'Morocco',
      code: 'MA'
    }, {
      name: 'Mozambique',
      code: 'MZ'
    }, {
      name: 'Myanmar',
      code: 'MM'
    }, {
      name: 'Namibia',
      code: 'NA'
    }, {
      name: 'Nauru',
      code: 'NR'
    }, {
      name: 'Nepal',
      code: 'NP'
    }, {
      name: 'Netherlands',
      code: 'NL'
    }, {
      name: 'Netherlands Antilles',
      code: 'AN'
    }, {
      name: 'New Caledonia',
      code: 'NC'
    }, {
      name: 'New Zealand',
      code: 'NZ'
    }, {
      name: 'Nicaragua',
      code: 'NI'
    }, {
      name: 'Niger',
      code: 'NE'
    }, {
      name: 'Nigeria',
      code: 'NG'
    }, {
      name: 'Niue',
      code: 'NU'
    }, {
      name: 'Norfolk Island',
      code: 'NF'
    }, {
      name: 'Northern Mariana Islands',
      code: 'MP'
    }, {
      name: 'Norway',
      code: 'NO'
    }, {
      name: 'Oman',
      code: 'OM'
    }, {
      name: 'Pakistan',
      code: 'PK'
    }, {
      name: 'Palau',
      code: 'PW'
    }, {
      name: 'Palestinian Territory, Occupied',
      code: 'PS'
    }, {
      name: 'Panama',
      code: 'PA'
    }, {
      name: 'Papua New Guinea',
      code: 'PG'
    }, {
      name: 'Paraguay',
      code: 'PY'
    }, {
      name: 'Peru',
      code: 'PE'
    }, {
      name: 'Philippines',
      code: 'PH'
    }, {
      name: 'Pitcairn',
      code: 'PN'
    }, {
      name: 'Poland',
      code: 'PL'
    }, {
      name: 'Portugal',
      code: 'PT'
    }, {
      name: 'Puerto Rico',
      code: 'PR'
    }, {
      name: 'Qatar',
      code: 'QA'
    }, {
      name: 'Reunion',
      code: 'RE'
    }, {
      name: 'Romania',
      code: 'RO'
    }, {
      name: 'Russian Federation',
      code: 'RU'
    }, {
      name: 'Rwanda',
      code: 'RW'
    }, {
      name: 'Saint Helena',
      code: 'SH'
    }, {
      name: 'Saint Kitts and Nevis',
      code: 'KN'
    }, {
      name: 'Saint Lucia',
      code: 'LC'
    }, {
      name: 'Saint Pierre and Miquelon',
      code: 'PM'
    }, {
      name: 'Saint Vincent and the Grenadines',
      code: 'VC'
    }, {
      name: 'Samoa',
      code: 'WS'
    }, {
      name: 'San Marino',
      code: 'SM'
    }, {
      name: 'Sao Tome and Principe',
      code: 'ST'
    }, {
      name: 'Saudi Arabia',
      code: 'SA'
    }, {
      name: 'Senegal',
      code: 'SN'
    }, {
      name: 'Serbia and Montenegro',
      code: 'CS'
    }, {
      name: 'Seychelles',
      code: 'SC'
    }, {
      name: 'Sierra Leone',
      code: 'SL'
    }, {
      name: 'Singapore',
      code: 'SG'
    }, {
      name: 'Slovakia',
      code: 'SK'
    }, {
      name: 'Slovenia',
      code: 'SI'
    }, {
      name: 'Solomon Islands',
      code: 'SB'
    }, {
      name: 'Somalia',
      code: 'SO'
    }, {
      name: 'South Africa',
      code: 'ZA'
    }, {
      name: 'South Georgia and the South Sandwich Islands',
      code: 'GS'
    }, {
      name: 'Spain',
      code: 'ES'
    }, {
      name: 'Sri Lanka',
      code: 'LK'
    }, {
      name: 'Sudan',
      code: 'SD'
    }, {
      name: 'Suriname',
      code: 'SR'
    }, {
      name: 'Svalbard and Jan Mayen',
      code: 'SJ'
    }, {
      name: 'Swaziland',
      code: 'SZ'
    }, {
      name: 'Sweden',
      code: 'SE'
    }, {
      name: 'Switzerland',
      code: 'CH'
    }, {
      name: 'Syrian Arab Republic',
      code: 'SY'
    }, {
      name: 'Taiwan, Province of China',
      code: 'TW'
    }, {
      name: 'Tajikistan',
      code: 'TJ'
    }, {
      name: 'Tanzania, United Republic of',
      code: 'TZ'
    }, {
      name: 'Thailand',
      code: 'TH'
    }, {
      name: 'Timor-Leste',
      code: 'TL'
    }, {
      name: 'Togo',
      code: 'TG'
    }, {
      name: 'Tokelau',
      code: 'TK'
    }, {
      name: 'Tonga',
      code: 'TO'
    }, {
      name: 'Trinidad and Tobago',
      code: 'TT'
    }, {
      name: 'Tunisia',
      code: 'TN'
    }, {
      name: 'Turkey',
      code: 'TR'
    }, {
      name: 'Turkmenistan',
      code: 'TM'
    }, {
      name: 'Turks and Caicos Islands',
      code: 'TC'
    }, {
      name: 'Tuvalu',
      code: 'TV'
    }, {
      name: 'Uganda',
      code: 'UG'
    }, {
      name: 'Ukraine',
      code: 'UA'
    }, {
      name: 'United Arab Emirates',
      code: 'AE'
    }, {
      name: 'United Kingdom',
      code: 'GB'
    }, {
      name: 'United States',
      code: 'US'
    }, {
      name: 'United States Minor Outlying Islands',
      code: 'UM'
    }, {
      name: 'Uruguay',
      code: 'UY'
    }, {
      name: 'Uzbekistan',
      code: 'UZ'
    }, {
      name: 'Vanuatu',
      code: 'VU'
    }, {
      name: 'Venezuela',
      code: 'VE'
    }, {
      name: 'Vietnam',
      code: 'VN'
    }, {
      name: 'Virgin Islands, British',
      code: 'VG'
    }, {
      name: 'Virgin Islands, U.S.',
      code: 'VI'
    }, {
      name: 'Wallis and Futuna',
      code: 'WF'
    }, {
      name: 'Western Sahara',
      code: 'EH'
    }, {
      name: 'Yemen',
      code: 'YE'
    }, {
      name: 'Zambia',
      code: 'ZM'
    }, {
      name: 'Zimbabwe',
      code: 'ZW'
    }];
  })


.controller('MylifeCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location, MyLife, OnGoJourney) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("mylife");
    $scope.menutitle = NavigationService.makeactive("Mylife");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.obj = {};
    $scope.visited = [];
    var len = "";


    //Integration Section Starts here
    $scope.userData = $.jStorage.get("profile");
    var arr = ($scope.userData.homeCity).split(",");
    $scope.homeCity = arr[0];
    var travelCount = function (data, status) {
      $scope.count = data.data;
      len = $scope.count.countriesVisited_count;
      updateBadge();
      updateBadgeBar();
    };

    var reloadCount = function () {
      NavigationService.travelCount(travelCount, function (err) {
        console.log(err);
      });
    };
    reloadCount();

    $scope.data = {
      'bucketList': {
        metric: 0
      },
      'countryVisited': {
        metric: 1
      }
    };

    $scope.getMap = function () {
      // console.log("GET MAP CALLED");
      var bucket = _.filter($scope.nationality, "bucketList");
      var otherData = {
        'bucketList': {
          metric: 0
        },
        'countryVisited': {
          metric: 1
        }
      };
      _.each(bucket, function (country) {
        _.each(window._mapPathData.paths, function (map, key) {
          if (country.name == map.name) {
            otherData[key] = {
              metric: 0
            };
            return;
          }
        });
      });
      var countryVisited = _.filter($scope.nationality, "countryVisited");
      _.each(countryVisited, function (country) {
        _.each(window._mapPathData.paths, function (map, key) {
          if (country.name == map.name) {
            otherData[key] = {
              metric: 1
            };
            return;
          }
        });

      });
      $timeout(function () {
        $scope.data = otherData;
      }, 100);
    };

    var getAllCountries = function (countries) {
      $scope.nationality = countries;
      $scope.getMap();
    };

    MyLife.getAllCountries(getAllCountries, function (err) {
      console.log(err);
    });

    $scope.updateBucketList = function (country) {
      MyLife.updateBucketList(country,function (data, status) {
        reloadCount();
      }, function () {});
      $scope.getMap();
    };
    var modal = "";
    $scope.updateCountryVisited = function (country) {
      console.log(country);
      $scope.obj.countryId = country._id;
      if (country.countryVisited === true) {
        $scope.visited = [];
        var callback = function (data) {
          var a = _.filter(data.data.countriesVisited, ["countryId", country._id,]);
          var visitedArr = [];
          _.each(a[0].visited, function (n, index) {
            visitedArr[n.year] = {
              "times": n.times,
              "year": n.year
            };
          });
          console.log(visitedArr);
          $scope.visited = visitedArr;
        };
        MyLife.getCountryVisitedListWeb(callback);
        modal = $uibModal.open({
          scope: $scope,
          animation: true,
          templateUrl: "views/modal/country-visited.html"
        });
        var id = {
          '_id': country._id
        };
      } else {
        $scope.visited = [];
        modal = $uibModal.open({
          scope: $scope,
          animation: true,
          templateUrl: "views/modal/country-visited.html"
        });
      }
      $scope.getMap();
      modal.closed.then(function () {
        console.log(_.isEmpty(arr));
        if (_.isEmpty(arr)) {
          country.countryVisited = false;
          console.log(country);
        } else {
          country.countryVisited = true;
          console.log(country);
        }
      });
    };

    var arr = [];
    $scope.updateNumOfTimes = function (visited) {
      modal.close();

      //applying validations and filters starts
      arr = _.pull(visited, undefined);
      arr = _.reject(arr, {
        'year': false
      });
      arr = _.filter(arr, 'times');
      arr = _.reject(arr, {
        'times': 0
      });
      console.log(arr);
      //applying validations and filters ends

      $scope.obj.visited = arr;
      MyLife.updateCountriesVisited($scope.obj, function (data, status) {
        reloadCount();
        console.log(data);
      }, function () {});
      $scope.getMap();
    };

    var years = function (startYear) {
      var currentYear = new Date().getFullYear(),
        years = [];
      startYear = startYear || 1980;
      while (startYear <= currentYear) {
        years.push(currentYear--);
      }
      return years;
    }
    $scope.listOfYears = years(1950);

    // Little more about me starts here
    function titleCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    NavigationService.getProfile(globalGetProfile, function (err) {
      console.log(err);
    });
    if ($scope.userData) {
      $scope.pronoun; //for he and she
      $scope.pronoun1; //for him and her
      $scope.userName = titleCase($scope.userData.firstName);
      $scope.kindOfHoliday = $scope.userData.travelConfig.kindOfHoliday[0];
      $scope.usuallyGo = $scope.userData.travelConfig.usuallyGo[0];
      $scope.flag = false;
      $scope.usuallyGoIcon1 = "";
      $scope.preferToTravel = $scope.userData.travelConfig.preferToTravel[0];
      $scope.idealHoliday = $scope.userData.travelConfig.holidayType[0];

      // console.log($scope.kindOfHoliday + "," + $scope.usuallyGo + "," + $scope.preferToTravel + "," + $scope.idealHoliday);

      if ($scope.userData.gender == "male") {
        $scope.pronoun = "he";
        $scope.pronoun1 = " him";
      } else {
        $scope.pronoun = "she";
        $scope.pronoun1 = "her";
      }

      if ($scope.usuallyGo == "By the map ") {
        $scope.usuallyGo = "by the map";
        $scope.usuallyGoIcon = "img1/bythemapfull.png";
      } else if ($scope.usuallyGo == "Where the road takes you") {
        $scope.usuallyGo = "where the road takes" + $scope.pronoun1;
        $scope.usuallyGoIcon = "img1/wheretheroadtakesyoufull.png";
      } else if ($scope.usuallyGo == "A little bit of both") {
        $scope.flag = true;
        $scope.usuallyGo = "by the map or ";
        $scope.usuallyGo1 = "where the road takes" + $scope.pronoun1;
        $scope.usuallyGoIcon = "img1/bythemapfull.png";
        $scope.usuallyGoIcon1 = "img1/wheretheroadtakesyoufull.png";
      }

      if (($scope.preferToTravel == "Blogger") || ($scope.preferToTravel == "Photographer")) {
        $scope.intermediate = "is a";
        if ($scope.preferToTravel == "Blogger") {
          $scope.preferToTravelIcon = "img1/bloggerfull.png";
        } else {
          $scope.preferToTravelIcon = "img1/photographerfull.png";
        }
      } else {
        if (($scope.preferToTravel == "Family") || ($scope.preferToTravel == "Friends")) {
          $scope.intermediate = "prefers to travel with "
          $scope.preferToTravelIcon = "img1/bus.png";
        } else if ($scope.preferToTravel == "Business") {
          $scope.intermediate = "prefers to travel on ";
          $scope.preferToTravelIcon = "img1/businessfull.png";
        } else if ($scope.preferToTravel == "Group Tour") {
          $scope.intermediate = "prefers to travel on a ";
          $scope.preferToTravelIcon = "img1/grouptourfull.png";
        } else if ($scope.preferToTravel == "Partner/Spouse") {
          $scope.intermediate = "prefers to travel with their";
          $scope.preferToTravel = "Partner";
          $scope.preferToTravelIcon = "img1/partnerfull.png";
        } else if ($scope.preferToTravel == "Solo") {
          $scope.intermediate = "prefers to travel ";
          $scope.preferToTravelIcon = "img1/solofull.png";
        }
      }

      if ($scope.kindOfHoliday == "Island & Beach") {
        $scope.kindOfHolidayIcon = "img1/beachfull.png";
      } else if ($scope.kindOfHoliday == "City") {
        $scope.kindOfHolidayIcon = "img1/cityfull.png";
      } else if ($scope.kindOfHoliday == "Safari") {
        $scope.kindOfHolidayIcon = "img1/safarifull.png"
      } else if ($scope.kindOfHoliday == "Mountains") {
        $scope.kindOfHolidayIcon = "img1/mountainsfull.png"
      } else if ($scope.kindOfHoliday == "Cruise") {
        $scope.kindOfHolidayIcon = "img1/cruisefull.png"
      } else if ($scope.kindOfHoliday == "Countryside") {
        $scope.kindOfHolidayIcon = "img1/countrysidefull.png"
      }


      if ($scope.idealHoliday == "Luxury ") {
        $scope.idealHolidayIcon = "img1/luxuryfull.png";
      } else if ($scope.idealHoliday == "Backpacking ") {
        $scope.idealHolidayIcon = "img1/backpackingfull.png ";
      } else if ($scope.idealHoliday == "Green travelling") {
        $scope.idealHolidayIcon = "img1/greentravellingfull.png"
      } else if ($scope.idealHoliday == "Pocket friendly") {
        $scope.idealHolidayIcon = "img1/pocketfriendlyfull.png"
      } else if ($scope.idealHoliday == "Romance ") {
        $scope.idealHolidayIcon = "img1/romancefull.png"
      } else if ($scope.idealHoliday == "Sports & Adventure ") {
        $scope.idealHolidayIcon = "img1/sportandadventurefull.png"
      } else if ($scope.idealHoliday == "History & Culture") {
        $scope.idealHolidayIcon = "img1/historyandculturefull.png"
      } else if ($scope.idealHoliday == "Spirituality & \u0003Wellness ") {
        $scope.idealHoliday = "Spirituality & Wellness"
        $scope.idealHolidayIcon = "img1/spiritualityfull.png"
      } else if ($scope.idealHoliday == "Shopping ") {
        $scope.idealHolidayIcon = "img1/shoppingfull.png"
      } else if ($scope.idealHoliday == "Food & Wine ") {
        $scope.idealHolidayIcon = "img1/foodandwinefull.png"
      }

    }
    // Little more about me ends here

    //userBadge starts here
    var updateBadge = function () {
        if (len < 4) {
          $scope.userBadgeName = "img/newbie.png";
        } else if ((len > 3) && (len < 8)) {
          $scope.userBadgeName = "img/Just-got-wings.png";
        } else if ((len > 8) && (len < 16)) {
          $scope.userBadgeName = "img/Globe-Trotter.png";
        } else if ((len > 16) && (len < 25)) {
          $scope.userBadgeName = "img/wayfarer.png";
        } else if (len >= 25) {
          $scope.userBadgeName = "img/nomad.png";
        }
      }
      //userBadge ends here

    //badge-bar starts here



    var updateBadgeBar = function () {
      $scope.tik1 = true;
      $scope.tik2 = false;
      $scope.tik3 = false;
      $scope.tik4 = false;
      $scope.tik5 = false;
      $scope.newbie = false;
      $scope.justgotwings = false;
      $scope.globetrotter = false;
      $scope.wayfarer = false;
      $scope.nomad = false;
      if (len < 4) {
        $scope.newbie = true;
        $scope.tik1 = true;
        $scope.mystyle1 = {
          "width": (len / 3) * 100 + '%',
          "background-color": "#ff6759",
        }
      } else if (len < 8) {
        $scope.justgotwings = true;
        $scope.tik1 = true;
        $scope.tik2 = true;
        $scope.mystyle1 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle2 = {
          "width": ((len - 3) / 4) * 100 + '%',
          "background-color": "#ff6759",
        };
      } else if (len < 16) {
        $scope.globetrotter = true;
        $scope.tik1 = true;
        $scope.tik2 = true;
        $scope.tik3 = true;
        $scope.mystyle1 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle2 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle3 = {
          "width": ((len - 7) / 8) * 100 + '%',
          "background-color": "#ff6759",
        };
      } else if (len < 25) {
        $scope.wayfarer = true;
        $scope.tik1 = true;
        $scope.tik2 = true;
        $scope.tik3 = true;
        $scope.tik4 = true;
        $scope.mystyle1 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle2 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle3 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle4 = {
          "width": ((len - 15) / 9) * 100 + '%',
          "background-color": "#ff6759",
        };
      } else if (len > 24) {
        $scope.nomad = true;
        $scope.tik1 = true;
        $scope.tik2 = true;
        $scope.tik3 = true;
        $scope.tik4 = true;
        $scope.tik5 = true;
        $scope.mystyle1 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle2 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle3 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle4 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle5 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
      }
    }


    //badge-bar ends here

    //Integration Section Ends here
    {
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
      $scope.getTab = function (view) {
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
        // $scope.bucketList = [{
        //   countryName: "United States Of America"
        // }, {
        //   countryName: "Germany"
        // }, {
        //   countryName: "United Kingdom"
        // }, {
        //   countryName: "Switzerland"
        // }, {
        //   countryName: "Australia"
        // }, {
        //   countryName: "India"
        // }, {
        //   countryName: "Italy"
        // }, {
        //   countryName: "Canada"
        // }, ];





      $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
      $scope.mapDataHumanizeFn = function (val) {
        return val + " units";
      };
      $scope.heatmapColors = ['#2c3757', '#ff6759'];

      $scope.hoveringOver = function (value) {
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
      $scope.buildNow = function () {
        $scope.$broadcast('rebuild:me');
      }
      $scope.$on('scrollbar.hide', function () {
        // console.log('Scrollbar hide');
      });
      $scope.$on('scrollbar.show', function () {
        // console.log('Scrollbar show');
      });


      $scope.openLocalimg = function (getVal) {
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

      var getAllJourney = function (journeys) {
        $scope.travelLife = journeys;
      };
      OnGoJourney.getAllJourney(getAllJourney, function (err) {
        console.log(err);
      });

      $scope.redirectTo = function (id) {
        console.log(id);
        $.jStorage.set('travelId', id);
        $state.go('ongojourney');
      }

      // $scope.travelLife = [{
      //   heading: "Manan Vora has ended his London Journey",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   imgTravelled: "img/london.jpg",
      //   Travelledtag: "London Eye",
      //   photoCount: "28",
      //   videoCount: "5",
      //   locationVisited: "9",
      //   itineraryType1: "img/sunset.png",
      //   itineraryType2: "img/bag-journey.png",
      //   itineraryType3: "img/luxury-journey.png",
      //   travelledDay: "75",
      //   onwayTag: "love in paris",
      //   imgOnway: "img/paris.jpg",
      //   cost: "$10,000",
      //   spendingDay: "75",
      //   likes: "15660",
      //   reviews: "354",
      //   pointReview: "4.5",
      //   onJourney: false,
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ]
      // }, {
      //   heading: "Manan Vora has ended his London Journey",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   imgTravelled: "img/london.jpg",
      //   Travelledtag: "London Eye",
      //   photoCount: "28",
      //   videoCount: "5",
      //   locationVisited: "9",
      //   itineraryType1: "img/sunset.png",
      //   itineraryType2: "img/bag-journey.png",
      //   itineraryType3: "img/luxury-journey.png",
      //   travelledDay: "75",
      //   onwayTag: "love in paris",
      //   imgOnway: "img/paris.jpg",
      //   cost: "$10,000",
      //   spendingDay: "75",
      //   likes: "15660",
      //   reviews: "354",
      //   pointReview: "4.5",
      //   onJourney: true,
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ]
      // }, {
      //   heading: "Manan Vora has ended his London Journey",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   imgTravelled: "img/london.jpg",
      //   Travelledtag: "London Eye",
      //   photoCount: "28",
      //   videoCount: "5",
      //   locationVisited: "9",
      //   itineraryType1: "img/sunset.png",
      //   itineraryType2: "img/bag-journey.png",
      //   itineraryType3: "img/luxury-journey.png",
      //   travelledDay: "75",
      //   onwayTag: "love in paris",
      //   imgOnway: "img/paris.jpg",
      //   cost: "$10,000",
      //   spendingDay: "75",
      //   likes: "15660",
      //   reviews: "354",
      //   pointReview: "4.5",
      //   onJourney: false,
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ]
      // }, {
      //   heading: "Manan Vora has ended his London Journey",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   imgTravelled: "img/london.jpg",
      //   Travelledtag: "London Eye",
      //   photoCount: "28",
      //   videoCount: "5",
      //   locationVisited: "9",
      //   itineraryType1: "img/sunset.png",
      //   itineraryType2: "img/bag-journey.png",
      //   itineraryType3: "img/luxury-journey.png",
      //   travelledDay: "75",
      //   onwayTag: "love in paris",
      //   imgOnway: "img/paris.jpg",
      //   cost: "$10,000",
      //   spendingDay: "75",
      //   likes: "15660",
      //   reviews: "354",
      //   pointReview: "4.5",
      //   onJourney: false,
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ]
      // }, {
      //   heading: "Manan Vora has ended his London Journey",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   imgTravelled: "img/london.jpg",
      //   Travelledtag: "London Eye",
      //   photoCount: "28",
      //   videoCount: "5",
      //   locationVisited: "9",
      //   itineraryType1: "img/sunset.png",
      //   itineraryType2: "img/bag-journey.png",
      //   itineraryType3: "img/luxury-journey.png",
      //   travelledDay: "75",
      //   onwayTag: "love in paris",
      //   imgOnway: "img/paris.jpg",
      //   cost: "$10,000",
      //   spendingDay: "75",
      //   likes: "15660",
      //   reviews: "354",
      //   pointReview: "4.5",
      //   onJourney: true,
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ]
      // }, {
      //   heading: "Manan Vora has ended his London Journey",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   imgTravelled: "img/london.jpg",
      //   Travelledtag: "London Eye",
      //   photoCount: "28",
      //   videoCount: "5",
      //   locationVisited: "9",
      //   itineraryType1: "img/sunset.png",
      //   itineraryType2: "img/bag-journey.png",
      //   itineraryType3: "img/luxury-journey.png",
      //   travelledDay: "75",
      //   onwayTag: "love in paris",
      //   imgOnway: "img/paris.jpg",
      //   cost: "$10,000",
      //   spendingDay: "75",
      //   likes: "15660",
      //   reviews: "354",
      //   pointReview: "4.5",
      //   onJourney: true,
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ]
      // }];

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
      $scope.showMonthView = function () {
        $scope.viewMonth = true;
      };
      // reviews json
      $scope.oneAtATime = true;

      $scope.getReview = function () {
        $uibModal.open({
          animation: true,
          templateUrl: "views/modal/review-post.html",
          scope: $scope,
          backdropClass: "review-backdrop"
        })
      };
      $scope.showRating = 1;
      $scope.fillColor = "";
      $scope.starRating = function (val) {
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
      $scope.showtravelCountry = function () {
        $scope.viewtravelCountry = true;
      };
      $scope.viewlocalCountry = false;
      $scope.showlocalCountry = function () {
        $scope.viewlocalCountry = true;
      };


    }
    // holidayplanner json
  })
  .controller('JourneyCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
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
    $scope.buildNow = function () {
      $scope.$broadcast('rebuild:me');
    }
    $scope.$on('scrollbar.hide', function () {
      // console.log('Scrollbar hide');
    });
    $scope.$on('scrollbar.show', function () {
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
    $scope.mapDataHumanizeFn = function (val) {
      return val + " units";
    };
    $scope.heatmapColors = ['#2c3757', '#ff6759'];

    $scope.openLocalimg = function (getVal) {
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
  .controller('MomentsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $location, $anchorScroll) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("moments");
    $scope.menutitle = NavigationService.makeactive("Moments");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


  })
  .controller('ReviewsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("reviews");
    $scope.menutitle = NavigationService.makeactive("Reviews");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


  })
  .controller('HolidayPlannerCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("holidayplanner");
    $scope.menutitle = NavigationService.makeactive("HolidayPlanner");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('ProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.template = TemplateService.changecontent("profile");
    $scope.menutitle = NavigationService.makeactive("Profile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('OtherProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("otherprofile");
    $scope.menutitle = NavigationService.makeactive("OtherProfile");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('OtherJourneyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("otherjourney");
    $scope.menutitle = NavigationService.makeactive("OtherJourney");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $(document).ready(function () {
      setTimeout(function () {
        $('html, body').animate({
          scrollTop: $("#tabs").offset().top
        }, 1000);
      }, 100);
    });
    $scope.buildNow = function () {
      $scope.$broadcast('rebuild:me');
    }
    $scope.$on('scrollbar.hide', function () {
      // console.log('Scrollbar hide');
    });
    $scope.$on('scrollbar.show', function () {
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
    };
    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js

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
  .controller('SettingCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("setting");
    $scope.menutitle = NavigationService.makeactive("Setting");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.open1 = function () {
      $scope.popup1.opened = true;
      showWeeks = false;
    };
    $scope.popup1 = {
      opened: false
    };

    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.showImage = false;
    var got = setInterval(function () {
      if (document.getElementById('fileInput')) {
        console.log("got");
        document.getElementById('fileInput').onchange = function (evt) {
          var file = evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
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
    $scope.setting = function (val) {
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

    $scope.holidayType = function (val) {
      if ($scope.chooseHoliday[val].class == "active-holiday") {
        $scope.chooseHoliday[val].class = "";
      } else {
        $scope.chooseHoliday[val].class = "active-holiday";
      }
    };
    $scope.usuallyType = function (val) {
      _.each($scope.usuallyGo, function (abc) {
        abc.class = "";
      });
      $scope.usuallyGo[val].class = "active-holiday";
    };
    $scope.travelType = function (val) {
      if ($scope.preferTravel[val].class == "active-holiday") {
        $scope.preferTravel[val].class = "";
      } else {
        $scope.preferTravel[val].class = "active-holiday";
      }
    };
    $scope.idealType = function (val) {
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
  .controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
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
  .controller('BlogDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
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
  .controller('ActivityCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
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

    setTimeout(function () {
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
  .controller('ProfileListCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, MyLife) {
    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.activeMenu = $stateParams.active;
    console.log($scope.activeMenu);
    $scope.template = TemplateService.changecontent("profile-list");
    $scope.menutitle = NavigationService.makeactive("ProfileList");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // countryList and bucketList
    $scope.countryList = [{
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, ];
    $scope.bucketList = [{
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, {
      countryImage: "img/india-gate.jpg",
      countryName: "India",
      countryYear: "2016",
      countryFlag: "img/flag.png"
    }, ];
    // countrylist and bucketlist end
    // following and followers
    // $scope.following = [{
    //   imgFollowing: "img/follower.jpg",
    //   nameFollow: "Andrea Christina",
    //   cityName: "Mumbai",
    //   countryName: "India",
    //   photos: "208",
    //   location: "345",
    //   followType: "Follow",
    //   countryVisited: "300",
    //   followersUser: "2.8M",
    //   journey: "315"
    // }, {
    //   imgFollowing: "img/follower.jpg",
    //   nameFollow: "Andrea Christina",
    //   cityName: "Mumbai",
    //   countryName: "India",
    //   photos: "208",
    //   location: "345",
    //   followType: "Following",
    //   countryVisited: "300",
    //   followersUser: "2.8M",
    //   journey: "315"
    // }, {
    //   imgFollowing: "img/follower.jpg",
    //   nameFollow: "Andrea Christina",
    //   cityName: "Mumbai",
    //   countryName: "India",
    //   photos: "208",
    //   location: "345",
    //   followType: "Follow",
    //   countryVisited: "300",
    //   followersUser: "2.8M",
    //   journey: "315"
    // }, {
    //   imgFollowing: "img/follower.jpg",
    //   nameFollow: "Andrea Christina",
    //   cityName: "Mumbai",
    //   countryName: "India",
    //   photos: "208",
    //   location: "345",
    //   followType: "Following",
    //   countryVisited: "300",
    //   followersUser: "2.8M",
    //   journey: "315"
    // }, {
    //   imgFollowing: "img/follower.jpg",
    //   nameFollow: "Andrea Christina",
    //   cityName: "Mumbai",
    //   countryName: "India",
    //   photos: "208",
    //   location: "345",
    //   followType: "Follow",
    //   countryVisited: "300",
    //   followersUser: "2.8M",
    //   journey: "315"
    // }, {
    //   imgFollowing: "img/follower.jpg",
    //   nameFollow: "Andrea Christina",
    //   cityName: "Mumbai",
    //   countryName: "India",
    //   photos: "208",
    //   location: "345",
    //   followType: "Following",
    //   countryVisited: "300",
    //   followersUser: "2.8M",
    //   journey: "315"
    // }, ];

    var callbackFollowers = function (data) {
      $scope.followersList = data.data.followers;
      console.log($scope.followersList);
    };

    var callbackFollowings = function (data) {
      $scope.followingList = data.data.followers;
      console.log($scope.followingList);

    };

    var callbackGetCountriesVisited=function(data){
      $scope.countryVisitedList=data;
    };

    var callbackBucketList=function(data){
      $scope.bucketList=data;
    };

    var callbackRemoveFromBucketList=function(countryId){
      document.getElementById(countryId).remove();
    };
    $scope.removeFromBucketList=function(id){
      MyLife.updateBucketListWeb(id,callbackRemoveFromBucketList);
    }

    MyLife.getFollowersWeb(callbackFollowings);
    MyLife.getFollowersWeb(callbackFollowers);
    MyLife.getCountryVisitedListWeb(callbackGetCountriesVisited);
    MyLife.getOneBucketList(callbackBucketList);

    MyLife.getOneBucketList(callbackBucketList);


    // following and followers end

  })
  .controller('ItineraryCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("itinerary");
    $scope.menutitle = NavigationService.makeactive("Itinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

  })
  .controller('DetailedItineraryCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("detail-itinerary");
    $scope.menutitle = NavigationService.makeactive("DetailedItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.itineraryType = [{
      img: "img/itinerary/adventure.png",
      caption: "Adventure",
      width: "25"
    }, {
      img: "img/itinerary/business.png",
      caption: "Business",
      width: "24"
    }, {
      img: "img/itinerary/family.png",
      caption: "Family",
      width: "30"
    }, {
      img: "img/itinerary/romance.png",
      caption: "Romance",
      width: "26"
    }, {
      img: "img/itinerary/backpacking.png",
      caption: "Backpacking",
      width: "23"
    }, {
      img: "img/itinerary/budget.png",
      caption: "Budget",
      width: "22"
    }, {
      img: "img/itinerary/luxury.png",
      caption: "Luxury",
      width: "21"
    }, {
      img: "img/itinerary/religious.png",
      caption: "Religious",
      width: "26"
    }, {
      img: "img/itinerary/friend.png",
      caption: "Friends",
      width: "24"
    }, ];
    // tinymce
    $scope.tinymceOptions = {
      onChange: function (e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      // plugins: 'advlist autolink link image lists charmap print preview',
      skin: 'lightgray',
      theme: 'modern',
      menubar: false,
      toolbar: 'bold italic',
      statusbar: false
    };
    // tinymce end
    $scope.hoveringOver = function (value) {
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

    $scope.stayedAt = [{}];
    $scope.addedStayed = function () {
      $scope.stayedAt.push({});
    };
    $scope.removeStayed = function (index) {
      console.log(index);
      $scope.stayedAt.splice(index, 1);
      console.log($scope.stayedAt);
    };
    // select detail itinerary type
    $scope.selectItinerary = function (val) {
      console.log(val);
      if ($scope.itineraryType[val].activeClass == "active-itinerary") {
        $scope.itineraryType[val].activeClass = "";
      } else {
        $scope.itineraryType[val].activeClass = "active-itinerary";
      }
    };
    // select detail itinerary type end

    // country list
    $scope.countryList = [{
      img: "img/singapore.png",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }, {
        cityName: "czechoslovakia"
      }]
    }, {
      img: "img/singapore.png",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }]
    }, ];
    // country list end
    $scope.addClass = "";
    $scope.addCountryCity = [{}];
    $scope.addPanel = function () {
      $scope.addCountryCity.push({});
      $scope.addClass = "added-panel"
    }

  })
  .controller('QuickItineraryCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("quick-itinerary");
    $scope.menutitle = NavigationService.makeactive("QuickItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.itineraryType = [{
      img: "img/itinerary/adventure.png",
      caption: "Adventure",
      width: "25"
    }, {
      img: "img/itinerary/business.png",
      caption: "Business",
      width: "24"
    }, {
      img: "img/itinerary/family.png",
      caption: "Family",
      width: "30"
    }, {
      img: "img/itinerary/romance.png",
      caption: "Romance",
      width: "26"
    }, {
      img: "img/itinerary/backpacking.png",
      caption: "Backpacking",
      width: "23"
    }, {
      img: "img/itinerary/budget.png",
      caption: "Budget",
      width: "22"
    }, {
      img: "img/itinerary/luxury.png",
      caption: "Luxury",
      width: "21"
    }, {
      img: "img/itinerary/religious.png",
      caption: "Religious",
      width: "26"
    }, {
      img: "img/itinerary/friend.png",
      caption: "Friends",
      width: "24"
    }, ];

    $scope.tinymceOptions = {
      onChange: function (e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      // plugins: 'advlist autolink link image lists charmap print preview',
      skin: 'lightgray',
      theme: 'modern',
      menubar: false,
      toolbar: 'bold italic',
      statusbar: false
    };

    $scope.selectItinerary = function (val) {
      if ($scope.itineraryType[val].activeClass == "active-itinerary") {
        $scope.itineraryType[val].activeClass = "";
      } else {
        $scope.itineraryType[val].activeClass = "active-itinerary";
      }
    };


    $scope.getYear = [];
    $scope.viewYear = function () {
      if ($scope.getYear.length > 0) {
        $scope.getYear = [];
      } else {
        var d = new Date();
        var n = d.getFullYear();
        $scope.getYear = _.rangeRight(1900, n + 1);
      }
    };

    // month array
    $scope.monthDrop = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // month array end

  })
  .controller('EditorItineraryCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("editor-itinerary");
    $scope.menutitle = NavigationService.makeactive("Editor-Itinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.getItineraryType = [{
        img: "img/itinerary/family.png",
        width: "40",
      }, {
        img: "img/itinerary/adventure.png",
        width: "26",
      }, {
        img: "img/itinerary/backpacking.png",
        width: "22",
      }, {
        img: "img/itinerary/budget.png",
        width: "20",
      },
      // {
      //   img: "img/itinerary/friend.png",
      //   width: "22",
      // },
      // {
      //   img: "img/itinerary/luxury.png",
      //   width: "20",
      // },
      // {
      //   img: "img/itinerary/romance.png",
      //   width: "27",
      // },
      // {
      //   img: "img/itinerary/business.png",
      //   width: "26",
      // },
      // {
      //   img: "img/itinerary/religious.png",
      //   width: "25",
      // },
    ];
    // country list
    $scope.countryList = [{
      img: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }, {
        cityName: "czechoslovakia"
      }]
    }, {
      img: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }]
    }, ];
    // country list end
    // accordion
    $scope.countryTripList = [{
      countryImg: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, {
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, ],
    }, {
      countryImg: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, ],
    }, ];
    // accordion end
    $scope.editorGallery = [
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
    ];

    $scope.editGallery = "close-editor-gallery";
    $scope.showGallery = function () {
      if ($scope.editGallery == "close-editor-gallery") {
        $scope.editGallery = "view-editor-gallery";
      } else {
        $scope.editGallery = "close-editor-gallery";
      }
    };
    // other itineraries main
    $scope.travelLife = [{
      otherProfile: true,
      viewProfile: [{
        imgBg: "img/itinerary/religious.jpg",
        profileImg: "img/profile-main.png",
        name: "Andrea Christina",
        location: "London",
        follower: "2090"
      }],
    }, {
      class: "visiting-post travel-visit",
      popItinerary: false,
      visitPost: true,
      getvisitPost: [{
        travelVisit: true,
        imgVisit: "img/india-gate.jpg",
        locationLocal: "Mumbai",
        tagTravel: "Book Your Travel form take off to touchdown!",
        visitImg: true,
      }, ],
    }, {
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      }, ],
    }, ];
    // other itineraries main end
    $scope.getPopup = function () {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/itinerary-slide.html",
        scope: $scope,
      });
    }

    $scope.itinerarySlide = [{
      img: "img/itinerary/itinerary1.jpg",
    }, {
      img: "img/itinerary/itinerary2.jpg",
    }, {
      img: "img/itinerary/itinerary.jpg",
    }, {
      img: "img/itinerary/itinerary1.jpg",
    }, ];

  })
  .controller('UserQuickItineraryCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("user-quickitinerary");
    $scope.menutitle = NavigationService.makeactive("User-QuickItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.showClass = "close-gallery";
    $scope.viewGallery = function () {
      if ($scope.showClass == "close-gallery") {
        $scope.showClass = "open-gallery";
      } else {
        $scope.showClass = "close-gallery";
      }
    };
    $scope.getItineraryType = [{
      img: "img/itinerary/family.png",
      width: "40",
    }, {
      img: "img/itinerary/adventure.png",
      width: "26",
    }, {
      img: "img/itinerary/backpacking.png",
      width: "22",
    }, {
      img: "img/itinerary/budget.png",
      width: "20",
    }];

    $scope.photoGallery = [
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
    ];
    // other itineraries main
    $scope.travelLife = [{
      otherProfile: true,
      viewProfile: [{
        imgBg: "img/itinerary/religious.jpg",
        profileImg: "img/profile-main.png",
        name: "Andrea Christina",
        location: "London",
        follower: "2090"
      }],
    }, {
      class: "visiting-post travel-visit",
      popItinerary: false,
      visitPost: true,
      getvisitPost: [{
        travelVisit: true,
        imgVisit: "img/india-gate.jpg",
        locationLocal: "Mumbai",
        tagTravel: "Book Your Travel form take off to touchdown!",
        visitImg: true,
      }, ],
    }, {
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      }, ],
    }, ];
    // other itineraries main end

  })
  .controller('UserDetailItineraryCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("user-detailitinerary");
    $scope.menutitle = NavigationService.makeactive("User-DetailItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.journeyItinerary = [{
      img: "img/ongojourney/monish.jpg",
      name: "Monish"
    }, {
      img: "img/ongojourney/malhar.jpg",
      name: "Malhar"
    }, ];
    $scope.getItineraryType = [{
      img: "img/itinerary/family.png",
      width: "40",
    }, {
      img: "img/itinerary/adventure.png",
      width: "26",
    }, {
      img: "img/itinerary/backpacking.png",
      width: "22",
    }, {
      img: "img/itinerary/budget.png",
      width: "20",
    }];

    $scope.photoGallery = [
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
    ];
    // country list
    $scope.countryList = [{
      img: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }, {
        cityName: "czechoslovakia"
      }]
    }, {
      img: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }]
    }, ];
    // country list end
    // accordion
    $scope.countryTripList = [{
      countryImg: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, {
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, ],
    }, {
      countryImg: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, ],
    }, ];
    // accordion end
    $scope.editorGallery = [
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
    ];

    $scope.showClass = "close-gallery";
    $scope.viewGallery = function () {
      if ($scope.showClass == "close-gallery") {
        $scope.showClass = "open-gallery";
      } else {
        $scope.showClass = "close-gallery";
      }
    };
    // other itineraries main
    $scope.travelLife = [{
      otherProfile: true,
      viewProfile: [{
        imgBg: "img/itinerary/religious.jpg",
        profileImg: "img/profile-main.png",
        name: "Andrea Christina",
        location: "London",
        follower: "2090"
      }],
    }, {
      class: "visiting-post travel-visit",
      popItinerary: false,
      visitPost: true,
      getvisitPost: [{
        travelVisit: true,
        imgVisit: "img/india-gate.jpg",
        locationLocal: "Mumbai",
        tagTravel: "Book Your Travel form take off to touchdown!",
        visitImg: true,
      }, ],
    }, {
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      }, ],
    }, ];
    // other itineraries main end

  })
  .controller('AgentItineraryCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("agent-itinerary");
    $scope.menutitle = NavigationService.makeactive("Agent-Itinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.getItineraryType = [{
      img: "img/itinerary/family.png",
      width: "40",
    }, {
      img: "img/itinerary/adventure.png",
      width: "26",
    }, {
      img: "img/itinerary/backpacking.png",
      width: "22",
    }, {
      img: "img/itinerary/budget.png",
      width: "20",
    }];
    // country list
    $scope.countryList = [{
      img: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }, {
        cityName: "czechoslovakia"
      }]
    }, {
      img: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        cityName: "Bukit Timah"
      }, {
        cityName: "Sin Ming"
      }]
    }, ];
    // country list end
    // accordion
    $scope.countryTripList = [{
      countryImg: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, {
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, ],
    }, {
      countryImg: "img/singapore.png",
      countryName: "Singapore",
      cityList: [{
        dayInput1: "1",
        dayInput2: "2",
        cityName: "Singapore",
        stayedAt: "Friends House",
        ateAt: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        mustDo: "Bakerzin (Paragon)  |  Muchos Mexican Bar & Restaurant  |  Bora Bora Beach Bar (Palawan Beach)  |  Pita Pan (Marina Bay Sands)  |  Ku De Ta (Marina Bay Sands)",
        aboutTrip: "<p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br><br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p><br><p>Day 1: Shopped on Orchard Road (ION Orchard / Paragon & Takashimaya) & strolled on Clarke Quay Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.<br> <br>Day 2: Spent the Day at the Universal Studios & Sentosa Islands, followed by Marina Bay Sands in the evening</p>",
      }, ],
    }, ];
    // accordion end

    $scope.photoGallery = [
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/uploaded-pic.jpg',
      '../img/slider2.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
      '../img/moment-travel1.jpg',
      '../img/moment-travel2.jpg',
      '../img/local-life-post.jpg',
      '../img/destination/goldentemple.jpg',
      '../img/destination/list1.jpg',
      '../img/destination/list2.jpg',
      '../img/destination/info.jpg',
      '../img/destination/taj-featured.jpg',
      '../img/itinerary/itinerary.jpg',
    ];
    $scope.showClass = "close-gallery";
    $scope.viewGallery = function () {
      if ($scope.showClass == "close-gallery") {
        $scope.showClass = "open-gallery";
      } else {
        $scope.showClass = "close-gallery";
      }
    };

    // connect agent
    $scope.lass = "";
    $scope.agentbox = "agentbox-in";
    $scope.viewAgent = function () {
      if ($scope.agentbox == "agentbox-in") {
        $scope.agentbox = "agentbox-out";
        $scope.lass = "backdrop-agent";
      } else {
        $scope.agentClass = "";
        $scope.agentbox = "agentbox-in";
      }
    };
    // other itineraries main
    $scope.travelLife = [{
      otherProfile: true,
      viewProfile: [{
        imgBg: "img/itinerary/religious.jpg",
        profileImg: "img/profile-main.png",
        name: "Andrea Christina",
        location: "London",
        follower: "2090"
      }],
    }, {
      class: "visiting-post travel-visit",
      popItinerary: false,
      visitPost: true,
      getvisitPost: [{
        travelVisit: true,
        imgVisit: "img/india-gate.jpg",
        locationLocal: "Mumbai",
        tagTravel: "Book Your Travel form take off to touchdown!",
        visitImg: true,
      }, ],
    }, {
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "follow",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      popItinerary: true,
      heading: "Editor",
      follower: "following",
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
      }, ],
    }, ];
    // other itineraries main end

  })

.controller('headerctrl', function ($scope, TemplateService, NavigationService, $state, $interval) {
  $scope.template = TemplateService;

  NavigationService.getProfile(globalGetProfile, function (err) {
    console.log(err);
  });
  $scope.isLoggedIn = $.jStorage.get("isLoggedIn");
  $scope.userData = $.jStorage.get("profile");
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $scope.oneAtATime = true;
  $.fancybox.close(true);
  $scope.getslide = "menu-out";
  $scope.getnav = function () {
    if ($scope.getslide == "menu-in") {
      $scope.getslide = "menu-out";
      $scope.onebar = "";
      $scope.secondbar = "";
      $scope.thirdbar = "";
      $scope.buttonpos = "";
    } else {
      $scope.getslide = "menu-in";
      $scope.onebar = "firstbar";
      $scope.secondbar = "secondbar";
      $scope.thirdbar = "thirdbar";
      $scope.buttonpos = "buttonpos";
    }
  };
  $scope.isopen = false;
  $scope.opensearch = function () {
    $scope.isopen = !$scope.isopen;
  };
  if (typeof $.fn.fullpage.destroy == 'function') {
    $.fn.fullpage.destroy('all');
  }

  $scope.logout = function () {
    NavigationService.logout(function () {
        $.jStorage.flush();
        $scope.isLoggedIn = $.jStorage.get("isLoggedIn");
        $state.go('home');
      },
      function (err) {
        console.log(err);
      });
  };

})

.controller('AgentloginCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
  $scope.template = TemplateService.changecontent("agent-login"); //Use same name of .html file
  $scope.menutitle = NavigationService.makeactive("Agent Login"); //This is the Title of the Website
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.oneAtATime = true;
  $scope.$on('$viewContentLoaded', function () {
    $timeout(function () {
      $("#remainingC").html("00 / 500");
      $('textarea').keypress(function () {

        if (this.value.length > 500) {
          return false;
        }
        $("#remainingC").html((this.value.length) + " / 500");
      });
    });
  });
})

.controller('AgentuserCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $timeout) {
  $scope.template = TemplateService.changecontent("agent-user"); //Use same name of .html file
  $scope.menutitle = NavigationService.makeactive("Agent User"); //This is the Title of the Website
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.oneAtATime = true;

  // tab change
  var allagtuser = ["views/content/agent/agt-user/usr-itinerary.html", "views/content/agent/agt-user/usr-tourpackages.html", "views/content/agent/agt-user/usr-photovideos.html", "views/content/agent/agt-user/usr-testimonialreviews.html", "views/content/agent/agt-user/usr-aboutus.html"];
  $scope.agtuser = {
    innerView: allagtuser[0]
  };
  // change url
  $scope.agtuseroptions = {};
  $scope.agtuseroptions.active = "";
  $scope.viewTab = 1;
  switch ($state.params.name) {
    case "usr-itinerary":
      $scope.agtuser.innerView = allagtuser[0];
      $scope.agtuseroptions.active = "usr-itinerary";
      break;
    case "usr-tourpackages":
      $scope.agtuser.innerView = allagtuser[1];
      $scope.agtuseroptions.active = "usr-tourpackages";
      break;
    case "usr-photovideos":
      $scope.agtuser.innerView = allagtuser[2];
      $scope.agtuseroptions.active = "usr-photovideos";
      break;
    case "usr-testimonialreviews":
      $scope.agtuser.innerView = allagtuser[3];
      $scope.agtuseroptions.active = "usr-testimonialreviews";
      break;
    case "usr-aboutus":
      $scope.agtuser.innerView = allagtuser[4];
      $scope.agtuseroptions.active = "usr-aboutus";
      break;
    default:
      $scope.agtuser.innerView = allagtuser[0];
  }
  $scope.getTab = function (view) {
    $scope.agtuser.innerView = allagtuser[view];
    var url = "usr-itinerary";
    var active = "";
    console.log(view);
    switch (view) {
      case 0:
        url = "usr-itinerary";
        $scope.agtuseroptions.active = "usr-itinerary";
        break;
      case 1:
        url = "usr-tourpackages";
        $scope.agtuseroptions.active = "usr-tourpackages";
        break;
      case 2:
        url = "usr-photovideos";
        $scope.agtuseroptions.active = "usr-photovideos";;
        break;
      case 3:
        url = "usr-testimonialreviews";
        $scope.agtuseroptions.active = "usr-testimonialreviews";
        break;
      case 4:
        url = "usr-aboutus";
        $scope.agtuseroptions.active = "usr-aboutus";
        break;
      case 5:
        url = "usr-aboutus";
        $scope.agtuseroptions.active = "usr-aboutus";
        break;
    }
    console.log(url);
    $state.go("agent-user", {
      name: url
    }, {
      notify: false
    });
  };
  // tab change end

  // gallery card end
  $scope.agenPhotogallery = [
    '../img/uploaded-pic.jpg',
    '../img/slider2.jpg',
    '../img/moment-travel1.jpg',
    '../img/moment-travel2.jpg',
    '../img/local-life-post.jpg',
    '../img/destination/goldentemple.jpg',
    '../img/destination/list1.jpg',
    '../img/destination/list2.jpg',
    '../img/destination/info.jpg',
    '../img/destination/taj-featured.jpg',
    '../img/itinerary/itinerary.jpg',
    '../img/india-gate.jpg',
    '../img/notify-adrena.jpg',
    '../img/paris.jpg',
    '../img/bg-popular.jpg',
    '../img/bg-blur.jpg',
    '../img/blog-banner.jpg',
    '../img/follower.jpg'
  ];
  // gallery card end

  // testimonial card
  $scope.testimonialreview = [{
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, text ever since the 1500s,',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum has been the industrys standard dummy text evers,',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }, {
    testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    usrprofileImgholder: '../img/adrena.jpg',
    usrName: 'Randy & Victoria',
    usrLoc: 'New-York, USA',
    usrRating: '9'
  }];
  // testimonial card end


  // review textarea counter
  $scope.$on('$viewContentLoaded', function () {
    $timeout(function () {
      $("#reviewremainingC").html("00 / 300");
      $('textarea').keypress(function () {

        if (this.value.length > 500) {
          return false;
        }
        $("#reviewremainingC").html((this.value.length) + " / 300");
      });
    });
  });
  // review textarea counter end

  //rating slider
  $scope.ratingSlide = {
    range: {
      min: 0,
      max: 10
    },
    step: 1,
    minRating: 0,
    maxRating: 10
  };
  //rating slider end

  // category type
  $scope.categoryType = [{
    img: "img/itinerary/adventure.png",
    caption: "Adventure",
    width: "25"
  }, {
    img: "img/itinerary/business.png",
    caption: "Business",
    width: "24"
  }, {
    img: "img/itinerary/family.png",
    caption: "Family",
    width: "30"
  }, {
    img: "img/itinerary/romance.png",
    caption: "Romance",
    width: "26"
  }, {
    img: "img/itinerary/backpacking.png",
    caption: "Backpacking",
    width: "23"
  }, {
    img: "img/itinerary/budget.png",
    caption: "Budget",
    width: "22"
  }, {
    img: "img/itinerary/luxury.png",
    caption: "Luxury",
    width: "21"
  }, {
    img: "img/itinerary/religious.png",
    caption: "Religious",
    width: "26"
  }, {
    img: "img/itinerary/friend.png",
    caption: "Friends",
    width: "24"
  }, ];
  // category type end
})

.controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

  $scope.changeLanguage = function () {
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


})
