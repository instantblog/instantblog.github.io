(function () {
  'use strict';

  angular
    .module('instantblog')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/', {
        url: '/:instauser',
        templateUrl: function ($stateParams) {
          if ($stateParams.instauser === 'about' || $stateParams.instauser === '' || $stateParams.instauser === null) {
            return 'app/blog/about.html';
          } else {
            return 'app/blog/blog.html'
          }
        },
        controller: 'BlogController',
        controllerAs: 'blog',
        resolve: {
          CurrentInstaUser: function (InstagramApiServices, $stateParams) {
            var username = $stateParams.instauser;
            var currentInstaUser = {};
            currentInstaUser.usernameSearched = username;
            if (username === 'about') {
              return currentInstaUser;
            } else {
              return InstagramApiServices.getUserId(username)
                .then(function (response) {
                  //$log.log('response', response);
                  if (!response.data || response.data.length < 1) {
                    currentInstaUser.errorMessage = 'user ( ' +username +' ) not found';
                    return currentInstaUser;
                  } else {
                    var matchedUser;
                    for (var i = 0; i < response.data.length; i++) {
                      if (response.data[i].username === username) {
                        matchedUser = response.data[i];
                        break;
                      }
                    }
                    currentInstaUser.currentUser = matchedUser;
                    return getuserDate(matchedUser);
                  }
                });
            }

            function getuserDate(matchedUser) {
              if (!matchedUser) {
                currentInstaUser.errorMessage = 'user not found';
                return currentInstaUser;
              } else {
                return InstagramApiServices.getUser(matchedUser.id).then(function (response) {
                  currentInstaUser.currentUser = response.data;
                  if (!response.data) {
                    //$log.log('userData is', response);
                    currentInstaUser.errorMessage = response.meta.error_message;
                    currentInstaUser.isPrivate = true;
                    return currentInstaUser;
                  } else {
                    return InstagramApiServices.getUserRecentMedia(response.data.id).then(function (response) {
                      currentInstaUser.nextUrl = response.pagination.next_url;
                      currentInstaUser.currentMedia = response.data;
                      currentInstaUser.errorMessage = '';
                      currentInstaUser.isPrivate = false;
                      //$log.log(currentInstaUser.nextUrl);
                      //$log.log(currentInstaUser);
                      return currentInstaUser;
                    });
                  }
                });
              }
            }
          }
        }
      });

    $urlRouterProvider.otherwise('/about');
  }

})();
