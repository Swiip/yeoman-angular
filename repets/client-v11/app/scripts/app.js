'use strict';

angular.module('mixit13App', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Frameworks', function($resource) {
    return $resource('http://localhost\\:1234/frameworks/:id', {
      id: '@_id'
    });
  });
