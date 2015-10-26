(function() {
  'use strict';

  angular
    .module('instantblog')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig,$sceDelegateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $sceDelegateProvider.resourceUrlWhitelist(
      [
        'self',
        'https://scontent.cdninstagram.com/**'
      ]
    );

  }

})();
