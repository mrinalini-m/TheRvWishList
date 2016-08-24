angular.module('rvlist', ['ngRoute', 'uiGmapgoogle-maps'])
.config(function($routeProvider, uiGmapGoogleMapApiProvider) {
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
  });
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBdZj305mBq56LI29aDR8rJ3UIz9izdhCE', //Need to hide the api key
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
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
  });

  $scope.remove = function(rv) {
    // $http({
    //   method: 'POST',
    //   url: '/rvs/' + rv._id,
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    // })
    // .then(function (resp) {

    $scope.rvsList.forEach(function(item, index) {
      if(item._id === rv._id) {
        $scope.rvsList.splice(index, 1);
      }
    })
    // });

  }
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
    });
   }
})

.controller('rvController', function($scope, $http, $location) {
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, id:1 };
  $scope.coords = { latitude: 45, longitude: -73 }
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

  // var geocoder;
  // var map;

  // function codeAddress() {
  //   geocoder = new google.maps.Geocoder();
  //   // var address = document.getElementById('address').value;
  //   var address = '2135 Railroad Ave, Hercules, CA 94547';
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //     console.log(results[0].geometry.location.lat());
  //   });
  // }

  // codeAddress()
