var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {

	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.driverInfo = [];
	$scope.driverSumInfo = [];
	$scope.selectDriverInfo = [];
	$scope.time = "";
	$scope.countDown = 3;
	var countDownFn;
    // 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carorder/orderInfo', data,$scope.token, function (data) {
			if (data.result == true) {
				$scope.orderInfo = data.data;
				$scope.time = data.data.startTime + "~" + data.data.endTime;
				$scope.orderInfo.useType = $scope.orderInfo.useType == "1" ? "正常公务" : "特殊情况";
				$scope.$apply();
			}else{
				// 错误处理 TODO
				console.log(data.result,data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			// TODO错误处理
			console.log(error);
			$scope.closeOrOpenErrorTipBox("open");
		});
    };
	
	//选择司机
	$scope.selectDriver=function($event,type){
		if(type=='open'){
			$scope.getDriverInfo($(".selectCarBox").slideDown());
		}else if(type=='confirm'){
			$scope.showDriverInfo($(".selectCarBox").slideUp());
		}else if(type=='close'){
			$(".selectCarBox").slideUp();
		}else{
			var _this=$($event.currentTarget);
			if(_this.hasClass("unselect")){
				return;
			}else{
				_this.toggleClass("select");
			}
		}
		
	};

	// 查询司机信息
	$scope.getDriverInfo = function (callback){
		$scope.driverInfo =[];
		$(".masking").fadeIn();
		var data = {};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/cardriver/driverList', data,$scope.token, function (data) {
			if (data.result == true) {
				// 处理司机信息
				callback;
				$scope.driverInfo = data.data;
				$scope.$apply();
				$scope.driverSumInfo = [];
				$scope.driverSumInfo = $scope.driverSumInfo.concat(data.data.midCarList,data.data.smallCarList);
			}else{
				// 错误处理 TODO
				console.log(data.result,data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			// TODO错误处理
			console.log(error);
			$scope.closeOrOpenErrorTipBox("open");
		});
	};

	// 点击确定，展示司机信息
	$scope.showDriverInfo = function  (callback) {
		// 展示司机信息
		$scope.selectDriverInfo = [];
		var selectList = $('.selectCarBox').find('ul> li.select');
		var selectName = [];
		$.each(selectList,function(item,value){
			selectName.push($(value).attr("data-id"));
		});
		var selectLen = selectName.length
		if (selectLen > 0) {
			$.each($scope.driverSumInfo,function(item,value){
				for (var i=0; i< selectLen; i++) {
					if (selectName[i] == value.driverId) {
						$scope.selectDriverInfo.push(value);
					}
				}
			});
		}
		callback;
		$(".masking").fadeOut();
	};

	// 确认派单
	$scope.sendOrder = function () {
		var data = {
			driverList: JSON.stringify({driverList:$scope.selectDriverInfo}),
			orderId: $scope.orderId
		};
		if($scope.selectDriverInfo.length == 0){
			$(".inputDropdown").addClass('submit');
			return;
		}
		if (angular.equals($scope.oldSelectDriverInfo,$scope.selectDriverInfo)){
			// 提示数据相同，不能改派
			alert('司机信息没有改变，不能重新派单');
			return;
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carreception/addListSave', data, $scope.token, function (data) {
			if (data.result == true) {
				// 成功后初始化获取订单信息
				$scope.getOrderInfo();
				$scope.oldSelectDriverInfo = angular.copy($scope.selectDriverInfo);
			}else{
				// 错误处理 TODO
				console.log(data.result,data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			// TODO错误处理
			console.log(error);
			$scope.closeOrOpenErrorTipBox("open");
		});
	};

	//倒计时
	$scope.countDownFn = function () {
		if ($scope.countDown > 0) {
			$scope.countDown--;
		} else {
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
		}
	};

	// 错误提示框
	$scope.closeOrOpenErrorTipBox = function (type) {
		if (type == "open") {
			$(".errorfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.countDown = 3;
			countDownFn = $interval($scope.countDownFn, 1000);
		} else if (type == "close") {
			$interval.cancel(countDownFn);
			$(".errorfulBox").removeClass("show");
			$(".masking").fadeOut();
		}
	};

	// 初始化获取订单信息
	$scope.getOrderInfo();
		

}]);