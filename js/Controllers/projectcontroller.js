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

stockmgmt.controller("ModifyProjectController", function($scope, $http, $route){
	$scope.viewProjects = function(){
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=SelActiveProjects',
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
					$scope.ProjData=result.data.projectData;					
				}
				else{
					$(".fullData").hide();
					$(".noData").show();				
				}
				$(".loadData").hide();
			});
	};
		
	$scope.setProjectData = function(projid,client_name,prod_name,start_date,est_end_date,stock_volume,stock_id){
		$scope.projid=projid;
		$scope.clientnm=client_name;
		$scope.prodnm=prod_name;
		$scope.stockavail=stock_volume;
		$scope.stock_id=stock_id;
	};
	
	$scope.companyProds = function(){
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
					$scope.compproddata=result.data.Products;
				}
				else{
					alert("Please enter a Company products first");
				}				
			});
	};
	$scope.companyProds();
	
	$scope.addproject = function(){
		console.log('in addproject');
		if($scope.compprod==undefined){
			alert("Select company's product");
			throw "Select company's product";
		}		
		if((parseInt($scope.stockavail)-parseInt($scope.stockused))<0){
			alert('Stock Used cannot be more than Stock Available');
			throw 'Stock Used cannot be more than Stock Available';
		}
		
		if(parseInt($scope.stockused)<0 || parseInt($scope.outputmade)<0){
			alert('Entries Cannot be Negative');
			throw 'Entries Cannot be Negative';
		}
		var dt=new Date();
		var makeprjObj={
			"prjid":$scope.projid,
			"prodid":$scope.compprod,
			"stockused":parseInt($scope.stockused),
			"stockrem":(parseInt($scope.stockavail)-parseInt($scope.stockused)),
			"stockid":$scope.stock_id,
			"outputcreated":$scope.outputmade,
			"work_date":dt.getTime()
		};
		$http({
				method: 'POST',
				url: 'php/master.php?action=makeproject',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data:makeprjObj
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				if(result.data.status==true){
					$(".btn.btn-sm.btn-success").parent().append(' <span class="text-success">Work Modified Successful</span>');
					setTimeout(function(){
						$route.reload();
					},2000);
				}
				else{
					alert("Error... Please contact Administrator");
				}				
			});
	};
});