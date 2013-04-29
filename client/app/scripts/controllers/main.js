'use strict';

angular.module('mixitApp')
  .controller('MainCtrl', function ($scope, Frameworks) {
    var modal = $('.modal');

    $scope.hello = "Hello MixIT";

    $scope.frameworks = Frameworks.query();

    $scope.edit = function(framework) {
      $scope.framework = framework;
      modal.modal('show');
    }

    $scope.save = function() {
      if($scope.framework.$save) {
        $scope.framework.$save();
      } else {
        $scope.frameworks.push(Frameworks.save($scope.framework));
      }
      modal.modal('hide');
    }

    $scope.delete = function(framework, $index, $event) {
      $event.stopPropagation();
      $scope.frameworks.splice($index, 1);
      framework.$delete();
    }
  });















