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
});

stockmgmt.controller("EmployeeDetailsController", function($scope, $http, $route, $routeParams){
	//alert($routeParams.param.slice(1))
	$scope.datapresent=true;
	$scope.initCalls = function(){
		$http({
				method: 'POST',
				url: 'php/master.php?action=FetchEmployeeDetails',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $routeParams.param.slice(1)
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				$scope.datapresent=result.data.status;
				if(result.data.status==true){
					var empData=result.data.Employees[0];
					$scope.ename=empData.Employee_name;
					$scope.pcontact=empData.Employee_pcontact;
					$scope.acontact=empData.Employee_acontact;
					$scope.email=empData.Employee_email;
					$scope.salperday=empData.Employee_salperday;
					$scope.doj=empData.Employee_doj;
					$scope.addr=empData.Employee_addr;
					$scope.city=empData.Employee_city;
					$scope.pincode=empData.Employee_pincode;
					$scope.prevEmplType=empData.Employee_emptype;
					$scope.prevEmpDesig=empData.Employee_empdesig;
					$scope.prevEmpDept=empData.Employee_empdept;
					$('.waitspinner').hide();					
				}
			});		
	};
	$scope.initCalls();
});