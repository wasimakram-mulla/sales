stockmgmt.controller("AddStockController", function($scope, $http, $route){
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
	
	$scope.saveDetails = function(){
		if($scope.clientnm == undefined || $scope.prodnm == undefined){
			alert("Product or Client field cannot be blank");
			throw "Fields Cannot be Blank"; 
		}
		var SelDt=new Date();			
		SelDt.setDate(parseInt($('#selectDate').val().split('/')[1]));
		SelDt.setMonth(parseInt($('#selectDate').val().split('/')[0])-1);
		SelDt.setYear(parseInt($('#selectDate').val().split('/')[2]));
		console.log(SelDt.getTime());
		var stockObj={
			"selDt":SelDt.getTime(),
			"clientid":$scope.clientnm, 
			"prodid":$scope.prodnm, 
			"volume": $scope.volume
		};
		$http({
			method: 'POST',
			url: 'php/master.php?action=addstocks',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:stockObj
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data.status==true){
				$('form').append('<br/><strong class="text-success">Stocks Added Successfully</strong>');
				$('button[type="reset"]').trigger('click');
				setTimeout(function(){
					$('strong').remove();
				},2500);
			}
			else{
				$('form').append('<br/><strong class="text-danger">Error with Stocks Addition</strong>');				
				setTimeout(function(){
					$('strong').remove();
				},2500);
			}
		});
	};
});

stockmgmt.controller("ViewStockController", function($scope, $http, $route, $location){
	$('.fullData').hide();
	$('.noData').hide();
	$('.loadData').show();
	$http({
		method: 'POST',
		url: 'php/master.php?action=liststocks',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}		
	}).
	error(function(data, status, headers, config) {
		alert('Service Error');
	}).
	then(function(result){
		if(result.data.status==true){
			$('.fullData').show();
			$('.noData').hide();
			$('.loadData').hide();
			$scope.stockData=result.data.Stocks;
		}
		else{
			$('.fullData').hide();
			$('.noData').show();
			$('.loadData').hide();
		}
	});
	
	$scope.editStockDetails = function(scopeid){
		console.log(scopeid);
		$location.path('/view_stock_details:'+scopeid);
	};
});

stockmgmt.controller("DetailsStockController", function($scope, $http, $route, $routeParams, $location){
	$('button').attr('disabled','disabled');
	$http({
		method: 'POST',
		url: 'php/master.php?action=listdetailsstocks',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data:$routeParams.param.split(':')[1]
	}).
	error(function(data, status, headers, config) {
		alert('Service Error');
	}).
	then(function(result){
		if(result.data.status==true){
			$scope.prevDt=result.data.stock_date;
			$scope.stockid=result.data.stock_id;
			$scope.clientnm=result.data.client_name;
			$scope.prodnm=result.data.prod_name;
			$scope.volume=result.data.stock_vol;
			$('button').removeAttr('disabled');
		}
		else{
			alert('Error in Fetching data');
		}
	});
	
	$scope.updtStockDetails = function(){
		$('button').attr('disabled','disabled');
		console.log($scope.stockid);
		var mainObj={
			"stockid":$scope.stockid,
			"volume":$scope.volume
		};
		$http({
			method: 'POST',
			url: 'php/master.php?action=updatedetailsstocks',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:mainObj
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data.status==true){
				console.log('done');
				$('form').append('<br/><strong class="text-success">Stocks Updated Successfully</strong>');
				setTimeout(function(){
					$('strong').remove();					
				},2500);
				$('button').removeAttr('disabled');
			}
			else{
				$('form').append('<br/><strong class="text-danger">Error with Stocks Addition</strong>');				
				setTimeout(function(){
					$('strong').remove();
				},2500);
			}
		});
	};
	
	$scope.deleteStock =function(){
		console.log('del: '+$scope.stockid);
		$http({
			method: 'POST',
			url: 'php/master.php?action=deletedetailsstocks',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:$scope.stockid
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data.status==true){
				$location.path('/view_stock');
			}
			else{
				$('form').append('<br/><strong class="text-danger">Error with Stocks Deletion</strong>');				
				setTimeout(function(){
					$('strong').remove();
				},2500);
			}
		});
	};
});