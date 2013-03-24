'use strict';

angular.module('clientApp', ['ngResource'])
  .factory('Frameworks', function($resource) {
    return $resource('http://localhost\\:1234/frameworks', {
      id: '@_id'
    })
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
