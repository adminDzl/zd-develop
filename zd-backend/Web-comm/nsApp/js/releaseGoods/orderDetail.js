var app = angular.module('myApp', []);

app.config(['$locationProvider', function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
	});
}]);

app.controller('AppCtrl', ['$scope', '$http', '$interval', '$location', function ($scope, $http, $interval, $location) {

	$scope.orderFinish = 0;
	$scope.orderId = $location.search().id;
	$scope.renew = $location.search().renew ? 1 : 0;

	//续签
	$scope.goIndex = function () {
		location.href = "index.html?id=" + $location.search().id + "&access_token=" + $location.search().access_token;
	}

	//获取订单详情
	$scope.getOrderDetail = function () {
		$http.get(Utils.baseUrl + 'pass/getById', {
			params: { 'id': $location.search().id },
			headers: { 'Authorization': $location.search().access_token }
		})
		.success(function (response) {
			if (response.result) {
				var startTime = response.data.applyPassStartTime;
				var startArray = startTime.split(" ");
				var endTime = response.data.applyPassEndTime;
				var endArray = endTime.split(" ");
				var day, time;
				if (startArray[0] == endArray[0]) {
					day = startArray[0];
					time = day + " " + startArray[1] + "-" + endArray[1];
				} else {
					time = startTime + "至" + endTime;
				}
				response.data.releaseTime = time;

				//需放行人名称
				response.data.needPassName = response.data.needPassPersonnelName;
				response.data.needPassOrg = response.data.needPassPersonnelDept;
				response.data.needPassMobile = response.data.needPassPersonnelMobile;

				if (response.data.takeType == 0) {
					response.data.needPassName = response.data.createUserName;
					response.data.needPassOrg = response.data.createUserDeptName;
					response.data.needPassMobile = response.data.createUserMobile;
				}

				for (var i = 0; i < response.data.file.length; i++) {
					response.data.file[i].filePath = Utils.setSlash(response.data.file[i].filePath);
				}
				$scope.orderDetail = response.data;
				
				if(response.data.ext1=="1"){
					if(response.data.orderStatus=='3'){
						$scope.orderFinish = 1;
					}else{
						$scope.orderFinish = 0;
					}
				}else{
					if(response.data.orderStatus=='1'){
						$scope.orderFinish = 1;
					}else{
						$scope.orderFinish = 0;
					}
				}
				
				$scope.judgeState(Number(response.data.orderStatus),response.data.ext1);


			} else {
				setTimeout(function () {
					Utils.setTipBox(response.message);
				}, 200);
			}
		}).error(function (error) {
			$scope.closeOrOpenTipBox('close');
			var msg = "获取数据失败，请重试！";
			Utils.setTipBox(msg);
		});
	}


	//判断状态
	$scope.judgeState = function (orderState,ext) {
		//0:已提交 1：已审核 2：已放行 5:已驳回
		if (orderState == 0) {
			$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
		} else if (orderState == 1 || orderState==3 || orderState==5) {
			if(ext=='1'){
				if(orderState>1){
					$(".orderStateBox > div em").css("width", (Number(orderState)-1) * 35 + '%');
				}else{
					$(".orderStateBox > div em").css("width", Number(orderState) * 38 + '%');
				}
			}else{
				$(".orderStateBox > div em").css("width", Number(orderState) * 50 + '%');
			}
			
		} else{
			$(".orderStateBox > div em").css("width",'100%');
			$(".orderStateBox").addClass("rejectOrder");
		}
	};

	$scope.share = function (type) {
		if (type == 'qq') {
			Utils.setTipBox('正在开发');
			return;
		}
		window.ccapi.shareTo({
			title: "物品放行", // 分享标题
			desc: "物品放行审核二维码", //分享描述
			link: 'http://qr.topscan.com/api.php?text=' + $scope.orderDetail.qrCodeUrl, // 分享链接
			imgUrl: 'http://qr.topscan.com/api.php?text=' + $scope.orderDetail.qrCodeUrl, // 分享图标完整url
			type: type == 'weixin' ? 'weixin' : 'qq', // 分享类型: weixin，qq，sms，email    

			success: function (res) {
			},
			fail: function (res) {
				Utils.setTipBox(res);
			}
		});
	};

	// 审核操作
	$scope.checkAuth = function (type,approveType) {
		var param;
		if (type == "reject") {
			if (!$("[name='rejectText']").val()) {
				Utils.setTipBox("若驳回请输入原因！");
				return;
			}
			param = { id: $scope.orderId, operate: approveType, remark: $("[name='rejectText']").val() };
		} else if (type == "agree") {
			param = { id: $scope.orderId, operate: approveType };
		}

		$scope.closeOrOpenTipBox('loading');
		
		$http.get(Utils.baseUrl + 'pass/approval', {
			params: param,
			headers: { 'Authorization': $location.search().access_token }
		})
			.success(function (response) {
				if (response.result) {
					setTimeout(function(){
						$scope.closeOrOpenTipBox('open',type);
						$scope.getOrderDetail();
					},2000);
				} else {
					setTimeout(function () {
						Utils.setTipBox(response.message);
					}, 200);
				}
			}).error(function (error) {
				var msg = "提交失败，请重试！";
				Utils.setTipBox(msg);
			});
	};
	
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
				$scope.orderState="驳回成功";
				$scope.orderStateInfo="放行申请驳回成功";
			}else{
				$scope.orderState="审核通过";
				$scope.orderStateInfo="放行申请审核通过";
			}
			$scope.countDown=3;
			countDownFn=$interval($scope.countDownFn,1000);  
			setTimeout(function(){
				$scope.closeOrOpenTipBox('close');
			},2800);
		}else if(type=="close"){
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
		}else if(type=="loading"){
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.orderState="提交中…";
			$scope.orderStateInfo="审核提交中，请稍等…";
			$scope.countDown=2;
			$scope.loadType="load";
			countDownFn=$interval($scope.countDownFn,1000);  
		}
	}

	$(function () {
		//获取订单详情
		$scope.getOrderDetail();
	})

}]);


app.filter("setUserType", function ($sce) {
	return function (appraise) {
		var takeType = "";
		if (appraise.takeType == 0) {
			takeType = "本人";
		} else {
			takeType = "其他";
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

//审核状态显示
app.filter("setAuditType", function ($sce) {
	return function (appraise) {
		var classList = "";
		
		if(appraise.orderStatus==appraise.current){
			classList="select current";
		}else if(appraise.orderStatus>appraise.current){
			classList="select";
		}
	
		return classList;
	}
});



