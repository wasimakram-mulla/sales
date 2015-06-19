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
      when('/employee_list', {
        templateUrl: 'views/employee_list.html'
      }).
      when('/employee_details/:param', {
        templateUrl: 'views/employee_details.html'
      }).
      when('/inactive_employees', {
        templateUrl: 'views/employees_list_inactive.html'
      }).
      when('/log_attendance', {
        templateUrl: 'views/log_attendance.html'
      }).
      when('/prev_attendance', {
        templateUrl: 'views/prev_attendance.html'
      }).
      when('/correct_attendance', {
        templateUrl: 'views/correct_attendance.html'
      }).
      when('/absent_record', {
        templateUrl: 'views/absent_record.html'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
	  
}]);