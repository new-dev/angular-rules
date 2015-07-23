angular.module('levelApp').factory('styleFactory', function(gameFactory){
    var styleFactory = {};

    styleFactory.widthOfTiles = {
        width : 100/gameFactory.dimension + '%',
        height : 100/gameFactory.dimension + '%'
    };
    styleFactory.widthOfLetters = {
        width : 100/gameFactory.dimension + '%',
        height : 100/gameFactory.dimension + '%'
    };
    styleFactory.page = {
        'name' : 'Un-named',
        'title' : 'Hello'
    };

    return styleFactory;
});