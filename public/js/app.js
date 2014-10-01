(function () {

  var app = angular.module('pokedex', [
    'ngRoute',
    'angular-md5',
    'pokedex.controllers',
    'pokedex.directives',
    'pokedex.filters',
    'pokedex.services',
    'ui.bootstrap'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/pokedex.html',
        controller: 'PokedexController'
      })
      .when('/:type', {
        templateUrl: 'views/pokedex.html',
        controller: 'PokedexController'
      })
      .when('/pokemon/:name', {
        templateUrl: 'views/pokemon.html',
        controller: 'PokemonController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();
