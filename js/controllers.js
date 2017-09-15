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
var abc = {};

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
angular.module('phonecatControllers', ['templateservicemod', 'mylife', 'ongojourney', 'locallife', 'itinerary', 'agent', 'commontask', 'anchorSmoothScroll', 'activity', 'pastjourney','infinite-scroll', 'navigationservice', 'travelibroservice', 'cfp.loadingBar', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'angularFileUpload', 'ngImgCrop', 'mappy', 'wu.masonry', 'ngScrollbar', 'ksSwiper', 'ui.tinymce', 'ngFadeImgLoading', 'internationalPhoneNumber', 'ngIntlTelInput'])
.run(['$anchorScroll', function ($anchorScroll) {
        $anchorScroll.yOffset = 50; // always scroll by 50 extra pixels
    }])

.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, cfpLoadingBar, $location) {
    //Used to name the .html file
    cfpLoadingBar.start();
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = "TraveLibro - Your Travel Life | Local Life";
    $scope.navigation = NavigationService.getnav();
    var swiper = {};
    $scope.accessToken = $.jStorage.get("accessToken");
    $scope.bookingLink = function () {
        window.location.href = "https://travelibro.com/bookings/";
    }
    $scope.videoPlay = [{
        videourl: "",
        vimeourl: "",
        imgurl: "img/libro-home/transparent-home.png",
        id: "0"
    }, {
        videourl: "img/libro-home/videos/travellife.mp4",
        vimeourl: "https://player.vimeo.com/video/207906141",
        imgurl: "img/libro-home/videos/travel-life.jpg",
        id: "1"
    }, {
        videourl: "img/libro-home/videos/locallife.mp4",
        vimeourl: "https://player.vimeo.com/video/207905802",
        imgurl: "img/libro-home/videos/local-life.jpg",
        id: "2"
    }, {
        videourl: "img/libro-home/videos/mylife.mp4",
        vimeourl: "https://player.vimeo.com/video/207906010",
        imgurl: "img/libro-home/videos/my-life.jpg",
        id: "3"
    }, {
        videourl: "",
        vimeourl: "",
        imgurl: "img/libro-home/transparent-home.png",
        id: "4"
    }];
    abc = $scope;
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
        $timeout(function () {
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
        if (length === 0) {
            $('.fullpage').fullpage({
                //Navigation
                onLeave: function (index, nextIndex, direction) {
                    $timeout(function () {
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
                        swiper.slideTo(nextIndex - 1);
                        if ($(window).width() >= 767) {
                            for (i = 1; i < 4; i++) {
                                if (i == nextIndex - 1) {
                                    $('#video' + i).get(0).load();
                                    $('#video' + i).get(0).play();
                                } else {
                                    $('#video' + i).get(0).pause();
                                }
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


    }, 500);

    $scope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            $('body').addClass('fp-');
            $scope.changePage($stateParams.id);
        }, 1000);
    });
    cfpLoadingBar.complete();
    $scope.audioStatus = {
        on: true
    }
    $scope.muteVolume = function () {
        for (i = 1; i <= 3; i++) {
            if ($("#video" + i)[0].muted) {
                $("#video" + i)[0].muted = false;
                $scope.audioStatus = {
                    on: true
                }
            } else {
                $("#video" + i)[0].muted = true;
                $scope.audioStatus = {}
            }
        }
    }
    $timeout(function () {
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1)) {
            $(".download-app").addClass("hide");
    }
}, 200);
    $scope.customLink = function () {
        window.open("https://play.google.com/store/apps/details?id=com.ascra.app.travellibro");
    };
})

.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, Agent, cfpLoadingBar, $timeout, $uibModal, $interval, $state, $http) {
    //Used to name the .html file
    $scope.userData = $.jStorage.get("profile");
    $scope.template = TemplateService.changecontent("login");
    $scope.menutitle = NavigationService.makeactive("Login");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.headerfixed = "fixed-header";
    $scope.animationsEnabled = true;
    $scope.formData = {};
    $scope.agentSignup = false;
    $scope.alreadyExist = false;
    $scope.password = {};

    $scope.initialiseError = function () {
        $scope.showError = {
            'show': false,
            'msg': ''
        }
    }
    $scope.initialiseError();

    $scope.bookingLink = function () {
        window.location.href = "https://travelibro.com/bookings/";
    }
    if (typeof $.fn.fullpage.destroy == 'function') {
        $.fn.fullpage.destroy('all');
    }

    $(window).load(function () {
        // console.log("tooltip");
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
    var setLoginVariables = function (data, type) {
        $.jStorage.set("accessToken", data.accessToken);
        if (data.type == "TravelAgent") {
            NavigationService.getAgentsProfile("", function (data1) {
                if (data1.data._id && data1.data.type == 'TravelAgent') {
                    $.jStorage.set("isLoggedIn", true);
                    $.jStorage.set("profile", data1.data);
                    var alreadyLoggedIn = data1.data.alreadyLoggedIn;

                    function callSetting() {
                        if (alreadyLoggedIn === true) {
                            var slug = $.jStorage.get("activeUrlSlug");
                            if (slug === null || slug === "") {
                                slug = $.jStorage.get("profile").urlSlug;
                            }
                            if ($.jStorage.get("url") && $.jStorage.get("url") !== "") {
                                window.location = $.jStorage.get("url") + "?accessToken=" + $.jStorage.get("accessToken");
                            } else {
                                if ($.jStorage.get("profile").type == "User") {
                                    $state.go("mylife", {
                                        name: 'journey',
                                        urlSlug: slug
                                    });
                                } else {
                                    $state.go("agent-home", {
                                        urlSlug: slug
                                    });
                                }
                            }
                        } else {
                            if ($.jStorage.get("profile").type == "User") {
                                $state.go('mainpage');
                            } else if ($.jStorage.get("profile").type == "TravelAgent") {
                                $state.go('agent-login');
                            }
                        }
                    }
                    if (data.loginType) {
                        var modalPas = $uibModal.open({
                            templateUrl: "views/modal/changePassword.html",
                            animation: true,
                            scope: $scope,
                            windowClass: "report-modal",
                            backdrop: "static"
                        });
                        $scope.changePassword = function () {
                            if ($scope.password.passChange) {
                                if ($scope.password.newPassword === $scope.password.confirmPassword) {
                                    delete $scope.password.confirmPassword;
                                    Agent.changePassword($scope.password, function (data) {
                                        if (data.value === true) {
                                            modalPas.close();
                                            callSetting();
                                        } else {
                                            $scope.password.status = true;
                                            $scope.password.msg = "*Old Password Mismatch.";
                                            $timeout(function () {
                                                $scope.password.status = false;
                                            }, 10000);
                                        }
                                    });
                                } else {
                                    $scope.password.status = true;
                                    $scope.password.msg = "*New Password Mismatch.";
                                    $timeout(function () {
                                        $scope.password.status = false;
                                    }, 10000);
                                }
                            } else {
                                callSetting();
                            }
                        }
                    } else {
                        callSetting();
                    }
                } else {}
            }, function (err) {
                console.log(err);
            });
} else if (data.type == "User") {
    NavigationService.getProfile("", function (data1) {
        if (data1.data._id) {
            $.jStorage.set("isLoggedIn", true);
            $.jStorage.set("profile", data1.data);
            var alreadyLoggedIn = data1.data.alreadyLoggedIn;
            console.log(alreadyLoggedIn, "alereadyLoggedin");
            if (alreadyLoggedIn === true) {
                var slug = $.jStorage.get("activeUrlSlug");
                console.log(slug);
                if (slug === null || slug === "") {
                    slug = $.jStorage.get("profile").urlSlug;
                }
                if ($.jStorage.get("url") && $.jStorage.get("url") !== "") {
                    window.location = $.jStorage.get("url") + "?accessToken=" + $.jStorage.get("accessToken");
                } else {
                    if ($.jStorage.get("profile").type == "User") {
                        $state.go("mylife", {
                            name: 'journey',
                            urlSlug: slug
                        });
                    } else {
                        $state.go("agent-login", {
                            urlSlug: slug
                        });
                    }
                }
            } else {
                if ($.jStorage.get("profile").type == "User") {
                    $state.go('mainpage');
                } else {
                    $state.go('agent-login');
                }
            }
        } else {}
    }, function (err) {
        console.log(err);
    });
};
}

var ref = "";
    var checktwitter = function (data, status) { //for getting accessToken
        var repdata = {};
        if (ref.closed) {
            $interval.cancel(stopinterval);
        } else {
            if (data.accessToken) {
                ref.close();
                $interval.cancel(stopinterval);
                setLoginVariables(data);
            } else {
                console.log(data);
            }
        }
    };

    var callAtIntervaltwitter = function () {
        NavigationService.getAccessToken(checktwitter, function (err) {
            console.log(err);
        });
    };


    $scope.socialLogin = function (loginTo) {
        ref = window.open(adminURL + "/user/" + loginTo, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervaltwitter, 2000);
    };

    $scope.submit = function () {
        console.log("sndasdjsdjsa", $scope.formData);
        NavigationService.oldUsersLogin($scope.formData, function (succ1) {
            if (succ1.value) {
                console.log(succ1);
                NavigationService.getAccessToken(function (succ2) {
                    console.log(succ2);
                    // $.jStorage.set("accessToken", succ2.accessToken);
                    if (succ2.accessToken && succ2.accessToken !== "") {
                        NavigationService.getProfile("", function (succ3) {
                            if (succ3.data && succ3.data.type == 'User') {
                                $.jStorage.set("accessToken", succ2.accessToken);
                                $.jStorage.set("isLoggedIn", false);
                                $.jStorage.set("oldUserData", succ3.data);
                                $.jStorage.set("qualifiedForLoginFlow", true);
                                // $state.go("login-flow", {
                                //   'accessToken': succ2.accessToken
                                // });
                                $state.go("login-flow");
                                // window.location = "http://travelibro.net/blog"
                            } else {
                                $scope.showError.show = true;
                                $scope.showError.msg = 'Theres Another Page For Partners';
                            }
                        }, function (err3) {
                            console.log(err3);
                        });
                    } else {

                    }
                }, function (err2) {
                    console.log(err2);
                });
            } else {
                // console.log(data);
                $scope.showError.show = true;
                $scope.showError.msg = 'Incorrect Email or Password entered';
                //things to do when user email or password is wrong
            }
        });
    };

    //Agent Section
    // AGENT LOGIN SIGN UP TOGGLE
    $scope.toggleAgentSign = function () {
        if ($scope.agentSignup == false) {
            $scope.agentSignup = true;
        } else {
            $scope.agentSignup = false;
        }
    };
    // AGENT LOGIN SIGN UP TOGGLE END
    $scope.agentLoginForm = {};
    $scope.agentSignUpForm = {};
    $scope.registerAsAgent = function (formData) {
        NavigationService.registerAsAgent(formData, function (data) {
            if (data.value) {
                // $scope.alreadyExist = false;
                NavigationService.getAccessToken(setLoginVariables, function (err) {
                    console.log(err);
                });
            } else {
                // $scope.alreadyExist = true;
                $scope.showError.show = true;
                if (data.data == "Registered as User") {
                    $scope.showError.msg = "Email already registered as a user. Register with an alternate email address to login as Partner";
                } else {
                    $scope.showError.msg = "Email already exists as Partner";
                }
                $timeout(function () {
                    $scope.showError = {
                        show: "",
                        msg: ""
                    };
                }, 10000);
            }

        });
    }
    $scope.loginAsAgent = function (formData) {
        NavigationService.loginAsAgent(formData, function (data) {
            if (data.value) {
                NavigationService.getAccessToken(setLoginVariables, function (err) {
                    console.log(err);
                });
            } else {
                $scope.showError.show = true;
                $scope.showError.msg = "Incorrect Email or Password";
                $timeout(function () {
                    $scope.showError = {
                        show: "",
                        msg: ""
                    };
                }, 10000);
            }
        });
    };
    if ($.jStorage.get("profile") && $.jStorage.get("profile").urlSlug) {
        if ($.jStorage.get("profile").type === "User") {
            $state.go("mylife", { urlSlug: $.jStorage.get("profile").urlSlug });
        } else {
            $state.go("agent-home-without", { urlSlug: $.jStorage.get("profile").urlSlug });
        }
    }
    //Agent Section End
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
    $scope.userData = {};
    $scope.resend = false;
    $scope.showErr = {
        status: "",
        msg: ""
    };
    $scope.editUserData = function (obj) {
        NavigationService.sendOtpToReset(obj.email, function (data) {
            if (data.value) {
                $scope.resend = true;
                $scope.showErr = {
                    status: true,
                    msg: "Email sent successfully."
                };
                $timeout(function () {
                    $scope.showErr = {
                        status: "",
                        msg: ""
                    };
                }, 10000);
                $scope.userData = {};
            } else {
                $scope.showErr = {
                    status: false,
                    msg: "Email not registered."
                };
                $timeout(function () {
                    $scope.showErr = {
                        status: "",
                        msg: ""
                    };
                }, 10000);
            }
        });
    };
})

.controller('ContactCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("contact");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = "Contact Us - TraveLibro";
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    if (typeof $.fn.fullpage.destroy == 'function') {
        $.fn.fullpage.destroy('all');
    }


})

// .controller('BookingCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
//   //Used to name the .html file

//   console.log("Testing Consoles");

//   $scope.template = TemplateService.changecontent("booking");
//   $scope.menutitle = NavigationService.makeactive("Bookings");
//   TemplateService.title = $scope.menutitle;
//   $scope.navigation = NavigationService.getnav();
//   $scope.animationsEnabled = true;
//   if (typeof $.fn.fullpage.destroy == 'function') {
//     $.fn.fullpage.destroy('all');
//   }
//   $scope.bookingnav = [{
//     name: "Flights",
//     classis: "active",
//     link: "http://flights.travelibro.com/en-GB/flights/#/result?originplace=&destinationplace=",
//     target: "_blank"
//   }, {
//     name: "Hotels",
//     classis: "active",
//     link: "https://travelibro.com/bookings/hotels",
//     target: "_self"
//   }, {
//     name: "Vacation Rentals",
//     classis: "active",
//     link: "https://travelibro.com/bookings/vacation-rentals",
//     target: "_self"
//   }, {
//     name: "Homestays",
//     classis: "active",
//     link: "https://travelibro.com/bookings/home-stays",
//     target: "_self"
//   }, {
//     name: "Car Rentals",
//     classis: "active",
//     link: "https://flights.travelibro.com/en-GB/carhire/#/result?originplace=&destinationplace=",
//     target: "_blank"
//   }, {
//     name: "Tours & Excursions",
//     classis: "active",
//     link: "https://travelibro.com/bookings/tours-and-excursions",
//     target: "_self"
//   }]
// })
.controller('AdvertiseCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("advertise");
    $scope.menutitle = NavigationService.makeactive("Advertise");
    TemplateService.title = "Advertise With Us - TraveLibro";
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    if (typeof $.fn.fullpage.destroy == 'function') {
        $.fn.fullpage.destroy('all');
    }
})

.controller('MainPageCtrl', ['$scope', 'TemplateService', 'NavigationService', 'cfpLoadingBar', '$timeout', '$http', '$state', 'FileUploadService', 'FileUploader', 'DataUriToBlob', '$window', '$filter', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $http, $state, FileUploadService, FileUploader, DataUriToBlob, $window, $filter) {
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
    $scope.myImage = '';
    $scope.showUserError = "";
    $scope.showImageLoader = false;
    $scope.viewBlob = false;
    if ($scope.profile && $scope.profile.profilePicture) {
        NavigationService.getImageFromServer($scope.profile.profilePicture, function (data) {
            // $scope.myImage=data;
            // $scope.myImage = $window.URL.createObjectURL(new Blob([data], {
            //     type: 'image/png'
            // }));
            $scope.myImage = new Blob([data]);
            console.log($scope.myImage);
        });
    } else {
        $state.go('login');
    }
    if ($scope.profile) {
        $scope.userData.gender = $scope.profile.gender;
    } else {
        $state.go('login');
    }
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
        NavigationService.getAllCities({
            "search": searchCity
        }, getAllCities, function (err) {
            console.log(err);
        });
    };
    //End-Of get all the cities from database


    $timeout(function () {
        document.getElementById('fileInput1').onchange = function () {}
    });
    $scope.fileName = null;
    $scope.uploadFile = function (data, userData, ppSelected) {
        // Base64 to Blob
        if (ppSelected) {
            var imageBase64 = data;
            var blob = DataUriToBlob.dataURItoBlob(imageBase64, 'image/png');
            // Blob to File
            // var file = new File([blob], $scope.fileName + '.png');
            // var file = new File([blob], $scope.fileName.split('.')[0] + '.png');
            // console.log(file);
            // File to FormData
            var formData = new FormData();
            console.log(formData, "before appending");
            formData.append('file', blob, "abcd.png");
            console.log(formData, "after appending");
            $scope.showImageLoader = true;
            $scope.saveUserData($scope.userData);
            NavigationService.uploadFile(formData, function (response) {
                if (response.value) {
                    $scope.showImageLoader = false;
                    NavigationService.saveUserData({ profilePicture: response.data[0] }, function (response) {
                        if (response.value) {
                            console.log("Uploaded");
                        } else {
                            console.log("Error");
                        }
                    });
                } else {
                    toastr.warning('Error Uploading Image!');
                    setTimeout(function () {
                        $scope.showImageLoader = false;
                    }, 12000);
                }
            });
        } else {
            $scope.userData = _.omit($scope.userData, ['profilePicture']);
            $scope.saveUserData($scope.userData);
            setTimeout(function () {
                $scope.showImageLoader = false;
            }, 12000);
        }
    };

    $scope.removePhoto = function () {
        $scope.userData = _.omit($scope.userData, ['profilePicture']);
        angular.element("input[type='file']").val(null);
        $scope.fileName = null;
        console.log($scope.userData);
        $scope.showImage.val = false;
        $scope.viewBlob = false;
        $scope.uploadme.src = '';
        console.log($scope.uploadme.src);
    };


    var saveDataCallback = function (data, status) {
        console.log(data, 'what is data', status, 'status', 'first 3 steps');
        if (data.value === true) {
            var profile = $.jStorage.get("profile");
            profile.urlSlug = $scope.userData.urlSlug;
            $.jStorage.set('profile', profile);
            console.log($scope.userData.urlSlug, 'user data', $.jStorage.get("profile").urlSlug, 'j stoage');
            console.log(data);
            NavigationService.getProfile($.jStorage.get("profile").urlSlug, function (data, status) {
                if (data.data._id) {
                    $.jStorage.set("isLoggedIn", true);
                    $.jStorage.set("profile", data.data);
                    $.jStorage.set("qualifiedForHoliday", null);
                    $state.go("mylife", {
                        // name: 'journey',
                        urlSlug: $.jStorage.get("profile").urlSlug
                    });
                } else {
                    $.jStorage.flush();
                }
            }, function (err) {
                console.log(err);
            });
            // $window.location.reload();
            // $.jStorage.set('qualifiedForHoliday', true);
            // $state.go('holiday');
            // $state.go("mylife",{
            //   urlSlug: $.jStorage.get("profile").urlSlug
            // });
        } else {
            console.log(data);
            $scope.showUserError = "error-username";
            $('html, body').animate({
                scrollTop: $(".usererror").offset().top - 220
            });
        }
    };

    $scope.saveUserData = function (userData) {
        console.log(userData, 'what is user data');
        var str = userData.homeCity;
        var arr = str.split(",");
        userData.homeCity = arr[0];
        userData.name = $scope.profile.name;
        userData.urlSlug = $scope.profile.urlSlug;
        NavigationService.saveUserData(userData, saveDataCallback, function (err) {
            console.log(err);
        });
    };

    // $scope.myImage = '';

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
                $scope.fileName = file.name;
                console.log($scope.fileName);
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
        myFile: "myFile"
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
        caption: "Islands & Beaches",
        storeCaption: "Islands & Beaches",
    }, {
        img: "img/city.png",
        caption: "Cities",
        storeCaption: "Cities"
    }, {
        img: "img/safari.png",
        caption: "Safaris",
        storeCaption: "Safaris"
    }, {
        img: "img/mountain.png",
        caption: "Mountains",
        storeCaption: "Mountains"
    }, {
        img: "img/cruise.png",
        caption: "Cruises",
        storeCaption: "Cruises"
    }, {
        img: "img/countryside.png",
        caption: "Countrysides",
        storeCaption: "Countrysides"
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
        caption1: "Luxury",
        storeCaption: "Luxury"
    }, {
        img: "img/backpacking.png",
        caption1: "Backpacking",
        storeCaption: "Backpacking"
    }, {
        img: "img/greentravelling.png",
        caption1: "Green",
        caption2: "Travelling",
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
        caption1: "Festival",
        storeCaption: "Festival"
    }];

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
                    console.log(data, 'holiday wala data');
                    if (data.data._id) {
                        $.jStorage.set("isLoggedIn", true);
                        $.jStorage.set("profile", data.data);
                        $.jStorage.set("qualifiedForHoliday", null);
                        $state.go("mylife", {
                        // name: 'journey',
                        urlSlug: $.jStorage.get("profile").urlSlug
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

.controller('TripSummaryCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $stateParams, OnGoJourney, $state) {
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

    // route to on go journey
    $scope.routeOngo = function (trip) {
        $state.go('ongojourney', {
            'id': trip.urlSlug,
            'urlSlug': trip.user.urlSlug
        });
    }
        // route to on go journey end

    })

.controller('OnGoJourneyCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $interval, OnGoJourney, LikesAndComments, $state, $stateParams, $filter, $http) {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var journeyInfoStrip = $('.journey-info-strip').outerHeight();

    if ($.jStorage.get("isLoggedIn")) {
        $scope.isLoggedIn = true;
        if ($stateParams.urlSlug == $.jStorage.get("profile").urlSlug) {
            $scope.isMine = true;
        } else {
            $scope.isMine = false;
        }
    } else {
        $scope.isLoggedIn = false;
        $scope.isMine = false;
    }


    function calcWidth() {
        var width = $(window).width();
        var percent = 40;
        var newPadding = width * percent / 100;
        var newCarHolderWidth = (newPadding - 30);
        var newZoomCarHolder = newCarHolderWidth / 550;

        $scope.mapJourneyCss = {
            "padding-left": newPadding
        };
        $scope.cardHolderCss = {
            zoom: newZoomCarHolder
        }
        console.log(newPadding, width);
    };

    // $(window).resize(function(){

    // });
    if ($(window).width() > 991) {
        calcWidth();
    }
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
        TemplateService.title = $scope.journey.name + " - Travel Life | TraveLibro";
        var postsWithLatLng = [];
        postsWithLatLng = _.filter($scope.journey.post, 'latlong');
        _.each(postsWithLatLng, function (n, $index) {
            if (n && n.latlong && n.latlong.lat && n.latlong.long) {
                centers[$index] = {
                    "lat": parseFloat(n.latlong.lat),
                    "lng": parseFloat(n.latlong.long)
                };
            } else {}
        });
        if (journeys && journeys.location && journeys.location.lat) {
            var obj = {
                "lat": parseFloat(journeys.location.lat),
                "lng": parseFloat(journeys.location.long)
            }
            centers.unshift(obj);
        } else {}
        console.log(centers);
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

            var step = 0;
            var numSteps = 100; //Change this to set animation resolution
            var lineSymbol = {
                path: 'M 0,-1 0,1',
                strokeOpacity: 0,
                scale: 3
            };
            // Grey static dotted - polylines starts here
            travelPath = new google.maps.Polyline({
                path: centers,
                geodesic: true,
                strokeColor: '#D3D3D3',
                strokeOpacity: 0,
                strokeWeight: -3,
                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '20px'
                }],
            });
            travelPath.setMap(map);
            // Grey static polylines ends here

            var myVar = setInterval(myTimer, 1000);

            function myTimer() {
                if (centers.length != 0) {
                    _.each(centers, function (n, index) {
                        setMarker(null, n, null, index + 1);
                    });
                    if ($scope.journey && $scope.journey.location && $scope.journey.location.lat) {
                        setMarker("green-marker", centers[0], null, 1);
                        markers[1].setMap(map);
                        markers[1].setIcon("img/maps/green-marker.png");
                    }
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
                        // strokeOpacity: 1, --for continuous line
                        //   strokeWeight: 3,
                        strokeOpacity: 0, //for dotted lines
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
                console.log(i);
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
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;
    $scope.getCommentsData = function (ongo) {
        console.log(ongo, 'ongo');
        $scope.post = ongo;
        $scope.previousId;
        $scope.viewCardLike = false;
        $scope.postScrollData.type = ongo.type;
        $scope.postScrollData._id = ongo._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != $scope.post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            $scope.journey.journeyHighLight = ongo._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(ongo.type, $scope.post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(ongo.type, $scope.post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = $scope.post._id;
    };
    $scope.getLikesData = function (ongo) {
        console.log('post ka click');
        $scope.postScrollData.type = ongo.type;
        $scope.postScrollData._id = ongo._id;
        $scope.viewCardComment = false;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
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
            LikesAndComments.getLikes(ongo.type, ongo._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(ongo.type, ongo._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = ongo._id;
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.journey.journeyHighLight = "";
        $scope.getCard = "";
        $scope.comment.text = "";
        $scope.showLikeShow = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.likePageNumber = 1;
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.viewList = false;
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 100);

    };
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
    // $scope. = function () {
    //   if (!($.jStorage.get("isLoggedIn"))) {
    //     $state.go('login');
    //   } else {
    //     if ($scope.viewSocialShare == false) {
    //       $scope.viewSocialShare = true;
    //     } else {
    //       $scope.viewSocialShare = false;
    //     }
    //   }
    // };
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
    //   //alert();
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
    $scope.getslide = "travel-out";
    $scope.openTravelTrip = function () {
        if ($scope.getslide == "travel-in") {
            $scope.getslide = "travel-out";
        } else {
            $scope.getslide = "travel-in";
        }
    };
    // $scope.followFollowing = function (user) {
    //   if (user.following) {
    //     LikesAndComments.unFollowUser(user._id, function (data) {
    //       if (data.value) {
    //         user.following = false;
    //       } else {
    //         console.log(data.data);
    //       }
    //     })
    //   } else {
    //     LikesAndComments.followUser(user._id, user.name, function (data) {
    //       console.log(data);
    //       if (data.value) {
    //         user.following = true;
    //       } else {
    //         console.log(data.data);
    //       }
    //     });
    //   }
    // }

    // $scope.followFollowing = function (user) {
    //   console.log("from ongojourney");
    //   LikesAndComments.followUnFollow(user, function (data) {
    //     if (data.value) {
    //       user.following = data.data.responseValue;
    //     } else {
    //       console.log("error updating data");
    //     }
    //   });
    // }


})

.controller('PopularBloggerCtrl', function ($scope, $state, TemplateService, NavigationService, LikesAndComments, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-blogger");
    $scope.menutitle = NavigationService.makeactive("Popular Bloggers");
    TemplateService.title = "Popular Bloggers - TraveLibro";
    $scope.navigation = NavigationService.getnav();

    // POPULAR BLOGGER INTEGRATION START
    $scope.scroll = {
        busy: false,
        stopCallingApi: false
    };
    $timeout(function () {
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1)) {
            $(".download-app").addClass("hide");
    }
}, 200);
    $scope.customLink = function () {
        window.open("https://play.google.com/store/apps/details?id=com.ascra.app.travellibro");
    };

    $scope.popularBloggerData = [];
    $scope.pagenumber = 1;
    setInterval(function () {
        $scope.paginationLoader = TemplateService.paginationLoader;
    }, 300);
    $scope.getPopularBlogger = function (pageNo) {
        NavigationService.popularBlogger({
            pagenumber: pageNo
        }, function (data) {
            $scope.scroll.busy = false;
            if (data.data.length == 0) {
                $scope.scroll.stopCallingApi = true;
            } else {
                _.each(data.data, function (newArr) {
                    $scope.popularBloggerData.push(newArr);
                })
            }
        });
    };
    $scope.getPopularBlogger($scope.pagenumber);

    $scope.getMoreBlogger = function () {
        // $scope.pagenumber++;
        console.log($scope.pagenumber, 'pagenum yo');
        $scope.scroll.busy = true;
        if ($scope.scroll.stopCallingApi == false) {
            $scope.getPopularBlogger(++$scope.pagenumber);
        }
    };
    // POPULAR BLOGGER INTEGRATION END
    // followFollowing  Function
    $scope.followFollowing = function (user) {
        console.log("from popularBloggerData");
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }
        // followFollowing  Function END

    // OPTIONS NG CLICK FUNCTION
    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };
    // OPTIONS NG CLICK FUNCTION END

    // THANK YOU MODAL
    $scope.openThankYouModal = function () {
        $uibModal.open({
            templateUrl: "views/modal/report.html",
            animation: true,
            scope: $scope,
            windowClass: "report-modal"
        });
    };
    // THANK YOU MODAL END
})

.controller('PopularAgentCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-agent");
    // $scope.template = TemplateService.changecontent("coming-soon");
    $scope.menutitle = NavigationService.makeactive("Popular Agents");
    TemplateService.title = "Popular Agents - TraveLibro";
    $scope.navigation = NavigationService.getnav();
    $scope.pageNumber = 1;
    $scope.scrollAgent = {};
    $scope.scrollAgent.busy = false;
    $scope.scrollAgent.stopCallingApi = false;

    // get popular agent
    $scope.allAgent = [];
    $scope.viewPopularAgent = function (pageNo) {
        $scope.scrollAgent.busy = false;
        NavigationService.getPopularAgent({
            'pagenumber': pageNo
        }, function (data) {
            if (data.value == true) {
                if (data.data.length === 0) {
                    $scope.scrollAgent.stopCallingApi = true;
                } else {
                    _.each(data.data, function (agentArray) {
                        $scope.allAgent.push(agentArray);
                    });
                    console.log($scope.allAgent, 'all agent value');
                }
            }
        });
    };
    $scope.viewPopularAgent($scope.pageNumber);
    // get popular agent end
    // get more popular agents
    $scope.getMoreAgents = function () {
        $scope.scrollAgent.busy = true;
        if ($scope.scrollAgent.stopCallingApi == false) {
            $scope.pageNumber++;
            $scope.viewPopularAgent($scope.pageNumber);
        }
    }
        // get more popular agents end
    })

.controller('PopularItineraryCtrl', function ($scope, $state, TemplateService, LikesAndComments, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-itinerary");
    $scope.menutitle = NavigationService.makeactive("Popular Itineraries");
    TemplateService.title = "Popular Itineraries - TraveLibro";
    $scope.navigation = NavigationService.getnav();

    $scope.userData = $.jStorage.get("profile");
    $scope.scroll = {
        busy: false,
        stopCallingApi: false
    };
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;

    $timeout(function () {
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1)) {
            $(".download-app").addClass("hide");
    }
}, 200);
    $scope.customLink = function () {
        window.open("https://play.google.com/store/apps/details?id=com.ascra.app.travellibro");
    };
    $scope.pagenumber = 1;
    $scope.popularIternaryData = [];
    // setInterval(function(){
    //   $scope.paginationLoader=TemplateService.paginationLoader;
    // },300);
    $scope.getPopularIternary = function (pageNo) {
        NavigationService.popularItinerary({
            pagenumber: pageNo
        }, function (data) {
            $scope.scroll.busy = false;
            if (data.data.length == 0) {
                $scope.scroll.stopCallingApi = true;
            } else {
                _.each(data.data, function (newArr) {
                    $scope.popularIternaryData.push(newArr);
                });
            }
        });
    };
    $scope.getPopularIternary($scope.pagenumber);

    $scope.getMoreItinerary = function () {
        $scope.scroll.busy = true;
        if ($scope.scroll.stopCallingApi == false) {
            $scope.getPopularIternary(++$scope.pagenumber);
        }
    };

    // COMMENT LIKE SECTION FUNCTIONS
    $scope.likeUnlikeActivity = function (post) {
        console.log(post);
        post.likeDone = !post.likeDone;
        if (post.likeDone) {
            if (post.likeCount == undefined) {
                post.likeCount = 1;
            } else {
                post.likeCount = post.likeCount + 1;
            }
            LikesAndComments.likeUnlike(post.type, "like", post.uniqueId, post._id, null)
        } else {
            post.likeCount = post.likeCount - 1;
            LikesAndComments.likeUnlike(post.type, "unlike", post.uniqueId, post._id, null)
        }
    };

    $scope.getLikes = function (post) {
        console.log(post);
        LikesAndComments.getLikes(post.type, post._id, 1, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };

    $scope.listLikesDropDown = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };

    $scope.getCommentsData = function (post) {
        console.log(post);
        $scope.previousId;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.post = post;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            console.log($scope.listOfComments);
            $scope.postScrollData.viewList = true;
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = post._id;
    };

    console.log($scope.scrollLike, 'scroll like');
    $scope.getLikesData = function (post) {
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        };
        if ($scope.previousLikeId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            // LikesAndComments.getLikes(post.type, post._id, $scope.likePageNumber, callback);
            LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = post._id;
    };


    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 500);
    };

    // COMMENT LIKE SECTION FUNCTIONS END
    // route to itinerary
    $scope.routeItinerary = function (post) {
        console.log(post, 'user');
        if (post.type == 'quick-itinerary') {
            $state.go('userquickitinerary', {
                'id': post.urlSlug,
                'urlSlug': post.user.urlSlug
            });
        } else {
            $state.go('userdetailitinerary', {
                'id': post.urlSlug,
                'urlSlug': post.user.urlSlug
            });
        }
    }
        // route to itinerary end
        // followFollowing  Function
        $scope.followFollowing = function (user) {
            console.log("from popularBloggerData");
            LikesAndComments.followUnFollow(user, function (data) {
                if (data.value) {
                    user.following = data.data.responseValue;
                } else {
                    console.log("error updating data");
                }
            });
        }
        // followFollowing  Function END

    // other itineraries main end

    // OPTIONS NG CLICK FUNCTION
    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };
    // OPTIONS NG CLICK FUNCTION END

    // THANK YOU MODAL
    $scope.openThankYouModal = function () {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            $uibModal.open({
                templateUrl: "views/modal/report.html",
                animation: true,
                scope: $scope,
                windowClass: "report-modal"
            });
        }
    };
    // THANK YOU MODAL END

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        console.log($scope.shareUrl, 'share ka url');
        shareModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/sharing.html",
            scope: $scope
        });
    }
        // sharing local life modal end

    })

