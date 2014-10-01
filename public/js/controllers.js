(function (_) {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      var type = $routeParams.type;
      var pokemons = [];

      if (type) {
        $rootScope.title = type;
        $scope.type = type;

        pokemonService.byType(type).then(function (data) {
          $scope.pokemons = pokemons = data;
          $scope.groupped = partition(data, 4);
        });
      } else {
        pokemonService.all().then(function (data) {
          $scope.pokemons = pokemons = data;
          $scope.groupped = partition(data, 4);
        });
      }

      $scope.search = function () {                                                     
        var result = pokemons;
        if ($scope.searchTerm) {
          result = pokemons.filter(function (pokemon) {
            var name = pokemon && pokemon.name || "";
            return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;  
          });
        }

        $scope.pokemons = result;
        $scope.groupped = partition(result, 4);
      };


      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])

    .controller('PokemonController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function ($rootScope, $scope, $routeParams, pokemonService) {
      var name = $routeParams.name;

      pokemonService.byName(name)
      .then(function (data) {
        $rootScope.title = data.name;
        $scope.pokemon = data;
        $scope.rating = pokemonService.getRating(data.name);
      });
    }])

    .controller('TabsController', ['$scope', function ($scope) {
      $scope.tab = 1;

      $scope.selectTab = function (tab) {
        $scope.tab = tab;
      };

      $scope.isActive = function(tab) {
        return tab === $scope.tab;
      };
    }])

    .controller('RateController', ['$scope', 'pokemonService', function ($scope, pokemonService) {
      $scope.rate = 0;
      $scope.max = 10;
      $scope.isReadonly = false;

      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        //$scope.percent = 100 * (value / $scope.max);
      };

      $scope.rating = function(value) {
        pokemonService.saveRating($scope.name, value);
      }
    }]);

})(_);
