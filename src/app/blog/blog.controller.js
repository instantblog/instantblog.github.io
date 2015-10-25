(function () {
  'use strict';

  angular
    .module('instantblog')
    .controller('BlogController', BlogController);

  /** @ngInject */
  function BlogController(InstagramApiServices, CurrentInstaUser, FireBaseService, $state, $anchorScroll,$location) {
    var vm = this;

    vm.timelineView = true;
    vm.CurrentInstaUser = CurrentInstaUser;
    vm.currentUser = CurrentInstaUser.currentUser || {};
    vm.currentMedia = CurrentInstaUser.currentMedia || {};
    vm.nextUrl = CurrentInstaUser.nextUrl || null;
    vm.FireBaseService = FireBaseService;
    vm.scrollTo = scrollTo;

    //FireBaseService.initializeStat();


    vm.loadMore = loadMore;
    vm.searchUser = searchUser;
    vm.changeUser = changeUser;
    //--------------------

    function scrollTo(id) {
      $location.hash(id);
      $anchorScroll();
    }


    function loadMore() {
      InstagramApiServices.loadMore(vm.nextUrl).then(function (response) {
        Array.prototype.push.apply(vm.currentMedia, response.data);
        vm.nextUrl = response.pagination.next_url;
      })
    }


    function searchUser(username) {
      if (username === '') {
        return;
      } else {
        return InstagramApiServices.getUserId(username)
          .then(function (response) {
            return response.data.slice(0, 19);
          });
      }
    }

    function changeUser(username) {
      if (angular.isUndefined(username) || username === null) {
        return;
      } else {
        $state.go('/', {'instauser': username});
      }
    }

  }
})
();
