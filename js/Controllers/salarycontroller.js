stockmgmt.controller("SalaryProcessController", function($scope, $http, $route){
	$scope.today=new Date();
	$scope.showsalarybtn=true;
	$scope.StartProcessingSalary = function(){
		$scope.showsalarybtn=false;
		$("#salaryprogressbar").css('width','0%');
		$http({
				method: 'POST',
				url: 'php/master.php?action=fetchsalaryinfo',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data:$scope.today.getMonth()+1
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				console.log(result.data);
				var salData=result.data.Employees;
				if(result.data.status){
					var empId=salData[0].Employee_id;
					var salaryAmt=0;
					var salaryObj={};
					for(var i = 0; i < salData.length; i++) {
						(function(j) {
							if(empId==salData[j].Employee_id){
								console.log(salData[j].logout_time-salData[j].login_time);
								//14400000 - 4 hrs && 18000000- 5 hrs
								if(parseInt(salData[j].logout_time-salData[j].login_time)>=14400000){
									console.log('');
								}
							}
							else{
								empId=salData[j].Employee_id;
							}
							//console.log(salData[j].login_id);
						})(i);
					}
				}
				else{
					alert("There is some Error. Please contact your Administrator.")
				}				
			});
	};
});