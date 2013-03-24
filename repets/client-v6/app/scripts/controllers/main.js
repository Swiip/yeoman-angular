'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, frameworks) {
    $scope.hello = 'Hello Devoxx !';

    $scope.frameworks = frameworks.query();

    $scope.edit = function(framework) {
      $scope.framework = framework;
    };

    $scope.save = function() {
      if($scope.framework.$save) {
        $scope.framework.$save();
      } else {
        $scope.frameworks.push(frameworks.save($scope.framework));
      }
    }

    $scope.delete = function(framework, $event, $index) {
      framework.$delete();
      $event.stopPropagation();
      $scope.frameworks.splice($index, 1);
    }
  });
