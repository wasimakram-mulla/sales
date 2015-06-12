stockmgmt.controller("AddProductController", function($scope, $http){	
	$scope.getProdId = function(){
		$(".prodname").attr("disabled","disabled");
		$http({
				method: 'POST',
				url: 'php/master.php?action=getProdId',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},			
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.Product_id!=null){
					$scope.prodid=parseInt(result.data.Product_id)+1;
				}
				else{
					$scope.prodid='First Product';
				}
				$(".prodname").removeAttr("disabled");
				$(".waitspinner").hide();
			});
	};
	$scope.getProdId();
	
	$scope.saveDetails = function(){
		$("button").attr("disabled","disabled");
		var mainObj={
			"Product_id": $scope.prodid,
			"Product_name": $scope.prodname
		};
	$http({
			method: 'POST',
			url: 'php/master.php?action=AddProduct',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: mainObj
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data){
				$("form").append("<span class='text-success'>Added New Product</span>");
				setTimeout(function(){
					$("form span").fadeOut();
					$("form span").remove();
					console.log("removed");
					$("button").removeAttr("disabled");
					$("button[type='reset']").trigger('click');
					$scope.getProdId();
				},2000);
			}
		});
	}
});

stockmgmt.controller("ProductListController", function($scope, $http, $route){
	$scope.initCalls = function(){
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllProducts',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},			
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status){
					$scope.ProductData=result.data.Products;					
					$(".fullData").show();
				}
				else{
					$(".noData").show();
				}
					$(".loadData").hide();
			});
	};
	$scope.initCalls();
	
	$scope.reload = function(){
		$route.reload();
	};
	
	$scope.SetPIdPname = function(pid, pnm){
		$scope.tmpPid=pid;
		$scope.tmpPname=pnm;
	};
	
	$scope.deleteproduct = function(pid){
		$http({
			method: 'POST',
			url: 'php/master.php?action=deleteproduct',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:pid
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			$scope.initCalls();
			alert('Deleted');
		});
	};
	
	$scope.editProductDetails = function(ProductId){
		$(".saveDetails").removeAttr('disabled');
		$("#myModal .modal-footer").prepend('<label class="text-info">Please Wait...</label>');		
		
		$http({
			method: 'POST',
			url: 'php/master.php?action=SpecificProductDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:ProductId
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			$scope.prodid=result.data.Product_id;
			$scope.prodname=result.data.Product_name;
			$("#myModal .modal-footer label").remove();
		});
	};
	
	$scope.saveEdittedProductDetails = function(){		
		var mainObj={
			"Product_id": $scope.prodid,
			"Product_name": $scope.prodname
		};
		$http({
			method: 'POST',
			url: 'php/master.php?action=UpdateProductDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: mainObj
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data.status){
				$("#myModal .modal-footer").prepend('<label class="text-success">Changes Updated...</label>');
				$(".saveDetails").attr('disabled',"disabled");
				setTimeout(function(){
					$("#myModal .modal-footer label").remove();
				},2000);
				$scope.initCalls();
			}
			else{
				$("#myModal .modal-footer").prepend('<label class="text-danger">Server Error!!! Please Update Changes Again...</label>');
				setTimeout(function(){
					$("#myModal .modal-footer label").remove();
				},2000);
			}
		});
	};
});