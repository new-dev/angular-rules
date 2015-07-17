var app = angular.module('App',[]);

app.controller('mainCtrl', function($scope){
    $scope.dimension = 4;
    $scope.numberOfLetters = $scope.dimension*$scope.dimension;
    $scope.wordLength = 4;
    $scope.tiles = [];
    $scope.selectedLetters = [];
    $scope.alphabete = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
    ];
    $scope.setWidthOfTiles = {
        width : 100/$scope.dimension + '%',
        height : 100/$scope.dimension + '%'
    };
    $scope.setWidthOfLetters = {
        width : 100/$scope.wordLength + "%",
        height : 100/$scope.wordLength + "%"
    };
    $scope.page = {
        'name' : 'Un-named',
        'title' : 'Hello'
    };

    function tile(letter, clicked) {
        this.letter = letter;
        this.clicked = clicked;
    }

    function generateLetters() {
        var newObject = {},
            i;
        for (i=0; i < $scope.numberOfLetters; i++) {
            newObject = new tile($scope.alphabete[Math.floor((Math.random() * 25) + 0)], false);
            $scope.tiles.push(newObject);
        }

        console.log($scope.alphabete);
    }

    $scope.selectLetter = function(letter, index) {
        if ($scope.selectedLetters.length < $scope.wordLength) {
            if (!$scope.tiles[index].clicked) {
                $scope.selectedLetters.push(letter);
                $scope.tiles[index].clicked = !$scope.tiles[index].clicked;
            }
            else {
                $scope.tiles[index].clicked = !$scope.tiles[index].clicked;
            }
        }
    };

    $scope.init = function() {
        generateLetters();
    };

    $scope.init();
});