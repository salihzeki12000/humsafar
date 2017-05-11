var templateservicemod = angular.module('templateservicemod', []);
templateservicemod.service('TemplateService', function ($http, $state) {

  console.log("Initialize OneSignal");
  var OneSignal = window.OneSignal || [];
  OneSignal.push(["init", {
    appId: "bf8baf0a-dcfb-4a30-a0c1-ee67cae2feb1", //libros
    // appId: "34d28a83-b284-4cee-8069-585c1342b8855", //testing
    autoRegister: false,
    notificationClickHandlerMatch: 'origin',
    // notificationClickHandlerAction: 'focus',
    // path: "js/",
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
  OneSignal.push(function () {
    OneSignal.setDefaultNotificationUrl("https://travelibro.wohlig.com");
    // OneSignal.addListenerForNotificationOpened(function (data) {
    //   console.log("Received NotificationOpened:");
    //   console.log(data);
    // });
    OneSignal.on('customPromptClick', function (permissionChange) {
      var promptClickResult = permissionChange.result;
      console.log('Fullscreen Permission Message click result:', promptClickResult);
      if (promptClickResult == 'granted') {
        OneSignal.setSubscription(true);
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
      } else if (promptClickResult == 'denied' || promptClickResult == 'default') {
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

    OneSignal.on('notificationPermissionChange', function (permissionChange) {
      console.log("The user's subscription state is now:", permissionChange.to);
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
      } else if (permissionChange.to == 'denied' || permissionChange.to == 'default') {
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

    var notificationListener = function () {
      OneSignal.addListenerForNotificationOpened(function (data) {
        alert();
        notificationListener();
        console.log("Received NotificationOpened:");
        console.log(data);
        switch (data.data.type) {
          case 'journeyRequest':
          case 'journeyLeft':
          case 'userBadge':
          case 'journeyAccept':
          case 'journeyReject':
          case 'userFollowing':
          case 'userFollowingRequest':
          case 'userFollowingResponse':
          case 'itineraryRequest':
            $state.go('notification');
            break;
          case 'postLike':
          case 'photoLike':
          case 'postFirstTime':
          case 'postComment':
          case 'postMentionComment':
          case 'postTag':
            $state.go('single-notification', {
              'urlSlug': data.data.userFrom.urlSlug,
              'postId': data.data.data._id
            })
            break;
          case 'itineraryComment':
          case 'itineraryLike':
          case 'itineraryMentionComment':
            $state.go('userquickitinerary', {
              'urlSlug': data.data.userTo.urlSlug,
              'id': data.data.data.urlSlug
            })
            break;
          case 'journeyComment':
          case 'journeyLike':
          case 'journeyMentionComment':
            $state.go('ongojourney', {
              'urlSlug': data.data.userTo.urlSlug,
              'id': data.data.data.urlSlug
            })
            break;
          case 'photoComment':
          case 'photoMentionComment':
            $state.go('single-notification', {
              'urlSlug': data.data.userFrom.urlSlug,
              'postId': data.data.data.post
            })
            break;
          default:
            break;

        }
      });

    }
    notificationListener();

    OneSignal.on('notificationDisplay', function (event) {
      console.warn('OneSignal notification displayed:', event.data);
    });

  });


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
          OneSignal.setSubscription(true);

          // OneSignal.registerForPushNotifications({
          //   modalPrompt: true
          // });


        } else {
          OneSignal.getNotificationPermission(function (permission) {
            if (permission == 'default' || permission == "granted") {
              OneSignal.setSubscription(true);
              // OneSignal.showHttpPrompt();
              OneSignal.registerForPushNotifications({
                modalPrompt: true
              });
              OneSignal.showHttpPermissionRequest();
              // event.preventDefault();
            } else if (permission == "granted") {
              console.log("Inside Granted");
            } else if (permission == "denied") {
              console.log("Inside Denied");
            }
          });
        }
      });
    });
  } else {

  }

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
