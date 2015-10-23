'use strict';
/**
 * @ngdoc directive
 * @name instantblog.directive:footer
 * @description
 * # footer
 */
angular.module('instantblog')
  .directive('footer', function ($mdBottomSheet, $mdToast, $document) {
    return {
      templateUrl: 'app/components/footer/footer.html',
      controller: function FooterCtrl() {
        var vm = this;

        vm.showInfoToast = function (infoType) {
          $mdToast.show({
            parent: $document[0].querySelector('.ib-footer'),
            controller: function (FireBaseService) {
              var _this = this;
              _this.FireBaseService = FireBaseService;
              _this.infoType = infoType;
              _this.closeToast = function () {
                $mdToast.hide();
              };
            },
            controllerAs: 'toast',
            templateUrl: 'app/components/footer/ib-info-template.html',
            hideDelay: false,
            position: 'bottom'
          });
        };


        //vm.showIbInfoSheet = function ($event,type) {
        //  $mdBottomSheet.show({
        //    templateUrl: 'app/components/footer/ib-info-template.html',
        //    controller: function (){
        //      this.infoTab = type;
        //    },
        //    clickOutsideToClose: true,
        //    targetEvent: $event
        //  }).then(function (clickedItem) {
        //    //$mdToast.show(
        //    //  $mdToast.simple()
        //    //    .content(clickedItem['name'] + ' clicked!')
        //    //    .position('top right')
        //    //    .hideDelay(1500)
        //    //);
        //  });
        //};
      },
      controllerAs: 'footer',
      restrict: 'EA',
      link: function () {
      }
    };
  });
