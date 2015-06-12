var stockmgmt = angular.module('stockmgmt', [
'ngRoute',
'ngResource'
]);

stockmgmt.run(function($location) {
	//$location.path('/dashboard');
});

stockmgmt.config(['$routeProvider','$resourceProvider',
  function($routeProvider,$resourceProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'views/dashboard.html'
      }).
      when('/add_client', {
        templateUrl: 'views/add_client.html'
      }).
      when('/client_list', {
        templateUrl: 'views/client_list.html'
      }).
      when('/nonactive_clients', {
        templateUrl: 'views/nonactive_clients.html'
      }).
      when('/add_dealer', {
        templateUrl: 'views/add_dealer.html'
      }).
      when('/dealer_list', {
        templateUrl: 'views/dealer_list.html'
      }).
      when('/nonactive_dealers', {
        templateUrl: 'views/nonactive_dealers.html'
      }).
      when('/add_product', {
        templateUrl: 'views/add_product.html'
      }).
      when('/product_list', {
        templateUrl: 'views/product_list.html'
      }).
      when('/add_employee', {
        templateUrl: 'views/add_employee.html'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
	  
}]);