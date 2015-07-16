var app = angular.module('App',[]);

app.controller('mainCtrl', function($scope){
    $scope.dimension = 4;
    $scope.numberOfLetters = $scope.dimension*$scope.dimension;

    $scope.page = {
        'name' : 'Un-named',
        'title' : 'Hello'
    };

    function tile(letter, clicked) {
        this.letter = letter;
        this.clicked = clicked;
    }
    function row(tileArray) {
        this.row = tileArray;
    }

    $scope.letters = [];
    $scope.rows = [];
    $scope.splitList = [];

    function generateLetters() {
        var letter = '',
            newObject = {},
            i = 0;

        for (i=0; i < $scope.numberOfLetters; i++) {
            letter = String.fromCharCode(65+i);
            newObject = new tile(letter, false);
            $scope.letters.push(newObject);
        }
        console.log($scope.letters);
    }

    function splitLetters() {
        var i = 0,
            newObject = {};
        for(i = 0; i < $scope.numberOfLetters; i+=$scope.dimension) {
            newObject = new row($scope.letters.slice(i,i+$scope.dimension));
            $scope.rows.push(newObject);
        }
        console.log($scope.rows);
    }

    generateLetters();
    splitLetters();

    $scope.selectedLetters =[];

    $scope.selectLetter = function(letter, index) {
        if($scope.selectedLetters.length < 3)
            $scope.selectedLetters.push(letter);
    }
});