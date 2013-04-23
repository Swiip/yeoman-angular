'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('mixit13App'));

  var MainCtrl,
    scope;

  var $ = function() {}

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      Frameworks: {
        query: function() {}
      }
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.hello).toBe('Hello MixIT!');
  });
});
