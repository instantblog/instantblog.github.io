(function () {
  'use strict';

  angular
    .module('instantblog')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, FireBaseService,$state) {
    var rootScope = $rootScope;
    //$rootScope.isTouchDevice = function () {
    //  //console.log('Not Touch Device');
    //  return 'ontouchstart' in document.documentElement;
    //};

    rootScope.$on('$stateChangeStart', function () {
      rootScope.isPageLoading = true;
    });
    rootScope.$on('$stateChangeSuccess', function () {
      rootScope.isPageLoading = false;
      FireBaseService.updateFireStat($state.params.instauser);
    });
    $log.debug('runBlock end');
  }

})();
