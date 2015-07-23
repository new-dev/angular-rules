var app = angular.module('levelApp',[]);

app.controller('mainCtrl', function($scope, gameFactory, styleFactory){
    $scope.pageName = function() {
      return styleFactory.page.name;
    };
    $scope.pageTitle = function() {
        return styleFactory.page.title;
    };
    $scope.widthOfTiles = function() {
        return styleFactory.widthOfTiles;
    };
    $scope.selectLetter = function(letter, index) {
        gameFactory.selectLetter(letter, index);
    };

    $scope.score = function() {
        return gameFactory.score;
    };
    gameFactory.getTiles().then(function() {
        $scope.tiles = function() {
            return gameFactory.tiles;
        }
    });
});