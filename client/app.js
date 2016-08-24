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
  .when('/add', {
    templateUrl: 'components/add.html',
    controller: 'newRVController'
  })
  .otherwise({
    redirectTo: '/add'
  })
})
.controller("rvsController", function($scope, $http) {
  $scope.countId = 'countId';
  var count = 1;
  $http({
    method: 'GET',
    url: '/rvs'
  })
  .then(function (resp) {
    return resp.data;
  })
  .then(function(data) {
    $scope.rvsList = data;
    return data;
  }).then(function(data){
    // console.log(data[0]);
    for (var i=0; i <data.length; i++) {
      data[i][$scope.countId] = count;
      count++;
    }
  })
})
.controller("newRVController", function($scope, $http){
  $scope.addRV = function(name, model, type, year, price) {
    $http({
      method: 'POST',
      url: '/add',
      data: "name=" + name + "&model=" + model + "&type=" + type + "&year=" + year + "&price=" + price ,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function (resp) {
      $scope.name = null;
      $scope.model = null;
      $scope.type = null;
      $scope.year = null;
      $scope.price = null;
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

