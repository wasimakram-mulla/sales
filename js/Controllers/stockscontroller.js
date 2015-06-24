stockmgmt.controller("StockController", function($scope, $http, $route){
	$scope.fetchClients = function(){
		$http({
			method: 'POST',
			url: 'php/master.php?action=AllClients',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data.status==true){
				$scope.clientdata=result.data.clients;
			}
		});
	};
	
	$scope.fetchProducts = function(){
		$http({
			method: 'POST',
			url: 'php/master.php?action=AllProducts',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data.status==true){
				$scope.proddata=result.data.Products;
			}
		});
	};
	$scope.fetchClients();
	$scope.fetchProducts();
});