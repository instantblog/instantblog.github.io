'use strict';

angular.module('instantblog')
  .directive('blogTimeline', function ($window, $log) {
    return {
      templateUrl: 'app/components/blog-timeline/blog-timeline.html',
      scope: {
        'galleries': '=galleries'
      },
      restrict: 'EA',
      link: function (scope,element) {
        var window = angular.element($window);
        var width = $window.innerWidth;

        scope.isSmallScreen = width < 600;

        window.on("resize", function () {
          $log.log($window.innerWidth);
          scope.isSmallScreen = width < 600;
        });
        scope.$on("$destroy", function () {
          window.off("resize");
        });
      }
    };
  });
