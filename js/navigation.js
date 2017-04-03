var adminURL = "";
var allowAccess = "";
adminURL = "https://travelibro.wohlig.com/api";

var imgurl = adminURL + "/upload/";
var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
var navigationservice = angular.module('navigationservice', [])

  .factory('NavigationService', function ($http, TravelibroService) {
    var navigation = [{
      name: "Home",
      classis: "active",
      disabled: true,
      anchor: "home",
    }, {
      name: "Destinations",
      classis: "active",
      disabled: true,
      anchor: "destination",
    }, {
      name: "Popular Journeys",
      classis: "active",
      disabled: true,
      anchor: "popularjourney",
    }, {
      name: "Popular Bloggers",
      classis: "active",
      disabled: true,
      anchor: "popularblogger",
    }, {
      name: "Popular Agents",
      classis: "active",
      disabled: true,
      anchor: "popularagent",
    }, {
      name: "Popular Itineraries",
      classis: "active",
      disabled: true,
      anchor: "popularitinerary",
    }, {
      name: "Bookings",
      classis: "active",
      disabled: false,
      subnav: [{
        name: "Flights",
        classis: "active",
        link: "http://flights.travelibro.com/en-GB/flights/#/result?originplace=&destinationplace=",
        target: "_blank"
      }, {
        name: "Hotels",
        classis: "active",
        link: "https://travelibro.com/bookings/hotels",
        target: "_self"
      }, {
        name: "Vacation Rentals",
        classis: "active",
        link: "https://travelibro.com/bookings/vacation-rentals",
        target: "_self"
      }, {
        name: "Homestays",
        classis: "active",
        link: "https://travelibro.com/bookings/home-stays",
        target: "_self"
      }, {
        name: "Car Rentals",
        classis: "active",
        link: "http://flights.travelibro.com/en-GB/carhire/#/result?originplace=&destinationplace=",
        target: "_blank"
      }, {
        name: "Tours & Excursions",
        classis: "active",
        link: "https://travelibro.com/bookings/tours-and-excursions",
        target: "_self"
      }]
    }, {
      name: "Blogs",
      classis: "active",
      disabled: true,
      linkAccess: true,
      link: "https://travelibro.com/blog",
    }, {
      name: "About Us",
      classis: "active",
      disabled: false,
      subnav: [{
        name: "About TraveLibro",
        classis: "active",
        anchor: "about"
      }, {
        name: "Advertise With Us",
        classis: "active",
        anchor: "advertise"
      }, {
        name: "Contact Us",
        classis: "active",
        anchor: "contact",
      }, {
        name: "Terms & Conditions",
        classis: "active",
        anchor: "termscondition"
      }, {
        name: "Privacy Policy",
        classis: "active",
        anchor: "privacypolicy"
      }]
    }];

    var returnVal = {
      getnav: function () {
        return navigation;
      },
      makeactive: function (menuname) {
        for (var i = 0; i < navigation.length; i++) {
          if (navigation[i].name == menuname) {
            navigation[i].classis = "active";
          } else {
            navigation[i].classis = "";
          }
        }
        return menuname;
      },
      getAccessToken: function (callback, errCallback) {
        return TravelibroService.http({
          url: adminURL + "/user/profile",
          method: "POST"
        }, true).success(callback).error(errCallback);
      },
      getProfile: function (slug, callback, errCallback) {
        console.log(slug);
        return TravelibroService.http({
          url: adminURL + "/user/getOneDataWeb",
          data: {
            'urlSlug': slug
          },
          method: "POST"
        }, true).success(callback).error(errCallback);
      },
      getOthersProfile: function (slug, callback, errCallback) {
        TravelibroService.http({
          url: adminURL + "/user/getOneDataWeb",
          data: {
            'urlSlug': slug
          },
          method: "POST"
        }, true).success(callback).error(errCallback);
      },
      logout: function (callback, errCallback) {
        return TravelibroService.http({
          url: adminURL + "/user/logout",
          method: "POST"
        }).success(callback).error(errCallback);
      },
      getAllCountries: function (callback, errCallback) {
        return TravelibroService.http({
          url: adminURL + "/country/getAll",
          method: "POST"
        }).success(callback).error(errCallback);
      },
      getAllCities: function (formData, callback, errCallback) {
        TravelibroService.post(adminURL + "/city/locationSearch", formData).success(callback).error(errCallback);
      },
      searchCityByCountry: function (formData, callback) {
        var arr = {};
        console.log(formData);
        arr = _.omit(formData, ['cityVisited']);
        console.log(arr);

        TravelibroService.http({
          url: adminURL + "/city/searchCity",
          data: formData,
          method: "POST"
        }).success(callback).error(function (data) {
          console.log(data);
        });
      },
      saveUserData: function (formData, callback, errorCallback) {
        var data = _.cloneDeep(formData);
        console.log(data);
        TravelibroService.post(adminURL + "/user/editUserWeb", data).success(callback).error(errorCallback);
      },
      travelCount: function (formData, callback, errorCallback) {
        TravelibroService.post(adminURL + "/user/getOneDataWeb", formData, true).success(callback).error(errorCallback);
      },
      getBucketListWeb: function (callback, errorCallback) {
        TravelibroService.post(adminURL + "/user/getBucketListWeb").success(callback).error(errorCallback);
      },
      updateCountriesVisitedWeb: function (formData, callback, errCallback) {
        TravelibroService.post(adminURL + "/user/updateCountriesVisitedWeb", formData).success(callback).error(errCallback);
      },
      getSearchData: function (formData, callback) {
        TravelibroService.post(adminURL + "/country/getSearchDataWeb", formData, 'searchHeaderLoad').success(callback).error(function (data) {
          console.log(data);
        });
      },
      getSearchCityData: function (formData, callback) {
        TravelibroService.post(adminURL + "/city/getCity", formData, 'paginationLoad').success(callback).error(function (data) {
          console.log(data);
        });
      },
      getSearchCountryData: function (formData, callback) {
        TravelibroService.post(adminURL + "/country/getCountry", formData, 'paginationLoad').success(callback).error(function (data) {
          console.log(data);
        });
      },
      getSearchItineraryData: function (formData, callback) {
        TravelibroService.post(adminURL + "/itinerary/getItineraryWeb", formData, 'paginationLoad').success(callback).error(function (data) {
          console.log(data);
        });
      },
      getSearchHashData: function (formData, callback) {
        TravelibroService.post(adminURL + "/post/getHashDataWeb", formData, 'paginationLoad').success(callback).error(function (data) {
          console.log(data);
        });
      },
      getSearchUserData: function (formData, callback) {
        TravelibroService.post(adminURL + "/user/getUserWeb", formData, 'paginationLoad').success(callback).error(function (data) {
          console.log(data);
        });
      },
      notificationWeb: function (formData, callback) {
        TravelibroService.post(adminURL + "/notification/getNotificationWeb", formData, 'paginationLoad').success(callback).error(function (data) {
          console.log(data);
        });
      },
      checkToken: function (formData, callback) {
        TravelibroService.post(adminURL + "/user/checkToken", formData).success(callback).error(function (data) {
          console.log(data);
        });
      },
      changePasswordEmail: function (formData, callback) {
        TravelibroService.post(adminURL + "/user/changePasswordEmail", formData).success(callback).error(function (data) {
          console.log(data);
        });
      },
      getCitySearch: function (formData, callback) {
        TravelibroService.post(adminURL + "/city/searchDestCity", formData).success(callback).error(function (data) {
          console.log(data);
        });
      },
      getDestination: function (formData, callback) {
        TravelibroService.post(adminURL + "/country/getDestination", formData, 'searchLoad').success(function (data) {
          data.count = formData.count;
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      getCountryDestination: function (formData, callback) {
        TravelibroService.post(adminURL + "/country/getOneCountry", formData, 'paginationLoad').success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      getCityDestination: function (formData, callback) {
        TravelibroService.post(adminURL + "/city/getOneCity", formData, 'paginationLoad').success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      getSendEmail: function (emailid, callback, errCallback) {
        TravelibroService.http({
          url: adminURL + "/user/forgotPassword",
          data: {
            'email': emailid
          },
          method: "POST"
        }).success(callback).error(errCallback);
      },
      acceptJourneyNotify: function (formData, callback) {
        TravelibroService.post(adminURL + "/journey/buddyAcceptWeb", formData).success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      declineJourneyNotify: function (formData, callback) {
        TravelibroService.post(adminURL + "/journey/buddyRejectWeb", formData).success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      endJourneyNotify: function (formData, callback) {
        TravelibroService.post(adminURL + "/journey/endJourneyWeb", formData).success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      declineEndJourneyNotify: function (formData, callback) {
        TravelibroService.post(adminURL + "/notification/updateNotification", formData).success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      updateNotificationStatus: function (id, callback) {
        TravelibroService.post(adminURL + "/notification/updateNotification", {
          "_id": id
        }).success(callback);
      },
      acceptFollowRequest: function (formData, callback) {
        TravelibroService.post(adminURL + "/user/acceptFollowerWeb", formData).success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      acceptRejectItinerary: function (formData, callback) {
        TravelibroService.post(adminURL + "/itinerary/itineraryStatusWeb", formData).success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      popularJourney: function (formData, callback) {
        TravelibroService.post(adminURL + "/journey/getPopularJourneyWeb", formData, 'paginationLoad').success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      popularItinerary: function (formData, callback) {
        TravelibroService.post(adminURL + "/itinerary/getPopularItineraryWeb", formData, 'paginationLoad').success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      popularBlogger: function (formData, callback) {
        TravelibroService.post(adminURL + "/user/getPopularUserWeb", formData, 'paginationLoad').success(function (data) {
          callback(data);
        }).error(function (data) {
          console.log(data);
        });
      },
      getDestinationBooking: function (formData, callback) {
        $http.get("https://blog.travelibro.com/migrations/city_bookings.json?city_name=" + formData.cityName + "&country_name=" + formData.countryName + "&withCredentials=true", formData).success(function (data) {
          callback(data);
        });
      },
      uploadFile: function (formData, callback) {
        console.log(formData);
        $http.post(uploadurl, formData, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        }).success(callback).error(function (data) {
          console.log(data);
        });
      },
      editUserData: function (userData, status, callback) {
        console.log(userData, 'userData', status, 'status');
        // console.log(userData, status);
        var formData = _.cloneDeep(userData);
        var object = {};
        switch (status) {
          case 1:
            console.log('on switch 1');
            var temp = "";
            if (userData.homeCity && userData.homeCity.description) {
              console.log("changing homecity");
              temp = userData.homeCity.description;
              formData.homeCity = "";
              formData.homeCity = temp;
            }
            if (userData.homeCountry && userData.homeCountry.name) {
              console.log("changing homecountry");
              temp = userData.homeCountry._id;
              formData.homeCountry = "";
              formData.homeCountry = temp;
            }

            console.log(formData, "after formating");
            object = _.pick(formData, 'firstName', 'lastName', 'gender', 'homeCountry', 'homeCity', 'isBlogger', 'isPhotographer', 'favorite_city', 'dream_destination', 'dob');
            if (object.firstName !== "" || object.lastName !== "") {
              object.firstName = object.firstName.trim();
              object.lastName = object.lastName.trim();
              object.name = object.firstName.concat(" ", object.lastName);
            } else {
              console.log("name cannot be empty");
            }

            console.log(object);
            break;
          case 2:
            // console.log(userData);
            object = {
              'travelConfig': {
                'holidayType': [],
                'preferToTravel': [],
                'usuallyGo': [],
                'kindOfHoliday': []
              }
            };
            var arrType = "";
            _.each(userData, function (val, key) {
              if (key == "chooseHoliday") {
                arrType = "kindOfHoliday";
              } else if (key == "usuallyGo") {
                arrType = "usuallyGo";
              } else if (key == "preferTravel") {
                arrType = "preferToTravel";
              } else if (key == "idealSelect") {
                arrType = "holidayType";
              }
              list = _.filter(val, ['class', "active-holiday"]);
              _.each(list, function (n) {
                object.travelConfig[arrType].push(n.storeCaption);
              });
            });
            console.log(object);
            console.log('on switch 2');
            break;
          case 3:
            console.log('on switch 3');
            break;
          case 4:
            console.log('on switch 4');
            break;
          case 5:
            console.log('on switch 5');
            console.log(userData);
            object.status = userData;
            console.log(object);
            break;
        }
        returnVal.saveUserData(object, callback, function (data) {
          console.log(data);
        });
      },
      oldUsersLogin: function (formData, callback) {
        TravelibroService.http({
          url: adminURL + "/user/loginWeb",
          data: formData,
          method: "POST"
        }).success(callback).error(function (data) {
          console.log(data);
        });
      },
      sendOtpToReset: function (email, callback) {
        var obj = {
          "email": email
        };
        TravelibroService.http({
          url: adminURL + "/user/forgotPassword",
          data: obj,
          method: "POST"
        }).success(callback);
      },
      getImageFromServer: function (name, callback) {
        $http.get(adminURL + "/upload/readFile?file=" + name).success(callback);
      }
    };
    return returnVal;
  });
