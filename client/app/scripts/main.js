angular
  .module('lyonjs', ['lyonjs-controllers']);

angular
  .module('lyonjs-config', [])
  .value('url', 'http://localhost\\:1234/carottes');

angular
  .module('lyonjs-controllers', ['lyonjs-config', 'ngResource'])

  .factory('Carottes', function ($resource, url) {
    return $resource(url + '/:_id', {_id: '@_id'});
  })

  .controller('main', function ($scope) {
    $scope.hello = 'Hello LyonJS';
  })

  .controller('crud', function ($scope, $http, Carottes) {
    var modal = $('.modal');

    Carottes.query(function (data) {
      $scope.carottes = data;
    });

    $scope.edit = function (carotte) {
      modal.modal('show');
      $scope.carotte = carotte;
    };

    $scope.save = function () {
      modal.modal('hide');
      Carottes.save($scope.carotte);
      if (!$scope.carotte._id) {
        $scope.carottes.push($scope.carotte);
      }
    }

    $scope.delete = function (carotte) {
      carotte.$delete();
      $scope.carottes.splice($scope.carottes.indexOf(carotte), 1);
    }
  });

