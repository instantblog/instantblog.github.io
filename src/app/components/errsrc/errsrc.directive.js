(function () {
  'use strict';

  angular
    .module('instantblog')
    .directive('errsrc', errsrc);

  /** @ngInject */
  function errsrc() {
    var directive = {
      link: function (scope, element, attrs) {
        if (!attrs.ngSrc) {
          attrs.$set('src', attrs.errsrc);
        }
        element.bind('error', function () {
          attrs.$set('src', attrs.errsrc);
        });
        element.on('$destroy', function () {
          //$log.log('errsrc directive is destroyed!');
        })
      }
    };

    return directive;

  }

})();
