(function () {

  'use strict';

  describe('Service: FireBaseService', function () {

    // load the service's module
    beforeEach(module('instantblog'));

    // instantiate service
    var FireBaseService;
    beforeEach(inject(function (FireBaseService) {
      FireBaseService = FireBaseService;
    }));

    it('should do something', function () {
      expect(!!FireBaseService).toBe(true);
    });

  })
})();
