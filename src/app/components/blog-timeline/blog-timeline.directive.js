'use strict';

angular.module('instantblog')
  .directive('blogTimeline', function ($window,$log) {
    return {
      templateUrl: 'app/components/blog-timeline/blog-timeline.html',
      scope: {
        'galleries': '=galleries'
      },
      restrict: 'EA',
      link:function(scope){
        scope.isSmallScreen =setSize();

        function setSize() {
          if ($window.innerWidth < 767) {
            return true;
          } else {
            return false;
          }
        }

        angular.element($window).bind("resize", function () {
          scope.$apply(scope.isSmallScreen =setSize());
        });
      }
    };
  });
