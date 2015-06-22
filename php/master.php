<?php
//ini_set('error_reporting', E_STRICT);
include ("conn.php");
$action=$_GET['action'];

	if($action=='AddClient'){
		$data = json_decode(file_get_contents("php://input"));
		$insClientDetails ="INSERT INTO `client_master`(`client_name`, `client_addr`, `client_city`, `client_contact`, `client_alternate_contact`, `pincode`, `client_email`, `client_status`) VALUES ('".$data->client_name."','".$data->client_addr."','".$data->client_city."','".$data->client_pcontact."','".$data->client_acontact."',".$data->client_pin.",'".$data->client_email."','active')";
		$resultaddQry=mysql_query($insClientDetails);
		if($resultaddQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllClients'){
		$selclients="SELECT * FROM `client_master` where `client_status`='active'";
		$resclients=mysql_query($selclients);
		$count = mysql_num_rows($resclients);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resclients )) {
				$tmpRes[$cnt]->client_id=$row['client_id'];
				$tmpRes[$cnt]->client_name=$row['client_name'];
				$tmpRes[$cnt]->client_addr=$row['client_addr'];
				$tmpRes[$cnt]->client_city=$row['client_city'];
				$tmpRes[$cnt]->client_contact=$row['client_contact'];
				$tmpRes[$cnt]->client_alternate_contact=$row['client_alternate_contact'];
				$tmpRes[$cnt]->pincode=$row['pincode'];
				$tmpRes[$cnt]->client_email=$row['client_email'];			
				$cnt++;
			}
			$obj->status=true;
			$obj->clients=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllDeactivatedClients'){
		$selclients="SELECT * FROM `client_master` where `client_status`='deactive'";
		$resclients=mysql_query($selclients);
		$count = mysql_num_rows($resclients);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resclients )) {
				$tmpRes[$cnt]->client_id=$row['client_id'];
				$tmpRes[$cnt]->client_name=$row['client_name'];
				$tmpRes[$cnt]->client_addr=$row['client_addr'];
				$tmpRes[$cnt]->client_city=$row['client_city'];
				$tmpRes[$cnt]->client_contact=$row['client_contact'];
				$tmpRes[$cnt]->client_alternate_contact=$row['client_alternate_contact'];
				$tmpRes[$cnt]->pincode=$row['pincode'];
				$tmpRes[$cnt]->client_email=$row['client_email'];			
				$cnt++;
			}
			$obj->status=true;
			$obj->clients=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='SpecificClientDetails'){
		$data = json_decode(file_get_contents("php://input"));
		$selclient="SELECT * FROM `client_master` where `client_id`=".$data;
		$resclient=mysql_query($selclient);
		$rowclient = mysql_fetch_array($resclient,MYSQL_BOTH);
		$obj->client_id=$rowclient['client_id'];
		$obj->client_name=$rowclient['client_name'];
		$obj->client_addr=$rowclient['client_addr'];
		$obj->client_city=$rowclient['client_city'];
		$obj->client_contact=$rowclient['client_contact'];
		$obj->client_alternate_contact=$rowclient['client_alternate_contact'];
		$obj->pincode=$rowclient['pincode'];
		$obj->client_email=$rowclient['client_email'];
		echo json_encode($obj);
	}
	
	if($action=='UpdateClientDetails'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtClientDetails ="UPDATE `client_master` SET `client_name`='".$data->client_name."',`client_addr`='".$data->client_addr."',`client_city`='".$data->client_city."',`client_contact`='".$data->client_pcontact."',`client_alternate_contact`='".$data->client_acontact."',`pincode`=".$data->client_pin.",`client_email`='".$data->client_email."' WHERE `client_id`=".$data->client_id;
		$resultUpdtQry=mysql_query($UpdtClientDetails);
		if($resultUpdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='DeactivateClient'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtClientDetails ="UPDATE `client_master` SET `client_status`='deactive' WHERE `client_id`=".$data;
		$resultUpdtQry=mysql_query($UpdtClientDetails);
		if($resultUpdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='reactivateClient'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtClientDetails ="UPDATE `client_master` SET `client_status`='active' WHERE `client_id`=".$data;
		$resultUpdtQry=mysql_query($UpdtClientDetails);
		if($resultUpdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	/* Dealer Details */
	
	if($action=='AddDealer'){
		$data = json_decode(file_get_contents("php://input"));
		$insDealerDetails ="INSERT INTO `dealer_master`(`dealer_name`, `dealer_addr`, `dealer_city`, `dealer_contact`, `dealer_alternate_contact`, `pincode`, `dealer_email`, `dealer_status`) VALUES ('".$data->Dealer_name."','".$data->Dealer_addr."','".$data->Dealer_city."','".$data->Dealer_pcontact."','".$data->Dealer_acontact."',".$data->Dealer_pin.",'".$data->Dealer_email."','active')";
		$resultaddQry=mysql_query($insDealerDetails);
		if($resultaddQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllDealers'){
		$selDealers="SELECT * FROM `dealer_master` where `dealer_status`='active'";
		$resDealers=mysql_query($selDealers);
		$count = mysql_num_rows($resDealers);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resDealers )) {
				$tmpRes[$cnt]->Dealer_id=$row['dealer_id'];
				$tmpRes[$cnt]->Dealer_name=$row['dealer_name'];
				$tmpRes[$cnt]->Dealer_addr=$row['dealer_addr'];
				$tmpRes[$cnt]->Dealer_city=$row['dealer_city'];
				$tmpRes[$cnt]->Dealer_contact=$row['dealer_contact'];
				$tmpRes[$cnt]->Dealer_alternate_contact=$row['dealer_alternate_contact'];
				$tmpRes[$cnt]->pincode=$row['pincode'];
				$tmpRes[$cnt]->Dealer_email=$row['dealer_email'];			
				$cnt++;
			}
			$obj->status=true;
			$obj->Dealers=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllDeactivatedDealers'){
		$selDealers="SELECT * FROM `dealer_master` where `dealer_status`='deactive'";
		$resDealers=mysql_query($selDealers);
		$count = mysql_num_rows($resDealers);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resDealers )) {
				$tmpRes[$cnt]->Dealer_id=$row['dealer_id'];
				$tmpRes[$cnt]->Dealer_name=$row['dealer_name'];
				$tmpRes[$cnt]->Dealer_addr=$row['dealer_addr'];
				$tmpRes[$cnt]->Dealer_city=$row['dealer_city'];
				$tmpRes[$cnt]->Dealer_contact=$row['dealer_contact'];
				$tmpRes[$cnt]->Dealer_alternate_contact=$row['dealer_alternate_contact'];
				$tmpRes[$cnt]->pincode=$row['pincode'];
				$tmpRes[$cnt]->Dealer_email=$row['dealer_email'];			
				$cnt++;
			}
			$obj->status=true;
			$obj->Dealers=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='SpecificDealerDetails'){
		$data = json_decode(file_get_contents("php://input"));
		$selDealer="SELECT * FROM `dealer_master` where `dealer_id`=".$data;
		$resDealer=mysql_query($selDealer);
		$rowDealer = mysql_fetch_array($resDealer,MYSQL_BOTH);
		$obj->Dealer_id=$rowDealer['dealer_id'];
		$obj->Dealer_name=$rowDealer['dealer_name'];
		$obj->Dealer_addr=$rowDealer['dealer_addr'];
		$obj->Dealer_city=$rowDealer['dealer_city'];
		$obj->Dealer_contact=$rowDealer['dealer_contact'];
		$obj->Dealer_alternate_contact=$rowDealer['dealer_alternate_contact'];
		$obj->pincode=$rowDealer['pincode'];
		$obj->Dealer_email=$rowDealer['dealer_email'];
		echo json_encode($obj);
	}
	
	if($action=='UpdateDealerDetails'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtDealerDetails ="UPDATE `dealer_master` SET `dealer_name`='".$data->Dealer_name."',`dealer_addr`='".$data->Dealer_addr."',`dealer_city`='".$data->Dealer_city."',`dealer_contact`='".$data->Dealer_pcontact."',`dealer_alternate_contact`='".$data->Dealer_acontact."',`pincode`=".$data->Dealer_pin.",`dealer_email`='".$data->Dealer_email."' WHERE `dealer_id`=".$data->Dealer_id;
		$resultUpdtQry=mysql_query($UpdtDealerDetails);
		if($resultUpdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='DeactivateDealer'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtDealerDetails ="UPDATE `dealer_master` SET `dealer_status`='deactive' WHERE `dealer_id`=".$data;
		$resultUpdtQry=mysql_query($UpdtDealerDetails);
		if($resultUpdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='reactivateDealer'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtDealerDetails ="UPDATE `dealer_master` SET `dealer_status`='active' WHERE `dealer_id`=".$data;
		$resultUpdtQry=mysql_query($UpdtDealerDetails);
		if($resultUpdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	/* Product Details */
	
	if($action=='AddProduct'){
		$data = json_decode(file_get_contents("php://input"));
		$insProductDetails ="INSERT INTO `product_master`(`prod_name`) VALUES ('".$data->Product_name."')";
		$resultaddQry=mysql_query($insProductDetails);
		if($resultaddQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
		
	if($action=='AllProducts'){
		$selDealers="SELECT * FROM `product_master`";
		$resDealers=mysql_query($selDealers);
		$count = mysql_num_rows($resDealers);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resDealers )) {
				$tmpRes[$cnt]->Product_id=$row['prod_id'];
				$tmpRes[$cnt]->Product_name=$row['prod_name'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Products=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='SpecificProductDetails'){
		$data = json_decode(file_get_contents("php://input"));
		$selProduct="SELECT * FROM `product_master` where `prod_id`=".$data;
		$resProduct=mysql_query($selProduct);
		$rowProduct = mysql_fetch_array($resProduct,MYSQL_BOTH);
		$obj->Product_id=$rowProduct['prod_id'];
		$obj->Product_name=$rowProduct['prod_name'];
		echo json_encode($obj);
	}	
	
	if($action=='UpdateProductDetails'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtProductDetails ="UPDATE `product_master` SET `prod_name`='".$data->Product_name."' WHERE `prod_id`=".$data->Product_id;
		$resultUpdtQry=mysql_query($UpdtProductDetails);
		if($resultUpdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='deleteproduct'){
		$data = json_decode(file_get_contents("php://input"));
		$DelProductDetails ="DELETE FROM `product_master` WHERE `prod_id`=".$data;
		$resultDelQry=mysql_query($DelProductDetails);
		if($resultDelQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='getProdId'){
		$selProduct="SELECT MAX(`prod_id`) FROM `product_master`";
		$resProduct=mysql_query($selProduct);
		$rowProduct = mysql_fetch_array($resProduct,MYSQL_BOTH);
		
		$obj->Product_id=$rowProduct['MAX(`prod_id`)'];
		echo json_encode($obj);
	}
	
	/* GET Designations & Department */
	if($action=='getDesignations'){
		$selDesig="SELECT * FROM `designation_master`";
		$resDesig=mysql_query($selDesig);
		$count = mysql_num_rows($resDesig);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resDesig )) {
				$tmpRes[$cnt]->Desig_id=$row['desig_id'];
				$tmpRes[$cnt]->Desig_name=$row['desig_name'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Desigs=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='getDepartment'){
		$selDept="SELECT * FROM `department_master`";
		$resDept=mysql_query($selDept);
		$count = mysql_num_rows($resDept);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resDept )) {
				$tmpRes[$cnt]->Dept_id=$row['dept_id'];
				$tmpRes[$cnt]->Dept_name=$row['dept_name'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Dept=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	/* Employee Details */
	if($action=='AddEmployee'){
		$data = json_decode(file_get_contents("php://input"));
		$insEmplDetails ="INSERT INTO `employee_master`(`emp_name`, `emp_address`, `emp_city`, `emp_pincode`, `emp_pcontact`, `emp_acontact`, `emp_email`, `emp_dept`, `emp_desig`, `emp_type`, `emp_sal_per_day`, `emp_doj`, `emp_status`) VALUES ('".$data->emp_name."','".$data->emp_addr."','".$data->emp_city."',".$data->emp_pincode.",".$data->emp_pcontact.",".$data->emp_acontact.",'".$data->emp_email."','".$data->emp_department."','".$data->emp_designation."','".$data->emp_emplType."','".$data->emp_salperday."','".$data->emp_doj."','active')";
		$resultaddQry=mysql_query($insEmplDetails);
		if($resultaddQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllEmployees'){
		$selEmployees="SELECT * FROM `employee_master` where `emp_status`='active'";
		$resEmployees=mysql_query($selEmployees);
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];
				$tmpRes[$cnt]->Employee_name=$row['emp_name'];
				$tmpRes[$cnt]->Employee_pcontact=$row['emp_pcontact'];
				$tmpRes[$cnt]->Employee_city=$row['emp_city'];				
				$tmpRes[$cnt]->Employee_emptype=$row['emp_type'];
				$tmpRes[$cnt]->Employee_empdesig=$row['emp_desig'];
				$tmpRes[$cnt]->Employee_empdept=$row['emp_dept'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllInactiveEmployees'){
		$selEmployees="SELECT * FROM `employee_master` where `emp_status`='inactive'";
		$resEmployees=mysql_query($selEmployees);
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];
				$tmpRes[$cnt]->Employee_name=$row['emp_name'];
				$tmpRes[$cnt]->Employee_pcontact=$row['emp_pcontact'];
				$tmpRes[$cnt]->Employee_city=$row['emp_city'];				
				$tmpRes[$cnt]->Employee_emptype=$row['emp_type'];
				$tmpRes[$cnt]->Employee_empdesig=$row['emp_desig'];
				$tmpRes[$cnt]->Employee_empdept=$row['emp_dept'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}

	if($action=='FetchEmployeeDetails'){
		$data = json_decode(file_get_contents("php://input"));
		$selEmployees="SELECT * FROM `employee_master` where `emp_id`=".$data;
		$resEmployees=mysql_query($selEmployees);
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];
				$tmpRes[$cnt]->Employee_name=$row['emp_name'];
				$tmpRes[$cnt]->Employee_pcontact=$row['emp_pcontact'];
				$tmpRes[$cnt]->Employee_acontact=$row['emp_acontact'];
				$tmpRes[$cnt]->Employee_email=$row['emp_email'];		
				$tmpRes[$cnt]->Employee_salperday=$row['emp_sal_per_day'];
				$tmpRes[$cnt]->Employee_doj=$row['emp_doj'];			
				$tmpRes[$cnt]->Employee_addr=$row['emp_address'];			
				$tmpRes[$cnt]->Employee_city=$row['emp_city'];
				$tmpRes[$cnt]->Employee_pincode=$row['emp_pincode'];
				$tmpRes[$cnt]->Employee_emptype=$row['emp_type'];
				$tmpRes[$cnt]->Employee_empdesig=$row['emp_desig'];
				$tmpRes[$cnt]->Employee_empdept=$row['emp_dept'];
				$tmpRes[$cnt]->Employee_empstatus=$row['emp_status'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='UpdateEmployee'){
		$data = json_decode(file_get_contents("php://input"));
		$UpdtEmplDetails ="UPDATE `employee_master` SET `emp_name`='".$data->emp_name."',`emp_address`='".$data->emp_addr."',`emp_city`='".$data->emp_city."',`emp_pincode`=".$data->emp_pincode.",`emp_pcontact`=".$data->emp_pcontact.",`emp_acontact`=".$data->emp_acontact.",`emp_email`='".$data->emp_email."',`emp_dept`='".$data->emp_department."',`emp_desig`='".$data->emp_designation."',`emp_type`='".$data->emp_emplType."',`emp_sal_per_day`='".$data->emp_salperday."', `emp_status`='".$data->emp_status."' WHERE `emp_id`=".$data->emp_id;
		$resultupdtQry=mysql_query($UpdtEmplDetails);
		if($resultupdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	/* Attendance API's */
	if($action=='checkAttendanceDate'){
		$selLogin="SELECT max(`record_date`) FROM `attendance_register`";
		$resLogin=mysql_query($selLogin);
		$rowLogin = mysql_fetch_array($resLogin,MYSQL_BOTH);
		if($resLogin){
			echo $rowLogin['max(`record_date`)'];
		}
		else{
			echo "No Data";
		}
	}
	
	if($action=='startAttendance'){
		$tmpDate=date('U')*1000;	
		$insLogin="INSERT INTO `attendance_register` (`emp_id`, `record_date`, `login_status`) SELECT `emp_id`, '".$tmpDate."','absent' FROM `employee_master`  where `emp_status`='active'";
		$resLogin=mysql_query($insLogin);
		
		
		if($resLogin){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AttendanceEmployees'){
		$selLogin="SELECT max(`record_date`) FROM `attendance_register`";
		$resLogin=mysql_query($selLogin);
		$rowLogin = mysql_fetch_array($resLogin,MYSQL_BOTH);
		$tmpMaxRec= $rowLogin['max(`record_date`)'];
		
		
		$selEmployees="SELECT attendance_register.*, employee_master.* FROM attendance_register, employee_master WHERE attendance_register.emp_id = employee_master.emp_id and `record_date`='".$tmpMaxRec."' and employee_master.emp_status='active'";
		$resEmployees=mysql_query($selEmployees);
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];
				$tmpRes[$cnt]->Employee_name=$row['emp_name'];
				$tmpRes[$cnt]->Employee_pcontact=$row['emp_pcontact'];
				$tmpRes[$cnt]->Employee_city=$row['emp_city'];				
				$tmpRes[$cnt]->Employee_emptype=$row['emp_type'];
				$tmpRes[$cnt]->Employee_empdesig=$row['emp_desig'];
				$tmpRes[$cnt]->Employee_empdept=$row['emp_dept'];
				$tmpRes[$cnt]->Employee_loginStatus=$row['login_status'];
				$tmpRes[$cnt]->Employee_logId=$row['login_id'];
				$tmpRes[$cnt]->Employee_empStatus=$row['emp_status'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='LogSingleAttendance'){		
		$data = json_decode(file_get_contents("php://input"));
		$UpdtLogDetails ="UPDATE `attendance_register` SET `login_date`='".$data->Dt."',`login_month`='".$data->Mnt."',`login_year`='".$data->Yr."',`login_time`='".$data->InTime."',`login_status`='loggedIn' WHERE `login_id`=".$data->logId;
		$resultupdtQry=mysql_query($UpdtLogDetails);
		if($resultupdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='LogOutSingleAttendance'){
		
		$data = json_decode(file_get_contents("php://input"));
		$UpdtLogDetails ="UPDATE `attendance_register` SET `logout_time`='".$data->OutTime."',`login_status`='complete' WHERE `login_id`='".$data->logId."'";
		$resultupdtQry=mysql_query($UpdtLogDetails);
		if($resultupdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllUserLogin'){
		$selLogin="SELECT max(`record_date`) FROM `attendance_register`";
		$resLogin=mysql_query($selLogin);
		$rowLogin = mysql_fetch_array($resLogin,MYSQL_BOTH);
		$tmpMaxRec= $rowLogin['max(`record_date`)'];
		
		$data = json_decode(file_get_contents("php://input"));
		$UpdtLogDetails ="UPDATE `attendance_register` SET `login_date`='".$data->Dt."',`login_month`='".$data->Mnt."',`login_year`='".$data->Yr."',`login_time`='".$data->InTime."',`login_status`='loggedIn' WHERE `record_date`='".$tmpMaxRec."'";
		$resultupdtQry=mysql_query($UpdtLogDetails);
		if($resultupdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	if($action=='AllUserLogOut'){
		$selLogin="SELECT max(`record_date`) FROM `attendance_register`";
		$resLogin=mysql_query($selLogin);
		$rowLogin = mysql_fetch_array($resLogin,MYSQL_BOTH);
		$tmpMaxRec= $rowLogin['max(`record_date`)'];
		
		$data = json_decode(file_get_contents("php://input"));
		$UpdtLogDetails ="UPDATE `attendance_register` SET `logout_time`='".$data->OutTime."',`login_status`='complete' WHERE `record_date`='".$tmpMaxRec."'";
		$resultupdtQry=mysql_query($UpdtLogDetails);
		if($resultupdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	/* Previous Attendance API's	*/
	//FilterAllRecords
	if($action=='FilterAllRecords'){
		//SELECT * FROM `attendance_register` WHERE (`login_date`>='15' and `login_date`<='17') and (`login_month`>='5' and `login_month`<='5') and (`login_year`<='2015' and `login_year`<='2015')
		$data = json_decode(file_get_contents("php://input"));
		/* echo "FrmDt: ".$data->frmDt." - ".$data->frmMnt." - ".$data->frmYr." -*- ". $data->toDt." - ".$data->toMnt." - ".$data->toYr;
		exit; */
		$selEmployees="select attendance_register.*, employee_master.* FROM attendance_register, employee_master WHERE (attendance_register.login_month>=".$data->frmMnt." and attendance_register.login_month<=".$data->toMnt.") and (attendance_register.login_year<=".$data->frmYr." and attendance_register.login_year<=".$data->toYr.") and (attendance_register.emp_id = employee_master.emp_id)";
		$resEmployees=mysql_query($selEmployees);
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];
				$tmpRes[$cnt]->Employee_name=$row['emp_name'];
				$tmpRes[$cnt]->Employee_pcontact=$row['emp_pcontact'];
				$tmpRes[$cnt]->Employee_empdesig=$row['emp_desig'];
				$tmpRes[$cnt]->Employee_logId=$row['login_id'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//FilterSpecificRecords
	if($action=='FilterSpecificRecords'){
		
		$data = json_decode(file_get_contents("php://input"));
		/* echo "FrmDt: ".$data->frmDt." - ".$data->frmMnt." - ".$data->frmYr." -*- ". $data->toDt." - ".$data->toMnt." - ".$data->toYr. " *** ". $data->empid;
		exit; */
		$selEmployees="SELECT * FROM `attendance_register` WHERE ((`login_month`>='".$data->frmMnt."' and `login_month`<='". $data->toMnt."') and (`login_year`<='".$data->frmYr."' and `login_year`>='".$data->toYr. "') and emp_id=".$data->empid.") or (`login_status`='absent' and emp_id=".$data->empid.")";
		$resEmployees=mysql_query($selEmployees);
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];
				$tmpRes[$cnt]->login_date=$row['login_date'];
				$tmpRes[$cnt]->record_date=$row['record_date'];
				$tmpRes[$cnt]->login_month=$row['login_month'];
				$tmpRes[$cnt]->login_year=$row['login_year'];
				$tmpRes[$cnt]->login_time=$row['login_time'];
				$tmpRes[$cnt]->logout_time=$row['logout_time'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//FilterRecordForCorrection
	if($action=='FilterRecordForCorrection'){
		$data = json_decode(file_get_contents("php://input"));
		$selEmployees="SELECT * FROM `attendance_register` WHERE (`login_date`='".$data->selDt."' and `login_month`='".$data->selMnt."' and `login_year`='".$data->selYr."' and emp_id=".$data->empid.")";
		$resEmployees=mysql_query($selEmployees);
		$rowEmployees = mysql_fetch_array($resEmployees,MYSQL_BOTH);
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$tmpRes->login_id=$rowEmployees['login_id'];
			$tmpRes->Employee_id=$rowEmployees['emp_id'];
			$tmpRes->login_date=$rowEmployees['login_date'];
			$tmpRes->record_date=$rowEmployees['record_date'];
			$tmpRes->login_month=$rowEmployees['login_month'];
			$tmpRes->login_year=$rowEmployees['login_year'];
			$tmpRes->login_time=$rowEmployees['login_time'];
			$tmpRes->logout_time=$rowEmployees['logout_time'];
	
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//UpdateRecordForCorrection
	if($action=='UpdateRecordForCorrection'){
		$data = json_decode(file_get_contents("php://input"));
		$selLogin="SELECT distinct(`record_date`) FROM `attendance_register` WHERE `login_date`='".$data->selDt."' and `login_month`='".$data->selMnt."' and `login_year`='".$data->selYr."'";
		$resLogin=mysql_query($selLogin);
		$rowLogin = mysql_fetch_array($resLogin,MYSQL_BOTH);
		$tmpRec= $rowLogin['record_date'];
		
		$UpdtLogDetails ="UPDATE `attendance_register` SET `record_date`='".$tmpRec."',`login_date`='".$data->selDt."',`login_month`='".$data->selMnt."',`login_year`='".$data->selYr."',`login_time`='".$data->inTime."',`logout_time`='".$data->outTime."',`login_status`='complete' WHERE `login_id`=".$data->logId;
		$resultupdtQry=mysql_query($UpdtLogDetails);
		if($resultupdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//FilterAbsenteeRecordForCorrection
	if($action=='FilterAbsenteeRecordForCorrection'){
		$data = json_decode(file_get_contents("php://input"));
		$selEmployees="SELECT * FROM `attendance_register` WHERE (emp_id=".$data->empid." and login_status='absent')";
		$resEmployees=mysql_query($selEmployees);		
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->login_id=$row['login_id'];
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];				
				$tmpRes[$cnt]->record_date=$row['record_date'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//UpdtPresenteeOfEmployee
	if($action=='UpdtPresenteeOfEmployee'){
		$data = json_decode(file_get_contents("php://input"));
		//echo $data->selDt.' - '. $data->selMnt. ' - '. $data->selYr. ' - '. $data->inDt. ' - '. $data->outDt. ' - '. $data->logId;
		//exit;
		$UpdtLogDetails ="UPDATE `attendance_register` SET `login_date`='".$data->selDt."',`login_month`='".$data->selMnt."',`login_year`='".$data->selYr."',`login_time`='".$data->inDt."', `logout_time`='".$data->outDt."' ,`login_status`='complete' WHERE `login_id`=".$data->logId;
		$resultupdtQry=mysql_query($UpdtLogDetails);
		if($resultupdtQry){
			$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//fetchsalaryinfo
	if($action=='fetchsalaryinfo'){
		$data = json_decode(file_get_contents("php://input"));
		/* echo $data;
		exit; */		
		$selEmployees="SELECT * FROM `attendance_register`,`employee_master` WHERE (attendance_register.login_status='complete' and attendance_register.login_month=".$data." and attendance_register.emp_id=employee_master.emp_id) ORDER BY attendance_register.emp_id ASC";
		$resEmployees=mysql_query($selEmployees);		
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {
				$tmpRes[$cnt]->login_id=$row['login_id'];
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];				
				$tmpRes[$cnt]->Employee_nm=$row['emp_name'];				
				$tmpRes[$cnt]->Employee_sal=$row['emp_sal_per_day'];				
				$tmpRes[$cnt]->record_date=$row['record_date'];
				$tmpRes[$cnt]->login_time=$row['login_time'];
				$tmpRes[$cnt]->logout_time=$row['logout_time'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//UploadSalaryDetails
	if($action=='UploadSalaryDetails'){
		$data = json_decode(file_get_contents("php://input"));
		/* echo $data->salObj[0]->salaryAmt;
		exit; */
		$insSalMaster="INSERT INTO `salary_master`(`sal_month`, `sal_year`) VALUES ('".$data->mnth."','".$data->yr."')";
		$resSalMaster=mysql_query($insSalMaster);
		if($resSalMaster){
			$selSalM="SELECT max(`sal_id`) FROM `salary_master`";
			$resSalM=mysql_query($selSalM);
			$rowSalM = mysql_fetch_array($resSalM,MYSQL_BOTH);
			$tmpMaxId = $rowSalM['max(`sal_id`)'];
			if($resSalM){
				for($i=0;$i<count($data->salObj);$i++){
					$insSalMaster="INSERT INTO `salary_register`(`sal_id`, `emp_id`, `salary_amount`) VALUES (".$tmpMaxId.",".$data->salObj[$i]->Employee_id.",'".$data->salObj[$i]->salaryAmt."')";
					$resSalMaster=mysql_query($insSalMaster);
				}
				$obj->status=true;
			}
			else{
				$obj->status=false;
			}
			//$obj->status=true;
		}else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
	
	//FetchSalaryDetails
	if($action=='FetchSalaryDetails'){
		$data = json_decode(file_get_contents("php://input"));		
		$selEmployees="SELECT * FROM `employee_master`,`salary_register`,`salary_master` WHERE (salary_register.sal_id = (select sal_id from salary_master where sal_month='".$data->mnth."' and sal_year='".$data->yr."')) and (employee_master.emp_id=salary_register.emp_id)";
		$resEmployees=mysql_query($selEmployees);		
		$count = mysql_num_rows($resEmployees);
		if($count>0){
			$cnt=0;
			while($row = mysql_fetch_array( $resEmployees )) {				
				$tmpRes[$cnt]->Employee_id=$row['emp_id'];
				$tmpRes[$cnt]->Employee_nm=$row['emp_name'];
				$tmpRes[$cnt]->Employee_sal=$row['emp_sal_per_day'];
				$tmpRes[$cnt]->salary_amount=$row['salary_amount'];
				$cnt++;
			}
			$obj->status=true;
			$obj->Employees=$tmpRes;
		}
		else{
			$obj->status=false;
		}
		echo json_encode($obj);
	}
?>