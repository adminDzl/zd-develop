var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

	var countDownFn;
	$scope.countDown = 3;
	$scope.repairsInfo = "";
	$scope.area = "";
	$scope.repairDetail = "";
	$scope.areaDetail = "";
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
	$scope.closeOrOpenTipBox = function (type, orderId, orderNum) {
		if (type == "open") {
			$(".successfulBox").eq(0).addClass("show");
			$(".masking").fadeIn();
			$scope.countDown = 3;
			countDownFn = $interval($scope.countDownFn, 1000);

			setTimeout(function () {
				window.location.href = "finish.html?orderId=" + orderId + '&access_token=' + $scope.token + '&orderNum=' + orderNum;
			}, 4300);
		} else if (type == "close") {
			$interval.cancel(countDownFn);
			$(".successfulBox").eq(0).removeClass("show");
			$(".masking").fadeOut();
			setTimeout(function () {
				window.location.href = "finish.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token + '&orderNum=' + $scope.orderNum;
			}, 300);
		}
	};

	// 获取物品类型
	$scope.getTypeInfo = function () {
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + 'pnc/orderchief/init.do',
			data: {}
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				console.log(result.data)
				$scope.repairsInfo = result.data.data;
				$scope.area = $scope.repairsInfo.areaDatas[0].id;

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

	//选择报修类别
	$scope.selectType = function ($event) {
		var _this = $($event.currentTarget);
		_this.addClass("select").siblings().removeClass("select");
	};

	//点击选择文件
	$('.main').delegate(':file', 'change', function () {
		Utils.uploadFilePreviewForm(this, "registration");
	});


	// 提交
	$scope.submit = function () {
		var sortId = $('.fellipsis.select').attr("data-id"),
			sortName = $('.fellipsis.select').text(),
			areaName = Utils.getValue($scope.area, $scope.repairsInfo.areaDatas),
			fileUrlList = [],
			list = $('#commentPicture').find(".item");
		$.each(list, function (index, item) {
			fileUrlList.push($(item).attr("data-path"));
		});
		var data = {
			applyName: $scope.repairsInfo.userInfo.applyName,
			applyDept: $scope.repairsInfo.userInfo.applyDept,
			applyMobile: $scope.repairsInfo.userInfo.applyMobile,
			sortSubName: sortName,
			sortSubId: sortId,
			supplementText: $scope.repairDetail,
			areaName: areaName,
			areaChiefId: $scope.area,
			areaDetail: $scope.areaDetail,
			attachmentURL: JSON.stringify(fileUrlList)
		};
		// 为空判断处理
		if (!data.applyName) {
			Utils.setTipBox("请输入申请人姓名！");
			return;
		} else if (!data.applyDept) {
			Utils.setTipBox("请输入申请人单位！");
			return;
		} else if (!data.applyMobile) {
			Utils.setTipBox("请输入申请人电话！");
			return;
		} else if (!data.sortSubName) {
			Utils.setTipBox("请选择报修二级类型！");
			return;
		} else if (!data.supplementText) {
			Utils.setTipBox("请填写维修详情！");
			return;
		} else if (!data.areaChiefId) {
			Utils.setTipBox("请选择维修区域！");
			return;
		} else if (!data.areaDetail) {
			Utils.setTipBox("请输入详细地址");
			return;
		} else {
			if (data.applyMobile) {
				var reg = /^1[0-9]{10}$/;
				var flag = reg.test(data.applyMobile); //true
				if (!flag) {
					Utils.setTipBox("请输入正确申请人电话！");
					return;
				}
			}
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'pnc/orderchief/addSave', data, function (data) {
			// 成功
			var orderId = data.orderId;
			var orderNum = data.orderNum;
			$scope.orderId = orderId;
			$scope.orderNum = orderNum;
			$scope.closeOrOpenTipBox("open", orderId,orderNum);
		});
	};

	// 初始化获取数据
	$scope.getTypeInfo();
}]);