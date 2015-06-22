stockmgmt.controller("SalaryProcessController", function($scope, $http, $route){
	$scope.today=new Date();
	$("#showsalarybtn").show();
	$("#progressbar").hide();
	$("#tabulardata").hide();
	
	$scope.StartProcessingSalary = function(){
		$("#showsalarybtn").hide();
		$("#progressbar").show();
		$("#tabulardata").hide();
		
		var progressCnt=0;
		$("#salaryprogressbar").css('width',progressCnt+'%');
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
				var salData=result.data.Employees;
				if(result.data.status){
					var cnt=0;					
					var empId=salData[0].Employee_id;
					var salaryAmt=0;
					var tblshow=true;
					$scope.salaryObj=new Array();
					for(var i = 0; i < salData.length; i++) {
						(function(j) {
							progressCnt=progressCnt+(100/salData.length);
							$("#salaryprogressbar").css('width',progressCnt+'%');							
							if(empId==salData[j].Employee_id){
								//console.log(salData[j].logout_time-salData[j].login_time);
								/* (14400000-4hrs) -- (18000000-5hrs) -- (28800000-8hrs) -- (25200000-7hrs) */
								if(parseInt(salData[j].logout_time-salData[j].login_time)>=14400000 && parseInt(salData[j].logout_time-salData[j].login_time)<25200000){
									/* Processing Salary here */
									salaryAmt=salaryAmt+(parseInt(salData[j].Employee_sal)/2);
									//console.log("Half Day" + salData[j].Employee_id +" - " +salaryAmt + " --- " + parseInt(salData[j].logout_time-salData[j].login_time));
								}
								else if(parseInt(salData[j].logout_time-salData[j].login_time)>=25200000)
								{
									salaryAmt=salaryAmt+(parseInt(salData[j].Employee_sal));
									//console.log("Full Day" + salData[j].Employee_id +" - " +salaryAmt + " --- " + parseInt(salData[j].logout_time-salData[j].login_time));
								}
							}
							else{								
								var tmpObj={
									"Employee_id":empId,
									"Employee_Name":salData[j].Employee_nm,
									"salaryAmt":salaryAmt			
								};
								$scope.salaryObj.push(tmpObj);
								empId=salData[j].Employee_id;
								salaryAmt=0;
								i--;						
							}
							
						})(i);						
						if(progressCnt>=100 && tblshow && $scope.salaryObj.length){
							tblshow=false;
							setTimeout(function(){						
								$("#showsalarybtn").hide();
								$("#progressbar").hide();
								$("#tabulardata").show();
							},1500);
						}
					}
					var tmpObj={
						"Employee_id":empId,
						"Employee_Name":salData[salData.length-1].Employee_nm,
						"salaryAmt":salaryAmt			
					};
					$scope.salaryObj.push(tmpObj);
					console.log($scope.salaryObj);
				}
				else{
					alert("There is some Error. Please contact your Administrator.")
				}				
			});
	};
	
	$scope.UploadSalaryDetails = function(){
		$http({
				method: 'POST',
				url: 'php/master.php?action=UploadSalaryDetails',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data:{"salObj":$scope.salaryObj,"mnth":$scope.today.getMonth()+1,"yr":$scope.today.getFullYear()}
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			if(result.data.status==true){
				alert('Data Modified Successfully');
			}
			else{
				alert('Data modification failed.');
			}
		});
	};
});

stockmgmt.controller("SalaryPastProcessController", function($scope, $http, $route){
	$(".noData").hide();
	$(".loadData").hide();
	$(".fullData").hide();
	$scope.ShowSalaryDetails = function(){		
		$(".noData").hide();
		$(".loadData").show();
		$(".fullData").hide();
		var selMnth = $("#selectMnth").val();		
		$http({
				method: 'POST',
				url: 'php/master.php?action=FetchSalaryDetails',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data:{"mnth":selMnth.split('/')[0], "yr":selMnth.split('/')[1]}
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){			
			if(result.data.status==true){
				$(".noData").hide();
				$(".loadData").hide();
				$(".fullData").show();
				$scope.salaryObj=result.data.Employees;
			}
			else{
				$(".noData").show();
				$(".loadData").hide();
				$(".fullData").hide();				
			}
		});
	};
});