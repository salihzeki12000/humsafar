var adminURL = "";

if (isproduction) {
    adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
    adminURL = "http://travelibro.com/api";
}
var imgurl = adminURL + "/upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Home",
        classis: "active",
        disabled: true,
        anchor: "home",
    }, {
        name: "Destination",
        classis: "active",
        disabled: true,
        anchor: "home",
    }, {
        name: "Popular Journeys",
        classis: "active",
        disabled: true,
        anchor: "home",
    }, {
        name: "Popular Bloggers",
        classis: "active",
        disabled: true,
        anchor: "home",
    }, {
        name: "Popular Agents",
        classis: "active",
        disabled: true,
        anchor: "home",
    }, {
        name: "Bookings",
        classis: "active",
        disabled: false,
        anchor: "home",
        subnav: [{
            name: "Flights",
            classis: "active",
            anchor: "home"
        }, {
            name: "Hotels",
            classis: "active",
            anchor: "home"
        }, {
            name: "Vacation Rentals",
            classis: "active",
            anchor: "home"
        }, {
            name: "Homestays",
            classis: "active",
            anchor: "home"
        }, {
            name: "Car Rentals",
            classis: "active",
            anchor: "home"
        }, {
            name: "Tours & Excursions",
            classis: "active",
            anchor: "home"
        }, {
            name: "Parking Space",
            classis: "active",
            anchor: "home"
        }, ]
    }, {
        name: "Blogs",
        classis: "active",
        disabled: true,
        anchor: "home",
    }, {
        name: "About Us",
        classis: "active",
        disabled: false,
        anchor: "home",
        subnav: [{
            name: "About TraveLibro",
            classis: "active",
            anchor: "home"
        }, {
            name: "Advertise With Us",
            classis: "active",
            anchor: "home"
        }, {
            name: "Contact Us",
            classis: "active",
            anchor: "home",
            params: {
                'id': 'contact',
            }
        }, {
            name: "Terms & Conditions",
            classis: "active",
            anchor: "home"
        }, ]
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        getProfile: function(callback, errCallback) {
            return $http({
                url: adminURL + "/user/profile",
                method: "POST"
            }).success(callback).error(errCallback);
        },

        logout: function(callback, errCallback) {
            return $http({
                url: adminURL + "/user/logout",
                method: "POST"
            }).success(callback).error(errCallback);
        },

        getAllCountries: function(callback, errCallback) {
            return $http({
                url: adminURL + "/country/getAll",
                method: "POST"
            }).success(callback).error(errCallback);
        },

        getAllCities: function(formData, callback, errCallback) {
            $http.post(adminURL + "/city/locationSearch", formData).success(callback).error(errCallback);
        },
        searchCityByCountry:function(formData,callback){
            var arr={};
            console.log(formData);
            var arr=_.omit(formData,['cityVisited']);
            console.log(arr);
            
            $http({
                url:adminURL+"/city/searchCity",
                data:formData,
                method:"POST"
            }).success(callback);
        },
        saveUserData: function(formData, callback, errorCallback) {
            $http.post(adminURL + "/user/editUserWeb", formData).success(callback).error(errorCallback);
        },

        travelCount: function(callback, errorCallback) {
            $http.post(adminURL + "/user/getOneDataWeb").success(callback).error(errorCallback);
        },

        getBucketListWeb: function(callback, errorCallback) {
            $http.post(adminURL + "/user/getBucketListWeb").success(callback).error(errorCallback);
        },

        updateCountriesVisitedWeb: function(formData, callback, errCallback) {
            $http.post(adminURL + "/user/updateCountriesVisitedWeb", formData).success(callback).error(errCallback);
        },
        checkToken: function(formData, callback) {
            $http.post(adminURL + "/user/checkToken", formData).success(callback);
        },
        changePasswordEmail: function(formData, callback) {
            $http.post(adminURL + "/user/changePasswordEmail", formData).success(callback);
        },
        uploadFile: function (formData, callback) {
            $http.post(uploadurl, formData, {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            }).success(callback);
        }
    };
});
