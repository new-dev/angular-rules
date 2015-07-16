var app = angular.module('App',[]);

app.controller('mainCtrl', function($scope){
    $scope.dimension = 3;
    $scope.numberOfLetters = $scope.dimension*$scope.dimension;
    $scope.wordLength = 100;
    $scope.tiles =[];
    $scope.selectedLetters =[];
    $scope.setWidthOfTiles = {
        width : 100/$scope.dimension+'%',
        height: 100/$scope.dimension+'%'
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
        var letter = '',
            newObject = {},
            i;
        for (i=0; i < $scope.numberOfLetters; i++) {
            newObject = new tile(String.fromCharCode(65+i), false);
            $scope.tiles.push(newObject);
        }
    }

    $scope.selectLetter = function(letter, index) {
        if($scope.selectedLetters.length < $scope.wordLength) {
            $scope.selectedLetters.push(letter);
            $scope.tiles[index].clicked = !$scope.tiles[index].clicked;
        }
    };

    $scope.init = function(){
        generateLetters();
    };

    $scope.init();
});