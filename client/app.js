angular.module('rvwishlist', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider
  .when('/rvs/:id', {
    templateUrl: 'components/rv.html',
    controller: 'rvController'
  })
  .when('/rvs', {
    templateUrl: 'components/rvList.html',
    controller: 'rvsController'
  })
  .when('/', {
    templateUrl: 'components/add.html',
    controller: 'newRVController'
  })
})
.controller("rvsController", function($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://localhost:3000/rvs'
  })
  .then(function (resp) {
    return resp.data;
  })
  .then(function(data) {
    $scope.rvsList = data;
  });
})
.controller("newRVController", function($scope, $http){
  $scope.addRV = function(name, model, type, year, price) {
    $http({
      method: 'POST',
      url: '/rvs',
      data: "name=" + name + "&model=" + model + "&type=" + type + "&year=" + year + "&price=" + price ,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function (resp) {
      console.log(resp, "THIS DA RESPONSE")
    });
   }
})

.controller('rvController', function($scope, $http, $location) {
  console.log($location);
  var path = $location.$$path;
  $http({
    method: 'GET',
    url: 'http://localhost:3000' + path
  })
  .then(function(resp) {
    return resp.data;
  })
  .then(function(data) {
    $scope.rvView = data;
  });
});

