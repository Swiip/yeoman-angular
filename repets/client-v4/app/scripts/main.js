angular
  .module('lyonjs', ['lyonjs-controllers']);

angular
  .module('lyonjs-config', ['ngResource'])
  .value('url', 'http://localhost\\:1234/frameworks')
  .factory('Frameworks', function ($resource, url) {
    return $resource(url + '/:_id', {_id: '@_id'});
  });

angular
  .module('lyonjs-controllers', ['lyonjs-config'])
  .controller('main', function ($scope) {
    $scope.hello = 'Hello LyonJS';
  })
  .controller('crud', function ($scope, $http, Frameworks) {
    var modal = $('.modal');

    Frameworks.query(function (data) {
      $scope.frameworks = data;
    });

    $scope.edit = function (framework) {
      $scope.framework = framework;
      modal.modal('show');
    }

    $scope.save = function () {
      if ($scope.framework._id) {
        $scope.framework.$save();
      } else {
        Frameworks.save($scope.framework, function (data) {
          $scope.frameworks.push(data);
        });
      }
      modal.modal('hide');
    }

    $scope.delete = function (framework, $event) {
      framework.$delete();
      $event.stopPropagation();
      $scope.frameworks.splice($scope.frameworks.indexOf(framework), 1);
    }
  });