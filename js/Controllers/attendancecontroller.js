stockmgmt.controller("AttendanceRegController", function($scope, $http, $route){
	$scope.today=new Date();
	$scope.showStartBtn=true;
	$scope.initCalls = function(){
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$("#startAttendance").attr('disabled','disabled');
		$http({
				method: 'POST',
				url: 'php/master.php?action=checkAttendanceDate',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				if(result.data!=""){
					var dt= new Date(parseInt(result.data));					
					var serverDt=dt.getDate();
					var serverMnt=dt.getMonth();
					var serverYr=dt.getFullYear();
					var ldt=new Date();
					var localdt=ldt.getDate();
					var localMnt = ldt.getMonth();
					var localYear=ldt.getFullYear();
					//alert(serverDt + ' - ' + serverMnt+ " - " + serverYr + " -*- " + localdt+ " - " + localMnt + " - " + localYear);
					if(serverDt == localdt && serverMnt == localMnt && serverYr == localYear){						
						$scope.showStartBtn=false;
						$scope.loadEmployeesData();
					}
					else{
						$scope.showStartBtn=true;
					}
				}
				else{
					$scope.showStartBtn=true;	
				}
				$("#startAttendance").removeAttr('disabled');				
			});
	};
	$scope.initCalls();
	
	$scope.startAttendance = function(){
		$http({
				method: 'POST',
				url: 'php/master.php?action=startAttendance',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				if(result.data.status==true){
					$scope.showStartBtn=false;
					$scope.EmployeeData=result.data.Employees;
					$(".fullData").show();
				}
				else{
					$scope.showStartBtn=true;
					$(".noData").show();
					alert('Service Error in Then');
				}
				$(".loadData").hide();
			});
	};
	
	$scope.loadEmployeesData = function(){
		$http({
				method: 'POST',
				url: 'php/master.php?action=AttendanceEmployees',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				if(result.data.status==true){					
					$scope.EmployeeData=result.data.Employees;
					$(".fullData").show();
				}
				else{
					$scope.showStartBtn=true;
					$(".noData").show();
					alert('Service Error!!!');
				}
				$(".loadData").hide();
			});
	};
	
	$scope.reload = function(){
		$route.reload();
	};
});