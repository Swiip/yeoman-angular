angular.module('yeoman-angular', ['ya-controllers']);

angular
    .module('ya-controllers', [])
    .controller('hello', function($scope) {
        $scope.hello = 'hello world !!';
    })
    .controller('grid', function($scope, $http) {
        $http.get('http://localhost:1234/carottes').success(function(data) {
            $scope.carottes = data;
        });

        $scope.edit = function(carotte) {
            $scope.carotte = carotte;
            $("div.modal").modal("show");
        }
    });
