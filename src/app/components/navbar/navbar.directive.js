(function () {
  'use strict';

  angular
    .module('instantblog')
    .directive('ibNav', ibNav);

  /** @ngInject */
  function ibNav() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, InstagramApiServices,$state) {
      var vm = this;
      vm.state=$state;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      vm.searchUser = function (username) {
        if (username === '') {
          return;
        } else {
          return InstagramApiServices.getUserId(username)
            .then(function (response) {
              return response.data.slice(0, 19);
            });
        }
      };

      vm.changeUser = function (username) {
        if (angular.isUndefined(username) || username === null) {
          return;
        } else {
          $state.go('/', {'instauser': username});
        }
      };

    }
  }

})();
