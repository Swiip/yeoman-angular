angular.module('yeoman-angular', ['ya-controllers']);

angular
    .module('ya-controllers', [])
    .controller('hello', function ($scope) {
        $scope.hello = 'hello world !!';
    })
    .controller('grid', function ($scope, $http) {
        $http.get('http://localhost:1234/carottes').success(function (data) {
            $scope.carottes = data;
        });

        $scope.edit = function (carotte) {
            $scope.carotte = carotte;
            $("div.modal").modal("show");
        }

        $scope.save = function (save) {
            if(save) {
                if($scope.carotte._id) {
                    $http.put('http://localhost:1234/carottes/' + $scope.carotte._id, $scope.carotte);
                } else {
                    $http.post('http://localhost:1234/carottes', $scope.carotte);
                    $scope.carottes.push($scope.carotte);
                }
            }
            $("div.modal").modal("hide");
        }
    });