.controller('PopularJourneyCtrl', function ($scope, $state, TemplateService, LikesAndComments, NavigationService, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("popular-journey");
    $scope.menutitle = NavigationService.makeactive("Popular Journeys");
    TemplateService.title = "Popular Journeys - TraveLibro";
    $scope.navigation = NavigationService.getnav();
    $scope.userData = $.jStorage.get("profile");
    $timeout(function () {
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1)) {
            $(".download-app").addClass("hide");
    }
}, 200);
    $scope.customLink = function () {
        window.open("https://play.google.com/store/apps/details?id=com.ascra.app.travellibro");
    };
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;
    // POPULAR JOURNEY INTEGRATION START
    $scope.scroll = {
        busy: false,
        stopCallingApi: false,
    };
    $scope.pagenumber = 1;
    $scope.popularJourneyData = [];
    setInterval(function () {
        $scope.paginationLoader = TemplateService.paginationLoader;
    }, 300);
    $scope.getPopularJourney = function (pageNo) {
        NavigationService.popularJourney({
            pagenumber: pageNo
        }, function (data) {
            $scope.scroll.busy = false;
            if (data.data.length == 0) {
                $scope.scroll.stopCallingApi = true;
            } else {
                _.each(data.data, function (newArr) {
                    $scope.popularJourneyData.push(newArr);
                    newArr.user.following = newArr.following;
                })
                    // $scope.scroll.busy = false;
                }
            // $scope.scroll.busy = true;
            // _.each(data.data, function (n) {
            //   n.user.following = n.following;
            // })
        });
    };
    $scope.getPopularJourney($scope.pagenumber);

    $scope.getMoreJourney = function () {
        $scope.scroll.busy = true;
        // $scope.pagenumber++;
        console.log($scope.pagenumber, 'pagenum yo');
        if ($scope.scroll.stopCallingApi == false) {
            $scope.getPopularJourney(++$scope.pagenumber);
        }
    };

    // COMMENT LIKE SECTION FUNCTIONS
    $scope.likeUnlikeActivity = function (post) {
        console.log(post);
        post.likeDone = !post.likeDone;
        if (post.likeDone) {
            if (post.likeCount == undefined) {
                post.likeCount = 1;
            } else {
                post.likeCount = post.likeCount + 1;
            }
            LikesAndComments.likeUnlike(post.type, "like", post.uniqueId, post._id, null)
        } else {
            post.likeCount = post.likeCount - 1;
            LikesAndComments.likeUnlike(post.type, "unlike", post.uniqueId, post._id, null)
        }
    };

    $scope.getLikes = function (post) {
        console.log(post);
        LikesAndComments.getLikes(post.type, post._id, 1, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };

    $scope.listLikesDropDown = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };

    $scope.getCommentsData = function (post) {
        console.log(post);
        $scope.previousId;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.post = post;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.postScrollData.viewList = true;
            $scope.listOfComments = data.data;
            console.log($scope.listOfComments);

            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = post._id;
    };
    $scope.getLikesData = function (post) {
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        console.log($scope.postScrollData, 'post scrollData');
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        };
        console.log($scope.post);
        if ($scope.previousLikeId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = post._id;
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 100);
    };

    // COMMENT LIKE SECTION FUNCTIONS END
    // route to on go journey
    $scope.routeOngo = function (post) {
        console.log(post, 'user');
        if (post.type == 'ended-journey' || post.type == 'on-the-go-journey') {
            $state.go('ongojourney', {
                'id': post.urlSlug,
                'urlSlug': post.user.urlSlug
            });
        }
    }
        // route to on go journey end

    // followFollowing  Function
    $scope.followFollowing = function (user) {
        console.log("from popular journey Data");
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }
        // followFollowing  Function END

    // POPULAR JOURNEY INTEGRATION END

    // OPTIONS NG CLICK FUNCTION
    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };
    // OPTIONS NG CLICK FUNCTION END

    // THANK YOU MODAL
    $scope.openThankYouModal = function () {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            $uibModal.open({
                templateUrl: "views/modal/report.html",
                animation: true,
                scope: $scope,
                windowClass: "report-modal"
            });
        }
    };
    // THANK YOU MODAL END

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        shareModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/sharing.html",
            scope: $scope
        });
    }
        // sharing local life modal end
        // $timeout(function () {
        //     if ((navigator.platform.indexOf("iPhone") != -1) ||
        //         (navigator.platform.indexOf("iPod") != -1) ||
        //         (navigator.platform.indexOf("iPad") != -1)) {
        //         $(".download-app").addClass("hide");
        //     }
        // }, 200);
        // $scope.customLink = function () {
        //     window.open("https://play.google.com/store/apps/details?id=com.ascra.app.travellibro");
        // };
    })

.controller('DestinationCtrl', function ($scope, $state, TemplateService, NavigationService, LikesAndComments, cfpLoadingBar, $timeout, $uibModal, $location) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination");
    $scope.menutitle = NavigationService.makeactive("Destinations");
    TemplateService.title = "Travel Destinations - TraveLibro";
    $scope.navigation = NavigationService.getnav();
    $scope.destinationList = [];
    console.log($scope.searchLoader, 'search loader');
    setInterval(function () {
        $scope.searchLoader = TemplateService.searchLoader;
    }, 300);
    $scope.scroll = {
        busy: false,
        stopCallingApi: false
    }
    $scope.pagenumber = 1;
    $scope.destinationPagination = false;
    $scope.viewListByKey = "A";
    $scope.countryDestList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    $scope.i = 0;
    $scope.showCountry = function (search, searchText) {
        $scope.i++;
        $scope.scroll.busy = false;
        NavigationService.getDestination({
            search: search,
            searchText: searchText,
            count: $scope.i
        }, function (data) {
            if ($scope.i === data.count) {
                if (data.data.length == 0) {
                    $scope.scroll.stopCallingApi = true;
                } else {
                    _.each(data.data, function (newData) {
                        $scope.destinationList.push(newData);
                        $scope.i = 0;
                    })
                }
            }
        });
    }
    $scope.callCountry = function (search, searchText) {
        NavigationService.getDestination({
            search: search,
            searchText: searchText
        }, function (data) {
            if (data.value == true) {
                $scope.scroll.busy = false;
                $scope.destinationPagination = false;
                if (data.data.length == 0) {
                    $scope.scroll.stopCallingApi = true;
                } else {
                    _.each(data.data, function (newData) {
                        $scope.destinationList.push(newData);
                    })
                }
            }
        })
    }
    $scope.callCountry($scope.countryDestList[0], "");
    // get more list destination
    $scope.getMoreDestination = function () {
        $scope.destinationPagination = true;
        console.log($scope.countryDestList[$scope.pagenumber]);
        if ($scope.pagenumber > 25) {
            $scope.scroll.stopCallingApi = true;
            console.log($scope.scroll.stopCallingApi);
            $scope.destinationPagination = false;
        } else {
            $scope.scroll.busy = true;
            if ($scope.scroll.stopCallingApi == false) {
                $scope.pagenumber++;
                $scope.callCountry($scope.countryDestList[$scope.pagenumber - 1], "");
            }
                // if($scope.scroll.busy==false){
                //   $scope.scroll.busy = true;
                //   if($scope.scroll.stopCallingApi== false ){
                //     $scope.pagenumber++;
                //     $scope.callCountry($scope.countryDestList[$scope.pagenumber-1],"");
                //   }
                // }

            }
        }
        // get more list destination end
        $scope.searchDestination = function (searchVal, searchType) {
            $scope.destinationList = [];
            switch (searchType) {
                case 'searchDest':
                console.log(searchType, 'hk');
                if (searchVal === "") {
                    // $scope.destinationList = [];
                    $scope.showCountry("a", "");
                    $scope.viewListByKey = "A";
                } else {
                    if (searchVal.length > 2) {
                        $scope.viewListByKey = searchVal.charAt(0);
                        $scope.showCountry(searchVal, searchVal);
                        $scope.scroll.stopCallingApi = true;
                    }
                }
                break;
                case 'clickDest':
                if (searchVal) {
                    console.log(searchVal, 'new Val');
                    var getIndexVal = _.findIndex($scope.countryDestList, function (index) {
                        return index == searchVal;
                    });
                    console.log(getIndexVal, 'get index');
                    $scope.destinationPagination = true;
                    $scope.viewListByKey = searchVal.charAt(0);
                    $scope.pagenumber = getIndexVal + 1;
                    $scope.callCountry(searchVal, searchVal);
                } else {
                    $scope.callCountry("a", "");
                    $scope.viewListByKey = "A";
                }
                break;
                default:
                break;
            }
        };

        $scope.editOption = function (model, class1, class2) {
            LikesAndComments.onClickDropDown(model, $scope, class1, class2);
        }

    // destination country city
    $scope.countryView = function (url, isCity) {
        if (isCity === false) {
            $state.go("destinationcountry", {
                name: "features-cities",
                url: url
            });
        } else {
            $state.go("destinationcity", {
                name: "must-dos",
                url: url
            })
        }
    }
        // destination country city end
    })

.controller('DestinationCountryCtrl', function ($scope, $state, TemplateService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $location, LikesAndComments) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("destination-country");
    $scope.menutitle = NavigationService.makeactive("Destination");
    // TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.urlDestinationCountry = $state.params.url;
    $scope.hotelsData = [];
    $scope.toursData = [];
    $scope.vacationsData = [];
    $scope.homestayData = [];
    $scope.countryDestData = [];
    $scope.countryDestIti = [];
    $scope.pagenumber = 1;
    $scope.scroll = {};
    $scope.scroll.busy = false;
    $scope.scroll.stopCallingApi = false;
    $scope.itinerary = {};
    $scope.itinerary.citySearch = "";
    $scope.itinerary.type = "";
    $scope.itinerary.by = "";
    $scope.cityList = [];
    $scope.destinationItineraryType = [];
    $scope.destinationItineraryBy = [];
    $scope.destinationCityFilter = [];
    $scope.destinationCityFilterName = [];
    $scope.destinationItineraryTypeName = [];
    $scope.destinationItineraryByName = [];

    $scope.destinationList = [];
    $scope.i = 0;
    $scope.dest = {};
    $scope.dest.viewDestination = "";
    $scope.ntMustdo = "ntMustdo";
    $scope.countryDestinationView = false;
    $scope.userData = $.jStorage.get("profile");

    $scope.editOption = function (model, class1, class2) {
        LikesAndComments.onClickDropDown(model, $scope, class1, class2);
    };
    setInterval(function () {
        $scope.searchLoader = TemplateService.searchLoader;
    }, 300);
    // search destination
    $scope.callDestination = function () {
        $scope.i++;
        if ($scope.dest.viewDestination.length > 2) {
            NavigationService.getDestination({
                search: $scope.dest.viewDestination,
                searchText: $scope.dest.viewDestination,
                count: $scope.i
            }, function (data) {
                if ($scope.i === data.count) {
                    $scope.destinationList = data.data;
                    console.log($scope.destinationList, 'log');
                    $scope.i = 0;
                }
            });
        } else {

        }
    }
        // search destination end
        // destination country city
        $scope.countryView = function (url, isCity) {
            if (isCity === false) {
                $state.go("destinationcountry", {
                    name: "features-cities",
                    url: url
                });
            } else {
                $state.go("destinationcity", {
                    name: "must-dos",
                    url: url
                })
            }
        }
        // destination country city end

        $scope.getCountryInfo = function (type, urlSlug) {
            $scope.destinationCityFilterId = _.map($scope.destinationCityFilter, '_id');

            $scope.destinationItineraryTypeName = _.map($scope.destinationItineraryType, 'name');
            $scope.destinationItineraryByName = _.map($scope.destinationItineraryBy, 'name');
            var sendCityData = {
                pagenumber: $scope.pagenumber,
                type: _.cloneDeep(type),
                urlSlug: $scope.urlDestinationCountry,
                city: $scope.destinationCityFilterId,

                itineraryType: $scope.destinationItineraryTypeName,
                itineraryBy: $scope.destinationItineraryByName
            };
            if (type === "bestTime") {
                sendCityData.type = "mustDo";
            }
            NavigationService.getCountryDestination(sendCityData, function (data) {
                $scope.scroll.busy = false;
                if (data.value == true) {
                    $scope.isopenfilter = false;
                    if (type == 'itinerary') {
                        $scope.countryDestData = data.data;
                        if (data.data.itinerary.length == 0) {
                            $scope.scroll.stopCallingApi = true;
                        } else {
                            _.each(data.data.itinerary, function (newData) {
                                newData.user.following = newData.following;
                                $scope.countryDestIti.push(newData);
                                console.log($scope.countryDestIti, 'data itinerary wala');
                            });
                        }
                        TemplateService.title = "Itineraries for " + $scope.countryDestData.name + " - TraveLibro";
                    } else {
                        $scope.countryDestData = data.data;
                        _.each(data.data.bestTime, function (newVal) {
                            newVal.month = moment(newVal.month, "M").format('MMMM');
                        });
                        console.log($scope.countryDestData, 'what is cadat');
                    // switch case for title only
                    console.log(type);
                    switch (type) {
                        case 'featuredCities':
                        TemplateService.title = "Popular Cities in " + $scope.countryDestData.name + " - TraveLibro"
                        break;
                        case 'mustDo':
                        TemplateService.title = "Top 10 Things to Do in " + $scope.countryDestData.name + " - TraveLibro"
                        break;
                        case "bestTime":
                        TemplateService.title = "Best Time To Visit " + $scope.countryDestData.name + " - TraveLibro";
                        break;
                        default:
                        break;
                    }
                    // switch case for title only end
                }
            } else {

            }

        });
        };

        $scope.getCountyItiSubmit = function () {
            $scope.countryDestIti = [];
            $scope.pagenumber = 1;
            $scope.getCountryInfo("itinerary", $scope.urlDestinationCountry);
        }

        $scope.itineraryLoadMore = function () {
            $scope.scroll.busy = true;
            console.log($scope.pagenumber, 'pagenumber');
            console.log($scope.scroll.stopCallingApi, 'stop call country');
        // $scope.getCountryInfo("itinerary",$scope.urlDestinationCountry);
        if ($scope.scroll.stopCallingApi == false) {
            $scope.pagenumber++;
            $scope.getCountryInfo("itinerary", $scope.urlDestinationCountry);
        }
    };

    // FILTER ITINERARY DESTINATION
    $scope.getItinerayCity = function (id) {
        $scope.cityList = [];
        console.log('hihsjk', id);
        NavigationService.getCitySearch({
            keyword: $scope.itinerary.citySearch,
            country: id
        }, function (data) {
            $scope.cityList = data.data.results;
            $scope.cityList = _.map($scope.cityList, function (cityListData) {
                cityListData.checked = false;
                return cityListData;
            });
            console.log($scope.cityList, 'get Data');
        })
    };

    $scope.itineraryType = [{
        name: "Adventure",
        checked: false
    }, {
        name: "Business",
        checked: false
    }, {
        name: "Family",
        checked: false
    }, {
        name: "Romance",
        checked: false
    }, {
        name: "Budget",
        checked: false
    }, {
        name: "Luxury",
        checked: false
    }, {
        name: "Religious",
        checked: false
    }, {
        name: "Friends",
        checked: false
    }, {
        name: "Shopping",
        checked: false
    }, {
        name: "Solo",
        checked: false
    }, {
        name: "Festival",
        checked: false
    }, {
        name: "Backpacking",
        checked: false
    }];
    $scope.itineraryByCountry = [{
        name: "User",
        checked: false
    }, {
        name: "Travel Agent",
        checked: false
    }, {
        name: "Editor",
        checked: false
    }];

    // filter sorting

    $scope.itineraryFilter = function (filterItinerary, filterType) {

        switch (filterType) {
            case 'itineraryCity':
            var cityIndex = _.findIndex($scope.destinationCityFilter, function (type) {
                return type.name == filterItinerary.name;
            });
            if (cityIndex == -1) {
                $scope.destinationCityFilter.push(filterItinerary);
                var cityItiIndex = _.findIndex($scope.cityList, function (cityCheck) {
                    return cityCheck.name == filterItinerary.name
                });
                $scope.cityList[cityItiIndex].checked = true;
                console.log($scope.destinationCityFilter, 'city');
            } else {
                _.remove($scope.destinationCityFilter, function (remove) {
                    return remove.name == filterItinerary.name;
                });
                var cityItiIndex = _.findIndex($scope.cityList, function (cityCheck) {
                    return cityCheck.name == filterItinerary.name
                });
                $scope.cityList[cityItiIndex].checked = false;
                console.log($scope.destinationCityFilter, 'city');
            }
            $scope.pagenumber = 1;
            break;
            case 'itineraryType':
            var typeIndex = _.findIndex($scope.destinationItineraryType, function (type) {
                return type.name == filterItinerary.name;
            });
            if (typeIndex == -1) {
                $scope.destinationItineraryType.push(filterItinerary);
                var countryItiTypeIndex = _.findIndex($scope.itineraryType, function (getIndexCountry) {
                    return getIndexCountry.name == filterItinerary.name;
                })
                $scope.itineraryType[countryItiTypeIndex].checked = true;
                console.log($scope.destinationItineraryType, 'type');
            } else {
                _.remove($scope.destinationItineraryType, function (remove) {
                    return remove.name == filterItinerary.name;
                })
                var countryItiTypeIndex = _.findIndex($scope.itineraryType, function (getIndexCountry) {
                    return getIndexCountry.name == filterItinerary.name;
                })
                $scope.itineraryType[countryItiTypeIndex].checked = false;
                console.log($scope.destinationItineraryType, 'type');
            }
            $scope.pagenumber = 1;
            break;
            case 'itineraryBy':
            var byIndex = _.findIndex($scope.destinationItineraryBy, function (type) {
                return type.name == filterItinerary.name;
            });
            if (byIndex == -1) {
                $scope.destinationItineraryBy.push(filterItinerary);
                var countryItiByIndex = _.findIndex($scope.itineraryByCountry, function (getIndexBy) {
                    return getIndexBy.name == filterItinerary.name;
                })
                $scope.itineraryByCountry[countryItiByIndex].checked = true;
                console.log($scope.destinationItineraryBy, 'by');
            } else {
                _.remove($scope.destinationItineraryBy, function (remove) {
                    return remove.name == filterItinerary.name;
                })
                var countryItiByIndex = _.findIndex($scope.itineraryByCountry, function (getIndexBy) {
                    return getIndexBy.name == filterItinerary.name;
                })
                $scope.itineraryByCountry[countryItiByIndex].checked = false;
                console.log($scope.destinationItineraryBy, 'by');
            }
            $scope.pagenumber = 1;
            break;
            default:

        }
    }
        // FILTER ITINERARY DESTINATION END
        // clear country itinerary filter
        $scope.clearCountryItinerary = function () {
            _.each($scope.cityList, function (listCityChecked) {
                listCityChecked.checked = false;
            })
            _.each($scope.itineraryType, function (listItiChecked) {
                listItiChecked.checked = false;
            })
            _.each($scope.itineraryByCountry, function (listByChecked) {
                listByChecked.checked = false;
            })
            $scope.destinationCityFilter = [];
            $scope.destinationItineraryType = [];
            $scope.destinationItineraryBy = [];
        };
    // clear country itinerary filter end

    $scope.getCountyItiSubmit = function () {
        $scope.countryDestIti = [];
        $scope.pagenumber = 1;
        $scope.getCountryInfo("itinerary", $scope.urlDestinationCountry);
    }
        // OPTIONS NG CLICK FUNCTION
        $scope.editOption = function (model) {
            $timeout(function () {
                model.backgroundClick = true;
                backgroundClick.object = model;
            }, 200);
            backgroundClick.scope = $scope;
        };
    // OPTIONS NG CLICK FUNCTION END

    // THANK YOU MODAL
    $scope.openThankYouModal = function () {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            $uibModal.open({
                templateUrl: "views/modal/report.html",
                animation: true,
                scope: $scope,
                windowClass: "report-modal"
            });
        }
    };
    // THANK YOU MODAL END

    // // destination city
    // $scope.countryView = function (url, isCity) {
    //   $state.go("destinationcity", {
    //     name: "must-dos",
    //     url: url
    //   })
    // }
    //
    // // destination city end

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
            case "features-cities":
            $scope.countryoptions.active = "features-cities";
            $scope.destination.innerView = alldestination[0];
                // $scope.countryDestData = [];
                $scope.getCountryInfo("featuredCities", $scope.urlDestinationCountry);
                $scope.countryDestinationView = true;
                $scope.ntMustdo = "ntMustdo";
                break;
                case "must-dos":
                $scope.countryoptions.active = "must-dos";
                $scope.destination.innerView = alldestination[1];
                // $scope.countryDestData = [];
                $scope.getCountryInfo("mustDo", $scope.urlDestinationCountry);
                $scope.countryDestinationView = false;
                $scope.ntMustdo = "";
                break;
                case "itineraries":
                $scope.countryoptions.active = "itineraries";
                $scope.destination.innerView = alldestination[2];
                // $scope.countryDestData = [];
                $scope.getCountryInfo("itinerary", $scope.urlDestinationCountry);
                $scope.countryDestinationView = false;
                $scope.ntMustdo = "";
                break;
                case "bookings":
                $scope.countryoptions.active = "bookings";
                // $scope.countryDestData = [];
                $scope.destination.innerView = alldestination[3];
                $scope.countryDestinationView = false;
                $scope.ntMustdo = "";
                break;
                case "best-time-to-visit":
                $scope.countryoptions.active = "best-time-to-visit";
                // $scope.countryDestData = [];
                $scope.destination.innerView = alldestination[4];
                $scope.countryDestinationView = false;
                $scope.ntMustdo = "";
                $scope.getCountryInfo("bestTime", $scope.urlDestinationCountry);
                break;
                default:
                // $scope.countryDestData = [];
                $scope.countryDestinationView = true;
                $scope.destination.innerView = alldestination[0];
            }
        };
        $scope.destinationTabView($state.params.name);
        $scope.getTab = function (view) {
            if (view === 'featured') {
                $scope.countryDestinationView = true;
                $scope.ntMustdo = "ntMustdo";
            } else {
                $scope.countryDestinationView = false;
                $scope.ntMustdo = "";
            }
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

    // COMMENT LIKE SECTION FUNCTIONS
    $scope.likeUnlikeActivity = function (post) {
        console.log(post);
        post.likeDone = !post.likeDone;
        if (post.likeDone) {
            if (post.likeCount == undefined) {
                post.likeCount = 1;
            } else {
                post.likeCount = post.likeCount + 1;
            }
            LikesAndComments.likeUnlike(post.type, "like", post.uniqueId, post._id, null)
        } else {
            post.likeCount = post.likeCount - 1;
            LikesAndComments.likeUnlike(post.type, "unlike", post.uniqueId, post._id, null)
        }
    };

    $scope.getLikes = function (post) {
        console.log(post);
        LikesAndComments.getLikes(post.type, post._id, 1, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };

    $scope.listLikesDropDown = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;
    $scope.getCommentsData = function (post) {
        console.log(post);
        $scope.previousId;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.post = post;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = post._id;
    };


    $scope.getLikesData = function (post) {
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        };
        console.log($scope.post);
        if ($scope.previousLikeId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = post._id;
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 100);
    };

    // COMMENT LIKE SECTION FUNCTIONS END



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

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            shareModal = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/sharing.html",
                scope: $scope
            });
        }
    }
        // sharing local life modal end

    // followFollowing  Function
    $scope.followFollowing = function (user) {
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }
        // followFollowing  Function END

    })

