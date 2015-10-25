'use strict';

angular.module('instantblog')
  .directive('blogTimeline', function ($window,InstagramApiServices) {
    return {
      templateUrl: 'app/components/blog-timeline/blog-timeline.html',
      restrict: 'EA',
      link: function (scope) {
        scope.isSmallScreen = setSize();
        scope.isMoreCommentVisible = false;
        scope.getRecentComments = getRecentComments;
        scope.isVisible = isVisible;

        function getRecentComments(mediaId) {
          if (scope.isMoreCommentVisible) {
            scope.isMoreCommentVisible = false;
          } else {
            InstagramApiServices.getRecentComments(mediaId).then(function (response) {
              scope.gallery.recentComments = response.data.slice(0, response.data.length - 8);
              isVisible()
            })
          }
        }

        function isVisible() {
          scope.isMoreCommentVisible = !scope.isMoreCommentVisible;
        }

        function setSize() {
          if ($window.innerWidth < 767) {
            return true;
          } else {
            return false;
          }
        }

        angular.element($window).bind("resize", function () {
          scope.$apply(scope.isSmallScreen = setSize());
        });
      }
    };
  });
