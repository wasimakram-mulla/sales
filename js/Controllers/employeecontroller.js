stockmgmt.controller("AddEmployeeController", function($scope, $http){	
	$(".waitspinner").hide();
	$scope.getDesignations = function(){
		$http({
			method: 'POST',
			url: 'php/master.php?action=getDesignations',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data){
				$scope.desigs=result.data.Desigs;
			}
		});
	};
	$scope.getDesignations();
	
	$scope.getDepartment = function(){
		$http({
			method: 'POST',
			url: 'php/master.php?action=getDepartment',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}			
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data){
				$scope.dept=result.data.Dept;				
			}
		});
	};
	$scope.getDepartment();
	$scope.saveDetails = function(){
		$("button").attr("disabled","disabled");
		$(".waitspinner").show();
		var mainObj={
			"emp_name": $scope.ename,
			"emp_addr": $scope.addr,
			"emp_city": $scope.city,
			"emp_pincode" : $scope.pincode,
			"emp_pcontact": $scope.pcontact,
			"emp_acontact": $scope.acontact,
			"emp_salperday": $scope.salperday,
			"emp_email": $scope.email,
			"emp_emplType": $scope.emplType,
			"emp_designation": $scope.designation,
			"emp_department": $scope.department,
			"emp_doj": new Date($("#datetimepicker1").val()).getTime()
		};		
	$http({
			method: 'POST',
			url: 'php/master.php?action=AddEmployee',
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
				setTimeout(function(){
					$("form").append("<span class='text-success'>Added New Employee</span>");
					$("form span").fadeOut();
					$("form span").remove();
					console.log("removed");
					$("button").removeAttr("disabled");
					$("button[type='reset']").trigger('click');
					$(".waitspinner").hide();
				},3000);
			}
		});
	}
});

stockmgmt.controller("EmployeesListController", function($scope, $http, $route){
	$scope.initCalls = function(){
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllEmployees',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},			
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status){
					$scope.EmployeeData=result.data.Employees;					
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
	
	$scope.deactivateDealer = function(cid){
		$http({
			method: 'POST',
			url: 'php/master.php?action=DeactivateDealer',
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
	
	$scope.editDealerDetails = function(DealerId){
		$(".saveDetails").removeAttr('disabled');
		$("#myModal .modal-footer").prepend('<label class="text-info">Please Wait...</label>');		
		
		$http({
			method: 'POST',
			url: 'php/master.php?action=SpecificDealerDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:DealerId
		}).
			success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			$scope.cid=result.data.Dealer_id;
			$scope.cname=result.data.Dealer_name;
			$scope.addr=result.data.Dealer_addr;
			$scope.city=result.data.Dealer_city;
			$scope.pincode=result.data.pincode;
			$scope.pcontact=result.data.Dealer_contact;
			$scope.acontact=result.data.Dealer_alternate_contact;
			$scope.email=result.data.Dealer_email;
			$("#myModal .modal-footer label").remove();
		});
	};
	
	$scope.saveEdittedDetails = function(){		
		var mainObj={
			"Dealer_id": $scope.cid,
			"Dealer_name": $scope.cname,
			"Dealer_addr": $scope.addr,
			"Dealer_city": $scope.city,
			"Dealer_pin" : $scope.pincode,
			"Dealer_pcontact": $scope.pcontact,
			"Dealer_acontact": $scope.acontact,
			"Dealer_email": $scope.email
		};
		$http({
			method: 'POST',
			url: 'php/master.php?action=UpdateDealerDetails',
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