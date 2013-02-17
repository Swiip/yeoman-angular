angular
    .module('yeoman-angular', ['ya-controller'])

angular
    .module('ya-controller', [])
    .controller('main', function ($scope) {
        $scope.hello = 'Hello';
        $scope.world = 'World';
    })
    .controller('grid', function($scope, $http) {
        $http.get('http://localhost:1234/carottes').success(function(data) {
            $scope.carottes = data;
        });
    })