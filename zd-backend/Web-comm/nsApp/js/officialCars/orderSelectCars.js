var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {

	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.driverInfo = [];  // 司机信息
	$scope.driverSumInfo = [];  // 司机信息汇总
	$scope.selectDriverInfo = [];  // 已选择司机
	$scope.time = "";
	$scope.smallCarUsing = "";  // 小车已选
	$scope.smallCarForb = "";   // 小车禁用
	$scope.midCarUsing = "";   // 中巴已选
	$scope.midCarForb = "";   // 中巴禁用
	$scope.smallNum = "";    // 小车司机可派单个数
	$scope.midNum = "";     // 中巴司机可派单个数
    // 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carorder/orderInfo', data, function (data) {
			$scope.orderInfo = data;
			$scope.time = data.startTime + "~" + data.endTime;
			$scope.orderInfo.useType = $scope.orderInfo.useType == "1" ? "正常公务" : "特殊情况";
			$scope.handleDriverInfo();
			$scope.$apply();
		});
    };
	
	//选择司机
	$scope.selectDriver=function($event,type){
		$scope.smallNum = $scope.orderInfo.smallCarNum - $scope.smallCarForb.length;
		$scope.midNum = $scope.orderInfo.midCarNum - $scope.midCarForb.length;
		if(type=='open'){
			$scope.getDriverInfo($(".selectCarBox").slideDown());
		}else if(type=='confirm'){
			$scope.showDriverInfo($(".selectCarBox").slideUp());
		}else if(type=='close'){
			$(".selectCarBox").slideUp();
		}else{
			var _this=$($event.currentTarget);
			var num = _this.parent('ul').find('.select').length,
			carType = _this.attr("data-type"),
			sum = carType == '1' ? $scope.smallNum : $scope.midNum;
			if (num < sum) {
				if(_this.hasClass("unselect")){
					return;
				}else{
					_this.toggleClass("select");
				}
			} else {
				if(_this.hasClass("unselect")){
					return;
				}else{
					if (_this.hasClass("select")) {
						_this.removeClass("select");
					}else {
						Utils.setTipBox("最多只能选择这么多司机...");
					}
				}
			}
		}
		
	};

	// 处理司机显示问题
	$scope.handleDriverInfo = function () {
		var smallCarUsing = [],
		smallCarForb = [],
		midCarUsing = [],
		midCarForb = [];
		if ($scope.orderInfo.driverMap && $scope.orderInfo.driverMap.smallCarList.length != 0) {
			// 说明派过小车司机
			$.each($scope.orderInfo.driverMap.smallCarList,function(item,value){
				if (value.driverStatus  == '1') {
					// 启用
					smallCarUsing.push(value);
					$scope.smallCarUsing = smallCarUsing;
				}else {
					 // 禁用
					 smallCarForb.push(value);
					 $scope.smallCarForb = smallCarForb;
				}
			});
		}
		if ($scope.orderInfo.driverMap && $scope.orderInfo.driverMap.midCarList.length != 0) {
			// 说明派过中巴司机
			$.each($scope.orderInfo.driverMap.midCarList,function(item,value){
				if (value.driverStatus  == '1') {
					// 启用
					midCarUsing.push(value);
					$scope.midCarUsing = midCarUsing;
				}else {
					 // 禁用
					 midCarForb.push(value);
					 $scope.midCarForb = midCarForb;
				}
			});
		}
	};

	// 查询司机信息
	$scope.getDriverInfo = function (callback){
		$scope.driverInfo =[];
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/cardriver/driverList', {}, function (data) {
			// 处理司机信息
			callback;
			$scope.driverInfo = data;
			console.log($scope.smallCarUsing)
			// 进行数据处理，让已经派过单的自动选上
			$.each($scope.driverInfo.smallCarList,function (item,value) {
				for (var i=0; i< $scope.smallCarUsing.length; i++) {
					if ($scope.smallCarUsing[i].driverId == value.driverId) {
						value.select = '1';
					}else{
						value.select = '0';
					}
				}
				for (var i=0; i< $scope.smallCarForb.length; i++) {
					if ($scope.smallCarForb[i].driverId == value.driverId) {
						value.driverStatus = $scope.smallCarForb[i].driverStatus;
					}
				}
			});
			$.each($scope.driverInfo.midCarList,function (item,value) {
				for (var i=0; i< $scope.midCarUsing.length; i++) {
					if ($scope.midCarUsing[i].driverId == value.driverId) {
						value.select = '1';
					}else{
						value.select = '0';
					}
				}
				for (var i=0; i< $scope.midCarForb.length; i++) {
					if ($scope.midCarForb[i].driverId == value.driverId) {
						value.driverStatus = $scope.smallCarForb[i].driverStatus;
					}
				}
			});
			$scope.$apply();
			$scope.driverSumInfo = [];
			$scope.driverSumInfo = $scope.driverSumInfo.concat(data.midCarList,data.smallCarList);
			if ($scope.driverSumInfo.length == 0) {
				$(".selectCarBox").slideUp();
				Utils.setTipBox("暂无可派单司机");
			}
		});
	};

	// 点击确定，展示司机信息
	$scope.showDriverInfo = function  (callback) {
		// 展示司机信息
		$scope.selectDriverInfo = [];
		var selectList = $('.selectCarBox').find('ul> li.select');
		var selectName = [];
		if ($scope.driverInfo.smallCarList.length>0) {
			if ($('.smallcar').find('li.select').length != $scope.smallNum){
				Utils.setTipBox("小车辆数和所派司机个数不符...");
				return;
			}
		}
		if ($scope.driverInfo.midCarList.length>0) {
			if ($('.midcar').find('li.select').length != $scope.midNum){
				Utils.setTipBox("中巴辆数和所派司机个数不符...");
				return
			}
		}
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
		if ($scope.smallCarForb.length != 0) {
			$scope.selectDriverInfo = $scope.selectDriverInfo.concat($scope.smallCarForb);
		}
		if ($scope.midCarForb.length != 0){
			$scope.selectDriverInfo = $scope.selectDriverInfo.concat($scope.midCarForb);
		}
		//$scope.selectDriverInfo = $scope.selectDriverInfo.concat($scope.smallCarForb,$scope.midCarForb);
		console.log($scope.selectDriverInfo);
		callback;
		$(".masking").fadeOut();
	};

	// 确认派单
	$scope.sendOrder = function () {
		var data = {
			driverList: JSON.stringify({driverList:$scope.selectDriverInfo}),
			orderId: $scope.orderId
		};
		// if (angular.equals($scope.oldSelectDriverInfo,$scope.selectDriverInfo)){
		// 	// 提示数据相同，不能改派
		// 	Utils.setTipBox("司机信息没有改变，不能重新派单");
		// 	return;
		// }
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carreception/addListSave', data, function (data) {
			// 成功后初始化获取订单信息
			Utils.setTipBox("派单成功！");
			$scope.getOrderInfo();
		});
	};

	// 初始化获取订单信息
	$scope.getOrderInfo();
		

}]);