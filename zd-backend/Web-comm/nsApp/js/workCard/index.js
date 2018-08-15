var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

	var countDownFn;
	$scope.countDown = 3;
	$scope.wordCardInfo = "";
	$scope.area = "";
	$scope.repairDetail = "";
	$scope.areaDetail = "";
	$scope.applyMobile = "";
	$scope.token = Utils.getValueInPathByName("access_token");
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

	//通过手机号获取数据
	$scope.blur = function ($event) {
		if ($scope.applyMobile) {
			var reg = /^1[0-9]{10}$/;
			var flag = reg.test($scope.applyMobile); //true
			if (!flag) {
				Utils.setTipBox("请输入正确申请人电话！");
				return;
			}else{
				$http({
					method: "get",
					headers: { 'Authorization': $scope.token },
					url: Utils.baseUrl + '/baseinfo/user/getUserDetailByMobile?mobile=' + $scope.applyMobile,
				}).then(function (result) {
					if (result.data.result == true) {
						// 成功
						console.log(result.data);
						$scope.deptInfo = result.data.data;
						$scope.wordCardInfo = result.data.data.userDetailMap;
						console.log(result.data.data.userDetailMap.realname);
					} else {
						Utils.setTipBox(result.data.message);
					}
				}, function (error) {
					Utils.setTipBox("链接服务器失败！");
				});
			}
		}
	};
	
	//获取编制列表
	$scope.getAuthType = function () {
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + '/baseinfo/dictionary/findListBykeyCode?keyCode=WORD_CARD_ESTABLISHMENT',
			data: {}
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				console.log(result.data);
				$scope.authTypes = result.data.data;
				$scope.authType = $scope.authTypes[0].id;
				console.log($scope.authType);
			} else {
				Utils.setTipBox(result.data.message);
			}
		}, function (error) {
			Utils.setTipBox("链接服务器失败！");
		});
	};
	
	//获取年限列表
	$scope.getCardTime = function () {
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + '/baseinfo/dictionary/findListBykeyCode?keyCode=WORD_CARD_YEARS',
			data: {}
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				console.log(result.data);
				$scope.cardTimes = result.data.data;
				$scope.cardTime = $scope.cardTimes[0].id;
			} else {
				Utils.setTipBox(result.data.message);
			}
		}, function (error) {
			Utils.setTipBox("链接服务器失败！");
		});
	};

	//展开收起
	$scope.showMoreOrHideTypeList = function ($event) {
		var _this = $($event.currentTarget);
		if (_this.hasClass("showMore")) {
			_this.parents(".selctRepairsType > div").removeClass("showMore");
			_this.removeClass("showMore");
		} else {
			_this.addClass("showMore");
			_this.parents(".selctRepairsType > div").addClass("showMore");
		}
	}

	//点击选择文件
	$('.main').delegate(':file', 'change', function () {
		Utils.uploadFilePreviewForm(this, "registration");
	});


	//提交
	$scope.submit = function () {
		var fileUrlList = [],
			fileUrls = '';
			list = $('#commentPicture').find(".item");
		$.each(list, function (index, item) {
			fileUrlList.push($(item).attr("data-path"));
			fileUrls = fileUrlList.join( ",");
		});
		var data = {
			applyPhone: $scope.applyMobile,
			applyUnitName: $scope.deptInfo.defaultDeptParent.name,
			applyUnitId: $scope.deptInfo.defaultDeptParent.id,
			applyName: $scope.wordCardInfo.realname,
			applyUserId: $scope.wordCardInfo.id,
			userDeptName: $scope.deptInfo.defaultDept.name,
			userDeptId: $scope.deptInfo.defaultDept.id,
			weaveType: $scope.authType,
			applyDeadline: $scope.cardTime,
			guardRoomNo: $scope.roomNumber,
			fileUrls: fileUrls
		};
		// 为空判断处理
		if (!data.applyPhone) {
			Utils.setTipBox("请输入申请人电话！");
			return;
		} else if (!data.applyUnitName) {
			Utils.setTipBox("请输入申请单位！");
			return;
		} else if (!data.applyName) {
			Utils.setTipBox("请输入申请人姓名！");
			return;
		} else if (!data.userDeptName) {
			Utils.setTipBox("请选择申请人科室！");
			return;
		} else if (!data.weaveType) {
			Utils.setTipBox("请选择编制类型！");
			return;
		} else if (!data.applyDeadline) {
			Utils.setTipBox("请选择办卡年限！");
			return;
		} else if (!data.guardRoomNo) {
			Utils.setTipBox("请填写门禁房号");
			return;
		} else {
			if (data.applyPhone) {
				var reg = /^1[0-9]{10}$/;
				var flag = reg.test(data.applyPhone); //true
				if (!flag) {
					Utils.setTipBox("请输入正确申请人电话！");
					return;
				}
			}
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'onecard/wordcardOrder/apply', data, function (data) {
			// 获取订单id
			$scope.orderId = data.orderId;
			// 跳转页面
			$scope.closeOrOpenTipBox('open');
		});
	};

	$scope.getAuthType();
	$scope.getCardTime();
}]);