var app = angular.module('App',[]);

app.controller('mainCtrl', function($scope, $http){
    $scope.dimension = 4;
    $scope.numberOfLetters = $scope.dimension*$scope.dimension;
    $scope.wordLength = 3;
    $scope.world = 1;
    $scope.level = "level1";
    $scope.score = 0;
    $scope.tiles = [];
    $scope.selectedLetters = [];
    /**All are being set at the moment. Will decide which one we want later..*/
    $scope.loadedData = {};
    $scope.loadedDataLetters = [];
    $scope.loadedDataSolutions = [];
    /**Alphabete will soon go away since they will not be randomly generated, Testing Purposes Only*/
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

    /*Async javascript stuff...*/
    $scope.initLevel = function(world) {
        $http.get('../data/world'+world+'.json').success(function(response){
            $scope.loadedData = angular.fromJson(response);
            $scope.initDataVariables();
        });
    };

    $scope.initDataVariables = function(){
        $scope.loadedDataLetters = $scope.loadedData[$scope.level].letters;
        $scope.loadedDataSolutions = $scope.loadedData[$scope.level].solutions;
        //Can have more laterrr

        $scope.generateLetters();
    };

    $scope.generateLetters = function() {
        var newObject = {},
            i;
        for (i=0; i < $scope.numberOfLetters; i++) {
            /**Used Below for testing purposed of tiles. Will not be randomly generated here
                newObject = new tile($scope.alphabete[Math.floor((Math.random() * 25) + 0)], false);
             */
            newObject = new tile($scope.loadedDataLetters[i],false);
            $scope.tiles.push(newObject);
        }
    };

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
        $scope.checkIfWord($scope.selectedLetters.join(""));
        $scope.resetTiles();
    };

    $scope.checkIfWord = function(word) {
        var index = $scope.loadedDataSolutions.indexOf(word);
        if (index == -1)
            console.log("Not a Word");
        else {
            console.log("Good Job, its a word");
            $scope.score++;
            $scope.loadedDataSolutions.splice(index, 1);
        }
    };

    $scope.resetTiles = function(){
        var i;
        if ($scope.selectedLetters.length === 3) {
            $scope.selectedLetters = [];
            for (i = 0; i < ($scope.dimension * $scope.dimension); i++) {
                $scope.tiles[i].clicked = false;
            }
        }
    };


    $scope.initLevel($scope.world);
});