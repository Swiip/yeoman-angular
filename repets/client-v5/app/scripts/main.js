angular
  .module('lyonjs', ['lyonjs-controllers']);

angular
  .module('lyonjs-conf', [])
  .value('url', 'http://localhost:1234/frameworks');

angular
  .module('lyonjs-controllers', ['lyonjs-conf'])
  .controller('main', function ($scope) {
    $scope.hello = 'Hello LyonJS';
  })

  .controller('crud', function ($scope, $http, url) {
    var modal = $('.modal');

    $http.get(url).success(function (data) {
      $scope.frameworks = data;
    });

    $scope.edit = function (framework) {
      $scope.framework = framework;
      modal.modal('show');
    }

    $scope.save = function () {
      if ($scope.framework._id) {
        $http.put(url + '/' + $scope.framework._id, $scope.framework);
      } else {
        $http.post(url, $scope.framework);
        $scope.frameworks.push($scope.framework);
      }
      modal.modal('hide');
    }

    $scope.delete = function(framework, $event, $index) {
      $http.delete(url + '/' + framework._id);
      $event.stopPropagation();
      $scope.frameworks.splice($index);
    }
  })