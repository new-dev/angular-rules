var app = angular.module('App',[]);

app.controller('mainCtrl', function($scope, gameFactory, styleFactory){
    $scope.getPageName = function() {
      return styleFactory.page.name;
    };
    $scope.getPageTitle = function() {
        return styleFactory.page.title;
    };
    $scope.getWidthOfTiles = function() {
        return styleFactory.widthOfTiles;
    };
    $scope.selectLetter = function(letter, index) {
        gameFactory.selectLetter(letter, index);
    };
    gameFactory.getTiles().then(function() {
        $scope.getTiles = function() {
            return gameFactory.tiles;
        }
    });
});
app.factory('gameFactory', function($http){
    var gameFactory = {};
    gameFactory.tileObj = function(letter, clicked) {
        this.letter = letter;
        this.clicked = clicked;
    };
    gameFactory.dimension = 4;
    gameFactory.numberOfLetters = gameFactory.dimension*gameFactory.dimension;
    gameFactory.wordLength = 3;
    gameFactory.world = 1;
    gameFactory.level = "level1";
    gameFactory.score = 0;
    gameFactory.tiles = [];
    gameFactory.selectedLetters = [];


    /*Async javascript stuff...*/
    gameFactory.initLevel = function(world) {
        $http.get('../data/world'+world+'.json').success(function(response){
            gameFactory.loadedData = angular.fromJson(response);
            gameFactory.initDataVariables();
        });
    };

    gameFactory.initDataVariables = function(){
        gameFactory.loadedDataLetters = gameFactory.loadedData[gameFactory.level].letters;
        gameFactory.loadedDataSolutions = gameFactory.loadedData[gameFactory.level].solutions;
        //Can have more laterrr

        gameFactory.generateLetters();
    };

    gameFactory.generateLetters = function() {
        var newObject = {},
            i;
        for (i=0; i < gameFactory.numberOfLetters; i++) {
            newObject = new gameFactory.tileObj(gameFactory.loadedDataLetters[i],false);
            gameFactory.tiles.push(newObject);
        }
    };

    gameFactory.selectLetter = function(letter, index) {
        if (gameFactory.selectedLetters.length < gameFactory.wordLength) {
            if (!gameFactory.tiles[index].clicked) {
                gameFactory.selectedLetters.push(letter);
                gameFactory.tiles[index].clicked = !gameFactory.tiles[index].clicked;
            }
            else {
                gameFactory.tiles[index].clicked = !gameFactory.tiles[index].clicked;
            }
        }
        gameFactory.checkIfWord(gameFactory.selectedLetters.join(""));
        gameFactory.resetTiles();
    };

    gameFactory.checkIfWord = function(word) {
        var index = gameFactory.loadedDataSolutions.indexOf(word);
        if (index == -1)
            console.log("Not a Word");
        else {
            console.log("Good Job, its a word");
            gameFactory.score++;
            gameFactory.loadedDataSolutions.splice(index, 1);
        }
    };

    gameFactory.resetTiles = function(){
        var i;
        if (gameFactory.selectedLetters.length === 3) {
            gameFactory.selectedLetters = [];
            for (i = 0; i < (gameFactory.dimension * gameFactory.dimension); i++) {
                gameFactory.tiles[i].clicked = false;
            }
        }
    };

    gameFactory.getTiles = function() {
        return $http.get('../data/world'+gameFactory.world+'.json')
            .success(function(response){
                gameFactory.loadedData = angular.fromJson(response);
                gameFactory.initDataVariables();
            })
            .error(function(){
                console.log("Error in the getTiles");
            });
    };

    return gameFactory;
});

app.factory('styleFactory', function(gameFactory){
    var styleFactory = {};

    styleFactory.widthOfTiles = {
        width : 100/4 + '%',
        height : 100/4 + '%'
    };
    styleFactory.widthOfLetters = {
        width : 100/4 + '%',
        height : 100/4 + '%'
    };
    styleFactory.page = {
        'name' : 'Un-named',
        'title' : 'Hello'
    };

    return styleFactory;
});