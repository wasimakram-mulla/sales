stockmgmt.controller("AddClientController", function($scope, $http){
	$scope.saveDetails = function(){
		$("button").attr("disabled","disabled");
		var mainObj={
			"client_name": $scope.cname,
			"client_addr": $scope.addr,
			"client_city": $scope.city,
			"client_pin" : $scope.pincode,
			"client_pcontact": $scope.pcontact,
			"client_acontact": $scope.acontact,
			"client_email": $scope.email
		};
	$http({
			method: 'POST',
			url: 'php/master.php?action=AddClient',
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
				$("form").append("<span class='text-success'>Added New Client</span>");
				setTimeout(function(){
					$("form span").fadeOut();
					$("form span").remove();
					console.log("removed");
					$("button").removeAttr("disabled");
					$("button[type='reset']").trigger('click');
				},2000);
			}
		});
	}
});

stockmgmt.controller("ClientsListController", function($scope, $http, $route){
	$scope.initCalls = function(){
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllClients',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},			
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status){
					$scope.clientData=result.data.clients;					
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
	
	$scope.SetCIdCname = function(cid, cnm){
		$scope.tmpCid=cid;
		$scope.tmpCname=cnm;
	};
	
	$scope.deactivateClient = function(cid){
		$http({
			method: 'POST',
			url: 'php/master.php?action=DeactivateClient',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:cid
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			$scope.initCalls();
		});
	};
	
	$scope.editClientDetails = function(clientId){
		$(".saveDetails").removeAttr('disabled');
		$("#myModal .modal-footer").prepend('<label class="text-info">Please Wait...</label>');		
		
		$http({
			method: 'POST',
			url: 'php/master.php?action=SpecificClientDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:clientId
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			$scope.cid=result.data.client_id;
			$scope.cname=result.data.client_name;
			$scope.addr=result.data.client_addr;
			$scope.city=result.data.client_city;
			$scope.pincode=result.data.pincode;
			$scope.pcontact=result.data.client_contact;
			$scope.acontact=result.data.client_alternate_contact;
			$scope.email=result.data.client_email;
			$("#myModal .modal-footer label").remove();
		});
	};
	
	$scope.saveEdittedDetails = function(){		
		var mainObj={
			"client_id": $scope.cid,
			"client_name": $scope.cname,
			"client_addr": $scope.addr,
			"client_city": $scope.city,
			"client_pin" : $scope.pincode,
			"client_pcontact": $scope.pcontact,
			"client_acontact": $scope.acontact,
			"client_email": $scope.email
		};
		$http({
			method: 'POST',
			url: 'php/master.php?action=UpdateClientDetails',
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

stockmgmt.controller("NonActiveClientsListController", function($scope, $http, $route){		
		$scope.initCalls = function(){
			$(".noData").hide();
			$(".fullData").hide();
			$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllDeactivatedClients',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},			
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status){
					$scope.clientData=result.data.clients;
					$(".fullData").show();
				}
				else{
					$(".noData").show();
				}
				$(".loadData").hide();
			});
	};
	
	$scope.initCalls();
	
	$scope.SetCIdCname = function(cid, cnm){
		$scope.tmpCid=cid;
		$scope.tmpCname=cnm;
	};
	
	
	$scope.reload = function(){
		$route.reload();
	};
	
	$scope.reactivateClient = function(cid){		
		$http({
			method: 'POST',
			url: 'php/master.php?action=reactivateClient',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:cid
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			$scope.initCalls();
		});	
	};
});
