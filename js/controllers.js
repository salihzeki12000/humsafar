var globalGetProfile = function (data, status) {
  if (data.data._id) {
    $.jStorage.set("isLoggedIn", true);
    $.jStorage.set("profile", data.data);
    // console.log($.jStorage.get('profile'));
    console.log("Profile successfully set on jStorage");
  } else {
    $.jStorage.flush();
  }
};

var pointsForLine = function () {};
var line = [];
var markers = [];
var travelPath;
var initMap = function () {};
var setMarker = function () {};
var map;
var center = {};
var centers = [];
markers[0] = {};
angular.module('phonecatControllers', ['templateservicemod', 'mylife', 'ongojourney', 'locallife', 'itinerary', 'commontask', 'activity', 'infinite-scroll', 'navigationservice', 'travelibroservice', 'cfp.loadingBar', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'angularFileUpload', 'ngImgCrop', 'mappy', 'wu.masonry', 'ngScrollbar', 'ksSwiper', 'ui.tinymce'])
  .run(['$anchorScroll', function ($anchorScroll) {
    $anchorScroll.yOffset = 50; // always scroll by 50 extra pixels
  }])

  .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, cfpLoadingBar) {
    //Used to name the .html file
    cfpLoadingBar.start();
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
        $('.fullpage').fullpage({
          //Navigation

          onLeave: function (index, nextIndex, direction) {

            $timeout(function () {
              swiper.slideTo(nextIndex - 1);
              //playing the video
              $('video').get(nextIndex - 1).load();
              $('video').get(nextIndex - 1).play();
              $('video').get(nextIndex - 2).pause();
              $('video').get(nextIndex).pause();
              $scope.pauseVideo = function () {
                if ($("video").get(nextIndex - 1).play()) {
                  $("video").get(nextIndex - 1).pause();
                } else {
                  $("video").get(nextIndex - 1).prop('play');
                }
              }
            }, 500);

          }
        });
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
    $(window).load(function () {
      document.getElementById('movie1').play();
      if ($(window).width() < 767) {
        $('video').remove();
      }
    });
    setTimeout(function () {
      $('.scene').parallax();

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
    cfpLoadingBar.complete();
    $scope.muteVolume = function () {
      if ($("video").prop('muted')) {
        $("video").prop('muted', false);
      } else {
        $("video").prop('muted', true);
      }
    }
  })



  .controller('LoginCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $interval, $state) {
    //Used to name the .html file
    var stopinterval;
    $scope.userData = $.jStorage.get("profile");
    $scope.template = TemplateService.changecontent("login");
    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.headerfixed = "fixed-header";
    $scope.animationsEnabled = true;
    $scope.formData = {};

    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }

    $(window).load(function () {
      console.log("tooltip");
      $('[data-toggle="tooltip"]').tooltip();
    });

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
      if (data.accessToken) {
        $interval.cancel(stopinterval);
        ref.close();
        $.jStorage.set("accessToken", data.accessToken);
        NavigationService.getProfile("", function (data) {
          if (data.data._id) {
            $.jStorage.set("isLoggedIn", true);
            $.jStorage.set("profile", data.data);
            var alreadyLoggedIn = data.data.alreadyLoggedIn;
            if (alreadyLoggedIn === true) {
              var slug = $.jStorage.get("activeUrlSlug");
              console.log(slug);
              if (slug === null || slug === "") {
                slug = $.jStorage.get("profile").urlSlug;
              }
              $state.go("mylife", {
                name: 'journey',
                urlSlug: slug
              });
            } else if (alreadyLoggedIn === false) {
              $state.go('mainpage');
            }
          } else {

          }
        }, function (err) {
          console.log(err);
        });
      }
    };

    var callAtIntervaltwitter = function () {
      NavigationService.getAccessToken(checktwitter, function (err) {
        console.log(err);
      });
    };

    var authenticatesuccess = function (stopinterval) {
      console.log("login window closed");
      $ionicLoading.hide();
      $interval.cancel(stopinterval);
    };

    $scope.socialLogin = function (loginTo) {
      ref = window.open(adminURL + "/user/" + loginTo + "OldUser", '_blank', 'location=no');
      console.log(ref);
      stopinterval = $interval(callAtIntervaltwitter, 2000);
      ref.onbeforeunload = function (e) {
        console.log("window closed");
        $interval.cancel(stopinterval);
        authenticatesuccess(stopinterval);
      };
    };

    $scope.submit = function () {
      console.log($scope.formData);
      NavigationService.oldUsersLogin($scope.formData, function (succ1) {
        if (succ1.value) {
          console.log(succ1);
          NavigationService.getAccessToken(function (succ2) {
            console.log(succ2);
            $.jStorage.set("accessToken", succ2.accessToken);
            if (succ2.accessToken && succ2.accessToken !== "") {
              NavigationService.getProfile("", function (succ3) {
                $.jStorage.set("isLoggedIn", false);
                $.jStorage.set("oldUserData", succ3.data);
                // $state.go("login-flow", {
                //   'accessToken': succ2.accessToken
                // });
                window.location = "http://travelibro.net/blog"
              }, function (err3) {
                console.log(err3);
              });
            } else {

            }
          }, function (err2) {
            console.log(err2);
          });
        } else {
          console.log(data);
          //things to do when user email or password is wrong 
        }
      });
    };
  })
  // .controller('ForgotPasswordCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $stateParams) {
  //Used to name the .html file
  //   console.log("Testing Consoles");
  //   $scope.template = TemplateService.changecontent("forgot-password");
  //   $scope.menutitle = NavigationService.makeactive("Login");
  //   TemplateService.title = $scope.menutitle;
  //   $scope.navigation = NavigationService.getnav();
  //   $scope.animationsEnabled = true;
  //   $scope.template.header = "";
  //   $scope.template.footer = "";
  //   $scope.showErr = false;
  //   $scope.showErr1 = false;
  //   $scope.formData = {};
  //   $scope.formData.password = "";
  //   $scope.formData.confirmPassword = "";
  //   $scope.userData = {};
  //   if (typeof $.fn.fullpage.destroy == 'function') {
  //     $.fn.fullpage.destroy('all');
  //   }
  //   if ($stateParams.token && $stateParams.email) {
  //     NavigationService.checkToken({
  //       token: decodeURIComponent($stateParams.token),
  //       email: $stateParams.email
  //     }, function (data) {
  //       if (data.value) {
  //         $scope.showErr = false;
  //       } else {
  //         $scope.showErr = true;
  //       }
  //     });
  //   } else {
  //     $scope.showErr = true;
  //   }
  //   $scope.type = function () {
  //     if ($scope.formData.password === "" && $scope.formData.confirmPassword === "") {
  //       $scope.showErr1 = false;
  //     } else {
  //       if ($scope.formData.password !== "" && $scope.formData.confirmPassword === "") {
  //         $scope.showErr1 = false;
  //       } else if ($scope.formData.password === $scope.formData.confirmPassword) {
  //         $scope.showErr1 = false;
  //       } else {
  //         $scope.showErr1 = true;
  //       }
  //     }
  //   }
  //   $scope.change = function () {
  //     if ($scope.formData.password === $scope.formData.confirmPassword && $scope.showErr === false && $scope.showErr1 === false) {
  //       $scope.formData.token = decodeURIComponent($stateParams.token);
  //       $scope.formData.email = $stateParams.email;
  //       NavigationService.changePasswordEmail($scope.formData, function (data) {
  //         if (data.value) {
  //           $scope.opensucessfull();
  //           NavigationService.getProfile("", globalGetProfile, function (err) {
  //             $.jStorage.set("profile", data);
  //           });
  //         } else {
  //           $scope.showErr = true;
  //         }
  //       });
  //     } else {
  //       $scope.showErr1 = true;
  //     }
  //   }
  //   if (!_.isEmpty($.jStorage.get("profile"))) {
  //     $scope.userData = $.jStorage.get("profile");
  //   }
  //   $scope.opensucessfull = function (size) {
  //     $uibModal.open({
  //       animation: true,
  //       templateUrl: 'views/modal/sucessfull.html',
  //       controller: 'ForgotPasswordCtrl',
  //       scope: $scope,
  //       windowClass: "notexist",
  //       size: "sm"
  //     });
  //   };

  // })
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
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }


  })

  .controller('BookingCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("booking");
    $scope.menutitle = NavigationService.makeactive("Booking");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }


  })
  .controller('AdvertiseCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("advertise");
    $scope.menutitle = NavigationService.makeactive("Advertise");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }
  })

  .controller('MainPageCtrl', ['$scope', 'TemplateService', 'NavigationService', 'cfpLoadingBar', '$timeout', '$http', '$state', 'FileUploadService', 'FileUploader', 'DataUriToBlob', '$window', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $http, $state, FileUploadService, FileUploader, DataUriToBlob, $window) {
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
    $scope.userData.gender = $scope.profile.gender;
    $scope.image = null;
    $scope.imageFileName = '';
    $scope.uploadme = {};
    $scope.uploadme.src = '';
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


    $scope.changeGender = function (val, name) {
      $scope.gender = val;
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
      cfpLoadingBar.start();
      NavigationService.getAllCities({
        "search": searchCity
      }, getAllCities, function (err) {
        console.log(err);
      });
      cfpLoadingBar.complete();
    };
    //End-Of get all the cities from database

    $scope.uploadFile = function (data, fileName, userData) {
      // Base64 to Blob
      cfpLoadingBar.start();
      console.log(fileName, userData);
      var imageBase64 = data;
      console.log(imageBase64);
      var blob = DataUriToBlob.dataURItoBlob(imageBase64, 'image/png');
      console.log(blob);
      // Blob to File
      var file = new File([blob], 'photo-' + "1" + '.png');
      console.log(file);
      // File to FormData
      var formData = new FormData();
      console.log(formData, "before appending");
      formData.append('file', file, file.name);
      console.log(formData, "after appending");
      NavigationService.uploadFile(formData, function (response) {
        if (response.value) {
          $scope.userData.profilePicture = response.data[0];
          console.log($scope.userData);
          $scope.saveUserData($scope.userData);
        } else {
          toastr.warning('Error Uploading Image!');
        }
        cfpLoadingBar.complete();
      });
    };


    var saveDataCallback = function (data, status) {
      if (data.value === true) {
        console.log(data);
        NavigationService.getProfile($.jStorage.get("profile").urlSlug, globalGetProfile, function (err) {
          console.log(err);
        });
        $window.location.reload();
        $state.go('holiday');
      } else {
        console.log(data);
      }
    };

    $scope.saveUserData = function (userData) {
      var str = userData.homeCity;
      var arr = str.split(",");
      userData.homeCity = arr[0];
      NavigationService.saveUserData(userData, saveDataCallback, function (err) {
        console.log(err);
      });
    };

    $scope.myImage = '';
    // $scope.myCroppedImage = '';
    $scope.showImage = {
      "val": false
    };
    var i = 1;
    var got1 = setInterval(function () {
      if (document.getElementById('fileInput1')) {
        document.getElementById('fileInput1').onchange = function (evt) {
          var file = evt.currentTarget.files[0];
          console.log(file);
          var formData = new FormData();
          formData.append('file', file, "file.jpg");
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
              $scope.showImage.val = true;
              console.log($scope.showImage.val);
              $scope.myImage = evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
        clearInterval(got1);
      }
      i++;
    }, 1000);

    var got2 = setInterval(function () {
      if (document.getElementById('fileInput2')) {
        document.getElementById('fileInput2').ondrop = function (evt) {
          console.log(evt);
          var file = evt.currentTarget.files[0];
          var formData = new FormData();
          formData.append('file', file, "file.jpg");
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
              $scope.showImage = true;
              $scope.myImage = evt.target.result;
              console.log($scope.myImage);
            });
          };
          reader.readAsDataURL(file);
        };
        clearInterval(got2);
      }
      i++;
    }, 1000);

    $scope.file = {
      myFile: "Chintan"
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

    $scope.viewHoliday = 1;
    $scope.showHoliday = function (val) {
      if (val == 1) {
        $scope.viewHoliday = 1;
      } else if (val == 2) {
        $scope.viewHoliday = 2;
      } else if (val == 3) {
        $scope.viewHoliday = 3;
      } else if (val == 4) {
        $scope.viewHoliday = 4;
      } else {
        $scope.viewHoliday = 1;
      }
    }

    $scope.holidayKindType = [{
      img: "img/beach.png",
      caption: "Island & Beach",
      storeCaption: "Islands & Beaches",
    }, {
      img: "img/city.png",
      caption: "City",
      storeCaption: "Cities"
    }, {
      img: "img/safari.png",
      caption: "Safari",
      storeCaption: "Safari"
    }, {
      img: "img/mountain.png",
      caption: "Mountains",
      storeCaption: "Mountains"
    }, {
      img: "img/cruise.png",
      caption: "Cruise",
      storeCaption: "Cruises"
    }, {
      img: "img/countryside.png",
      caption: "Countryside",
      storeCaption: "Countryside"
    }];
    $scope.usuallygoHoliday = [{
      img: "img/map.png",
      caption1: "By the map",
      storeCaption: "By the map"
    }, {
      img: "img/road.png",
      caption1: "Where the",
      caption2: "road takes you",
      storeCaption: "Where the road takes you"
    }, {
      img: "img/both.png",
      caption1: "A little bit",
      caption2: "of both",
      storeCaption: "A little bit of both"
    }, ];


    $scope.travelPrefer = [{
      img: "img/family.png",
      caption: "Family",
      storeCaption: "Family"
    }, {
      img: "img/friends.png",
      caption: "Friends",
      storeCaption: "Friends"
    }, {
      img: "img/spouse.png",
      caption: "Partner/Spouse",
      storeCaption: "Partner/Spouse"
    }, {
      img: "img/solo.png",
      caption: "Solo",
      storeCaption: "Solo"
    }, {
      img: "img/business.png",
      caption: "Business",
      storeCaption: "Business"
    }, {
      img: "img/blogger.png",
      caption: "Blogger",
      storeCaption: "Blogger"
    }, {
      img: "img/grouptour.png",
      caption: "Group Tour",
      storeCaption: "Group Tour"
    }, {
      img: "img/photographer.png",
      caption: "Photographer",
      storeCaption: "Photographer"
    }, ];

    $scope.idealHoliday = [{
      img: "img/luxury.png",
      caption1: "luxury",
      storeCaption: "Luxury"
    }, {
      img: "img/backpacking.png",
      caption1: "Backpacking",
      storeCaption: "Backpacking"
    }, {
      img: "img/greentravelling.png",
      caption1: "Green",
      caption2: "travelling",
      storeCaption: "Green Travelling"
    }, {
      img: "img/pocketfriendly.png",
      caption1: "Pocket",
      caption2: "friendly",
      storeCaption: "Pocket Friendly"
    }, {
      img: "img/romance.png",
      caption1: "Romance",
      storeCaption: "Romance"
    }, {
      img: "img/sportandadventure.png",
      caption1: "Sports &",
      caption2: "Adventure",
      storeCaption: "Sports & Adventure"
    }, {
      img: "img/historyandculture.png",
      caption1: "History &",
      caption2: "Culture",
      storeCaption: "History & Culture"
    }, {
      img: "img/spirituality.png",
      caption1: "Spirituality &",
      caption2: "Wellness",
      storeCaption: "Spirituality & Wellness"
    }, {
      img: "img/shopping.png",
      caption1: "Shopping",
      storeCaption: "Shopping"
    }, {
      img: "img/foodandwine.png",
      caption1: "Food & Wine",
      storeCaption: "Food & Wine"
    }, {
      img: "img/festival.png",
      caption1: "Festivals",
      storeCaption: "Festivals"
    }];

    _.each()
    $scope.getHoliday = function (val) {
      if ($scope.holidayKindType[val].class == "active-holiday") {
        $scope.holidayKindType[val].class = "";
      } else {
        $scope.holidayKindType[val].class = "active-holiday";
      }
      $scope.selectedCategory('holidayKindType', 'kindOfHoliday');
    };

    $scope.getPreference = function (val) {
      if ($scope.travelPrefer[val].class == "active-holiday") {
        $scope.travelPrefer[val].class = "";
      } else {
        $scope.travelPrefer[val].class = "active-holiday";
      }
      $scope.selectedCategory('travelPrefer', 'preferToTravel');
    };
    $scope.getideal = function (val) {
      if ($scope.idealHoliday[val].class == "active-holiday") {
        $scope.idealHoliday[val].class = "";
      } else {
        $scope.idealHoliday[val].class = "active-holiday";
      }
      $scope.selectedCategory('idealHoliday', 'holidayType');
    };
    $scope.getUsually = function (val) {
      _.each($scope.usuallygoHoliday, function (n) {
        n.class = "n";
      });
      $scope.usuallygoHoliday[val].class = "active-holiday";
      $scope.selectedCategory('usuallygoHoliday', 'usuallyGo');
    }
    // Integration Section starts here
    // $scope.selectedCategory = function (category, arrType) {
    //   holidayList = _.filter($scope[category], ['class', "active-holiday"]);
    //   _.forEach(holidayList, function (element) {
    //     var caption = null;
    //     _.forEach(element, function (value, key) {
    //       if (key == "caption1") {
    //         caption = element.caption + " " + element.caption1;
    //       }
    //     });
    //     if (caption !== null) {
    //       $scope.listOfCategories.travelConfig[arrType].push(caption);
    //     } else {
    //       caption = element.caption;
    //       if (category == 'holidayKindType') {
    //         if (caption == "Island & Beach") {
    //           caption = "Islands & Beaches";
    //         } else if (caption == "City") {
    //           caption = "Cities";
    //         } else if (caption == "Cruise") {
    //           caption = "Cruises";
    //         }
    //       }
    //       $scope.listOfCategories.travelConfig[arrType].push(caption);
    //     }
    //   });
    // };
    $scope.selectedCategory = function (category, arrType) {
      holidayList = _.filter($scope[category], ['class', "active-holiday"]);
      $scope.listOfCategories.travelConfig[arrType] = [];
      _.each(holidayList, function (element) {
        $scope.listOfCategories.travelConfig[arrType].push(element.storeCaption);
      });
      console.log($scope.listOfCategories.travelConfig[arrType]);
    };


    var saveDataCallback = function (data, status) {
      if (data.value === true) {
        NavigationService.getProfile($.jStorage.get("profile").urlSlug, function (data, status) {
          if (data.data._id) {
            $.jStorage.set("isLoggedIn", true);
            $.jStorage.set("profile", data.data);
            $state.go("mylife", {
              name: 'journey'
            });
          } else {
            $.jStorage.flush();
          }
        }, function (err) {
          console.log(err);
        });
      } else {
        console.log(data);
      }
    }
    $scope.saveUserData = function (userData) {
      console.log(userData);
      NavigationService.saveUserData(userData, saveDataCallback, function (err) {
        console.log(err);
      });
    }

    // Integration Section Ends here

  })
  .controller('TripSummaryCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $stateParams, OnGoJourney) {
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

    // start scroll
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var journeyInfoStrip = $('.journey-info-strip').outerHeight();

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(this).scrollTop();

      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      if (st > lastScrollTop && st > journeyInfoStrip) {
        // Scroll Down
        $('.journey-info-strip').addClass('remove-otgstrip').removeClass('get-otgstrip');
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('.journey-info-strip').addClass('get-otgstrip').removeClass('remove-otgstrip');
        }
      }

      lastScrollTop = st;
    }
    // scroll end

  })
  .controller('OnGoJourneyCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $interval, OnGoJourney, LikesAndComments, $state, $stateParams, $filter, $http) {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var journeyInfoStrip = $('.journey-info-strip').outerHeight();

    $scope.ongoCard = true;

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta)
        return;
      if (st > lastScrollTop && st > journeyInfoStrip) {
        // Scroll Down
        $('.journey-info-strip').addClass('remove-otgstrip').removeClass('get-otgstrip');
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('.journey-info-strip').addClass('get-otgstrip').removeClass('remove-otgstrip');
        }
      }
      lastScrollTop = st;
    }

    // set height on comment box
    // $(window).resize(function () {
    //   $('.listing-comment').height($(window).height() - 226);
    // })
    // set height on comment box end
    //Used to name the .html file
    var slug = $stateParams.id;
    var checkinCount = "";
    $scope.userData = $.jStorage.get("profile");

    var getOneJourneyCallback = function (journeys) {
      $scope.journey = journeys;
      var postsWithLatLng = [];
      postsWithLatLng = _.filter($scope.journey.post,  'latlong');
      _.each(postsWithLatLng, function (n, $index) {
        if (n && n.latlong && n.latlong.lat && n.latlong.long) {
          centers[$index] = {
            "lat": parseFloat(n.latlong.lat),
            "lng": parseFloat(n.latlong.long)
          };
        } else {
          alert("no latlong found");
        }
      });
      if (journeys && journeys.location && journeys.location.lat) {
        var obj = {
          "lat": parseFloat(journeys.location.lat),
          "lng": parseFloat(journeys.location.long)
        }
        centers.unshift(obj);
      } else {
        alert("Location of Banner not found");
      }
      initMap();
    };

    OnGoJourney.getOneJourney({
      "urlSlug": slug,
    }, getOneJourneyCallback, function (err) {
      console.log(err);
    });

    //change banner date and time starts
    $scope.time = {};
    $scope.datetime = {};
    $scope.changeBannerDate = function () {
      console.log("Banner Date");
      $scope.isPostDate = false;
      $scope.isBannerDate = true;
      date = $scope.journey.startTime;
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

      console.log($scope.journey.post[$scope.journey.post.length - 1].UTCModified);
      $scope.options = {
        minDate: new Date(1 / 1 / 1970),
        maxDate: new Date($scope.journey.post[$scope.journey.post.length - 1].UTCModified),
        showWeeks: false
      };
      modal = $uibModal.open({
        animation: true,
        templateUrl: "views/modal/date-time.html",
        scope: $scope,
        backdropClass: "review-backdrop",
      })
    };

    $scope.updateBannerDateTime = function (id, formData, dt) {
      console.log(dt);
      var date = $filter('formatDateCalender')(dt);
      var time = $filter('formatTimeCalender')(formData);
      var result = {};
      var callback = function (data) {
        var formData = {
          "urlSlug": $scope.journey.urlSlug
        }
        OnGoJourney.getOneJourney(formData, function (journeys) {
          $scope.journey.startTime = journeys.startTime;
          modal.close();
          console.log(journeys);
        }, function (err) {
          console.log(err);
        });
      }
      result._id = id;
      result.startTime = new Date(date + " " + time);
      OnGoJourney.updateBannerDateTime(result, callback);
    };
    //change banner date and time ends
    // change ended journey date
    $scope.time = {};
    $scope.datetime = {};
    $scope.changeEndDate = function () {
      console.log("end journey Date");
      $scope.isPostDate = false;
      $scope.isBanner = false;
      $scope.isEndDate = true;
      date = $scope.journey.endTime;
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

      console.log($scope.journey.post[$scope.journey.post.length - 1].UTCModified);
      $scope.options = {
        minDate: new Date($scope.journey.post[$scope.journey.post.length - 1].UTCModified),
        maxDate: new Date(date),
        showWeeks: false
      };
      modal = $uibModal.open({
        animation: true,
        templateUrl: "views/modal/date-time.html",
        scope: $scope,
        backdropClass: "review-backdrop",
      })
    };
    $scope.endJourneyDate = function (id, formData, dt) {
      console.log(dt);
      var date = $filter('formatDateCalender')(dt);
      var time = $filter('formatTimeCalender')(formData);
      var result = {};
      var callback = function (data) {
        var formData = {
          "urlSlug": $scope.journey.urlSlug
        }
        OnGoJourney.getOneJourney(formData, function (journeys) {
          $scope.journey.endTime = journeys.endTime;
          modal.close();
          console.log(journeys);
        }, function (err) {
          console.log(err);
        });
      }
      result._id = id;
      result.endTime = new Date(date + " " + time);
      OnGoJourney.endDateJourney(result, callback);
    };
    // change ended journey date end
    //maps integration starts here
    var mapStyle = [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#ffffff"
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#3e606f"
      }, {
        "weight": 2
      }, {
        "gamma": 0.84
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{
        "weight": 0.6
      }, {
        "color": "#1a3541"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c5a71"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#406d80"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c5a71"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#29768a"
      }, {
        "lightness": -37
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#406d80"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c3757"
      }]
    }]

    //latlongs format
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
      var $map = $('#map');
      var mapDim = {
        height: $map.height(),
        width: $map.width()
      }
      center = new google.maps.LatLng(centers[0].lat, centers[0].lng);
      if (typeof google === 'object' && typeof google.maps === 'object') {
        var bounds = new google.maps.LatLngBounds();

        setMarker = function (status, current, previous, i) {
          var currentPosition = new google.maps.LatLng(current.lat, current.lng);
          if (previous != null) {
            console.log("previous should set now");
            var previousPosition = new google.maps.LatLng(previous.lat, previous.lng);
            // markers[i-1].setMap(null);
            var previousObj = {
              position: previousPosition,
              map: map,
              icon: "img/maps/red-marker.png"
            }
            // marker = new google.maps.Marker(previousObj);
            // markers[i-1] = marker;
          }
          var currentObj = {
            position: currentPosition,
            map: map,
            // icon: "img/maps/small-marker.png"
          };
          if (status == "small-marker") {
            currentObj.icon = "img/maps/small-marker.png";
          } else if (status == "red-marker") {
            currentObj.icon = "img/maps/red-marker.png";
          } else if (status == "green-marker") {
            currentObj.icon = "img/maps/green-marker.png";
          } else if (status == null) {
            currentObj.map = null;
            currentObj.zIndex = i;
          }
          marker = new google.maps.Marker(currentObj);
          markers[i] = marker;
        };

        map = new google.maps.Map(document.getElementById('map'), {
          draggable: true,
          animation: google.maps.Animation.DROP,
          center: center,
          zoom: 4,
          styles: mapStyle,
          disableDefaultUI: true
        });

        commingMap = new google.maps.Map('', {
          draggable: true,
          animation: google.maps.Animation.DROP,
          center: center,
          zoom: 4
          // styles: mapStyle
        });


        var step = 0;
        var numSteps = 100; //Change this to set animation resolution
        var lineSymbol = {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 3
        };


        {
          // Grey static dotted - polylines starts here
          // travelPath = new google.maps.Polyline({
          //   path: centers,
          //   geodesic: true,
          //   strokeColor: '#D3D3D3',
          //   strokeOpacity: 0,
          //   strokeWeight: -3,
          //   icons: [{
          //     icon: lineSymbol,
          //     offset: '0',
          //     repeat: '20px'
          //   }],
          // });
          // travelPath.setMap(map);
          // Grey static polylines ends here

        }


        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
          if (centers.length != 0) {
            _.each(centers, function (n, index) {
              setMarker(null, n, null, index + 1);
            });
            // setMarker("green-marker", centers[0], null, 1);
            // markers[1].setMap(map);
            // markers[1].setIcon("img/maps/green-marker.png");
            clearInterval(myVar);
          } else {
            console.log("didnt got center");
          }
        };

        function getBoundsZoomLevel(bounds, mapDim) {
          var WORLD_DIM = {
            height: 256,
            width: 256
          };
          var ZOOM_MAX = 21;

          function latRad(lat) {
            var sin = Math.sin(lat * Math.PI / 180);
            var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
            return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
          }

          function zoom(mapPx, worldPx, fraction) {
            return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
          }

          var ne = bounds.getNorthEast();
          var sw = bounds.getSouthWest();

          var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

          var lngDiff = ne.lng() - sw.lng();
          var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

          var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
          var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

          return Math.min(latZoom, lngZoom, ZOOM_MAX);
        }

        function redLineDraw(i, departure, arrival, percentComplete, value, flag) {
          var xdiff = (centers[i].lat - centers[i - 1].lat);
          var ydiff = (centers[i].lng - centers[i - 1].lng);
          var currentZoom = currentZoom = map.getZoom();
          var commingZoom;
          if (value) {
            var markerBounds = new google.maps.LatLngBounds();
            markerBounds.extend(departure);
            markerBounds.extend(arrival);
            commingZoom = getBoundsZoomLevel(markerBounds, mapDim);
            map.fitBounds(markerBounds);
          }
          var frac1 = xdiff / 100;
          var frac2 = ydiff / 100;
          var iniLat = centers[i - 1].lat;
          var iniLng = centers[i - 1].lng;
          var timePerStep = frac1; //Change this to alter animation speed
          var lineSymbol = {
            path: 'M 0,-1 0,1',
            // path: google.maps.SymbolPath.map - icon - airport,
            strokeOpacity: 1,
            scale: 3
          };
          if (percentComplete == 100 && flag) {
            if (markers[i + 1].map == null) {
              markers[i + 1].setMap(map);
            }
            markers[i + 1].setIcon("img/maps/green-marker.png");
            markers[i].setIcon("img/maps/red-marker.png");
          } else if ((percentComplete > 98 && percentComplete < 100 && i == centers.length - 1)) {
            if (markers[i + 1].map == null) {
              markers[i + 1].setMap(map);
            }
            markers[i + 1].setIcon("img/maps/green-marker.png");
            markers[i].setIcon("img/maps/red-marker.png");
          }

          if (_.isEmpty(line[i])) {
            line[i] = new google.maps.Polyline({
              path: [departure, departure],
              // strokeColor: "#f2675b", //orange
              // strokeColor: "#263757", //navy-blue
              strokeColor: "#11d3cb", //navy-blue
              // strokeOpacity: 1,
              //   strokeWeight: 3,
              strokeOpacity: 0, //fir dotted lines
              strokeWeight: 3,
              icons: [{
                icon: lineSymbol,
                offset: '0', //set +ve val for moving trails
                repeat: '20px'
              }],

              geodesic: true, //set to false if you want straight line instead of arc
              map: map,
            });
          }
          var drawLine = function (departure, arrival, percent, i, value) {
            percentFrac = percent / 100;
            var are_we_there_yet = google.maps.geometry.spherical.interpolate(departure, arrival, percentFrac);
            line[i].setPath([departure, are_we_there_yet]);
            // static center =center of departure and arrival starts
            if (value) {
              center = {
                "lat": iniLat + (centers[i].lat - centers[i - 1].lat) / 2,
                "lng": iniLng + (centers[i].lng - centers[i - 1].lng) / 2
              }
              center = new google.maps.LatLng(center.lat, center.lng);
            }
            // static center =center of departure and arrival ends
            map.setCenter(center);
          };
          drawLine(departure, arrival, percentComplete, i, value);
        }

        pointsForLine = function (i, percentComplete, value, flag) {
          // i=currennt card comming from bottom / arrival card
          //value=true for identifyng current departure and arrival
          //flag=true only when percentComplete reaches 100
          var departure = new google.maps.LatLng(centers[i - 1].lat, centers[i - 1].lng); //Set to whatever lat/lng you need for your departure location
          var arrival = new google.maps.LatLng(centers[i].lat, centers[i].lng); //Set to whatever lat/lng you need for your arrival locationlat:
          step = 0;
          var linesCount = line.length - 1;
          for (markerCount = markers.length - 1; markerCount > 0; markerCount--) {
            if ((value == true) && (percentComplete < 100)) {
              if (markerCount == i) {
                markers[markerCount].setIcon("");
                if (markers[markerCount].map == null) {
                  markers[markerCount].setMap(map);
                };
                markers[markerCount].setIcon("img/maps/green-marker.png");
              } else if (markerCount >= i) {
                markers[markerCount].setMap(null);
              } else if ((markerCount <= i)) {
                if (markers[markerCount].map == null) {
                  markers[markerCount].setMap(map);
                };
                markers[markerCount].setIcon("img/maps/small-marker.png");
              }
            } else {
              break;
            }
          }
          redLineDraw(i, departure, arrival, percentComplete, value, flag);

          //clearPolyLines starts
          while ((linesCount >= (i + 1)) && (value)) {
            if (!_.isEmpty(line[linesCount])) {
              line[linesCount].setMap(null);
              markers[linesCount].setMap(null);
              line[linesCount] = {};
            };
            linesCount--;
          };
          //clearPolyLines ends

          //draw succeeding polyLines starts
          if (i > 1) {
            pointsForLine(i - 1, 100);
            count = centers.length;
          };
          //draw succeeding polyLines end
        };
      }
    };
    setTimeout(function () {
      initMap();
    }, 1000);
    //maps integration ends here

    $scope.template = TemplateService.changecontent("ongojourney");
    $scope.menutitle = NavigationService.makeactive("OnGoJourney");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // EDIT KIND OF JOURNEY POPUP
    $scope.editKindOf = function () {
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/edit-kind-of-journey.html",
        scope: $scope,
        backdropClass: "review-backdrop",
      });
    };

    $scope.journeyType = [{
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
    }, {
      img: "img/itinerary/shopping-white.png",
      caption: "Shopping",
      width: "24"
    }, {
      img: "img/itinerary/cap-white.png",
      caption: "Solo",
      width: "35"
    }, {
      img: "img/itinerary/speaker-white.png",
      caption: "Festival",
      width: "29"
    }, {
      img: "img/itinerary/backpacking.png",
      caption: "Backpacking",
      width: "23"
    }];
    // EDIT KIND OF JOURNEY POPUP END

    $scope.selectItinerary = function (val) {
      console.log(val);
      if ($scope.journeyType[val].activeClass == "active-itinerary") {
        console.log("inside if");
        $scope.journeyType[val].activeClass = "";
      } else {
        console.log("inside else");
        $scope.journeyType[val].activeClass = "active-itinerary";
      }
      console.log($scope.journeyType[val]);
    };

    $scope.viewCardComment = false;
    $scope.getCard = "";
    $scope.comment = {
      'text': ""
    };

    $scope.getCommentsData = function (ongo) {
      console.log(ongo, 'ongo');
      $scope.post = ongo;
      $scope.previousId;
      $scope.viewCardLike = false;
      var callback = function (data) {
        $scope.uniqueArr = [];
        $scope.listOfComments = data.data;
        $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
      }
      if ($scope.previousId != $scope.post._id) {
        // $scope.focus('enterComment');
        $scope.listOfComments = [];
        $scope.viewCardComment = true;
        $scope.journey.journeyHighLight = ongo._id;
        $scope.getCard = "view-whole-card";
        LikesAndComments.getComments("post", $scope.post._id, callback);
      } else {
        if ($scope.viewCardComment) {
          $scope.viewCardComment = false;
          $scope.journey.journeyHighLight = "";
          $scope.getCard = "";
          $scope.comment.text = "";
        } else {
          $scope.listOfComments = [];
          $scope.viewCardComment = true;
          // $scope.focus('enterComment');
          $scope.journey.journeyHighLight = ongo._id;
          $scope.getCard = "view-whole-card";
          LikesAndComments.getComments("post", $scope.post._id, callback);
        }
      }
      $scope.previousId = $scope.post._id;
    };

    $scope.closeBackDrop = function () {
      $scope.viewCardComment = false;
      $scope.viewCardLike = false;
      $scope.journey.journeyHighLight = "";
      $scope.getCard = "";
      $scope.comment.text = "";
      $scope.showLikeShow = "";
    };

    $scope.getLikesData = function (ongo) {
      $scope.viewCardComment = false;
      var callback = function (data) {
        $scope.listOfLikes = data.data;
        console.log($scope.listOfLikes);
      };
      console.log($scope.post);
      if ($scope.previousLikeId != ongo._id) {
        // $scope.focus('enterComment');
        $scope.listOfLikes = [];
        $scope.viewCardLike = true;
        $scope.journey.journeyHighLight = ongo._id;
        $scope.showLikeShow = "show-like-side-sec";
        LikesAndComments.getLikes("post", ongo._id, callback);
      } else {
        if ($scope.viewCardLike) {
          $scope.viewCardLike = false;
          $scope.journey.journeyHighLight = "";
          $scope.getCard = "";
          $scope.showLikeShow = "";
        } else {
          $scope.listOfComments = [];
          $scope.viewCardLike = true;
          // $scope.focus('enterComment');
          $scope.journey.journeyHighLight = ongo._id;
          $scope.showLikeShow = "show-like-side-sec";
          LikesAndComments.getLikes("post", ongo._id, callback);
        }
      }
      $scope.previousLikeId = ongo._id;
    };

    $scope.postPostsComment = function (uniqueId, comment, postId) {
      console.log(uniqueId, comment, postId);
      console.log("controller se comment hua");
      var type = "post";
      var additionalId = null;
      var hashTag = [];
      var callback = function (data) {
        $scope.listOfComments = data.data;
        document.getElementById('enterComment').value = "";
      };
      LikesAndComments.postComment(type, uniqueId, postId, comment, hashTag, additionalId, callback);
    };

    $scope.likePost = function (uniqueId, _id) {
      console.log($scope.post.likeDone + "this call is from ongojourney.html");
      $scope.post.likeDone = !$scope.post.likeDone;
      if ($scope.post.likeDone) {
        if ($scope.post.likeCount === undefined) {
          $scope.post.likeCount = 1;
        } else {
          $scope.post.likeCount = $scope.post.likeCount + 1;
        }
        LikesAndComments.likeUnlike("post", "like", uniqueId, _id, null);
      } else {
        $scope.post.likeCount = $scope.post.likeCount - 1;
        LikesAndComments.likeUnlike("post", "unlike", uniqueId, _id, null);
      }
    };

    // $scope.getLikes = function (id) {
    //   var formData = {
    //     "_id": id
    //   }
    //   $http({
    //     url: adminURL + "/post/getPostLikes",
    //     method: "POST",
    //     data: formData
    //   }).success(function (data) {
    //     $scope.listOfLikes = data.data;
    //   });
    // };

    $scope.focus = function (id) {
      console.log(id, "focus called");
      document.getElementById(id).focus();
      document.getElementById(id).select();
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


    $scope.format = "yyyy/MM/dd";

    // edit journey name starts
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
    // cover photo end
    $scope.cropCover = function (imgCrop) {
      $scope.showCover = imgCrop;
      $scope.cropImage = true;
    };
    $scope.viewPrev = function () {
      $scope.cropImage = false;
    };

    // edit date and time
    // $scope.changeDate = function () {
    //   alert();
    //   $scope.options = {
    //     minDate:new Date(1/1/1970),
    //     showWeeks: false
    //   };
    //   $uibModal.open({
    //     animation: true,
    //     templateUrl: "views/modal/date-time.html",
    //     scope: $scope,
    //     backdropClass: "review-backdrop",
    //   });
    // };
    // edit date and time end

    setTimeout(function () {
      $('.flexslider').flexslider({
        itemMargin: 5,
        itemWidth: 99,
        animation: "slide",
        controlNav: false,
      });
    }, 100);

    // country modal
    var modal = "";

    $scope.review = {};

    $scope.countryReview = function () {
      $scope.reviewCountryCount = 0;
      console.log($scope.journey);
      var len = $scope.journey.countryVisited.length;
      console.log(len);
      if (len !== 0 && ($scope.reviewCountryCount < len)) {
        $scope.review.fillMeIn = $scope.journey.review[$scope.reviewCountryCount].review;
        $scope.review.rate = $scope.journey.review[$scope.reviewCountryCount].rating;
      }
      modal = $uibModal.open({
        animation: true,
        templateUrl: "views/modal/review-country.html",
        scope: $scope,
        backdropClass: "review-backdrop",
      });
      modal.closed.then(function () {

      })
    };

    // country modal ends

    $scope.rateThisCountry = function (journeyId, countryId, formData, currentIndex) {
      console.log(currentIndex);
      var result = {
        journey: journeyId,
        country: countryId,
        review: formData.fillMeIn,
        rating: formData.rate.toString()
      };
      var callback = function () {
        $scope.journey.review[currentIndex].review = result.review;
        $scope.journey.review[currentIndex].rating = result.rating;
      };
      OnGoJourney.rateThisCountry(result, callback);
      $scope.reviewCountryCount = $scope.reviewCountryCount + 1;
      var len = $scope.journey.countryVisited.length;
      if ($scope.reviewCountryCount < len) {
        if (($scope.journey.review.length > $scope.reviewCountryCount)) {
          $scope.review.fillMeIn = $scope.journey.review[$scope.reviewCountryCount].review;
          $scope.review.rate = $scope.journey.review[$scope.reviewCountryCount].rating;
        } else {
          $scope.review.fillMeIn = "";
          $scope.review.rate = 1;
        }
      } else {
        console.log(modal);
        modal.close();
      }
      //  test=$scope.journey.review[$scope.reviewCountryCount].review
      // $scope.review.fillM=test;
      // console.log($scope.review.fil);
      // $scope.review.fillMeIn=$scope.journey.review[$scope.reviewCountryCount].review;
    };
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

    $scope.followFollowing = function (user) {
      console.log(user.following, user._id, user.name);
      if (user.following) {
        LikesAndComments.unFollowUser(user._id, function (data) {
          if (data.value) {
            user.following = false;
          } else {
            console.log(data.data);
          }
        })
      } else {
        LikesAndComments.followUser(user._id, user.name, function (data) {
          console.log(data);
          if (data.value) {
            user.following = true;
          } else {
            console.log(data.data);
          }
        });
      }
    }
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
  .controller('PopularAgentCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-agent");
    $scope.menutitle = NavigationService.makeactive("Popular Agent");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller('PopularItineraryCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-itinerary");
    $scope.menutitle = NavigationService.makeactive("Popular Itinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.travelLife = [{
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

  .controller('PopularJourneyCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-journey");
    $scope.menutitle = NavigationService.makeactive("Popular Journey");
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
    }];
  })

  .controller('DestinationCtrl', function ($scope, $state, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination");
    $scope.menutitle = NavigationService.makeactive("Destination");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    cfpLoadingBar.start();
    $scope.destinationList = [];
    $scope.viewListByKey = "A";
    $scope.countryDestList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    $scope.i = 0;
    $scope.callCountry = function (search, searchText) {
      $scope.i++;
      NavigationService.getDestination({
        search: search,
        searchText: searchText,
        count: $scope.i
      }, function (data) {
        if ($scope.i === data.count) {
          $scope.destinationList = data.data;
          $scope.i = 0;
        }
        cfpLoadingBar.complete();
      });
    }
    $scope.callCountry("a", "");
    $scope.searchDestination = function (searchVal) {
      if (searchVal === "") {
        $scope.callCountry("a", "");
        $scope.viewListByKey = "A";
      } else {
        $scope.viewListByKey = searchVal.charAt(0);
        $scope.callCountry(searchVal, searchVal);
      }
      cfpLoadingBar.complete();
    };

    // destination country city
    $scope.countryView = function (url, isCity) {
      if (isCity === false) {
        $state.go("destinationcountry", {
          name: "featured",
          url: url
        });
      } else {
        $state.go("destinationcity", {
          name: "mustdo",
          url: url
        })
      }
    }
    // destination country city end

    // get booking data
    $scope.getBooking = function (dest) {
      cfpLoadingBar.start();
      console.log(dest);
      $scope.destCityName = dest.name;
      $scope.destCountryName = dest.country[0].name;
      NavigationService.getDestinationBooking({
        cityName: $scope.destCityName,
        countryName: $scope.destCountryName
      }, function (data) {
        $.jStorage.set("booking", data);
        // $scope.bookingData = data.hotels;
        // console.log($scope.bookingData,'booking ka data');
        cfpLoadingBar.complete();
      });
    };
    // get booking data end


    // get vacations

    // get vacations end



  })

  .controller('DestinationCountryCtrl', function ($scope, $state, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination-country");
    $scope.menutitle = NavigationService.makeactive("Destination");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.urlDestinationCountry = $state.params.url;
    cfpLoadingBar.start();

    $scope.countryDestData = [];
    $scope.pagenumber = 1;
    $scope.scroll = {};
    $scope.scroll.busy = false;
    $scope.scroll.stopCallingApi = false;
    $scope.getCountryInfo = function (type, urlSlug) {
      cfpLoadingBar.start();
      $scope.scroll.busy = false;
      NavigationService.getCountryDestination({
        pagenumber: $scope.pagenumber,
        type: type,
        urlSlug: $scope.urlDestinationCountry,
        city: $scope.destinationCityFilter,
        itineraryType: $scope.destinationItineraryType,
        itineraryBy: $scope.destinationItineraryBy
      }, function (data) {
        if (type == 'itinerary') {
          if (data.data.itinerary.length == 0) {
            $scope.scroll.stopCallingApi = true;
          } else {
            console.log(data, 'data');
            _.each(data.data, function (newData) {
              $scope.countryDestData.push(newData);
            });
            console.log($scope.countryDestData, 'data');
          };
        } else {
          $scope.countryDestData = data.data;
        }
        cfpLoadingBar.complete();
        // console.log($scope.countryDestData, 'what is cadat');
      });
    };

    $scope.itineraryLoadMore = function () {
      $scope.pagenumber++;
      $scope.scroll.busy = true;
      console.log($scope.pagenumber, 'pagenumber');
      // $scope.getCountryInfo("itinerary",$scope.urlDestinationCountry);
      if ($scope.scroll.stopCallingApi == false) {
        $scope.getCountryInfo("itinerary", $scope.urlDestinationCountry);
      }
    };

    // FILTER ITINERARY DESTINATION
    $scope.itinerary = {};
    $scope.itinerary.citySearch = "";
    $scope.itinerary.type = "";
    $scope.itinerary.by = "";
    $scope.cityList = [];
    $scope.destinationItineraryType = [];
    $scope.destinationItineraryBy = [];
    $scope.destinationCityFilter = [];
    $scope.getItinerayCity = function (searchText) {
      console.log('hihsjk');
      NavigationService.getCitySearch({
        keyword: $scope.itinerary.citySearch
      }, function (data) {
        $scope.cityList = data.data.results;
        console.log($scope.cityList, 'cityList');
      })
    };

    $scope.getItinerayCity('a');
    $scope.itineraryType = ['Adventure', 'Business', 'Family', 'Romance', 'Budget', 'Luxury', 'Religious', 'Friends', 'Shopping', 'Solo', 'Festival', 'Backpacking'];
    $scope.itineraryBy = ['User', 'TravelAgent', 'Editor']

    // filter sorting

    $scope.itineraryFilter = function (filterItinerary, filterType) {
      console.log(filterItinerary);
      switch (filterType) {
        case 'itineraryCity':
          var cityIndex = _.findIndex($scope.destinationCityFilter, function (type) {
            return type == filterItinerary;
          });
          if (cityIndex == -1) {
            $scope.destinationCityFilter.push(filterItinerary);
            console.log($scope.destinationCityFilter, 'city');
          } else {
            _.remove($scope.destinationCityFilter, function (remove) {
              return remove == filterItinerary;
            })
            console.log($scope.destinationCityFilter, 'city');
          }
          break;
        case 'itineraryType':
          var typeIndex = _.findIndex($scope.destinationItineraryType, function (type) {
            return type == filterItinerary;
          });
          if (typeIndex == -1) {
            $scope.destinationItineraryType.push(filterItinerary);
            console.log($scope.destinationItineraryType, 'type');
          } else {
            _.remove($scope.destinationItineraryType, function (remove) {
              return remove == filterItinerary;
            })

            console.log($scope.destinationItineraryType, 'type');
          }
          break;
        case 'itineraryBy':
          var byIndex = _.findIndex($scope.destinationItineraryBy, function (type) {
            return type == filterItinerary;
          });
          if (byIndex == -1) {
            $scope.destinationItineraryBy.push(filterItinerary);
            console.log($scope.destinationItineraryBy, 'by');
          } else {
            _.remove($scope.destinationItineraryBy, function (remove) {
              return remove == filterItinerary;
            })
            console.log($scope.destinationItineraryBy, 'by');
          }
          break;
        default:

      }
    }
    // filter sorting end
    // $scope.getFiltertedItinerary = function () {
    //   NavigationService.getFilterItineraryData({
    //     type: "itinerary",
    //     pagenumber: 1,
    //     city: [],
    //     itineraryType: [],
    //     itineraryBy: []
    //   }, function (data) {
    //     console.log(data);
    //     $scope.countryDestData = data.data;
    //   })
    // };
    // FILTER ITINERARY DESTINATION END

    // destination city
    $scope.countryView = function (url, isCity) {
      $state.go("destinationcity", {
        name: "mustdo",
        url: url
      })
    }

    // destination city end

    var alldestination = ["views/content/destination/country/featured.html", "views/content/destination/country/mustdo.html", "views/content/destination/country/itineraries.html", "views/content/destination/country/booking.html", "views/content/destination/country/visit.html"];
    $scope.destination = {
      innerView: alldestination[0]
    };
    // change url
    $scope.countryoptions = {};
    $scope.countryoptions.active = "";
    $scope.viewTab = 1;
    $scope.destinationTabView = function (destinationType) {
      switch (destinationType) {
        case "featured":
          $scope.countryoptions.active = "featured";
          $scope.destination.innerView = alldestination[0];
          $scope.countryDestData = [];
          $scope.getCountryInfo("featuredCities", $scope.urlDestinationCountry);
          break;
        case "mustdo":
          $scope.countryoptions.active = "mustdo";
          $scope.destination.innerView = alldestination[1];
          $scope.countryDestData = [];
          $scope.getCountryInfo("mustDo", $scope.urlDestinationCountry);
          break;
        case "itineraries":
          $scope.countryoptions.active = "itineraries";
          $scope.destination.innerView = alldestination[2];
          $scope.countryDestData = [];
          $scope.getCountryInfo("itinerary", $scope.urlDestinationCountry);
          break;
        case "booking":
          $scope.countryoptions.active = "booking";
          $scope.countryDestData = [];
          $scope.destination.innerView = alldestination[3];
          break;
        case "visit":
          $scope.countryoptions.active = "visit";
          $scope.countryDestData = [];
          $scope.destination.innerView = alldestination[4];
          break;
        default:
          $scope.countryDestData = [];
          $scope.destination.innerView = alldestination[0];
      }
    };
    $scope.destinationTabView($state.params.name);
    $scope.getTab = function (view) {
      console.log(view);
      $scope.destinationTabView(view);
      console.log(view);
      $state.go("destinationcountry", {
        name: view
      }, {
        notify: false
      });
    };
    //contentopen
    $scope.isopenfilter = false;
    $scope.openFilter = function () {
      $scope.isopenfilter = !$scope.isopenfilter;
    };


    // $scope.flip = function() {
    // // $('.card').toggleClass('flipped');
    // $(".card").addClass("flipped");

    // country popup
    // $scope.mustDoArr = $scope.countryDestData.mustDo;
    $scope.openCountry = function (index) {
      $scope.mustDoArr = _.cloneDeep($scope.countryDestData.mustDo);
      $scope.mustDoSplice = $scope.mustDoArr.splice(0, index);
      $scope.countryMustDoImg = _.concat($scope.mustDoArr, $scope.mustDoSplice);
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/country-mustdo.html",
        windowClass: "cover-modal1",
        controller: 'DestinationCountryCtrl',
        scope: $scope
      });
    };
    // tour packages card
    $scope.usrTourPackageCard = [{
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryTitle: 'Adventure',
      tourcategoryImg: 'img/agt-cat1.png',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat5.png',
      tourcategoryTitle: 'Backpacking',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat4.png',
      tourcategoryTitle: 'Romance',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat9.png',
      tourcategoryTitle: 'Friends',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat1.png',
      tourcategoryTitle: 'Adventure',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/canada-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat7.png',
      tourcategoryTitle: 'Luxury',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/review-country.png']
    }];
    // tour packages card end

    //contact us
    $scope.viewContact = false;
    $scope.getBackdrop = "";
    $scope.showContact = function () {
      // console.log("click");
      if ($scope.viewContact == false) {
        $scope.getBackdrop = "backdrop-enquiry";
        $scope.viewContact = true;
      } else {
        $scope.viewContact = false;
        $scope.getBackdrop = "";
      }
    };
    //contact us end


    //bookings photos
    $scope.bookingPhoto = [{
      img: 'img/hotel.jpg',
    }, {
      img: 'img/hotel1.jpg',
    }, {
      img: 'img/hotel2.jpg',
    }, {
      img: 'img/hotel.jpg',
    }, {
      img: 'img/hotel1.jpg',
    }, {
      img: 'img/hotel2.jpg',
    }];

    $scope.bookingPhoto = _.chunk($scope.bookingPhoto, 2);



    $scope.$on('$viewContentLoaded', function (event) {
      setTimeout(function () {
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 2,
          paginationClickable: true,
          spaceBetween: 5
        });
      }, 500);
    })

    //SHOW HIDE FILTER DROPDOWNS
    $scope.viewCityDrop = false;
    $scope.showCityDrop = function () {
      if ($scope.viewCityDrop == false) {
        $scope.viewCityDrop = true;
      } else {
        $scope.viewCityDrop = false;
      }
    };
    $scope.viewTypeDrop = false;
    $scope.showTypeDrop = function () {
      if ($scope.viewTypeDrop == false) {
        $scope.viewTypeDrop = true;
      } else {
        $scope.viewTypeDrop = false;
      }
    };
    $scope.viewByDrop = false;
    $scope.showByDrop = function () {
      if ($scope.viewByDrop == false) {
        $scope.viewByDrop = true;
      } else {
        $scope.viewByDrop = false;
      }
    };
    //SHOW HIDE FILTER DROPDOWNS END

  })
  .controller('DestinationCityCtrl', function ($scope, $state, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination-city");
    $scope.menutitle = NavigationService.makeactive("Destination");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.bookingData = $.jStorage.get("booking");
    $scope.hotelsData = $scope.bookingData.hotels;
    $scope.toursData = $scope.bookingData.tours;
    $scope.vacationsData = $scope.bookingData.vacation_rentals;
    $scope.homestayData = $scope.bookingData.home_stays;
    console.log($scope.hotelsData, 'hotel ka data');
    console.log($scope.toursData, 'tourData ka data');
    console.log($scope.vacationsData, 'vacationData ka data');
    console.log($scope.homestayData, 'homestayData ka data');


    $scope.star = function (starCount, type) {
      if (type == "marked") {
        starCount = parseInt(starCount);
        return new Array(starCount);
      } else if (type == "unmarked") {
        starCount = parseInt(starCount);
        var remainCount = 5 - starCount;
        return new Array(remainCount);
      }
    };

    $scope.urlDestinationCity = $state.params.url;
    $scope.getCityInfo = function (type, urlSlug) {
      cfpLoadingBar.start();
      NavigationService.getCityDestination({
        type: type,
        urlSlug: $scope.urlDestinationCity
      }, function (data) {
        $scope.cityDestData = data.data;
        console.log($scope.cityDestData, "destination city ka data");
        cfpLoadingBar.complete();
      })
    }

    // $scope.showBackCard = "";
    // $scope.backView = function () {
    //   if ($scope.showBackCard === "") {
    //     $scope.showBackCard = "flip-card";
    //   } else {
    //     $scope.showBackCard = "";
    //   }
    // };


    $scope.openCountry = function (index) {
      $scope.mustDoArr = _.cloneDeep($scope.cityDestData.mustDo);
      $scope.mustDoSplice = $scope.mustDoArr.splice(0, index);
      $scope.countryMustDoImg = _.concat($scope.mustDoArr, $scope.mustDoSplice);
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/city-mustdo.html",
        windowClass: "cover-modal1",
        controller: 'DestinationCityCtrl',
        scope: $scope
      });
    };


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

    // tour packages card
    $scope.usrTourPackageCard = [{
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryTitle: 'Adventure',
      tourcategoryImg: 'img/agt-cat1.png',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat5.png',
      tourcategoryTitle: 'Backpacking',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat4.png',
      tourcategoryTitle: 'Romance',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat9.png',
      tourcategoryTitle: 'Friends',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat1.png',
      tourcategoryTitle: 'Adventure',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/canada-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat7.png',
      tourcategoryTitle: 'Luxury',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/review-country.png']
    }];
    // tour packages card end

    //contact us
    $scope.viewContact = false;
    $scope.getBackdrop = "";
    $scope.showContact = function () {
      // console.log("click");
      if ($scope.viewContact == false) {
        $scope.getBackdrop = "backdrop-enquiry";
        $scope.viewContact = true;
      } else {
        $scope.viewContact = false;
        $scope.getBackdrop = "";
      }
    };
    //contact us end

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
        $scope.getCityInfo("mustDo", $scope.urlDestinationCity);
        $scope.cityoptions.active = "mustdo";
        break;
      case "hotels":
        $scope.destination.innerView = alldestination[1];
        $scope.cityoptions.active = "hotels";
        $scope.getCityInfo("hotel", $scope.urlDestinationCity);
        break;
      case "restaurants":
        $scope.destination.innerView = alldestination[2];
        $scope.cityoptions.active = "restaurants";
        $scope.getCityInfo("restaurant", $scope.urlDestinationCity);
        break;
      case "itineraries":
        $scope.destination.innerView = alldestination[3];
        $scope.cityoptions.active = "itineraries";
        $scope.getCityInfo("itinerary", $scope.urlDestinationCity);
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
          $scope.getCityInfo("mustDo", $scope.urlDestinationCity);
          break;
        case 1:
          url = "hotels";
          $scope.cityoptions.active = "hotels";
          $scope.getCityInfo("hotel", $scope.urlDestinationCity);
          break;
        case 2:
          url = "restaurants";
          $scope.cityoptions.active = "restaurants";
          $scope.getCityInfo("restaurant", $scope.urlDestinationCity);
          break;
        case 3:
          url = "itineraries";
          $scope.cityoptions.active = "itineraries";
          $scope.getCityInfo("itinerary", $scope.urlDestinationCity);
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

    $scope.getFilterData = function (urlSlug, budget, cuisine, type) {
      cfpLoadingBar.start();
      NavigationService.getCityDestination({
        urlSlug: $scope.urlDestinationCity,
        budget: budget,
        cuisine: cuisine,
        type: type,
      }, function (data) {
        $scope.cityDestData = data.data;
        console.log($scope.cityDestData, "budget");
        cfpLoadingBar.complete();
      });
    };

    $scope.filterByBudget = function (getBudget) {
      console.log("click to huwa", getBudget);
      $scope.getFilterData($scope.urlDestinationCity, getBudget, "", "restaurant");
      $scope.filteredData = {
        budget: "getBudget"
      };
      // $scope.getFilterData({
      //   urlSlug: $scope.urlDestinationCity,
      //   budget: 'getBudget',
      //   cuisine: "",
      //   type: "restaurant"
      // },function(data){
      //   $scope.budgetData = data.data;
      //   console.log($scope.budgetData,"budgetData");
      // });

    }

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

    //contact us
    $scope.viewContact = false;
    $scope.getBackdrop = "";
    $scope.showContact = function () {
      // console.log("click");
      if ($scope.viewContact == false) {
        $scope.getBackdrop = "backdrop-enquiry";
        $scope.viewContact = true;
      } else {
        $scope.viewContact = false;
        $scope.getBackdrop = "";
      }
    };
    //contact us end


    //bookings photos
    $scope.bookingPhoto = [{
      img: 'img/hotel.jpg',
    }, {
      img: 'img/hotel1.jpg',
    }, {
      img: 'img/hotel2.jpg',
    }, {
      img: 'img/hotel.jpg',
    }, {
      img: 'img/hotel1.jpg',
    }, {
      img: 'img/hotel2.jpg',
    }];

    $scope.bookingPhoto = _.chunk($scope.bookingPhoto, 2);



    $scope.$on('$viewContentLoaded', function (event) {
      setTimeout(function () {
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 2,
          paginationClickable: true,
          spaceBetween: 5
        });
      }, 500);
    })
  })

  .controller('MylifeCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, cfpLoadingBar, TravelibroService, $timeout, $uibModal, $location, $filter, MyLife, OnGoJourney, localLife, LikesAndComments, $anchorScroll, $location) {
    //Used to name the .html file
    // console.log("Testing Consoles");
    $scope.template = TemplateService.changecontent("mylife");
    $scope.menutitle = NavigationService.makeactive("Mylife");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.localView = {};
    $scope.localView.view = true;

    $scope.showTravellife = false;
    $scope.visited = [];
    if ($.jStorage.get("isLoggedIn") && ($.jStorage.get("profile").urlSlug == $stateParams.urlSlug)) {
      $scope.userData = $.jStorage.get("profile");
      $.jStorage.set("activeUrlSlug", $.jStorage.get("profile").urlSlug);
      $scope.activeUrlSlug = $.jStorage.get("profile").urlSlug;
      allowAccess = true;
      setMoreAboutMe();
      reloadCount();
    } else {
      // alert("not yours");
      // console.log($stateParams.urlSlug);
      allowAccess = false;
      $.jStorage.set("activeUrlSlug", $stateParams.urlSlug);
      $scope.activeUrlSlug = $stateParams.urlSlug;
      NavigationService.getProfile($stateParams.urlSlug, function (data) {
        console.log(data);
        if (data.value) {
          $scope.userData = data.data;
          allowAccess = false;
          setMoreAboutMe();
          reloadCount();
        } else {
          // $state.go("errorpage");
        }
      }, function (data) {
        console.log(data);
      });
    }
    console.log($scope.activeUrlSlug);
    $scope.allowAccess = allowAccess;
    $scope.isLoggedIn = $.jStorage.get("isLoggedIn");
    $scope.likeUnlikeActivity = function (activity) {
      console.log(activity.likeUnlikeFlag, activity.uniqueId, activity._id);
      console.log(activity.likeDone + "this call is from activitytest.html");
      activity.likeDone = !activity.likeDone;
      console.log(activity.likeUnlikeFlag);
      if (activity.likeDone) {
        if (activity.likeCount == undefined) {
          activity.likeCount = 1;
        } else {
          activity.likeCount = activity.likeCount + 1;
        }
        LikesAndComments.likeUnlike(activity.type, "like", activity.uniqueId, activity._id, null)
      } else {
        activity.likeCount = activity.likeCount - 1;
        LikesAndComments.likeUnlike(activity.type, "unlike", activity.uniqueId, activity._id, null)
      }
    };

    function setMoreAboutMe() {
      console.log("entered if");
      $scope.pronoun; //for he and she
      $scope.pronoun1; //for him and her
      $scope.userName = titleCase($scope.userData.firstName);
      $scope.kindOfHoliday = $scope.userData.travelConfig.kindOfHoliday[0];
      $scope.usuallyGo = $scope.userData.travelConfig.usuallyGo[0];
      $scope.flag = false;

      var blogIndex = $scope.userData.travelConfig.preferToTravel.indexOf("Blogger");
      var photoIndex = $scope.userData.travelConfig.preferToTravel.indexOf("Photographer");

      if (blogIndex != -1) {
        $scope.preferToTravel = $scope.userData.travelConfig.preferToTravel[blogIndex];
      } else if (photoIndex != -1) {
        $scope.preferToTravel = $scope.userData.travelConfig.preferToTravel[photoIndex];
      } else {
        $scope.preferToTravel = $scope.userData.travelConfig.preferToTravel[0];
      }

      $scope.idealHoliday = $scope.userData.travelConfig.holidayType[0];

      if ($scope.userData.gender == "male") {
        $scope.pronoun = "he";
        $scope.pronoun1 = "him";
      } else {
        $scope.pronoun = "she";
        $scope.pronoun1 = "her";
      }

      if ($scope.usuallyGo == "By the map ") {
        $scope.usuallyGo = "by the map";
      } else if ($scope.usuallyGo == "Where the road takes you") {
        $scope.usuallyGo = "where the road takes " + $scope.pronoun1;
      } else if ($scope.usuallyGo == "A little bit of both") {
        $scope.flag = true;
        $scope.usuallyGo = "by the map or ";
        $scope.usuallyGo1 = "where the road takes " + $scope.pronoun1;
      }

      if (($scope.preferToTravel == "Blogger") || ($scope.preferToTravel == "Photographer")) {
        $scope.intermediate = "is a ";
      } else {
        if (($scope.preferToTravel == "Family") || ($scope.preferToTravel == "Friends")) {
          $scope.intermediate = "prefers to travel with "
        } else if ($scope.preferToTravel == "Business") {
          $scope.intermediate = "prefers to travel on ";
        } else if ($scope.preferToTravel == "Group Tour") {
          $scope.intermediate = "prefers to travel on a ";
        } else if ($scope.preferToTravel == "Partner/Spouse") {
          $scope.intermediate = "prefers to travel with their";
          $scope.preferToTravel = "Partner";
        } else if ($scope.preferToTravel == "Solo") {
          $scope.intermediate = "prefers to travel ";
        }
      }

    };
    // backgroundClick
    $scope.editOption = function (model) {
      $timeout(function () {
        model.backgroundClick = true;
        backgroundClick.object = model;
      }, 200);
      backgroundClick.scope = $scope;
    };
    //backgroundClick
    function reloadCount() {
      NavigationService.getProfile($.jStorage.get("activeUrlSlug"), function (data, status) {
        $scope.userData = data.data;
        console.log($scope.userData.countriesVisited_count);
        updateBadgeBar($scope.userData.countriesVisited_count);
      }, function (err) {
        console.log(err);
      });
    };


    $scope.data = {
      'bucketList': {
        metric: 0
      },
      'countryVisited': {
        metric: 1
      }
    };

    $scope.isopen = false;
    $scope.openMyLifeFilter = function () {
      $scope.isopen = !$scope.isopen;
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
      // cfpLoadingBar.start();
      MyLife.updateBucketList(country, function (data, status) {
        reloadCount();
        // cfpLoadingBar.complete();
      }, function () {});
      $scope.getMap();
    };

    //update countries visited starts
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
    $scope.checkIfSelected = function (list) {
      if (list.year) {
        list.times = 1;
        $scope.disableAll = false;
      } else {
        list.times = 0;
        $scope.disableAll = true;
      }
    };
    var modal = "";
    var arr = [];
    $scope.obj = {};
    $scope.updateCountryVisited = function (country) {
      $scope.obj.countryId = country._id;
      if (country.countryVisited === true) {
        arr = [{}];
        modal = $uibModal.open({
          scope: $scope,
          animation: true,
          windowClass: "delete-visited-country",
          templateUrl: "views/modal/delete-visited-country.html"
        });
      } else {
        $scope.visited = [];
        arr = [];
        modal = $uibModal.open({
          scope: $scope,
          animation: true,
          templateUrl: "views/modal/country-visited.html"
        });
      }

      //remove country visited and all its count starts
      $scope.removeCountryVisited = function () {
        // cfpLoadingBar.start();
        var obj = {
          "countryId": country._id,
          "visited": []
        }
        MyLife.updateCountriesVisited(obj, function (data, status) {
          reloadCount();
          modal.close();
          // cfpLoadingBar.complete();
        }, function () {});
        arr = [];
        $scope.getMap();
      };
      //remove country visited and all its count ends

      $scope.getMap();
      modal.closed.then(function () {
        console.log(_.isEmpty(arr));
        if (_.isEmpty(arr)) {
          country.countryVisited = false;
        } else {
          country.countryVisited = true;
        }
      });
    };

    $scope.clearAllSelected = function (visited) {
      $scope.visited = [];
    };

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
      //applying validations and filters ends

      $scope.obj.visited = arr;
      if (!(_.isEmpty($scope.obj.visited))) {
        MyLife.updateCountriesVisited($scope.obj, function (data, status) {
          reloadCount();
        }, function () {});
        $scope.getMap();
      }
    };
    //update countries visited ends
    // Little more about me starts here
    function titleCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    console.log("aagaya change karvane");

    // Little more about me ends here
    //userBadge starts here
    var updateBadge = function (len) {
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


    $scope.level = "";
    $scope.mystyle1 = {
      "width": "0",
      "background-color": "#ff6759",
    };
    $scope.mystyle2 = {
      "width": "0",
      "background-color": "#ff6759",
    };
    $scope.mystyle3 = {
      "width": "0",
      "background-color": "#ff6759",
    };
    $scope.mystyle4 = {
      "width": "0",
      "background-color": "#ff6759",
    };

    var updateBadgeBar = function (len) {
      if (len < 4) {
        $scope.level = 1;
        $scope.userBadgeName = "img/newbie.png";
        $scope.mystyle1 = {
          "width": (len / 3) * 100 + '%',
          "background-color": "#ff6759",
        };
        $scope.mystyle2.width = "0";
        $scope.mystyle3.width = "0";
        $scope.mystyle4.width = "0";
      } else if (len < 8) {
        $scope.level = 2;
        $scope.userBadgeName = "img/Just-got-wings.png";
        $scope.mystyle1 = {
          "width": "100%",
          "background-color": "#ff6759",
        };
        $scope.mystyle2 = {
          "width": ((len - 3) / 4) * 100 + '%',
          "background-color": "#ff6759",
        };
        $scope.mystyle3.width = "0";
        $scope.mystyle4.width = "0";
      } else if (len < 16) {
        $scope.level = 3;
        $scope.userBadgeName = "img/Globe-Trotter.png";
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
        $scope.mystyle4.width = "0";
      } else if (len < 25) {
        $scope.level = 4;
        $scope.userBadgeName = "img/wayfarer.png";
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
        $scope.level = 5;
        $scope.userBadgeName = "img/nomad.png";
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
    // routing to on-the-go,detailed-iti,quick-iti
    $scope.routeTO = function (type, urlSlug) {
      console.log(type, urlSlug);
      if (type == "on-the-go-journey" || type == "ended-journey") {
        $state.go('ongojourney', {
          id: urlSlug
        });
      } else if (type == "quick-itinerary") {
        $state.go('userquickitinerary', {
          id: urlSlug
        });
      } else if (type == 'detail-itinerary') {
        $state.go('userdetailitinerary', {
          id: urlSlug
        });
      }
    };
    // routing to on-the-go,detailed-iti,quick-iti ends here

    //moment Integration starts here
    $scope.allMoments = {
      "arr": [],
      "scrollBusy": false,
      "stopCallingApi": false,
      "type": "all"

    };
    $scope.travelLifeMoments = {
      "arr": [],
      "scrollBusy": false,
      "stopCallingApi": false,
      "type": "travel-life",
      "pageNo": 1
    };
    $scope.localLifeMoments = {
      "arr": [],
      "scrollBusy": false,
      "stopCallingApi": false,
      "type": "local-life"
    };
    var getMoments = function () {
      // cfpLoadingBar.start();
      $scope.allMoments.scrollBusy = true;
      $scope.travelLifeMoments.scrollBusy = true;
      $scope.localLifeMoments.scrollBusy = true;
      console.log("getAllMoments called");
      MyLife.getAllMoments("", 36, "all", 3, function (data) {
        $scope.allMoments = {
          "arr": data.data,
          "scrollBusy": false,
          "stopCallingApi": false,
          "type": "all"
        };
        // cfpLoadingBar.complete();
      }, function (data) {
        console.log(data);
      });
      MyLife.getTravelLifeMoments("travel-life", 1, function (data) {
        // cfpLoadingBar.start();
        $scope.travelLifeMoments = {
          "arr": data.data,
          "scrollBusy": false,
          "stopCallingApi": false,
          "type": "travel-life",
          "pageNo": 1
        };
        // cfpLoadingBar.complete();
        // $scope.travelLifeMoments = data.data;
      }, function (data) {
        console.log(data);
      });
      MyLife.getAllMoments("", 5, "local-life", 3, function (data) {
        cfpLoadingBar.start();
        $scope.localLifeMoments = {
          "arr": data.data,
          "scrollBusy": false,
          "stopCallingApi": false,
          "type": "local-life"
        };
        cfpLoadingBar.complete();
        // $scope.localLifeMoments = data.data;
      }, function (data) {
        console.log(data);
      })
    };
    $scope.getMoreMoments = function (moment) {
      // cfpLoadingBar.start();
      if (moment.scrollBusy) {
        return;
      } else {
        if (moment.stopCallingApi) {
          return;
        } else {
          switch (moment.type) {
            case 'all':
            case 'local-life':
              if (moment.arr.length == 0) {
                return;
              } else {
                var lastToken = moment.arr[moment.arr.length - 1].token;
                console.log(lastToken);
                if (lastToken == -1) {
                  moment.stopCallingApi = true;
                  console.log("no data so calling api is closed");
                } else {
                  moment.scrollBusy = true;
                  MyLife.getAllMoments(lastToken, 36, moment.type, 3, function (data) {
                    moment.scrollBusy = false;
                    _.each(data.data, function (n) {
                      if (n.token == -1) {
                        moment.stopCallingApi = true;
                      } else {
                        moment.arr.push(n);
                      }
                    });
                  }, function (data) {
                    moment.scrollBusy = false;
                    moment.stopCallingApi = false;
                    // cfpLoadingBar.complete();
                  });
                }
              }
              break;
            case 'travel-life':
              console.log("inside case 2");
              moment.scrollBusy = true;
              MyLife.getTravelLifeMoments("travel-life", ++moment.pageNo, function (data) {
                moment.scrollBusy = false;
                if (data.data.length == 0) {
                  moment.stopCallingApi = true;
                } else {
                  _.each(data.data, function (n) {
                    moment.arr.push(n);
                  });
                }
                console.log(data);
              }, function (data) {
                console.log(data);
                moment.scrollBusy = false;
                moment.stopCallingApi = false;
                --moment.pageNo;
                // cfpLoadingBar.complete();
              });
              break;
            default:
              console.log("No Match Found");
          }
        }
      }
    };
    $scope.getMorePhotos = function (album) {
      // cfpLoadingBar.start();
      console.log(album);
      if (album.scrollBusy) {
        return;
      } else {
        if (album.stopCallingApi) {
          return
        } else {
          album.pageNo++;
          album.scrollBusy = true;
          switch (album.type) {
            case ('journey' || 'itinerary'):
              console.log("getJournItiMoments called by scrolling");
              MyLife.getJournItiMoments(album._id, album.pageNo, 24, album.type, function (data) {
                album.scrollBusy = false;
                if (data.data.length !== 0) {
                  _.each(data.data, function (n) {
                    album.perMonthMoments.push(n);
                  });
                } else {
                  album.stopCallingApi = true;
                }
              }, function (data) {
                console.log(data);
                album.scrollBusy = false;
                album.stopCallingApi = false;
                --album.pageNo;
                // cfpLoadingBar.complete();
              });
              break;
            case 'all':
            case 'local':
              // cfpLoadingBar.start();
              console.log("getPerMonthMoments called by scrolling");
              MyLife.getPerMonthMoments(album.token, album.pageNo, 24, album.type, function (data) {
                album.scrollBusy = false;
                if (data.data.length !== 0) {
                  _.each(data.data, function (n) {
                    album.perMonthMoments.push(n);
                  });
                } else {
                  album.stopCallingApi = true;
                }
              }, function (data) {
                console.log(data);
                album.scrollBusy = false;
                album.stopCallingApi = false;
                --album.PageNo;
                // cfpLoadingBar.complete();
              });
              break;
          }
        }
      }
    };
    $scope.viewMonth = false;
    $scope.momentView = 1;
    $scope.album = {};
    $scope.changeMomentTypeView = function (num) {
      $scope.viewMonth = false;
      $scope.momentView = num;
    };
    $scope.showMonthView = function () {
      console.log("showMonthView called", $scope.viewMonth);
      if ($scope.viewMonth == false) {
        $scope.viewMonth = true;
      } else {
        $scope.viewMonth = false;
      }
    };

    var viewMonthDataCallback = function (data) {
      // $scope.perMonthMoments = data.data;
      $scope.album.perMonthMoments = data.data;
      $scope.album.scrollBusy = false;
      console.log($scope.album.perMonthMoments);
    };
    $scope.getPerMonthMoments = function (obj, type) {
      // cfpLoadingBar.start();
      console.log("getPerMonthMoments called by ng-click");
      $scope.token = obj.token;
      $scope.count = obj.count;
      $scope.album = {
        "token": obj.token,
        "pageNo": 1,
        "scrollBusy": true,
        "type": type,
        "stopCallingApi": false,
        "perMonthMoments": []
      };
      // $scope.perMonthMoments = [];
      MyLife.getPerMonthMoments($scope.album.token, 1, 24, $scope.album.type, viewMonthDataCallback, function (data) {
        console.log(data);
        // cfpLoadingBar.complete();
      });
      $scope.showMonthView();
    };

    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
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
        controller: 'photoCommentModalCtrl',
        scope: $scope,
        windowClass: "notify-popup"
      });
      modal.closed.then(function () {
        $scope.listOfComments = {};
      });
      LikesAndComments.openPhotoPopup(photoId, $scope);
    };
    //Photo comment popup end

    $scope.getJournItiMoments = function (obj) {
      // cfpLoadingBar.start();
      // $scope.perMonthMoments = [];
      console.log("getJournItiMoments called by ng-click");
      $scope.token = obj.name;
      $scope.count = obj.mediaCount;
      $scope.album = {
        "_id": obj._id,
        "pageNo": 1,
        "scrollBusy": true,
        "stopCallingApi": false,
        "perMonthMoments": []
      };
      $scope.type = obj.type;
      var flag = obj.type && obj.type != ''
      if (flag) {
        $scope.album.type = 'itinerary';
      } else {
        $scope.album.type = 'journey';
      }
      // $scope.albumPageNo = 1;
      MyLife.getJournItiMoments(obj._id, 1, 24, $scope.album.type, viewMonthDataCallback, function (data) {
        console.log(data);
        // cfpLoadingBar.complete();
      });
      $scope.showMonthView();
    };
    //moment Integration ends here

    // reviews json
    $scope.oneAtATime = true;
    var flushReviewsData = function () {
      $scope.postReview = {};
      $scope.showRating = 1;
      $scope.postReview.rating = 1;
      $scope.fillColor2 = "";
      $scope.fillColor3 = "";
      $scope.fillColor4 = "";
      $scope.fillColor5 = "";
    }
    var wholePost = {};
    $scope.getReview = function (post) {
      console.log(post);
      wholePost = post; //this is to set post_id in savePostReview() function
      console.log(wholePost);
      $scope.postReview = {};
      $scope.checkIn = post.checkIn; // this is to diplay checkin location inside uib modal
      $scope.checkIn.type = post.type;
      if (post.review.length !== 0) {
        console.log("Edit Rating");
        $scope.postReview = post.review[0];
        if ($scope.postReview.rating != undefined) {
          $scope.starRating(parseInt($scope.postReview.rating));
        } else {

        }
      } else {
        console.log("Rate Us");
        flushReviewsData();
      }
      modal = $uibModal.open({
        animation: true,
        templateUrl: "views/modal/review-post.html",
        scope: $scope,
        backdropClass: "review-backdrop"
      })
    };

    $scope.starRating = function (val) {
      $scope.postReview.rating = val;
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


    //reviews integration starts here
    $scope.reviewView = 1;
    $scope.changeReviewTypeView = function (num, type) {
      $scope.reviewView = num;
      $scope[type] = false;
    };

    $scope.reviewAll = {
      "arr": [],
      "scrollBusy": false,
      "stopCallingApi": false,
      "type": "all",
      "pageNo": 1
    };
    $scope.reviewTravelLife = {
      "arr": [],
      "scrollBusy": false,
      "stopCallingApi": false,
      "type": "travel-life",
      "pageNo": 1
    };
    $scope.reviewLocalLife = {
      "arr": [],
      "scrollBusy": false,
      "stopCallingApi": false,
      "type": "local-life",
      "pageNo": 1
    };
    var getReviews = function () {
      // cfpLoadingBar.start();
      console.log("getAllReviews called after loading");
      $scope.reviewAll.scrollBusy = true;
      MyLife.getAllReviews("all", 1, function (data) {
        $scope.reviewAll = {
          "arr": data.data,
          "scrollBusy": false,
          "stopCallingApi": false,
          "type": "all",
          "pageNo": 1

        };
        console.log($scope.allMoments);
      }, function (data) {
        console.log(data);
        // cfpLoadingBar.complete();
      });
      MyLife.getAllReviews("travel-life", 1, function (data) {
        console.log(data);
        $scope.reviewTravelLife = {
          "arr": data.data,
          "scrollBusy": false,
          "stopCallingApi": false,
          "type": "travel-life",
          "pageNo": 1
        };
        // $scope.travelLifeMoments = data.data;
        console.log($scope.travelLifeMoments);
      }, function (data) {
        console.log(data);
        // cfpLoadingBar.complete();
      });
      MyLife.getAllReviews("local-life", 1, function (data) {
        console.log(data);
        $scope.reviewLocalLife = {
          "arr": data.data,
          "scrollBusy": false,
          "stopCallingApi": false,
          "type": "local-life",
          "pageNo": 1
        };
        // $scope.localLifeMoments = data.data;
      }, function (data) {
        console.log(data);
        // cfpLoadingBar.complete();
      })
    };

    $scope.getAllReviews = function (review) {
      // cfpLoadingBar.start();
      console.log("getAllReviews called after scrolling");
      console.log(review);
      if (review.scrollBusy) {
        return;
      } else {
        if (review.stopCallingApi) {
          return;
        } else {
          console.log("passed 2 if");
          review.scrollBusy = true;
          MyLife.getAllReviews(review.type, ++review.pageNo, function (data) {
            review.scrollBusy = false;
            if (data.data.length == 0) {
              console.log("reviews is empty");
              review.stopCallingApi = true;
              review.pageNo--;
            } else {
              _.each(data.data, function (n) {
                review.arr.push(n);
              });
            }
          }, function (data) {
            console.log(data);
            review.scrollBusy = false;
            review.stopCallingApi = false;
            --review.pageNo;
            // cfpLoadingBar.complete();
          });
        }
      }
    };

    $scope.getMoreReviews = function (object, flag) {
      // cfpLoadingBar.start();
      console.log("getReviews called from getMoreReviews");
      if (object.country && object._id && object.pageNo) {
        if (object.scrollBusy) {
          return;
        } else {
          if (object.stopCallingApi) {
            return
          } else {
            object.scrollBusy = true;
            switch (flag) {
              case 'travel-life':
                MyLife.getReviewsByCities(object.country, object._id, ++object.pageNo, function (data) {
                  if (data.value) {
                    object.scrollBusy = false;
                    if (data.data.length == 0) {
                      object.stopCallingApi = true;
                    } else {
                      _.each(data.data, function (n) {
                        object.accordReview.push(n);
                      })
                    }
                  } else {}
                }, function (data) {
                  console.log(data);
                  object.scrollBusy = false;
                  object.stopCallingApi = false;
                  --object.pageNo;
                  // cfpLoadingBar.complete();
                });
                break;
              case 'local-life':
                MyLife.getReviewsByCategories(object.city, object._id, object.pageNo, function (data) {
                  if (data.value) {
                    object.scrollBusy = false;
                    if (data.data.length == 0) {
                      object.stopCallingApi = true;
                    } else {
                      _.each(data.data, function (n) {
                        object.accordReview.push(n);
                      })
                    }
                  } else {}
                }, function (data) {
                  console.log(data);
                  object.scrollBusy = false;
                  object.stopCallingApi = false;
                  --object.pageNo;
                  // cfpLoadingBar.complete();
                });
                break;
            }

          }
        }
      } else {
        console.log("insufficient parameters");
      }
    }

    $scope.goToAccordian = function (review, showType) {
      // cfpLoadingBar.start();
      $scope[showType] = true;
      switch (showType) {
        case 'viewTravelCountry':
          $scope.citiesTravelled = {
            "countryName": review.name,
          };
          MyLife.getCities(review._id, function (data) {
            // review.cities = data.data;
            $scope.citiesTravelled.cities = data.data;
            // cfpLoadingBar.complete();
          });
          break;
        case 'viewLocalCountry':
          $scope.categoryList = {
            "cityName": review.name,
          };
          MyLife.getCategories(review._id, function (data) {
            // review.categories = data.data;
            $scope.categoryList.categories = data.data;
            // cfpLoadingBar.complete();
          });
          console.log($scope.categoryList);
          break;
      }


    };

    // $scope.openAccordian = function (object, openAccordian, flag) {
    //   object.pageNo = 1;
    //   object.scrollBusy = false;
    //   object.stopCallingApi = false;
    //   console.log(object, openAccordian, flag);
    //   if (openAccordian) {
    //     switch (flag) {
    //       case 'travel-life':
    //         MyLife.getReviewsByCities(object.country, object._id, object.pageNo, function (data) {
    //           object.accordReview = data.data;
    //         });
    //         break;
    //       case 'local-life':
    //         MyLife.getReviewsByCategories(object.city, object._id, object.pageNo, function (data) {
    //           object.accordReview = data.data;
    //         });
    //         break;
    //     }
    //   } else {
    //   }
    // };
    $scope.openAccordian = function (object, openAccordian, flag) {
      // cfpLoadingBar.start();
      console.log("getReviewsWeb called from openAccordian");
      object.pageNo = 1;
      object.scrollBusy = false;
      object.stopCallingApi = false;
      console.log(object, openAccordian, flag);
      if (openAccordian) {
        switch (flag) {
          case 'travel-life':
            MyLife.getReviewsByCities(object.country, object._id, object.pageNo, function (data) {
              object.accordReview = data.data;
              // cfpLoadingBar.complete();
            });
            break;
          case 'local-life':
            MyLife.getReviewsByCategories(object.city, object._id, object.pageNo, function (data) {
              object.accordReview = data.data;
              // cfpLoadingBar.complete();
            });
            break;
        }
      } else {}
    };
    $scope.savePostReview = function (values) {
      // cfpLoadingBar.start();
      console.log(values, wholePost);
      var obj = {
        "post": wholePost._id,
        "rating": values.rating.toString(),
        "review": values.review
      }
      console.log(obj);
      console.log(wholePost);
      MyLife.savePostReview(obj, function (data) {
        if (data.value) {
          if (wholePost.review.length == 0) {
            wholePost.review[0] = {};
          }
          wholePost.review[0].post = obj.post;
          wholePost.review[0].rating = obj.rating;
          wholePost.review[0].review = obj.review;
          console.log(wholePost);
          modal.close();
        } else {}
        // cfpLoadingBar.complete();
      })
    };

    //reviews integration ends here

    var allMyLife = [
      "views/content/myLife/journey.html",
      "views/content/myLife/moments.html",
      "views/content/myLife/reviews.html",
      "views/content/myLife/holidayplanner.html"
    ];
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
        getMoments();
        $scope.myLife.innerView = allMyLife[1];
        break;
      case "reviews":
        getReviews();
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
          $location.hash(url);
          $anchorScroll();
          break;
        case 1:
          url = "moments";
          $location.hash(url);
          getMoments();
          $anchorScroll();
          break;
        case 2:
          url = "reviews";
          $location.hash(url);
          getReviews();
          $anchorScroll();
          break;
        case 3:
          url = "holidayplanner";
          $location.hash(url);
          $anchorScroll();
          break;
      }
      $state.go("mylife", {
        name: url
      }, {
        notify: false
      });
    }

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
        windowTopClass: "notify-popup"
      })
    };
    var pageNo = 0;
    $scope.scroll = {
      busy: false
    };
    $scope.travelLife = [];
    var getAllJourney = function (journeys) {
      _.each(journeys, function (obj) {
        $scope.travelLife.push(obj);
        setTimeout(function () {
          $scope.scroll.busy = false;
        }, 500);
      });
      console.log($scope.travelLife);
      if ($scope.travelLife.length == 0) {
        $scope.hasJourney = false;
      } else {
        $scope.hasJourney = true;
      }
      // $scope.hasJourney = flag;
    };
    // MyLife.getAllJourney(getAllJourney, pageNo, function (err) {
    //   console.log(err);
    // });
    $scope.getMore = function () {
      if ($scope.scroll.busy) {
        return;
      } else {
        pageNo++;
        $scope.scroll.busy = true;
        MyLife.getAllJourney(getAllJourney, pageNo, function (err) {
          console.log(err);
        });
      }
    }
    $scope.redirectTo = function (id) {
      console.log(id);
      $.jStorage.set('travelId', id);
      $state.go('ongojourney');
    }

    // local life
    // var localPageNo = 1;
    $scope.scroll2 = {};
    $scope.scroll2.busy = false;
    $scope.stopCallingApi = false;
    $scope.localLifeJourney = [];
    $scope.localDate = [];
    $scope.localFilterPost = {};
    $scope.localFilterPost.checkInType = [];
    $scope.localFilterPost.type = "local-life";
    $scope.localFilterPost.pagenumber = 1;
    $scope.localFilterPost.month = 0;
    $scope.localFilterPost.year = 0;
    $scope.localFilterPost.rating = [];
    $scope.localFilterPost.photos = false;
    $scope.localFilterPost.videos = false;
    $scope.localFilterPost.thoughts = false;
    $scope.localStar = {};
    $scope.localStar.fiveStar = false;
    $scope.localStar.fourStar = false;
    $scope.localStar.threeStar = false;
    $scope.localStar.twoStar = false;
    $scope.localStar.oneStar = false;
    $scope.showTravellife = true;
    $scope.showLocalLife = true;
    $scope.localCategory = [{
      name: "Beaches",
      checked: false
    }, {
      name: "Airport",
      checked: false
    }, {
      name: "Hotels & Accommodation",
      checked: false
    }, {
      name: "Restaurants & Bars",
      checked: false
    }, {
      name: "Natures & Parks",
      checked: false
    }, {
      name: "Sights & Landmarks",
      checked: false
    }, {
      name: "Museums & Galleries",
      checked: false
    }, {
      name: "Religious",
      checked: false
    }, {
      name: "Shopping",
      checked: false
    }, {
      name: "Spa & Wellness",
      checked: false
    }, {
      name: "Adventure & Excursions",
      checked: false
    }, {
      name: "Zoos & Aquariums",
      checked: false
    }, {
      name: "Others",
      checked: false
    }];
    $scope.viewLocal = true;
    var viewLocalLife = function (dataLocal) {
      $scope.localLifeJourney = dataLocal.data;
      $scope.localDate = dataLocal.datesArr;
      $scope.scroll2.busy = false;
      if ($scope.localLifeJourney.length == 0) {
        $scope.showLocalLife = true;
      } else {
        $scope.showLocalLife = false;
      }
      $timeout(function () {
        $scope.viewLocal = true;
      }, 100);
    };

    $scope.getlocalLife = function () {
      $scope.showTravellife = false;
      console.log($scope.showTravellife);
      $scope.scroll2.busy = true;
      localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
        console.log(err);
      })
    };
    $scope.viewTravelLife = function () {
      $scope.showTravellife = true;
    };
    // pagination local life
    $scope.getMoreLocalPost = function () {
      if ($scope.scroll2.stopCallingApi === false && $scope.showTravellife === false) {
        $scope.localFilterPost.pagenumber++;
        $scope.scroll2.busy = true;
        localLife.getLocalJourney(function (data) {
          $scope.scroll2.busy = false;
          if (data.data.length === 0) {
            $scope.scroll2.stopCallingApi = true;
          } else {
            _.each(data.data, function (newData) {
              $scope.localLifeJourney.push(newData);
            });
          }
        }, $scope.localFilterPost, function (err) {
          console.log(err);
        });
      }
    }
    // pagination local life end

    // get by Filter
    $scope.getByFilter = function (filterdData, filterType) {
      console.log(filterdData, 'what data is coming');
      switch (filterType) {
        case 'date':
          $scope.localFilterPost.month = parseInt(moment(filterdData.split(",")[0], "MMMM").format('M'));
          $scope.localFilterPost.year = parseInt(filterdData.split(",")[1]);
          localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
            console.log(err);
          });
          $scope.viewLocal = false;
          break;
        case 'checkIn':
          console.log(filterdData, "-----------------------------------------");
          if (filterdData.checked === false) {
            $scope.localFilterPost.checkInType.push(filterdData.name);
            console.log($scope.localFilterPost.checkInType, 'array');
          } else {
            _.remove($scope.localFilterPost.checkInType, function (newArr) {
              return newArr == filterdData.name;
            })
            console.log($scope.localFilterPost.checkInType, 'removed data');
          }
          localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
            console.log(err);
          });
          $scope.viewLocal = false;
          break;
        case 'rating':
          var getRatingIndex = _.findIndex($scope.localFilterPost.rating, function (rating) {
            return rating == filterdData;
          });
          if (getRatingIndex === -1) {
            $scope.localFilterPost.rating.push(filterdData);
            console.log($scope.localFilterPost.rating, 'rating ka array');
          } else {
            _.remove($scope.localFilterPost.rating, function (remove) {
              return remove == filterdData;
            });
            console.log($scope.localFilterPost.rating, 'removed ');
          }
          localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
            console.log(err);
          });
          $scope.viewLocal = false;
          break;
        case 'photos':
          // if ($scope.localFilterPost.photos == false) {
          //   $scope.localFilterPost.photos = true;
          //   localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
          //     console.log(err);
          //   });
          // } else {
          //   $scope.localFilterPost.photos = false;
          //   localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
          //     console.log(err);
          //   });
          // }
          $scope.viewLocal = false;
          localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
            console.log(err);
          });
          break;
        case 'videos':
          // if ($scope.localFilterPost.videos == false) {
          //   $scope.localFilterPost.videos = true;
          //   localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
          //     console.log(err);
          //   });
          // } else {
          //   $scope.localFilterPost.videos = false;
          //   localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
          //     console.log(err);
          //   });
          // }
          localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
            console.log(err);
          });
          $scope.viewLocal = false;
          break;
        case 'thoughts':
          // if ($scope.localFilterPost.thoughts == false) {
          //   $scope.localFilterPost.thoughts = true;
          //   localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
          //     console.log(err);
          //   });
          // } else {
          //   $scope.localFilterPost.thoughts = false;
          //   localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
          //     console.log(err);
          //   });
          // }
          localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
            console.log(err);
          });
          $scope.viewLocal = false;
          break;
      }
    };
    // get by Filter end
    // clear all filter
    $scope.clearLocalFilter = function () {
      console.log($scope.localFilterPost, 'what is local filter post');
      $scope.localFilterPost.checkInType = [];
      $scope.localFilterPost.rating = [];
      $scope.localStar.fiveStar = false;
      $scope.localStar.fourStar = false;
      $scope.localStar.threeStar = false;
      $scope.localStar.twoStar = false;
      $scope.localStar.oneStar = false;
      $scope.localFilterPost.photos = false;
      $scope.localFilterPost.videos = false;
      $scope.localFilterPost.thoughts = false;
      _.each($scope.localCategory, function (value) {
        value.checked = false;
      });
      console.log($scope.localCategory);
      localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
        console.log(err);
      });
      $scope.viewLocal = false;
    }
    // clear all filter end
    // local post like and share
    // $scope.getLocalComments = function(localPost) {
    //   console.log(localPost,'bc ');
    //   $scope.post = ongo;
    //   $scope.previousId;
    //   var callback = function(data) {
    //     $scope.uniqueArr = [];
    //     $scope.listOfComments = data.data;
    //     $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
    //   }
    //   if ($scope.previousId != $scope.post._id) {
    //     $scope.listOfComments = [];
    //     $scope.viewCardComment = true;
    //     $scope.journey.journeyHighLight = ongo._id;
    //     $scope.getCard = "view-whole-card";
    //     LikesAndComments.getComments("post", $scope.post._id, callback);
    //   } else {
    //     if ($scope.viewCardComment) {
    //       $scope.viewCardComment = false;
    //       $scope.journey.journeyHighLight = "";
    //       $scope.getCard = "";
    //       $scope.comment.text = "";
    //     } else {
    //       $scope.listOfComments = [];
    //       $scope.viewCardComment = true;
    //       $scope.journey.journeyHighLight = ongo._id;
    //       $scope.getCard = "view-whole-card";
    //       LikesAndComments.getComments("post", $scope.post._id, callback);
    //     }
    //   }
    //   $scope.previousId = $scope.post._id;
    // };
    //
    // $scope.getLocalLikes = function(localLike) {
    //   console.log(localLike,'localLike');
    //   var callback = function(data) {
    //     $scope.listOfLikes = data.data;
    //     console.log($scope.listOfLikes);
    //   };
    //   console.log($scope.post);
    //   if ($scope.previousLikeId != ongo._id) {
    //     $scope.listOfLikes = [];
    //     $scope.viewCardLike = true;
    //     $scope.journey.journeyHighLight = ongo._id;
    //     $scope.showLikeShow = "show-like-side-sec";
    //     LikesAndComments.getLikes("post", ongo._id, callback);
    //   } else {
    //     if ($scope.viewCardLike) {
    //       $scope.viewCardLike = false;
    //       $scope.journey.journeyHighLight = "";
    //       $scope.getCard = "";
    //     } else {
    //       $scope.listOfComments = [];
    //       $scope.viewCardLike = true;
    //       $scope.journey.journeyHighLight = ongo._id;
    //       $scope.showLikeShow = "show-like-side-sec";
    //       LikesAndComments.getLikes("post", ongo._id, callback);
    //     }
    //   }
    //   $scope.previousLikeId = ongo._id;
    // };

    // local post like and share end
    $scope.comment = {};
    $scope.openCommentSection = function (ongo) {
      $scope.listOfLikes = false;
      console.log(ongo, 'ongo');
      $scope.post = ongo; //for using it in comment section
      $scope.previousId;
      var callback = function (data) {
        $scope.uniqueArr = [];
        $scope.listOfComments = data.data;
        $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
      }
      if ($scope.previousId != $scope.post._id) {
        // $scope.focus('enterComment');
        $scope.listOfComments = [];
        $scope.viewCardComment = true;
        $scope.getCard = "view-whole-card";
        LikesAndComments.getComments("post", $scope.post._id, callback);
      } else {
        if ($scope.viewCardComment) {
          $scope.viewCardComment = false;
          // $scope.journey.journeyHighLight = "";
          $scope.getCard = "";
          $scope.comment.text = "";
        } else {
          $scope.listOfComments = [];
          $scope.viewCardComment = true;
          // $scope.focus('enterComment');
          $scope.getCard = "view-whole-card";
          LikesAndComments.getComments("post", $scope.post._id, callback);
        }
      }
      $scope.previousId = $scope.post._id;
    };

    $scope.postPostsComment = function (uniqueId, comment, postId) {
      console.log(uniqueId, comment, postId);
      console.log("controller se comment hua");
      var type = "post";
      var additionalId = null;
      var hashTag = [];
      var callback = function (data) {
        $scope.listOfComments = data.data;
        document.getElementById('enterComment').value = "";
      };
      LikesAndComments.postComment(type, uniqueId, postId, comment, hashTag, additionalId, callback);
    };

    $scope.openLikeSection = function (ongo) {
      $scope.listOfComments = false;
      console.log(ongo);
      $scope.viewCardComment = false;
      var callback = function (data) {
        $scope.listOfLikes = data.data;
        console.log($scope.listOfLikes);
      };
      console.log($scope.post);
      if ($scope.previousLikeId != ongo._id) {
        // $scope.focus('enterComment');
        $scope.listOfLikes = [];
        $scope.viewCardLike = true;
        // $scope.journey.journeyHighLight = ongo._id;
        $scope.showLikeShow = "show-like-side-sec";
        LikesAndComments.getLikes("post", ongo._id, callback);
      } else {
        if ($scope.viewCardLike) {
          $scope.viewCardLike = false;
          // $scope.journey.journeyHighLight = "";
          $scope.getCard = "";
          $scope.showLikeShow = "";
        } else {
          $scope.listOfComments = [];
          $scope.viewCardLike = true;
          // $scope.focus('enterComment');
          // $scope.journey.journeyHighLight = ongo._id;
          $scope.showLikeShow = "show-like-side-sec";
          LikesAndComments.getLikes("post", ongo._id, callback);
        }
      }
      $scope.previousLikeId = ongo._id;
    };

    $scope.likePost = function (uniqueId, _id) {
      console.log($scope.post.likeDone + "this call is from ongojourney.html");
      $scope.post.likeDone = !$scope.post.likeDone;
      if ($scope.post.likeDone) {
        if ($scope.post.likeCount == undefined) {
          $scope.post.likeCount = 1;
        } else {
          $scope.post.likeCount = $scope.post.likeCount + 1;
        }
        LikesAndComments.likeUnlike("post", "like", uniqueId, _id, null)
      } else {
        $scope.post.likeCount = $scope.post.likeCount - 1;
        LikesAndComments.likeUnlike("post", "unlike", uniqueId, _id, null)
      }
    };

    $scope.followFollowing = function (user) {
      console.log(user.following, user._id, user.name);
      if (user.following) {
        LikesAndComments.unFollowUser(user._id, function (data) {
          console.log(data);
          if (data.value) {
            user.following = false;
          } else {
            console.log(data.data);
          }
        })
      } else {
        LikesAndComments.followUser(user._id, user.name, function (data) {
          console.log(data);
          if (data.value) {
            user.following = true;
          } else {
            console.log(data.data);
          }
        });
      }
    }
    // local life end
  })

  .controller('JourneyCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("journey");
    $scope.menutitle = NavigationService.makeactive("Journey");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.$watch('masonryContainer', function () {
      $timeout(function () {
        console.log("reload");
        $rootScope.$broadcast('masonry.reload');
      }, 200);
    });


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
      $uibModal.open({
        animation: true,
        templateUrl: "views/modal/local-imgview.html",
        scope: $scope,
        windowTopClass: "notify-popup"
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
  .controller('SettingCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, DataUriToBlob) {
    //Used to name the .html file
    $scope.profile = $.jStorage.get("profile");
    $scope.userData = _.clone($scope.profile);

    // console.log("Testing Consoles");
    $scope.template = TemplateService.changecontent("setting");
    $scope.menutitle = NavigationService.makeactive("Setting");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.format = 'dd-MM-yyyy';
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
        document.getElementById('fileInput').onchange = function (evt) {
          var file = evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt1) {
            $scope.$apply(function ($scope) {
              $scope.showImage = true;
              $scope.myImage = evt1.target.result;
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
    $scope.travelConfig = {};
    var atleastOne = "";
    var length = "";
    $scope.holidayType = function (val) {
      atleastOne = _.filter($scope.travelConfig.chooseHoliday, ['class', "active-holiday"]);
      length = atleastOne.length;
      console.log(length);
      if (length == 1) {
        $scope.travelConfig.chooseHoliday[val].class = "active-holiday"
      } else {
        if ($scope.travelConfig.chooseHoliday[val].class == "active-holiday") {
          $scope.travelConfig.chooseHoliday[val].class = "";
        } else {
          $scope.travelConfig.chooseHoliday[val].class = "active-holiday";
        }
      }

    };
    $scope.usuallyType = function (val) {
      _.each($scope.travelConfig.usuallyGo, function (abc) {
        abc.class = "";
      });
      $scope.travelConfig.usuallyGo[val].class = "active-holiday";
    };

    $scope.travelType = function (val) {
      atleastOne = _.filter($scope.travelConfig.preferTravel, ['class', "active-holiday"]);
      length = atleastOne.length;
      console.log(length);
      if (length == 1) {
        $scope.travelConfig.preferTravel[val].class = "active-holiday"
      } else {
        if ($scope.travelConfig.preferTravel[val].class == "active-holiday") {
          $scope.travelConfig.preferTravel[val].class = "";
        } else {
          $scope.travelConfig.preferTravel[val].class = "active-holiday";
        }
      }
    };

    $scope.idealType = function (val) {
      atleastOne = _.filter($scope.travelConfig.idealSelect, ['class', "active-holiday"]);
      length = atleastOne.length;
      console.log(length);
      if (length == 1) {
        $scope.travelConfig.idealSelect[val].class = "active-holiday"
      } else {
        if ($scope.travelConfig.idealSelect[val].class == "active-holiday") {
          $scope.travelConfig.idealSelect[val].class = "";
        } else {
          $scope.travelConfig.idealSelect[val].class = "active-holiday";
        }
      }
    };

    $scope.travelConfig.chooseHoliday = [{
      img: "img/beach.png",
      caption: "Island & Beach",
      storeCaption: "Islands & Beaches",
    }, {
      img: "img/city.png",
      caption: "City",
      storeCaption: "Cities"
    }, {
      img: "img/safari.png",
      caption: "Safari",
      storeCaption: "Safaris"
    }, {
      img: "img/mountain.png",
      caption: "Mountains",
      storeCaption: "Mountains"
    }, {
      img: "img/cruise.png",
      caption: "Cruise",
      storeCaption: "Cruises"
    }, {
      img: "img/countryside.png",
      caption: "Countryside",
      storeCaption: "Countryside"
    }];

    $scope.travelConfig.usuallyGo = [{
      img: "img/map.png",
      caption1: "By the map",
      storeCaption: "By the map"
    }, {
      img: "img/road.png",
      caption1: "Where the",
      caption2: "road takes you",
      storeCaption: "Where the road takes you"
    }, {
      img: "img/both.png",
      caption1: "A little bit",
      caption2: "of both",
      storeCaption: "A little bit of both"
    }, ];

    $scope.travelConfig.preferTravel = [{
      img: "img/family.png",
      caption: "Family",
      storeCaption: "Family"
    }, {
      img: "img/friends.png",
      caption: "Friends",
      storeCaption: "Friends"
    }, {
      img: "img/spouse.png",
      caption: "Partner/Spouse",
      storeCaption: "Partner/Spouse"
    }, {
      img: "img/solo.png",
      caption: "Solo",
      storeCaption: "Solo"
    }, {
      img: "img/business.png",
      caption: "Business",
      storeCaption: "Business"
    }, {
      img: "img/blogger.png",
      caption: "Blogger",
      storeCaption: "Blogger"
    }, {
      img: "img/grouptour.png",
      caption: "Group Tour",
      storeCaption: "Group Tour"
    }, {
      img: "img/photographer.png",
      caption: "Photographer",
      storeCaption: "Photographer"
    }, ];

    $scope.travelConfig.idealSelect = [{
      img: "img/luxury.png",
      caption1: "luxury",
      storeCaption: "Luxury"
    }, {
      img: "img/backpacking.png",
      caption1: "Backpacking",
      storeCaption: "Backpacking"
    }, {
      img: "img/greentravelling.png",
      caption1: "Green",
      caption2: "travelling",
      storeCaption: "Green Travelling"
    }, {
      img: "img/pocketfriendly.png",
      caption1: "Pocket",
      caption2: "friendly",
      storeCaption: "Pocket Friendly"
    }, {
      img: "img/romance.png",
      caption1: "Romance",
      storeCaption: "Romance"
    }, {
      img: "img/sportandadventure.png",
      caption1: "Sports &",
      caption2: "Adventure",
      storeCaption: "Sports & Adventure"
    }, {
      img: "img/historyandculture.png",
      caption1: "History &",
      caption2: "Culture",
      storeCaption: "History & Culture"
    }, {
      img: "img/spirituality.png",
      caption1: "Spirituality &",
      caption2: "Wellness",
      storeCaption: "Spirituality & Wellness"
    }, {
      img: "img/shopping.png",
      caption1: "Shopping",
      storeCaption: "Shopping"
    }, {
      img: "img/foodandwine.png",
      caption1: "Food & Wine",
      storeCaption: "Food & Wine"
    }, {
      img: "img/festival.png",
      caption1: "Festivals",
      storeCaption: "Festivals"
    }];


    var selectedCity = $scope.userData.homeCity;
    $scope.userData.homeCity = {
      "description": selectedCity
    };

    // page 1 integration starts
    //gets all the cities starts
    var getAllCities = function (data, status) {
      if (data.value) {
        $scope.cities = data.data.predictions;
      } else {
        console.log("Eroor Fetching Data");
      }
    };
    $scope.searchByKey = function (searchCity) {
      // cfpLoadingBar.start();
      NavigationService.getAllCities({
        "search": searchCity
      }, getAllCities, function (err) {
        console.log(err);
      });
      // cfpLoadingBar.complete();
    };
    //End-Of get all the cities ends
    //get all countries
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
    //get all countries ends
    // are u travel blogger section starts
    $scope.setPhotographer = function () {
      if ($scope.userData.isPhotographer) {
        $scope.userData.isPhotographer = false;
      } else {
        $scope.userData.isPhotographer = true;
      }
    };

    $scope.setBlogger = function () {
      if ($scope.userData.isBlogger) {
        $scope.userData.isBlogger = false;
      } else {
        $scope.userData.isBlogger = true;
      }
    };

    $scope.setNone = function () {
      $scope.userData.isBlogger = false;
      $scope.userData.isPhotographer = false;
    };
    // are u travel blogger section ends
    // page 1 integration ends

    // page 2 integration starts
    // console.log($scope.userData.travelConfig);
    // _.each($scope.userData.travelConfig.kindOfHoliday, function (n1) {
    //   var index = _.findIndex($scope.chooseHoliday, function (n2) {
    //     return n1 == n2.storeCaption;
    //   });
    //   $scope.chooseHoliday[index].class = "active-holiday"
    // });

    _.each(new Array(4), function (value, key) {
      switch (key) {
        case 0:
          _.each($scope.userData.travelConfig.kindOfHoliday, function (n1) {
            var index = _.findIndex($scope.travelConfig.chooseHoliday, function (n2) {
              return n1 == n2.storeCaption;
            });
            $scope.travelConfig.chooseHoliday[index].class = "active-holiday"
          });
          break;
        case 1:
          _.each($scope.userData.travelConfig.usuallyGo, function (n1) {
            var index = _.findIndex($scope.travelConfig.usuallyGo, function (n2) {
              return n1 == n2.storeCaption;
            });
            $scope.travelConfig.usuallyGo[index].class = "active-holiday"
          });
          break;
        case 2:
          _.each($scope.userData.travelConfig.preferToTravel, function (n1) {
            var index = _.findIndex($scope.travelConfig.preferTravel, function (n2) {
              return n1 == n2.storeCaption;
            });
            $scope.travelConfig.preferTravel[index].class = "active-holiday"
          });
          break;
        case 3:
          _.each($scope.userData.travelConfig.holidayType, function (n1) {
            var index = _.findIndex($scope.travelConfig.idealSelect, function (n2) {
              return n1 == n2.storeCaption;
              // console.log(n1, n2.storeCaption);
            });
            // console.log(index);
            $scope.travelConfig.idealSelect[index].class = "active-holiday"
          });
          break;
      }

    })

    // page 2 integration ends

    $scope.editUserData = function (userData, status, valid) {
      // cfpLoadingBar.start();
      console.log(valid);
      if (valid) {
        NavigationService.editUserData(userData, status, function (data) {
          if (data.value) {
            NavigationService.getProfile($.jStorage.get("profile").urlSlug, function (data, status) {
              if (data.data._id) {
                $.jStorage.set("isLoggedIn", true);
                $.jStorage.set("profile", data.data);
                // console.log($.jStorage.get('profile'));
                console.log("Profile successfully set on jStorage");
              } else {
                $.jStorage.flush();
              }
            }, function (err) {
              console.log("Error:", err);
            });
          } else {

          }
          // cfpLoadingBar.complete();
        });
      } else {
        alert("fields invalid");
      }
    };

    $scope.uploadProfilePicture = function (imageBase64) {
      // cfpLoadingBar.start();
      var file = imageTestingCallback(imageBase64, 'image/png');
      console.log(file);
      NavigationService.uploadFile(file, function (response) {
        if (response.value) {
          $scope.userData.profilePicture = response.data[0];
          NavigationService.saveUserData({
            'profilePicture': $scope.userData.profilePicture
          }, function (data) {
            $scope.showImage = false;
            NavigationService.getProfile($.jStorage.get("profile").urlSlug, globalGetProfile, function () {
              console.log("error");
            });
          });
        } else {

        }
      });
    }
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


  })
  .controller('ActivityCtrl', function ($scope, TemplateService, NavigationService, Activity, $timeout) {
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
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. #hagtags,#hagtags1,#hagtags2,",
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
        class: "travel-taught",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        hashtag: [{
          tag: "#hagtags"
        }, {
          tag: "#hagtags1"
        }, {
          tag: "#hagtags2",
        }, ],
        editor: false,
        userPic: true,
        follow: true,
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
        following: true,
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
        follow: true,
        following: false,
        postIcon: true,
        video: true,
        photo: false,
        photoSlider: false,
        travelledJourney: false,
        onJourney: false,
        getpopularPost: false,
        visitPost: false,
        activitySec: true
      }, {
        class: "user-detail-itinerary",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new Itinerary",
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
        countryVisit: [{
          imgFlag: "img/india-visit.png"
        }, {
          imgFlag: "img/england-visit.png"
        }, {
          imgFlag: "img/canada-visit.png",
        }, ],
        pointReview: "4.5",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
        postIcon: false,
        video: false,
        photo: false,
        photoSlider: false,
        travelledJourney: false,
        onJourney: true,
        getpopularPost: false,
        visitPost: false,
        activitySec: true
      }, , {
        class: "user-quick-itinerary",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new Itinerary",
        photoCount: "28",
        videoCount: "5",
        dateitinerary: "Jan 2016",
        locationVisited: "9",
        itineraryType1: "img/sunset.png",
        itineraryType2: "img/bag-journey.png",
        itineraryType3: "img/luxury-journey.png",
        travelledDay: "75",
        onwayTag: "love in paris",
        imgOnway: "img/paris.jpg",
        spendingDay: "75",
        likes: "15660",
        reviews: "354",
        countryVisit: [{
          imgFlag: "img/india-visit.png"
        }, {
          imgFlag: "img/england-visit.png"
        }, {
          imgFlag: "img/canada-visit.png",
        }, ],
        pointReview: "4.5",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
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
        class: "editor-blog",
        profilePic: "img/profile-main.png",
        userName: "Editor - blog",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new blog",
        imgTravelled: "img/london.jpg",
        Travelledtag: "London Eye",
        photoCount: "28",
        videoCount: "5",
        locationVisited: "9",
        itineraryType1: "",
        itineraryType2: "",
        itineraryType3: "",
        travelledDay: "75",
        onwayTag: "love in paris",
        imgOnway: "img/paris.jpg",
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
        class: "editor",
        profilePic: "img/profile-main.png",
        userName: "Editor - Itinerary",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new Itinerary",
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
        countryVisit: [{
          imgFlag: "img/india-visit.png"
        }, {
          imgFlag: "img/england-visit.png"
        }, {
          imgFlag: "img/canada-visit.png",
        }, ],
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
      },
      // {
      //   class: "local-life",
      //   profilePic: "img/profile-main.png",
      //   userName: "John Doe",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
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
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ],
      //   editor: false,
      //   userPic: true,
      //   follow: false,
      //   following: true,
      //   postIcon: true,
      //   video: false,
      //   photo: false,
      //   photoSlider: false,
      //   travelledJourney: true,
      //   onJourney: false,
      //   visitPost: false,
      //   getpopularPost: false,
      //   activitySec: true
      // },
      {
        class: "local-life",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
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
        class: "local-life-taught",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
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
        class: "local-life",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        editor: false,
        userPic: true,
        follow: true,
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
        class: "local-life",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
        postIcon: true,
        video: true,
        photo: false,
        photoSlider: false,
        travelledJourney: false,
        onJourney: false,
        getpopularPost: false,
        visitPost: false,
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
      },
    ];





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

  .controller('ActivityTestCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, Activity, LikesAndComments, $timeout, $http, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("activitytest");
    $scope.menutitle = NavigationService.makeactive("Activity");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.userData = $.jStorage.get("profile");
    var scroll = {
      'pageNo': 1,
      'scrollBusy': false,
      'stopCallingApi': false
    }
    var firstListCallback =

      scroll.scrollBusy = true;
    Activity.getAllActivities(1, function (data) {
      scroll.scrollBusy = false;
      if (data.length == 0) {
        scroll.stopCallingApi = true;
      } else {
        $scope.activities = data;
        scroll.pageNo = 1;
      }
    }, function (data) {
      console.log(data);
      getMoreActivities();
    });

    $scope.getMoreActivities = function () {
      // cfpLoadingBar.start();
      console.log("scroll event");
      if (scroll.scrollBusy) {
        return;
      } else {
        if (scroll.stopCallingApi) {
          return;
        } else {
          scroll.scrollBusy = true;
          Activity.getAllActivities(++scroll.pageNo, function (data) {
            scroll.scrollBusy = false;
            if (data.length == 0) {
              scroll.stopCallingApi = true;
            } else {
              _.each(data, function (n) {
                $scope.activities.push(n);
              });
            }
          }, function (data, status) {
            console.log(data, status);
            scroll.scrollBusy = false;
            scroll.stopCallingApi = false;
            --scroll.pageNo;
            // cfpLoadingBar.complete();
          })
        }
      }
    };

    //Photo comment popup
    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
      $scope.userProfilePic = $.jStorage.get("profile").profilePicture;
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
        controller: 'photoCommentModalCtrl',
        scope: $scope,
        windowClass: "notify-popup"
      });
      modal.closed.then(function () {
        $scope.listOfComments = {};
      });
      LikesAndComments.openPhotoPopup(photoId, $scope);
    };
    //Photo comment popup end

    $scope.changeImage = function (index, activity) {
      console.log(index, activity);
      activity.index = index;
    };

    $scope.likeUnlikeActivity = function (activity) {
      console.log(activity.likeUnlikeFlag, activity.uniqueId, activity._id);
      console.log(activity.likeDone + "this call is from activitytest.html");
      activity.likeDone = !activity.likeDone;
      if (activity.likeDone) {
        if (activity.likeCount == undefined) {
          activity.likeCount = 1;
        } else {
          activity.likeCount = activity.likeCount + 1;
        }
        LikesAndComments.likeUnlike(activity.type, "like", activity.uniqueId, activity._id, null)
      } else {
        activity.likeCount = activity.likeCount - 1;
        LikesAndComments.likeUnlike(activity.type, "unlike", activity.uniqueId, activity._id, null)
      }
    };

    $scope.getLikes = function (activity) {
      console.log(activity);
      $scope.listLikesDropDown(activity.listLike);
      var formData = {
        "_id": activity._id
      }
      var callback = function (data) {
        $scope.listOfLikes = data.data;
        console.log($scope.listOfLikes);
      };
      LikesAndComments.getLikes(activity.likeUnlikeFlag, activity._id, callback);
    };

    $scope.listLikesDropDown = function (model) {
      $timeout(function () {
        model.backgroundClick = true;
        backgroundClick.object = model;
      }, 200);
      backgroundClick.scope = $scope;
    };

    $scope.getCommentsData = function (activity) {
      console.log(activity);
      $scope.previousId;
      $scope.post = activity;
      var callback = function (data) {
        $scope.uniqueArr = [];
        $scope.listOfComments = data.data;
        $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
      }
      if ($scope.previousId != activity._id) {
        // $scope.focus('enterComment');
        $scope.listOfComments = [];
        $scope.viewCardComment = true;
        // $scope.journey.journeyHighLight = activity._id;
        $scope.getCard = "view-whole-card";
        LikesAndComments.getComments(activity.likeUnlikeFlag, activity._id, callback);
      } else {
        if ($scope.viewCardComment) {
          $scope.viewCardComment = false;
          // $scope.journey.journeyHighLight = "";
          $scope.getCard = "";
          $scope.comment.text = "";
        } else {
          $scope.listOfComments = [];
          $scope.viewCardComment = true;
          // $scope.focus('enterComment');
          // $scope.journey.journeyHighLight = activity._id;
          $scope.getCard = "view-whole-card";
          LikesAndComments.getComments(activity.likeUnlikeFlag, activity._id, callback);
        }
      }
      $scope.previousId = activity._id;
    };

    $scope.getLikesData = function (activity) {
      var callback = function (data) {
        $scope.listOfLikes = data.data;
        console.log($scope.listOfLikes);
      };
      console.log($scope.post);
      if ($scope.previousLikeId != activity._id) {
        // $scope.focus('enterComment');
        $scope.listOfLikes = [];
        $scope.viewCardLike = true;
        // $scope.journey.journeyHighLight = activity._id;
        $scope.showLikeShow = "show-like-side-sec";
        LikesAndComments.getLikes("post", activity._id, callback);
      } else {
        if ($scope.viewCardLike) {
          $scope.viewCardLike = false;
          // $scope.journey.journeyHighLight = "";
          $scope.getCard = "";
        } else {
          $scope.listOfComments = [];
          $scope.viewCardLike = true;
          // $scope.focus('enterComment');
          // $scope.journey.journeyHighLight = activity._id;
          $scope.showLikeShow = "show-like-side-sec";
          LikesAndComments.getLikes("post", activity._id, callback);
        }
      }
      $scope.previousLikeId = activity._id;
    };

    $scope.followFollowing = function (user) {
      console.log($scope.activities);
      console.log("object", user);
      console.log(user.following, user._id, user.name);
      if (user.following) {
        LikesAndComments.unFollowUser(user._id, function (data) {
          console.log(data, "unfollow now");
          if (data.value) {
            user.following = false;
            _.each($scope.activities, function (n) {
              if (n.owner._id == user._id) {
                n.owner.following = false;
              }
              console.log(n);
            });
          } else {
            console.log(data.data);
          }
          // _.each($scope.activities, function (n) {
          //   console.log(n);
          // });
        })
      } else {
        LikesAndComments.followUser(user._id, user.name, function (data) {
          console.log(data, "follow now");
          if (data.value) {
            user.following = true;
            _.each($scope.activities, function (n) {
              console.log(n);
              if (n.owner._id == user._id) {
                n.owner.following = true;
              }
            });
          } else {
            console.log(data.data);

          }
        });
      }
    }

    $scope.editOption = function (model) {
      $timeout(function () {
        model.backgroundClick = true;
        backgroundClick.object = model;
      }, 200);
      backgroundClick.scope = $scope;
    };

    $scope.postPostsComment = function (activity, comment) {
      // console.log(uniqueId, comment, postId);
      console.log(activity, comment);
      console.log("controller se comment hua");
      var type = activity.likeUnlikeFlag;
      var additionalId = null;
      var hashTag = [];
      var callback = function (data) {
        $scope.listOfComments = data.data;
        document.getElementById('enterComment').value = "";
      }
      LikesAndComments.postComment(type, activity.uniqueId, activity._id, comment, hashTag, additionalId, callback);
    };

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
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. #hagtags,#hagtags1,#hagtags2,",
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
        class: "travel-taught",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        hashtag: [{
          tag: "#hagtags"
        }, {
          tag: "#hagtags1"
        }, {
          tag: "#hagtags2",
        }, ],
        editor: false,
        userPic: true,
        follow: true,
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
        following: true,
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
        follow: true,
        following: false,
        postIcon: true,
        video: true,
        photo: false,
        photoSlider: false,
        travelledJourney: false,
        onJourney: false,
        getpopularPost: false,
        visitPost: false,
        activitySec: true
      }, {
        class: "user-detail-itinerary",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new Itinerary",
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
        countryVisit: [{
          imgFlag: "img/india-visit.png"
        }, {
          imgFlag: "img/england-visit.png"
        }, {
          imgFlag: "img/canada-visit.png",
        }, ],
        pointReview: "4.5",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
        postIcon: false,
        video: false,
        photo: false,
        photoSlider: false,
        travelledJourney: false,
        onJourney: true,
        getpopularPost: false,
        visitPost: false,
        activitySec: true
      }, , {
        class: "user-quick-itinerary",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new Itinerary",
        photoCount: "28",
        videoCount: "5",
        dateitinerary: "Jan 2016",
        locationVisited: "9",
        itineraryType1: "img/sunset.png",
        itineraryType2: "img/bag-journey.png",
        itineraryType3: "img/luxury-journey.png",
        travelledDay: "75",
        onwayTag: "love in paris",
        imgOnway: "img/paris.jpg",
        spendingDay: "75",
        likes: "15660",
        reviews: "354",
        countryVisit: [{
          imgFlag: "img/india-visit.png"
        }, {
          imgFlag: "img/england-visit.png"
        }, {
          imgFlag: "img/canada-visit.png",
        }, ],
        pointReview: "4.5",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
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
        class: "editor-blog",
        profilePic: "img/profile-main.png",
        userName: "Editor - blog",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new blog",
        imgTravelled: "img/london.jpg",
        Travelledtag: "London Eye",
        photoCount: "28",
        videoCount: "5",
        locationVisited: "9",
        itineraryType1: "",
        itineraryType2: "",
        itineraryType3: "",
        travelledDay: "75",
        onwayTag: "love in paris",
        imgOnway: "img/paris.jpg",
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
        class: "editor",
        profilePic: "img/profile-main.png",
        userName: "Editor - Itinerary",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Has uploaded a new Itinerary",
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
        countryVisit: [{
          imgFlag: "img/india-visit.png"
        }, {
          imgFlag: "img/england-visit.png"
        }, {
          imgFlag: "img/canada-visit.png",
        }, ],
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
      },
      // {
      //   class: "local-life",
      //   profilePic: "img/profile-main.png",
      //   userName: "John Doe",
      //   timestampDate: "14 Jan, 2014",
      //   timestampHour: "01:20 pm",
      //   status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
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
      //   countryVisit: [{
      //     imgFlag: "img/india-visit.png"
      //   }, {
      //     imgFlag: "img/england-visit.png"
      //   }, {
      //     imgFlag: "img/canada-visit.png",
      //   }, ],
      //   editor: false,
      //   userPic: true,
      //   follow: false,
      //   following: true,
      //   postIcon: true,
      //   video: false,
      //   photo: false,
      //   photoSlider: false,
      //   travelledJourney: true,
      //   onJourney: false,
      //   visitPost: false,
      //   getpopularPost: false,
      //   activitySec: true
      // },
      {
        class: "local-life",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
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
        class: "local-life-taught",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
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
        class: "local-life",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        editor: false,
        userPic: true,
        follow: true,
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
        class: "local-life",
        profilePic: "img/profile-main.png",
        userName: "John Doe",
        timestampDate: "14 Jan, 2014",
        timestampHour: "01:20 pm",
        status: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        editor: false,
        userPic: true,
        follow: false,
        following: true,
        postIcon: true,
        video: true,
        photo: false,
        photoSlider: false,
        travelledJourney: false,
        onJourney: false,
        getpopularPost: false,
        visitPost: false,
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
      },
    ];

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

  .controller('ProfileListCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, MyLife, $uibModal, $state) {
    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.activeMenu = $stateParams.active;
    $scope.template = TemplateService.changecontent("profile-list");
    $scope.menutitle = NavigationService.makeactive("ProfileList");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.allowAccess = $.jStorage.get("allowAccess");
    if ($.jStorage.get("activeUrlSlug") != "" && $.jStorage.get("activeUrlSlug") != null) {
      $scope.activeUrlSlug = $.jStorage.get("activeUrlSlug");
    } else {
      $scope.activeUrlSlug = $.jStorage.get("profile").urlSlug;
    }
    console.log($scope.activeUrlSlug);

    // click background close
    $scope.getDropdown = function (model) {
      $timeout(function () {
        model.backgroundClick = true;
        backgroundClick.object = model;
      }, 200);
      backgroundClick.scope = $scope;
    };
    // click background close end

    var getAllCountries = function (countries) {
      $scope.nationality = countries;
      // $scope.getMap();
    };

    MyLife.getAllCountries(getAllCountries, function (err) {
      console.log(err);
    });

    $scope.updateBucketList = function (country) {
      MyLife.updateBucketList(country, function (data, status) {
        MyLife.getOneBucketList(callbackBucketList);
        reloadCount();

      }, function () {});
      // $scope.getMap();
    };
    $scope.obj = {};
    // update country Visited
    $scope.updateCountryVisited = function (id) {
      $scope.obj.countryId = id;
      console.log(id);
      modal = $uibModal.open({
        animation: true,
        windowClass: "delete-visited-country",
        templateUrl: "views/modal/country-visited.html",
        scope: $scope
      });
      modal.closed.then(function () {
        visitedArr = [];
      });
      //for getting all the visited years  of that respective country starts
      var callback = function (data) {
        var a = _.filter(data, ["countryId._id", id]);
        var visitedArr = [];
        _.each(a[0].visited, function (n, index) {
          visitedArr[n.year] = {
            "times": n.times,
            "year": n.year
          };
        });
        console.log(visitedArr);
        $scope.visited = visitedArr;
        arr = visitedArr;
      };
      MyLife.getCountryVisitedListWeb(callback);
      //for getting all the visited years  of that respective country ends
    }
    // update country Visited end

    //remove counytry visitede starts
    $scope.removeCountryVisit = function (data) {
      $scope.removeCountry = data;
      modal = $uibModal.open({
        scope: $scope,
        animation: true,
        templateUrl: "views/modal/delete-visited-country.html"
        // templateUrl: "views/modal/country-visited.html"
      });
    };
    //remove counytry visitede ends

    $scope.addCountryVisited = function (country) {
      $scope.obj.countryId = country._id;
      if (country.countryVisited === true) {
        arr = [{}];
        modal = $uibModal.open({
          scope: $scope,
          animation: true,
          templateUrl: "views/modal/delete-visited-country.html"
          // templateUrl: "views/modal/country-visited.html"
        });
      } else {
        $scope.visited = [];
        arr = [];
        modal = $uibModal.open({
          scope: $scope,
          animation: true,
          templateUrl: "views/modal/country-visited.html"
        });
      }


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

    //remove country visited and all its count starts
    $scope.removeCountryVisited = function (remove) {
      var obj = {
        "countryId": remove.countryId._id,
        "year": remove.year
      }
      MyLife.removeCountryList(obj, function (data, status) {
        reloadCount();
        console.log(data);
        MyLife.getCountryVisitedListExpanded(callbackGetCountriesVisited);
        modal.close();
      }, function () {});
      arr = [];
    };
    //remove country visited and all its count ends

    $scope.checkIfSelected = function (list) {
      console.log(list);
      if (list.year) {
        list.times = 1;
        $scope.disableAll = false;
      } else {
        list.times = 0;
        $scope.disableAll = true;
      }
    };

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
      console.log($scope.obj);
      if (!(_.isEmpty($scope.obj.visited))) {
        MyLife.updateCountriesVisited($scope.obj, function (data, status) {
          reloadCount();
          MyLife.getCountryVisitedListExpanded(callbackGetCountriesVisited);
        }, function () {});
      }

    };

    $scope.clearAllSelected = function (visited) {
      console.log(visited);
      $scope.visited = [];
    };

    $scope.searchList = [];
    $scope.searchFriend = {
      'name': ''
    };
    $scope.searchCard = {
      'name': ''
    };
    $scope.searchUser = {
      'open': ''
    };
    $scope.changeStatus = function (status, results) {
      $scope.activeMenu = status;
      $scope.searchList = results;
      $scope.searchFriend.name = "";
      $scope.searchCard.name = "";
      $scope.searchUser.open = false;
      // console.log(results);
      // $state.go('ProfileList', {
      //   active: status
      // });
      $state.go("ProfileList", {
        active: status,
        urlSlug: $scope.activeUrlSlug
      }, {
        location: true,
        notify: false,
        reload: false
      })
    };

    $scope.testingDropDown = function (name) {
      $scope.searchUser.open = true;
      if (name.length == 0) {
        $scope.searchCard.name = "";
      }
    };

    $scope.userData = $.jStorage.get("profile");
    var travelCountCallback = function (data, status) {
      $scope.count = data.data;
    };

    var reloadCount = function () {
      NavigationService.travelCount(travelCountCallback, function (err) {
        console.log(err);
      });
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
    reloadCount();

    var callbackFollowers = function (data) {
      $scope.followersList = data.data.followers;
      _.each($scope.followersList, function (n) {
        if (n.following) {
          n.status = "Following";
        } else {
          n.status = "Follow";
        }
      });
      reloadCount();
      if ($scope.activeMenu == 'followers') {
        $scope.searchList = $scope.followersList;
      }
    };

    var callbackFollowings = function (data) {
      $scope.followingList = data.data.following;
      _.each($scope.followingList, function (n) {
        if (n.following) {
          n.status = "Following";
        } else {
          n.status = "Follow";
        }
      });
      reloadCount();
      if ($scope.activeMenu == 'following') {
        $scope.searchList = $scope.followingList;
      }
    };

    var callbackGetCountriesVisited = function (data) {
      $scope.countryVisitedList = data;
      reloadCount();
    };

    var callbackBucketList = function (data) {
      $scope.bucketList = data;
      reloadCount();
    };

    var callbackRemoveFromBucketList = function (countryId) {
      reloadCount();
      document.getElementById(countryId).remove();
    };
    $scope.removeFromBucketList = function (id) {
      MyLife.updateBucketListWeb(id, callbackRemoveFromBucketList);
    }

    MyLife.getFollowingWeb(callbackFollowings);
    MyLife.getFollowersWeb(callbackFollowers);
    MyLife.getCountryVisitedListExpanded(callbackGetCountriesVisited);
    MyLife.getOneBucketList(callbackBucketList);

    MyLife.getOneBucketList(callbackBucketList);


    //follow unfollow user starts
    $scope.followUnFollowUser = function (status, userId, name, flag) {
      console.log(flag);
      if (status == 'fromFollowers') {
        if (flag == "Follow") {
          console.log("requested to follow");
          MyLife.followUser(userId, name, function (data) {
            if (data.value) {
              var index = _.findIndex($scope.followersList, ['_id', userId]);
              console.log(index);
              $scope.followersList[index].following = true;
              $scope.followersList[index].status = "Following";
              MyLife.getFollowingWeb(callbackFollowings);
            }
          });
        } else if (flag == "Following") {
          console.log("requested to unfollow");
          MyLife.unFollowUser(userId, function (data) {
            if (data.value) {
              var index = _.findIndex($scope.followersList, ['_id', userId]);
              console.log(index);
              $scope.followersList[index].following = false;
              $scope.followersList[index].status = "Follow";
              MyLife.getFollowingWeb(callbackFollowings);
            }
          });
        }
      } else if (status == "fromFollowing") {
        if (flag == "Follow") {
          console.log("requested to follow");
          MyLife.followUser(userId, name, function (data) {
            if (data.value) {
              var index = _.findIndex($scope.followingList, ['_id', userId]);
              console.log(index);
              $scope.followingList[index].following = true;
              $scope.followingList[index].status = "Following";
              MyLife.getFollowersWeb(callbackFollowers);
            }
          });
        } else if (flag == "Following") {
          console.log("requested to unfollow");
          MyLife.unFollowUser(userId, function (data) {
            if (data.value) {
              var index = _.findIndex($scope.followingList, ['_id', userId]);
              console.log(index);
              $scope.followingList[index].following = false;
              $scope.followingList[index].status = "Follow";
              MyLife.getFollowersWeb(callbackFollowers);
            }
          });
        }
      }
    };
    //follow unfollow user ends
    $scope.searchFriend = {};
    $scope.searchAllUser = function (searchUser) {
      var len = searchUser.length;
      if (len > 3) {
        console.log(searchUser);
        MyLife.searchAllUser(searchUser, function (data) {
          console.log(data);
        });
      }
    };


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
  .controller('DetailedItineraryCtrl', function ($scope, TemplateService, NavigationService, Itinerary, $timeout, $stateParams, $filter, $state, $uibModal) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("detail-itinerary");
    $scope.menutitle = NavigationService.makeactive("DetailedItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // LISTED MODAL POPUP
    $scope.hotelList = [];
    $scope.showListed = function () {
      modal = $uibModal.open({
        templateUrl: "views/modal/show-listed.html",
        animation: true,
        scope: $scope,
        windowClass: "show-listed-popup",
        size: "lg"
      });
    };

    $scope.hotelList = ['Taj Mahal Hotel', 'Oberoi Gardens', 'Ramee Guestline', 'J W Marriot', 'St. Regis', 'Sea Princess', 'Royal Gardens', 'ITC Maratha', 'Grand Hyatt'];


    // $scope.hotelList = _.chunk($scope.hotelMainList, 2);
    // console.log($scope.hotelList, 'new array');
    // LISTED MODAL POPUP END

    $scope.countryPanel = "";
    $scope.cityPanel = "";

    var flag = $stateParams.flag;
    var urlSlug = $stateParams.urlSlug;
    var countries = [];
    $scope.previousCountryId = [];
    $scope.day = {};
    $scope.showCountry = [];

    $scope.dItinerary = {};
    $scope.dItinerary.photos = [];
    $scope.dItinerary.buddies = [];
    $scope.updateBuddiesArr = function () {
      $scope.cities = [];
    };
    if (flag == 'edit' && urlSlug != '') {

      Itinerary.getOneItinerary(urlSlug, function (data) {
        $scope.dItinerary = data.data;
        $scope.addCountry = $scope.dItinerary.countryVisited;

        //setting up qItineraryType variable starts
        _.each($scope.dItinerary.itineraryType, function (n) {
          var index = _.findIndex($scope.dItineraryType, function (type) {
            return n.toUpperCase() == type.caption.toUpperCase();
          });
          $scope.dItineraryType[index].activeClass = "active-itinerary";
        });
        //setting up qItineraryType variable ends

        //setting up addCountry variable starts
        $scope.addCountry = [];
        _.each(data.data.countryVisited, function (n1, key1) {
          $scope.addCountry.push({
            "country": n1.country._id,
            "name": n1.country.name,
            "flag": n1.country.flag,
            "from": new Date(n1.from),
            "to": new Date(n1.to),
            "duration": n1.duration,
            "cityVisited": []
          });
          // $scope.previouslyAddedCountries.push({
          //   "country": n1.country._id,
          //   "cityVisited": []
          // });
          _.each(n1.cityVisited, function (n2, key2) {
            var obj = {
              "name": "",
              "placeId": ""
            };
            obj.name = n2.city.name;
            obj.placeId = n2.city.googlePlaceId;
            obj.from = n2.from;
            obj.to = n2.to;
            obj.description = n2.description;
            obj.days = {};
            if (n2 && n2.days[0] && n2.days[0].ate && n2.days[0].ate != 0) {
              obj.days.ate = n2.days[0].ate;
            }
            if (n2 && n2.days[0] && n2.days[0].mustDo && n2.days[0].mustDo != 0) {
              obj.days.mustDo = n2.days[0].mustDo;
            }
            if (n2 && n2.days[0] && n2.days[0].stay && n2.days[0].stay != 0) {
              obj.days.stay = n2.days[0].stay;
            }
            $scope.addCountry[key1].cityVisited.push(obj);
          });
          $scope.previousCountryId[key1] = n1.country._id;
        });
        //setting up addCountry variable ends
      });
    }

    // datetrial
    $scope.openFrom = function () {
      $scope.popupFrom.opened = true;
    };
    $scope.dateOptions = {
      showWeeks: false
    }
    $scope.openTo = function () {
      $scope.popupTo.opened = true;
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'dd-MM-yyyy';
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popupFrom = {
      opened: false
    };
    $scope.popupTo = {
      opened: false
    };

    // datetrial end

    $scope.dItineraryType = [{
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
    }, {
      img: "img/itinerary/shopping-white.png",
      caption: "Shopping",
      width: "24"
    }, {
      img: "img/itinerary/cap-white.png",
      caption: "Solo",
      width: "35"
    }, {
      img: "img/itinerary/speaker-white.png",
      caption: "Festival",
      width: "29"
    }, {
      img: "img/itinerary/backpacking.png",
      caption: "Backpacking",
      width: "23"
    }];

    //Photo caption function

    $scope.index = -1


    $scope.addDetailCaption = function (index) {
      // console.log(index,"hai");
      if ($scope.index == index) {
        $scope.index = -1;
      } else {
        $scope.index = index;
      }
    }



    //Photo caption function end


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
      statusbar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code', 'importcss', 'autoresize'
      ],
      paste_as_text: true,
      // content_css: "css/main.css",
      autoresize_on_init: false,
      autoresize_min_height: 0,
      autoresize_overflow_padding: 0,
    };

    // tinymce end


    //integration starts
    var countriesCallback = function (data) {
      countries = data.data;
      $scope.countries = data.data;
      $scope.currency = data.data;
    };

    NavigationService.getAllCountries(countriesCallback, function () {
      console.log("error getting data");
    });

    $scope.searchCity = function (countryId, searchData, cityVisited) {
      console.log("in search city");
      var formData = {
        "country": countryId,
        "search": searchData
      }
      var str = formData.search;
      console.log(str);
      $scope.cities = [];
      if (str.length > 3) {
        NavigationService.searchCityByCountry(formData, function (data) {
          cities = data.data;
          var cities = _.differenceBy(cities, cityVisited, 'name');
          $scope.cities = cities;
        });
      }
    };

    $scope.updateCountryPanel = function (countryPanel, countryId) {
      var currentId = $scope.addCountry[countryPanel].country;
      var index = _.indexOf($scope.previousCountryId, countryId);
      $scope.previousCountryId[countryPanel] = countryId;
      if (index == -1) {
        $scope.addCountry[countryPanel].cityVisited = [{}];
        $scope.addCountry[countryPanel].new = 'add';
      } else {
        alert(name + " already selected");
      }
    };

    $scope.updateCountriesArr = function (id) {
      $scope.countries = countries;
      _.each($scope.addCountry, function (n) {
        if (n.country != id) {
          $scope.countries = _.reject($scope.countries, ['_id', n.country]);
        }
      });
    };
    $scope.from = "";
    $scope.to = "";
    $scope.getDays = function (country) {
      country.datePopUp.to
      console.log(country);
      if (country.to == undefined) {
        country.datePopUp.to.initDate = country.from;
        country.to = country.from;
        country.datePopUp.to.openCalender = true;
        country.datePopUp.to.minDate = country.from;
      } else {
        if (country.from.getTime() > country.to.getTime()) {
          alert("from greater than To");
          country.datePopUp.to.initDate = country.from;
          country.to = country.from;
          country.datePopUp.to.openCalender = true;
          country.datePopUp.to.minDate = country.from;
        } else {
          alert("from is smaller or equal to  TO");
        }
      }

      // country.datePopUp.minDate = new Date(country.from)
      if ((country.from == undefined) || (country.to == undefined)) {

      } else {
        country.duration = $filter('dateDifference')(country.to, country.from) - 1;
      }
    };

    $scope.ifNotChanged = function (country) {
      country.datePopUp.from.openCalender = true;

    };
    $scope.tagHandler = function (tag) {
      return {
        name: tag
      }
    };

    //find stayed at,ate at and sights starts
    $scope.google = {};
    var stayedAtCallback = function (data) {
      $scope.google.hotels = data.data;
      console.log($scope.google.hotels);
    };
    var ateAtCallback = function (data) {

      $scope.google.restaurants = data.data;
      console.log($scope.google.restaurants);
    };
    var mustDosCallback = function (data) {

      $scope.google.mustDos = data.data;
      console.log($scope.google.mustDos);
    };

    $scope.findResults = function (placeId, type, search, flag) {
      var callback;
      console.log(placeId, type, search, flag);
      if (flag == "onchange") {
        if (placeId != undefined && search.length > 2) {
          var obj = {
            "placeId": placeId,
            "type": type,
            "search": search
          };

          if (type == "Hotels & Accomodations") {
            callback = stayedAtCallback;
          } else if (type == "Restaurants & Bars") {
            callback = ateAtCallback;
          } else if (type == "Sights") {
            callback = mustDosCallback;
          };

          Itinerary.getGooglePlaceDetail(obj, callback);

        } else {

        }
      } else if (flag == "onclick") {
        var obj = {
          "placeId": placeId,
          "type": type,
          "search": search
        };

        if (type == "Hotels & Accomodations") {
          callback = stayedAtCallback;
        } else if (type == "Restaurants & Bars") {
          callback = ateAtCallback;
        } else if (type == "Sights") {
          callback = mustDosCallback;
        };

        Itinerary.getGooglePlaceDetail(obj, callback);
      }
    };
    //find stayed at,ate at and sights ends



    //add-remove photos starts
    $scope.addPhotosCallback = function (photo) {
      console.log(photo);
      $scope.dItinerary.photos.push({
        "name": photo,
        "caption": ""
      })
    };
    $scope.removePhoto = function (index, city) {
      $scope.dItinerary.photos.splice(index, 1);
    };
    //add-remove photos ends

    //travelled with starts
    $scope.listFollowers = function (searchList) {
      if (searchList.length > 3) {
        $scope.viewFollowers = true;
        var callback = function (data) {
          $scope.followersList = data.data;


          // _.each($scope.followersList, function (n1) {
          //   _.each($scope.dItinerary.buddies, function (n2) {
          //     if(n1._id==n2._id){
          //       n1.flag=true;
          //     }else{
          //       n1.flag=false;
          //     }
          //   });
          // });

          _.each($scope.dItinerary.buddies, function (buddy) {
            buddy.flag = true;
          });
          $scope.followersList = _.uniqBy($scope.followersList, $scope.dItinerary.buddies, "_id");
          console.log($scope.followersList);
          // _.each($scope.dItinerary.buddies, function (n1) {
          //   _.each($scope.followersList, function (n2) {
          //     if (n1._id == n2._id) {
          //       n2.flag = true;
          //     }
          //   });
          // });

        }
        Itinerary.searchFollowers(searchList, callback);
      } else {
        $scope.viewFollowers = false;
      }
    }

    $scope.tagFriend = function (flag, friend) {
      if (flag) {
        var index = _.findIndex($scope.dItinerary.buddies, function (n) {
          return n._id == friend._id;
        });
        if (index == -1) {
          $scope.dItinerary.buddies.push({
            "_id": friend._id,
            "name": friend.name,
            "email": friend.email
          });
        }

      } else {
        $scope.dItinerary.buddies = _.reject($scope.dItinerary.buddies, ['_id', friend._id]);
      }
    };
    //travelled with ends

    $scope.uploadDetailedItinerary = function (status) {
      $scope.dItinerary.status = status;
      $scope.dItinerary.cost = parseInt($scope.dItinerary.cost);
      $scope.dItinerary.countryVisited = $scope.addCountry;

      //storing all selected itinerarytype on sending variable starts
      $scope.dItinerary.itineraryType = [];
      _.each($scope.dItineraryType, function (n) {
        if (n.activeClass == "active-itinerary") {
          $scope.dItinerary.itineraryType.push(n.caption.toLowerCase())
        }
      });
      //storing all selected itinerarytype on sending variable ends

      //removing unwanted values from buddies starts
      _.each($scope.dItinerary.buddies, function (n, index) {
        $scope.dItinerary.buddies[index] = _.omit(n, ['flag']);
      });
      //removing unwanted values from buddies starts

      //removing unwanted values from countryVisited starts
      _.each($scope.dItinerary.countryVisited, function (n, index) {
        $scope.dItinerary.countryVisited[index] = _.omit(n, ['name', 'flag', 'datePopUp']);
      });
      //removing unwanted values from countryVisited starts
      console.log($scope.dItinerary);

      Itinerary.uploadDetailedItinerary($scope.dItinerary, flag, function (data) {
        $state.go('userdetailitinerary', {
          id: data.data.message
        });
        console.log(data);
      });
    };

    //integration ends

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
      if ($scope.dItineraryType[val].activeClass == "active-itinerary") {
        $scope.dItineraryType[val].activeClass = "";
      } else {
        $scope.dItineraryType[val].activeClass = "active-itinerary";
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
    // $scope.addClass = "";
    // $scope.addCountryCity = [{}];
    // $scope.addPanel = function () {
    //   $scope.addCountryCity.push({});
    //   $scope.addClass = "added-panel"
    // }
    $scope.addClass = "";
    $scope.addCountry = [{
      "cityVisited": [{}],
      "datePopUp": {
        // "showWeeks": false,
        // "from": false,
        // "to": false,
        // "maxDate": new Date()
        "from": {
          'openCalender': false,
          'showWeeks': false,
          'maxDate': new Date()
        },
        "to": {
          'openCalender': false,
          'showWeeks': false,
          'maxDate': new Date()
        }
      }
    }];

    $scope.addYourCountry = function () {
      var prevIndex = $scope.addCountry.length - 1;
      console.log($scope.addCountry[prevIndex]);
      var prevDate = $scope.addCountry[prevIndex].to;
      var newDate = new Date(prevDate);
      var maxDate = new Date();
      newDate.setDate(prevDate.getDate() + 1);
      console.log(prevDate, newDate);
      $scope.addCountry.push({
        "cityVisited": [{}],
        "new": "add",
        "datePopUp": {
          "from": {
            'openCalender': true,
            'showWeeks': false,
            'maxDate': maxDate,
            "initDate": new Date(newDate)
          },
          "to": {
            'openCalender': false,
            'showWeeks': false,
            'maxDate': maxDate
          }
        }
      });
      // $scope.addCountry[prevIndex + 1].from = new Date(newDate);
      $scope.addClass = "city-country-holder";
      console.log($scope.addCountry);
    };

    $scope.removeCountry = function (countryPanel) {
      $scope.addCountry.splice(countryPanel, 1);
    };

    $scope.updateCountryDetail = function (editCountry, nation, countryPanel, cityPanel) {
      $scope.showCountry[countryPanel] = false;
      editCountry.country = nation._id;
      editCountry.flag = nation.flag;
      editCountry.name = nation.name;
    };

    $scope.addYourCity = function (countryPanel) {
      $scope.addCountry[countryPanel].cityVisited.push({});
    };

    $scope.removeCity = function (countryPanel, cityPanel) {
      console.log("removed city");
      $scope.addCountry[countryPanel].cityVisited.splice(cityPanel, 1);
    };
    $scope.updateCityDetail = function (editCity, city, countryPanel, cityPanel) {
      console.log(editCity, city);
      editCity.name = city.name;
      editCity.placeId = city.placeId;
    };
  })
  .controller('QuickItineraryCtrl', function ($scope, TemplateService, NavigationService, Itinerary, $timeout, $stateParams, $state) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("quick-itinerary");
    $scope.menutitle = NavigationService.makeactive("QuickItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.addClass = "";
    $scope.addCountry = [{}];
    $scope.qItinerary = {};
    $scope.qItinerary.itineraryType = [];
    $scope.qItinerary.countryVisited = [];
    $scope.qItinerary.photos = [];
    $scope.qItinerary.videos = [];
    $scope.qItinerary.hashtag = [];
    $scope.qItinerary.photos = [];
    $scope.previousCountryId = [];
    $scope.previouslyAddedCountries = [];

    var flag = $stateParams.flag;
    var urlSlug = $stateParams.urlSlug;

    //check whether page is called for editing itinerary or for new itinerary starts
    //if edit then make call to that itinerary
    if (flag == 'edit' && urlSlug != '') {

      Itinerary.getOneItinerary(urlSlug, function (data) {
        $scope.qItinerary = data.data;
        $scope.qItinerary.oldStatus = $scope.qItinerary.status;
        $scope.qItinerary.oldPhotos = _.cloneDeep($scope.qItinerary.photos);
        $scope.addCountry = $scope.qItinerary.countryVisited;

        //setting up qItineraryType variable starts
        _.each($scope.qItinerary.itineraryType, function (n) {
          var index = _.findIndex($scope.qItineraryType, function (type) {
            return n.toUpperCase() == type.caption.toUpperCase();
          });
          $scope.qItineraryType[index].activeClass = "active-itinerary";
        });
        //setting up qItineraryType variable ends

        //setting up addCountry variable starts
        $scope.addCountry = [];
        _.each(data.data.countryVisited, function (n1, key1) {
          $scope.addCountry.push({
            "country": n1.country._id,
            "cityVisited": []
          });
          $scope.previouslyAddedCountries.push({
            "country": n1.country._id,
            "cityVisited": []
          });
          _.each(n1.cityVisited, function (n2, key2) {
            var obj = {
              "name": "",
              "placeId": ""
            };
            obj.name = n2.city.name;
            if (n2 && n2.city && n2.city.googlePlaceId && n2.city.googlePlaceId != "") {
              obj.placeId = n2.city.googlePlaceId;
            }
            $scope.addCountry[key1].cityVisited.push(obj);
          });
          $scope.previousCountryId[key1] = n1.country._id;
        });
        //setting up addCountry variable ends
      });
    }
    //check whether page is called for editing itinerary or for new itinerary ends

    $scope.cities = [];
    var countries = [];
    var cities = [];
    $scope.qItineraryType = [{
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
    }, {
      img: "img/itinerary/shopping-white.png",
      caption: "Shopping",
      width: "24"
    }, {
      img: "img/itinerary/cap-white.png",
      caption: "Solo",
      width: "35"
    }, {
      img: "img/itinerary/speaker-white.png",
      caption: "Festival",
      width: "29"
    }, {
      img: "img/itinerary/backpacking.png",
      caption: "Backpacking",
      width: "23"
    }];


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
      statusbar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code', 'importcss', 'autoresize'
      ],
      paste_as_text: true,
      // content_css: "css/main.css",
      autoresize_on_init: false,
      autoresize_min_height: 0,
      autoresize_overflow_padding: 0,
      autoresize_bottom_margin: 0
    };


    var str = "";
    $scope.selectItinerary = function (val) {
      if ($scope.qItineraryType[val].activeClass == "active-itinerary") {
        $scope.qItineraryType[val].activeClass = "";
      } else {
        $scope.qItineraryType[val].activeClass = "active-itinerary";
      }
    };

    var countriesCallback = function (data) {
      countries = data.data;
      $scope.countries = data.data;
      $scope.currency = data.data;
    };

    NavigationService.getAllCountries(countriesCallback, function () {
      console.log("error getting data");
    });

    $scope.searchCity = function (countryId, searchData, cityVisited) {
      var formData = {
        "country": countryId,
        "search": searchData
      }
      var str = formData.search;
      if (str.length > 2) {
        NavigationService.searchCityByCountry(formData, function (data) {
          cities = data.data;
          console.log(cities, cityVisited);
          var cities = _.differenceBy(cities, cityVisited, 'name');
          $scope.cities = cities;
        });
      }
    };

    $scope.addPanel = function () {
      if (flag == 'new') {
        $scope.addCountry.push({});
      } else if (flag == 'edit') {
        $scope.addCountry.push({
          'new': 'add'
        });
      }
    };

    $scope.removeStayed = function (countryPanel) {
      $scope.addCountry.splice(countryPanel, 1);
    };

    $scope.updateCountryPanel = function (countryPanel, countryId) {
      var currentId = $scope.addCountry[countryPanel].country;
      var index = _.indexOf($scope.previousCountryId, countryId);
      $scope.previousCountryId[countryPanel] = countryId;
      if (index == -1) {
        $scope.addCountry[countryPanel].cityVisited = [];
        $scope.addCountry[countryPanel].new = 'add';
      } else {
        alert(name + " already selected");
      }
    };

    $scope.updateCountriesArr = function (id) {
      $scope.countries = countries;
      _.each($scope.addCountry, function (n) {
        if (n.country != id) {
          $scope.countries = _.reject($scope.countries, ['_id', n.country]);
        }
      });
    };

    $scope.updateCitiesArr = function () {
      $scope.cities = [];
    };

    $scope.addPhotosCallback = function (photo) {
      console.log(photo);
      $scope.qItinerary.photos.push({
        "name": photo
      })
    };

    //Photo caption function
    $scope.index = -1
    $scope.addQuickCaption = function (index) {
      // console.log(index,"hai");
      if ($scope.index == index) {
        $scope.index = -1;
      } else {
        $scope.index = index;
      }
    }
    //Photo caption function end

    $scope.removePhoto = function (index) {
      $scope.qItinerary.photos.splice(index, 1);
      console.log($scope.qItinerary.photos);
    };

    $scope.uploadQuickItinerary = function (status) {
      console.log($scope.qItinerary);
      if (flag == 'edit' && urlSlug != '') {
        if ($scope.qItinerary.status != true) {
          $scope.qItinerary.status = status;
        }
      } else {
        $scope.qItinerary.status = status;
      }
      $scope.qItinerary.duration = parseInt($scope.qItinerary.duration);
      $scope.qItinerary.year = parseInt($scope.qItinerary.year);
      // $scope.qItinerary.cost = parseInt($scope.qItinerary.cost);
      $scope.qItinerary.countryVisited = $scope.addCountry;
      //update countryVisited with new='remove' fo deleted countries starts
      _.each($scope.previouslyAddedCountries, function (n1) {
        var index = _.findIndex($scope.qItinerary.countryVisited, function (n2) {
          console.log(n1.country, n2.country);
          return n1.country == n2.country;
        });
        console.log(index);
        if (index == -1) {
          n1.new = 'remove';
          $scope.qItinerary.countryVisited.push(n1);
        }
      });
      //update countryVisited with new='remove' fo deleted countries ends

      console.log($scope.qItinerary.countryVisited);

      //storing all selected itinerarytype on sending variable starts
      $scope.qItinerary.itineraryType = [];
      _.each($scope.qItineraryType, function (n) {
        if (n.activeClass == "active-itinerary") {
          $scope.qItinerary.itineraryType.push(n.caption.toLowerCase())
        }
      });
      //storing all selected itinerarytype on sending variable ends
      $scope.qItinerary = _.omit($scope.qItinerary, ['createdAt', 'updatedAt', 'user', 'urlSlug', 'comment', 'creator', 'review', 'uniqueId']);
      Itinerary.uploadQuickItinerary($scope.qItinerary, flag, function (data) {
        $state.go('userquickitinerary', {
          id: data.data.message
        });
      });
    };

    $scope.getYear = [];
    $scope.viewYear = function () {
      var d = new Date();
      var n = d.getFullYear();
      $scope.getYear = _.rangeRight(1900, n + 1);
    };
    $scope.viewYear();

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

  .controller('photoCommentModalCtrl', function ($scope, $uibModalInstance, LikesAndComments) {

    $scope.likePhoto = function (listOfComments, uniqueId, _id, additionalId) {
      // console.log(uniqueId, _id, additionalId);
      console.log(listOfComments);
      $scope.listOfComments.likeDone = !$scope.listOfComments.likeDone;
      if ($scope.listOfComments.likeDone) {
        if ($scope.listOfComments.likeCount == undefined) {
          $scope.listOfComments.likeCount = 1;
        } else {
          $scope.listOfComments.likeCount = $scope.listOfComments.likeCount + 1;
        }
        LikesAndComments.likeUnlike(listOfComments.type, "like", listOfComments.name, listOfComments.post, listOfComments._id)
      } else {
        $scope.listOfComments.likeCount = $scope.listOfComments.likeCount - 1;
        LikesAndComments.likeUnlike(listOfComments.type, "unlike", listOfComments.name, listOfComments.post, listOfComments._id)
      }
    };

    $scope.postPhotosComment = function (uniqueId, comment, postId, photoId) {
      console.log(uniqueId, comment, postId, photoId);
      var type = "photo";
      var hashTag = [];
      var callback = function (data) {
        $scope.listOfComments.comment = data.data.comment;
        document.getElementById('enterComment').value = "";
      }
      LikesAndComments.postComment(type, uniqueId, postId, comment, hashTag, photoId, callback);
    };

    $scope.getMoreComments = function (photoId) {
      if ($scope.listOfComments.scrollBusy) {
        return;
      } else {
        if ($scope.listOfComments.stopCallingApi) {
          return;
        } else {
          $scope.listOfComments.scrollBusy = true;
          LikesAndComments.getPhotoBannerDetails(photoId, ++$scope.listOfComments.pageNo, function (data) {
            $scope.listOfComments.scrollBusy = false;
            if (data.value) {
              if (data.data && data.data.comment.length != 0) {
                _.each(data.data.comment, function (n) {
                  $scope.listOfComments.comment.push(n);
                });
              } else {
                $scope.listOfComments.stopCallingApi = true;
              }
            } else {
              console.log("Error:", data.data);
            }
          }, function (data) {
            console.log(data);
            $scope.listOfComments.scrollBusy = false;
            $scope.listOfComments.stopCallingApi = false;
            --$scope.listOfComments.pageNo;
          });
        }
      }
    };

    $scope.nextPhotoSlide = function (slideData) {
      console.log(slideData);
      if (slideData.photoSliderIndex == slideData.photoSliderLength - 1) {
        slideData.photoSliderIndex = 0;
        console.log(slideData.photoSliderIndex, 'naya index');
        var nextId = slideData.newArray[slideData.photoSliderIndex]._id;
        console.log(nextId, 'next id');
        console.log(slideData.photoSliderIndex, 'next slide');
        LikesAndComments.openPhotoPopup(nextId, $scope);
      } else {
        slideData.photoSliderIndex++;
        var nextId = slideData.newArray[slideData.photoSliderIndex]._id;
        console.log(nextId, 'next id');
        console.log(slideData.photoSliderIndex, 'next slide');
        LikesAndComments.openPhotoPopup(nextId, $scope);
      }

    };
    $scope.prevPhotoSlide = function (slideData) {
      if (slideData.photoSliderIndex == 0) {
        slideData.photoSliderIndex = slideData.photoSliderLength - 1;
        var prevId = slideData.newArray[slideData.photoSliderIndex]._id;
        console.log(slideData.photoSliderIndex, 'prev slide');
        LikesAndComments.openPhotoPopup(prevId, $scope);
      } else {
        console.log(slideData);
        slideData.photoSliderIndex--;
        var prevId = slideData.newArray[slideData.photoSliderIndex]._id;
        console.log(prevId, 'prev id');
        console.log(slideData.photoSliderIndex, 'prev slide');
        LikesAndComments.openPhotoPopup(prevId, $scope);
      }
    }
  })

  .controller('UserQuickItineraryCtrl', function ($scope, TemplateService, NavigationService, LikesAndComments, $timeout, $stateParams, $uibModal, Itinerary) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("user-quickitinerary");
    $scope.menutitle = NavigationService.makeactive("User-QuickItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    //Integration starts here
    $scope.userData = $.jStorage.get("profile");
    //get quick-itinerary details starts
    var slug = $stateParams.id;
    Itinerary.getOneItinerary(slug, function (data) {
      $scope.itinerary = data.data;
      console.log($scope.itinerary);
    });
    //get quick-itinerary details ends

    //post quick-itinerary comments starts
    $scope.commentText = {};
    $scope.postItineraryComment = function (_id, uniqueId, text) {
      console.log(_id, uniqueId, text);
      Itinerary.postItineraryComment(_id, uniqueId, text, function (data) {
        console.log(data);
        Itinerary.getOneItinerary(slug, function (data) {
          $scope.itinerary.comment = data.data.comment;
          console.log($scope.itinerary);
          $scope.commentText.text = "";
        });
      });
    };
    //post quick-itinerary comments ends

    //Itinerary Options List Show
    $scope.showItineraryEditOptions = false;
    $scope.viewItineraryOptions = function () {
      if ($scope.showItineraryEditOptions == false) {
        $scope.showItineraryEditOptions = true;
      } else {
        $scope.showItineraryEditOptions = false;
      }
    }
    //Itinerary Options List Show End

    //Photo comment popup
    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
      $scope.userProfilePic = $.jStorage.get("profile").profilePicture;
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
        controller: 'photoCommentModalCtrl',
        scope: $scope,
        windowClass: "notify-popup"
      });
      modal.closed.then(function () {
        $scope.listOfComments = {};
      });
      LikesAndComments.openPhotoPopup(photoId, $scope);
    };
    //Photo comment popup end

    //like-unlike itinerary starts
    // $scope.itinerary.likeDone;
    // $scope.itinerary.likeCount;
    $scope.likeUnlikeItinerary = function (flag, _id, uniqueId) {
      Itinerary.updateLikeItinerary(flag, _id, uniqueId, function (data) {
        if (data) {
          $scope.itinerary.likeCount = $scope.likeCount + 1;
        } else {
          $scope.itinerary.likeCount = $scope.likeCount - 1;
        }
        $scope.itinerary.likeDone = data;
        console.log($scope.itinerary.likeCount, $scope.itinerary.likeDone);
      });
    };
    //like-unlike itinerary ends


    //integration ends here
    //photo gallery backdrop
    $scope.showClass = "close-gallery";
    $scope.dispBackDrop = "";
    $scope.viewGallery = function () {
      if ($scope.showClass == "close-gallery") {
        $scope.showClass = "open-gallery";
        $scope.dispBackDrop = "showphoto-backdrop";
      } else {
        $scope.showClass = "close-gallery";
        $scope.dispBackDrop = "";
      }
    };
    //photo gallery backdrop end
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
  .controller('UserDetailItineraryCtrl', function ($scope, TemplateService, NavigationService, Itinerary, LikesAndComments, $timeout, $uibModal, $stateParams) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("user-detailitinerary");
    $scope.menutitle = NavigationService.makeactive("User-DetailItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    //Integration starts here

    $scope.userData = $.jStorage.get("profile");

    //get quick-itinerary details starts
    var slug = $stateParams.id;
    Itinerary.getOneItinerary(slug, function (data) {
      $scope.itinerary = data.data;
    });
    //get quick-itinerary details ends

    //like-unlike itinerary starts

    $scope.likeUnlikeItinerary = function (flag, _id, uniqueId) {
      Itinerary.updateLikeItinerary(flag, _id, uniqueId, function (data) {
        if (data) {
          if ($scope.itinerary.likeCount == null) {
            $scope.itinerary.likeCount = 1
          } else {
            $scope.itinerary.likeCount = $scope.likeCount + 1;
          }
        } else {
          $scope.itinerary.likeCount = $scope.likeCount - 1;
        }
        $scope.itinerary.likeDone = data;
        console.log($scope.itinerary.likeCount, $scope.itinerary.likeDone);
      });
    };
    //like-unlike itinerary ends

    //post detail-itinerary comments starts
    $scope.commentText = {};
    $scope.postItineraryComment = function (_id, uniqueId, text) {
      console.log(_id, uniqueId, text);
      Itinerary.postItineraryComment(_id, uniqueId, text, function (data) {
        console.log(data);
        Itinerary.getOneItinerary(slug, function (data) {
          $scope.itinerary.comment = data.data.comment;
          console.log($scope.itinerary);
          $scope.commentText.text = "";
        });
      });
    };
    //post detail-itinerary comments ends
    $scope.country = {};
    $scope.city = {};
    $scope.previousId = {};
    $scope.updateOpenStatus = function (groups) {

      $scope.isOpen = groups.some(function (item) {
        console.log($scope.previousId, item);
        if ($scope.previousId == item) {
          item.isOpen = !item.isOpen;
        } else {
          $scope.previousId.isOpen = false;
          item.isOpen = !item.isOpen;
        }
        $scope.previousId = item;
        return item.isOpen;
      });
      console.log($scope.isOpen);

    }


    //Photo comment popup
    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
      $scope.userProfilePic = $.jStorage.get("profile").profilePicture;
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
        controller: 'photoCommentModalCtrl',
        scope: $scope,
        windowClass: "notify-popup"
      });
      modal.closed.then(function () {
        $scope.listOfComments = {};
      });
      LikesAndComments.openPhotoPopup(photoId, $scope);
    };
    //Photo comment popup end

    //Itinerary Options List Show
    $scope.showItineraryEditOptions = false;
    $scope.viewItineraryOptions = function () {
      if ($scope.showItineraryEditOptions == false) {
        $scope.showItineraryEditOptions = true;
      } else {
        $scope.showItineraryEditOptions = false;
      }
    }
    //Itinerary Options List Show End
    //Integration starts here

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

    //photo gallery backdrop
    $scope.showClass = "close-gallery";
    $scope.dispBackDrop = "";
    $scope.viewGallery = function () {
      if ($scope.showClass == "close-gallery") {
        $scope.showClass = "open-gallery";
        $scope.dispBackDrop = "showphoto-backdrop";
      } else {
        $scope.showClass = "close-gallery";
        $scope.dispBackDrop = "";
      }
    };
    //photo gallery backdrop end
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
    $scope.agentClass = "";
    $scope.agentbox = "agentbox-in";
    $scope.viewAgent = function () {
      if ($scope.agentbox == "agentbox-in") {
        $scope.agentbox = "agentbox-out";
        $scope.agentClass = "backdrop-agent";
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

  .controller('AboutCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location, MyLife, OnGoJourney) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("about-travelibro");
    $scope.menutitle = NavigationService.makeactive("About TraveLibro");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })



  .controller('headerctrl', function ($scope, TemplateService, NavigationService, $state, $interval, $timeout) {
    var currentUrl = window.location.href;
    $scope.template = TemplateService;
    $scope.getAllSearched = [];
    $scope.search = {};
    $scope.search.searchType = "";
    $scope.search.viewData = false;

    $(window).load(function () {
      var loading = setInterval(function () {
        var elementExists = document.getElementById("loader");
        if (elementExists) {
          $('.travelibro-loader').parent().addClass('loader-blur');
        } else {
          $('body').removeClass('loader-blur');
          clearInterval(loading);
        };
      }, 200);
    });


    if ($.jStorage.get("profile") != null && $.jStorage.get("profile") != "") {
      console.log("found");
      NavigationService.getProfile($.jStorage.get("profile").urlSlug, function (data, status) {
        if (data.data._id) {
          $.jStorage.set("isLoggedIn", true);
          $.jStorage.set("profile", data.data);
          $scope.userData = $.jStorage.get("profile");
        } else {
          // $state.go('login');
          $.jStorage.set("profile", "");
        }
      }, function (err) {
        console.log(err);
      });
    } else {
      console.log("not found");
    }

    $scope.isLoggedIn = $.jStorage.get("isLoggedIn");
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
    $scope.opendownload = function () {
      $scope.isopen = !$scope.isopen;
    };
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }

    $scope.logout = function () {
      NavigationService.logout(function () {
          $.jStorage.flush();
          acsToken = "";
          $state.go('login');
        },
        function (err) {
          console.log(err);
        });
    };
    // backgroundClick
    $scope.editOption = function (model) {
      $timeout(function () {
        if ($scope.search.searchType.length > 0) {
          model.backgroundClick = true;
        } else {
          model.backgroundClick = false;
        }
        backgroundClick.object = model;
      }, 200);
      backgroundClick.scope = $scope;
    };
    //backgroundClick
    $scope.searchType = function () {
      console.log($scope.search.searchType, 'search type');
      if ($scope.search.searchType !== '') {
        $scope.viewSearch.backgroundClick = true;
        NavigationService.getSearchData({
          search: $scope.search.searchType
        }, function (data) {
          $scope.getAllSearched = data.data;
          console.log($scope.getAllSearched, 'data');
        });
      } else {
        $scope.viewSearch.backgroundClick = false;
      }
    };

    $scope.viewResult = function (state, searchText) {
      switch (state) {
        case 'search-traveller':
          $state.go('search-result', {
            name: 'search-traveller',
            searchText: searchText
          });
          break;
        case 'search-itinerary':
          $state.go('search-result', {
            name: 'search-itinerary',
            searchText: searchText
          });
          break;
        case 'search-hashtag':
          $state.go('search-result', {
            name: 'search-hashtag',
            searchText: searchText
          });
          break;
        case 'search-country':
          $state.go('search-result', {
            name: 'search-country',
            searchText: searchText
          });
          break;
        case 'search-city':
          $state.go('search-result', {
            name: 'search-city',
            searchText: searchText
          });
          break;
        default:

      }
    }

  })

  .controller('AgentloginCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("agent-login"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Agent Login"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
    //about textarea counter
    $scope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        $('#textareaChars').keyup(updateCount);
        $('#textareaChars').keydown(updateCount);
        $('#remainingC').text(0 + '/ 500');

        function updateCount() {
          var count = $('#textareaChars').val().length;
          $('#remainingC').text(count + '/ 500');
        }
      }, 100);
    });

    //about textarea counter end
    $scope.agentloginView = 1;
    $scope.agentSec = function (val) {
      if (val == 1) {
        $scope.agentloginView = 1;
      } else if (val == 2) {
        $scope.agentloginView = 2;
        console.log(2);
      } else if (val == 3) {
        $scope.agentloginView = 3;
      } else if (val == 4) {
        $scope.agentloginView = 4;
      } else if (val == 5) {
        $scope.agentloginView = 5;
      } else if (val == 6) {
        $scope.agentloginView = 6;
      } else if (val == 7) {
        $scope.agentloginView = 7;
      } else if (val == 8) {
        $scope.agentloginView = 8;
      } else if (val == 9) {
        $scope.agentloginView = 9;
      } else {
        $scope.agentloginView = 1;
      }
    }
    // category of Specialisation array
    $scope.categoriesSpecial = [{
      agtcatImg: "img/agt-cat1.png",
      catwidth: "35px",
      agtcatCap: "Adventure"
    }, {
      agtcatImg: "img/agt-cat2.png",
      catwidth: "33px",
      agtcatCap: "Business"
    }, {
      agtcatImg: "img/agt-cat3.png",
      catwidth: "48px",
      agtcatCap: "Family"
    }, {
      agtcatImg: "img/agt-cat4.png",
      catwidth: "35px",
      agtcatCap: "Romance"
    }, {
      agtcatImg: "img/agt-cat5.png",
      catwidth: "35px",
      agtcatCap: "Backpacking"
    }, {
      agtcatImg: "img/agt-cat6.png",
      catwidth: "33px",
      agtcatCap: "Budget"
    }, {
      agtcatImg: "img/agt-cat7.png",
      catwidth: "33px",
      agtcatCap: "Luxury"
    }, {
      agtcatImg: "img/agt-cat8.png",
      catwidth: "38px",
      agtcatCap: "Religious"
    }, {
      agtcatImg: "img/agt-cat9.png",
      catwidth: "35px",
      agtcatCap: "Friends"
    }];
    // category of Specialisation array end
    //country of Specialisation accordion
    $scope.agtRegionSpcl = [{
      regionName: "Africa",
      countryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      regionName: "Asia",
      countryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      regionName: "Europe",
      countryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      regionName: "North America",
      countryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      regionName: "Ocenia",
      countryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      regionName: "South America",
      countryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", ]
    }];
    //country of Specialisation accordion end

    //Services
    $scope.agtServicesSpcl = [
      'Tours And Packages', 'Day Tours', 'Outdoors & Excursions', 'Flights', 'Cruise', 'MICE', 'Personal', 'Business Travel', 'Car Rentals', 'Visas', 'Fully Independent Traveller', 'Accomodation', 'Travel Insurance', 'Sports & Events', 'Forex', 'Holidays', 'Festival & Concerts', 'Transportation'
    ];
    //Services end
  })
  .controller('AgentsettingCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("agent-setting"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Agent Settings"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;

    //country setting accordion
    $scope.agtRegionSetting = [{
      settRegion: "Africa",
      settcountryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      settRegion: "Asia",
      settcountryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      settRegion: "Europe",
      settcountryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      settRegion: "North America",
      settcountryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      settRegion: "Ocenia",
      settcountryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait"]
    }, {
      settRegion: "South America",
      settcountryName: ["Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", "Afghanistan", "Dubai", "Iraq", "Iran", "India", "Kuwait", ]
    }];
    //country setting accordion end

    // Textarea counter
    $scope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        $('#textareaChars').keyup(updateCount);
        $('#textareaChars').keydown(updateCount);
        $('#remainAbt').text(0 + '/ 500');

        function updateCount() {
          var count = $('#textareaChars').val().length;
          $('#remainAbt').text(count + '/ 500');
        }
      }, 100);
    });
    // Textarea counter end

    //setting tab navigation
    $scope.showAgtSetting = 1;
    $scope.agtsetting = function (val) {
      if (val == 1) {
        $scope.showAgtSetting = 1;
      } else if (val == 2) {
        $scope.showAgtSetting = 2;
      } else if (val == 3) {
        $scope.showAgtSetting = 3;
      } else if (val == 4) {
        $scope.showAgtSetting = 4;
      } else if (val == 5) {
        $scope.showAgtSetting = 5;
      } else if (val == 6) {
        $scope.showAgtSetting = 6;
      } else if (val == 7) {
        $scope.showAgtSetting = 7;
      } else if (val == 8) {
        $scope.showAgtSetting = 8;
      } else {
        $scope.showAgtSetting = 1;
      }
    };
    //setting tab navigation end

    // choose category Specialisation
    $scope.chooseCategorySpcl = [{
      img: "img/agt-cat1.png",
      caption: "Adventure",
      catWidth: "30px"
    }, {
      img: "img/agt-cat2.png",
      caption: "Business",
      catWidth: "30px"
    }, {
      img: "img/agt-cat3.png",
      caption: "Family",
      catWidth: "42px"
    }, {
      img: "img/agt-cat4.png",
      caption: "Romance",
      catWidth: "33px"
    }, {
      img: "img/agt-cat5.png",
      caption: "Backpacking",
      catWidth: "30px"
    }, {
      img: "img/agt-cat6.png",
      caption: "Budget",
      catWidth: "28px"
    }, {
      img: "img/agt-cat7.png",
      caption: "Luxury",
      catWidth: "28px"
    }, {
      img: "img/agt-cat8.png",
      caption: "Religious",
      catWidth: "33px"
    }, {
      img: "img/agt-cat9.png",
      caption: "Friends",
      catWidth: "30px"
    }];
    // choose category Specialisation end

  })
  .controller('AgentupgradeCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("agent-upgrade"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Agent Upgrade"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.variables = {};
    $scope.variables.tooltips = {};
    $scope.showTip = false;
    $scope.showTip = function (index) {
      // if($scope.showTip == false){
      //   $scope.showTip = true;
      // }else{
      //   $scope.showTip = false;
      // }
      _.each($scope.variables.tooltips, function (value, property) {
        $scope.variables.tooltips[property] = false;
      })
      $scope.variables.tooltips[index] = $scope.variables.tooltips[index] ? false : true;
    };

    // // upgrade feature end
    $scope.agentUpgradeFeature = [{
      upgradeFeature: "Itineraries",
      basicValue: "5",
      advValue: "25",
      premValue: "Unlimited",
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium modi cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "Tours & Packages",
      basicValue: "1",
      advValue: "5",
      premValue: "Unlimited",
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium modi cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "Featured Tours & Packages on Popular Agents",
      basicValue: '<i class="fa fa-minus"></i>',
      advValue: '<i class="fa fa-minus"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem ipisicing elit. Est praesentium modi cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "Featured Tours & Packages on Destination Agents",
      basicValue: '<i class="fa fa-minus"></i>',
      advValue: '<i class="fa fa-check"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "t. Est praesentium modi cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "Lead Monitor - Access to TraveLibro Audience",
      basicValue: '<i class="fa fa-minus"></i>',
      advValue: '<i class="fa fa-minus"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium modi cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "Analyse Profile Views",
      basicValue: "3",
      advValue: "3",
      premValue: "3",
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium modi cum t cupiditate"
    }, {
      upgradeFeature: "Connect With Followers",
      basicValue: "3",
      advValue: '<i class="fa fa-check"></i>',
      premValue: "3",
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentiumnderit cupiditate"
    }, {
      upgradeFeature: "Lead Analytics",
      basicValue: '<i class="fa fa-minus"></i>',
      advValue: '<i class="fa fa-minus"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentiumreprehenderit cupiditate"
    }, {
      upgradeFeature: "Analyse Views & Downloads",
      basicValue: '<i class="fa fa-minus"></i>',
      advValue: '<i class="fa fa-minus"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium  cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "List on Popular Agents",
      basicValue: '<i class="fa fa-minus"></i>',
      advValue: '<i class="fa fa-minus"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: " ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium modi cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "Upload Photos & Videos",
      basicValue: '<i class="fa fa-check"></i>',
      advValue: '<i class="fa fa-check"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. dit reprehenderit cupiditate"
    }, {
      upgradeFeature: "About Us",
      basicValue: '<i class="fa fa-check"></i>',
      advValue: '<i class="fa fa-check"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium modi cum odit reprehenderit cupiditateLorem Est praesentium modi cum odit reprehen"
    }, {
      upgradeFeature: "Select Specialisation",
      basicValue: '<i class="fa fa-check"></i>',
      advValue: '<i class="fa fa-check"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem Est praesentium modi cum odit reprehenderit cupiditate"
    }, {
      upgradeFeature: "Popular Agents Adverts to TraveLibro Audience",
      basicValue: '<i class="fa fa-check"></i>',
      advValue: '<i class="fa fa-check"></i>',
      premValue: '<i class="fa fa-check"></i>',
      upgradetool: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est praesentium modi cupiditate"
    }];
    // // upgrade feature end
  })
  .controller('AgentuserCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    $scope.template = TemplateService.changecontent("agent-user"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Agent User"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;

    //enquiry & contact card initialisation
    // enquiry

    $scope.viewEnquiry = false;
    $scope.getBackdrop = "";
    $scope.showEnquiry = function () {
      // console.log("click");
      if ($scope.viewEnquiry == false) {
        $scope.getBackdrop = "backdrop-enquiry";
        $scope.viewEnquiry = true;
      } else {
        $scope.viewEnquiry = false;
        $scope.getBackdrop = "";
      }
    };
    //enquiry end

    //contact us
    $scope.viewContact = false;
    $scope.getBackdrop = "";
    $scope.showContact = function () {
      // console.log("click");
      if ($scope.viewContact == false) {
        $scope.getBackdrop = "backdrop-enquiry";
        $scope.viewContact = true;
      } else {
        $scope.viewContact = false;
        $scope.getBackdrop = "";
      }
    };
    //contact us end
    //enquiry & contact card initialisation



    //scroll change
    $(window).scroll(function () {
      //  var navHeight = $('.img-holder-agent').height($(window).height() - 41);
      var scroll = $(window).scrollTop();
      //console.log(scroll);
      if (scroll >= 300) {
        //console.log('a');
        $(".agent-user-nav").addClass("change");
      } else {
        //console.log('a');
        $(".agent-user-nav").removeClass("change");
      }
    });
    //scroll change end

    // tab change
    var allagtuser = ["views/content/agent/agt-user/usr-itinerary.html", "views/content/agent/agt-user/usr-tourpackages.html", "views/content/agent/agt-user/usr-photovideos.html", "views/content/agent/agt-user/usr-testimonialreviews.html", "views/content/agent/agt-user/usr-travelactivity.html", "views/content/agent/agt-user/usr-aboutus.html"];
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
      case "usr-travelactivity":
        $scope.agtuser.innerView = allagtuser[4];
        $scope.agtuseroptions.active = "usr-travelactivity";
        break;
      case "usr-aboutus":
        $scope.agtuser.innerView = allagtuser[5];
        $scope.agtuseroptions.active = "usr-aboutus";
        break;
      default:
        $scope.agtuser.innerView = allagtuser[0];
    }
    $scope.getTab = function (view) {
      console.log(view);
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
          url = "usr-travelactivity";
          $scope.agtuseroptions.active = "usr-travelactivity";
          break;
        case 5:
          url = "usr-aboutus";
          $scope.agtuseroptions.active = "usr-aboutus";
          break;
        default:
          url = "usr-itinerary";
          $scope.agtuseroptions.active = "usr-itinerary";
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



    //user itinerary cards
    $scope.usrItineraryCard = [{
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '35000',
      noDays: '55',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '1505',
      agtRating: '3.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '15 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '75000',
      noDays: '15',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '342',
      agtRating: '4.0',
      agtLikesCount: '199',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }];
    //user itinerary cards end

    // tour packages card
    $scope.usrTourPackageCard = [{
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryTitle: 'Adventure',
      tourcategoryImg: 'img/agt-cat1.png',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat5.png',
      tourcategoryTitle: 'Backpacking',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat4.png',
      tourcategoryTitle: 'Romance',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat9.png',
      tourcategoryTitle: 'Friends',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat1.png',
      tourcategoryTitle: 'Adventure',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat7.png',
      tourcategoryTitle: 'Luxury',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat1.png',
      tourcategoryTitle: 'Adventure',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat4.png',
      tourcategoryTitle: 'Romance',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }];
    // tour packages card end

    // gallery card
    $scope.agenPhotogallery = [
      'img/uploaded-pic.jpg',
      'img/slider2.jpg',
      'img/moment-travel1.jpg',
      'img/moment-travel2.jpg',
      'img/local-life-post.jpg',
      'img/destination/goldentemple.jpg',
      'img/destination/list1.jpg',
      'img/destination/list2.jpg',
      'img/destination/info.jpg',
      'img/destination/taj-featured.jpg',
      'img/itinerary/itinerary.jpg',
      'img/india-gate.jpg',
      'img/notify-adrena.jpg',
      'img/paris.jpg',
      'img/bg-popular.jpg',
      'img/bg-blur.jpg',
      'img/blog-banner.jpg',
      'img/follower.jpg'
    ];
    // gallery card end

    //gallery filter list
    $scope.picFilterList = ['India', 'Malaysia', 'Singapore', 'Dubai', 'London', 'USA', 'Abu Dhabi', 'Kenya', 'South Africa', 'Cuba', 'Cambodia', 'China', 'England', 'Russia', 'Kazakhstan', 'Iran', 'Iraq', 'Bolivia'];
    //gallery filter list end

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
        $('#textareaChars').keyup(updateCount);
        $('#textareaChars').keydown(updateCount);
        $('#reviewremainingC').text(0 + '/ 300');

        function updateCount() {
          var count = $('#textareaChars').val().length;
          $('#reviewremainingC').text(count + '/ 300');
        }
      }, 100);
    });

    // review textarea counter end
    // travel activity json
    $scope.travelActivity = [{
      header: true,
      footer: true,
      agentHeader: true,
      travellerAgent: true,
      agentName: "Holiday Travallers",
      agentPost: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit error dolore, deleniti hic placeat debitis aperiam aliquid blanditiis autem voluptates libero veritatis excepturi ex corporis deserunt commodi. Aliquid, dolores, asperiores?",
      travellerProfile: "img/profile-main.png",
      travelDate: "26 dec, 2016",
      travelTime: "1:20pm"
    }, {
      header: false,
      footer: false,
      tourPackage: true,
      packageType: "Adventure",
      packageImg: "img/agt-cat1.png",
      tourFlag: [{
        flagImg: "img/canada-visit.png"
      }, {
        flagImg: "img/england-visit.png"
      }, {
        flagImg: "img/india-visit.png"
      }],
      tourTitle: "Love in Paris",
      tourCost: "25000",
      tourNight: "4",
      tourDay: "5",
      tourPic: "img/paris.jpg",
      tourDate: "26 dec, 2016",
      tourTime: "1:20pm"
    }, {
      header: true,
      footer: true,
      itineraryHeader: true,
      itinerary: true,
      itineraryDate: "26 Dec, 2016",
      itineraryTime: "1:20 pm",
      itineraryCat: "img/agt-cat1.png",
      itineraryPic: "img/paris.jpg",
      itineraryTitle: "Love In Paris",
      itineraryCost: "25000",
      itineraryDays: "75",
      itineraryFlag: [{
        itineraryImg: "img/canada-visit.png"
      }, {
        itineraryImg: "img/england-visit.png"
      }, {
        itineraryImg: "img/india-visit.png"
      }],
      itineraryJourney: [{
        journeyImg: "img/sunset.png"
      }, {
        journeyImg: "img/bag-journey.png"
      }, {
        journeyImg: "img/luxury-journey.png"
      }]
    }, {
      header: true,
      footer: true,
      agentHeader: true,
      travellerAgent: true,
      agentName: "Holiday Travallers",
      agentPost: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit error dolore, deleniti hic placeat debitis aperiam aliquid blanditiis autem voluptates libero veritatis excepturi ex corporis deserunt commodi. Aliquid, dolores, asperiores?",
      travellerProfile: "img/profile-main.png",
      travelDate: "26 dec, 2016",
      travelTime: "1:20pm"
    }, {
      header: true,
      footer: true,
      itineraryHeader: true,
      itinerary: true,
      itineraryDate: "26 Dec, 2016",
      itineraryTime: "1:20 pm",
      itineraryCat: "img/agt-cat1.png",
      itineraryPic: "img/paris.jpg",
      itineraryTitle: "Love In Paris",
      itineraryCost: "25000",
      itineraryDays: "75",
      itineraryFlag: [{
        itineraryImg: "img/canada-visit.png"
      }, {
        itineraryImg: "img/england-visit.png"
      }, {
        itineraryImg: "img/india-visit.png"
      }],
      itineraryJourney: [{
        journeyImg: "img/sunset.png"
      }, {
        journeyImg: "img/bag-journey.png"
      }, {
        journeyImg: "img/luxury-journey.png"
      }]
    }, {
      header: false,
      footer: false,
      tourPackage: true,
      packageType: "Adventure",
      packageImg: "img/agt-cat1.png",
      tourFlag: [{
        flagImg: "img/canada-visit.png"
      }, {
        flagImg: "img/england-visit.png"
      }, {
        flagImg: "img/india-visit.png"
      }],
      tourTitle: "Love in Paris",
      tourCost: "25000",
      tourNight: "4",
      tourDay: "5",
      tourPic: "img/paris.jpg",
      tourDate: "26 dec, 2016",
      tourTime: "1:20pm"
    }, {
      header: false,
      footer: false,
      tourPackage: true,
      packageType: "Adventure",
      packageImg: "img/agt-cat1.png",
      tourFlag: [{
        flagImg: "img/canada-visit.png"
      }, {
        flagImg: "img/england-visit.png"
      }, {
        flagImg: "img/india-visit.png"
      }],
      tourTitle: "Love in Paris",
      tourCost: "25000",
      tourNight: "4",
      tourDay: "5",
      tourPic: "img/paris.jpg",
      tourDate: "26 dec, 2016",
      tourTime: "1:20pm"
    }];
    // travel activity json end

    // ITINERARY FILTER
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
    //ITINERARY FILTER END

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
  .controller('AgenthomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    $scope.template = TemplateService.changecontent("agent-home"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Agent Home"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;

    // on load modal
    // $(window).load(function(){
    //   $('#getModal').modal('show');
    // });
    // on load modal end

    // ADD BUTTTON BACKDROP AND CLICK

    $scope.showItinerary = false;
    $scope.addHomeBackdrop = "";
    $scope.addItinerary = function () {
      // console.log("click");
      if ($scope.showItinerary == false) {
        $scope.showItinerary = true;
        $scope.addHomeBackdrop = "backdrop-addhome";
      } else {
        $scope.showItinerary = false;
        $scope.addHomeBackdrop = "";
      }
    };
    // ADD BUTTTON BACKDROP AND CLICK END

    // agent add photo edit
    $scope.agentPhotos = [{
      agentImg: "img/ongojourney/winter.jpg"
    }, {
      agentImg: "img/ongojourney/fire.jpg"
    }, {
      agentImg: "img/ongojourney/jitu-sofa.jpg"
    }, {
      agentImg: "img/ongojourney/andrea-santa.jpg"
    }, {
      agentImg: "img/ongojourney/window.jpg"
    }];
    $scope.agentPhotos = _.chunk($scope.agentPhotos, 4);
    for (i = 0; i < $scope.agentPhotos.length; i++) {
      $scope.agentPhotos[i] = _.chunk($scope.agentPhotos[i], 2);
    }
    $scope.index = -1;
    $scope.putCaptionAgent = function (index) {
      if ($scope.index == index) {
        $scope.index = -1;
      } else {
        $scope.index = index;
      }
    }

    //photo caption textarea counter
    $scope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        $('#captionArea').keyup(updateCount);
        $('#captionArea').keydown(updateCount);
        $('#remainCaption').text(0 + '/150');

        function updateCount() {
          var count = $('#captionArea').val().length;
          $('#remainCaption').text(count + '/150');
        }
      }, 200);
    });

    //photo caption textarea counter end
    // agent add photo edit end

    //lead monitor accordion
    $scope.leadMonAgent = [{
      leadStatus: 'new',
      leadImg: 'img/follower.jpg',
      leadName: 'Andrea Christina',
      leadDate: '02/12/2016',
      leadDestination: 'India',
      leadComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      leadPhone: '91961845656',
      leadMail: 'leads@leads.com',
      leadItinerary: 'Incredible India'
    }, {
      leadStatus: 'actioned',
      leadImg: 'img/follower.jpg',
      leadName: 'Andrea Christina',
      leadDate: '02/12/2016',
      leadDestination: 'India',
      leadComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      leadPhone: '91961845656',
      leadMail: 'leads@leads.com',
      leadItinerary: 'Incredible India'
    }, {
      leadStatus: 'new',
      leadImg: 'img/follower.jpg',
      leadName: 'Andrea Christina',
      leadDate: '02/12/2016',
      leadDestination: 'India',
      leadComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      leadPhone: '91961845656',
      leadMail: 'leads@leads.com',
      leadItinerary: 'Incredible India'
    }, {
      leadStatus: 'actioned',
      leadImg: 'img/follower.jpg',
      leadName: 'Andrea Christina',
      leadDate: '02/12/2016',
      leadDestination: 'India',
      leadComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      leadPhone: '91961845656',
      leadMail: 'leads@leads.com',
      leadItinerary: 'Incredible India'
    }, {
      leadStatus: 'new',
      leadImg: 'img/follower.jpg',
      leadName: 'Andrea Christina',
      leadDate: '02/12/2016',
      leadDestination: 'India',
      leadComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      leadPhone: '91961845656',
      leadMail: 'leads@leads.com',
      leadItinerary: 'Incredible India'
    }];
    //lead monitor accordion end

    //scroll change
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      //console.log(scroll);
      if (scroll >= 370) {
        //console.log('a');
        $(".agent-home-nav").addClass("change-blue");
      } else {
        //console.log('a');
        $(".agent-home-nav").removeClass("change-blue");
      }
    });
    //scroll change end

    //status character counter
    $scope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        $('#postStatus').keyup(updateCount);
        $('#postStatus').keydown(updateCount);
        $('#postcount').text(0 + '/350');

        function updateCount() {
          var count = $('#postcount').val().length;
          $('#postcount').text(count + '/350');
        }
      }, 100);
    });
    //status character counter end

    // tab change
    var allagthome = ["views/content/agent/agt-home/agthome-itinerary.html", "views/content/agent/agt-home/agthome-tourpackages.html", "views/content/agent/agt-home/agthome-photovideos.html", "views/content/agent/agt-home/agthome-testimonialreviews.html",
      "views/content/agent/agt-home/agthome-travelactivity.html",
      "views/content/agent/agt-home/agthome-leadmonitor.html", "views/content/agent/agt-home/agthome-analytics.html",
      "views/content/agent/agt-home/agthome-aboutus.html"
    ];
    $scope.agthome = {
      innerView: allagthome[0]
    };
    // change url
    $scope.agthomeoptions = {};
    $scope.agthomeoptions.active = "";
    $scope.viewTab = 1;
    switch ($state.params.name) {
      case "agthome-itinerary":
        $scope.agthome.innerView = allagthome[0];
        $scope.agthomeoptions.active = "agthome-itinerary";
        break;
      case "agthome-tourpackages":
        $scope.agthome.innerView = allagthome[1];
        $scope.agthomeoptions.active = "agthome-tourpackages";
        break;
      case "agthome-photovideos":
        $scope.agthome.innerView = allagthome[2];
        $scope.agthomeoptions.active = "agthome-photovideos";
        break;
      case "agthome-testimonialreviews":
        $scope.agthome.innerView = allagthome[3];
        $scope.agthomeoptions.active = "agthome-testimonialreviews";
        break;
      case "agthome-travelactivity":
        $scope.agthome.innerView = allagthome[4];
        $scope.agthomeoptions.active = "agthome-travelactivity";
        break;
      case "agthome-leadmonitor":
        $scope.agthome.innerView = allagthome[5];
        $scope.agthomeoptions.active = "agthome-leadmonitor";
        break;
      case "agthome-analytics":
        $scope.agthome.innerView = allagthome[6];
        $scope.agthomeoptions.active = "agthome-analytics";
        break;
      case "agthome-aboutus":
        $scope.agthome.innerView = allagthome[7];
        $scope.agthomeoptions.active = "agthome-aboutus";
        break;
      default:
        $scope.agthome.innerView = allagthome[0];
    }
    $scope.agenthomeItinerary = true;
    $scope.agentFixednav = ""
    $scope.getTab = function (view) {
      $scope.agthome.innerView = allagthome[view];
      var url = "agthome-itinerary";
      var active = "";
      console.log(view);
      switch (view) {
        case 0:
          url = "agthome-itinerary";
          $scope.agthomeoptions.active = "agthome-itinerary";
          $scope.agenthomeItinerary = true;
          $scope.agentFixednav = "";
          break;
        case 1:
          url = "agthome-tourpackages";
          $scope.agthomeoptions.active = "agthome-tourpackages";
          $scope.agenthomeItinerary = false;
          $scope.agentFixednav = "change-blue";
          break;
        case 2:
          url = "agthome-photovideos";
          $scope.agthomeoptions.active = "agthome-photovideos";
          $scope.agenthomeItinerary = false;
          $scope.agentFixednav = "change-blue";
          break;
        case 3:
          url = "agthome-testimonialreviews";
          $scope.agthomeoptions.active = "agthome-testimonialreviews";
          $scope.agenthomeItinerary = false;
          $scope.agentFixednav = "change-blue";
          break;
        case 4:
          url = "agthome-travelactivity";
          $scope.agthomeoptions.active = "agthome-travelactivity";
          $scope.agenthomeItinerary = false;
          $scope.agentFixednav = "change-blue";
          break;
        case 5:
          url = "agthome-leadmonitor";
          $scope.agthomeoptions.active = "agthome-leadmonitor";
          $scope.agenthomeItinerary = false;
          $scope.agentFixednav = "change-blue";
          break;
        case 6:
          url = "agthome-analytics";
          $scope.agthomeoptions.active = "agthome-analytics";
          $scope.agenthomeItinerary = false;
          $scope.agentFixednav = "change-blue";
          break;
        case 7:
          url = "agthome-aboutus";
          $scope.agthomeoptions.active = "agthome-aboutus";
          $scope.agenthomeItinerary = false;
          $scope.agentFixednav = "change-blue";
          break;

        default:
          url = "agthome-itinerary";
          $scope.agthomeoptions.active = "agthome-itinerary";
          $scope.agenthomeItinerary = true;
      }
      console.log(url);
      $state.go("agent-home", {
        name: url
      }, {
        notify: false
      });
    };
    // tab change end

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
    }];
    // category type end

    // itinerary popover
    $scope.viewdetailInfo = false;
    $scope.showdetailInfo = function () {
      if ($scope.viewdetailInfo == false) {
        $scope.viewdetailInfo = true;
        console.log("true");
      } else {
        $scope.viewdetailInfo = false;
      }
    };

    $scope.viewquickInfo = false;
    $scope.showquickInfo = function () {
      if ($scope.viewquickInfo == false) {
        $scope.viewquickInfo = true;
      } else {
        $scope.viewquickInfo = false;
      }
    };
    // itinerary popover end

    //user itinerary cards
    $scope.usrItineraryCard = [{
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '35000',
      noDays: '55',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '1505',
      agtRating: '3.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '15 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '75000',
      noDays: '15',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '342',
      agtRating: '4.0',
      agtLikesCount: '199',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      timestampDate: '26 Jan, 2015',
      timestampHour: '1:20 pm',
      tripImg: 'img/paris.jpg',
      itineraryTitle: 'Love In Paris',
      tripCost: '25000',
      noDays: '75',
      tripCat: ['img/sunset.png', 'img/bag-journey.png', 'img/luxury-journey.png'],
      agtReviewCount: '352',
      agtRating: '4.5',
      agtLikesCount: '99',
      countryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }];
    //user itinerary cards end

    // tour packages card
    $scope.usrTourPackageCard = [{
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryTitle: 'Adventure',
      tourcategoryImg: 'img/agt-cat1.png',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat5.png',
      tourcategoryTitle: 'Backpacking',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat4.png',
      tourcategoryTitle: 'Romance',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat9.png',
      tourcategoryTitle: 'Friends',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat1.png',
      tourcategoryTitle: 'Adventure',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat7.png',
      tourcategoryTitle: 'Luxury',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat1.png',
      tourcategoryTitle: 'Adventure',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }, {
      tourImg: 'img/paris.jpg',
      agttourTitle: 'Love In Paris',
      agttourCost: '25000',
      tourDayC: '4',
      tourNightC: '3',
      tourcategoryImg: 'img/agt-cat4.png',
      tourcategoryTitle: 'Romance',
      tourDate: '26 Dec, 2016',
      tourTime: '1.20 pm',
      tourcountryBadgesFlag: ['img/england-visit.png', 'img/canada-visit.png', 'img/india-visit.png']
    }];
    // tour packages card end

    // category of Specialisation array
    $scope.categoriesSpecial = [{
      tourImgCat: "img/agt-cat1.png",
      catwidth: "25px",
      tourCat: "Adventure"
    }, {
      tourImgCat: "img/agt-cat2.png",
      catwidth: "25px",
      tourCat: "Business"
    }, {
      tourImgCat: "img/agt-cat3.png",
      catwidth: "33px",
      tourCat: "Family"
    }, {
      tourImgCat: "img/agt-cat4.png",
      catwidth: "28px",
      tourCat: "Romance"
    }, {
      tourImgCat: "img/agt-cat5.png",
      catwidth: "25px",
      tourCat: "Backpacking"
    }, {
      tourImgCat: "img/agt-cat6.png",
      catwidth: "24px",
      tourCat: "Budget"
    }, {
      tourImgCat: "img/agt-cat7.png",
      catwidth: "22px",
      tourCat: "Luxury"
    }, {
      tourImgCat: "img/agt-cat8.png",
      catwidth: "28px",
      tourCat: "Religious"
    }, {
      tourImgCat: "img/agt-cat9.png",
      catwidth: "25px",
      tourCat: "Friends"
    }];
    // category of Specialisation array end

    //tourCurrency start
    $scope.tourCurrency = [{
      currencyCountry: 'Indian',
      currencyCode: 'INR'
    }, {
      currencyCountry: 'Indian',
      currencyCode: 'INR'
    }, {
      currencyCountry: 'Indian',
      currencyCode: 'INR'
    }, {
      currencyCountry: 'Indian',
      currencyCode: 'INR'
    }, {
      currencyCountry: 'Indian',
      currencyCode: 'INR'
    }, {
      currencyCountry: 'Indian',
      currencyCode: 'INR'
    }, {
      currencyCountry: 'Indian',
      currencyCode: 'INR'
    }];
    //tourCurrency end

    // gallery card
    $scope.agenPhotogallery = [
      'img/uploaded-pic.jpg',
      'img/slider2.jpg',
      'img/moment-travel1.jpg',
      'img/moment-travel2.jpg',
      'img/local-life-post.jpg',
      'img/destination/goldentemple.jpg',
      'img/destination/list1.jpg',
      'img/destination/list2.jpg',
      'img/destination/info.jpg',
      'img/destination/taj-featured.jpg',
      'img/itinerary/itinerary.jpg',
      'img/india-gate.jpg',
      'img/notify-adrena.jpg',
      'img/paris.jpg',
      'img/bg-popular.jpg',
      'img/bg-blur.jpg',
      'img/blog-banner.jpg',
      'img/follower.jpg'
    ];
    // gallery card end

    //gallery filter list
    $scope.picFilterList = ['India', 'Malaysia', 'Singapore', 'Dubai', 'London', 'USA', 'Abu Dhabi', 'Kenya', 'South Africa', 'Cuba', 'Cambodia', 'China', 'England', 'Russia', 'Kazakhstan', 'Iran', 'Iraq', 'Bolivia'];
    //gallery filter list end

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



    // travel activity json
    $scope.travelActivity = [{
      header: true,
      footer: true,
      agentHeader: true,
      travellerAgent: true,
      agentName: "Holiday Travallers",
      agentPost: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit error dolore, deleniti hic placeat debitis aperiam aliquid blanditiis autem voluptates libero veritatis excepturi ex corporis deserunt commodi. Aliquid, dolores, asperiores?",
      travellerProfile: "img/profile-main.png",
      travelDate: "26 dec, 2016",
      travelTime: "1:20pm"
    }, {
      header: false,
      footer: false,
      tourPackage: true,
      packageType: "Adventure",
      packageImg: "img/agt-cat1.png",
      tourFlag: [{
        flagImg: "img/canada-visit.png"
      }, {
        flagImg: "img/england-visit.png"
      }, {
        flagImg: "img/india-visit.png"
      }],
      tourTitle: "Love in Paris",
      tourCost: "25000",
      tourNight: "4",
      tourDay: "5",
      tourPic: "img/paris.jpg",
      tourDate: "26 dec, 2016",
      tourTime: "1:20pm"
    }, {
      header: true,
      footer: true,
      itineraryHeader: true,
      itinerary: true,
      itineraryDate: "26 Dec, 2016",
      itineraryTime: "1:20 pm",
      itineraryCat: "img/agt-cat1.png",
      itineraryPic: "img/paris.jpg",
      itineraryTitle: "Love In Paris",
      itineraryCost: "25000",
      itineraryDays: "75",
      itineraryFlag: [{
        itineraryImg: "img/canada-visit.png"
      }, {
        itineraryImg: "img/england-visit.png"
      }, {
        itineraryImg: "img/india-visit.png"
      }],
      itineraryJourney: [{
        journeyImg: "img/sunset.png"
      }, {
        journeyImg: "img/bag-journey.png"
      }, {
        journeyImg: "img/luxury-journey.png"
      }]
    }, {
      header: true,
      footer: true,
      agentHeader: true,
      travellerAgent: true,
      agentName: "Holiday Travallers",
      agentPost: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit error dolore, deleniti hic placeat debitis aperiam aliquid blanditiis autem voluptates libero veritatis excepturi ex corporis deserunt commodi. Aliquid, dolores, asperiores?",
      travellerProfile: "img/profile-main.png",
      travelDate: "26 dec, 2016",
      travelTime: "1:20pm"
    }, {
      header: true,
      footer: true,
      itineraryHeader: true,
      itinerary: true,
      itineraryDate: "26 Dec, 2016",
      itineraryTime: "1:20 pm",
      itineraryCat: "img/agt-cat1.png",
      itineraryPic: "img/paris.jpg",
      itineraryTitle: "Love In Paris",
      itineraryCost: "25000",
      itineraryDays: "75",
      itineraryFlag: [{
        itineraryImg: "img/canada-visit.png"
      }, {
        itineraryImg: "img/england-visit.png"
      }, {
        itineraryImg: "img/india-visit.png"
      }],
      itineraryJourney: [{
        journeyImg: "img/sunset.png"
      }, {
        journeyImg: "img/bag-journey.png"
      }, {
        journeyImg: "img/luxury-journey.png"
      }]
    }, {
      header: false,
      footer: false,
      tourPackage: true,
      packageType: "Adventure",
      packageImg: "img/agt-cat1.png",
      tourFlag: [{
        flagImg: "img/canada-visit.png"
      }, {
        flagImg: "img/england-visit.png"
      }, {
        flagImg: "img/india-visit.png"
      }],
      tourTitle: "Love in Paris",
      tourCost: "25000",
      tourNight: "4",
      tourDay: "5",
      tourPic: "img/paris.jpg",
      tourDate: "26 dec, 2016",
      tourTime: "1:20pm"
    }, {
      header: false,
      footer: false,
      tourPackage: true,
      packageType: "Adventure",
      packageImg: "img/agt-cat1.png",
      tourFlag: [{
        flagImg: "img/canada-visit.png"
      }, {
        flagImg: "img/england-visit.png"
      }, {
        flagImg: "img/india-visit.png"
      }],
      tourTitle: "Love in Paris",
      tourCost: "25000",
      tourNight: "4",
      tourDay: "5",
      tourPic: "img/paris.jpg",
      tourDate: "26 dec, 2016",
      tourTime: "1:20pm"
    }];
    // travel activity json end
  })

  .controller('MessageCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("message"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Message"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    //showNewMessage box
    $scope.showNewMessage = false;
    $scope.newMessage = function () {
      if ($scope.showNewMessage == false) {
        $scope.showNewMessage = true;
      } else {
        $scope.showNewMessage = false;
      }
    };
    //showNewMessage box end

    //Delete message Function
    $scope.showDeleteMessage = false;
    $scope.deleteMessage = function () {
      if ($scope.showDeleteMessage == false) {
        $scope.showDeleteMessage = true;
      } else {
        $scope.showDeleteMessage = false;
      }
    };
    //Delete message Function End

    //Show Message Chat
    $scope.userMessage = [];
    $scope.viewMessageChat == false;
    $scope.showMessageChat = function (name) {
      $scope.userMessage = [];
      var newArray = _.findIndex($scope.followerList, function (o) {
        return o.name == name.name;
      });
      if (newArray !== -1) {
        $scope.userMessage = $scope.followerList[newArray].followerMessage;
        console.log($scope.userMessage, 'user ka naya');
        $scope.viewMessageChat = true;
      }
    }
    //Show Message Chat END

    // Follower List
    $scope.followerList = [{
      name: "Monish Shah",
      profilePic: "img/nargis1.jpg",
      timeStampDate: "12 Jan, 2017",
      timeStampTime: "1.20 pm",
      followerMessage: [{
        msgStatus: true,
        msgType: "sent",
        msgText: "Hey",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.50 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "Hi",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.58 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Wassssup?",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.59 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "BLA bla",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.05 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "YO!",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.10 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "QWERTYU...",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.20 pm"
      }]
    }, {
      name: "Andrea Christina",
      profilePic: "img/follower.jpg",
      timeStampDate: "12 Jan, 2017",
      timeStampTime: "1.20 pm",
      followerMessage: [{
        msgStatus: true,
        msgType: "sent",
        msgText: "Hey",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.50 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "Hi",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.58 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Wassssup?",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.59 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "BLA bla Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente at expedita reprehenderit blanditiis dolores error tempore tempora. Iusto fugit qui voluptate officia quasi accusamus facere, ab, recusandae eveniet, non dignissimos.",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.05 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "YO! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente at expedita reprehenderit blanditiis dolores error tempore tempora. Iusto fugit qui voluptate",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.10 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Lorem ipsum dolor sit amet, ",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.20 pm"
      }]
    }, {
      name: "Nargis Fakhri",
      profilePic: "img/nargis1.jpg",
      timeStampDate: "12 Jan, 2017",
      timeStampTime: "1.20 pm",
      followerMessage: [{
        msgStatus: true,
        msgType: "sent",
        msgText: "Hey. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente at expedita reprehenderit",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.50 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "Hi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente at expedita reprehenderit blanditiis dolores error tempore tempora. Iusto fugit qui voluptate officia quasi accusamus facere, ab, recusandae eveniet, non dignissimos.",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.58 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Wassssup? beach Meet Lorem",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.59 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "BLAH",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.05 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "YOyoyoyoyo!",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.10 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "QWYU...",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.20 pm"
      }]
    }, {
      name: "Disha Patani",
      profilePic: "img/dishapatani1.jpg",
      timeStampDate: "12 Jan, 2017",
      timeStampTime: "1.20 pm",
      followerMessage: [{
        msgStatus: true,
        msgType: "sent",
        msgText: "Heyya",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.50 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "Hiya",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.58 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Wassssup? YO!",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.59 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "BLA blah BLAH!!!!!!!!!!!",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.05 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "YOLO Babes!",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.10 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "MACDSVJFB...",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.20 pm"
      }]
    }, {
      name: "Alladin",
      profilePic: "img/adrena.jpg",
      timeStampDate: "12 Jan, 2017",
      timeStampTime: "1.20 pm",
      followerMessage: [{
        msgStatus: true,
        msgType: "sent",
        msgText: "Hey",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.50 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "Hi buddy",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.58 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Wassssup? Meet up at Stamford",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.59 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "BLA bla bla",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.05 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "Yikes!",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.10 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Q be!!!!!!!!!!!!!...",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.20 pm"
      }]
    }, {
      name: "Bla Blabla",
      profilePic: "img/nargis1.jpg",
      timeStampDate: "12 Jan, 2017",
      timeStampTime: "1.20 pm",
      followerMessage: [{
        msgStatus: true,
        msgType: "sent",
        msgText: "Hey yo",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.50 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "Hi",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.58 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "Wassssup? BAMBS",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "12.59 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "BLA bla bla vlA bla",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.05 pm"
      }, {
        msgStatus: true,
        msgType: "recieved",
        msgText: "YO maama!",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.10 pm"
      }, {
        msgStatus: true,
        msgType: "sent",
        msgText: "QWERTYU vladdujfdsv...",
        msgStampDate: "12 Jan, 2017",
        msgStampTime: "1.20 pm"
      }]
    }];
    // Follower List END


  })

  .controller('NotificationCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.changecontent("notification"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Notification"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.pageNo = 1;
    $scope.notifyScroll = {
      busy: false,
      stopCallingApi: false
    };
    $scope.notificationCard = [];
    $scope.notificationCard.notifyGender = "";
    $scope.notificationCard.notifyString = "";
    var makeNotifyString = function () {
      _.each($scope.notificationCard, function (notification) {
        switch (notification.type) {
          case 'journeyRequest':
            if (notification.userFrom.gender == 'male') {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> wants to tag you in his <span class="avenir-heavy">On The Go Journey</span> - ' + '<span class="color-pink avenir-heavy">' + notification.data.name + '</span>';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> wants to tag you in her <span class="avenir-heavy">On The Go Journey</span> - ' + '<span class="color-pink avenir-heavy">' + notification.data.name + '</span>';
            }
            break;
          case 'journeyLeft':
            if (notification.userFrom.gender == 'male') {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has ended his <span class="avenir-heavy color-blue">On The Go Journey</span> - ' + '<span class="avenir-heavy color-pink">' + notification.data.name + '</span>';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has ended her <span class="avenir-heavy color-blue">On The Go Journey</span> - ' + '<span class="avenir-heavy color-pink">' + notification.data.name + '</span>';
            }
            break;
          case 'postLike':
            if (notification.data.type == 'travel-life') {
              notification.notifyString = '<span class="avenir-heavy isblue">' + notification.userFrom.name + '</span> has liked your <span class="avenir-heavy color-blue">On The Go Activity</span>';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has liked your <span class="avenir-heavy color-blue">Local Life Activity</span>';
            }
            break;
          case 'postFirstTime':
            if (notification.data.type == 'travel-life') {
              if (notification.userFrom.gender == 'male') {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added a post to his <span class="avenir-heavy color-blue">On The Go Activity</span>';
              } else {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added a post to her <span class="avenir-heavy color-blue">On The Go Activity</span>';
              }
            } else {
              if (notification.userFrom.gender == 'male') {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added a post to his <span class="avenir-heavy color-blue"> Local Life </span> for the first time.';
              } else {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added a post to her <span class="avenir-heavy color-blue"> Local Life </span> for the first time.';
              }
            }
            break;
          case 'postComment':
            if (notification.data.type == 'travel-life') {
              notification.notifyString = '<span class="avenir-heavycolor-blue">' + notification.userFrom.name + '</span> has commented on your <span class="avenir-heavy color-blue">On The Go Activity</span>';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has commented on your <span class="avenir-heavy color-blue">Local Life Activity</span>';
            }
            break;
          case 'postMentionComment':
            if (notification.data.type == 'travel-life') {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has mentioned you in a comment';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has mentioned you in a comment';
            }
            break;
          case 'postTag':
            if (notification.data.type == 'travel-life') {
              if (notification.data.videos.length > 0) {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added a video of you\'ll to the <span class="avenir-heavy color-blue">On The Go Activity</span>';
              } else if (notification.data.videos.length == 0 && notification.data.photos.length > 0) {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added photos to the <span class="avenir-heavy color-blue">On The Go Activity</span>';
              } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn.lat !== '') {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has checked-in with you in an <span class="avenir-heavy color-blue">On The Go Activity</span>';
              } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn.lat == '' && notification.data.thoughts !== '') {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has tagged you in thought in an <span class="avenir-heavy color-blue">On The Go Activity</span>';
              }
            } else {
              if (notification.data.videos.length > 0) {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added a video of you\'ll to a <span class="avenir-heavy color-blue">Local Life Activity</span>';
              } else if (notification.data.videos.length == 0 && notification.data.photos.length > 0) {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has added photos to a <span class="avenir-heavy color-blue">Local Life Activity</span>';
              } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn.lat !== '') {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has checked-in with you in a <span class="avenir-heavy color-blue">Local Life Activity</span>';
              } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn == '' && notification.data.thoughts !== '') {
                notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has tagged you in thought in a <span class="avenir-heavy color-blue">Local Life Activity</span>';
              }
            }
            break;
          case 'itineraryRequest':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has tagged you in an Itinerary - ' + '<span class="avenir-heavy color-blue">' + notification.data.name + '</span>';
            break;
          case 'itineraryComment':
            notification.notifyString = '<span class="color-blue avenir-heavy">' + notification.userFrom.name + '</span> has commented on the Itinerary - ' + '<span class= "color-pink avenir-heavy">' + notification.data.name + '</span>';
            break;
          case 'itineraryLike':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has liked the Itinerary - <span class ="color-pink avenir-heavy">' + notification.data.name + '</span>';
            break;
          case 'itineraryMentionComment':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has mentioned you in a comment on the Ititnerary - <span class ="color-pink avenir-heavy">' + notification.data.name + '</span>';
            break;
          case 'journeyComment':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has commented on the <span class="avenir-heavy color-blue">On Go Journey</span> - <span class="color-pink avenir-heavy">' + notification.data.name + '</span>';
            break;
          case 'journeyLike':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has liked the <span class="avenir-heavy color-blue">On Go Journey</span> - <span class="color-pink avenir-heavy">' + notification.data.name + '</span>';
            break;
          case 'journeyMentionComment':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has mentioned you in a comment on the  <span class="avenir-heavy color-blue">On Go Journey</span> - <span class="avenir-heavy color-pink">' + notification.data.name + '</span>';
            break;
          case 'userFollowing':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has started following you.';
            break;
          case 'userFollowingRequest':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has requested to follow your travel and local activities.';
            break;
          case 'userFollowingResponse':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has accepted your follow request.';
            break;
          case 'photoComment':
            if (notification.data.type == 'travel-life') {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has commented on a photo in your <span class="avenir-heavy color-blue">On The Go Activity</span>';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has commented on a photo in your <span class="avenir-heavy color-blue">Local Life Activity</span>';
            }
            break;
          case 'photoMentionComment':
            if (notification.data.type == 'travel-life') {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has mentioned you in a comment';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has mentioned you in a comment';
            }
            break;
          case 'photoLike':
            if (notification.data.type == 'travel-life') {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has liked a photo in your <span class="avenir-heavy color-blue">On The Go Activity</span>';
            } else {
              notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has liked a photo in your <span class= "avenir-heavy color-blue">Local Life Activity</span>';
            }
            break;
          case 'userBadge':
            notification.notifyString = 'Congratulations! You have moved from <span class="avenir-heavy color-blue">(FROM)</span> to <span class="avenir-heavy color-blue">(TO)</span> . <br>Hope you enjoy your status and grow in your journeys.';
            break;
          case 'journeyAccept':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has accepted your request to join the <span class="avenir-heavy color-blue">On The Go Activity</span> -<span class ="color-pink avenir-heavy">' + notification.data.name + '</span>';
            break;
          case 'journeyReject':
            notification.notifyString = '<span class="avenir-heavy color-blue">' + notification.userFrom.name + '</span> has rejected your request to join the <span class="avenir-heavy color-blue">On Go Activity</span> -' + '<span class ="color-pink avenir-heavy">' + notification.data.name + '</span>';
            break;
          default:
            break;
        }
      });
    };


    // PAGINATION FOR INFINITE SCROLL
    $scope.getNotification = function (pageNo) {
      $scope.notifyScroll.busy = false;
      NavigationService.notificationWeb({
        pagenumber: pageNo
      }, function (data) {
        if (data.data.length == 0) {
          $scope.notifyScroll.stopCallingApi = true;
        } else {
          _.each(data.data, function (newNoti) {
            $scope.notificationCard.push(newNoti);
          })
        }
        console.log(data, 'what is data');
        // $scope.notificationCard = data.data;
        makeNotifyString();
      });
    };
    $scope.getNotification($scope.pageNo);

    $scope.loadMoreNotification = function () {
      $scope.pageNo++;
      $scope.notifyScroll.busy = true;
      if ($scope.notifyScroll.stopCallingApi == false) {
        $scope.getNotification($scope.pageNo);
      };
    }
    // PAGINATION FOR INFINITE SCROLL END

    // ACCEPT JOURNEY FUNCTION
    $scope.acceptJourney = function (notifyOb) {
      console.log(notifyOb, "accept yeh kar");

      NavigationService.acceptJourneyNotify({
        uniqueId: notifyOb.data.journeyUnique,
        _id: notifyOb._id,
        inMiddle: notifyOb.data.inMiddle
      }, function (data) {
        // console.log(data,'accept ka jawab');
        $state.go('ongojourney', {
          id: urlSlug
        });
      });
    };
    // ACCEPT JOURNEY FUNCTION END
    // DECLINE JOURNEY FUNCTION
    $scope.declineJourney = function (notifyOb) {
      console.log(notifyOb, "decline yeh kar");

      NavigationService.declineJourneyNotify({
        uniqueId: notifyOb.data.journeyUnique,
        _id: notifyOb._id
      }, function (data) {
        console.log(data, 'decline ka jawab');
      });
    };
    // DECLINE JOURNEY FUNCTION END
    // End JOURNEY FUNCTION
    $scope.endJourney = function (notifyOb) {
      console.log(notifyOb, "journey end kar be");

      NavigationService.endJourneyNotify({
        _id: notifyOb.data._id,
        notifyId: notifyOb._id
      }, function (data) {
        console.log(data, 'end ka jawab');
      });
    };
    // END JOURNEY FUNCTION END
    // DECLINE END JOURNEY FUNCTION
    $scope.declineEndJourney = function (notifyOb) {
      console.log(notifyOb, "journey end decline yeh kar");

      NavigationService.declineJourneyNotify({
        _id: notifyOb._id,
        answeredStatus: "reject"
      }, function (data) {
        console.log(data, 'journey end decline ka jawab');
      });
    };
    // DECLINE END JOURNEY FUNCTION END
  })

  .controller('SearchresultCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    $scope.template = TemplateService.changecontent("search-result"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Search Results"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.pagenumber = 1;
    $scope.limit = 20;
    $scope.viewSearchedUser = [];
    $scope.viewSearchedItinerary = [];
    $scope.viewSearchedHashtag = [];
    $scope.viewSearchedCountry = [];
    $scope.viewSearchedCity = [];
    $scope.searchScroll = {
      busy: false,
      stopCallingApi: false,
      busyUser: false,
      busyItinerary: false,
      busyHash: false,
      busyCountry: false,
      busyCity: false,
      stopCallingApiUser: false,
      stopCallingApiItinerary: false,
      stopCallingApiHash: false,
      stopCallingApiCountry: false,
      stopCallingApiCity: false,
    };

    // change url
    $scope.searchresultoptions = {};
    $scope.searchresultoptions.active = "";
    $scope.viewTab = 1;
    $scope.searchedUrl = {};
    $scope.searchedUrl.name = $state.params.name;
    $scope.searchedUrl.searchText = $state.params.searchText;

    $scope.getSearch = function (searchText, pagenumber, limit, type) {
      $scope.searchScroll.busy = false;
      switch (type) {
        case 'search-traveller':
          NavigationService.getSearchUserData({
            search: searchText,
            pagenumber: pagenumber,
            limit: limit
          }, function (data) {
            if (data.data.length == 0) {
              $scope.searchScroll.stopCallingApi = true;
            } else {
              _.each(data.data, function (newData) {
                $scope.viewSearchedUser.push(newData);
              })
            }
            console.log($scope.viewSearchedUser, 'user');
          });
          break;
        case 'search-itinerary':
          $scope.searchScroll.busyItinerary = false;
          NavigationService.getSearchItineraryData({
            search: searchText,
            pagenumber: pagenumber,
            limit: limit
          }, function (data) {
            if (data.data.length == 0) {
              $scope.searchScroll.stopCallingApi = true;
            } else {
              _.each(data.data, function (newData) {
                $scope.viewSearchedItinerary.push(newData);
              })
            }
            console.log($scope.viewSearchedItinerary, 'itinerary');
          })
          break;
        case 'search-hashtag':
          NavigationService.getSearchHashData({
            search: searchText,
            pagenumber: pagenumber,
            limit: limit
          }, function (data) {
            if (data.data.length == 0) {
              $scope.searchScroll.stopCallingApi = true;
            } else {
              _.each(data.data, function (newData) {
                $scope.viewSearchedHashtag.push(newData);
              })
            }
            console.log($scope.viewSearchedHashtag, 'hashtag');
          })
          break;
        case 'search-country':
          NavigationService.getSearchCountryData({
            search: searchText,
            pagenumber: pagenumber,
            limit: limit
          }, function (data) {
            if (data.data.length == 0) {
              $scope.searchScroll.stopCallingApi = true;
            } else {
              _.each(data.data, function (newData) {
                $scope.viewSearchedCountry.push(newData);
              })
            }
            console.log($scope.viewSearchedCountry, 'country');
          })
          break;
        case 'search-city':
          NavigationService.getSearchCityData({
            search: searchText,
            pagenumber: pagenumber,
            limit: limit
          }, function (data) {
            if (data.data.length == 0) {
              $scope.searchScroll.stopCallingApi = true;
            } else {
              _.each(data.data, function (newData) {
                $scope.viewSearchedCity.push(newData);
              })
            }
            console.log($scope.viewSearchedCity, 'city');
          })
          break;
        default:

      }
    };
    // $scope.getCountrySearch = function(searchText,pagenumber,limit) {
    //   NavigationService.getSearchCountryData({
    //     search: searchText,
    //     pagenumber: pagenumber,
    //     limit: limit
    //   },function(data){
    //     $scope.viewSearchedCountry = data.data;
    //     console.log($scope.viewSearchedCountry,'country');
    //   })
    // }
    // $scope.getItinerarySearch = function(searchText,pagenumber,limit) {
    //   NavigationService.getSearchItineraryData({
    //     search: searchText,
    //     pagenumber: pagenumber,
    //     limit: limit
    //   },function(data){
    //     $scope.viewSearchedItinerary = data.data;
    //     console.log($scope.viewSearchedItinerary,'itinerary');
    //   })
    // }
    // $scope.getHashSearch = function(searchText,pagenumber,limit) {
    //   NavigationService.getSearchHashData({
    //     search: searchText,
    //     pagenumber: pagenumber,
    //     limit: limit
    //   },function(data){
    //     $scope.viewSearchedHashtag = data.data;
    //     console.log($scope.viewSearchedHashtag,'Hashtag');
    //   })
    // }
    // $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, $scope.searchedUrl.name);

    $scope.loadMoreSearch = function (searchType) {
      $scope.pagenumber++;
      $scope.searchScroll.busy = true;
      console.log($scope.pagenumber, 'page number');
      if ($scope.searchScroll.stopCallingApi == false) {
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, searchType);
      }
      console.log($scope.searchedUrl.searchText, 'text');
      console.log(searchType, 'name');
    };

    // tab change
    var allsearchresult = ["views/content/search/search-traveller.html", "views/content/search/search-itinerary.html", "views/content/search/search-hashtag.html", "views/content/search/search-country.html",
      "views/content/search/search-city.html",
      "views/content/search/search-travelagent.html"
    ];
    $scope.searchresult = {
      innerView: allsearchresult[0]
    };

    switch ($scope.searchedUrl.name) {
      case "search-traveller":
        $scope.searchresult.innerView = allsearchresult[0];
        $scope.searchresultoptions.active = "search-traveller";
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-traveller');
        break;
      case "search-itinerary":
        $scope.searchresult.innerView = allsearchresult[1];
        $scope.searchresultoptions.active = "search-itinerary";
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-itinerary');
        break;
      case "search-hashtag":
        $scope.searchresult.innerView = allsearchresult[2];
        $scope.searchresultoptions.active = "search-hashtag";
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-hashtag');
        break;
      case "search-country":
        $scope.searchresult.innerView = allsearchresult[3];
        $scope.searchresultoptions.active = "search-country";
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-country');
        break;
      case "search-city":
        $scope.searchresult.innerView = allsearchresult[4];
        $scope.searchresultoptions.active = "search-city";
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-city');
        break;
      case "search-travelagent":
        $scope.searchresult.innerView = allsearchresult[5];
        $scope.searchresultoptions.active = "search-travelagent";
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-travelagent');
        break;
      default:
        $scope.searchresult.innerView = allsearchresult[0];
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-traveller');
    }
    $scope.searchresultTraveller = true;
    $scope.getTab = function (view) {
      $scope.searchresult.innerView = allsearchresult[view];
      var url = "search-traveller";
      var active = "";
      $scope.pagenumber = 1;
      $scope.searchScroll.busy = false;
      $scope.searchScroll.stopCallingApi = false;
      console.log(view);
      switch (view) {
        case 0:
          url = "search-traveller";
          $scope.searchresultoptions.active = "search-traveller";
          $scope.searchresultTraveller = true;
          $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-traveller');
          break;
        case 1:
          url = "search-itinerary";
          $scope.searchresultoptions.active = "search-itinerary";
          $scope.searchresultTraveller = false;
          $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-itinerary');
          break;
        case 2:
          url = "search-hashtag";
          $scope.searchresultoptions.active = "search-hashtag";
          $scope.searchresultTraveller = false;
          $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-hashtag');
          break;
        case 3:
          url = "search-country";
          $scope.searchresultoptions.active = "search-country";
          $scope.searchresultTraveller = false;
          $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-country');
          break;
        case 4:
          url = "search-city";
          $scope.searchresultoptions.active = "search-city";
          $scope.searchresultTraveller = false;
          $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-city');
          break;
        case 5:
          url = "search-travelagent";
          $scope.searchresultoptions.active = "search-travelagent";
          $scope.searchresultTraveller = false;
          $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-travelagent');
          break;
        default:
          url = "search-traveller";
          $scope.searchresultoptions.active = "search-traveller";
          $scope.searchresultTraveller = true;
          $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-traveller');
      }
      console.log(url);
      $state.go("search-result", {
        name: url
      }, {
        notify: false
      });
    };
    // tab change end
  })

  .controller('ErrorCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    $scope.template = TemplateService.changecontent("404error"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("404 Error"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller('ComingSoonCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    $scope.template = TemplateService.changecontent("coming-soon"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Coming Soon"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })

  .controller('LoginFlowCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $interval) {
    $scope.template = TemplateService.changecontent("login-flow"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Login Flow"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userData = $.jStorage.get("oldUserData");
    console.log($scope.userData);

    var checktwitter = function (data, status) {
      var repdata = {};
      if (data.accessToken) {
        $interval.cancel(stopinterval);
        ref.close();
        $.jStorage.set("accessToken", data.accessToken);
        NavigationService.getProfile("", function (data) {
          if (data.data._id) {
            $.jStorage.set("isLoggedIn", true);
            $.jStorage.set("profile", data.data);
            var alreadyLoggedIn = data.data.alreadyLoggedIn;
            if (alreadyLoggedIn === true) {
              var slug = $.jStorage.get("activeUrlSlug");
              console.log(slug);
              if (slug === null || slug === "") {
                slug = $.jStorage.get("profile").urlSlug;
              }
              if ($.jStorage.get("history") === 'TravelBlog') {
                $state.go("blog");
              } else {
                $state.go("mylife", {
                  name: 'journey',
                  urlSlug: slug
                });
              }
            } else if (alreadyLoggedIn === false) {
              $state.go('mainpage');
            }
          } else {

          }
        }, function (err) {
          console.log(err);
        });
      }
    };

    var callAtIntervaltwitter = function () {
      NavigationService.getAccessToken(checktwitter, function (err) {
        console.log(err);
      });
    };

    var authenticatesuccess = function (stopinterval) {
      console.log("login window closed");
      $ionicLoading.hide();
      $interval.cancel(stopinterval);
    };

    $scope.socialLogin = function (loginTo) {
      ref = window.open(adminURL + "/user/" + loginTo, '_blank', 'location=no');
      console.log(ref);
      stopinterval = $interval(callAtIntervaltwitter, 2000);
      ref.onbeforeunload = function (e) {
        console.log("window closed");
        $interval.cancel(stopinterval);
        authenticatesuccess(stopinterval);
      };
    };
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
