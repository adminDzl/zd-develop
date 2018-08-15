var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {


	$scope.countDown = 3;
	var countDownFn;
	$scope.token = Utils.getValueInPathByName("access_token");

	// 初始化信息
	$scope.receptionInfo = {};
	$scope.orderId = "";
	$scope.reason = "";
	$scope.level = "";
	$scope.num = "";
	$scope.time = "";
	$scope.smallCar = "";
	$scope.middleCar = "";
	$scope.remark = "";
	$scope.chooseSmall = "0";
	$scope.chooseMiddle = "0";

	//选择车辆类型
	$scope.selectCar = function ($event) {
		var _this = $($event.currentTarget);
		var _thisParent = $($event.currentTarget).parents(".inputBoxHasRadio");
		if (_this.hasClass("select")) {
			_this.removeClass("select");
			_thisParent.find("input").fadeOut();
		} else {
			_this.addClass("select");
			_thisParent.find("input").fadeIn();
		}
		
		if($(".smallCar").hasClass("select")){
			$scope.chooseSmall="1";
		}else{
			$scope.chooseSmall="0";
		}
		if($(".middleCar").hasClass("select")){
			$scope.chooseMiddle = "1";
		}else{
			$scope.chooseMiddle = "0";
		}
	};
	
	// 获取信息
	$scope.getTypeInfo = function () {
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + 'rec/order/init',
			data: {}
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				console.log(result.data)
				$scope.receptionInfo = result.data.data;
				$scope.level = $scope.receptionInfo.levelInfoList[0].id;
			} else {
				Utils.setTipBox(result.data.message);
			}
		}, function (error) {
			Utils.setTipBox("链接服务器失败！");
		});
	};

	// 点击选择文件
	$('.main').delegate(':file', 'change', function () {
		Utils.uploadFilePreviewForm(this, "registration");
	});

	// 确定提交申请
	$scope.submitBtn = function () {
		console.log(111);
		// 检测必填项是否存在空值
		var time = Utils.formDate(angular.copy($scope.time).toString()),
			fileUrlList = [],
			list = $('#commentPicture').find(".item");
		    $.each(list, function (index, item) {
				fileUrlList.push($(item).attr("data-path"));
		    });
			data = {
				reason: $scope.reason,
				recLevelId: $scope.level,
				recDate: time,
				recNumber: $scope.num,
				applyMobile: $scope.receptionInfo.userInfo.applyMobile,
				parkId: $scope.receptionInfo.parkId,
				applyName: $scope.receptionInfo.userInfo.applyName,
				applyDept: $scope.receptionInfo.userInfo.applyDept,
				isSamllCar: $scope.chooseSmall,
				isMidCar: $scope.chooseMiddle,
				attachmentUrl: JSON.stringify(fileUrlList)
			};
		// 为空判断处理 
		if (!data.reason) {
			Utils.setTipBox("请输入事由！");
			return;
		} else if (!data.recLevelId) {
			Utils.setTipBox("请选择级别！");
			return;
		} else if (!data.recNumber) {
			Utils.setTipBox("请输入人数！");
			return;
		} else if (!data.recDate) {
			Utils.setTipBox("请选择接待时间！");
			return;
		} else if (!data.applyMobile) {
			Utils.setTipBox("请输入联系电话！");
			return;
		}
		if ($scope.time == "" || Utils.isEmptyObj(data)) {
			$(".container").find("input").addClass('submit');
			return;
		}
		if ($scope.smallCar) {
			data.smallCarNum = $scope.smallCar;
		}
		if ($scope.middleCar) {
			data.midCarNum = $scope.middleCar;
		}
		if (!$scope.smallCar && !$scope.middleCar) {
			Utils.setTipBox("小车和中巴请至少选择一种");
			return;
		}
		if ($scope.remark) {
			data.remarks = $scope.remark;
		} 
		Utils.ajaxLoadData("post", Utils.baseUrl + 'rec/order/apply', data, function (data) {
			$scope.orderId = data.orderId;
			// 跳转页面
			$scope.closeOrOpenTipBox('open');
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


	//关闭提示框
	$scope.closeOrOpenTipBox = function (type) {
		if (type == "open") {
			$(".successfulBox").eq(0).addClass("show");
			$(".masking").fadeIn();
			$scope.countDown = 3;
			countDownFn = $interval($scope.countDownFn, 1000);

			setTimeout(function () {
				window.location.href = "orderDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 4300);
		} else if (type == "close") {
			$interval.cancel(countDownFn);
			$(".successfulBox").eq(0).removeClass("show");
			$(".masking").fadeOut();
			setTimeout(function () {
				window.location.href = "orderDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 1000);
		}
	};

	// 初始化是数据
	$scope.init = function () {
		$scope.getTypeInfo();
	};

	$scope.init();

}]);