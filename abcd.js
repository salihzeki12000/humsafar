// $scope.editCheckIn = function () {
//   $scope.editPost = {};
//   $scope.callback = function (data) {
//     var obj = {
//       "name": data.data[0],
//       "caption": ""
//     }
//     $scope.editPost.photosArr.push(obj);
//   };
//   $scope.editPost.photosArr = [];
//   $scope.editPost.videosArr = [];
//   $scope.editPost.newPhotosArr = [];
//   $scope.editPost.newVideosArr = [];
//   _.each($scope.ongo.photos, function (n, index) {
//     $scope.editPost.photosArr[index] = _.pick(n, ['_id', 'name', 'caption']);
//
//   });
//   // $scope.listFriend = [{
//   //   img: "img/profile.jpg",
//   //   name: "Amit Verma"
//   // }, {
//   //   img: "img/profile.jpg",
//   //   name: "Vignesh Kasturi"
//   // }, {
//   //   img: "img/profile.jpg",
//   //   name: "Dhavel Gala"
//   // }, {
//   //   img: "img/profile.jpg",
//   //   name: "Pooja Thakre"
//   // }, {
//   //   img: "img/profile.jpg",
//   //   name: "Vinod Bhelose"
//   // }, {
//   //   img: "img/profile.jpg",
//   //   name: "Rishabh Katoch"
//   // }, ];
//   modal = $uibModal.open({
//     animation: true,
//     // templateUrl: "views/modal/checkin.html",
//     templateUrl: "views/modal/edit-otg.html",
//     backdropClass: "review-backdrop",
//     size: "lg",
//     scope: $scope
//   });
//
//   $scope.searchBuddy = function (key) {
//       // if(parseFloat(key.length)%3==0){
//       $http({
//         url: adminURL + "/user/searchBuddyWeb",
//         method: "POST",
//         data: {
//           "search": key,
//         }
//       }).success(function (data) {
//
//         $scope.buddiesList = data.data;
//         $scope.alreadyAddedBuddies = $scope.ongo.buddies;
//         _.each($scope.buddiesList, function (n) {
//           n.selectedBuddiesList = false;
//         });
//         _.each($scope.alreadyAddedBuddies, function (n) {
//           var a = _.findIndex($scope.buddiesList, ['_id', n._id]);
//           if (a >= 0) {
//             $scope.buddiesList[a].selectedBuddiesList = true;
//             $scope.buddiesList[a].alreadyAdded = true;
//           }
//         });
//         $scope.newBuddies = [];
//         $scope.toggle = function (flag, buddy) {
//           var obj = {};
//           if (flag) {
//             obj._id = buddy._id;
//             obj.name = buddy.name;
//             obj.email = buddy.email;
//             $scope.newBuddies.push(obj);
//           } else {
//             $scope.newBuddies = _.reject($scope.newBuddies,   ['._id', buddy._id]);
//           }
//         };
//       });
//     }
//     // }
// };
//
// $scope.saveEditedPost = function () {
//   console.log($scope.editPost);
//   var concatedArray = _.partition($scope.editPost.photosArr, '_id');
//   //callback starts
//   var callback = function () {
//       console.log(modal);
//       OnGoJourney.getOneJourney({
//         "urlSlug": $scope.json.urlSlug
//       }, function (journeys) {
//         var post = _.find(journeys.post, ['_id', $scope.ongo._id]);
//         $scope.ongo.photos = post.photos;
//         $scope.ongo.showMap = post.showMap;
//         $scope.ongo.buddies = post.buddies;
//         // $scope.ongo=post;
//
//         makePostString();
//
//         console.log("photos of this post updated successfully");
//       }, function (err) {
//         console.log(err);
//       });
//       modal.close();
//     }
//     //callback ends
//
//   var formData = {
//     "_id": $scope.ongo._id,
//     "uniqueId": $scope.ongo.uniqueId,
//     "buddiesArr": $scope.newBuddies,
//     "photosArr": concatedArray[0],
//     "videosArr": [],
//     "newPhotosArr": concatedArray[1],
//     "newVideosArr": [],
//     "thoughts": $scope.ongo.thoughts,
//     "type": "editPost"
//   }
//   console.log(formData);
//   $http({
//     url: adminURL + "/post/editDataWeb",
//     method: "POST",
//     data: formData
//   }).success(callback);
// }
//
// $scope.deleteFromPhotoArr = function (name) {
//   $scope.editPost.photosArr = _.reject($scope.editPost.photosArr, ['name', name]);
// };
