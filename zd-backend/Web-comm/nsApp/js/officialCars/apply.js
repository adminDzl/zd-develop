var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {


	$scope.countDown = 3;
	var countDownFn;
	$scope.token = Utils.getValueInPathByName("access_token");

	// 初始化信息
	$scope.LeaderInfo = {};
	$scope.orderId = "";
	$scope.currentInfo = {
		cause: "",
		leaderName: "",
		userTime: {
			start: "",
			end: ""
		},
		startAddress: "",
		endAddress: "",
		smallCar: "",
		middleCar: "",
		remark: "",
		otherLeader: "",
		userType: 1
	};
	$scope.selectType = [{ name: "正常公务", id: 1 }, { name: "特殊情况", id: 2 }]

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
	};

	//点击选择领导文本框
	$scope.clickLeader = function () {
		$(".masking").fadeIn();
		$(".selectLeaderBox").addClass("show");
	};

	//选择领导
	$scope.selectLeader = function ($event) {
		var _this = $($event.currentTarget);
		if (_this.hasClass("select")) {
			_this.removeClass("select");
		} else {
			_this.addClass("select");
		}
	};

	//点击其他领导添加
	$scope.addOthderLeader = function () {
		$("html,body").animate({ scrollTop: $(".selectLeader").offset().top }, 300);
		$(".addOtherLeaderBox").fadeIn();
	};


	//弹出框操作
	$scope.operationFn = function (type) {
		if (type == "cancel") {
			$("html,body").animate({ scrollTop: $(".selectLeader").offset().top }, 300);
			$(".addOtherLeaderBox").fadeOut();
		} else if (type == "confirm") {
			// 做处理，渲染到页面上，数据
			var leaderList = [];
			var leaderInfo = [];
			$.each($('.selectLeaderBox').find("li.select"), function (item, value) {
				leaderList.push($(value).text());
				leaderInfo.push({
					id: $(value).attr("data-id"),
					leaderName: $(value).text()
				});
			});
			if (leaderList.length > 0) {
				$scope.currentInfo.leaderName = $scope.currentInfo.otherLeader ? leaderList.join("、") + "、" + $scope.currentInfo.otherLeader : leaderList.join("、");
			} else {
				$scope.currentInfo.leaderName = $scope.currentInfo.otherLeader;
			}
			if ($scope.currentInfo.otherLeader) {
				leaderInfo.push({
					leaderName: $scope.currentInfo.otherLeader
				});
			}
			$scope.submitLeaderInfo = leaderInfo;
			setTimeout(function () {
				$scope.operationFn('close');
			}, 300);
		} else if (type == "close") {
			$(".selectLeaderBox").removeClass("show");
			$(".masking").fadeOut();
			$("html,body").animate({ scrollTop: 0 }, 300);
		}
	};

	// 初始化加载领导信息数据
	$scope.loadLeaderInfo = function () {
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carleader/leaderList', {}, function (data) {
			$scope.LeaderInfo = data;
		});
	};

	// 点击选择文件
	$('.main').delegate(':file', 'change', function () {
		Utils.uploadFilePreviewForm(this, "registration");
	});

	// 确定提交申请
	$scope.submitBtn = function () {
		// 检测必填项是否存在空值
		var stratTime = Utils.formDate(angular.copy($scope.currentInfo.userTime.start).toString()),
			endTime = Utils.formDate(angular.copy($scope.currentInfo.userTime.end).toString()),
			fileList = [],
			items = $("#commentPicture li.item"),
			data = {
				reason: $scope.currentInfo.cause,
				leader: JSON.stringify({ leader: $scope.submitLeaderInfo }),
				startTime: stratTime,
				endTime: endTime,
				startAddress: $scope.currentInfo.startAddress,
				endAddress: $scope.currentInfo.endAddress,
				useType: $scope.currentInfo.userType
			};
		if (items.length != 0) {
			$.each(items, function (index, ele) {
				fileList.push($(ele).attr("data-path"));
			});
		}
		if ($scope.currentInfo.userTime.start == "" || $scope.currentInfo.userTime.end == "" || Utils.isEmptyObj(data)) {
			$(".container").find("input").addClass('submit');
			return;
		}
		if ($scope.currentInfo.smallCar) {
			data.smallCarNum = $scope.currentInfo.smallCar;
		}
		if ($scope.currentInfo.middleCar) {
			data.midCarNum = $scope.currentInfo.middleCar;
		}
		if (!$scope.currentInfo.smallCar && !$scope.currentInfo.middleCar) {
			Utils.setTipBox("小车和中巴请至少选择一种");
			return;
		}
		if($(".selectRepairsFile ul li.item em").length>0){
			Utils.setTipBox("图片尚未上传完成，请稍候！");
			return ;
		}
		if (fileList.length != 0) {
			data.fileUrl = fileList.join(";");
		}
		if ($scope.currentInfo.remark) {
			data.remark = $scope.currentInfo.remark;
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/addOrder', data, function (data) {
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
		$scope.loadLeaderInfo();
	};

	$scope.init();

}]);