.controller('DestinationCityCtrl', function ($scope, $state, TemplateService, TravelibroService, NavigationService, cfpLoadingBar, $timeout, $uibModal, $location, LikesAndComments, Agent) {

    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.template = TemplateService.changecontent("destination-city");
    $scope.menutitle = NavigationService.makeactive("Destination");
    // TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.cityDestData = [];
    $scope.cityHotelCategoryData = [];
    $scope.bookingCityName = "";
    $scope.bookingCountryName = "";
    $scope.citySubTypeData = [];
    $scope.citySubTypeDataName = [];
    $scope.cityBudgetData = [];
    $scope.cityBudgetDataName = [];
    $scope.cityItineraryType = [];
    $scope.cityItineraryTypeName = [];
    $scope.cityItineraryBy = [];
    $scope.cityItineraryByName = [];
    $scope.cityRestaurantCuisine = [];
    $scope.cityRestaurantCuisineName = [];
    $scope.pagenumber = 1;
    $scope.cityDestIti = [];
    $scope.ntMustdo = "ntMustdo";
    $scope.callReview = "";
    $scope.listOfReviews = [];
    $scope.destinationList = [];
    $scope.i = 0;
    $scope.dest = {};
    $scope.dest.viewDestination = "";
    $scope.scroll = {
        "busy": false,
        "stopCallingApi": false
    };
    $scope.userData = $.jStorage.get("profile");
    $scope.modelType = "";
    $scope.rateType = "";
    $scope.editOption = function (model, class1, class2) {
        LikesAndComments.onClickDropDown(model, $scope, class1, class2);
    };

    setInterval(function () {
        $scope.searchLoader = TemplateService.searchLoader;
    }, 300);

    $scope.suggest = {};
    // SUGGEST EDIT POPUP MODAL

    $scope.openSuggestModal = function (id, type) {
        if (type === "hotel") {
            $scope.suggest.hotel = id;
        } else {
            $scope.suggest.restaurant = id;
        }
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            $uibModal.open({
                templateUrl: "views/modal/suggest-edit.html",
                animation: true,
                scope: $scope,
                windowClass: "report-modal",
                backdrop: "static"
            });
        }
    };
    $scope.countAdder = function (tourcard) {
        Agent.countAdder({ _id: tourcard._id }, function (data) {
            console.log(data);
            if (data.value == true) {
                console.log("Added counter");
            }
        });
    };
    $scope.saveSuggest = function () {
        NavigationService.saveSuggest($scope.suggest, function (data) {
            $scope.suggest.text = "";
        })
    }
        // SUGGEST EDIT POPUP MODAL END

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            shareModal = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/sharing.html",
                scope: $scope
            });
        }
        console.log($scope.shareUrl, 'share ka url');
    }
        // sharing local life modal end


    // followFollowing  Function
    $scope.followFollowing = function (user) {
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }
        // followFollowing  Function END

    // OPTIONS NG CLICK FUNCTION
    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };
    // OPTIONS NG CLICK FUNCTION END

    // THANK YOU MODAL
    $scope.openThankYouModal = function () {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            $uibModal.open({
                templateUrl: "views/modal/report.html",
                animation: true,
                scope: $scope,
                windowClass: "report-modal"
            });
        }
    };
    // THANK YOU MODAL END

    // destination search dropdown
    $scope.callDestination = function () {
        $scope.i++;
        if ($scope.dest.viewDestination.length > 2) {
            NavigationService.getDestination({
                search: $scope.dest.viewDestination,
                searchText: $scope.dest.viewDestination,
                count: $scope.i
            }, function (data) {
                if ($scope.i === data.count) {
                    $scope.destinationList = data.data;
                    console.log($scope.destinationList, 'log');
                    $scope.i = 0;
                }
            });
        } else {

        }
    }
    $scope.countryView = function (url, isCity) {
        if (isCity === false) {
            $state.go("destinationcountry", {
                name: "features-cities",
                url: url
            });
        } else {
            $state.go("destinationcity", {
                name: "must-dos",
                url: url
            })
        }
    }
        // destination search dropdown end

        $scope.resetFilters = function (id) {
            $scope.cityRestaurantCuisine = [];
            $scope.citySubTypeData = [];
            $scope.cityBudgetData = [];
        };

        var modal = "";
        $scope.rateDestination = function (destRate, type) {
            if (!($.jStorage.get("isLoggedIn"))) {
                $state.go('login');
            } else {
                console.log(destRate, 'check in');
                $scope.destReview = destRate;
                if (destRate.userReview.length !== 0) {
                    console.log("Edit Rating");
                    if (destRate.userReview[0].rating != undefined) {
                        $scope.starRating(parseInt(destRate.userReview[0].rating));
                    } else {

                    }
                } else {
                    console.log("Rate Us");
                }
                modal = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modal/destination-review.html',
                    scope: $scope
                });
                modal.closed.then(function () {
                    $scope.postReview.review = "";
                    $scope.starRating(1);
                });
                if (type == 'hotel') {
                    $scope.modelType = "hotel";
                    $scope.rateType = "saveHotel";
                } else {
                    $scope.modelType = "restaurant";
                    $scope.rateType = "saveRestaurant";
                }
            }
        };
        $scope.ratingValue = {};
        $scope.ratingValue.review = "";
        $scope.ratingValue.rating = "";
        $scope.savePostReview = function (values, postData) {
            console.log(values, postData);
            $scope.ratingValue.review = values.review;
            $scope.ratingValue.rating = values.rating;
            console.log(postData, 'post data kya hai');
            var formData = {
            // "hotel": postData._id,
            "review": values.review,
            "rating": values.rating
        };
        if ($scope.modelType == "hotel") {
            formData.hotel = postData._id;
        } else {
            formData.restaurant = postData._id;
        }
        console.log(formData);
        TravelibroService.http({
            url: adminURL + "/review/" + $scope.rateType,
            method: "POST",
            data: formData
        }).success(function (data) {
            if (data.value == true) {
                postData.userReview[0] = $scope.ratingValue;
                console.log(postData.userReview, 'review');
                modal.close();
            }
        }).error(function (data) {
            console.log(data);
        });
    };
    $scope.showRating = 1;
    $scope.fillColor = "";
    $scope.postReview = {};
    $scope.postReview.rating = 1;
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
    // rating local life end

    // $scope.star = function (starCount, type) {
    //   if (type == "marked") {
    //     starCount = parseInt(starCount);
    //     return new Array(starCount);
    //   } else if (type == "unmarked") {
    //     starCount = parseInt(starCount);
    //     var remainCount = 5 - starCount;
    //     return new Array(remainCount);
    //   }
    // };
    $scope.getRating = function (n, type) {
        // console.log(n, type, 'rating');
        if (type == "marked") {
            n = parseInt(n);
            return new Array(n);
        } else if (type == "unmarked") {
            n = parseInt(n);
            var remainCount = 5 - n;
            return new Array(remainCount);
        }
    };

    $scope.urlDestinationCity = $state.params.url;
    $scope.getCityInfo = function (type, urlSlug) {
        $scope.citySubTypeDataName = _.map($scope.citySubTypeData, 'name');
        $scope.cityBudgetDataName = _.map($scope.cityBudgetData, 'name');
        $scope.cityRestaurantCuisineName = _.map($scope.cityRestaurantCuisine, 'name');
        $scope.cityItineraryTypeName = _.map($scope.cityItineraryType, "name");
        $scope.cityItineraryByName = _.map($scope.cityItineraryBy, 'name');
        var sendData = {
            type: _.cloneDeep(type),
            urlSlug: $scope.urlDestinationCity,
            subType: $scope.citySubTypeDataName,
            budget: $scope.cityBudgetDataName,
            cuisine: $scope.cityRestaurantCuisineName,
            itineraryType: $scope.cityItineraryTypeName,
            itineraryBy: $scope.cityItineraryByName,
            pagenumber: $scope.pagenumber
        };
        if (type === "bestTime") {
            sendData.type = "mustDo";
        }
        NavigationService.getCityDestination(sendData, function (data) {
            $scope.scroll.busy = false;
            if (data.value == true) {
                $scope.isopenfilter = false;
                if (type === 'itinerary') {
                    if (data.data.itinerary.length == 0) {
                        $scope.scroll.stopCallingApi = true;
                    } else {
                        _.each(data.data.itinerary, function (newData) {
                            newData.user.following = newData.following;
                            $scope.cityDestIti.push(newData);
                            console.log($scope.cityDestIti, 'city ka itinerary');
                        })
                    };
                    TemplateService.title = "Travel Itinerary For " + $scope.cityDestData.name + " | TraveLibro"
                } else {
                    _.each(data.data.bestTime, function (newVal) {
                        newVal.month = moment(newVal.month, "M").format('MMMM');
                    });
                    $scope.cityDestData = data.data;
                    // console.log('bc log hoja', $scope.cityDestData);
                    // switch case for title only

                    switch (type) {
                        case 'mustDo':
                        TemplateService.title = $scope.cityDestData.name + " Travel Guide | Top Things To Do In " + $scope.cityDestData.name + "- TraveLibro";
                        break;
                        case 'hotel':
                        TemplateService.title = $scope.cityDestData.name + " Hotels | TraveLibro";
                        break;
                        case 'restaurant':
                        TemplateService.title = "Recommended Restaurants In " + $scope.cityDestData.name + " | TraveLibro ";
                        break;
                        case 'bookings':
                        TemplateService.title = "Best Deals For " + $scope.cityDestData.name + " -   TraveLibro";
                        break;
                        case 'bestTime':
                        TemplateService.title = "Best Time To Visit " + $scope.cityDestData.name + " -   TraveLibro";
                        break;
                        default:
                        break;
                    }
                    // switch case for title only end
                }
            }
        })
    };

    $scope.getCityItiSubmit = function () {
        $scope.cityDestIti = [];
        $scope.pagenumber = 1;
        console.log($scope.cityDestIti, 'city dest ');
        $scope.getCityInfo('itinerary', $scope.urlDestinationCity);
    }

    $scope.cityItineraryLoadMore = function () {
        $scope.scroll.busy = true;
        console.log($scope.pagenumber, 'pagenumber');
        console.log($scope.scroll.stopCallingApi, 'stop call city');
        // $scope.getCountryInfo("itinerary",$scope.urlDestinationCountry);
        if ($scope.scroll.stopCallingApi == false) {
            $scope.pagenumber++;
            $scope.getCityInfo('itinerary', $scope.urlDestinationCity);
        }
    };

    // get booking data
    $scope.viewTourLoader = true;
    $scope.viewNoTourData = false;
    $scope.viewHotelLoader = true;
    $scope.viewNoHotelData = false;
    $scope.viewVacationLoader = true;
    $scope.viewNoVacData = false;
    $scope.viewHomeStayLoader = true;
    $scope.viewNoHomeData = false;

    $scope.adder = 1;
    $scope.usrTourPackageCard = [];

    $scope.callTour = function (adder) {
        NavigationService.getTourPackage({
            city: $state.params.url,
            pagenumber: adder
        }, function (data) {
            if (data.data.length > 0) {
                _.each(data.data, function (each) {
                    $scope.usrTourPackageCard.push(each);
                });
            }
            $scope.getBooking($state.params.url.toLowerCase(), $state.params.country);
        });
    }

    $scope.getBooking = function (cityName, countryName) {
        console.log(cityName, countryName);
        $scope.bookingCityName = cityName;
        $scope.bookingCountryName = countryName;
        NavigationService.getBookingTour({
            cityName: $scope.bookingCityName,
            countryName: $scope.bookingCountryName
        }, function (data) {
            if (data.status == false || data.tours == "") {
                $scope.viewNoTourData = true;
                $scope.viewTourLoader = false;
                $scope.getHomeStay($scope.bookingCityName, $scope.bookingCountryName);
            } else {
                $scope.viewNoTourData = false;
                $scope.viewTourLoader = false;
                console.log(data, 'booking data');
                $scope.bookingTourData = data.tours;
                console.log($scope.bookingTourData, 'booking ka data');
                $scope.getHomeStay($scope.bookingCityName, $scope.bookingCountryName);
            }
        });
    };
    $scope.getHomeStay = function (cityHomeStay, countryHomeStay) {
        NavigationService.getBookingHomeStay({
            cityName: cityHomeStay,
            countryName: countryHomeStay
        }, function (data) {
            if (data.status == false || data.home_stays == "") {
                $scope.viewNoHomeData = true;
                $scope.viewHomeStayLoader = false;
                $scope.getVacation($scope.bookingCityName, $scope.bookingCountryName);
            } else {
                $scope.viewHomeStayLoader = false;
                $scope.viewNoHomeData = false;
                $scope.bookingHomeData = data.home_stays;
                $scope.getVacation($scope.bookingCityName, $scope.bookingCountryName);
            }
        });
    };
    $scope.getVacation = function (cityVacation, countryVacation) {
        NavigationService.getBookingVaction({
            cityName: cityVacation,
            countryName: countryVacation
        }, function (data) {
            if (data.status == false || data.vacation_rentals == "") {
                $scope.viewVacationLoader = false;
                $scope.viewNoVacData = true;
                $scope.getHotel($scope.bookingCityName, $scope.bookingCountryName);
            } else {
                $scope.viewVacationLoader = false;
                $scope.viewNoVacData = false;
                console.log(data, 'booking data');
                $scope.bookingVacData = data.vacation_rentals;
                $scope.getHotel($scope.bookingCityName, $scope.bookingCountryName);
            }
        });
    };

    $scope.getHotel = function (cityHotel, countryHotel) {
        NavigationService.getBookingHotel({
            cityName: cityHotel,
            countryName: countryHotel
        }, function (data) {
            if (data.status == false || data.hotels == "") {
                $scope.viewHotelLoader = false;
                $scope.viewNoHotelData = true;
            } else {
                $scope.viewNoHotelData = false;
                $scope.viewHotelLoader = false;
                $scope.bookingHotelData = data.hotels;
            }
        })
    }
        // get booking data end

        $scope.cityType = [{
            name: 'Adventure',
            checked: false
        }, {
            name: 'Business',
            checked: false
        }, {
            name: 'Family',
            checked: false
        }, {
            name: 'Romance',
            checked: false
        }, {
            name: 'Budget',
            checked: false
        }, {
            name: 'Luxury',
            checked: false
        }, {
            name: 'Religious',
            checked: false
        }, {
            name: 'Friends',
            checked: false
        }, {
            name: 'Shopping',
            checked: false
        }, {
            name: 'Solo',
            checked: false
        }, {
            name: 'Festival',
            checked: false
        }, {
            name: 'Backpacking',
            checked: false
        }];
        $scope.cityByIti = [{
            name: "User",
            checked: false
        }, {
            name: "Travel Agent",
            checked: false
        }, {
            name: "Editor",
            checked: false
        }];

    // restuarnt budget
    $scope.restuarntBudget = [{
        name: "$$$",
        checked: false
    }, {
        name: "$$",
        checked: false
    }, {
        name: "$",
        checked: false
    }];
    // restuarnt budget end

    // hotel budget
    $scope.hotelBudget = [{
        name: "$$$",
        id: "dollar-three",
        checked: false
    }, {
        name: "$$",
        id: "dollar-two",
        checked: false
    }, {
        name: "$",
        id: "dollar-one",
        checked: false
    }];
    // hotel budget end


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

    // COMMENT LIKE SECTION FUNCTIONS
    $scope.likeUnlikeActivity = function (post) {
        console.log(post);
        post.likeDone = !post.likeDone;
        if (post.likeDone) {
            if (post.likeCount == undefined) {
                post.likeCount = 1;
            } else {
                post.likeCount = post.likeCount + 1;
            }
            LikesAndComments.likeUnlike(post.type, "like", post.uniqueId, post._id, null)
        } else {
            post.likeCount = post.likeCount - 1;
            LikesAndComments.likeUnlike(post.type, "unlike", post.uniqueId, post._id, null)
        }
    };

    $scope.getLikes = function (post) {
        console.log(post);
        LikesAndComments.getLikes(post.type, post._id, 1, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };

    $scope.viewReviews = function (review, type) {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            if ($scope.viewCardReview) {
                $scope.viewCardReview = false;
                $scope.callReview = "";
            } else {
                $scope.viewCardReview = true;
                $scope.viewCardComment = false;
                $scope.viewCardLike = false;
                $scope.callReview = 'review-slide';
                console.log(review);
                LikesAndComments.getReviews(review._id, type, function (data) {
                    $scope.listOfReviews = data.data;
                    console.log($scope.listOfReviews, 'get review');
                });
            }
        }
    }

    $scope.listLikesDropDown = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };

    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;

    $scope.getCommentsData = function (post) {
        console.log(post);
        $scope.previousId;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.post = post;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            console.log($scope.listOfComments);

            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = post._id;
    };

    $scope.getLikesData = function (post) {
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        };
        console.log($scope.post);
        if ($scope.previousLikeId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = post._id;
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.viewCardReview = false;
        $scope.getCard = "";
        $scope.callReview = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.listOfReviews = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 100);
    };

    // COMMENT LIKE SECTION FUNCTIONS END
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
    // city hotel filter
    $scope.cityHotelFilter = function (cityHotelData, filterCityType) {
        console.log(cityHotelData, 'category');
        switch (filterCityType) {
            case 'categoryType':
            var getcategory = _.findIndex($scope.citySubTypeData, function (subtype) {
                return subtype.name == cityHotelData.name;
            });
            if (getcategory == -1) {
                $scope.citySubTypeData.push(cityHotelData);
                var getCategoryHotel = _.findIndex($scope.cityDestData.subType, function (checkedCat) {
                    return checkedCat.name == cityHotelData.name;
                })
                $scope.cityDestData.subType[getCategoryHotel].checked = true;
                console.log($scope.citySubTypeData, 'city add ');
            } else {
                _.remove($scope.citySubTypeData, function (removeCategory) {
                    return removeCategory.name == cityHotelData.name;
                })
                var getCategoryHotel = _.findIndex($scope.cityDestData.subType, function (checkedCat) {
                    return checkedCat.name == cityHotelData.name;
                })
                $scope.cityDestData.subType[getCategoryHotel].checked = false;

                console.log($scope.citySubTypeData, 'city remove');
            }
            break;
            case 'categoryBudget':
            var getBudget = _.findIndex($scope.cityBudgetData, function (budget) {
                return budget.name == cityHotelData.name;
            });
            if (getBudget == -1) {
                $scope.cityBudgetData.push(cityHotelData);
                var getBudgetHotel = _.findIndex($scope.hotelBudget, function (checkedCat) {
                    return checkedCat.name == cityHotelData.name;
                })
                $scope.hotelBudget[getBudgetHotel].checked = true;
                console.log($scope.cityBudgetData, 'budget add ');
            } else {
                _.remove($scope.cityBudgetData, function (removeBudget) {
                    return removeBudget.name == cityHotelData.name;
                })
                var getBudgetHotel = _.findIndex($scope.hotelBudget, function (checkedCat) {
                    return checkedCat.name == cityHotelData.name;
                })

                $scope.hotelBudget[getBudgetHotel].checked = false;
                console.log($scope.cityBudgetData, 'budget remove');
            }
            break;
            default:

        }
    }
        // city hotel filter end

    // city clear all function
    $scope.clearHotel = function () {
        _.each($scope.cityDestData.subType, function (getChecked) {
            getChecked.checked = false;
        });
        _.each($scope.hotelBudget, function (getChecked) {
            getChecked.checked = false;
        });
        $scope.citySubTypeData = [];
        $scope.cityBudgetData = [];
    }
        // city clear all function end

    // city restaurant filter
    $scope.hotelRestaurantFilter = function (restaurantData, restaurantFilterType) {
        console.log(restaurantData);
        switch (restaurantFilterType) {
            case "restaurantCuisine":
            var getCuisine = _.findIndex($scope.cityRestaurantCuisine, function (cuisine) {
                return cuisine.name == restaurantData.name;
            })
            if (getCuisine == -1) {
                $scope.cityRestaurantCuisine.push(restaurantData);
                var getCuisineResto = _.findIndex($scope.cityDestData.cuisine, function (newCuisine) {
                    return newCuisine.name == restaurantData.name;
                });
                $scope.cityDestData.cuisine[getCuisineResto].checked = true;
                console.log($scope.cityRestaurantCuisine, 'cuisine add');
            } else {
                _.remove($scope.cityRestaurantCuisine, function (removeCuisine) {
                    return removeCuisine.name == restaurantData.name;
                });
                var getCuisineResto = _.findIndex($scope.cityDestData.cuisine, function (newCuisine) {
                    return newCuisine.name == restaurantData.name;
                });
                $scope.cityDestData.cuisine[getCuisineResto].checked = false;
                console.log($scope.cityRestaurantCuisine, 'cuisine removeCuisine');
            }
            break;
            case "typeRestaurant":
            var getRestaurant = _.findIndex($scope.citySubTypeData, function (restaurantType) {
                return restaurantType.name == restaurantData.name;
            })
            if (getRestaurant == -1) {
                $scope.citySubTypeData.push(restaurantData);
                var citySubIndex = _.findIndex($scope.cityDestData.subType, function (checkSubType) {
                    return checkSubType.name == restaurantData.name;
                })
                $scope.cityDestData.subType[citySubIndex].checked = true;
                console.log($scope.citySubTypeData, 'Type add');
            } else {
                _.remove($scope.citySubTypeData, function (removeRestaurantType) {
                    return removeRestaurantType.name == restaurantData.name;
                });
                var citySubIndex = _.findIndex($scope.cityDestData.subType, function (checkSubType) {
                    return checkSubType.name == restaurantData.name;
                })
                $scope.cityDestData.subType[citySubIndex].checked = false;
                console.log($scope.citySubTypeData, 'Type remove');
            }
            break;
            case "restaurantBudget":
            var getRestBudget = _.findIndex($scope.cityBudgetData, function (restaurantBudget) {
                return restaurantBudget.name == restaurantData.name;
            })
            if (getRestBudget == -1) {
                $scope.cityBudgetData.push(restaurantData);
                var restoBudget = _.findIndex($scope.restuarntBudget, function (checkedBudget) {
                    return checkedBudget.name == restaurantData.name;
                });
                $scope.restuarntBudget[restoBudget].checked = true;
                console.log($scope.cityBudgetData, 'budget add');
            } else {
                _.remove($scope.cityBudgetData, function (removeBudget) {
                    return removeBudget.name == restaurantData.name;
                });
                var restoBudget = _.findIndex($scope.restuarntBudget, function (checkedBudget) {
                    return checkedBudget.name == restaurantData.name;
                });
                $scope.restuarntBudget[restoBudget].checked = false;
                console.log($scope.cityBudgetData, 'budget removeBudget');
            }
            break;
            default:

        }
    }
        // city restaurant filter end
        // clear hotel restuarnt
        $scope.clearCityRest = function () {
            _.each($scope.cityDestData.cuisine, function (clearChecked) {
                clearChecked.checked = false;
            })
            _.each($scope.cityDestData.subType, function (clearSubTypeChecked) {
                clearSubTypeChecked.checked = false;
            })
            _.each($scope.restuarntBudget, function (clearRestoChecked) {
                clearRestoChecked.checked = false;
            })
            $scope.cityRestaurantCuisine = [];
            $scope.citySubTypeData = [];
            $scope.cityBudgetData = [];
        }
        // clear hotel restuarnt end
        // city itinerary filter
        $scope.cityItineraryFilter = function (cityFilterData, cityFilterType) {
            console.log(cityFilterData);
            switch (cityFilterType) {
                case 'cityItineraryType':
                var cityTypeIndex = _.findIndex($scope.cityItineraryType, function (cityType) {
                    return cityType.name == cityFilterData.name;
                });
                if (cityTypeIndex == -1) {
                    $scope.cityItineraryType.push(cityFilterData);
                    console.log($scope.cityItineraryType, 'type add');
                    var cityItineraryIndex = _.findIndex($scope.cityType, function (getCityIndex) {
                        return getCityIndex.name == cityFilterData.name;
                    })
                    $scope.cityType[cityItineraryIndex].checked = true;
                } else {
                    _.remove($scope.cityItineraryType, function (removeType) {
                        return removeType.name == cityFilterData.name;
                    });
                    var cityItineraryIndex = _.findIndex($scope.cityType, function (getCityIndex) {
                        return getCityIndex.name == cityFilterData.name;
                    })
                    $scope.cityType[cityItineraryIndex].checked = false;
                    console.log($scope.cityItineraryType, 'removed once');
                }
                break;
                case 'cityItineraryBy':
                var cityBy = _.findIndex($scope.cityItineraryBy, function (cityBy) {
                    return cityBy.name == cityFilterData.name;
                });
                if (cityBy == -1) {
                    $scope.cityItineraryBy.push(cityFilterData);
                    console.log($scope.cityItineraryBy, 'by add');
                    var getCityBy = _.findIndex($scope.cityByIti, function (getCityBy) {
                        return getCityBy.name == cityFilterData.name;
                    })
                    $scope.cityByIti[getCityBy].checked = true;
                } else {
                    _.remove($scope.cityItineraryBy, function (removeBy) {
                        return removeBy == cityFilterData;
                    });
                    var getCityBy = _.findIndex($scope.cityByIti, function (getCityBy) {
                        return getCityBy.name == cityFilterData.name;
                    })
                    $scope.cityByIti[getCityBy].checked = false;
                    console.log($scope.cityItineraryBy, 'removed once');
                }
                break;
                default:

            }
        }
        // city itinerary filter end
        // clear city itinerary
        $scope.clearCityItinerary = function () {
            _.each($scope.cityType, function (cityTypeChecked) {
                cityTypeChecked.checked = false;
            });
            _.each($scope.cityByIti, function (cityItiChecked) {
                cityItiChecked.checked = false;
            });
            $scope.cityItineraryType = [];
            $scope.cityItineraryBy = [];
        }
        // clear city itinerary end
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
    console.log($state.params.name);
    switch ($state.params.name) {
        case "must-dos":
        $scope.destination.innerView = alldestination[0];
        $scope.cityDestinationView = true;
        $scope.getCityInfo("mustDo", $scope.urlDestinationCity);
        $scope.cityoptions.active = "must-dos";
        $scope.ntMustdo = "ntMustdo";
        break;
        case "hotels":
        $scope.destination.innerView = alldestination[1];
        $scope.cityDestinationView = false;
        $scope.cityoptions.active = "hotels";
        $scope.getCityInfo("hotel", $scope.urlDestinationCity);
        $scope.ntMustdo = "";
        break;
        case "restaurants":
        $scope.destination.innerView = alldestination[2];
        $scope.cityDestinationView = false;
        $scope.cityoptions.active = "restaurants";
        $scope.getCityInfo("restaurant", $scope.urlDestinationCity);
        $scope.ntMustdo = "";
        break;
        case "itineraries":
        $scope.destination.innerView = alldestination[3];
        $scope.cityDestinationView = false;
        $scope.cityoptions.active = "itineraries";
        $scope.getCityInfo("itinerary", $scope.urlDestinationCity);
        $scope.ntMustdo = "";
        break;
        case "bookings":
        $scope.destination.innerView = alldestination[4];
        $scope.cityDestinationView = false;
        $scope.cityoptions.active = "bookings";
        $scope.usrTourPackageCard = [];
        $scope.callTour(1);
        $scope.viewBookingLoader = true;
        $scope.ntMustdo = "";
        break;
        case "best-time-to-visit":
        $scope.destination.innerView = alldestination[5];
        $scope.cityDestinationView = false;
        $scope.cityoptions.active = "best-time-to-visit";
        $scope.ntMustdo = "";
        $scope.getCityInfo("bestTime", $scope.urlDestinationCity);
        break;
        default:
        $scope.destination.innerView = alldestination[0];
        $scope.cityDestinationView = true;
    }
    $scope.getTab = function (view) {
        console.log($state.params.name, 'name');
        console.log($state.params.country, 'country');
        console.log($state.params.url, 'url');
        $scope.destination.innerView = alldestination[view];
        var url = "features-cities";
        var active = "";
        console.log(view);
        switch (view) {
            case 0:
            url = "must-dos";
            $scope.cityDestinationView = true;
            $scope.cityoptions.active = "must-dos";
            $scope.getCityInfo("mustDo", $scope.urlDestinationCity);
            $scope.ntMustdo = "ntMustdo";
            break;
            case 1:
            url = "hotels";
            $scope.cityDestinationView = false;
            $scope.cityoptions.active = "hotels";
            $scope.citySubTypeData = [];
            $scope.cityBudgetData = [];
            $scope.getCityInfo("hotel", $scope.urlDestinationCity);
            $scope.ntMustdo = "";
            break;
            case 2:
            url = "restaurants";
            $scope.cityDestinationView = false;
            $scope.cityoptions.active = "restaurants";
            $scope.citySubTypeData = [];
            $scope.cityBudgetData = [];
            $scope.getCityInfo("restaurant", $scope.urlDestinationCity);
            $scope.ntMustdo = "";
            break;
            case 3:
            url = "itineraries";
            $scope.cityDestinationView = false;
            $scope.cityoptions.active = "itineraries";
            $scope.cityRestaurantCuisine = [];
            $scope.citySubTypeData = [];
            $scope.cityBudgetData = [];
            $scope.getCityInfo("itinerary", $scope.urlDestinationCity);
            $scope.ntMustdo = "";
            break;
            case 4:
            url = "bookings";
            $scope.cityDestinationView = false;
            $scope.cityoptions.active = "bookings";
            $scope.viewBookingLoader = true;
            $scope.usrTourPackageCard = [];
            $scope.callTour(1);
            $scope.getBooking($state.params.url.toLowerCase(), $scope.bookingCountryName);
            $scope.ntMustdo = "";
            break;
            case 5:
            url = "best-time-to-visit";
            $scope.cityDestinationView = false;
            $scope.cityoptions.active = "best-time-to-visit";
            $scope.ntMustdo = "";
            $scope.getCityInfo("itinerary", $scope.urlDestinationCity);
            TemplateService.title = "Best Time To Visit " + $scope.cityDestData.name + " -   TraveLibro";
            break;
            default:
            $scope.getCityInfo("mustDo", $scope.urlDestinationCity);
            break;
        }
        console.log(url);
        if (view == 4) {
            $state.go("cityBooking", {
                name: url,
                url: $state.params.url.toLowerCase(),
                country: $scope.cityDestData.country.name.toLowerCase()
            }, {
                notify: false
            })
        } else {
            $state.go("destinationcity", {
                name: url,
                url: $state.params.url.toLowerCase(),
            }, {
                notify: false
            });
        }
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
        NavigationService.getCityDestination({
            urlSlug: $scope.urlDestinationCity,
            budget: budget,
            cuisine: cuisine,
            type: type,
        }, function (data) {
            $scope.cityDestData = data.data;
            console.log($scope.cityDestData, "budget");
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

    // booking slider
    setTimeout(function () {
        $('.flexslider').flexslider({
            animation: 'slide',
            itemWidth: 280,
            itemMargin: 5,
            controlNav: false
        })
    }, 100);
    // booking slider end

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

.controller('MylifeCtrl', function ($scope, $state, $stateParams, TemplateService, NavigationService, cfpLoadingBar, TravelibroService, $timeout, $uibModal, $location, $filter, MyLife, OnGoJourney, localLife, LikesAndComments, $anchorScroll, anchorSmoothScroll, $location) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("mylife");
    $scope.menutitle = NavigationService.makeactive("Mylife");
    $scope.navigation = NavigationService.getnav();

    $scope.localView = {};
    $scope.localView.view = true;
    $scope.showTravellife = false;
    $scope.visited = [];
    var allMyLife = [
    "views/content/myLife/journey.html",
    "views/content/myLife/moments.html",
    "views/content/myLife/reviews.html",
    "views/content/myLife/drafts.html"
    ];
    $scope.myLife = {
        profileMain: "views/content/myLife/profile.html",
        innerView: allMyLife[0]
    };
    $scope.viewTab = 1;
    $scope.isMine = $.jStorage.get("isMine");
    var pageNo = 0;
    $scope.scroll = {
        busy: false
    };
    $scope.travelLife = [];
    var allowAccess = false;
    $scope.allowAccess = allowAccess;
    $scope.isLoggedIn = $.jStorage.get("isLoggedIn");
    $scope.isopen = false;
    var modal = "";
    var arr = [];
    $scope.obj = {};
    $scope.level = "";
    $scope.viewMonth = false;
    $scope.momentView = 1;
    $scope.album = {};
    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    $scope.oneAtATime = true;
    var wholePost = {};
    $scope.reviewView = 1;
    $scope.mapPathData = window._mapPathData;
    $scope.heatmapColors = ['#2c3757', '#ff6759'];


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
    $scope.data = {
        'bucketList': {
            metric: 0
        },
        'countryVisited': {
            metric: 1
        }
    };
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


    //LOCAL LIFE
    $scope.scroll2 = {};
    $scope.scroll2.busy = false;
    $scope.scroll2.stopCallingApi = false;
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
    $scope.localCategory = [];
    $scope.localPostCount = {};
    $scope.viewLocal = true;
    $scope.showLikeCommentCard = true;
    $scope.comment = {
        "text": ""
    };
    $scope.audioStatus = {
        on: false
    };
    //LOCAL LIFE END




    setInterval(function () {
        $scope.paginationLoader = TemplateService.paginationLoader;
    }, 300);

    $scope.likeUnlikeActivity = function (activity) {
        console.log(activity.likeUnlikeFlag, activity.uniqueId, activity._id);
        console.log(activity.likeDone + "this call is from journey.html");
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
        // console.log("entered if");
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
        } else if ($scope.userData.gender == "female") {
            $scope.pronoun = "she";
            $scope.pronoun1 = "her";
        } else {
            $scope.pronoun = "They";
            $scope.pronoun1 = "Them";
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
    //backgroundClick end
    function reloadCount() {
        NavigationService.getProfile($.jStorage.get("activeUrlSlug"), function (data, status) {
            $scope.userData = data.data;
            // console.log($scope.userData.countriesVisited_count);
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
        MyLife.updateBucketList(country, function (data, status) {
            reloadCount();
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
    };
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
            var obj = {
                "countryId": country._id,
                "visited": []
            }
            MyLife.updateCountriesVisited(obj, function (data, status) {
                reloadCount();
                modal.close();
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

    $scope.obj.visited = arr;
    if (!(_.isEmpty($scope.obj.visited))) {
        MyLife.updateCountriesVisited($scope.obj, function (data, status) {
            reloadCount();
        }, function () {});
        $scope.getMap();
    }
    //update countries visited ends
    // Little more about me starts here
    function titleCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
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
    };
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
    //userBadge ends here

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
        $scope.routeTO = function (type, urlSlug, userSlug) {
            console.log(type, urlSlug, userSlug);
            if (type == "on-the-go-journey" || type == "ended-journey") {
                $state.go('ongojourney', {
                    'id': urlSlug,
                    'urlSlug': userSlug
                });
            } else if (type == "quick-itinerary") {
                $state.go('userquickitinerary', {
                    'id': urlSlug,
                    'urlSlug': userSlug
                });
            } else if (type == 'detail-itinerary') {
                $state.go('userdetailitinerary', {
                    'id': urlSlug,
                    'urlSlug': userSlug
                });
            }
        };
    // routing to on-the-go,detailed-iti,quick-iti ends here

    // followFollowing  Function
    $scope.followFollowing = function (user) {
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }
        // followFollowing  Function END

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
        }, function (data) {
            console.log(data);
        });
        MyLife.getTravelLifeMoments("travel-life", 1, function (data) {
            $scope.travelLifeMoments = {
                "arr": data.data,
                "scrollBusy": false,
                "stopCallingApi": false,
                "type": "travel-life",
                "pageNo": 1
            };
            // $scope.travelLifeMoments = data.data;
        }, function (data) {
            console.log(data);
        });
        MyLife.getAllMoments("", 5, "local-life", 3, function (data) {
            $scope.localLifeMoments = {
                "arr": data.data,
                "scrollBusy": false,
                "stopCallingApi": false,
                "type": "local-life"
            };
            // $scope.localLifeMoments = data.data;
        }, function (data) {
            console.log(data);
        })
    };
    $scope.getMoreMoments = function (moment) {
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
                    });
                    break;
                    default:
                    console.log("No Match Found");
                }
            }
        }
    };
    $scope.getMorePhotos = function (album) {
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
                    });
                    break;
                    case 'all':
                    case 'local':
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
                    });
                    break;
                }
            }
        }
    };
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
        });
        $scope.showMonthView();
    };

    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
        // $scope.userProfilePic = $.jStorage.get("profile").profilePicture;
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
        });
        $scope.showMonthView();
    };
    //moment Integration ends here

    // reviews json
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
            $scope.postReview = _.cloneDeep(post.review[0]);
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
        })
    };

    $scope.getAllReviews = function (review) {
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
                });
            }
        }
    };

    $scope.getMoreReviews = function (object, flag) {
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
        $scope[showType] = true;
        switch (showType) {
            case 'viewTravelCountry':
            $scope.citiesTravelled = {
                "countryName": review.name,
            };
            MyLife.getCities(review._id, function (data) {
                    // review.cities = data.data;
                    $scope.citiesTravelled.cities = data.data;
                });
            break;
            case 'viewLocalCountry':
            $scope.categoryList = {
                "cityName": review.name,
            };
            MyLife.getCategories(review._id, function (data) {
                    // review.categories = data.data;
                    $scope.categoryList.categories = data.data;
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
                });
                break;
                case 'local-life':
                MyLife.getReviewsByCategories(object.city, object._id, object.pageNo, function (data) {
                    object.accordReview = data.data;
                });
                break;
            }
        } else {}
    };
    $scope.savePostReview = function (values) {
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
        })
    };

    //reviews integration ends here

    var smoothScroll = function (url) {
        setTimeout(function () {
            $location.hash(url);
            anchorSmoothScroll.scrollTo(url);
        }, 3000);
    };

    var allMyLife = [
    "views/content/myLife/journey.html",
    "views/content/myLife/moments.html",
    "views/content/myLife/reviews.html",
    "views/content/myLife/drafts.html"
    ];
    $scope.myLife = {
        profileMain: "views/content/myLife/profile.html",
        innerView: allMyLife[0]
    };
    // change url
    $scope.viewTab = 1;
    switch ($state.params.name) {
        case "journeys":
        console.log("scrolling to journeys");
        $scope.myLife.innerView = allMyLife[0];
            // $location.hash("journeys");
            // anchorSmoothScroll.scrollTo("journeys");
            smoothScroll($state.params.name);
            break;
            case "moments":
            getMoments();
            console.log("scrolling to moments");
            $scope.myLife.innerView = allMyLife[1];
            smoothScroll($state.params.name);
            // $location.hash("moments");
            // anchorSmoothScroll.scrollTo("moments");
            break;
            case "reviews":
            getReviews();
            console.log("scrolling to reviews");
            $scope.myLife.innerView = allMyLife[2];
            smoothScroll($state.params.name);
            // $location.hash("reviews");
            // anchorSmoothScroll.scrollTo("reviews");
            break;
            case "drafts":
            $scope.myLife.innerView = allMyLife[3];
            break;
            default:
            $scope.myLife.innerView = allMyLife[0];
        }


        $scope.getTab = function (view) {
        //   alert(view);
        $scope.myLife.innerView = allMyLife[view];
        var url = "journeys";
        switch (view) {
            case 0:
                //   $stateParams.name = "journeys";
                url = "journeys";
                //   anchorSmoothScroll.scrollTo(url);
                break;
                case 1:
                //   $stateParams.name = "moments";
                url = "moments";
                getMoments();
                //   anchorSmoothScroll.scrollTo(url);
                break;
                case 2:
                console.log("reviews m hu bhai");
                //   $stateParams.name = "reviews";
                url = "reviews";
                getReviews();
                //   anchorSmoothScroll.scrollTo(url);
                break;
                case 3:
                console.log("reviews m hu bhai");
                url = "drafts";
                $stateParams.name = "drafts";
                break;
            }
            $state.go("mylife1", {
                urlSlug: $.jStorage.get("activeUrlSlug"),
                name: url
            }, {
                reload: true,
                notify: false
            }).then(function () {
                $location.hash(url);
                anchorSmoothScroll.scrollTo(url);
            });
        }

    $scope.mapPathData = window._mapPathData; // defined in _mapdata.js
    $scope.mapDataHumanizeFn = function (val) {
        return val + " units";
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
    var getAllJourney = function (journeys) {
        _.each(journeys, function (obj) {
            $scope.travelLife.push(obj);
            setTimeout(function () {
                $scope.scroll.busy = false;
            }, 500);
        });
        // console.log($scope.travelLife);
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
    var viewLocalLife = function (dataLocal) {
        $scope.localLifeJourney = dataLocal.data;
        $scope.localDate = dataLocal.datesArr;
        $scope.localPostCount = dataLocal.count;
        $scope.localCategory = dataLocal.categories;
        $scope.localRating = dataLocal.rating;
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
        console.log($scope.showTravellife, 'value');
        if ($scope.scroll2.stopCallingApi == false && $scope.showTravellife == false) {
            $scope.localFilterPost.pagenumber++;
            console.log($scope.localFilterPost.pagenumber++, 'pagenumber');
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
            console.log($scope.localFilterPost.month, 'what is month', $scope.localFilterPost.year, 'what is year');
            $scope.localFilterPost.pagenumber = 1;
            localLife.getLocalJourney(viewLocalLife, $scope.localFilterPost, function (err) {
                console.log(err);
            });
            $scope.viewLocal = false;
            break;
            case 'checkIn':
            console.log(filterdData, "--------");
            var getCheckInIndex = _.findIndex($scope.localFilterPost.checkInType, function (newData) {
                return newData == filterdData;
            });
            $scope.localFilterPost.pagenumber = 1;
            if (getCheckInIndex === -1) {
                $scope.localFilterPost.checkInType.push(filterdData);
                console.log($scope.localFilterPost.checkInType, 'array');
            } else {
                _.remove($scope.localFilterPost.checkInType, function (newArr) {
                    return newArr == filterdData;
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
            $scope.localFilterPost.pagenumber = 1;
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
            $scope.localFilterPost.pagenumber = 1;
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
                $scope.localFilterPost.pagenumber = 1;
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
                $scope.localFilterPost.pagenumber = 1;
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
    $scope.comment = {
        "text": ""
    }
    $scope.postScrollData = {};
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.viewList = false;
    $scope.showLikeCommentCard = true;
    $scope.openCommentSection = function (ongo) {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        }
        $scope.showLikeCommentCard = false;
        // var type = "";
        // if (ongo.type === 'on-the-go-journey' || ongo.type === 'ended-journey') {
        //   type = "journey";
        // } else if (ongo.type === 'quick-itinerary' || ongo.type === 'detail-itinerary') {
        //   type = "itinerary";
        // }
        $scope.listOfLikes = false;
        console.log(ongo, 'ongo');
        $scope.post = ongo; //for using it in comment section
        $scope.previousId;
        $scope.postScrollData.type = ongo.type;
        $scope.postScrollData._id = ongo._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != $scope.post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(ongo.type, $scope.post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(ongo.type, $scope.post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = $scope.post._id;
        $timeout(function () {
            $scope.showLikeCommentCard = true;
        }, 1000);
    };

    // $scope.postPostsComment = function (uniqueId, comment, postId) {
    //   console.log(uniqueId, comment, postId);
    //   console.log("controller se comment hua");
    //   var type = "post";
    //   var additionalId = null;
    //   var hashTag = [];
    //   var callback = function (data) {
    //     $scope.listOfComments = data.data;
    //     document.getElementById('enterComment').value = "";
    //   };
    //   LikesAndComments.postComment(type, uniqueId, postId, comment, hashTag, additionalId, callback);
    // };

    $scope.openLikeSection = function (ongo) {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        }
        console.log('local ya travel');
        $scope.listOfComments = false;
        $scope.viewCardComment = false;
        $scope.postScrollData.type = ongo.type;
        $scope.postScrollData._id = ongo._id;
        console.log(ongo);
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        };
        // console.log($scope.post);
        if ($scope.previousLikeId != ongo._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = ongo._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(ongo.type, ongo._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(ongo.type, ongo._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = ongo._id;
    };
    $scope.audioStatus = {
        on: false
    }
    $scope.muteVolume = function () {
        if ($("video").prop('muted')) {
            $scope.audioStatus = {
                on: true
            }
            $("video").prop('muted', false);
        } else {
            $scope.audioStatus = {}
            $("video").prop('muted', true);
        }
    }
    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 100);
    };
    // PROFILE LIST REDIRECT
    $scope.profileListRedirect = function (pageStyle, activeUrlSlug) {
        console.log('bantas');
        if (TemplateService.isMine || ($scope.userData.following == 1 && $scope.userData.status == 'private') || $scope.userData.status == 'public') {
            console.log('santa mein hai');
            if (pageStyle == 'following') {
                console.log('pageStyle following');
                $state.go('ProfileList', {
                    'urlSlug': activeUrlSlug,
                    'active': 'following'
                });
            } else if (pageStyle == 'followers') {
                console.log('pageStyle followers');
                $state.go('ProfileList', {
                    'urlSlug': activeUrlSlug,
                    'active': 'followers'
                });
            } else if (pageStyle == 'countries-visited') {
                console.log('pageStyle countries');
                $state.go('ProfileList', {
                    'urlSlug': activeUrlSlug,
                    'active': 'countries-visited'
                });
            } else if (pageStyle == 'bucket-list') {
                console.log('pageStyle bucket');
                $state.go('ProfileList', {
                    'urlSlug': activeUrlSlug,
                    'active': 'bucket-list'
                });
            } else {
                $state.go('ProfileList', {
                    'urlSlug': activeUrlSlug,
                    'active': 'following'
                });
            }
        } else {
            $location.hash('journeys');
            anchorSmoothScroll.scrollTo('journeys');
            // console.log('karan arjun console mein aayenge');
        }
    };
    // PROFILE LIST REDIRECT END

    if ($.jStorage.get("isLoggedIn") && $.jStorage.get("profile") && ($.jStorage.get("profile").urlSlug == $stateParams.urlSlug)) {
        //its your own profile so no need to call profile again
        $scope.userData = $.jStorage.get("profile");
        if ($.jStorage.get("profile").type === "User") {
            TemplateService.title = $scope.userData.name + " | Travel & Local Life | TraveLibro";
            $.jStorage.set("activeUrlSlug", $.jStorage.get("profile").urlSlug);
            $scope.activeUrlSlug = $.jStorage.get("profile").urlSlug;
            // allowAccess = true;
            // $scope.isMine = true;
            setMoreAboutMe();
            reloadCount();
            switch ($state.params.name) {
                case "journeys":
                console.log("scrolling to journeys");
                $scope.myLife.innerView = allMyLife[0];
                    // $location.hash("journeys");
                    // anchorSmoothScroll.scrollTo("journeys");
                    smoothScroll($state.params.name);
                    break;
                    case "moments":
                    getMoments();
                    console.log("scrolling to moments");
                    $scope.myLife.innerView = allMyLife[1];
                    smoothScroll($state.params.name);
                    // $location.hash("moments");
                    // anchorSmoothScroll.scrollTo("moments");
                    break;
                    case "reviews":
                    getReviews();
                    console.log("scrolling to reviews");
                    $scope.myLife.innerView = allMyLife[2];
                    smoothScroll($state.params.name);
                    // $location.hash("reviews");
                    // anchorSmoothScroll.scrollTo("reviews");
                    break;
                    case "drafts":
                    $scope.myLife.innerView = allMyLife[3];
                    break;
                    default:
                    $scope.myLife.innerView = allMyLife[0];
                    console.log('test');
                    break;
                }
                var getAllCountries = function (countries) {
                    $scope.nationality = countries;
                    $scope.getMap();
                };
                MyLife.getAllCountries(getAllCountries, function (err) {
                    console.log(err);
                });
            } else {
                $state.go("agent-home-without", {
                    urlSlug: $stateParams.urlSlug
                });
            }
        } else {
        //someone elses profile so get his/her data
        allowAccess = false;
        $.jStorage.set("activeUrlSlug", $stateParams.urlSlug);
        $scope.activeUrlSlug = $stateParams.urlSlug;
        // $scope.isMine = false;
        NavigationService.getProfile($stateParams.urlSlug, function (data) {
            if (data.value) {
                if (data.data.type === "User") {
                    $scope.userData = data.data;
                    TemplateService.title = $scope.userData.name + " | Travel & Local Life | TraveLibro";
                    allowAccess = false;
                    setMoreAboutMe();
                    reloadCount();
                    switch ($state.params.name) {
                        case "journeys":
                        console.log("scrolling to journeys");
                        $scope.myLife.innerView = allMyLife[0];
                            // $location.hash("journeys");
                            // anchorSmoothScroll.scrollTo("journeys");
                            smoothScroll($state.params.name);
                            break;
                            case "moments":
                            getMoments();
                            console.log("scrolling to moments");
                            $scope.myLife.innerView = allMyLife[1];
                            smoothScroll($state.params.name);
                            // $location.hash("moments");
                            // anchorSmoothScroll.scrollTo("moments");
                            break;
                            case "reviews":
                            getReviews();
                            console.log("scrolling to reviews");
                            $scope.myLife.innerView = allMyLife[2];
                            smoothScroll($state.params.name);
                            // $location.hash("reviews");
                            // anchorSmoothScroll.scrollTo("reviews");
                            break;
                            case "drafts":
                            $scope.myLife.innerView = allMyLife[3];
                            break;
                            default:
                            $scope.myLife.innerView = allMyLife[0];
                            console.log('test');
                            break;
                        }
                        var getAllCountries = function (countries) {
                            $scope.nationality = countries;
                            $scope.getMap();
                        };
                        MyLife.getAllCountries(getAllCountries, function (err) {
                            console.log(err);
                        });
                    } else {
                        $state.go("agent-home-without", {
                            urlSlug: $stateParams.urlSlug
                        });
                    }
                } else {
                    $state.go("errorpage");
                }
            }, function (data) {
                console.log(data);
            });
    }
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
    $scope.buildNow = function () {
        $scope.$broadcast('rebuild:me');
    }
    $scope.$on('scrollbar.hide', function () {
        // console.log('Scrollbar hide');
    });
    $scope.$on('scrollbar.show', function () {
        // console.log('Scrollbar show');
    });


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
    $timeout(function () {
        if ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1)) {
            $(".download-app").addClass("hide");
    }
}, 200);
    $scope.customLink = function () {
        window.open("https://play.google.com/store/apps/details?id=com.ascra.app.travellibro");
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

.controller('DraftsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("drafts");
    $scope.menutitle = NavigationService.makeactive("Drafts");
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

.controller('SettingCtrl', function ($scope, TemplateService, NavigationService, cfpLoadingBar, $timeout, DataUriToBlob, $stateParams, $state) {
    //Used to name the .html file
    $scope.profile = $.jStorage.get("profile");
    $scope.userData = _.clone($scope.profile);
    $scope.showUsernameError = false;
    // console.log("Testing Consoles");
    $scope.template = TemplateService.changecontent("setting");
    $scope.menutitle = NavigationService.makeactive("Setting");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.saveSetting = false;
    $scope.uploadingPic = false;
    $scope.showSetting = 1;
    var url = $stateParams.path;
    $scope.setting = function (val) {
        if (val == 1) {
            $scope.showSetting = 1;
            url = "settings";
        } else if (val == 2) {
            $scope.showSetting = 2;
            url = "edit-profile";
        } else if (val == 3) {
            $scope.showSetting = 3;
        } else if (val == 4) {
            $scope.showSetting = 4;
        } else if (val == 5) {
            $scope.showSetting = 5;
            url = "privacy-settings";
        } else if (val == 6) {
            $scope.showSetting = 6;
            url = "report";
        } else {
            $scope.showSetting = 1;
            url = "settings";
        }
        $state.go("setting", {
            "path": url
        }, {
            location: true,
            notify: false,
            reload: false
        });
    };

    switch ($stateParams.path) {
        case "settings":
        $scope.showSetting = 1;
        break;
        case "privacy-settings":
        $scope.showSetting = 5;
        break;
        case "edit-profile":
        $scope.showSetting = 2;
        break;
        case "report":
        $scope.showSetting = 6;
        break;
    }

    // datepicker
    $scope.format = 'dd-MM-yyyy';
    $scope.open1 = function () {
        $scope.popup1.opened = true;
        showWeeks = false;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.dateOptions = {
        "initDate": $scope.userData.dob,
        showWeeks: false
    }

    // datepicker end
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
    $scope.removeSameFile = function () {
        angular.element("input[type='file']").val(null);
    }

    $scope.travelConfig.chooseHoliday = [{
        img: "img/beach.png",
        caption: "Islands & Beaches",
        storeCaption: "Islands & Beaches",
    }, {
        img: "img/city.png",
        caption: "Cities",
        storeCaption: "Cities"
    }, {
        img: "img/safari.png",
        caption: "Safaris",
        storeCaption: "Safaris"
    }, {
        img: "img/mountain.png",
        caption: "Mountains",
        storeCaption: "Mountains"
    }, {
        img: "img/cruise.png",
        caption: "Cruises",
        storeCaption: "Cruises"
    }, {
        img: "img/countryside.png",
        caption: "Countrysides",
        storeCaption: "Countrysides"
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
        caption1: "Luxury",
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
        caption1: "Festival",
        storeCaption: "Festival"
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
    _.each(new Array(4), function (value, key) {
        // console.log(value,'value',key,'key');
        switch (key) {
            case 0:
            console.log($scope.userData.travelConfig.kindOfHoliday, 'kind of holiday');
            _.each($scope.userData.travelConfig.kindOfHoliday, function (n1) {
                if (n1 == 'Countryside') {
                    n1 = 'Countrysides'
                } else if (n1 == 'Safari') {
                    n1 = 'Safaris'
                }
                var index = _.findIndex($scope.travelConfig.chooseHoliday, function (n2) {
                    return n1 == n2.storeCaption;
                });
                console.log(index);
                $scope.travelConfig.chooseHoliday[index].class = "active-holiday";
            });
            break;
            case 1:
            _.each($scope.userData.travelConfig.usuallyGo, function (n1) {
                var index = _.findIndex($scope.travelConfig.usuallyGo, function (n2) {
                    return n1 == n2.storeCaption;
                });
                $scope.travelConfig.usuallyGo[index].class = "active-holiday";
            });
            break;
            case 2:
            _.each($scope.userData.travelConfig.preferToTravel, function (n1) {
                var index = _.findIndex($scope.travelConfig.preferTravel, function (n2) {
                    return n1 == n2.storeCaption;
                });
                $scope.travelConfig.preferTravel[index].class = "active-holiday";
            });
            break;
            case 3:
            _.each($scope.userData.travelConfig.holidayType, function (n1) {
                var index = _.findIndex($scope.travelConfig.idealSelect, function (n2) {
                    return n1 == n2.storeCaption;
                        // console.log(n1, n2.storeCaption);
                    });
                    // console.log(index);
                    $scope.travelConfig.idealSelect[index].class = "active-holiday";
                });
            break;
        }

    })

    // page 2 integration ends
    console.log($scope.travelConfig, 'what is travelConfig');
    $scope.editUserData = function (userData, status, valid) {
        console.log(userData, 'userdata of setting');
        console.log(valid);
        $scope.saveSetting = true;
        console.log(userData, 'user data', status, 'status');
        // cfpLoadingBar.start();
        if (valid) {
            NavigationService.editUserData(userData, status, function (data) {
                console.log(userData, 'what is the userData');
                if (data.value) {
                    console.log($.jStorage.get('profile'), 'jStorage', userData.urlSlug, 'user ka urlSlug');
                    $scope.saveSetting = false;
                    NavigationService.getProfile(userData.urlSlug, function (data, status) {
                        if (data.data._id) {
                            $.jStorage.set("isLoggedIn", true);
                            $.jStorage.set("profile", data.data);
                            location.reload();
                            // console.log($.jStorage.get('profile'));
                            console.log("Profile successfully set on jStorage");
                        } else {
                            $.jStorage.flush();
                        }
                    }, function (err) {
                        console.log("Error:", err);
                    });
                } else {
                    console.log('error set');
                    $scope.showUsernameError = true;
                }
                // cfpLoadingBar.complete();
            });
        } else {}
    };

    $scope.uploadProfilePicture = function (imageBase64) {
        $scope.uploadingPic = true;
            // console.log(imageBase64,'what is imageBase 64');
            // cfpLoadingBar.start();
            // var file = imageTestingCallback(imageBase64, 'image/png');
            var blob = DataUriToBlob.dataURItoBlob(imageBase64, 'image/png');
            var formData = new FormData();
            console.log(formData, "before appending");
            formData.append('file', blob, "abcd.png");
            console.log(formData, "after appending");
            NavigationService.uploadFile(formData, function (response) {
                if (response.value) {
                    $scope.uploadingPic = false;
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
        // remove pic
        $scope.removeSettingPic = function () {
            angular.element("input[type='file']").val(null);
            $scope.showImage = false;
        }
        // remove pic end
        // REPORT PROBLEM
        $scope.saveReport = function (settingReport) {
            NavigationService.ReportProblems({
            // userId: $scope.userData._id,
            problem: settingReport
        }, function (data) {
            if (data.value == true) {
                $scope.showme = true;
            } else {
                $scope.showme = false;
            }
        })
        };
    // REPORT PROBLEM END
})

.controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blog");
    $scope.menutitle = NavigationService.makeactive("Blog");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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

.controller('ActivityTestCtrl', function ($scope, $state, TemplateService, NavigationService, cfpLoadingBar, Activity, LikesAndComments, $timeout, $http, $uibModal, MyLife) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("activitytest");
    $scope.menutitle = NavigationService.makeactive("Activity");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.showLikeCommentCard = true;
    // setInterval(function () {
    //   $scope.paginationLoader = TemplateService.paginationLoader;
    //   console.log($scope.paginationLoader, 'value');
    // }, 300);
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;
    $scope.noActivity = false;
    $scope.openThankYouModal = function () {
        $uibModal.open({
            templateUrl: "views/modal/report.html",
            animation: true,
            scope: $scope,
            windowClass: "report-modal"
        });
    };
    $scope.userData = $.jStorage.get("profile");
    var scroll = {
        'pageNo': 1,
        'scrollBusy': false,
        'stopCallingApi': false
    }
    var firstListCallback = scroll.scrollBusy = true;
    Activity.getAllActivities(1, function (data) {
        scroll.scrollBusy = false;
        if (data.length == 0) {
            scroll.stopCallingApi = true;
            $scope.noActivity = true;
        } else {
            $scope.activities = data;
            $scope.noActivity = false;
            scroll.pageNo = 1;
        }
    }, function (data) {
        console.log(data);
        getMoreActivities();
    }, $scope.userData);

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
                }, $scope.userData)
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
        // $scope.userProfilePic = $.jStorage.get("profile").profilePicture;
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
        activity.display = activity.activityPhotosVideos[index].type;
    };

    $scope.likeUnlikeActivity = function (activity) {
        console.log(activity);
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
        LikesAndComments.getLikes(activity.type, activity._id, 1, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };

    $scope.listLikesDropDown = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };

    $scope.getCommentsData = function (activity) {
        $scope.showLikeCommentCard = false;
        console.log(activity);
        $scope.previousId;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.post = activity;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = activity.type;
        $scope.postScrollData._id = activity._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            console.log($scope.listOfComments);

            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != activity._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = activity._id;
        $timeout(function () {
            $scope.showLikeCommentCard = true;
        }, 1000)
    };

    $scope.getLikesData = function (activity) {
        // $scope.showLikeCommentCard = false;
        $scope.postScrollData.type = activity.type;
        $scope.postScrollData._id = activity._id;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
            // $timeout(function() {
            //     $scope.showLikeCommentCard = true;
            // }, 1000)
        };
        console.log($scope.post);
        if ($scope.previousLikeId != activity._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = activity._id;
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.likePageNumber = 1;
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.viewList = false;
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 100);
    };

    $scope.followFollowing = function (user) {
        console.log("from activity");
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                _.each($scope.activities, function (n) {
                    if (n.owner._id == user._id) {
                        n.owner.following = data.data.responseValue;
                    }
                    console.log(n);
                });
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }

    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };

    $scope.postPostsComment = function (activity, comment) {
        console.log("activity comments");
        console.log(activity, comment);
        console.log("controller se comment hua");
        var type = activity.likeUnlikeFlag;
        var additionalId = null;
        var hashTag = [];
        var callback = function (data) {
            $scope.listOfComments = data.data;
            document.getElementById('enterComment').value = "";
        }
        LikesAndComments.postComment(activity.type, activity.uniqueId, activity._id, comment, hashTag, additionalId, callback);
    };

    $scope.editYourComment = function () {
        $scope.viewEditBox = true;
        console.log(viewEditBox, 'edit wala box');
    }
        // edit comment

    // edit comment end
    // delete comment
    $scope.deleteComment = function (commentId, commentType) {
        console.log($scope.listOfComments, 'lof');
        console.log(commentId, 'id');
        LikesAndComments.commentDelete(commentId, commentType, function (data) {
            if (data.value == true) {
                _.remove($scope.listOfComments.comment, function (list) {
                    return list._id == commentId;
                })
                console.log($scope.listOfComments.comment, 'total nikla kya');
            }
        });
    };
    // delete comment end

    $scope.getReview = function (post) {
        wholePost = post; //this is to set post_id in savePostReview() function
        console.log(wholePost);
        $scope.postReview = {};
        $scope.checkIn = post.checkIn; // this is to diplay checkin location inside uib modal
        $scope.checkIn.type = post.type;
        if (post.review && post.review.length !== 0) {
            console.log("Edit Rating");
            $scope.postReview = _.cloneDeep(post.review[0]);
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
            // controller: 'reviewPostModalCtrl',
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

    var flushReviewsData = function () {
        $scope.postReview = {};
        $scope.showRating = 1;
        $scope.postReview.rating = 1;
        $scope.fillColor2 = "";
        $scope.fillColor3 = "";
        $scope.fillColor4 = "";
        $scope.fillColor5 = "";
    }

    $scope.savePostReview = function (values) {
        console.log(wholePost);
        var obj = {
            "post": wholePost._id,
            "rating": values.rating.toString(),
            "review": values.review
        }
        MyLife.savePostReview(obj, function (data) {
            if (data.value) {
                if (wholePost.review == null || wholePost.review == undefined || wholePost.review.length == 0) {
                    wholePost.review = [{}];
                    wholePost.rated = true;
                }
                wholePost.review[0].post = obj.post;
                wholePost.review[0].rating = obj.rating;
                wholePost.review[0].review = obj.review;
                console.log("sdasadadsadsadadda", wholePost.review);
                modal.close();
            } else {}
            // cfpLoadingBar.complete();
        })
    };

    // modal.closed.then(function () {
    //   $scope.listOfComments = {};
    // });


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

    // route to on go journey
    $scope.routeOngo = function (activity) {
        console.log(activity, 'user');
        if (activity.type == 'ended-journey' || activity.type == 'on-the-go-journey') {
            $state.go('ongojourney', {
                'id': activity.urlSlug,
                'urlSlug': activity.user.urlSlug
            });
        }
    }
        // route to on go journey end
        // route to itinerary
        $scope.routeItinerary = function (activity) {
            console.log(activity, 'user');
            if (activity.type == 'quick-itinerary') {
                $state.go('userquickitinerary', {
                    'id': activity.urlSlug,
                    'urlSlug': activity.user.urlSlug
                });
            } else {
                $state.go('userdetailitinerary', {
                    'id': activity.urlSlug,
                    'urlSlug': activity.user.urlSlug
                });
            }
        }
        // route to itinerary end

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        console.log($scope.shareUrl, 'share ka url');
        shareModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/sharing.html",
            scope: $scope
        });
    }
        // sharing local life modal end
        // agent album view
        $scope.allAlbum = [];
        $scope.viewAlbum = function (id) {
            NavigationService.getAlbum({
                "_id": id
            }, function (data) {
                if (data.value == true) {
                    $scope.allAlbum = data.data;
                    console.log($scope.allAlbum, 'album value');
                    var $index = 0
                    $scope.getPhotosCommentData($scope.allAlbum[0]._id, $index, $scope.allAlbum.length, $scope.allAlbum);
                }
            })
        }
        // agent album view end
    })

.controller('ProfileListCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, MyLife, $uibModal, $state, LikesAndComments) {
    //Used to name the .html file

    // console.log("Testing Consoles");
    $scope.template = TemplateService.changecontent("profile-list");
    $scope.menutitle = NavigationService.makeactive("ProfileList");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.userData = $.jStorage.get("profile");
    $scope.activeMenu = $stateParams.active;
    setInterval(function () {
        $scope.searchLoader = TemplateService.searchLoader;
    }, 3000);

    $scope.allowAccess = $.jStorage.get("allowAccess");
    $scope.viewDropdown = {
        'showDropdown': false
    }

    if ($.jStorage.get("activeUrlSlug") != "" && $.jStorage.get("activeUrlSlug") != null) {
        $scope.activeUrlSlug = $.jStorage.get("activeUrlSlug");
    } else {
        $scope.activeUrlSlug = $.jStorage.get("profile").urlSlug;
    }

    // click background close
    var searchCounter = 0;
    $scope.searchToFollow = function (userName, model) {
        console.log(userName);
        model.showDropdown = true;
        searchCounter++;
        MyLife.searchAllUser(userName, searchCounter, function (data) {
            if (data.value && searchCounter === data.data.counter) {
                $scope.searchList = data.data.following;
                searchCounter = 0;
            } else {

            }
        });
    };
    // click background close end

    $("body").click(function (e) {
        // console.log($(e.target).hasClass('entry-content'));
        if ($(e.target).hasClass('entry-content')) {
            return false;
        } else {
            $scope.viewDropdown.showDropdown = false;
            $scope.$apply();
        }
    });

    var getAllCountries = function () {
        MyLife.getAllCountries(function (countries) {
            $scope.nationality = countries;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.updateBucketList = function (country) {
        // console.log(country, country.bucketList, country.bucketList && country.bucketList == true);
        if (country.bucketList && country.bucketList == true) {
            console.log("if");
            MyLife.updateBucketList(country, function (data, status) {
                MyLife.getOneBucketList($stateParams.urlSlug, function (data) {
                    $scope.bucketList = data;
                    reloadCount();
                });
            }, function () {});
        } else {
            console.log('else');
            MyLife.updateBucketList(country, function (data) {
                document.getElementById(country._id).remove();
                reloadCount();
            }, function () {});
        }
    };

    $scope.obj = {};
    $scope.updateCountryVisited = function (id) {
        $scope.obj.countryId = id;
        console.log(id);
        modal = $uibModal.open({
            animation: true,
                // windowClass: "delete-visited-country",
                templateUrl: "views/modal/country-visited.html",
                scope: $scope
            });
        modal.closed.then(function () {
            visitedArr = [];
        });
            //for getting all the visited years  of that respective country starts
            var callback = function (data) {
                console.log(data, 'data kya chee');
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
        $scope.removeText = true;
        modal = $uibModal.open({
            scope: $scope,
            animation: true,
            windowClass: "delete-visited-country",
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
            MyLife.getCountryVisitedListExpanded($stateParams.urlSlug, callbackGetCountriesVisited);
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
                MyLife.getCountryVisitedListExpanded($stateParams.urlSlug, callbackGetCountriesVisited);
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

    //follow unfollow user starts
    $scope.followUnFollowUser = function (obj, flag, model) {
        console.log(obj);
        LikesAndComments.followUnFollow(obj, function (data) {
            if (data.value) {
                if (flag == "fromFollowing") {
                    obj.following = data.data.responseValue;
                    MyLife.getFollowingWeb($stateParams.urlSlug, callbackFollowings);
                } else if (flag == "fromFollowers") {
                    obj.following = data.data.responseValue;
                    MyLife.getFollowersWeb($stateParams.urlSlug, callbackFollowers);
                }
            } else {
                console.log("error updating data");
            }
        });
        backgroundClick.scope = $scope;
    };
    //follow unfollow user ends

    //close dropDown on background click
    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };
    //close dropDown on background click end

    $scope.editOption1 = function (model, class1, class2) {
        LikesAndComments.onClickDropDown(model, $scope, class1, class2);
    };

    $scope.testingDropDown = function (name) {
        $scope.searchUser.open = true;
        if (name.length == 0) {
            $scope.searchCard.name = "";
        }
    };


    var travelCountCallback = function (data, status) {
        $scope.count = data.data;
    };

    var reloadCount = function () {
        NavigationService.travelCount({
            "urlSlug": $stateParams.urlSlug
        }, travelCountCallback, function (err) {
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
        reloadCount();
        if ($scope.activeMenu == 'followers') {
            $scope.searchList = $scope.followersList;
        }
    };

    var callbackFollowings = function (data) {
        $scope.followingList = data.data.following;
        reloadCount();
    };

    var callbackGetCountriesVisited = function (data) {
        $scope.countryVisitedList = data;
        console.log($scope.countryVisitedList, 'give data');
        reloadCount();
    };

    var callbackBucketList = function (data) {
        $scope.bucketList = data;
        reloadCount();
    };

    var callbackRemoveFromBucketList = function (countryId) {
        reloadCount();
        getAllCountries();
        document.getElementById(countryId).remove();
    };

    $scope.removeFromBucketList = function (id) {
        MyLife.updateBucketListWeb(id, callbackRemoveFromBucketList);
    }

    var getFollowings = function () {
        MyLife.getFollowingWeb($stateParams.urlSlug, callbackFollowings);
    }

    var getFollowers = function () {
        MyLife.getFollowersWeb($stateParams.urlSlug, callbackFollowers);
    }

    var getCountriesVisited = function () {
        MyLife.getCountryVisitedListExpanded($stateParams.urlSlug, callbackGetCountriesVisited);
        getAllCountries();
    }

    var getBucketList = function () {
        MyLife.getOneBucketList($stateParams.urlSlug, callbackBucketList);
        getAllCountries();
    }

    var getDatas = function () {
        switch ($scope.activeMenu) {
            case "followers":
            getFollowers();
            break;
            case "following":
            getFollowings();
            break;
            case "countries-visited":
            getCountriesVisited();
            break;
            case "bucket-list":
            getBucketList();
            break;
        }
    }
    getDatas();
    $scope.searchFriend = {};

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
        getDatas();
        $state.go("ProfileList", {
            active: status,
            urlSlug: $scope.activeUrlSlug
        }, {
            location: true,
            notify: false,
            reload: false
        })
    };

})

.controller('ItineraryCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("itinerary");
    $scope.menutitle = NavigationService.makeactive("Itinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.createItinerary = function (status) {
        // $scope.itiType = status;
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            if (status == 'detailitinerary') {
                $state.go('detailitinerary', {
                    'flag': 'new',
                    'urlSlug': ''
                });
            } else {
                $state.go('quickitinerary', {
                    'flag': 'new',
                    'urlSlug': ''
                });
            }
        }
    };

})

.controller('DetailedItineraryCtrl', function ($scope, TemplateService, NavigationService, Itinerary, $timeout, $stateParams, $filter, $state, $uibModal) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("detail-itinerary");
    $scope.menutitle = NavigationService.makeactive("Detailed Itinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.totalUploadCount = 0;
    $scope.uploadCount = 1;
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
            $scope.dItinerary.oldStatus = $scope.dItinerary.status;
            $scope.dItinerary.oldPhotos = _.cloneDeep($scope.dItinerary.photos);
            $scope.dItinerary.oldBuddies = _.cloneDeep($scope.dItinerary.buddies);
            $scope.totalUploadCount = $scope.dItinerary.photos.length;
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
                    'rating': n1.rating,
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
    $scope.format = 'dd-MMMM-yyyy';
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
        } else {}
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
                country.datePopUp.to.initDate = country.from;
                country.to = country.from;
                country.datePopUp.to.openCalender = true;
                country.datePopUp.to.minDate = country.from;
            } else {
                country.datePopUp.to.minDate = country.from;
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
    $scope.addPhotosCallback = function (photo, length) {
        console.log(photo);
        console.log(length, 'total length');
        console.log($scope.uploadCount, 'uploadFile');
        if ($scope.uploadCount === 1) {
            console.log('logif');
            $scope.totalUploadCount = $scope.totalUploadCount + length;
            $scope.uploadCount++;
            console.log($scope.totalUploadCount, 'totaluploadCount');
        } else if ($scope.uploadCount == length) {
            console.log('elseif');
            $scope.uploadCount = 1;
        } else {
            console.log('else');
            $scope.uploadCount++;
        }
        $scope.dItinerary.photos.push({
            "name": photo,
            "caption": ""
        })
    };
    $scope.removePhoto = function (index, city) {
        $scope.dItinerary.photos.splice(index, 1);
        $scope.totalUploadCount = $scope.totalUploadCount - 1;
    };
    //add-remove photos ends

    //travelled with starts
    $scope.listFollowers = function (searchList) {
        if (searchList.length > 2) {
            // $scope.viewFollowers = true;
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
                $scope.followersList = _.differenceBy($scope.followersList, $scope.dItinerary.buddies, '_id');
                // $scope.followersList = _.uniqBy($scope.followersList, $scope.dItinerary.buddies, "_id");
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
        $scope.dItinerary = _.omit($scope.dItinerary, ['createdAt', 'updatedAt', 'user', 'urlSlug', 'comment', 'creator', 'review', 'uniqueId']);
        Itinerary.uploadDetailedItinerary($scope.dItinerary, flag, function (data) {
            if (flag == 'new') {
                urlSlug = data.data.message;
            }
            $state.go('userdetailitinerary', {
                'id': urlSlug,
                'urlSlug': $.jStorage.get("profile").urlSlug
            });
            console.log(data);
        });
    }

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
        atleastOne = _.filter($scope.dItineraryType, ['activeClass', "active-itinerary"]);
        length = atleastOne.length;
        console.log(length);
        if (length === 1) {
            $scope.dItineraryType[val].activeClass = "active-itinerary"
        } else {
            if ($scope.dItineraryType[val].activeClass == "active-itinerary") {
                $scope.dItineraryType[val].activeClass = "";
            } else {
                $scope.dItineraryType[val].activeClass = "active-itinerary";
            }
        }
    };
    // select detail itinerary type end

    // $scope.holidayType = function (val) {
    //   atleastOne = _.filter($scope.travelConfig.chooseHoliday, ['class', "active-holiday"]);
    //   length = atleastOne.length;
    //   console.log(length);
    //   if (length == 1) {
    //     $scope.travelConfig.chooseHoliday[val].class = "active-holiday"
    //   } else {
    //     if ($scope.travelConfig.chooseHoliday[val].class == "active-holiday") {
    //       $scope.travelConfig.chooseHoliday[val].class = "";
    //     } else {
    //       $scope.travelConfig.chooseHoliday[val].class = "active-holiday";
    //     }
    //   }

    // };

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
                    'openCalender': false,
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

    $scope.flushArray = function () {
        $scope.google.hotels = [];
        $scope.google.restaurants = [];
        $scope.google.mustDos = [];
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
    $scope.menutitle = NavigationService.makeactive("Quick Itinerary");
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
    $scope.totalUploadCount = 0;
    $scope.uploadCount = 1;

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
            $scope.totalUploadCount = $scope.qItinerary.oldPhotos.length;

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
        } else {}
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

    $scope.addPhotosCallback = function (photo, length, date) {
        console.log(photo);
        console.log(length, 'total length');
        console.log($scope.uploadCount, 'uploadFile');
        $scope.qItinerary.photos.push({
            "name": photo,
            "photoTime": date
        });
        console.log($scope.qItinerary.photos.length, 'photos');
        if ($scope.uploadCount === 1) {
            $scope.totalUploadCount = $scope.totalUploadCount + length;
            $scope.uploadCount++;
            console.log($scope.totalUploadCount, 'totaluploadCount');
        } else if ($scope.uploadCount == length) {
            $scope.uploadCount = 1;
        } else {
            $scope.uploadCount++;
        }
        // $scope.qItinerary.photos.push({
        //   "name": photo
        // });
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
            $scope.totalUploadCount = $scope.totalUploadCount - 1;
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
            if (flag == 'new') {
                urlSlug = data.data.message;
            }
            $state.go('userquickitinerary', {
                "id": urlSlug,
                "urlSlug": $.jStorage.get("profile").urlSlug
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
.controller('PastStoryCtrl', function ($scope, TemplateService, NavigationService, pastJourney, $timeout, $stateParams, $state) {
    //Used to name the .html file

    $scope.template = TemplateService.changecontent("past-story");
    $scope.menutitle = NavigationService.makeactive("Past Story");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();  
    $scope.pastJourneyArray = [];

    $scope.getPastJourney = function(){
        var formData = {
            'urlSlug': 'greece-6'
        }
        pastJourney.getPastJourney(formData, function(pastStory){
          $scope.pastJourneyArray = pastStory;
        },function(error){
          console.log(error);
        })
    }  
    $scope.getPastJourney();

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

.controller('UserQuickItineraryCtrl', function ($scope, TemplateService, NavigationService, LikesAndComments, $timeout, $stateParams, $uibModal, Itinerary, $state) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("user-quickitinerary");
    $scope.menutitle = NavigationService.makeactive("User-QuickItinerary");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // $scope.closeBackDrop = function() {
    //     $scope.viewCardComment = false;
    //     $scope.viewCardLike = false;
    //     $scope.getCard = "";
    // };
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.viewList = false;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;

    //Integration starts here
    $scope.userData = $.jStorage.get("profile");
    // get quick-itinerary details starts
    var slug = $stateParams.id;
    Itinerary.getOneItinerary(slug, function (data) {
        $scope.itinerary = data.data;
        console.log($scope.itinerary);
        TemplateService.title = $scope.itinerary.name + " - Travel Life | TraveLibro";
    });
    // get quick-itinerary details ends

    // var slug = $stateParams.id;
    // Itinerary.getViewItinerary(slug, function(data) {
    //     $scope.itinerary = data.data;
    //     console.log($scope.itinerary);
    //     TemplateService.title = $scope.itinerary.name + " - Travel Life | TraveLibro";
    // });

    // route to user profile
    $scope.routeProfile = function () {
        if ($scope.itinerary.itineraryBy == "TravelAgent") {
            $state.go('comingsoonpage', {
                'url': 'coming-soon'
            })
        } else {
            $state.go('mylife', {
                'urlSlug': $itinerary.user.urlSlug
            })
        }
    }
        // route to user profile  end

    // ISMINE FUNCTION
    if ($.jStorage.get("isLoggedIn")) {
        $scope.isLoggedIn = true;
        if ($stateParams.urlSlug == $.jStorage.get("profile").urlSlug) {
            $scope.isMine = true;
        } else {
            $scope.isMine = false;
        }
    } else {
        $scope.isLoggedIn = false;
        $scope.isMine = false;
    }
    // ISMINE FUNCTION END

    //post quick-itinerary comments starts
    $scope.commentText = {};

    $scope.postItineraryComment = function (itinerary, comment, elemId) {
        console.log("itinerary comments");
        var additionalId = null;
        var hashTag = [];
        var callback = function (data) {
            if (data.value) {
                $scope.listOfComments = data.data;
                $scope.itinerary.comment = data.data.comment;
                $scope.itinerary.commentCount = data.data.comment.length;
                document.getElementById(elemId).value = "";
            }
        }
        LikesAndComments.postComment(itinerary.type, itinerary.uniqueId, itinerary._id, comment, hashTag, additionalId, callback);
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

    // THANK YOU MODAL
    $scope.openThankYouModal = function () {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            $uibModal.open({
                templateUrl: "views/modal/report.html",
                animation: true,
                scope: $scope,
                windowClass: "report-modal"
            });
        }
    };
    // THANK YOU MODAL END

    //Photo comment popup
    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
        // $scope.userProfilePic = $.jStorage.get("profile").profilePicture;
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
    $scope.likeUnlikeItinerary = function (itinerary) {
        console.log(itinerary.uniqueId, itinerary._id);
        console.log(itinerary.likeDone + "this call is from UserQuickItineraryCtrl");
        itinerary.likeDone = !itinerary.likeDone;
        if (itinerary.likeDone) {
            if (itinerary.likeCount == undefined) {
                itinerary.likeCount = 1;
            } else {
                itinerary.likeCount = itinerary.likeCount + 1;
            }
            LikesAndComments.likeUnlike(itinerary.type, "like", itinerary.uniqueId, itinerary._id, null)
        } else {
            itinerary.likeCount = itinerary.likeCount - 1;
            LikesAndComments.likeUnlike(itinerary.type, "unlike", itinerary.uniqueId, itinerary._id, null)
        }
    };
    //like-unlike itinerary ends

    //getLikes count for dropdown
    $scope.getLikes = function (itinerary) {
        LikesAndComments.getLikes(itinerary.type, itinerary._id, 1, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };
    //getLikes count for dropdown end
    $scope.followFollowing = function (user) {
        console.log("from activity");
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }

    //follow unFollow users

    //follow unFollow oldUsersLogin end

    //close dropDown on background click
    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };
    //close dropDown on background click end


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


    $scope.getCommentsData = function (itinerary) {
        console.log(itinerary);
        $scope.previousId;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = itinerary.type;
        $scope.postScrollData._id = itinerary._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != itinerary._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = itinerary._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(itinerary.type, itinerary._id, $scope.postScrollData.likePageNumber, callback);
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
                // $scope.journey.journeyHighLight = itinerary._id;
                $scope.getCard = "view-whole-card";
                LikesAndComments.getComments(itinerary.type, itinerary._id, $scope.postScrollData.likePageNumber, callback)
            }
        }
        $scope.previousId = itinerary._id;
    };

    $scope.getLikesData = function (itinerary) {
        $scope.postScrollData.type = itinerary.type;
        $scope.postScrollData._id = itinerary._id;
        var callback = function (data) {
            $scope.listOfLikes = data.data;
            $scope.postScrollData.viewList = true;
            console.log($scope.listOfLikes);
        };
        console.log($scope.post);
        if ($scope.previousLikeId != itinerary._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = itinerary._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(itinerary.type, itinerary._id, $scope.postScrollData.likePageNumber, callback);
        } else {
            if ($scope.viewCardLike) {
                $scope.viewCardLike = false;
                // $scope.journey.journeyHighLight = "";
                $scope.getCard = "";
            } else {
                $scope.listOfComments = [];
                $scope.viewCardLike = true;
                // $scope.focus('enterComment');
                // $scope.journey.journeyHighLight = itinerary._id;
                $scope.showLikeShow = "show-like-side-sec";
                LikesAndComments.getLikes(itinerary.type, itinerary._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = itinerary._id;
    };
    // comment and like end

    $scope.closeBackDrop = function () {
        $scope.getCard = "";
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        $timeout(function () {
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
        })
    }

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


    $scope.uploadQuickItinerary = function () {
        console.log($scope.itinerary);
        Itinerary.publishQuickItinerary($scope.itinerary._id, $scope.itinerary.status, true, function (data) {
            if (data.value) {
                Itinerary.getOneItinerary(slug, function (data) {
                    $scope.itinerary = data.data;
                });
            } else {

            }
        });
    };

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        console.log($scope.shareUrl, 'share ka url');
        shareModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/sharing.html",
            scope: $scope
        });
    }
        // sharing local life modal end

    // DELETE ITINERARY
    var deleteModal = "";
    $scope.deletePop = function (id) {
        $scope.itineraryId = id;
        deleteModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/delete-itinerary.html",
            scope: $scope
        });
    }
    $scope.deleteItinerary = function (postId) {
        console.log(postId, 'delete post');
        NavigationService.deleteItinerary(
            postId,
            function (data) {
                $state.go('mylife', {
                    'urlSlug': $scope.userData.urlSlug
                })
            })
    };
    // DELETE ITINERARY END


})

.controller('UserDetailItineraryCtrl', function ($scope, TemplateService, NavigationService, Itinerary, LikesAndComments, $timeout, $uibModal, $stateParams, $state) {
    //Used to name the .html file

    // console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("user-detailitinerary");
    $scope.menutitle = NavigationService.makeactive("User-DetailItinerary");
    $scope.navigation = NavigationService.getnav();

    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;

    //Integration starts here

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        console.log($scope.shareUrl, 'share ka url');
        shareModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/sharing.html",
            scope: $scope
        });
    }
        // sharing local life modal end

    // ISMINE FUNCTION
    if ($.jStorage.get("isLoggedIn")) {
        $scope.isLoggedIn = true;
        if ($stateParams.urlSlug == $.jStorage.get("profile").urlSlug) {
            $scope.isMine = true;
        } else {
            $scope.isMine = false;
        }
    } else {
        $scope.isLoggedIn = false;
        $scope.isMine = false;
    }
    // ISMINE FUNCTION END

    $scope.userData = $.jStorage.get("profile");

    //get quick-itinerary details starts
    var slug = $stateParams.id;
    $scope.initialCall = function () {
        Itinerary.getOneItinerary(slug, function (data) {
            $scope.itinerary = data.data;
            console.log($scope.itinerary);
            if ($scope.itinerary.itineraryBy == "Admin") {
                TemplateService.title = $scope.itinerary.name + " - " + $scope.itinerary.itineraryType[0] + " Itinerary - TraveLibro";
            } else {
                TemplateService.title = $scope.itinerary.name + " - " + $scope.itinerary.user.name + " | TraveLibro";
            }
        });
    };
    $scope.initialCall();
    //get quick-itinerary details ends

    // route to user profile
    $scope.routeProfile = function () {
        if ($scope.itinerary.itineraryBy == "TravelAgent") {
            $state.go('comingsoonpage', {
                'url': 'coming-soon'
            })
        } else {
            $state.go('mylife', {
                'urlSlug': $itinerary.user.urlSlug
            })
        }
    }
        // route to user profile  end

    //like-unlike itinerary starts

    $scope.likeUnlikeItinerary = function (flag, _id, uniqueId) {
        Itinerary.updateLikeItinerary(flag, _id, uniqueId, function (data) {
            if (data) {
                if ($scope.itinerary.likeCount) {
                    $scope.itinerary.likeCount = $scope.itinerary.likeCount + 1;
                } else {
                    $scope.itinerary.likeCount = 1
                }
            } else {
                $scope.itinerary.likeCount = $scope.itinerary.likeCount - 1;
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

    // THANK YOU MODAL
    $scope.openThankYouModal = function () {
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            $uibModal.open({
                templateUrl: "views/modal/report.html",
                animation: true,
                scope: $scope,
                windowClass: "report-modal"
            });
        }
    };
    // THANK YOU MODAL END

    //Photo comment popup
    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
        // $scope.userProfilePic = $.jStorage.get("profile").profilePicture;
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

    // comment and like side card

    $scope.getCommentsData = function (activity) {
        console.log(activity);
        $scope.previousId;
        $scope.post = activity;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = activity.type;
        $scope.postScrollData._id = activity._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != activity._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = activity._id;
    };

    $scope.getLikesData = function (activity) {
        console.log('user detail');
        $scope.postScrollData.type = activity.type;
        $scope.postScrollData._id = activity._id;
        var callback = function (data) {
            $scope.listOfLikes = data.data;
            $scope.postScrollData.viewList = true;
            console.log($scope.listOfLikes);
        };
        console.log($scope.post);
        if ($scope.previousLikeId != activity._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(activity.type, activity._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = activity._id;
    };
    // comment and like side card end
    $scope.closeBackDrop = function () {
        console.log('back');
        $scope.getCard = "";
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        $scope.postScrollData.viewList = false;
        $scope.initialCall();
        $timeout(function () {
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
        });
    }

    //Integration starts here

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


    //PUBLISH
    $scope.uploadQuickItinerary = function (itinerary) {
        console.log(itinerary);
        Itinerary.publishQuickItinerary(itinerary._id, itinerary.status, true, function (data) {
            if (data.value) {
                Itinerary.getOneItinerary(slug, function (data) {
                    $scope.itinerary = data.data;
                });
            } else {

            }
        });
    };
    //PUBLISH

    // DELETE ITINERARY
    var deleteModal = "";
    $scope.deletePop = function (id) {
        $scope.itineraryId = id;
        deleteModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/delete-itinerary.html",
            scope: $scope
        });
    }
    $scope.deleteItinerary = function (postId) {
        console.log(postId, 'delete post');
        NavigationService.deleteItinerary(
            postId,
            function (data) {
                $state.go('mylife', {
                    'urlSlug': $scope.userData.urlSlug
                })
            })
    };
    // DELETE ITINERARY END

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
    TemplateService.title = "About Us - TraveLibro";
    $scope.navigation = NavigationService.getnav();

    $scope.accessToken = $.jStorage.get("accessToken");
    $scope.bookingLink = function () {
        window.location.href = "https://travelibro.com/bookings/";
    }
})

.controller('TermsConditionsCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location, MyLife, OnGoJourney) {
        //Used to name the .html file
        // console.log("Testing Consoles");
        $scope.template = TemplateService.changecontent("terms-conditions");
        $scope.menutitle = NavigationService.makeactive("Terms & Conditions");
        TemplateService.title = "Terms & Conditions - TraveLibro";
        $scope.navigation = NavigationService.getnav();
        $scope.accessToken = $.jStorage.get("accessToken");
    })
.controller('PrivacyPolicyCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout, $uibModal, $location, MyLife, OnGoJourney) {
        //Used to name the .html file
        // console.log("Testing Consoles");
        $scope.template = TemplateService.changecontent("privacy-policy");
        $scope.menutitle = NavigationService.makeactive("Privacy Policy");
        TemplateService.title = "Privacy Policy - TraveLibro";
        $scope.navigation = NavigationService.getnav();
        $scope.accessToken = $.jStorage.get("accessToken");
    })

.controller('headerctrl', function ($scope, TemplateService, NavigationService, LikesAndComments, $state, $http, $interval, $timeout, $stateParams) {
    $scope.template = TemplateService;
    $scope.getAllSearched = [];
    $scope.search = {};
    $scope.search.searchType = "";
    $scope.search.viewData = false;
    $scope.isLoggedIn = $.jStorage.get("isLoggedIn");
    $scope.template.isLoggedIn = $.jStorage.get("isLoggedIn");
    /////////////////////////////////////////////////

    setInterval(function () {
        $scope.searchHeaderLoad = TemplateService.searchHeaderLoad;
    }, 300);

    // ISMINE FUNCTION
    if ($.jStorage.get("isLoggedIn")) {
        $scope.isLoggedIn = true;
        $scope.template.isLoggedIn = true; ///////////////////////////////////////////////////////////////////////
        if ($.jStorage.get("profile") && ($stateParams.urlSlug == $.jStorage.get("profile").urlSlug)) {
            // $.jStorage.set("isMine", true);
            $scope.template.isMine = true;
        } else {
            // $.jStorage.set("isMine", false);
            $scope.template.isMine = false;
        }
    } else {
        $scope.isLoggedIn = false;
        $scope.template.isLoggedIn = false; //////////////////////////////////////////
        // $scope.isMine = false;
        $scope.template.isMine = false;
    }
    // ISMINE FUNCTION END

    if ($.jStorage.get('accessToken') && $.jStorage.get('accessToken') != '') {
        var callback = function (data, status) {
            if (data.data._id) {
                $.jStorage.set("isLoggedIn", true);
                $.jStorage.set("profile", data.data);
                $scope.userData = $.jStorage.get("profile");
                $scope.accessToken = $.jStorage.get("accessToken");
                // $scope.isLoggedIn = $.jStorage.get("isLoggedIn");
                if ($stateParams.urlSlug == $.jStorage.get("profile").urlSlug) {
                    $scope.template.isMine = true;
                } else {
                    $scope.template.isMine = false;
                }
                //restrict user who has not followed starings steps
                if ($scope.userData.type == "User") {
                    if ($.jStorage.get('qualifiedForLoginFlow')) {
                        $state.go('login-flow');
                    }
                    // else if ($.jStorage.get('qualifiedForHoliday')) {
                    //     $state.go('holiday');
                    // }
                    else if ($scope.userData && $scope.userData.alreadyLoggedIn == false) {
                        $state.go('mainpage');
                    }
                } else {
                    if ($scope.userData && $scope.userData.alreadyLoggedIn == false) {
                        $state.go('agent-login');
                    }
                }
                //restrict user who has not followed starings steps end
            } else {

            }
        };
        if ($.jStorage.get("profile") && $.jStorage.get("profile").type === "User") {
            NavigationService.getProfile("", callback, function (err) {
                console.log(err);
            });
        } else {
            NavigationService.getAgentsProfile("", callback, function (err) {
                console.log(err);
            });
        }
    } else {
        $.jStorage.set("profile", null);
        $scope.isLoggedIn = false;
        $scope.isMine = false;
    }

    // edit option
    $scope.editOption = function (model, class1, class2) {
        LikesAndComments.onClickDropDown(model, $scope, class1, class2);
    };
    // edit option end

    // route to itinerary
    $scope.routeSearchItinerary = function (itinerary) {
        if (itinerary.type == "quick-itinerary") {
            $state.go('userquickitinerary', {
                'id': itinerary.urlSlug,
                'urlSlug': itinerary.user.urlSlug
            })
        } else {
            $state.go('userdetailitinerary', {
                'id': itinerary.urlSlug,
                'urlSlug': itinerary.user.urlSlug
            })
        }
    }
        // route to itinerary end

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
            var accessToken = $.jStorage.get("accessToken");
            var profile = $.jStorage.get("profile");
            NavigationService.logout(function () {
            // NavigationService.disablePushNotification();
            OneSignal.getUserId(function (data) {
                console.log(data);
                $http({
                    "url": adminURL + "/user/updateDeviceId",
                    "method": "POST",
                    "data": {
                        'accessToken': accessToken,
                        'deviceId': data,
                        'remove': true
                    }
                });
                // NavigationService.disablePushNotification(data);
            });
            $.jStorage.flush();
            acsToken = "";
            accessToken = "";
            if (profile && profile.type == "User") {
                $state.go('login');
            } else {
                $state.go('partnerlogin');
            }
        }, function (err) {
            console.log(err);
        });
        };

        $scope.searchType = function () {
            console.log($scope.search.searchType, 'search type');
            if ($scope.search.searchType !== '') {
                $scope.viewSearch.backgroundClick = true;
                NavigationService.getSearchData({
                    search: $scope.search.searchType
                }, function (data) {
                    $scope.getAllSearched = data.data;
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
                case 'search-travelAgent':
                $state.go('search-result', {
                    name: 'search-travelAgent',
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
        $timeout(function () {
            if ((navigator.platform.indexOf("iPhone") != -1) ||
                (navigator.platform.indexOf("iPod") != -1) ||
                (navigator.platform.indexOf("iPad") != -1)) {
                $(".download-app").addClass("hide");
        }
    }, 200);
        $scope.customLink = function () {
            window.open("https://play.google.com/store/apps/details?id=com.ascra.app.travellibro");
        };
    // SWITCHING TO PROFILE
    $scope.switchToProfile = function (userData) {
        console.log(userData, 'data user ni');
        if (userData.type == "User") {
            $state.go("mylife", {
                name: 'journey',
                urlSlug: userData.urlSlug
            });
        } else {
            $state.go("agent-home-without", {
                urlSlug: userData.urlSlug
            });
        }
    };
    // SWITCHING TO PROFILE END
})

.controller('AgentloginCtrl', function ($scope, Agent, TemplateService, NavigationService, FileUploadService, FileUploader, DataUriToBlob, $timeout, $state) {
    $scope.template = TemplateService.changecontent("agent-login"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Agent Login"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
    $scope.disableCountries = true;
    $scope.disableSpecialization = true;
    $scope.disableServices = true;
    $scope.validEmail = "/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/iv";
    $scope.emailExist = false;
    $scope.showImage = {
        "val": false
    };
    $scope.userDetails = {
        company: {
            email: []
        },
    };

    $scope.tagHandler = function (tag) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(tag));
        if (re.test(tag)) {
            if (_.findIndex($scope.userDetails.company.email, ['name', tag]) == -1) {
                $scope.emailExist = false;
                return {
                    'name': tag
                };
            } else {
                $scope.emailExist = true;
            }
        }
    };

    $scope.userData = $.jStorage.get("profile");
    if ($scope.userData.name) {
        $scope.userDetails.company.name = $scope.userData.name;
    }
    $scope.isVerified = $.jStorage.get("isVerified");

    $timeout(function () {
        // var container = $('.veri-box').first();
        var container = document.getElementsByClassName('veri-box')[0];
        container.onkeyup = function (e) {
            var target = e.srcElement || e.target;
            var maxLength = 1;
            var myLength = target.value.length;
            if (myLength >= maxLength) {
                var next = target;
                while (next = next.nextElementSibling) {
                    if (next == null)
                        break;
                    if (next.tagName.toLowerCase() === "input") {
                        next.focus();
                        break;
                    }
                }
            }
            // Move to previous field if empty (user pressed backspace)
            else if (myLength === 0) {
                var previous = target;
                while (previous = previous.previousElementSibling) {
                    if (previous == null)
                        break;
                    if (previous.tagName.toLowerCase() === "input") {
                        previous.focus();
                        break;
                    }
                }
            }
        };
    }, 100);

    //image crop
    var checkForImageChange = function () {
        console.log(document.getElementById('fileInput1'));
        $timeout(function () {
            document.getElementById('fileInput1').onchange = function (evt) {
                var file = evt.currentTarget.files[0];
                $scope.fileName = file.name;
                var formData = new FormData();
                formData.append('file', file, "file.jpg");
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.showImage.val = true;
                        console.log($scope.showImage.val);
                        $scope.myImage = evt.target.result;
                        // //alert($scope.myImage);
                    });
                };
                reader.readAsDataURL(file);
            };
        }, 2000);
    };
    $scope.fileName = null;
    $scope.image = null;
    $scope.imageFileName = '';
    $scope.uploadme = {};
    $scope.uploadme.src = '';
    $scope.uploadFile = function (data, userDetails, ppSelected) {
        // Base64 to Blob
        console.log(userDetails);
        if (ppSelected) {
            var imageBase64 = data;
            var blob = DataUriToBlob.dataURItoBlob(imageBase64, 'image/png');
            // Blob to File
            // var file = new File([blob], $scope.fileName + '.png');
            // var file = new File([blob], $scope.fileName);
            // File to FormData
            var formData = new FormData();
            formData.append('file', blob, 'abcd.png');
            // //alert("mila");
            NavigationService.uploadFile(formData, function (response) {
                if (response.value) {
                    $scope.userDetails.profilePicture = response.data[0];
                    var myUser = $.jStorage.get("profile");
                    myUser.profilePicture = response.data[0];
                    $.jStorage.set("profile", myUser);
                } else {
                    toastr.warning('Error Uploading Image!');
                }
                // Agent.saveAgentData($scope.userDetails, function (data) {
                //   console.log(data);
                // });
                $scope.agentSec(6);
            });
        } else {
            // //alert("nai mila");
            $scope.userDetails = _.omit($scope.userDetails, ['profilePicture']);
            // Agent.saveAgentData($scope.userDetails, function (data) {
            //   console.log(data);
            // });
        }
        $scope.agentSec(6);
    };

    //upload agent profilePicture ends

    $scope.removePhoto = function () {
        angular.element("input[type='file']").val(null);
        $scope.userDetails = _.omit($scope.userDetails, ['profilePicture']);
        $scope.fileName = null;
        $scope.showImage.val = false;
        checkForImageChange();
    };
    //image crop end

    $scope.isValidNo = function (num, i) {
        console.log(num);
        var telInput = $("#phone" + i),
        errorMsg = $("#error-msg" + i),
        validMsg = $("#valid-msg" + i);

        telInput.intlTelInput({
            initialCountry: "auto",
            geoIpLookup: function (callback) {
                $.get('http://ipinfo.io', function () {}, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            utilsScript: "../../../..bower_components/intl-tel-input/lib/libphonenumber/build/utils.js", // just for formatting/placeholders etc
        });

        var reset = function () {
            telInput.removeClass("error");
            errorMsg.addClass("hide");
            validMsg.addClass("hide");
        };

        // on blur: validate
        telInput.blur(function () {
            reset();
            if ($.trim(telInput.val())) {
                if (telInput.intlTelInput("isValidNumber")) {
                    validMsg.removeClass("hide");
                } else {
                    telInput.addClass("error");
                    errorMsg.removeClass("hide");
                }
            }
        });
        // on keyup / change flag: reset
        telInput.on("keyup change", reset);
    }

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
    $scope.checkme = function () {
        console.log($scope.userDetails.company.agentType);
    }
        //switching between cards
        $scope.agentSec = function (val) {
            switch (val) {
                case 0:
                $scope.agentloginView = 0;

                break;
                case 1:
                $scope.agentloginView = 1;
                break;
                case 2:
                $scope.agentloginView = 2;
                break;
                case 3:
                $scope.agentloginView = 3;
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
                    break;
                    case 4:
                    $scope.agentloginView = 4;
                    break;
                    case 5:
                    console.log($scope.userDetails.company.agentType);
                    checkForImageChange();
                    $scope.agentloginView = 5;
                    console.log($scope.userDetails.company.email);
                    $scope.userDetails.company.email = _.map($scope.userDetails.company.email, 'name');

                    console.log($scope.userDetails.company.email);
                    break;
                    case 6:
                    $scope.agentloginView = 6;
                    break;
                    case 7:
                    $scope.agentloginView = 7;
                    break;
                    case 8:

                    if ((_.filter($scope.categoriesSpecial, ['class', 'agt-imgholder-active']).length >= 1)) {
                        $scope.agentloginView = 8;
                    } else {

                    }

                    break;
                    case 9:
                    $scope.agentloginView = 9;
                    break;

                }
            }
        //switching between cards ends


    // $scope.isCategorySelected = false;
    $scope.foundCategory = [];
    $scope.selectCategory = function (obj) {
        // $scope.isCategorySelected = true;
        if (obj.class == "agt-imgholder-active") {
            obj.class = "";
        } else {
            obj.class = "agt-imgholder-active";
        }
        $scope.disableSpecialization = !(_.filter($scope.categoriesSpecial, ['class', 'agt-imgholder-active']).length >= 1);
        console.log($scope.disableSpecialization);
    };

    {
        $scope.businessModel = ["Tour Operator", "Travel Agent", "Local Guide"];
    }

    {
        $scope.categoriesSpecial = [{
            agtcatImg: "img/kindofjourney/white-adventure.png",
            catwidth: "35px",
            name: "Adventure"
        }, {
            agtcatImg: "img/kindofjourney/white-business.png",
            catwidth: "33px",
            name: "Business"
        }, {
            agtcatImg: "img/kindofjourney/white-family.png",
            catwidth: "48px",
            name: "Family"
        }, {
            agtcatImg: "img/kindofjourney/white-romance.png",
            catwidth: "35px",
            name: "Romance"
        }, {
            agtcatImg: "img/kindofjourney/white-backpacking.png",
            catwidth: "35px",
            name: "Backpacking"
        }, {
            agtcatImg: "img/kindofjourney/white-budget.png",
            catwidth: "33px",
            name: "Budget"
        }, {
            agtcatImg: "img/kindofjourney/white-luxury.png",
            catwidth: "33px",
            name: "Luxury"
        }, {
            agtcatImg: "img/kindofjourney/white-religious.png",
            catwidth: "38px",
            name: "Religious"
        }, {
            agtcatImg: "img/kindofjourney/white-friends.png",
            catwidth: "35px",
            name: "Friends"
        }, {
            agtcatImg: "img/kindofjourney/white-friends.png",
            catwidth: "35px",
            name: "Cultural"
        }, {
            agtcatImg: "img/kindofjourney/white-friends.png",
            catwidth: "35px",
            name: "Educational"
        }, {
            agtcatImg: "img/kindofjourney/white-friends.png",
            catwidth: "35px",
            name: "LGBT"
        }];
    }

    //gets all the countries from database
    NavigationService.getCountriesByContinent(function (data, status) {
        if (data.value) {
            $scope.countriesByContinent = data.data;
        } else {
            console.log("Error Fetching Data");
        }
        console.log($scope.countriesByContinent);
    }, function (err) {
        console.log(err);
    });
    //End-Of get all the countries from database

    $scope.selectCountry = function (obj) {
        // $scope.isCategorySelected = true;
        if (obj.class == "active") {
            obj.class = "";
        } else {
            obj.class = "active";
        }
        $scope.disableCountries = !(_.filter(_.flatten(_.map($scope.countriesByContinent, 'countries'), ['class', 'active']), ['class', 'active']).length >= 1);
        console.log($scope.disableCountries);
    };

    //Services
    $scope.selectServices = function (obj) {
        // $scope.isCategorySelected = true;
        if (obj.class == "active") {
            obj.class = "";
        } else {
            obj.class = "active";
        }
        $scope.foundCategory = _.filter($scope.categoriesSpecial, ['class', 'active']);
        $scope.disableServices = !(_.filter($scope.agtServicesSpcl, ['class', 'active']).length >= 1);
        console.log($scope.disableServices);
    };

    {
        $scope.agtServicesSpcl = [{
            name: 'Tours And Packages'
        }, {
            name: 'Day Tours'
        }, {
            name: 'Outdoors & Excursions'
        }, {
            name: 'Flights'
        }, {
            name: 'Cruise'
        }, {
            name: 'MICE'
        }, {
            name: 'Personal'
        }, {
            name: 'Business Travel'
        }, {
            name: 'Car Rentals'
        }, {
            name: 'Visas'
        }, {
            name: 'Fully Independent Traveller'
        }, {
            name: 'Accomodation'
        }, {
            name: 'Travel Insurance'
        }, {
            name: 'Sports & Events'
        }, {
            name: 'Forex'
        }, {
            name: 'Holidays'
        }, {
            name: 'Festival & Concerts'
        }, {
            name: 'Transportation'
        }];
    }

    //Services end

    //Integration starts here
    $scope.verify = {};
    if (!$scope.userData.isLoggedIn) {
        if ($scope.userData.isVerified == false && $scope.isVerified != true) {
            $scope.agentSec(0);
        } else {
            $scope.agentSec(3);
        }
    }

    //verify Users Account
    $scope.submitOtp = function (obj) {
        var otp = (obj.a).concat(obj.b, obj.c, obj.d);
        Agent.verifyOtp(otp, function (data) {
            console.log(data);
            if (data.value) {
                $scope.userData.isVerified = true;
                $scope.showConfirmation = true;
                $.jStorage.set("isVerified", true);
                $scope.agentSec(1);
            } else {
                $scope.agentSec(2);
            }
        });
    };
    $scope.requestOtp = function () {
        Agent.requestOtp();
    }
        //verify users account ends

        $scope.saveAgentData = function (obj) {
            console.log(obj);
            $scope.userDetails.urlSlug = $.jStorage.get("profile").urlSlug;
            $scope.userDetails.company.categoryOfSpeacilization = [];
            $scope.userDetails.company.countryOfSpecialization = [];
            $scope.userDetails.company.services = [];
            $scope.userDetails.company.categoryOfSpeacilization = _.filter($scope.categoriesSpecial, ['class', 'agt-imgholder-active']);
            $scope.userDetails.company.services = _.filter($scope.agtServicesSpcl, ['class', 'active']);
            $scope.userDetails.company.categoryOfSpeacilization = _.map($scope.userDetails.company.categoryOfSpeacilization, 'name');
            $scope.userDetails.company.services = _.map($scope.userDetails.company.services, 'name');

            $scope.userDetails.company.countryOfSpecialization = _.cloneDeep($scope.countriesByContinent);
            _.each($scope.userDetails.company.countryOfSpecialization, function (n, key) {
                n.country = [];
                n.countries = _.filter(n.countries, ['class', 'active']);
                n.country = _.map(n.countries, '_id');
                $scope.userDetails.company.countryOfSpecialization[key] = _.omit(n, ['countries']);
            });
            _.remove($scope.userDetails.company.countryOfSpecialization, function (n) {
                return n.country.length == 0;
            });
            console.log($scope.userDetails);
            Agent.saveAgentData($scope.userDetails, function (data) {
                console.log(data);
                if (data.value) {
                    $state.go('agent-home-without', {
                        'urlSlug': $scope.userDetails.urlSlug
                    });
                } else {

                }
            })
        }
        //Integration Ends here
    })

.controller('AgentsettingCtrl', function ($scope, TemplateService, NavigationService, Agent, $timeout) {
    $scope.template = TemplateService.changecontent("agent-setting"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Partner Settings"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;

    $scope.passwords = {};
    $scope.oldPasswordError = false;
    $scope.newPasswordError = false;
    $scope.saveSuccess = false;
    $scope.emailExist = false;
    $scope.showme = false;
    $scope.settingReport = {
        status: ""
    };
    // INTEGRATION START
    $scope.removeSameFile = function () {
        angular.element("input[type='file']").val(null);
    }
        // SETTING DATA GET
        function setAgent() {
            Agent.getAgentDetails(function (data) {
                if (data.value = true) {
                    $scope.agentData = data.data;
                    $scope.expiry = moment($scope.agentData.UTC).add("d", 90).diff(moment(), "days");
                    _.each(data.data.company.categoryOfSpeacilization, function (n) {
                        var index = _.findIndex($scope.chooseCategorySpcl, ['caption', n]);
                        $scope.chooseCategorySpcl[index].class = "category-active";
                    });
                    _.each(data.data.company.services, function (n) {
                        var index = _.findIndex($scope.agtServices, ['name', n]);
                        $scope.agtServices[index].class = "active";
                    });
                    _.each(data.data.company.countryOfSpecialization, function (n) {
                        var index = _.findIndex($scope.countriesByContinent, ['name', n.name]);
                        _.each(n.country, function (m) {
                            var index1 = _.findIndex($scope.countriesByContinent[index].countries, ['_id', m]);
                            $scope.countriesByContinent[index].countries[index1].class = "active";
                        })
                    });
                    $scope.agentData.company.email = _.zipWith($scope.agentData.company.email, function (a) {
                        return {
                            'name': a
                        };
                    });
                } else {
                    console.log('Error in agentdata Call!!!');
                }
            })
        }
    // SETTING DATA GET END
    // GET CONTINENT
    NavigationService.getCountriesByContinent(function (data, status) {
        if (data.value) {
            $scope.countriesByContinent = data.data;
            setAgent();
        } else {
            console.log("Error Fetching Data");
        }
        console.log($scope.countriesByContinent, 'continent');
    }, function (err) {
        console.log(err);
    });

    $scope.selectCountry = function (obj) {
        if (obj.class == "active") {
            obj.class = "";
        } else {
            obj.class = "active";
        }
    };

    $scope.selectServices = function (obj) {
        // $scope.isCategorySelected = true;
        if (obj.class == "active") {
            obj.class = "";
        } else {
            obj.class = "active";
        }
        console.log(obj);
    };

    // GET CITY
    var getAllCities = function (data, status) {
        if (data.value) {
            $scope.cities = data.data.predictions;
            console.log($scope.cities, 'cita');
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
    // GET CITY END

    $scope.selectCategory = function (obj) {
        console.log(obj, "yeh select");
        // $scope.isCategorySelected = true;
        if (obj.class == "category-active") {
            obj.class = "";
        } else {
            obj.class = "category-active";
        }
    };

    $scope.tagHandler = function (tag) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // console.log($scope.agentData.company.email,$scope.agentData.company.email.indexOf(tag));
        if (re.test(tag)) {
            if (_.findIndex($scope.agentData.company.email, ['name', tag]) == -1) {
                $scope.emailExist = false;
                return {
                    'name': tag
                };
            } else {
                $scope.emailExist = true;
            }
        }
    };

    $scope.isValidNo = function (num, i) {
        console.log(num);
        var telInput = $("#phone" + i),
        errorMsg = $("#error-msg" + i);

        telInput.intlTelInput({
            initialCountry: "auto",
            geoIpLookup: function (callback) {
                $.get('http://ipinfo.io', function () {}, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            utilsScript: "../../../..bower_components/intl-tel-input/lib/libphonenumber/build/utils.js", // just for formatting/placeholders etc
        });

        var reset = function () {
            telInput.removeClass("error");
            errorMsg.addClass("hide");
        };

        // on blur: validate
        telInput.blur(function () {
            reset();
            if ($.trim(telInput.val())) {
                if (telInput.intlTelInput("isValidNumber")) {
                    // validMsg.removeClass("hide");
                } else {
                    telInput.addClass("error");
                    errorMsg.removeClass("hide");
                }
            }
        });
        // on keyup / change flag: reset
        telInput.on("keyup change", reset);
    }

    $scope.saveDetailsAgent = function (type, finalAgentData) {
        var agentData = _.cloneDeep(finalAgentData);
        var agent = {};
        agentData.company.email = _.map(agentData.company.email, 'name');
        agentData.company.services = _.map(_.filter($scope.agtServices, ['class', 'active']), 'name');
        agentData.company.categoryOfSpeacilization = _.map(_.filter($scope.chooseCategorySpcl, ['class', 'category-active']), 'caption');
        console.log(agentData);
        agentData.company.countryOfSpecialization = _.cloneDeep($scope.countriesByContinent);
        _.each(agentData.company.countryOfSpecialization, function (n, key) {
            n.country = [];
            n.countries = _.filter(n.countries, ['class', 'active']);
            n.country = _.map(n.countries, '_id');
            agentData.company.countryOfSpecialization[key] = _.omit(n, ['countries']);
        });
        _.remove(agentData.company.countryOfSpecialization, function (n) {
            return n.country.length == 0;
        });
        console.log(agentData.company.countryOfSpecialization);


        Agent.saveSettings(agentData, function (data) {
            if (data.value == true) {
                NavigationService.getAgentsProfile($.jStorage.get("profile").urlSlug, function (data, status) {
                    if (data.data._id) {
                        $.jStorage.set("isLoggedIn", true);
                        $.jStorage.set("profile", data.data);
                        $scope.agentData = data.data;
                    } else {
                        $.jStorage.flush();
                    }
                }, function (err) {
                    console.log("Error:", err);
                });
            } else {
                console.log('setting save FAIL');
            }
        });
    }

    // CHANGE PASSWORDS
    $scope.changePassword = function (passwords) {
        $scope.newPasswordError = false;
        $scope.oldPasswordError = false;
        if (passwords.newPassword == passwords.confirmPassword) {
            var password = passwords;
            delete password.confirmPassword;
            Agent.changePassword(password, function (data) {
                if (data.value === true) {
                    $scope.passwords.oldPassword = "";
                    $scope.passwords.newPassword = "";
                    $scope.oldPasswordError = false;
                    $scope.saveSuccess = true;
                    $timeout(function () {
                        $scope.saveSuccess = false;
                    }, 10000);
                } else {
                    $scope.oldPasswordError = true;
                    $timeout(function () {
                        $scope.oldPasswordError = false;
                    }, 10000);
                }
            });
        } else {
            $scope.newPasswordError = true;
            $timeout(function () {
                $scope.newPasswordError = false;
            }, 10000);
        }
    }
        // CHANGE PASSWORDS END

    // REPORT PROBLEM
    $scope.saveReport = function (settingReport) {
        NavigationService.ReportProblems({
            // userId: $scope.userData._id,
            problem: settingReport.status
        }, function (data) {
            if (data.value) {
                $scope.showme = true;
                $timeout(function () {
                    $scope.showme = false;
                }, 10000);
                $scope.settingReport = {};
            } else {
                $scope.showme = false;
                $scope.settingReport = {};
            }
        })
    };
    // REPORT PROBLEM END

    // CHANGE PROFILE PICTURE
    $scope.myImage = '';
    $scope.agentCroppedImage = '';
    $scope.showImage = false;
    var got = setInterval(function () {
        if (document.getElementById('agentProfilePic')) {
            document.getElementById('agentProfilePic').onchange = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt1) {
                    $scope.$apply(function ($scope) {
                        $scope.showImage = true;
                        $scope.agentImage = evt1.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            clearInterval(got);
        }
    }, 1000);

    $scope.uploadAgentProfilePic = function (imageBase64) {
        var agentData = _.cloneDeep($scope.agentData);;
        var file = imageTestingCallback(imageBase64, 'image/png');
        console.log(file);
        NavigationService.uploadFile(file, function (response) {
            if (response.value) {
                agentData.profilePicture = response.data[0];
                console.log(agentData.profilePicture, "profile save");
                Agent.saveSettings(agentData, function (data) {
                    console.log(data, 'save setting');
                    if (data.value == true) {
                        console.log('setting save success');
                        NavigationService.getAgentsProfile($.jStorage.get("profile").urlSlug, function (data, status) {
                            if (data.data._id) {
                                $.jStorage.set("isLoggedIn", true);
                                $.jStorage.set("profile", data.data);
                                console.log("Profile successfully set on jStorage");
                                $scope.showImage = false;
                            } else {
                                $.jStorage.flush();
                            }
                        }, function (err) {
                            console.log("Error:", err);
                        });
                    } else {
                        console.log('setting save FAIL');
                    }
                });
            } else {
                console.log("no img save");
            }
        });
    }
        // CHANGE PROFILE PICTURE END

    // INTEGRATION  END

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


    //Business Model
    {
        $scope.businessModel = ["Tour Operator", "Travel Agent", "Local Guide"];
    }
    //Business Model
    // choose category Specialisation
    $scope.chooseCategorySpcl = [{
        img: "img/kindofjourney/white-adventure.png",
        caption: "Adventure",
        catWidth: "30px"
    }, {
        img: "img/kindofjourney/white-business.png",
        caption: "Business",
        catWidth: "30px"
    }, {
        img: "img/kindofjourney/white-family.png",
        caption: "Family",
        catWidth: "32px"
    }, {
        img: "img/kindofjourney/white-romance.png",
        caption: "Romance",
        catWidth: "33px"
    }, {
        img: "img/kindofjourney/white-backpacking.png",
        caption: "Backpacking",
        catWidth: "30px"
    }, {
        img: "img/kindofjourney/white-budget.png",
        caption: "Budget",
        catWidth: "28px"
    }, {
        img: "img/kindofjourney/white-luxury.png",
        caption: "Luxury",
        catWidth: "28px"
    }, {
        img: "img/kindofjourney/white-religious.png",
        caption: "Religious",
        catWidth: "33px"
    }, {
        img: "img/kindofjourney/white-friends.png",
        caption: "Friends",
        catWidth: "30px"
    }];
    // choose category Specialisation end


    $scope.selectServices = function (obj) {
        // $scope.isCategorySelected = true;
        if (obj.class == "active") {
            obj.class = "";
        } else {
            obj.class = "active";
        }
        $scope.foundCategory = _.filter($scope.categoriesSpecial, ['class', 'active']);
    };

    {
        $scope.agtServices = [{
            name: 'Tours And Packages'
        }, {
            name: 'Day Tours'
        }, {
            name: 'Outdoors & Excursions'
        }, {
            name: 'Flights'
        }, {
            name: 'Cruise'
        }, {
            name: 'MICE'
        }, {
            name: 'Personal'
        }, {
            name: 'Business Travel'
        }, {
            name: 'Car Rentals'
        }, {
            name: 'Visas'
        }, {
            name: 'Fully Independent Traveller'
        }, {
            name: 'Accomodation'
        }, {
            name: 'Travel Insurance'
        }, {
            name: 'Sports & Events'
        }, {
            name: 'Forex'
        }, {
            name: 'Holidays'
        }, {
            name: 'Festival & Concerts'
        }, {
            name: 'Transportation'
        }];
    }
    //Services end

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
    $scope.oneAtATime = true

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

    //user itinerary cards
    $scope.usrItineraryCard = [{
        type: "detail-itinerary",
        itineraryBy: "Admin",
        startTime: "2015-05-01T06:50:41.000Z",
        coverPhoto: "img/banner-itinerary/friends3.jpg",
        duration: 19,
        name: "Canada Adventure",
        itineraryType: ["Adventure"],
        currency: null,
        cost: 0,
        likeCount: 2,
        commentCount: 0,
        user: {
            name: "Editor",
            profilePicture: "img/default_images_2.jp",
            urlSlug: "editor"
        }
    }, {
        type: "quick-itinerary",
        itineraryBy: "User",
        startTime: "2015-05-01T06:50:41.000Z",
        coverPhoto: "img/banner-itinerary/friends3.jpg",
        duration: 19,
        name: "Canada Adventure",
        itineraryType: ["Adventure"],
        currency: null,
        cost: 0,
        likeCount: 2,
        commentCount: 0,
        month: "June",
        year: "2015",
        user: {
            name: "Editor",
            profilePicture: "img/default_images_2.jpg",
            urlSlug: "editor",
            following: 1
        }
    }];
    //user itinerary cards end

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

    // FILTER CLICK
    $scope.showme = false;
    $scope.showAgentFilter = function () {
        if ($scope.showme == false) {
            $scope.showme = true;
        } else {
            $scope.showme = false;
        }
    };
    // FILTER CLICK END
    //ITINERARY FILTER END

    // tour packages card
    $scope.usrTourPackageCard = [{
        tourImg: 'img/default_Images_2.jpg',
        agttourTitle: 'Love In Paris',
        agttourCost: '25000',
        tourDayC: '4',
        tourNightC: '3',
        tourcategoryTitle: 'Adventure',
        tourcategoryImg: 'img/kindofjourney/white-adventure.png',
        tourDate: '26 Dec, 2016',
        tourTime: '1.20 pm',
        tourcountryBadgesFlag: ['img/default_Images_2.jpg', 'img/default_Images_2.jpg']
    }, {
        tourImg: 'img/default_Images_2.jpg',
        agttourTitle: 'Love In Paris',
        agttourCost: '25000',
        tourDayC: '4',
        tourNightC: '3',
        tourcategoryImg: 'img/kindofjourney/white-backpacking.png',
        tourcategoryTitle: 'Backpacking',
        tourDate: '26 Dec, 2016',
        tourTime: '1.20 pm',
        tourcountryBadgesFlag: ['img/default_Images_2.jpg', 'img/default_Images_2.jpg']
    }, {
        tourImg: 'img/default_Images_2.jpg',
        agttourTitle: 'Love In Paris',
        agttourCost: '25000',
        tourDayC: '4',
        tourNightC: '3',
        tourcategoryImg: 'img/kindofjourney/white-romance.png',
        tourcategoryTitle: 'Romance',
        tourDate: '26 Dec, 2016',
        tourTime: '1.20 pm',
        tourcountryBadgesFlag: ['img/default_Images_2.jpg', 'img/default_Images_2.jpg']
    }];
    // tour packages card end

    // gallery card
    $scope.agenPhotogallery = [
    'img/banner-itinerary/adventure1.jpg',
    'img/banner-itinerary/budget3.jpg',
    'img/banner-itinerary/all1.jpg',
    'img/banner-itinerary/luxury3.jpg',
    'img/banner-itinerary/all3.jpg',
    'img/banner-itinerary/friends3.jpg',
    ];

    //gallery filter list
    $scope.picFilterList = ['India', 'Malaysia', 'Singapore', 'Dubai', 'London', 'USA', 'Abu Dhabi', 'Kenya', 'South Africa', 'Cuba', 'Cambodia', 'China', 'England', 'Russia', 'Kazakhstan', 'Iran', 'Iraq', 'Bolivia'];
    //gallery filter list end
    // gallery card end

    // testimonial card
    $scope.testimonialreview = [{
        testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
        usrprofileImgholder: 'img/default_Images_2.jpg',
        usrName: 'Randy & Victoria',
        usrLoc: 'New-York, USA',
        usrRating: '9'
    }, {
        testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and',
        usrprofileImgholder: 'img/default_Images_2.jpg',
        usrName: 'Randy & Victoria',
        usrLoc: 'New-York, USA',
        usrRating: '9'
    }, {
        testimonialQuote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, text ever since the 1500s,',
        usrprofileImgholder: 'img/default_Images_2.jpg',
        usrName: 'Randy & Victoria',
        usrLoc: 'New-York, USA',
        usrRating: '3'
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
        travellerProfile: "img/default_Images_2.jpg",
        travelDate: "26 dec, 2016",
        travelTime: "1:20pm"
    }, {
        header: false,
        footer: false,
        tourPackage: true,
        packageType: "Adventure",
        packageImg: "img/kindofjourney/white-adventure.png",
        tourFlag: [{
            flagImg: "img/default_Images_2.jpg"
        }],
        tourTitle: "Love in Paris",
        tourCost: "25000",
        tourNight: "4",
        tourDay: "5",
        tourPic: "img/banner-itinerary/friends1.jpg",
        tourDate: "26 dec, 2016",
        tourTime: "1:20pm"
    }, {
        header: true,
        footer: true,
        itineraryHeader: true,
        itinerary: true,
        itineraryDate: "26 Dec, 2016",
        itineraryTime: "1:20 pm",
        itineraryCat: "img/kindofjourney/white-adventure.png",
        itineraryPic: "img/banner-itinerary/friends1.jpg",
        itineraryTitle: "Love In Paris",
        itineraryCost: "25000",
        itineraryDays: "75",
        itineraryFlag: [{
            itineraryImg: "img/default_Images_2.jpg"
        }, {
            itineraryImg: "img/default_Images_2.jpg"
        }],
        itineraryJourney: ['Adventure']
    }, {
        header: true,
        footer: true,
        agentHeader: true,
        travellerAgent: true,
        agentName: "Holiday Travallers",
        agentPost: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit error dolore, deleniti hic placeat debitis aperiam aliquid blanditiis autem voluptates libero veritatis excepturi ex corporis deserunt commodi. Aliquid, dolores, asperiores?",
        travellerProfile: "img/default_Images_2.jpg",
        travelDate: "26 dec, 2016",
        travelTime: "1:20pm"
    }, {
        header: true,
        footer: true,
        itineraryHeader: true,
        itinerary: true,
        itineraryDate: "26 Dec, 2016",
        itineraryTime: "1:20 pm",
        itineraryCat: "img/kindofjourney/white-adventure.png",
        itineraryPic: "img/banner-itinerary/friends1.jpg",
        itineraryTitle: "Love In Paris",
        itineraryCost: "25000",
        itineraryDays: "75",
        itineraryFlag: [{
            itineraryImg: "img/default_Images_2.jpg"
        }],
        itineraryJourney: ['Adventure']
    }, {
        header: false,
        footer: false,
        tourPackage: true,
        packageType: "Adventure",
        packageImg: "img/kindofjourney/white-adventure.png",
        tourFlag: [{
            flagImg: "img/default_Images_2.jpg"
        }],
        tourTitle: "Love in Paris",
        tourCost: "25000",
        tourNight: "4",
        tourDay: "5",
        tourPic: "img/banner-itinerary/friends1.jpg",
        tourDate: "26 dec, 2016",
        tourTime: "1:20pm"
    }, {
        header: false,
        footer: false,
        tourPackage: true,
        packageType: "Adventure",
        packageImg: "img/kindofjourney/white-romance.png",
        tourFlag: [{
            flagImg: "img/default_Images_2.jpg"
        }, {
            flagImg: "img/default_Images_2.jpg"
        }],
        tourTitle: "Love in Paris",
        tourCost: "25000",
        tourNight: "4",
        tourDay: "5",
        tourPic: "img/banner-itinerary/friends1.jpg",
        tourDate: "26 dec, 2016",
        tourTime: "1:20pm"
    }];
    // travel activity json end
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

.controller('AgenthomeCtrl', function ($scope, TemplateService, TravelibroService, NavigationService, MyLife, Agent, LikesAndComments, $timeout, $uibModal, $state, $anchorScroll, anchorSmoothScroll, $stateParams, $location) {
    $scope.template = TemplateService.changecontent("agent-home"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Agent Home"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
    $scope.addHomeBackdrop = "";
    $scope.showItinerary = false;
    $scope.showTestimonial = false;
    $scope.showTourPdf = false;
    $scope.showTourPic = false;
    $scope.showCoverBtn = false;
    $scope.pagenumber = 1;
    $scope.avgRating = {};
    $scope.showLead = 0;
    $scope.tour = {};
    $scope.review = {};
    $scope.enquire = {};
    $scope.status = {};
    $scope.itinerary = {};
    $scope.isopenfilter = false;
    $scope.itinerary.citySearch = "";
    $scope.itinerary.type = "";
    $scope.tour.typeOfHoliday = [];
    $scope.tour.country = [];
    $scope.tour.city = [];
    $scope.agentItinerary = [];
    $scope.album = {};
    $scope.photoFilter = [];
    $scope.travelActivity = [];
    $scope.unactionLeads = [];
    $scope.actionLeads = [];
    $scope.tourData = [];
    $scope.delete = false;
    var modal = "";
    $scope.tourDel = {};
    $scope.reviewData = [];
    $scope.agentItineraryType = [];
    $scope.agentCityFilter = [];
    $scope.agentCityFilterName = [];
    $scope.userData = {};
    $scope.agentPhotosVideos = [];
    $scope.agentPhotosArray = [];
    $scope.agentPhotos = [];
    $scope.agentVideos = [];
    var lengthChecker = 0;
    $scope.coverPhotoObj = {};
    var prevIndex;
    var prevLead;
    var itineraryObj = {};
    var photoObj = {};
    var leadChart = {
        month: '',
        year: ''
    }
    $scope.agthomeoptions = {};
    $scope.agthomeoptions.active = "agthome-itinerary";
    $scope.viewTab = 1;
    $scope.scroll = {
        busy: false,
        stopCallingApi: false,
    };
    $scope.status = {
        'refreshArray': true
    };
    $scope.showFilter = true;
    $scope.cityList = [];
    $scope.albumArray = [];
    $scope.filterList = [];
    $scope.agentAlbum = [];
    $scope.index = -1;
    $scope.leadChartData = [];
    $scope.leadmonth = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    $scope.leadyear = _.range(parseInt(moment().format("YYYY")), 2016);
    $scope.leadFilterData = {
        month: '',
        year: moment().format("YYYY")
    };
    $scope.allPhotos = {};
    $scope.allPhotos.photoSliderIndex = "";
    $scope.allPhotos.photoSliderLength = "";
    $scope.allPhotos.newArray = [];
    $scope.agenthomeItinerary = true;
    $scope.agentFixednav = "";
    $scope.viewEnquiry = false;
    $scope.getBackdrop = "";
    $scope.viewContact = false;
    $scope.getBackdrop = "";
    $scope.viewOption = false;
    $scope.isopenfiltertab = false;
    $scope.countries = [];
    $scope.showme = false;
    $scope.viewdetailInfo = false;
    $scope.viewquickInfo = false;

    // likes and comment variable declartion
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;
    // likes and comment variable declartion end
    var travelActivityObj = {};
    var formAgentData = {};
    var formLeadData = {};
    var oneAlbum = {};
    var viewDownloadObj = {};
    var shareModal = "";
    var allagthome = ["views/content/agent/agt-home/agthome-itinerary.html",
    "views/content/agent/agt-home/agthome-tourpackages.html", "views/content/agent/agt-home/agthome-photovideos.html", "views/content/agent/agt-home/agthome-testimonialreviews.html",
    "views/content/agent/agt-home/agthome-travelactivity.html",
    "views/content/agent/agt-home/agthome-leadmonitor.html", "views/content/agent/agt-home/agthome-analytics.html",
    "views/content/agent/agt-home/agthome-aboutus.html"
    ];
    $scope.agthome = {
        innerView: allagthome[0]
    };
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

    $scope.categoriesSpecial = [{
        tourImgCat: "img/kindofjourney/white-adventure.png",
        catwidth: "25px",
        tourCat: "Adventure"
    }, {
        tourImgCat: "img/kindofjourney/white-business.png",
        catwidth: "25px",
        tourCat: "Business"
    }, {
        tourImgCat: "img/kindofjourney/white-family.png",
        catwidth: "33px",
        tourCat: "Family"
    }, {
        tourImgCat: "img/kindofjourney/white-romance.png",
        catwidth: "28px",
        tourCat: "Romance"
    }, {
        tourImgCat: "img/kindofjourney/white-backpacking.png",
        catwidth: "25px",
        tourCat: "Backpacking"
    }, {
        tourImgCat: "img/kindofjourney/white-budget.png",
        catwidth: "24px",
        tourCat: "Budget"
    }, {
        tourImgCat: "img/kindofjourney/white-luxury.png",
        catwidth: "22px",
        tourCat: "Luxury"
    }, {
        tourImgCat: "img/kindofjourney/white-religious.png",
        catwidth: "28px",
        tourCat: "Religious"
    }, {
        tourImgCat: "img/kindofjourney/white-friends.png",
        catwidth: "25px",
        tourCat: "Friends"
    }];

    $scope.itineraryType = [{
        name: "Adventure",
        checked: false
    }, {
        name: "Business",
        checked: false
    }, {
        name: "Family",
        checked: false
    }, {
        name: "Romance",
        checked: false
    }, {
        name: "Budget",
        checked: false
    }, {
        name: "Luxury",
        checked: false
    }, {
        name: "Religious",
        checked: false
    }, {
        name: "Friends",
        checked: false
    }, {
        name: "Shopping",
        checked: false
    }, {
        name: "Solo",
        checked: false
    }, {
        name: "Festival",
        checked: false
    }, {
        name: "Backpacking",
        checked: false
    }];

    //Chart
    $scope.chartConfig = {
        chart: {
            backgroundColor: '#000000',
            borderRadius: 10,
            type: 'line'
        },
        title: {
            text: ''
        },
        legend: {
            backgroundColor: 'transparent'
        },
        exporting: false,
        xAxis: {
            title: {
                text: ''
            },
            categories: []
        },
        yAxis: {
            // min: 0,
            title: {
                text: ''
            },
            gridLineColor: 'transparent'
        },
        series: [{
            name: 'Leads',
            lineColor: '#ef645e',
            marker: {
                symbol: 'round',
                fillColor: '#ef645e'
            },
            data: []
        }],
        loading: false,
    };
    //Chart End

    $scope.initialiseArray = function () {
        $scope.showTourPdf = false;
        $scope.showTourPic = false;
        $scope.showItinerary = false;
        $scope.addHomeBackdrop = "";
        $scope.tour = {};
        $scope.album = {};
        $scope.albumArray = [];
        $scope.status = {};
        $scope.agentPhotosVideos = [];
        $scope.agentPhotosArray = [];
        $scope.agentPhotos = [];
        $scope.agentVideos = [];
        $scope.photoSec = false;
        $scope.profileobj = [];
        $scope.categoriesSpecial = _.map($scope.categoriesSpecial, function (each) {
            each.class = '';
            return each;
        });
        $scope.getCountry();
    }
    setInterval(function () {
        $scope.paginationLoader = TemplateService.paginationLoader;
    }, 300);

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
    };
    //scroll agent navbar  change
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
    //scroll agent navbar change end

    //scroll analytics filter  change
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //console.log(scroll);
        if (scroll >= 370) {
            //console.log('a');
            $(".analytics-filter").addClass("analyticsfilter-fixed");
        } else {
            //console.log('a');
            $(".analytics-filter").removeClass("analyticsfilter-fixed");
        }
    });
    //scroll analytics filter change end

    // Tab SCROLLDOWN
    $scope.agentScrollDown = function () {
        $('html,body').animate({
            scrollTop: 370
        },
        'slow');
    };
    // Tab SCROLLDOWN END

    // ADD BUTTTON BACKDROP AND CLICK
    $scope.addItinerary = function () {
        // console.log("click");
        if ($scope.showItinerary == false) {
            $scope.showItinerary = true;
            $scope.addHomeBackdrop = "backdrop-addhome";
        } else {
            $scope.initialiseArray();
        }
    };
    // ADD BUTTTON BACKDROP AND CLICK END

    // SHOW ADD TESTIMONIAL
    $scope.addTestimonial = function () {
        if ($scope.showTestimonial == false) {
            $scope.showTestimonial = true;
        } else {
            $scope.showTestimonial = false;
        }
    };
    // SHOW ADD TESTIMONIAL END

    // CHANGE COVER PHOTO
    $scope.agentCoverPic = function (data) {
        console.log(data, 'coverPhoto');
        var obj = {
            'coverPhoto': data
        }
        console.log(obj, 'coverpic');
        Agent.updateCoverPhoto(obj, function (data) {
            console.log(data, 'coverpic saved');
            if (data.value) {
                $scope.coverPhotoObj = {
                    "background-image": "url('" + adminURL + "/upload/readFile?file=" + $scope.userData.coverPhoto + "')"
                };
            }
        })
            // $scope.showCoverBtn = true;
        };
    // CHANGE COVER PHOTO END

    // GET AVERAGE AGENT RATING
    $scope.getAvgRating = function (activeSlug) {
        Agent.getAvgRating(activeSlug, function (data) {
            $scope.avgRating = data.data;
        });
    };
    // GET AVERAGE AGENT RATING END
    // TOUR FORM SAVE
    // $scope.tour.currency = [];
    $scope.selectCategory = function (obj) {
        console.log($scope.tour.typeOfHoliday);
        console.log(obj, "yeh select");
        if (obj.class == "category-active") {
            obj.class = "";
        } else {
            obj.class = "category-active";
        }
        $scope.tour.typeOfHoliday = _.filter($scope.categoriesSpecial, ['class', 'category-active']);
        console.log($scope.tour.typeOfHoliday, 'tourtype list');
        $scope.tour.typeOfHoliday = _.map($scope.tour.typeOfHoliday, 'tourCat');
    };

    $scope.getCity = function () {
        NavigationService.getCitySearch({ country: $scope.tour.country, limit: "0" }, function (data) {
            $scope.cities = data.data.results;
        });
    };
    $scope.getCountry = function () {
        var countriesCallback = function (data) {
            $scope.countries = data.data;
        };
        NavigationService.getAllCountries(countriesCallback, function () {
            console.log("error getting  getAllCountries");
        });
    };
    $scope.removeCity = function (removed) {
        _.remove($scope.tour.city, function (each) {
            return each.country.toString() === removed._id.toString();
        });
        $scope.countries.push(removed);
        if ($scope.tour && $scope.tour.country && $scope.tour.country.length > 0) {
            $scope.getCity();
        } else {
            $scope.cities = [];
        }
    };

    $scope.tourPhoto = function (data) {
        $scope.tour.displayPic = data;
        console.log($scope.tour.displayPic, 'stour');
        $scope.showTourPic = true;
    };

    $scope.tourPdf = function (data) {
        $scope.tour.pdf = data;
        console.log($scope.tour.pdf, 'spdf');
        $scope.showTourPdf = true;
    };

    $scope.removeTourPic = function () {
        $scope.tour.displayPic = '';
        console.log($scope.tour.displayPic, 'pic out');
        $scope.showTourPic = false;
    };

    $scope.removeTourPdf = function () {
        $scope.tour.pdf = '';
        console.log($scope.tour.displayPic, 'pdf out');
        $scope.showTourPdf = false;
    };

    $scope.saveTour = function (toursForm) {
        //SAVE TOUR TYPE IN ARRAY
        $scope.tour.typeOfHoliday = _.filter($scope.categoriesSpecial, ['class', 'category-active']);
        console.log($scope.tour.typeOfHoliday, 'tourtype list');
        $scope.tour.typeOfHoliday = _.map($scope.tour.typeOfHoliday, 'tourCat');
        $scope.tour.country = _.map($scope.tour.country, '_id');
        $scope.tour.city = _.map($scope.tour.city, '_id');
        // SAVE TOUR TYPE IN ARRAY
        Agent.saveTour($scope.tour, function (data) {
            if (data.value == true) {
                $scope.addItinerary();
                $scope.tour = {};
                toursForm.$setPristine();
                $scope.showTourPdf = false;
                $scope.showTourPic = false;
                $scope.getAgentData('tours&packages', $scope.activeUrlSlug, $scope.pagenumber);
            } else {
                console.log('data error');
            }
        });
    };
    $scope.editTour = function (tour) {
        $scope.tour = tour;
        $scope.tour.fromEdit = true;
        $scope.categoriesSpecial = _.map($scope.categoriesSpecial, function (each) {
            if ($scope.tour.typeOfHoliday.indexOf(each.tourCat) !== -1) {
                each.class = 'category-active';
            }
            return each;
        });
        _.each($scope.tour.country, function (each) {
            _.remove($scope.countries, function (eachCountry) {
                return eachCountry.name === each.name;
            });
        });
        if ($scope.tour.displayPic) {
            $scope.showTourPic = true;
        }
        if ($scope.tour.pdf) {
            $scope.showTourPdf = true;
        }
        $scope.getCity();
        $scope.addItinerary();
    };

    $scope.checkDN = function () {
        if ($scope.tour.nights === 0 && $scope.tour.days === 0) {
            $scope.showDNErr = true;
        } else if ($scope.tour.nights >= 0 || $scope.tour.days >= 0) {
            if (($scope.tour.days - $scope.tour.nights) >= -1 && ($scope.tour.days - $scope.tour.nights) <= 1) {
                $scope.showDNErr = false;
            } else {
                $scope.showDNErr = true;
            }
        } else {
            $scope.showDNErr = false;
        }
    };
    $scope.checkHM = function () {
        if ($scope.tour.minutes > 59) {
            $scope.showHMErr = true;
        } else {
            $scope.showHMErr = false;
        }
    };

    // TOUR FORM SAVE END

    //TOUR PDF DOWNLOAD
    $scope.downloadTourPdf = function (tour) {
        Agent.downloadTourPdf(tour, function (data) {
            if (data.value == true) {
                console.log('hello');
            }
        });
    };
    //TOUR PDF DOWNLOAD END

    // SAVE TESTIMONIAL
    $scope.saveTestimonial = function (review) {
        if (TemplateService.isLoggedIn) {
            $scope.review.user = $scope.userData.urlSlug;
            console.log(review, 'review save');
            Agent.saveAgentReview(review, function (data) {
                console.log(data, 'review aaya');
                if (data.value == true) {
                    $scope.review = {};
                    $scope.review.rating = 7;
                    $scope.addTestimonial();
                    $scope.getAvgRating($scope.activeUrlSlug);
                    $scope.getAgentData('testimonials&reviews', $scope.activeUrlSlug, $scope.pagenumber);
                } else {
                    console.log('review save error');
                }
            })
        } else {
            $state.go("login");
        }

    };
    // SAVE TESTIMONIAL END

    //STATUS SEND
    $scope.sendStatus = function (status) {
        Agent.agentStatusSave(status, function (data) {
            if (data.value == true) {
                $scope.initialiseArray();
                $scope.getTravelActivity($scope.activeUrlSlug, $scope.pagenumber);
            } else {
                console.log('status error');
            }
        })
    };
    //STATUS SEND END

    // SAVE PHOTO VIDEOS

    // SET PHOTO ARRAY
    $scope.addAgentPhotos = function (detail, length) {
        console.log(detail, 'photo upload return');
        lengthChecker++;
        if (length === lengthChecker) {
            $scope.template.uploading = false;
        }
        $scope.showPhotoError = false;
        if (detail.thumbnail) {
            $scope.agentVideos.push({
                name: detail.name,
                thumbnail: detail.thumbnail,
                caption: '',
                type: 'video'
            });
        } else {
            $scope.agentPhotos.push({
                name: detail,
                caption: '',
                type: 'photo'
            });
        }
        $scope.agentPhotosVideos = _.concat($scope.agentPhotos, $scope.agentVideos);
        //photo display
        $scope.flexShow = false;
        $scope.agentPhotosArray = $scope.agentPhotosVideos;
        $scope.agentPhotosArray = _.chunk($scope.agentPhotosArray, 4);
        for (var i = 0; i < $scope.agentPhotosArray.length; i++) {
            $scope.agentPhotosArray[i] = _.chunk($scope.agentPhotosArray[i], 2);
        }
        y = 1;
        console.log($scope.agentPhotosArray, "agentPhotosArray");
        if ($scope.agentPhotosArray.length > 0) {
            $scope.photoSec = true;
        } else {
            $scope.photoSec = false;
        }
        $timeout(function () {
            $scope.flexShow = true;
        }, 200)
            //photo display end
        };
    // SET PHOTO ARRAY END

    //ADD PHOTO VIDEO CAPTION
    $scope.putCaptionAgent = function (index) {
        if ($scope.index == index) {
            $scope.index = -1;
        } else {
            $scope.index = index;
        }
    };
    //ADD PHOTO VIDEO CAPTION END
    // REMOVE PHOTO VIDEO
    $scope.removePhoto = function (data) {
        if (data.type == 'video') {
            _.remove($scope.agentVideos, function (videos) {
                return videos.name === data.name;
            })
        } else {
            _.remove($scope.agentPhotos, function (photos) {
                return photos.name === data.name;
            });
        }

        $scope.agentPhotosVideos = _.concat($scope.agentPhotos, $scope.agentVideos);
        //photo display
        $scope.flexShow = false;
        $scope.agentPhotosArray = $scope.agentPhotosVideos;
        $scope.agentPhotosArray = _.chunk($scope.agentPhotosArray, 4);
        for (var i = 0; i < $scope.agentPhotosArray.length; i++) {
            $scope.agentPhotosArray[i] = _.chunk($scope.agentPhotosArray[i], 2);
        }
        y = 1;
        console.log($scope.agentPhotosArray, "Delete agentPhotosArray");
        if ($scope.agentPhotosArray.length > 0) {
            $scope.photoSec = true;
        } else {
            $scope.photoSec = false;
        }
        $timeout(function () {
            $scope.flexShow = true;
        }, 200)
        if ($scope.agentPhotosArray.length > 0) {
            $scope.photoSec = true;
        } else {
            $scope.photoSec = false;
        }
    };
    // REMOVE PHOTO VIDEO END
    // SAVE PHOTO VIDEO
    $scope.savePhotoVideo = function (album) {
        $scope.album.photos = $scope.agentPhotos;
        $scope.album.videos = $scope.agentVideos;

        console.log($scope.album, 'album');
        if ($scope.agentPhotosVideos.length == 0) {
            $scope.showPhotoError = true;
        } else {
            $scope.showPhotoError = false;
            Agent.savePhotoAlbum(album, function (data) {
                if (data.value == true) {
                    console.log('album saved');
                    $scope.photoSec = false;
                    $scope.album = {};
                    $scope.agentPhotosVideos = [];
                    $scope.agentPhotosArray = [];
                    $scope.agentPhotos = [];
                    $scope.agentVideos = [];
                    $scope.addItinerary();
                    $scope.getPhotoVideo($scope.activeUrlSlug);
                } else {
                    console.log('album error');
                }
            })
        }
    };
    // SAVE PHOTO VIDEO END
    // SAVE PHOTO VIDEOS END
    // SAGAR INTEGRATION ENd

    // on load modal
    // $(window).load(function(){
    //   $('#getModal').modal('show');
    // });
    // on load modal end

    $scope.leadRead = function (currentLead, currentIndex, open) {
        console.log(currentIndex, open);
        currentLead.class = 'lead-read'
        Agent.changeStatus(currentLead, $scope.getAvgRating($scope.activeUrlSlug));
    };

    // GET AGENT ITINERARY
    // FILTER ITINERARY DESTINATION
    // $scope.getItinerayCity = function (formData) {
    //     $scope.cityList = [];
    //     console.log('hihsjk', formData);
    //     Agent.getAgentCitySearch({
    //         keyword: $scope.itinerary.citySearch
    //     }, function (data) {
    //         $scope.cityList = data.data.results;
    //         $scope.cityList = _.map($scope.cityList, function (cityListData) {
    //             cityListData.checked = false;
    //             return cityListData;
    //         });
    //         console.log($scope.cityList, 'get Data');
    //     })
    // };
    // filter sorting

    $scope.itineraryFilter = function (filterItinerary, filterType) {
        console.log(filterItinerary);
        switch (filterType) {
            case 'itineraryCity':
            var cityIndex = _.findIndex($scope.agentCityFilter, function (type) {
                return type.name == filterItinerary.name;
            });
            if (cityIndex == -1) {
                $scope.agentCityFilter.push(filterItinerary);
                var cityItiIndex = _.findIndex($scope.cityList, function (cityCheck) {
                    return cityCheck.name == filterItinerary.name
                });
                $scope.cityList[cityItiIndex].checked = true;
                console.log($scope.agentCityFilter, 'city');
            } else {
                _.remove($scope.agentCityFilter, function (remove) {
                    return remove.name == filterItinerary.name;
                });
                var cityItiIndex = _.findIndex($scope.cityList, function (cityCheck) {
                    return cityCheck.name == filterItinerary.name
                });
                $scope.cityList[cityItiIndex].checked = false;
                console.log($scope.agentCityFilter, 'city');
            }
            $scope.pagenumber = 1;
            break;
            case 'itineraryType':
            var typeIndex = _.findIndex($scope.agentItineraryType, function (type) {
                return type.name == filterItinerary.name;
            });
            if (typeIndex == -1) {
                $scope.agentItineraryType.push(filterItinerary);
                var countryItiTypeIndex = _.findIndex($scope.itineraryType, function (getIndexCountry) {
                    return getIndexCountry.name == filterItinerary.name;
                })
                $scope.itineraryType[countryItiTypeIndex].checked = true;
                console.log($scope.agentItineraryType, 'type');
            } else {
                _.remove($scope.agentItineraryType, function (remove) {
                    return remove.name == filterItinerary.name;
                })
                var countryItiTypeIndex = _.findIndex($scope.itineraryType, function (getIndexCountry) {
                    return getIndexCountry.name == filterItinerary.name;
                })
                $scope.itineraryType[countryItiTypeIndex].checked = false;
                console.log($scope.agentItineraryType, 'type');
            }
            $scope.pagenumber = 1;
            break;
        }
    };
    // FILTER ITINERARY agent END
    // clear country itinerary filter
    $scope.clearAgentItinerary = function () {
        _.each($scope.cityList, function (listCityChecked) {
            listCityChecked.checked = false;
        })
        _.each($scope.itineraryType, function (listItiChecked) {
            listItiChecked.checked = false;
        })
        $scope.agentCityFilter = [];
        $scope.agentItineraryType = [];
    };


    $scope.getAgentItinerary = function (activeSlug) {
        scroll.scrollBusy = false;
        scroll.stopCallingApi = false;
        itineraryObj.urlSlug = activeSlug;
        itineraryObj.pagenumber = 0;
        itineraryObj.city = _.map($scope.agentCityFilter, "_id");
        itineraryObj.itineraryType = _.map($scope.agentItineraryType, "name");
        console.log(itineraryObj, 'itineraries call');
        $scope.getMoreAgentItinerary();
    };

    $scope.getMoreAgentItinerary = function () {
        console.log("scroll event");
        if (scroll.scrollBusy) {
            return;
        } else {
            if (scroll.stopCallingApi) {
                return;
            } else {
                scroll.scrollBusy = true;
                ++itineraryObj.pagenumber;
                console.log(itineraryObj);
                Agent.getAgentItinerary(itineraryObj, function (data) {
                    scroll.scrollBusy = false;
                    console.log(data, "iti data scroll");
                    $scope.isopenfilter = false;
                    $scope.cityList = data.city;
                    $scope.cityList = _.map($scope.cityList, function (cityListData) {
                        var index = _.findIndex($scope.agentCityFilter, function (each) {
                            return cityListData.name == each.name;
                        });
                        if (index === -1) {
                            cityListData.checked = false;
                        } else {
                            cityListData.checked = true;
                        }
                        return cityListData;
                    });
                    if (data.data.length == 0) {
                        scroll.stopCallingApi = true;
                        if (itineraryObj.pagenumber === 1 && itineraryObj.city.length === 0 && itineraryObj.itineraryType.length === 0) {
                            $scope.agentItinerary = [];
                            $scope.showFilter = false;
                        } else if (itineraryObj.city.length > 0 || itineraryObj.itineraryType.length > 0 || itineraryObj.pagenumber > 1) {
                            $scope.showFilter = true;
                        } else {
                            $scope.showFilter = false;
                            $scope.agentItinerary = [];
                        }
                    } else {
                        if (itineraryObj.pagenumber == 1) {
                            $scope.agentItinerary = data.data;
                        } else {
                            _.each(data.data, function (n) {
                                $scope.agentItinerary.push(n);
                            });
                        }
                    }
                }, function (data, status) {
                    console.log(data, status);
                    scroll.scrollBusy = false;
                    scroll.stopCallingApi = false;
                    --scroll.pagenumber;
                });
            }
        }
    };
    // GET AGENT ITINERARY END

    // GET PHOTOSVIDEOS

    $scope.getPhotoVideo = function (activeSlug) {
        scroll.scrollBusy = false;
        scroll.stopCallingApi = false;
        photoObj.urlSlug = activeSlug;
        photoObj.pagenumber = 0;
        photoObj.album = $scope.albumArray;
        console.log('get photovideo');
        $scope.getMoreAgentPhotos();
    };

    $scope.getMoreAgentPhotos = function () {
        console.log("scroll event");
        console.log(photoObj);
        if (scroll.scrollBusy) {
            return;
        } else {
            if (scroll.stopCallingApi) {
                return;
            } else {
                scroll.scrollBusy = true;
                ++photoObj.pagenumber;
                console.log(photoObj, 'get more photovideo');
                Agent.getAlbum(photoObj, function (data) {
                    scroll.scrollBusy = false;
                    if (data.data.media.length == 0) {
                        scroll.stopCallingApi = true;
                    } else {
                        if (photoObj.pagenumber == 1) {
                            $scope.agentAlbum = data.data.media;
                        } else {
                            _.each(data.data.media, function (n) {
                                $scope.agentAlbum.push(n);
                            });
                        }
                        $scope.filterList = data.data.album;
                        _.each($scope.filterList, function (n) {
                            n.checked = false,
                            n.class = ""
                        });
                        if ($scope.albumArray.length != 0) {
                            console.log("!0 enter");
                            _.each($scope.albumArray, function (n) {
                                console.log("albumArray enter");
                                _.each($scope.filterList, function (n1) {
                                    console.log("filterList enter");
                                    if (n1._id == n) {
                                        console.log("id if enter");
                                        n1.checked = true,
                                        n1.class = "photo-checked"
                                    }
                                });
                            });
                        }
                        console.log($scope.filterList, "filterList false");
                    }
                }, function (data, status) {
                    console.log(data, status);
                    scroll.scrollBusy = false;
                    scroll.stopCallingApi = false;
                    --scroll.pagenumber;
                });
            }
        }
    };

    $scope.filterList = _.each($scope.filterList, function (n) {
        n.class = "",
        n.checked = false
    });
    // GET PHOTOSVIDEOS END

    // PHOTOVIDEO FILTER
    $scope.addFilterId = function (data) {
        console.log(data);
        var getAgentIndex = _.findIndex($scope.albumArray, function (n) {
            return n === data._id;
        });
        var agentChecked = _.findIndex($scope.filterList, function (n) {
            return n._id === data._id
        });
        if (getAgentIndex == -1) {
            $scope.albumArray.push(data._id);
            console.log(agentChecked, 'agentChecked');
            $scope.filterList[agentChecked].checked = true;
            $scope.filterList[agentChecked].class = "photo-checked";
            console.log($scope.filterList[agentChecked].checked, 'checked wala');
        } else {
            _.remove($scope.albumArray, function (remove) {
                return remove === data._id;
            })
            $scope.filterList[agentChecked].checked = false;
            $scope.filterList[agentChecked].class = "";
        }
        console.log($scope.filterList, "list true");
        // $scope.albumArray.push(id);
        console.log($scope.albumArray, 'albumArray');
    };

    $scope.filterPhotoAlbum = function () {
        $scope.getPhotoVideo($scope.activeUrlSlug);
        // CLOSE FILTER ON APPLY
        $("#demo").removeClass("in");
        $(".photo-filter").addClass("collapsed");

        // CLOSE FILTER ON APPLY  END
    };

    $scope.clearPhotoFilter = function () {
        $scope.albumArray = [];
        console.log($scope.albumArray, 'clearfilter');
        _.each($scope.filterList, function (n) {
            n.checked = false,
            n.class = ""
        })
        console.log($scope.filterList, "filter clear");
        $scope.getPhotoVideo($scope.activeUrlSlug);
    };
    // PHOTOVIDEO FILTER END

    // GET AGENT TRAVELACTIVITY
    $scope.getTravelActivity = function (activeSlug) {
        scroll.scrollBusy = false;
        scroll.stopCallingApi = false;
        travelActivityObj.urlSlug = activeSlug;
        travelActivityObj.pagenumber = 0;
        console.log(travelActivityObj, 'Travelactivity call');
        $scope.getMoreTravelActivity();
    };

    $scope.getMoreTravelActivity = function () {
        console.log("scroll event");
        if (scroll.scrollBusy) {
            return;
        } else {
            if (scroll.stopCallingApi) {
                return;
            } else {
                scroll.scrollBusy = true;
                ++travelActivityObj.pagenumber;
                Agent.getTravelActivity(travelActivityObj, function (data) {
                    scroll.scrollBusy = false;
                    console.log(data, "travelActivity data scroll");
                    if (data.data.length == 0) {
                        scroll.stopCallingApi = true;
                    } else {
                        if (travelActivityObj.pagenumber == 1) {
                            $scope.travelActivity = data.data;
                        } else {
                            _.each(data.data, function (n) {
                                $scope.travelActivity.push(n);
                            });
                        }
                    }
                }, function (data, status) {
                    console.log(data, status);
                    scroll.scrollBusy = false;
                    scroll.stopCallingApi = false;
                    --scroll.pagenumber;
                });
            }
        }
    };

    //Edit Activity
    $scope.editStatus = function (status) {
        if (status.type === "agentStatus") {
            $scope.status = status;
            $scope.addItinerary();
            setTimeout(function () {
                $('html,body').animate({
                    scrollTop: $("#addStatus").offset().top - 100
                }, 1000);
            }, 10);
        } else if (status.type === "detail-itinerary") {
            $state.go("detailitinerary", { flag: 'edit', urlSlug: status.urlSlug });
        } else {
            $state.go("quickitinerary", { flag: 'edit', urlSlug: status.urlSlug });
        }
    };
    var delModal = "";
    $scope.deleteStatus = function (status) {
        $scope.status = status;
        delModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/delete-activity.html",
            scope: $scope
        });
    };
    $scope.deleteActivity = function () {
        if ($scope.status.type === "agentStatus") {
            Agent.deleteStatus($scope.status, function (data) {
                if (data.value) {
                    $scope.getTravelActivity($scope.activeUrlSlug);
                }
            });
        } else {
            NavigationService.deleteItinerary($scope.status._id, function (data) {
                if (data.value) {
                    $scope.getTravelActivity($scope.activeUrlSlug);
                }
            })
        }
        delModal.close();
        $scope.status = {};
    };
    $scope.editOption = function (each) {
        $timeout(function () {
            each.backgroundClick = true;
            backgroundClick.object = each;
        }, 200);
        backgroundClick.scope = $scope;
    };

    //Edit Activity End

    // GET AGENT TRAVELACTIVITY END

    // GET TOURS AND TESTIMONIALS
    $scope.getAgentData = function (type, activeSlug) {
        scroll.scrollBusy = false;
        scroll.stopCallingApi = false;
        formAgentData = {
            pagenumber: 0,
            urlSlug: activeSlug,
            type: type
        }

        $scope.getMoreAgentData();
    };

    $scope.getMoreAgentData = function () {
        console.log("scroll event");
        if (scroll.scrollBusy) {
            return;
        } else {
            if (scroll.stopCallingApi) {
                return;
            } else {
                scroll.scrollBusy = true;
                ++formAgentData.pagenumber;
                var callback = function () {};
                switch (formAgentData.type) {
                    case 'tours&packages':
                    callback = function (data) {
                        scroll.scrollBusy = false;
                        console.log(data, "iti data scroll");
                        if (data.data.length == 0) {
                            scroll.stopCallingApi = true;
                        } else {
                            if (formAgentData.pagenumber == 1) {
                                $scope.tourData = data.data;
                            } else {
                                _.each(data.data, function (n) {
                                    $scope.tourData.push(n);
                                });
                            }
                        }
                    },
                    function (data, status) {
                        console.log(data, status);
                        scroll.scrollBusy = false;
                        scroll.stopCallingApi = false;
                        --scroll.pagenumber;
                    }

                    break;
                    case 'testimonials&reviews':
                    callback = function (data) {
                        scroll.scrollBusy = false;
                        console.log(data, "iti data scroll");
                        if (data.data.length == 0) {
                            scroll.stopCallingApi = true;
                        } else {
                            if (formAgentData.pagenumber == 1) {
                                $scope.reviewData = data.data;
                            } else {
                                _.each(data.data, function (n) {
                                    $scope.reviewData.push(n);
                                });
                            }
                        }
                    },
                    function (data, status) {
                        console.log(data, status);
                        scroll.scrollBusy = false;
                        scroll.stopCallingApi = false;
                        --scroll.pagenumber;
                    }
                    break;
                    default:
                    callback = function (data) {
                        scroll.scrollBusy = false;
                        console.log(data, "iti data scroll");
                        if (data.data.length == 0) {
                            scroll.stopCallingApi = true;
                        } else {
                            if (formAgentData.pagenumber == 1) {
                                $scope.tourData = data.data;
                            } else {
                                _.each(data.data, function (n) {
                                    $scope.tourData.push(n);
                                });
                            }
                        }
                    },
                    function (data, status) {
                        console.log(data, status);
                        scroll.scrollBusy = false;
                        scroll.stopCallingApi = false;
                        --scroll.pagenumber;
                    }
                    break;
                }
                Agent.getAgentdata(formAgentData, callback);
            }
        }
    };
    // GET TOURS AND TESTIMONIALS END

    //DELETE TOUR
    $scope.deleteTour = function (tour) {
        $scope.tourDel = tour;
        modal = $uibModal.open({
            templateUrl: "views/modal/delete-tour.html",
            animation: true,
            scope: $scope,
            windowClass: "report-modal",
            backdrop: "static"
        });
    };
    $scope.callDelete = function () {
        Agent.deleteTour({ _id: $scope.tourDel._id }, function (data) {
            if (data.value) {
                $scope.delete = true;
                $timeout(function () {
                    modal.close();
                    $scope.delete = false;
                }, 3000);
                $scope.getAgentData('tours&packages', $scope.activeUrlSlug, 1);
            } else {
                console.log("err");
            }
        });
    };
    //DELETE TOUR END

    $scope.getLeadsChart = function (activeSlug) {
        leadChart.urlSlug = activeSlug;
        console.log($scope.leadFilterData);
        leadChart.month = moment().month($scope.leadFilterData.month).format("MM");
        leadChart.year = $scope.leadFilterData.year;

        console.log(leadChart, "leads chart");
        Agent.getLeadsData(leadChart, function (data) {
            if (data.value == true) {
                $scope.leadChartData = data.data;
                console.log($scope.leadChartData, "GET Leads chart");

                var numberOfDaysInMonth = moment(leadChart.year + "-" + leadChart.month, "YYYY-MM").daysInMonth();
                var yAxis = [];
                var xAxis = _.times(numberOfDaysInMonth, function (n) {
                    yAxis.push(0);
                    return n + 1 + "";
                });
                console.log(xAxis);

                _.each($scope.leadChartData, function (n) {
                    var value = 0;
                    var key;
                    _.each(n, function (m, k) {
                        value = m;
                        key = k;
                    });
                    console.log(value, key);
                    yAxis[parseInt(key) - 1] = value;
                });
                $scope.chartConfig.xAxis.categories = xAxis;
                $scope.chartConfig.series[0].data = yAxis;
                console.log("YAXIS", yAxis);
            } else {
                console.log('ERROR IN GET Leads chart');
            }
        });
    };

    // ANALYTICS LEADS HIGHCHARTS
    // ANALYTICS LEADS HIGHCHARTS END

    // GET LEADS
    $scope.getLeads = function (type) {
        scroll.scrollBusy = false;
        scroll.stopCallingApi = false;
        formLeadData = {
            pagenumber: 0,
            type: type
        }
        $scope.getMoreLeads();
    };

    $scope.getMoreLeads = function () {
        console.log("scroll event");
        if (scroll.scrollBusy) {
            return;
        } else {
            if (scroll.stopCallingApi) {
                return;
            } else {
                scroll.scrollBusy = true;
                ++formLeadData.pagenumber;
                switch (formLeadData.type) {
                    case 'unActioned':
                    console.log("in unactionLeads");
                    Agent.getAllLeads(formLeadData, function (data) {
                        scroll.scrollBusy = false;
                        console.log(data, "iti data scroll");
                        if (data.data.length == 0) {
                            scroll.stopCallingApi = true;
                        } else {
                            if (formLeadData.pagenumber == 1) {
                                $scope.unactionLeads = data.data;
                            } else {
                                _.each(data.data, function (n) {
                                    $scope.unactionLeads.push(n);
                                });
                            }
                        }
                    }, function (data, status) {
                        console.log(data, status);
                        scroll.scrollBusy = false;
                        scroll.stopCallingApi = false;
                        --scroll.pagenumber;
                    });
                    break;
                    case 'actioned':
                    console.log("in actionLeads");
                    Agent.getAllLeads(formLeadData, function (data) {
                        scroll.scrollBusy = false;
                        console.log(data, "iti data scroll");
                        if (data.data.length == 0) {
                            scroll.stopCallingApi = true;
                        } else {
                            if (formLeadData.pagenumber == 1) {
                                $scope.actionLeads = data.data;
                            } else {
                                _.each(data.data, function (n) {
                                    $scope.actionLeads.push(n);
                                });
                            }
                        }
                    }, function (data, status) {
                        console.log(data, status);
                        scroll.scrollBusy = false;
                        scroll.stopCallingApi = false;
                        --scroll.pagenumber;
                    });
                    break;
                    default:
                    console.log("in default");
                    Agent.getAllLeads(formLeadData, function (data) {
                        scroll.scrollBusy = false;
                        console.log(data, "iti data scroll");
                        if (data.data.length == 0) {
                            scroll.stopCallingApi = true;
                        } else {
                            if (formLeadData.pagenumber == 1) {
                                $scope.unactionLeads = data.data;
                            } else {
                                _.each(data.data, function (n) {
                                    $scope.unactionLeads.push(n);
                                });
                            }
                        }
                    }, function (data, status) {
                        console.log(data, status);
                        scroll.scrollBusy = false;
                        scroll.stopCallingApi = false;
                        --scroll.pagenumber;
                    });
                    break;
                }
            }
        }
    };
    // GET LEADS END

    // PING PONG
    //Photo comment popup
    $scope.getPhotosCommentData = function (photoId, index, length, array) {
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
        modal.opened.then(function(){
            console.log('modal open huwa');
            function keyPress(e){
                console.log(e);
            };
        });
        modal.closed.then(function () {
            $scope.listOfComments = {};
        });
        LikesAndComments.openPhotoPopup(photoId, $scope);
    };
    //Photo comment popup end
    // PING PONG END

    // GET PHOTO POP
    $scope.getPhotoPopup = function (id) {
        oneAlbum._id = id;
        Agent.getOneAlbum(oneAlbum, function (data) {
            if (data.value == true) {
                //Photo comment popup
                var picArray = data.data;
                var pic = picArray[0];
                $index = 0;
                $scope.getPhotosCommentData(pic._id, $index, picArray.length, picArray);
                //Photo comment popup end
            } else {
                console.log("one album false");
            }
        })
    };
    // GET PHOTO POP END

    // GET PROFILE VIEW
    $scope.getProfileView = function () {
        Agent.getAllProfileViews(function (data) {
            if (data.value == true) {
                $scope.profileObj = data.data.profileView;
                _.each($scope.profileObj, function (n) {
                    n.user.following = n.following;
                });
                console.log($scope.profileObj, 'profileview obj');
            } else {
                console.log('ERROR IN GET PROFILE VIEWS');
            }
        })
    };
    // GET PROFILE VIEW END

    // GET VIEWS AND DOWNLOADS
    $scope.getViewDownloads = function (urlSlug) {
        viewDownloadObj.urlSlug = urlSlug;
        Agent.getViewDownloads(viewDownloadObj, function (data) {
            if (data.value == true) {
                $scope.viewDownloads = data.data;
                console.log($scope.viewDownloads, "$scope.viewDownloads");
            } else {
                console.log('ERROR IN GET viewDownloads');
            }
        })
    };
    // GET VIEWS AND DOWNLOADS END

    // integration end

    // <!!! COMMON TASKS !!!>
    // followFollowing  Function
    $scope.followFollowing = function (user) {
        console.log('aaya in likecomment');
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
                if (data.data.responseValue == 1) {
                    $scope.userData.followers_count = $scope.userData.followers_count + 1;
                } else {
                    $scope.userData.followers_count = $scope.userData.followers_count - 1;
                }
            } else {
                console.log("error updating data");
            }
        });
    };
    // followFollowing  Function END
    // sharing local life modal
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        shareModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/sharing.html",
            scope: $scope
        });
    };
    // sharing local life modal end
    $scope.likeUnlikeActivity = function (post) {
        console.log(post);
        post.likeDone = !post.likeDone;
        if (post.likeDone) {
            if (post.likeCount == undefined) {
                post.likeCount = 1;
            } else {
                post.likeCount = post.likeCount + 1;
            }
            LikesAndComments.likeUnlike(post.type, "like", post.uniqueId, post._id, null)
        } else {
            post.likeCount = post.likeCount - 1;
            LikesAndComments.likeUnlike(post.type, "unlike", post.uniqueId, post._id, null)
        }
    };

    $scope.getLikes = function (post) {
        console.log(post);
        LikesAndComments.getLikes(post.type, post._id, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };

    $scope.listLikesDropDown = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };

    $scope.getCommentsData = function (post) {
        console.log(post);
        $scope.previousId;
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.post = post;
        $scope.comment = {
            "text": ""
        }
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            console.log($scope.listOfComments);

            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = post._id;
    };

    $scope.getLikesData = function (post) {
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        };
        console.log($scope.post);
        if ($scope.previousLikeId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = post._id;
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        $timeout(function () {
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
        }, 500);
    };
    // COMMENT LIKE SECTION FUNCTIONS END
    // <!!! COMMON TASKS END !!!>

    // tab change

    $scope.getTab = function (view) {
        $scope.agthome.innerView = allagthome[view];
        var url = "itineraries";
        var active = "";
        console.log(view);
        switch (view) {
            case 0:
            url = "itineraries";
            $scope.getAgentItinerary($scope.activeUrlSlug);
            $scope.agthomeoptions.active = "agthome-itinerary";
            $scope.agenthomeItinerary = true;
            $scope.initialiseArray();
            console.log("case iti");
            break;
            case 1:
            $scope.getAgentData('tours&packages', $scope.activeUrlSlug);
            url = "tours-and-packages";
            $scope.agthomeoptions.active = "agthome-tourpackages";
            $scope.agenthomeItinerary = false;
            $scope.initialiseArray();
            $scope.agentScrollDown();
            console.log("case tour");
            break;
            case 2:
            $scope.getPhotoVideo($scope.activeUrlSlug);
            url = "photos-and-videos";
            $scope.agthomeoptions.active = "agthome-photovideos";
            $scope.agenthomeItinerary = false;
            $scope.initialiseArray();
            $scope.agentScrollDown();
            console.log("case pic");
            break;
            case 3:
            $scope.getAgentData('testimonials&reviews', $scope.activeUrlSlug);
            url = "testimonials-and-reviews";
            $scope.agthomeoptions.active = "agthome-testimonialreviews";
            $scope.agenthomeItinerary = false;
            $scope.initialiseArray();
            $scope.agentScrollDown();
            $scope.getAvgRating($scope.activeUrlSlug);
            console.log("case test");
            break;
            case 4:
            $scope.getTravelActivity($scope.activeUrlSlug);
            url = "travel-activity";
            $scope.agthomeoptions.active = "agthome-travelactivity";
            $scope.agenthomeItinerary = false;
            $scope.initialiseArray();
            $scope.agentScrollDown();
            console.log("case travel");
            break;
            case 5:
            $scope.getAvgRating($scope.activeUrlSlug);
            $scope.getLeads('unActioned');
            url = "lead-monitor";
            $scope.agthomeoptions.active = "agthome-leadmonitor";
            $scope.agenthomeItinerary = false;
            $scope.initialiseArray();
            $scope.agentScrollDown();
            console.log("case lead");
            break;
            case 6:
            url = "analytics";
            $scope.agthomeoptions.active = "agthome-analytics";
            $scope.agenthomeItinerary = false;
            $scope.initialiseArray();
            $scope.agentScrollDown();
            $scope.profileview = true;
            $scope.getProfileView();
            console.log("case ana");
            break;
            case 7:
            url = "about-us";
            $scope.agthomeoptions.active = "agthome-aboutus";
            $scope.agenthomeItinerary = false;
            $scope.initialiseArray();
            $scope.agentScrollDown();
            console.log("case ana");
            break;
            default:
            $scope.getAgentItinerary($scope.activeUrlSlug);
            url = "itineraries";
            $scope.agthomeoptions.active = "agthome-itinerary";
            $scope.agenthomeItinerary = true;
            $scope.initialiseArray();
            console.log("case def");
            break;
        }
        console.log("userdata", $scope.userData.urlSlug);
        console.log("url", url);
        $state.go("agent-home", {
            urlSlug: $scope.userData.urlSlug,
            name: url
        }, {
            notify: false
        });
    };
    // tab change end

    // GET ANALYTICS
    $scope.getAgentScroll = function (getId) {
        $scope.getTab(6);
        $scope.profileview = false;
        $scope.follower = false;
        $scope.leads = false;
        $scope.viewsdownload = false;
        // $scope.followersList = [];
        switch (getId) {
            case 'profileview':
            $scope.getProfileView();
            $scope.profileview = true;
            break;
            case 'follower':
            $scope.follower = true;
            $scope.getFollowers = function () {
                console.log('calln followers');
                MyLife.getFollowersWeb($scope.activeUrlSlug, function (data) {
                    $scope.followersList = data.data.followers;
                    console.log($scope.followersList, 'followeragt');
                });
            }
            $scope.getFollowers();
            break;
            case 'leads':
            $scope.getLeadsChart($scope.activeUrlSlug);
            $scope.leads = true;
            break;
            case 'viewsdownload':
            $scope.viewsdownload = true;
            $scope.getViewDownloads($scope.activeUrlSlug);
            break;
            default:
            $scope.profileview = true;
            $scope.getProfileView();
            break;
        }
    };
    // GET ANALYTICS END

    //enquiry & contact card initialisation
    // enquiry

    // ENQUIRY FORM FILL
    $scope.sendEnquiry = function (enquire) {
        Agent.setLeads(enquire, function (data) {
            console.log(data, 'enquire response');
            if (data.value == true) {
                $scope.enquire = {};
                $scope.showEnquiry();
            } else {
                console.log('enquiry ma error che!');
            }
        });
    };
    // ENQUIRY FORM FILL END

    $scope.showEnquiry = function () {
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
    $scope.showContact = function (tourcard) {
        if ($scope.viewContact == false) {
            $scope.getBackdrop = "backdrop-enquiry";
            $scope.viewContact = true;
            $scope.countAdder(tourcard);
        } else {
            $scope.viewContact = false;
            $scope.getBackdrop = "";
        }
    };
    //contact us end
    //enquiry & contact card initialisation

    //Show OPTIONS
    $scope.editOption = function (model) {
        if (model.backgroundClick) {
            model.backgroundClick = false;
        } else {
            $timeout(function () {
                model.backgroundClick = true;
                backgroundClick.object = model;
            }, 200);
            backgroundClick.scope = $scope;
        }
    };
    //Show OPTIONS END

    // LEAD MONITOR TABS
    $scope.viewLeadTab = function (type) {
        switch (type) {
            case 0:
            $scope.showLead = 0;
            $scope.getLeads('unActioned');
            break;
            case 1:
            $scope.showLead = 1;
            $scope.getLeads('actioned');
            break;
            default:
            $scope.showLead = 0;
            $scope.getLeads('unActioned');
            break;
        }
    };
    // LEAD MONITOR TABS END

    // ROUTE TO ITINERARY
    $scope.routeItinerary = function (post) {
        console.log(post, 'user');
        if (post.type == 'quick-itinerary') {
            $state.go('userquickitinerary', {
                'id': post.urlSlug,
                'urlSlug': post.user.urlSlug
            });
        } else {
            $state.go('userdetailitinerary', {
                'id': post.urlSlug,
                'urlSlug': post.user.urlSlug
            });
        }
    };
    // ROUTE TO ITINERARY END

    // ITINERARY FILTER
    $scope.openFiltertab = function () {
        $scope.isopenfilter = !$scope.isopenfilter;
    };

    $scope.addLine = function () {
        $scope.lines.push($scope.lines.length);
    };

    // FILTER CLICK
    $scope.showAgentFilter = function () {
        if ($scope.showme == false) {
            $scope.showme = true;
        } else {
            $scope.showme = false;
        }
    };
    // FILTER CLICK END
    //ITINERARY FILTER END

    // itinerary popover
    $scope.showdetailInfo = function () {
        if ($scope.viewdetailInfo == false) {
            $scope.viewdetailInfo = true;
            console.log("true");
        } else {
            $scope.viewdetailInfo = false;
        }
    };

    $scope.showquickInfo = function () {
        if ($scope.viewquickInfo == false) {
            $scope.viewquickInfo = true;
        } else {
            $scope.viewquickInfo = false;
        }
    };
    // itinerary popover end


    $scope.countAdder = function (tourcard) {
        Agent.countAdder({ _id: tourcard._id }, function (data) {
            console.log(data);
            if (data.value == true) {
                console.log("Added counter");
            }
        });
    };

    // DOWNLOAD LIST
    // DOWNLOAD LIST END

    // category type
    // category of Specialisation array end

    // ANALYTICS LEAD FILTER
    // ANALYTICS LEAD FILTER END
    // PROFILE VIIEWS JSON
    // PROFILE VIIEWS JSON END


    // PRATIK CONTROLLER
    //isMine or someoneOthers profile
    if ($.jStorage.get("isLoggedIn") && ($.jStorage.get("profile").urlSlug == $stateParams.urlSlug)) {
        //its your own profile so no need to call profile again
        $scope.userData = $.jStorage.get("profile");
        if ($scope.userData.coverPhoto) {
            console.log($scope.userData.coverPhoto);
            $scope.coverPhotoObj = {
                "background-image": "url('" + adminURL + "/upload/readFile?file=" + $scope.userData.coverPhoto + "')"
            };
        } else {
            $scope.coverPhotoObj = {
                "background-image": "url('../img/popularagent/bg-agent.jpg')"
            };
        }
        if ($scope.userData) {
            $scope.enquire.name = $scope.userData.name;
            $scope.enquire.email = $scope.userData.email;
        } else {
            $scope.enquire.name = '';
            $scope.enquire.email = '';
        }
        if ($.jStorage.get("profile").type === "TravelAgent") {
            TemplateService.title = $scope.userData.name + " | Travel & Local Life | TraveLibro";
            $.jStorage.set("activeUrlSlug", $.jStorage.get("profile").urlSlug);
            $scope.activeUrlSlug = $.jStorage.get("profile").urlSlug;
            $scope.userData.sharingUrl = "https://travelibro.com/partners/" + $scope.activeUrlSlug;
            $scope.enquire.urlSlug = $scope.activeUrlSlug;
            switch ($state.params.name) {
                case "itineraries":
                $scope.getAgentItinerary($scope.activeUrlSlug);
                $scope.agthome.innerView = allagthome[0];
                $scope.agthomeoptions.active = "agthome-itinerary";
                $scope.initialiseArray();
                console.log("switch iti");
                break;
                case "tours-and-packages":
                $scope.getAgentData('tours&packages', $scope.activeUrlSlug);
                $scope.agthome.innerView = allagthome[1];
                $scope.agthomeoptions.active = "agthome-tourpackages";
                $scope.initialiseArray();
                $scope.agentScrollDown();
                console.log("switch tour");
                break;
                case "photos-and-videos":
                $scope.getPhotoVideo($scope.activeUrlSlug);
                $scope.agthome.innerView = allagthome[2];
                $scope.agthomeoptions.active = "agthome-photovideos";
                $scope.initialiseArray();
                $scope.agentScrollDown();

                console.log("switch pic");
                break;
                case "testimonials-and-reviews":
                $scope.getAgentData('testimonials&reviews', $scope.activeUrlSlug);
                $scope.agthome.innerView = allagthome[3];
                $scope.agthomeoptions.active = "agthome-testimonialreviews";
                $scope.initialiseArray();
                $scope.agentScrollDown();
                $scope.getAvgRating($scope.activeUrlSlug);
                console.log("switch revi");
                break;
                case "travel-activity":
                $scope.getTravelActivity($scope.activeUrlSlug);
                $scope.agthome.innerView = allagthome[4];
                $scope.agthomeoptions.active = "agthome-travelactivity";
                $scope.agentScrollDown();
                console.log("switch travel");
                break;
                case "lead-monitor":
                $scope.getLeads('unActioned');
                $scope.getAvgRating($scope.activeUrlSlug);
                $scope.agthome.innerView = allagthome[5];
                $scope.agthomeoptions.active = "agthome-leadmonitor";
                $scope.initialiseArray();
                $scope.agentScrollDown();
                console.log("switch lead");
                break;
                case "analytics":
                $scope.agthome.innerView = allagthome[6];
                $scope.agthomeoptions.active = "agthome-analytics";
                $scope.initialiseArray();
                $scope.agentScrollDown();
                $scope.profileview = true;
                $scope.getProfileView();
                break;
                case "about-us":
                $scope.agthome.innerView = allagthome[7];
                $scope.agthomeoptions.active = "agthome-aboutus";
                $scope.initialiseArray();
                $scope.agentScrollDown();
                console.log("switch abt");
                break;
                default:
                $scope.getAgentItinerary($scope.activeUrlSlug);
                $scope.agthome.innerView = allagthome[0];
                console.log("switch def");
                break;
            }
            $scope.getCountry();
        } else {
            $state.go("mylife", {
                urlSlug: $stateParams.urlSlug
            });
        }
    } else {
        //someone elses profile so get his/her data
        allowAccess = false;
        $.jStorage.set("activeUrlSlug", $stateParams.urlSlug);
        $scope.activeUrlSlug = $stateParams.urlSlug;
        $scope.userData.sharingUrl = "https://travelibro.com/partners/" + $scope.activeUrlSlug;
        $scope.enquire.urlSlug = $scope.activeUrlSlug;
        // $scope.isMine = false;
        NavigationService.getAgentsProfile($stateParams.urlSlug, function (data) {
            console.log(data);
            if (data.value) {
                if (data.data.type === "TravelAgent") {
                    $scope.userData = data.data;
                    if ($scope.userData.coverPhoto) {
                        console.log('test');
                        $scope.coverPhotoObj = {
                            "background-image": "url('" + adminURL + "/upload/readFile?file=" + $scope.userData.coverPhoto + "')"
                        };
                    } else {
                        $scope.coverPhotoObj = {
                            "background-image": "url('../img/popularagent/bg-agent.jpg')"
                        };
                    }
                    TemplateService.title = $scope.userData.name + " | Travel & Local Life | TraveLibro";
                    allowAccess = false;
                    switch ($state.params.name) {
                        case "itineraries":
                        $scope.getAgentItinerary($scope.activeUrlSlug);
                        $scope.agthome.innerView = allagthome[0];
                        $scope.agthomeoptions.active = "agthome-itinerary";
                        $scope.initialiseArray();
                        console.log("switch iti");
                        break;
                        case "tours-and-packages":
                        $scope.getAgentData('tours&packages', $scope.activeUrlSlug);
                        $scope.agthome.innerView = allagthome[1];
                        $scope.agthomeoptions.active = "agthome-tourpackages";
                        $scope.initialiseArray();
                        $scope.agentScrollDown();
                        console.log("switch tour");
                        break;
                        case "photos-and-videos":
                        $scope.getPhotoVideo($scope.activeUrlSlug);
                        $scope.agthome.innerView = allagthome[2];
                        $scope.agthomeoptions.active = "agthome-photovideos";
                        $scope.initialiseArray();
                        $scope.agentScrollDown();

                        console.log("switch pic");
                        break;
                        case "testimonials-and-reviews":
                        $scope.getAgentData('testimonials&reviews', $scope.activeUrlSlug);
                        $scope.agthome.innerView = allagthome[3];
                        $scope.agthomeoptions.active = "agthome-testimonialreviews";
                        $scope.initialiseArray();
                        $scope.agentScrollDown();
                        $scope.getAvgRating($scope.activeUrlSlug);
                        console.log("switch revi");
                        break;
                        case "travel-activity":
                        $scope.getTravelActivity($scope.activeUrlSlug);
                        $scope.agthome.innerView = allagthome[4];
                        $scope.agthomeoptions.active = "agthome-travelactivity";
                        $scope.agentScrollDown();
                        console.log("switch travel");
                        break;
                        case "lead-monitor":
                        $scope.getLeads('unActioned');
                        $scope.getAvgRating($scope.activeUrlSlug);
                        $scope.agthome.innerView = allagthome[5];
                        $scope.agthomeoptions.active = "agthome-leadmonitor";
                        $scope.initialiseArray();
                        $scope.agentScrollDown();
                        console.log("switch lead");
                        break;
                        case "analytics":
                        $scope.agthome.innerView = allagthome[6];
                        $scope.agthomeoptions.active = "agthome-analytics";
                        $scope.initialiseArray();
                        $scope.agentScrollDown();
                        $scope.profileview = true;
                        $scope.getProfileView();
                        break;
                        case "about-us":
                        $scope.agthome.innerView = allagthome[7];
                        $scope.agthomeoptions.active = "agthome-aboutus";
                        $scope.initialiseArray();
                        $scope.agentScrollDown();
                        console.log("switch abt");
                        break;
                        default:
                        $scope.getAgentItinerary($scope.activeUrlSlug);
                        $scope.agthome.innerView = allagthome[0];
                        console.log("switch def");
                        break;
                    }
                    $scope.getCountry();
                } else {
                    $state.go("mylife", {
                        urlSlug: $stateParams.urlSlug
                    });
                }
            } else {
                $state.go("errorpage");
            }
        }, function (data) {
            console.log(data);
        });
}
    //isMine or someoneOthers profile Ends
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

.controller('NotificationCtrl', function ($scope, TemplateService, NavigationService, $timeout, LikesAndComments, $state) {
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
                case 'userWelcome':
                notification.notifyString = '<span class="text-justify"><span class="block color-blue avenir-heavy">Welcome to TraveLibro!</span>TraveLibro lets you capture your travel journeys live, local life activities and document past journeys. It also allows you to share these activities with other travellers to inspire their wanderlust. Lastly, its a great way to archive your personal history by reliving your moments, activities and reviews.</span>'
                break;
                case 'journeyRequest':
                if (notification.userFrom.gender == 'male') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> wants to tag you in his <span class="avenir-heavy color-blue">On The Go Journey</span> - ' + '<span class="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> wants to tag you in her <span class="avenir-heavy color-blue">On The Go Journey</span> - ' + '<span class="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                }
                break;
                case 'journeyLeft':
                if (notification.userFrom.gender == 'male') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has ended his <span class="avenir-heavy color-blue">On The Go Journey</span> - ' + '<span class="avenir-heavy color-pink text-capitalize">' + notification.data.name + '</span>';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has ended her <span class="avenir-heavy color-blue">On The Go Journey</span> - ' + '<span class="avenir-heavy color-pink text-capitalize">' + notification.data.name + '</span>';
                }
                break;
                case 'postLike':
                if (notification.data.type == 'travel-life') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has liked your <span class="avenir-heavy color-blue">On The Go Activity</span>';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has liked your <span class="avenir-heavy color-blue">Local Life Activity</span>';
                }
                break;
                case 'postFirstTime':
                if (notification.data.type == 'travel-life') {
                    if (notification.userFrom.gender == 'male') {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added a post to his <span class="avenir-heavy color-blue">On The Go Activity</span>';
                    } else {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added a post to her <span class="avenir-heavy color-blue">On The Go Activity</span>';
                    }
                } else {
                    if (notification.userFrom.gender == 'male') {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added a post to his <span class="avenir-heavy color-blue"> Local Life </span> for the first time.';
                    } else {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added a post to her <span class="avenir-heavy color-blue"> Local Life </span> for the first time.';
                    }
                }
                break;
                case 'postComment':
                if (notification.data.type == 'travel-life') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has commented on your <span class="avenir-heavy color-blue">On The Go Activity</span>';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has commented on your <span class="avenir-heavy color-blue">Local Life Activity</span>';
                }
                break;
                case 'postMentionComment':
                if (notification.data.type == 'travel-life') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has mentioned you in a comment';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has mentioned you in a comment';
                }
                break;
                case 'postTag':
                if (notification.data.type == 'travel-life') {
                    if (notification.data.videos.length > 0) {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added a video of you\'ll to the <span class="avenir-heavy color-blue">On The Go Activity</span>';
                    } else if (notification.data.videos.length == 0 && notification.data.photos.length > 0) {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added photos to the <span class="avenir-heavy color-blue">On The Go Activity</span>';
                    } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn.lat !== '') {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has checked-in with you in an <span class="avenir-heavy color-blue">On The Go Activity</span>';
                    } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn.lat == '' && notification.data.thoughts !== '') {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has tagged you in thought in an <span class="avenir-heavy color-blue">On The Go Activity</span>';
                    }
                } else {
                    if (notification.data.videos.length > 0) {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added a video of you\'ll to a <span class="avenir-heavy color-blue">Local Life Activity</span>';
                    } else if (notification.data.videos.length == 0 && notification.data.photos.length > 0) {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has added photos to a <span class="avenir-heavy color-blue">Local Life Activity</span>';
                    } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn.lat !== '') {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has checked-in with you in a <span class="avenir-heavy color-blue">Local Life Activity</span>';
                    } else if (notification.data.videos.length == 0 && notification.data.photos.length == 0 && notification.data.checkIn == '' && notification.data.thoughts !== '') {
                        notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has tagged you in thought in a <span class="avenir-heavy color-blue">Local Life Activity</span>';
                    }
                }
                break;
                case 'itineraryRequest':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has tagged you in an Itinerary - ' + '<span class="avenir-heavy color-blue text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'itineraryComment':
                notification.notifyString = '<span class="color-blue avenir-heavy">' + notification.userFrom.name + '</span> has commented on the Itinerary - ' + '<span class= "color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'itineraryLike':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has liked the Itinerary - <span class ="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'itineraryMentionComment':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has mentioned you in a comment on the Ititnerary - <span class ="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'journeyComment':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has commented on the <span class="avenir-heavy color-blue">On Go Journey</span> - <span class="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'journeyLike':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has liked the <span class="avenir-heavy color-blue">On Go Journey</span> - <span class="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'journeyMentionComment':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has mentioned you in a comment on the  <span class="avenir-heavy color-blue">On Go Journey</span> - <span class="avenir-heavy color-pink text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'userFollowing':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has started following you.';
                break;
                case 'userFollowingRequest':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has requested to follow your travel and local activities.';
                break;
                case 'userFollowingResponse':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has accepted your follow request.';
                break;
                case 'photoComment':
                if (notification.data.type == 'travel-life') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has commented on a photo in your <span class="avenir-heavy color-blue">On The Go Activity</span>';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has commented on a photo in your <span class="avenir-heavy color-blue">Local Life Activity</span>';
                }
                break;
                case 'photoMentionComment':
                if (notification.data.type == 'travel-life') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has mentioned you in a comment';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has mentioned you in a comment';
                }
                break;
                case 'photoLike':
                if (notification.data.type == 'travel-life') {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has liked a photo in your <span class="avenir-heavy color-blue">On The Go Activity</span>';
                } else {
                    notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has liked a photo in your <span class= "avenir-heavy color-blue">Local Life Activity</span>';
                }
                break;
                case 'userBadge':
                notification.notifyString = 'Congratulations! You have moved from <span class="avenir-heavy color-blue">' + notification.data.from + '</span> to <span class="avenir-heavy color-blue">' + notification.data.to + '</span> . <br>Hope you enjoy your status and grow in your journeys.';
                break;
                case 'journeyAccept':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has accepted your request to join the <span class="avenir-heavy color-blue">On The Go Activity</span> -<span class ="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'journeyReject':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> has rejected your request to join the <span class="avenir-heavy color-blue">On Go Activity</span> -' + '<span class ="color-pink avenir-heavy text-capitalize">' + notification.data.name + '</span>';
                break;
                case 'agentStatusLike':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> liked your status.';
                break;
                case 'agentStatusComment':
                notification.notifyString = '<a class="avenir-heavy color-blue" href="/users/' + notification.userFrom.urlSlug + '">' + notification.userFrom.name + '</a> commented on your status.';
                break;
                default:
                break;
            }
        });
};

    //update notification status
    var updateNotificationStatus = function (not_id, callback) {
        NavigationService.updateNotificationStatus(not_id, callback);
    };
    //update notifiction status end
    // PAGINATION FOR INFINITE SCROLL
    $scope.getNotification = function (pageNo) {
        NavigationService.notificationWeb({
            pagenumber: pageNo
        }, function (data) {
            $scope.notifyScroll.busy = false;
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
            _.each(data.data, function (n) {
                n.userFrom.following = n.following;
            })
        });
    };
    $scope.getNotification($scope.pageNo);

    $scope.loadMoreNotification = function () {
        $scope.notifyScroll.busy = true;
        if ($scope.notifyScroll.stopCallingApi == false) {
            $scope.getNotification(++$scope.pageNo);
            console.log($scope.pageNo, 'pagenumber');
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
                "id": urlSlug,
                "urlSlug": notifyOb.data.urlSlug
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

    // FOLLOW UNFOLLOW USER
    $scope.followFollowing = function (user) {
        console.log("from activity");
        LikesAndComments.followUnFollow(user, function (data) {
            if (data.value) {
                user.following = data.data.responseValue;
            } else {
                console.log("error updating data");
            }
        });
    }
        // FOLLOW UNFOLLOW USER ENDS

    // ACCEPT FOLLOW REQUEST
    $scope.acceptRejectFollow = function (notifyOb, status) {
        console.log(notifyOb, "accept karo follow");
        if (status == 1) {
            NavigationService.acceptFollowRequest({
                token: notifyOb.data.token,
                answeredStatus: 'accept'
            }, function (data) {
                console.log(data, 'accept follow ans');
            });
        } else {
            NavigationService.acceptFollowRequest({
                token: notifyOb.data.token,
                answeredStatus: 'reject'
            }, function (data) {
                console.log(data, 'reject follow ans');
            });
        }
    };
    // ACCEPT FOLLOW REQUEST END

    $scope.redirectToPost = function (obj) {
        updateNotificationStatus(obj._id, function (data) {
            if (data.value) {
                $state.go('single-notification', {
                    "postId": obj.data._id,
                    "urlSlug": obj.userFrom.urlSlug
                });
            }
        });
    }

    // REDIRECT PHOTOS
    $scope.redirectPhotoPost = function (obj) {
        updateNotificationStatus(obj._id, function (data) {
            if (data.value) {
                $state.go('single-notification', {
                    "postId": obj.data.post,
                    "urlSlug": obj.userFrom.urlSlug
                });
            }
        });
    }
        // REDIRECT PHOTOS END

    // route to on go journey
    $scope.routeOngo = function (notifyOb) {
        $state.go('ongojourney', {
            'id': notifyOb.data.urlSlug,
            'urlSlug': notifyOb.userTo.urlSlug
        });
    }
        // route to on go journey end

    // route to itinerary
    $scope.routeItinerary = function (notifyOb) {
        console.log(notifyOb, 'user');
        if (notifyOb.data.type == 'quick-itinerary') {
            $state.go('userquickitinerary', {
                'id': notifyOb.data.urlSlug,
                'urlSlug': notifyOb.userTo.urlSlug
            });
        } else {
            $state.go('userdetailitinerary', {
                'id': notifyOb.data.urlSlug,
                'urlSlug': notifyOb.userTo.urlSlug
            });
        }
    }
        // route to itinerary end

    })

.controller('singleNotification', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, OnGoJourney, LikesAndComments) {
    $scope.template = TemplateService.changecontent("single-post"); //Use same name of .html file
    // $scope.menutitle = NavigationService.makeactive("single-notification"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    console.log($stateParams.postId);

    $scope.localView = {};
    $scope.localView.view = true;
    $scope.postScrollData = {};
    $scope.postScrollData.likePageNumber = 1;
    $scope.postScrollData.busy = false;
    $scope.postScrollData.stopCallingApi = false;
    $scope.postScrollData.viewList = false;
    $scope.userData = $.jStorage.get("profile");
    LikesAndComments.getOnePost($stateParams.postId, function (data) {
        if (data.value) {
            if (data.data.redirect == 'profile') {
                $state.go('mylife', {
                    'urlSlug': data.data.user.urlSlug
                });
            } else {
                console.log(data);
                $scope.post = data.data;
            }
        }
    });

    $scope.comment = {
        "text": ""
    }

    $scope.openCommentSection = function (ongo) {
        $scope.showLikeCommentCard = false;
        $scope.listOfLikes = false;
        console.log(ongo, 'ongo');
        $scope.post = ongo; //for using it in comment section
        $scope.previousId;
        $scope.postScrollData.type = ongo.type;
        $scope.postScrollData._id = ongo._id;
        var callback = function (data) {
            console.log(data);
            $scope.uniqueArr = [];
            $scope.listOfComments = data.data;
            $scope.postScrollData.viewList = true;
            $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
        }
        if ($scope.previousId != $scope.post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            $scope.getCard = "view-whole-card";
            LikesAndComments.getComments(ongo.type, $scope.post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getComments(ongo.type, $scope.post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = $scope.post._id;
        $timeout(function () {
            $scope.showLikeCommentCard = true;
        }, 1000);
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.comment.text = "";
        $scope.showLikeShow = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        $timeout(function () {
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.likePageNumber = 1;
            $scope.postScrollData.viewList = false;
        }, 100);
    };

    $scope.openLikeSection = function (ongo) {
        $scope.postScrollData.type = ongo.type;
        $scope.postScrollData._id = ongo._id;
        $scope.listOfComments = false;
        console.log(ongo);
        $scope.viewCardComment = false;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
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
            LikesAndComments.getLikes(ongo.type, ongo._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(ongo.type, ongo._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = ongo._id;
    };


})

.controller('SearchresultCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, LikesAndComments) {
    $scope.template = TemplateService.changecontent("search-result"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Search Results"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userData = $.jStorage.get("profile");
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

    setInterval(function () {
        $scope.paginationLoader = TemplateService.paginationLoader;
    }, 300);

    // search profile page
    $scope.searchProfile = function (searchObj) {
        console.log(searchObj, 'what is ');
        if (searchObj.itineraryBy == "Admin" || searchObj.itineraryBy == "TravelAgent") {
            $state.go('comingsoonpage', {
                'url': 'coming-soon'
            })
        } else if (searchObj.type === "User") {
            $state.go('mylife', {
                'urlSlug': searchObj.urlSlug
            });
        } else if (searchObj.type === "TravelAgent") {
            $state.go('agent-home-without', {
                'urlSlug': searchObj.urlSlug
            })
        }
    };
    // search profile page end
    // search itinerary
    $scope.searchIti = function (itinerary) {
        if (itinerary.itineraryBy == "TravelAgent") {
            $state.go('comingsoonpage', {
                'url': 'coming-soon'
            })
        } else {
            if (itinerary.type == 'quick-itinerary') {
                $state.go('userquickitinerary', {
                    'id': itinerary.urlSlug,
                    'urlSlug': itinerary.user.urlSlug
                });
            } else {
                $state.go('userdetailitinerary', {
                    'id': itinerary.urlSlug,
                    'urlSlug': itinerary.user.urlSlug
                });
            }
        }
    }
        // search itinerary end
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
                    userType: ["User"],
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
                case 'search-travelAgent':
                NavigationService.getSearchUserData({
                    userType: ["TravelAgent"],
                    search: searchText,
                    pagenumber: pagenumber,
                    limit: limit
                }, function (data) {
                    if (data.data.length == 0) {
                        $scope.searchScroll.stopCallingApi = true;
                    } else {
                        _.each(data.data, function (newData) {
                            $scope.viewSearchedAgent.push(newData);
                        })
                    }
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

        $scope.followFollowing = function (user) {
            console.log("from activity");
            LikesAndComments.followUnFollow(user, function (data) {
                if (data.value) {
                    user.following = data.data.responseValue;
                } else {
                    console.log("error updating data");
                }
            });
        }

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
        // $scope.pagenumber++;
        $scope.searchScroll.busy = true;
        console.log($scope.pagenumber, 'page number');
        if ($scope.searchScroll.stopCallingApi == false) {
            $scope.getSearch($scope.searchedUrl.searchText, ++$scope.pagenumber, $scope.limit, searchType);
        }
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
        $scope.viewSearchedUser = [];
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-traveller');
        break;
        case "search-travelAgent":
        $scope.searchresult.innerView = allsearchresult[5];
        $scope.searchresultoptions.active = "search-travelAgent";
        $scope.viewSearchedAgent = [];
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-travelAgent');
        break;
        case "search-itinerary":
        $scope.searchresult.innerView = allsearchresult[1];
        $scope.searchresultoptions.active = "search-itinerary";
        $scope.viewSearchedItinerary = [];
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-itinerary');
        break;
        case "search-hashtag":
        $scope.searchresult.innerView = allsearchresult[2];
        $scope.searchresultoptions.active = "search-hashtag";
        $scope.viewSearchedHashtag = [];
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-hashtag');
        break;
        case "search-country":
        $scope.searchresult.innerView = allsearchresult[3];
        $scope.searchresultoptions.active = "search-country";
        $scope.viewSearchedCountry = [];
        $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-country');
        break;
        case "search-city":
        $scope.searchresult.innerView = allsearchresult[4];
        $scope.searchresultoptions.active = "search-city";
        $scope.viewSearchedCity = [];
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
            $scope.viewSearchedUser = [];

            $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-traveller');
            break;
            case 1:
            url = "search-itinerary";
            $scope.searchresultoptions.active = "search-itinerary";
            $scope.searchresultTraveller = false;
            $scope.viewSearchedItinerary = [];

            $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-itinerary');
            break;
            case 2:
            url = "search-hashtag";
            $scope.searchresultoptions.active = "search-hashtag";
            $scope.searchresultTraveller = false;
            $scope.viewSearchedHashtag = [];

            $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-hashtag');
            break;
            case 3:
            url = "search-country";
            $scope.searchresultoptions.active = "search-country";
            $scope.searchresultTraveller = false;
            $scope.viewSearchedCountry = [];

            $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-country');
            break;
            case 4:
            url = "search-city";
            $scope.searchresultoptions.active = "search-city";
            $scope.searchresultTraveller = false;
            $scope.viewSearchedCity = [];
            $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-city');
            break;
            case 5:
            url = "search-travelAgent";
            $scope.searchresultoptions.active = "search-travelAgent";
            $scope.searchresultTraveller = false;
            $scope.viewSearchedAgent = [];
            $scope.getSearch($scope.searchedUrl.searchText, $scope.pagenumber, $scope.limit, 'search-travelAgent');
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

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        if (!($.jStorage.get("isLoggedIn"))) {
            $state.go('login');
        } else {
            shareModal = $uibModal.open({
                animation: true,
                templateUrl: "views/modal/sharing.html",
                scope: $scope
            });
        }
    }
        // sharing local life modal end
        // COMMENT LIKE SECTION FUNCTIONS
        $scope.likeUnlikeActivity = function (post) {
            console.log(post);
            post.likeDone = !post.likeDone;
            if (post.likeDone) {
                if (post.likeCount == undefined) {
                    post.likeCount = 1;
                } else {
                    post.likeCount = post.likeCount + 1;
                }
                LikesAndComments.likeUnlike(post.type, "like", post.uniqueId, post._id, null)
            } else {
                post.likeCount = post.likeCount - 1;
                LikesAndComments.likeUnlike(post.type, "unlike", post.uniqueId, post._id, null)
            }
        };

        $scope.getLikes = function (post) {
            console.log(post);
            LikesAndComments.getLikes(post.type, post._id, 1, function (data) {
                $scope.listOfLikes = data.data;
                console.log($scope.listOfLikes);
            });
        };

        $scope.listLikesDropDown = function (model) {
            $timeout(function () {
                model.backgroundClick = true;
                backgroundClick.object = model;
            }, 200);
            backgroundClick.scope = $scope;
        };
        $scope.postScrollData = {};
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        $scope.postScrollData.viewList = false;
        $scope.getCommentsData = function (post) {
            console.log(post);
            $scope.previousId;
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.post = post;
            $scope.comment = {
                "text": ""
            }
            $scope.postScrollData.type = post.type;
            $scope.postScrollData._id = post._id;
            var callback = function (data) {
                $scope.uniqueArr = [];
                $scope.listOfComments = data.data;
                $scope.postScrollData.viewList = true;
                console.log($scope.listOfComments);

                $scope.uniqueArr = _.uniqBy($scope.listOfComments.comment, 'user._id');
            }
            if ($scope.previousId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfComments = [];
            $scope.viewCardComment = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.getCard = "view-whole-card";
            // LikesAndComments.getComments(post.likeUnlikeFlag, post._id, callback);
            LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                // LikesAndComments.getComments(post.likeUnlikeFlag, post._id, callback);
                LikesAndComments.getComments(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousId = post._id;
    };

    $scope.getLikesData = function (post) {
        $scope.postScrollData.type = post.type;
        $scope.postScrollData._id = post._id;
        var callback = function (data) {
            $scope.postScrollData.viewList = true;
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        };
        console.log($scope.post);
        if ($scope.previousLikeId != post._id) {
            // $scope.focus('enterComment');
            $scope.listOfLikes = [];
            $scope.viewCardLike = true;
            // $scope.journey.journeyHighLight = activity._id;
            $scope.showLikeShow = "show-like-side-sec";
            LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
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
                LikesAndComments.getLikes(post.type, post._id, $scope.postScrollData.likePageNumber, callback);
            }
        }
        $scope.previousLikeId = post._id;
    };

    $scope.closeBackDrop = function () {
        $scope.viewCardComment = false;
        $scope.viewCardLike = false;
        $scope.getCard = "";
        $scope.listOfLikes = [];
        $scope.listOfComments = [];
        $scope.postScrollData.likePageNumber = 1;
        $scope.postScrollData.busy = false;
        $scope.postScrollData.stopCallingApi = false;
        console.log($scope.postScrollData, 'post scroll data');
        $timeout(function () {
            $scope.postScrollData.likePageNumber = 1;
            $scope.listOfLikes = [];
            $scope.listOfComments = [];
            $scope.postScrollData.busy = false;
            $scope.postScrollData.stopCallingApi = false;
            $scope.postScrollData.viewList = false;
            console.log($scope.postScrollData, 'console wla post scroll data');
        }, 100);
    };

    // COMMENT LIKE SECTION FUNCTIONS END

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

.controller('PartnerLoginCtrl', function ($scope, $controller, TemplateService, NavigationService, $timeout, $state) {
    $controller('LoginCtrl', {
        $scope: $scope
    });
    $scope.template = TemplateService.changecontent("partner-login"); //Use same name of .html file
    $scope.menutitle = NavigationService.makeactive("Partner Login"); //This is the Title of the Website
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.reset = function (form) {
        $scope.showError.show = false;
        $scope.agentLoginForm = {};
        $scope.agentLoginForm.email = "";
        $scope.agentSignUpForm = {};
        $scope.agentSignUpForm.email = "";
    };
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
        console.log(ref);
        if (ref.closed) {
            $interval.cancel(stopinterval);
        } else {
            if (data.data.provider && data.data.provider !== "") {
                $interval.cancel(stopinterval);
                ref.close();
                $.jStorage.set("isLoggedIn", true);
                $.jStorage.set("profile", data.data);
                $.jStorage.set("qualifiedForLoginFlow", null);
                var alreadyLoggedIn = data.data.alreadyLoggedIn;
                if (alreadyLoggedIn === true) {
                    var slug = $.jStorage.get("activeUrlSlug");
                    console.log(slug);
                    if (slug === null || slug === "") {
                        slug = $.jStorage.get("profile").urlSlug;
                    }
                    if ($.jStorage.get("url") && $.jStorage.get("url") !== "") {
                        window.location = $.jStorage.get("url") + "?accessToken=" + $.jStorage.get("accessToken");
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
        }
    }


    var callAtIntervaltwitter = function () {
        NavigationService.getProfile("", checktwitter, function (err) {
            console.log(err);
        });
    };

    var authenticatesuccess = function (stopinterval) {
        console.log("login window closed");
        $ionicLoading.hide();
        $interval.cancel(stopinterval);
    };

    $scope.socialLogin = function (loginTo) {
        var userId = $.jStorage.get("oldUserData")._id;
        ref = window.open(adminURL + "/user/" + loginTo + "OldUser?userId=" + userId, '_blank', 'location=no');
        console.log(ref);
        stopinterval = $interval(callAtIntervaltwitter, 2000);
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

.controller('photoCommentModalCtrl', function ($scope, $uibModalInstance, LikesAndComments, $timeout) {
    $scope.index = -1;
    $scope.indexDelete = -1;
    $timeout(function(){
        $('#notifyFocus').focus();
    },100);
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
    $scope.editBox = function (index) {
        if ($scope.index == index) {
            $scope.index = -1;
        } else {
            $scope.index = index;
        }
    };
    $scope.showDeletePop = function (indexDelete) {
        if ($scope.indexDelete == indexDelete) {
            $scope.indexDelete = -1;
        } else {
            $scope.indexDelete = indexDelete;
        }
    };
    // edit comment
    $scope.editComment = function (commentId, commentText, commentType) {
        console.log($scope.listOfComments.comment, 'comment ka arrray');
        LikesAndComments.commentEdit(commentId, commentText, commentType, function (data) {
            if (data.value == true) {
                var commentedIndex = _.findIndex($scope.listOfComments.comment, function (commentData) {
                    return commentData._id == commentId;
                });
                $scope.listOfComments.comment[commentedIndex].text = commentText;
                $scope.index = -1;
            }
        })
    }
        // edit comment end
        // delete comment
        $scope.deleteComment = function (commentId, commentType) {
            console.log($scope.listOfComments, 'lof');
            console.log(commentId, 'id');
            LikesAndComments.commentDelete(commentId, commentType, function (data) {
                if (data.value == true) {
                    _.remove($scope.listOfComments.comment, function (list) {
                        return list._id == commentId;
                    })
                    console.log($scope.listOfComments.comment, 'total nikla kya');
                }
            });
        };
    // delete comment end

    $scope.postPhotosComment = function (uniqueId, comment, postId, photoId) {
        console.log(uniqueId, comment, postId, photoId);
        var type = "photo";
        var hashTag = [];
        var callback = function (data) {
            $scope.listOfComments.comment = data.data.comment;
            document.getElementById('enterComment').value = "";
            $scope.listOfComments.pageNo = 1;
            $scope.listOfComments.scrollBusy = false;
            $scope.listOfComments.stopCallingApi = false;
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
    },

    
    $scope.keyPress=function(e){
        console.log(e);
        if(e.keyCode === 37){
            $scope.prevPhotoSlide($scope.allPhotos);
        }else if(e.keyCode === 39){
            $scope.nextPhotoSlide($scope.allPhotos);
        }
    }

        // photo likes
        $scope.getLikes = function (id) {
            LikesAndComments.getLikes('photo', id, 1, function (data) {
                $scope.listOfLikes = data.data;
                console.log($scope.listOfLikes);
            });
        };
        $scope.editOption = function (model) {
            $timeout(function () {
                model.backgroundClick = true;
                backgroundClick.object = model;
            }, 200);
            backgroundClick.scope = $scope;
        };
    // photo likes end
})

.controller('reviewPostModalCtrl', function ($scope, $uibModalInstance, LikesAndComments, $timeout) {
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
            $scope.postReview = _.cloneDeep(post.review[0]);
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
})

.controller('commentLikeSectionCtrl', function ($scope, $timeout, $uibModal, LikesAndComments) {
    $scope.index = -1;
    $scope.indexDelete = -1;
    $scope.likePost = function (uniqueId, _id) {
        console.log($scope.post.likeDone + "this call is from directive");
        $scope.post.likeDone = !$scope.post.likeDone;
        if ($scope.post.likeDone) {
            if ($scope.post.likeCount === undefined) {
                $scope.post.likeCount = 1;
            } else {
                $scope.post.likeCount = $scope.post.likeCount + 1;
            }
            LikesAndComments.likeUnlike($scope.post.type, "like", uniqueId, _id, null);
        } else {
            $scope.post.likeCount = $scope.post.likeCount - 1;
            LikesAndComments.likeUnlike($scope.post.type, "unlike", uniqueId, _id, null);
        }
    };

    $scope.postPostsComment = function (uniqueId, comment, postId, type) {
        console.log(uniqueId, comment, postId, type);
        console.log("controller se comment hua");
        var additionalId = null;
        var hashTag = [];
        var callback = function (data) {
            $scope.listOfComments = data.data;
            document.getElementById('enterComment').value = "";
        };
        LikesAndComments.postComment(type, uniqueId, postId, comment, hashTag, additionalId, callback);
    };



    $scope.editOption = function (model) {
        $timeout(function () {
            model.backgroundClick = true;
            backgroundClick.object = model;
        }, 200);
        backgroundClick.scope = $scope;
    };

    $scope.getLikes = function (activity) {
        console.log(activity);
        $scope.listOfLikes = [];
        LikesAndComments.getLikes(activity.type, activity._id, 1, function (data) {
            $scope.listOfLikes = data.data;
            console.log($scope.listOfLikes);
        });
    };
    // $scope.scrollLike = {
    //     busy: false,
    //     stopCallingApi: false
    // }
    if ($scope.listOfLikes && $scope.listOfLikes.like && $scope.listOfLikes.like.length > 0) {
        $scope.getMoreLikes = function () {
            console.log('scroll huwa kya');
            $scope.postScrollData.busy = true;
            var callback = function (data) {
                $scope.postScrollData.viewList = false;
                $scope.postScrollData.busy = false;
                if (data.data.like.length === 0) {
                    $scope.postScrollData.stopCallingApi = true;
                    $scope.postScrollData.viewList = true;
                } else {
                    _.each(data.data.like, function (likeList) {
                        $scope.listOfLikes.like.push(likeList);
                        console.log($scope.listOfLikes, 'last controller');
                    });
                    console.log($scope.listOfLikes.like, 'like');
                    $scope.postScrollData.viewList = true;
                }
            }
                // if($scope.listOfLikes && $scope.listOfLikes.like.length > 0){
                //   if($scope.postScrollData.stopCallingApi == false){
                //     $scope.postScrollData.likePageNumber++;
                //     console.log($scope.postScrollData.likePageNumber,'the page number');
                //     LikesAndComments.getLikes($scope.postScrollData.type, $scope.postScrollData._id, $scope.postScrollData.likePageNumber, callback);
                //   }
                // }
                if ($scope.postScrollData.stopCallingApi == false) {
                    $scope.postScrollData.likePageNumber++;
                    console.log($scope.postScrollData.likePageNumber, 'the page number');
                    LikesAndComments.getLikes($scope.postScrollData.type, $scope.postScrollData._id, $scope.postScrollData.likePageNumber, callback);
                }
            };
        }

        $scope.followFollowing = function (user) {
            console.log("from ongojourney");
            LikesAndComments.followUnFollow(user, function (data) {
                if (data.value) {
                    user.following = data.data.responseValue;
                } else {
                    console.log("error updating data");
                }
            });
        };

        $scope.editBox = function (index) {
            if ($scope.index == index) {
                $scope.index = -1;
            } else {
                $scope.index = index;
            }
        };
        $scope.showDeletePop = function (indexDelete) {
            if ($scope.indexDelete == indexDelete) {
                $scope.indexDelete = -1;
            } else {
                $scope.indexDelete = indexDelete;
            }
        };
    // get more comments
    if ($scope.listOfComments && $scope.listOfComments.comment && $scope.listOfComments.comment.length > 0) {
        $scope.getCommentsMore = function () {
            console.log($scope.postScrollData, 'first scroll ka value kya hai');
            $scope.postScrollData.busy = true;
            var callbackComment = function (data) {
                console.log(data, 'data', $scope.postScrollData, 'post scroll data');
                $scope.postScrollData.viewList = false;
                $scope.postScrollData.busy = false;
                if (data.data.comment.length === 0) {
                    $scope.postScrollData.stopCallingApi = true;
                    $scope.postScrollData.viewList = true;
                } else {
                    _.each(data.data.comment, function (commentList) {
                        $scope.listOfComments.comment.push(commentList);
                    });
                    $scope.postScrollData.viewList = true;
                }
            }
            if ($scope.postScrollData.stopCallingApi == false) {
                $scope.postScrollData.likePageNumber++;
                console.log($scope.postScrollData, 'post scroll data');
                LikesAndComments.getComments($scope.postScrollData.type, $scope.postScrollData._id, $scope.postScrollData.likePageNumber, callbackComment);
            }
        }
    }
    // get more comments end
    // edit comment
    $scope.editComment = function (commentId, commentText, commentType) {
        console.log($scope.listOfComments.comment, 'comment ka arrray');
        LikesAndComments.commentEdit(commentId, commentText, commentType, function (data) {
            if (data.value == true) {
                var commentedIndex = _.findIndex($scope.listOfComments.comment, function (commentData) {
                    return commentData._id == commentId;
                });
                $scope.listOfComments.comment[commentedIndex].text = commentText;
                $scope.index = -1;
            }
        })
    }
        // edit comment end
        // delete comment
        $scope.deleteComment = function (commentId, commentType) {
            console.log($scope.listOfComments, 'lof');
            console.log(commentId, 'id');
            LikesAndComments.commentDelete(commentId, commentType, function (data) {
                if (data.value == true) {
                    _.remove($scope.listOfComments.comment, function (list) {
                        return list._id == commentId;
                    })
                    $scope.indexDelete = -1;
                    console.log($scope.listOfComments.comment, 'total nikla kya');
                }
            });
        };
    // delete comment end

    // sharing local life modal
    var shareModal = "";
    $scope.sharePost = function (url) {
        $scope.shareUrl = url;
        console.log($scope.shareUrl, 'share ka url');
        shareModal = $uibModal.open({
            animation: true,
            templateUrl: "views/modal/sharing.html",
            scope: $scope
        });
    }
        // sharing local life modal end

    });
