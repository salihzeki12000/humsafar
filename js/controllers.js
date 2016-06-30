angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ngImgCrop'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file

  // console.log("Testing Consoles");

  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

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
  },
   {
    img: "img/flag.png",
    name: "Antigua and Barbuda"
  },
   {
    img: "img/flag.png",
    name: "Argentina"
  },
   {
    img: "img/flag.png",
    name: "Armenia"
  },
   {
    img: "img/flag.png",
    name: "Australia"
  },
   {
    img: "img/flag.png",
    name: "Austria"
  }
];
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
.controller('ProfileCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file

  // console.log("Testing Consoles");

  $scope.template = TemplateService.changecontent("profile");
  $scope.menutitle = NavigationService.makeactive("Profile");
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


})

;
