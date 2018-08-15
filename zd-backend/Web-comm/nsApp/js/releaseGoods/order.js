var app = angular.module('myApp', []);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
    });
}]);

app.controller('AppCtrl', ['$scope', '$http','$interval','$location', function ($scope, $http,$interval,$location) {
	
	$scope.orderId=$location.search().id;
	$scope.isAudit=0;
	
	
	//获取订单详情
	$scope.getOrderDetail=function(){
		$http.get(Utils.baseUrl+'pass/getById',{  
		    params: { 'id': $scope.orderId },
		    headers:{'Authorization':$location.search().access_token}
		})  
		.success(function(response){  
		     if(response.result){
		     	var startTime=response.data.applyPassStartTime;
		     	var startArray=startTime.split(" ");
		     	var endTime=response.data.applyPassEndTime;
		     	var endArray=endTime.split(" ");
		     	var day,time;
		     	if(startArray[0]==endArray[0]){
		     		day=startArray[0];
		     		time=day + " " + startArray[1]+ "-" + endArray[1];
		     	}else{
		     		time = startTime + "至" + endTime;
		     	}
		     	response.data.releaseTime=time;
		     	
		     	//需放行人名称
		     	response.data.needPassName=response.data.needPassPersonnelName;
		     	response.data.needPassOrg=response.data.needPassPersonnelDept;
     			response.data.needPassMobile=response.data.needPassPersonnelMobile;
		     	
	     		if(response.data.takeType==0){
	     			response.data.needPassName=response.data.createUserName;
	     			response.data.needPassOrg=response.data.createUserDeptName;
	     			response.data.needPassMobile=response.data.createUserMobile;
	     		}
		     	
		     	for(var i=0;i<response.data.file.length;i++){
		     		response.data.file[i].filePath=Utils.setSlash(response.data.file[i].filePath);
		     	}
				$scope.orderDetail=response.data;
				
				
				if(response.data.currentSteps.length>0 && response.data.currentSteps[0]=="5" && response.data.currentSteps[1]=="6" ){
					if(response.data.ext1=='1'){
						if(response.data.orderStatus=="3"){
							$scope.isAudit=1;
						}else{
							$scope.isAudit=0;
						}
					}else{
						if(response.data.orderStatus=="1"){
							$scope.isAudit=1;
						}else{
							$scope.isAudit=0;
						}
					}
				}else{
					$scope.isAudit=0;
				}
				

			}else{
				setTimeout(function(){
					Utils.setTipBox(response.message);
				},200);
			}
		}).error(function (error) {
			$scope.closeOrOpenTipBox('close');
			var msg = "获取数据失败，请重试！";
			Utils.setTipBox(msg);
		}); 
	}
	
	//订单审批
	$scope.auditOrder=function(type){
		var param;
		if(type=="reject"){
			if(!$("[name='rejectText']").val()){
				Utils.setTipBox("若拒绝请输入原因！");
				return;
			}
			$scope.rejectReason=$("[name='rejectText']").val();
			param={ id:$scope.orderId ,operate:6 , remark : $("[name='rejectText']").val() };
		}else if(type=="agree"){
			param={ id:$scope.orderId ,operate:5 };
		}
		
		$scope.closeOrOpenTipBox('loading');
		
		$http.get(Utils.baseUrl+'pass/scanApproval',{  
		    params: param,
		    headers:{'Authorization':$location.search().access_token}
		})  
		.success(function(response){  
		     if(response.result){
		     	setTimeout(function(){
					$scope.closeOrOpenTipBox('open',type);
					$scope.getOrderDetail();
				},2000);
				
			}else{
				$scope.closeOrOpenTipBox('close');
				setTimeout(function(){
					Utils.setTipBox(response.message);
				},200);
			}
		}).error(function (error) {
			$scope.closeOrOpenTipBox('close');
			var msg = "提交失败，请重试！";
			Utils.setTipBox(msg);
		}); 
		
	}
	
	var countDownFn;
	
	//倒计时
	$scope.countDownFn=function(type){
		if($scope.countDown>0){
			$scope.countDown--;
		}else{
			if($scope.loadType=="load"){
				$interval.cancel(countDownFn);
				$scope.loadType="";
			}else{
				$interval.cancel(countDownFn);
				$(".successfulBox").removeClass("show");
				$(".masking").fadeOut();
			}
		}
	}
	
	//关闭提示框
	$scope.closeOrOpenTipBox=function(type,operateType){
		if(type=="open"){
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			if(operateType=="reject"){
				$scope.orderState="拒绝成功";
				$scope.orderStateInfo="放行拒绝成功";
			}else{
				$scope.orderState="放行成功";
				$scope.orderStateInfo="放行成功";
			}
			$scope.countDown=3;
			countDownFn=$interval($scope.countDownFn,1000);  
			setTimeout(function(){
				$scope.orderStateStr=operateType;
				$scope.orderFinish=1;
			},2800);
		}else if(type=="close"){
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
		}else if(type=="loading"){
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.orderState="提交中…";
			$scope.orderStateInfo="订单提交中，请稍等…";
			$scope.countDown=2;
			$scope.loadType="load";
			countDownFn=$interval($scope.countDownFn,1000);  
		}
	}
	
	$(function(){
		//获取订单详情
		$scope.getOrderDetail();
	})

}]);


app.filter("setUserType",function($sce){
	return function(appraise){
		var takeType="";
		
		if(appraise.takeType==0){
			takeType="本人";
		}else{
			takeType="其他";
		}
		
		return takeType;
	}
});

app.filter("getOrderStatus", function ($sce) {
	return function (appraise) {
		var statusStr = "";
		if (appraise.status == '0') {
			statusStr = "已提交";
		}else{
			if(appraise.ext=='1'){
				if (appraise.status == '1') {
					statusStr = "一级审核通过";
				}else if (appraise.status == '2') {
					statusStr = "一级审核驳回";
				}else if (appraise.status == '3') {
					statusStr = "二级审核通过";
				}else if (appraise.status == '4') {
					statusStr = "二级审核驳回";
				}else if (appraise.status == '5') {
					statusStr = "已放行";
				}else if (appraise.status == '6') {
					statusStr = "拒绝放行";
				}
			}else{
				if (appraise.status == '1') {
					statusStr = "审核通过";
				}else if (appraise.status == '2') {
					statusStr = "审核驳回";
				}else if (appraise.status == '5') {
					statusStr = "已放行";
				}else if (appraise.status == '6') {
					statusStr = "拒绝放行";
				}
			}
		}
		
		return statusStr;
	}
});