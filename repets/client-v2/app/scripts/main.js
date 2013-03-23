angular
  .module('lyonjs', [])
  .value('url', 'http://localhost:1234/carottes')
  .controller('main', function ($scope, $http, url) {
    var modal = $(".modal");

    $scope.hello = 'Hello';

    $http.get(url).success(function (data) {
      $scope.carottes = data;
    });

    $scope.edit = function (carotte) {
      $scope.carotte = carotte;
      modal.modal('show');
    };

    $scope.save = function () {
      if ($scope.carotte._id) {
        $http.put(url + '/' + $scope.carotte._id, $scope.carotte);
      } else {
        $http.post(url, $scope.carotte);
        $scope.carottes.push($scope.carotte);
      }
      modal.modal('hide');
    };

    $scope.delete = function (carotte) {
      $http.delete(url + '/' + carotte._id);
      $scope.carottes.splice($scope.carottes.indexOf(carotte), 1);
    };
  });