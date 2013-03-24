'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, Frameworks) {
    var modal = $('.modal');

    $scope.hello = 'Hello Devoxx !';

    $scope.frameworks = Frameworks.query();

    $scope.edit = function(framework) {
      $scope.framework = framework;
      modal.modal('show');
    }

    $scope.save = function() {
      if($scope.framework.$save) {
        $scope.framework.$save();
      } else {
        $scope.frameworks.push(Frameworks.save($scope.framework));
      }
      modal.modal('hide');
    }

    $scope.delete = function(framework, $event, $index) {
      framework.$delete();
      $event.stopPropagation();
      $scope.frameworks.splice($index, 1);
    }
  });
