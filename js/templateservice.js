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
            exampleNotificationMessage: 'Capture | Inspire | Relive',
            /* Text below example notification, limited to 50 characters */
            // exampleNotificationCaption: false,
            /* Accept button text, limited to 15 characters */
            acceptButtonText: "ALLOW",
            /* Cancel button text, limited to 15 characters */
            cancelButtonText: "NO THANKS"
        }
    }]);
    OneSignal.push(function () {
        OneSignal.on('customPromptClick', function (permissionChange) {
            var promptClickResult = permissionChange.result;
            if (promptClickResult == 'granted') {
                OneSignal.setSubscription(true);
                $http({
                    "url": adminURL + "/user/updatePermission",
                    "method": "POST",
                    "data": {
                        'accessToken': $.jStorage.get("accessToken"),
                        'notificationPermission': "granted"
                    }
                });
                OneSignal.getUserId(function (data) {
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
                $http({
                    "url": adminURL + "/user/updatePermission",
                    "method": "POST",
                    "data": {
                        'accessToken': $.jStorage.get("accessToken"),
                        'notificationPermission': "denied"
                    }
                });
                OneSignal.getUserId(function (data) {
                    $http({
                        "url": adminURL + "/user/updateDeviceId",
                        "method": "POST",
                        "data": {
                            'accessToken': $.jStorage.get("accessToken"),
                            'deviceId': data,
                            'remove': true
                        }
                    });
                });
            }
        });

        OneSignal.on('notificationPermissionChange', function (permissionChange) {
            if (permissionChange.to == 'default') {
                $http({
                    "url": adminURL + "/user/updatePermission",
                    "method": "POST",
                    "data": {
                        'accessToken': $.jStorage.get("accessToken"),
                        'notificationPermission': "default"
                    }
                });
            } else if (permissionChange.to == 'granted') {
                OneSignal.setSubscription(true);
                $http({
                    "url": adminURL + "/user/updatePermission",
                    "method": "POST",
                    "data": {
                        'accessToken': $.jStorage.get("accessToken"),
                        'notificationPermission': "granted"
                    }
                });
                OneSignal.getUserId(function (data) {
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
                $http({
                    "url": adminURL + "/user/updatePermission",
                    "method": "POST",
                    "data": {
                        'accessToken': $.jStorage.get("accessToken"),
                        'notificationPermission': "denied"
                    }
                });
                OneSignal.getUserId(function (data) {
                    $http({
                        "url": adminURL + "/user/updateDeviceId",
                        "method": "POST",
                        "data": {
                            'accessToken': $.jStorage.get("accessToken"),
                            'deviceId': data,
                            'remove': true
                        }
                    });
                });
            }
        });

        var notificationListener = function () {
            // alert();
            OneSignal.addListenerForNotificationOpened(function (data) {
                console.log("Received NotificationOpened:");
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
                notificationListener();
            });
        }
        notificationListener();

        OneSignal.on('notificationDisplay', function (event) {});

    });


    if ($.jStorage.get("isLoggedIn") && $.jStorage.get('profile') && $.jStorage.get('profile').alreadyLoggedIn) {
        console.log("Initializing OneSignal");
        OneSignal.push(function () {
            if (!OneSignal.isPushNotificationsSupported()) {
                return;
            }
            OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                if (isEnabled) {
                    OneSignal.setSubscription(true);
                } else {
                    console.log($.jStorage.get('profile').notificationPermission,'hw');
                    if ($.jStorage.get('profile').notificationPermission === "default") {
                        OneSignal.registerForPushNotifications({
                            modalPrompt: true
                        });
                        OneSignal.showHttpPermissionRequest();
                    }
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
    this.uploadLoader = false;

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
        if (page != "home") {
            $("body > .loaders").remove();
            $("body > .loadedContent").fadeIn(1000);
        }
        this.init();
        var data = this;
        data.content = "views/content/" + page + ".html";
        return data;

    };

    this.init();

});
