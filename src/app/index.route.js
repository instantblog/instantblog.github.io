(function() {
  'use strict';

  angular
    .module('instantblog')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($locationProvider) {
  //function routerConfig($stateProvider, $urlRouterProvider) {
    //$stateProvider
    //  .state('about', {
    //    url: '/about',
    //    templateUrl: 'app/main/main.html',
    //    controller: 'MainController',
    //    controllerAs: 'main'
    //  });
    //
    //$urlRouterProvider.otherwise('/about');
    $locationProvider.html5Mode(true).hashPrefix('!');
  }

})();
