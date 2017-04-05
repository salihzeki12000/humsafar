var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function ($http) {


  var OneSignal = window.OneSignal || [];
  OneSignal.push(["init", {
    //   appId: "bf8baf0a-dcfb-4a30-a0c1-ee67cae2feb1", //libros
    appId: "34d28a83-b284-4cee-8069-585c1342b885", //testing
    autoRegister: false,
    // path: "js/pushfication",
    // notifyButton: {
    //   enable: true /* Set to false to hide */
    // },
    persistNotification: false,
    allowLocalhostAsSecureOrigin: true
  }]);

  if ($.jStorage.get("isLoggedIn") && $.jStorage.get('profile').alreadyLoggedIn) {
    OneSignal.on('notificationPermissionChange', function (permissionChange) {
      console.log(permissionChange.to);
      if (permissionChange.to == 'granted') {
        OneSignal.setSubscription(true);
        OneSignal.registerForPushNotifications();
        OneSignal.getUserId(function (data) {
          console.log(data);
          $http({
            "url": adminURL + "/user/updateDeviceId",
            "method": "POST",
            "data": {
              'accessToken': $.jStorage.get("accessToken"),
              'deviceId': data
            }
          });
        });
      } else {
        OneSignal.setSubscription(false);
      }
    });
    OneSignal.on('subscriptionChange', function (isSubscribed) {
      console.log("The user's subscription state is now:", isSubscribed);
    });
    // OneSignal.isPushNotificationsEnabled(function (isEnabled) {
    //   if (isEnabled) {
    //     alert("Push notifications are enabled!");
    //   } else
    //     alert("Push notifications are not enabled yet.");
    //   OneSignal.showHttpPrompt();
    // });
  } else {

  }
  // OneSignal.push(function () {
  //   OneSignal.setSubscription(true);
  //   OneSignal.registerForPushNotifications();
  // OneSignal.showHttpPrompt();
  // OneSignal.getUserId(function (data) {
  //   console.log(data);
  // });
  // OneSignal.log.setLevel('trace');
  // console.log(OneSignal.isPushNotificationsEnabled());
  // });

  // this.title = "Home";
  this.meta = "Google";
  this.metadesc = "Home";
  this.searchHeaderLoad = false;
  this.searchLoader = false;
  this.paginationLoader = false;
  this.allLoader = false;
  this.isMine = false;

  var d = new Date();
  this.year = d.getFullYear();

  this.init = function () {
    this.headermenu = "views/headermenu.html";
    this.header = "views/header.html";
    this.menu = "views/menu.html";
    this.slider = "views/slider.html";
    this.content = "views/content/content.html";
    this.footermenu = "views/footermenu.html";
    this.footer = "views/footer.html";
  };

  this.changecontent = function (page) {
    this.init();
    var data = this;
    data.content = "views/content/" + page + ".html";
    return data;
  };

  this.init();

});
