stockmgmt.controller("AttendanceRegController", function($scope, $http){
	$scope.today=new Date();
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
					for(var i=0;i<result.data.Employees.length;i++)
					{
						$scope.EmployeeData[i].loginStatus=false;
					}
					$(".fullData").show();
					console.log($scope.EmployeeData)
				}
				else{
					$(".noData").show();
				}
					$(".loadData").hide();
			});
	};
	$scope.initCalls();
});