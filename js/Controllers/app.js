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
      when('/add_client_product', {
        templateUrl: 'views/add_client_product.html'
      }).
      when('/product_list', {
        templateUrl: 'views/product_list.html'
      }).
      when('/clientproduct_list', {
        templateUrl: 'views/clientproduct_list.html'
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
      when('/process_salary', {
        templateUrl: 'views/process_salary.html'
      }).
      when('/past_salaries', {
        templateUrl: 'views/past_salaries.html'
      }).
      when('/add_stock', {
        templateUrl: 'views/add_stock.html'
      }).
      when('/view_stock', {
        templateUrl: 'views/view_stock.html'
      }).
      when('/view_stock_details:param', {
        templateUrl: 'views/view_stock_details.html'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
	  
}]);

/* stockmgmt.controller("LandingController", function($scope, $http, $route){
	var homeObj=$scope;
	homeObj.setCurrTime = function(){				
			homeObj.CurrSystemTime=new Date();
		window.setTimeout(function(){
			console.log(homeObj.CurrSystemTime);
			homeObj.setCurrTime();
		},1000);
	};
	$scope.setCurrTime();
}); */

stockmgmt.directive('myCurrentTime', ['$interval', 'dateFilter',
	function($interval, dateFilter) {
	// return the directive link function. (compile function not needed)
	return function(scope, element, attrs) {
		var stopTime; // so that we can cancel the time updates

		// used to update the UI
		function updateTime() {
			element.text(dateFilter(new Date(), 'dd/MM/yyyy, HH:mm:ss'));
		}

		// watch the expression, and update the UI on change.
		scope.$watch(attrs.myCurrentTime, function() {		  
		  updateTime();
		});

		stopTime = $interval(updateTime, 1000);

		// listen on DOM destroy (removal) event, and cancel the next UI update
		// to prevent updating time after the DOM element was removed.
		element.on('$destroy', function() {
		  $interval.cancel(stopTime);
		});
	}
}]);