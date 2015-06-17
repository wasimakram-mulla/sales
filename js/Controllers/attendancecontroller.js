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
	$scope.filterAll = function(){
		
		//console.log($('#fromdtp').val())
		var frmVal=$('#fromdtp').val().split('/');
		var toVal=$('#todtp').val().split('/');
		var dateObjs={
			"frmDt":frmVal[1],
			"frmMnt":frmVal[0],
			"frmYr":frmVal[2],
			"toDt":toVal[1],
			"toMnt":toVal[0],
			"toYr":toVal[2]
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
});