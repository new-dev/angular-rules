var app = angular.module('App',[]);

app.controller('mainCtrl', function($scope){
    $scope.page = {
        'name' : 'Un-named',
        'title' : 'Hello'
    }
});