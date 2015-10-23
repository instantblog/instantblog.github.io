'use strict';

angular.module('instantblog')
  .directive('blogTimeline', function () {
    return {
      templateUrl: 'app/components/blog-timeline/blog-timeline.html',
      scope:{
        'galleries':'=galleries'
      },
      restrict: 'EA',
      link: function () {
      }
    };
  });
