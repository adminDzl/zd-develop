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
		fileName: "",
		remark: "",
		otherLeader: ""
	};

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
		$("html,body").animate({ scrollTop: $(".selectLeader").offset().top + $(".addOtherLeaderBox").height() + 100 }, 300);
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
			$.each($('.selectLeaderBox').find(".f-l li.select"), function (item, value) {
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
			$(".addOtherLeaderBox textarea").val('');
			$(".addOtherLeaderBox").hide();
			$(".selectLeaderBox").removeClass("show");
			$(".masking").fadeOut();
			$("html,body").animate({ scrollTop: 0 }, 300);
		}
	};

	// 初始化加载领导信息数据
	$scope.loadLeaderInfo = function () {
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carleader/leaderList', {},$scope.token,function (data) {
			if (data.result == true) {
				$scope.LeaderInfo = data.data;
			} else {
				// 错误处理 TODO
				console.log(data.result, data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			// TODO错误处理
			console.log(error);
			$scope.closeOrOpenErrorTipBox("open");
		});
	};

	// 点击选择文件
	$('.main').delegate(':file', 'change', function () {
		var sbForm = document.getElementById("registration");
		sbForm.action = Utils.uploadFileUrl;//  Utils.uploadImageServer;
		var formdata = new FormData(sbForm);
		//直接返回文件的源数据
		var blob = this.files[0];
		$('#fileName').val(blob.name);
		formdata.append(blob.name, blob);
		$.ajax({
			url: sbForm.action,
			type: "POST",
			data: formdata,
			dataType: "text",
			processData: false,         // 告诉jQuery不要去处理发送的数据
			contentType: false,        // 告诉jQuery不要去设置Content-Type请求头
			success: function (ret) {
				var data = eval('(' + ret + ')');
				if (data.data[0]) {
					//处理文件
					$scope.currentInfo.fileName = data.data[0].storagePath;
				}
			}
		});
	});

	// 确定提交申请
	$scope.submitBtn = function () {
		// 检测必填项是否存在空值
		var options = $("#select option:selected");
		var stratTime = Utils.formDate(angular.copy($scope.currentInfo.userTime.start).toString());
		var endTime = Utils.formDate(angular.copy($scope.currentInfo.userTime.end).toString());
		var data = {
			reason: $scope.currentInfo.cause,
			leader: JSON.stringify({ leader: $scope.submitLeaderInfo }),
			startTime: stratTime,
			endTime: endTime,
			startAddress: $scope.currentInfo.startAddress,
			endAddress: $scope.currentInfo.endAddress,
			useType: options.val() == "特殊情况" ? 2 : 1
		};
		if ($scope.currentInfo.userTime.start == "" || $scope.currentInfo.userTime.end =="" || Utils.isEmptyObj(data)) {
			$(".container").find("input").addClass('submit');
			return;
		}
		if ($scope.currentInfo.smallCar) {
			data.smallCarNum = $scope.currentInfo.smallCar;
		}
		if ($scope.currentInfo.middleCar) {
			data.midCarNum = $scope.currentInfo.middleCar;
		}
		if ($scope.currentInfo.fileName) {
			data.fileUrl = $scope.currentInfo.fileName;
		}
		if ($scope.currentInfo.remark) {
			data.remark = $scope.currentInfo.remark;
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/addOrder', data,$scope.token, function (data) {
			if (data.result == true) {
				$scope.orderId = data.data.orderId;
				// 跳转页面
				$scope.closeOrOpenTipBox('open');
			} else {
				// 错误处理 TODO
				console.log(data.result, data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			$scope.closeOrOpenErrorTipBox("open");
			// TODO错误处理
			console.log(error);
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

	// 初始化是数据
	$scope.init = function () {
		$scope.loadLeaderInfo();
	};

	$scope.init();

}]);