stockmgmt.controller("AttendanceRegController", function($scope, $http, $route){
	$scope.today=new Date();
	$scope.showStartBtn=false;
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
					$scope.loadEmployeesData();
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
	
	$scope.singleLogAttendance = function(eId){		
		var dt= new Date();
		var dateObj={
			"logId":eId,
			"Dt":dt.getDate(),
			"Mnt": dt.getMonth()+1,
			"Yr":dt.getFullYear(),
			"InTime":dt.getTime()
		};
		$http({
				method: 'POST',
				url: 'php/master.php?action=LogSingleAttendance',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: dateObj
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				$route.reload();
			});
	};
	
	$scope.singleLogoutAttendance = function(eId){
		var dt= new Date();
		var dateObj={
			"logId":eId,
			"OutTime":dt.getTime()
		};
		$http({
				method: 'POST',
				url: 'php/master.php?action=LogOutSingleAttendance',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: dateObj
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				$route.reload();
			});
	};
	
	$scope.AllUserLogin = function(){
		var dt= new Date();
		var dateObj={			
			"Dt":dt.getDate(),
			"Mnt": dt.getMonth()+1,
			"Yr":dt.getFullYear(),
			"InTime":dt.getTime()
		};
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllUserLogin',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: dateObj
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				$route.reload();
			});
	};
	
	$scope.AllUserLogout = function(){
		var dt= new Date();
		var dateObj={
			"OutTime":dt.getTime()
		};
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllUserLogOut',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: dateObj
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){	
				$route.reload();
			});
	};
	
	$scope.reload = function(){
		$route.reload();
	};
});

stockmgmt.controller("PrevAttendanceController", function($scope, $http, $route){
	$scope.filterAllTable=false;
	$scope.filterSpecificTable=false;

	$scope.fillEmployees = function(){
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllEmployees',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status==true){
					$scope.allEmployees=result.data.Employees;
				}
			});
	};
	$scope.fillEmployees();
	
	$scope.filterAll = function(){		
		var frmVal=$('#fromdtp').val().split('/');
		var toVal=$('#todtp').val().split('/');
		var dateObjs={
			"frmMnt":frmVal[0],
			"frmYr":frmVal[1],
			"toMnt":toVal[0],
			"toYr":toVal[1]
		};
		
		$scope.filterAllTable=true;
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=FilterAllRecords',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},	
				data:dateObjs
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				console.log(result.data)
				if(result.data.status){
					//$scope.EmployeeData=result.data.Employees;
					var Empl=result.data.Employees;
					for(var i=0;i<Empl.length;i++){
						var cnt=1;
						for(var j=i+1;j<Empl.length;j++){
							if(Empl[i].Employee_id==Empl[j].Employee_id){
								cnt++;
								Empl.splice(j,1);
								j--;
							}
						}
						Empl[i].noOfDaysPresent=cnt;
					}
					$scope.EmployeeData=Empl;
					console.log($scope.EmployeeData);
					$(".fullData").show();
				}
				else{
					$(".noData").show();
				}
					$(".loadData").hide();
			});
	};	
	
	$scope.filterSpecificEmp = function(){
		var frmVal=$('#fromSpecificdtp').val().split('/');
		var toVal=$('#toSpecificdtp').val().split('/');
		if($scope.selectedEmpName == undefined){
			alert("Please select an Employee");
			throw "EmpVal Cannot be Blank"; 
		}
		var EmpVal=$scope.selectedEmpName.split('_');
		var dateObjs={			
			"frmMnt":frmVal[0],
			"frmYr":frmVal[1],			
			"toMnt":toVal[0],
			"toYr":toVal[1],
			"empid":EmpVal[0]
		};
		
		$scope.filterAllTable=true;
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=FilterSpecificRecords',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},	
				data:dateObjs
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				$scope.filterSpecificTable=true;
				$scope.Employeenm=EmpVal[1];
				if(result.data.status){
					$scope.EmployeeSpecificData=result.data.Employees;					
					$(".fullData").show();
				}
				else{
					$(".noData").show();
				}
					$(".loadData").hide();
			});
	};
});


stockmgmt.controller("AttendanceCorrectionController", function($scope, $http, $route){
	$scope.filterCorrectSpecificTable=false;
	$scope.fillEmployees = function(){
		$http({
				method: 'POST',
				url: 'php/master.php?action=AllEmployees',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}				
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status==true){					
					$scope.allEmployees=result.data.Employees;
				}
			});
	};
	$scope.fillEmployees();
	
	$scope.filterSpecificEmpCorrection = function(){
		if($scope.selectedEmpName == undefined){
			alert("Please select an Employee");
			throw "EmpVal Cannot be Blank"; 
		}
		var selVal=$('#seldtp').val().split('/');
		var EmpVal=$scope.selectedEmpName.split('_');
		var dateObjs={
			"selMnt":selVal[0],
			"selDt":selVal[1],
			"selYr":selVal[2],
			"empid":EmpVal[0]
		};
		
		$scope.filterCorrectSpecificTable=true;
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=FilterRecordForCorrection',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},	
				data:dateObjs
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				console.log(result.data);
				$scope.Employeenm=EmpVal[1];
				//$scope.EmployeeCorrectSpecificData=result.data.Employees;
				
				if(result.data.status){					
					$(".fullData").show();
					var empData=result.data.Employees;
					$scope.login_date=empData.login_date;			
					$scope.login_month=empData.login_month;
					$scope.login_year=empData.login_year;
					$scope.login_time=empData.login_time;
					$scope.logout_time=empData.logout_time;
					$scope.empId=empData.Employee_id;
					$scope.login_id=empData.login_id;
				}
				else{
					$(".noData").show();
				}
					$(".loadData").hide();
			});
	};
	
	$scope.submitCorrectionChanges = function(){
		//$("#sellogintime").val()
		//$("#sellogouttime").val()
		if($("#sellogintime").val()!=""){
			var Indt=new Date();
			Indt.setDate($scope.login_date);
			Indt.setDate($scope.login_month);
			Indt.setDate($scope.login_year);
			Indt.setHours($("#sellogintime").val().split(":")[0]);
			Indt.setMinutes($("#sellogintime").val().split(":")[1].split(" ")[0]);
			console.log(Indt);
		}
		if($("#sellogouttime").val()!=""){
			var Outdt=new Date();
			console.log($scope.login_date + " - " +$scope.login_month+ " - " +$scope.login_year+ " - " +$("#sellogouttime").val().split(":")[0]+ " - " +$("#sellogouttime").val().split(":")[1].split(" ")[0])
			Outdt.setDate($scope.login_date);
			Outdt.setDate($scope.login_month);
			Outdt.setDate($scope.login_year);
			var hr=$("#sellogouttime").val().split(":")[0];
			var mins=$("#sellogouttime").val().split(":")[1].split(" ")[0];
			Outdt.setHours(hr);
			Outdt.setMinutes(mins);
			console.log("outDt: "+ Outdt);
		}
		//$("#sellogintime").val().split(":")[0]
	}
});