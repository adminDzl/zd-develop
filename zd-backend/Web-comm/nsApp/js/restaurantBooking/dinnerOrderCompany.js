var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', '$interval', '$timeout', function ($scope, $http, $interval, $timeout) {

	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.token = Utils.getValueInPathByName("access_token");
	var countDownFn;
	$scope.countDown = 3;
	// 获取订单信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'food/foodorder/orderInfo', data, function (data) {
			$scope.orderInfo = data;
			$scope.$apply();
		});
	};

	// 去支付
	$scope.submit = function () {
		var data = {
			orderId: $scope.orderId
		};
			Utils.ajaxLoadData("post", Utils.baseUrl + 'food/foodorder/againPay', data, function (data) {
				$scope.orderId = data.orderId;
				$scope.pay(data.prepay_id, data.nonce_str, data.timeStamp, data.sign);
			});
	};

	// 支付
	$scope.pay = function (prepayId, nonceStr, timeStamp, sign, orderId) {
		window.ccapi.chooseWXPayV2({
			prepayId: prepayId,
			nonceStr: nonceStr,
			timeStamp: timeStamp,
			sign: sign,
			success: function (res) {
				// 支付成功后的回调函数
				var status = res.status; //true  or false
				if (status == true) {
					Utils.setTipBox("成功");
					// 成功之后的操作
					var data = {
						orderId: $scope.orderId,
						prepay_id: prepayId,
						sign: sign
					};
					Utils.ajaxLoadData("post", Utils.baseUrl + 'food/foodorder/updateOrderPay', data, function (data) {
						$scope.closeOrOpenTipBox("open");
					});
				} else {
					Utils.setTipBox("支付失败");
				}
			},
			fail: function (res) {
				if (res.errCode == 'userCancel') {
					// 如果用户取消支付，调到重新15分钟内重新支付页面
					//Utils.setTipBox("跳转页面");
				} else {
					Utils.setTipBox(res.errorMessage);
				}

			}
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
	}

	//关闭提示框
	$scope.closeOrOpenTipBox = function (type) {
		if (type == "open") {
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.countDown = 3;
			countDownFn = $interval($scope.countDownFn, 1000);

			setTimeout(function () {
				window.location.href = "dinnerDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 4300);
		} else if (type == "close") {
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
			setTimeout(function () {
				$window.location.href = "dinnerDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 1000);
		}
	};


	$scope.getOrderInfo();


}]);