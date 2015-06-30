stockmgmt.controller("StartProjectController", function($scope, $http, $route){
	$scope.viewClients = function(){
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=SelClientFromStockDetails',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				if(result.data.status==true){
					$(".noData").hide();
					$(".fullData").show();
					$scope.clientData=result.data.clients;					
				}
				else{
					$(".fullData").hide();
					$(".noData").show();				
				}
				$(".loadData").hide();
			});
	};
	
	$scope.viewProducts = function(){		
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=SelProductFromClientDetails',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data:$scope.clientid
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				if(result.data.status==true){
					$(".noData").hide();
					$(".fullData").show();
					$scope.productData=result.data.productData;					
				}
				else{
					$(".fullData").hide();
					$(".noData").show();				
				}
				$(".loadData").hide();
			});
	};
	
	$scope.setClient = function(clientId,clientNm){
		$scope.clientid=clientId;
		$scope.clientnm=clientNm;
		$scope.prodid=undefined;
		$scope.prodnm=undefined;
		$scope.stockVol=undefined;
	};
	
	$scope.setProduct = function(prodId,prodNm,stockVol){
		$scope.prodid=prodId;
		$scope.prodnm=prodNm;
		$scope.stockVol=stockVol;
	};
	
	$scope.startnewproj = function(){
		if($scope.clientid==undefined || $scope.prodid==undefined){
			alert('Client or Product cannot be Empty...');
			throw "Fields Empty";
		}
		var starttime=new Date();
		starttime.setDate($("#startprjdt").val().split("/")[1]);
		starttime.setMonth(parseInt($("#startprjdt").val().split("/")[0])-1);
		starttime.setYear($("#startprjdt").val().split("/")[2]);
		
		var endtime=new Date();
		endtime.setDate($("#endprjdt").val().split("/")[1]);
		endtime.setMonth(parseInt($("#endprjdt").val().split("/")[0])-1);
		endtime.setYear($("#endprjdt").val().split("/")[2]);
		
		var mainObj={
			"clientid":$scope.clientid,
			"prodid":$scope.prodid,
			"startdt":starttime.getTime(),
			"enddt":endtime.getTime()
		};
		
		$http({
			method: 'POST',
			url: 'php/master.php?action=startnewproj',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:mainObj
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){	
			if(result.data.status==true){
				alert('Done');
			}
			else{
				alert('This Project is already in working phase.');
			}
		});
	};
});