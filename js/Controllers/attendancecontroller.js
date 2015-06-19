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
		$("#dtpValuesInOut").hide();
		$scope.CorrectionSubmitBtn=false;
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
					$("#dtpValuesInOut").show();
					if($scope.login_time!=null && $scope.logout_time!=null){						
						$scope.CorrectionSubmitBtn=true;
					}
					else{						
						$scope.CorrectionSubmitBtn=false;
					}
				}
				else{
					$(".noData").show();
				}
					$(".loadData").hide();
			});
	};
	
	$scope.submitCorrectionChanges = function(){	
		
		if($scope.logout_time==null){
			var Outdt=new Date();			
			Outdt.setDate(parseInt($scope.login_date));
			Outdt.setMonth(parseInt($scope.login_month)-1);
			Outdt.setYear(parseInt($scope.login_year));
			var hr=$("#sellogouttime").val().split(":")[0];
			var mins=$("#sellogouttime").val().split(":")[1];
			Outdt.setHours(parseInt(hr));
			Outdt.setMinutes(parseInt(mins));
			$scope.logout_time=Outdt.getTime();
		}
		
		var selVal=$("#seldtp").val().split('/');
		var dateObjs={
			"inTime":$scope.login_time,
			"outTime":$scope.logout_time,
			"logId":$scope.login_id,
			"selDt":selVal[1],
			"selMnt":selVal[0],
			"selYr":selVal[2]
		};
		
		$http({
				method: 'POST',
				url: 'php/master.php?action=UpdateRecordForCorrection',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},	
				data:dateObjs
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status==true){
					$route.reload();
				}
				else{
					alert('Data cannot be updated. Please confirm your administrator');					
				}
		});
	}
});

stockmgmt.controller("AbsenteeCorrectionController", function($scope, $http, $route){
	$scope.filterAbsenteeDetailsTable=false;
	$scope.showRecFoundNtFound=false;
	$scope.showRecFoundNtFound1=false;
	$('.recordSuccess').hide();
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
	
	$scope.filterAbsentEmployee = function(){
		if($scope.selectedEmpName == undefined){
				alert("Please select an Employee");
				throw "EmpVal Cannot be Blank"; 
		}		
		var EmpVal=$scope.selectedEmpName;
		var dateObjs={
			"empid":EmpVal
		};
		
		$scope.filterAbsenteeDetailsTable=true;
		$scope.showRecFoundNtFound=false;
		$scope.showRecFoundNtFound1=false;
		$(".noData").hide();
		$(".fullData").hide();
		$(".loadData").show();
		$http({
				method: 'POST',
				url: 'php/master.php?action=FilterAbsenteeRecordForCorrection',
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
				var selVal=$('#seldtp').val().split('/');
				var tmpEmpData;
				if(result.data.status==true){					
					$(".fullData").show();
					var fetchedData=result.data.Employees;
					for(var i=0;i<fetchedData.length;i++){
						var dt=new Date(parseInt(fetchedData[i].record_date));
						if(((parseInt(selVal[0]))==dt.getMonth()+1) && ((parseInt(selVal[1]))==dt.getDate()) && ((parseInt(selVal[2]))==dt.getFullYear())){
							tmpEmpData=fetchedData[i];
							break;
						}
					}					
				}
				else{					
					$(".noData").show();
				}
				if(tmpEmpData!=undefined){
					$(".loadData").hide();
					$scope.login_id=tmpEmpData.login_id;					
					$scope.showRecFoundNtFound1=true;
				}
				else{
					$scope.showRecFoundNtFound=true;
					$(".loadData").hide();
				}
				
			});
	};
	
	$scope.submitPresentee = function(){
		var selVal=$("#seldtp").val().split('/');
		var Indt=new Date();
		Indt.setDate(parseInt(selVal[1]));
		Indt.setMonth(parseInt(selVal[0])-1);
		Indt.setYear(parseInt(selVal[2]));
		Indt.setHours(parseInt($("#sellogintime").val().split(":")[0]));
		Indt.setMinutes(parseInt($("#sellogintime").val().split(":")[1]));		
		var tmpIndt=Indt.getTime();
		
		var Outdt=new Date();			
		Outdt.setDate(parseInt(selVal[1]));
		Outdt.setMonth(parseInt(selVal[0])-1);
		Outdt.setYear(parseInt(selVal[2]));
		var hr=$("#sellogouttime").val().split(":")[0];
		var mins=$("#sellogouttime").val().split(":")[1];
		Outdt.setHours(parseInt(hr));
		Outdt.setMinutes(parseInt(mins));
		$scope.logout_time=Outdt.getTime();
		var tmpOutdt=Outdt.getTime();
		console.log(tmpIndt + " -*- " + tmpOutdt);
		var dateObjs={			
			"logId":$scope.login_id,
			"selDt":selVal[1],
			"selMnt":selVal[0],
			"selYr":selVal[2],
			"inDt":tmpIndt,
			"outDt":tmpOutdt
		};
		$http({
				method: 'POST',
				url: 'php/master.php?action=UpdtPresenteeOfEmployee',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data:dateObjs
			}).
				success(function(data, status, headers, config) {
			}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).
			then(function(result){
				if(result.data.status==true){					
					console.log(result.data);
					$('.recordSuccess').show();
					$scope.showRecFoundNtFound=false;
					$scope.showRecFoundNtFound1=false;
					setTimeout(function(){
						$('.recordSuccess').hide();
						$route.reload();
					},2000);
				}
				else{
					alert('Record Cannot be updated. Please contact your Administrator');
				}
		});		
	};
});