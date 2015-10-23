'use strict';

describe('Directive: blogTimeline', function () {

  // load the directive's module and view
  beforeEach(module('instantblog'));
  beforeEach(module('components/blog-timeline/blog-timeline.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<blog-timeline></blog-timeline>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the blogTimeline directive');
  }));
});
