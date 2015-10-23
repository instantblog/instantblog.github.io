'use strict';

(function () {

  angular
    .module('instantblog')
    .service('dataService', dataService);


  function dataService($http, $log) {
    var log = $log;
    this.getData = function (url) {
      return $http({
        method: 'GET',
        url: url,
        headers: {'Content-Type': 'application/json'},
        cache: true
      })
        .then(function (response) {
          return response.data;
        }, function (result) {
          log.log("The request failed: ", result);
        });
    };

  }
});
