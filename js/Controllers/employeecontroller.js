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
			"emp_designation": $scope.designation.Dept_name,
			"emp_department": $scope.department.Desig_name,
			"emp_doj": $scope.doj
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
				$("form").append("<span class='text-success'>Added New Employee</span>");
				setTimeout(function(){
					$("form span").fadeOut();
					$("form span").remove();
					console.log("removed");
					$("button").removeAttr("disabled");
					$("button[type='reset']").trigger('click');
				},3000);
			}
		});
	}
});