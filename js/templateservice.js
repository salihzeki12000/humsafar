var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function ($http) {

  var OneSignal = window.OneSignal || [];
  OneSignal.push(["init", {
    appId: "bf8baf0a-dcfb-4a30-a0c1-ee67cae2feb1", //libros
    // appId: "34d28a83-b284-4cee-8069-585c1342b8855", //testing
    autoRegister: false,
    notificationClickHandlerAction: 'focus',
    // path: "js/",
    // notifyButton: {
    //   enable: true /* Set to false to hide */
    // },
    persistNotification: false,
    allowLocalhostAsSecureOrigin: true,
    promptOptions: {
      /* Change bold title, limited to 30 characters */
      siteName: 'TraveLibro',
      /* Subtitle, limited to 90 characters */
      actionMessage: "We'd like to show you notifications for the latest news and updates.",
      /* Example notification title */
      exampleNotificationTitle: 'TraveLibro',
      /* Example notification message */
      exampleNotificationMessage: 'This is an example notification',
      /* Text below example notification, limited to 50 characters */
      // exampleNotificationCaption: false,
      /* Accept button text, limited to 15 characters */
      acceptButtonText: "ALLOW",
      /* Cancel button text, limited to 15 characters */
      cancelButtonText: "NO THANKS"
    }

  }]);
  console.log($.jStorage.get("isLoggedIn") && $.jStorage.get('profile').alreadyLoggedIn);
  if ($.jStorage.get("isLoggedIn") && $.jStorage.get('profile').alreadyLoggedIn) {
    console.log("initializing OneSignal");

    OneSignal.push(function () {
      // If we're on an unsupported browser, do nothing
      if (!OneSignal.isPushNotificationsSupported()) {
        return;
      }
      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled) {
          // The user is subscribed to notifications
          // Don't show anything
        } else {
          OneSignal.getNotificationPermission(function (permission) {
            console.log("Site Notification Permission", permission);
            if (permission == 'default') {
              OneSignal.setSubscription(true);
              // OneSignal.showHttpPrompt();
              OneSignal.registerForPushNotifications({
                modalPrompt: true
              });
              OneSignal.showHttpPermissionRequest();
              // event.preventDefault();
            }
          });
        }
      });
    });

    OneSignal.on('customPromptClick', function (permissionChange) {
      var promptClickResult = permissionChange.result;
      console.log('Fullscreen Permission Message click result:', promptClickResult);
      if (promptClickResult == 'granted') {
        // OneSignal.setSubscription(true);
        // OneSignal.registerForPushNotifications();
        // OneSignal.getUserId(function (data) {
        //   console.log(data);
        //   $http({
        //     "url": "https://onesignal.com/api/v1/players",
        //     "method": "POST",
        //     "data": {
        //       'app_id': data,
        //       'device_type': 4
        //     }
        //   }).success(function (data) {
        //     console.log(data);
        //   });
        // });
      }
    });

    OneSignal.on('notificationPermissionChange', function (permissionChange) {
      console.log(permissionChange.to);
      if (permissionChange.to == 'granted') {
        // OneSignal.setSubscription(true);
        // OneSignal.registerForPushNotifications();
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
      } else if (permissionChange.to == 'denied') {
        OneSignal.setSubscription(false);
        OneSignal.getUserId(function (data) {
          console.log(data);
          $http({
            "url": adminURL + "/user/updateDeviceId",
            "method": "POST",
            "data": {
              'accessToken': $.jStorage.get("accessToken"),
              'deviceId': data,
              'remove': true
            }
          });
          // NavigationService.disablePushNotification(data);
        });
      }
    });

    OneSignal.on('subscriptionChange', function (isSubscribed) {
      console.log("The user's subscription state is now:", isSubscribed);
      if (isSubscribed) {
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
      }
    });

    OneSignal.on('notificationDismiss', function (event) {
      console.warn('OneSignal notification dismissed:', event);
      /*
      {
          "id": "ce31de29-e1b0-4961-99ee-080644677cd7",
          "heading": "OneSignal Test Message",
          "content": "This is an example notification.",
          "url": "https://onesignal.com?_osp=do_not_open",
          "icon": "https://onesignal.com/images/notification_logo.png"
      }
      */
    });

    OneSignal.push(["addListenerForNotificationOpened", function (data) {
      alert();
      console.log("Received NotificationOpened:");
      console.log(data);
    }]);
  } else {

  }
  // OneSignal.push(function () {
  // OneSignal.setSubscription(true);
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
