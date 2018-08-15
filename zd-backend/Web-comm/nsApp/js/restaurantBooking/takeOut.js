var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', '$interval', '$timeout', function ($scope, $http, $interval, $timeout) {

	var countDownFn;
	$scope.foodType = 0;
	$scope.countDown = 3;
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.bun = "";
	$scope.maddo = "";
	$scope.priceAll = "";
	$scope.amountAll = "";
	$scope.isSlect = true;
	$scope.priceMan = "";
	$scope.priceManId = "";
	$scope.priceManName = "";
	$scope.priceBao = "";
	$scope.priceBaoId = "";
	$scope.priceBaoName = "";

	$scope.selectTakeOutType = function ($event) {
		var _this = $($event.currentTarget);
		var _thisType = _this.attr("data-type");
		if (($scope.isSlect == false && _thisType == '0') || ($scope.isSlect == false && _thisType == 'all')) {
			Utils.setTipBox("已过周二18:00,只能预定周五馒头！");
		} else {
			_this.addClass("select").siblings().removeClass("select");
			$scope.foodType = _thisType;
		}
	};

	// 查询外卖包子，馒头
	$scope.getTakeOutInfo = function () {
		Utils.ajaxLoadData("get", Utils.baseUrl + 'food/foodinfo/takeOutList', {}, function (data) {
			$scope.takeOutInfo = data.page.rows;
			for(var i=0;i<$scope.takeOutInfo.length;i++){
				if($scope.takeOutInfo[i].foodName=='馒头'){
					$scope.manTouCount = $scope.takeOutInfo[i].surplusCount;
				}
				if($scope.takeOutInfo[i].foodName=='包子'){
					$scope.baoziCount = $scope.takeOutInfo[i].surplusCount;
				}
			}

			$timeout(function () {
				$.each($('.radioBox3 span'), function (item, value) {
					if ($(value).attr("data-type") == '0') {
						$scope.priceBao = $(value).attr("data-price");
						$scope.priceBaoId = $(value).attr("data-id");
						$scope.priceBaoName = $(value).text();
					}
					if ($(value).attr("data-type") == '1') {
						$scope.priceMan = $(value).attr("data-price");
						$scope.priceManId = $(value).attr("data-id");
						$scope.priceManName = $(value).text();
					}
				});
				$scope.init();
				// 监听包子数量变化，计算价格
				$scope.$watch('bun', function (newO, old, scope) {
					if ($scope.bun) {
						if ($scope.bun > 10) {
							$scope.bun = 10
						} else {
							if ($scope.foodType == "all" && $scope.maddo) {
								$scope.priceAll = "￥" + (($scope.bun * Number($scope.priceBao) * 100 + $scope.maddo * Number($scope.priceMan) * 100) / 100).toFixed(2);
								$scope.amountAll = Math.floor($scope.bun * Number($scope.priceBao) * 100 + $scope.maddo * Number($scope.priceMan) * 100);
							} else {
								$scope.priceAll = "￥" + (($scope.bun * Number($scope.priceBao) * 100) / 100).toFixed(2);
								$scope.amountAll = Math.floor($scope.bun * Number($scope.priceBao) * 100);
							}
						}
					} else {
						if ($scope.foodType == "all" && $scope.maddo) {
							$scope.priceAll = "￥" + (($scope.maddo * Number($scope.priceMan) * 100) / 100).toFixed(2);
							$scope.amountAll = Math.floor($scope.maddo * Number($scope.priceMan) * 100);
						} else {
							$scope.priceAll = "";
							$scope.amountAll = 0;
						}
					}
				});
				// 监听馒头数量变化，计算价格
				$scope.$watch('maddo', function (newO, old, scope) {
					if ($scope.maddo) {
						if ($scope.maddo > 10) {
							$scope.maddo = 10;
						} else {
							if ($scope.foodType == "all" && $scope.bun) {
								$scope.priceAll = "￥" + (($scope.bun * Number($scope.priceBao) * 100 + $scope.maddo * Number($scope.priceMan) * 100) / 100).toFixed(2);
								$scope.amountAll = Math.floor($scope.bun * Number($scope.priceBao) * 100 + $scope.maddo * Number($scope.priceMan) * 100);
							} else {
								$scope.priceAll = "￥" + (($scope.maddo * Number($scope.priceMan) * 100) / 100).toFixed(2);
								$scope.amountAll = Math.floor($scope.maddo * Number($scope.priceMan) * 100);
							}
						}
					} else {
						if ($scope.foodType == "all" && $scope.bun) {
							$scope.priceAll = "￥" + (($scope.bun * Number($scope.priceBao) * 100) / 100).toFixed(2);
							$scope.amountAll = Math.floor($scope.bun * Number($scope.priceBao) * 100);
						} else {
							$scope.priceAll = "";
							$scope.amountAll = 0;
						}
					}
				});
			}, 300)
			$scope.$apply();
		});
	};

	// 超过周二18:00后只能预定馒头，包子和全部选项禁用
	$scope.init = function () {
		var nowDate = new Date(),
			wekDay = nowDate.getDay(),
			nowHours = nowDate.getHours(),
			span = $('.radioBox3 span');
		if (wekDay > 2 || (wekDay == 2 && nowHours >= 18) || wekDay == 0) {
			$scope.isSlect = false;
			$scope.foodType = 1;
			$.each($('.radioBox3 span'), function (item, value) {
				if ($(value).attr("data-type") == '1') {
					$(value).addClass("select").siblings().removeClass("select");
				}
			});
		} else {
			$.each($('.radioBox3 span'), function (item, value) {
				if ($(value).attr("data-type") == '0') {
					$(value).addClass("select").siblings().removeClass("select");
				}
			});
		}
	};

	// 导航操作
	$scope.navOperate = function (type) {
		if (type == "lunch") {
			setTimeout(function () {
				window.location.href = "index.html?access_token=" + $scope.token;
			}, 300);
		} else if (type == "dinner") {
			setTimeout(function () {
				window.location.href = "dinnerBooking.html?access_token=" + $scope.token;
			}, 300);
		}
	};

	// 外卖创建下单。
	$scope.creatOrder = function () {
		var data = {
			priceAll: $scope.amountAll
		};
		var nowDate = new Date(),
			setDates = new Date(),
			wekDay = nowDate.getDay(),
			baoziTime= "",
			mantouTime ="",
			nowHours = nowDate.getHours();
			if (wekDay == 0 || wekDay == 6 || wekDay == 5 ||(wekDay == 4 && nowHours > 18)){
				Utils.setTipBox("超过周四下午18:00,已不能预定本周外卖");
				return;
			}else {
				if (wekDay == 1){
					baoziTime = $scope.formDate(setDates.setDate(setDates.getDate()+2));
					mantouTime = $scope.formDate(setDates.setDate(setDates.getDate()+4))
				}else if (wekDay ==2){
					baoziTime = $scope.formDate(setDates.setDate(setDates.getDate()+1));
					mantouTime = $scope.formDate(setDates.setDate(setDates.getDate()+3));
				}else if (wekDay == 3){
					mantouTime = $scope.formDate(setDates.setDate(setDates.getDate()+2));
				}else if (wekDay == 4){
					mantouTime = $scope.formDate(setDates.setDate(setDates.getDate()+1));
				}
			}
		if ($scope.foodType == '0') {
			if (!$scope.bun) {
				Utils.setTipBox("请输入包子数量");
				return;
			}
			if($scope.bun>$scope.baoziCount){
				Utils.setTipBox("当前包子库存不足，剩余"+ $scope.baoziCount +"个,请重新输入");
				return;
			}
			data.foodList = JSON.stringify([{
				foodId: $scope.priceBaoId,
				foodName: $scope.priceBaoName,
				foodNum: angular.copy($scope.bun)+""
			}]);
			data.baoziTime=baoziTime;
		} else if ($scope.foodType == '1') {
			if (!$scope.maddo) {
				Utils.setTipBox("请输入馒头数量");
				return;
			}
			if($scope.maddo>$scope.manTouCount){
				Utils.setTipBox("当前馒头库存不足，剩余"+ $scope.manTouCount +"个,请重新输入");
				return;
			}
			data.foodList = JSON.stringify([{
				foodId: $scope.priceManId,
				foodName: $scope.priceManName,
				foodNum: angular.copy($scope.maddo)+""
			}]);
			data.mantouTime = mantouTime;
		} else if ($scope.foodType == 'all') {
			if (!$scope.bun || !$scope.maddo) {
				Utils.setTipBox("请输入包子或者馒头数量");
				return;
			}
			if($scope.bun>$scope.baoziCount){
				Utils.setTipBox("当前包子库存不足，剩余"+ $scope.baoziCount +"个,请重新输入");
				return;
			}
			if($scope.maddo>$scope.manTouCount){
				Utils.setTipBox("当前馒头库存不足，剩余"+ $scope.manTouCount +"个,请重新输入");
				return;
			}
			data.foodList = JSON.stringify([{
				foodId: $scope.priceBaoId,
				foodName: $scope.priceBaoName,
				foodNum: angular.copy($scope.bun)+""
			}, {
				foodId: $scope.priceManId,
				foodName: $scope.priceManName,
				foodNum: angular.copy($scope.maddo)+""
			}]);
			data.mantouTime = mantouTime;
			data.baoziTime=baoziTime;
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'food/foodorder/addTakeOutOrder', data, function (data) {
			$scope.orderId = data.orderId;
			//$scope.closeOrOpenTipBox('open');
			$scope.pay(data.prepay_id, data.nonce_str, data.timeStamp, data.sign);
		});
	};

	// 时间日期转换，转换成取餐时间
	$scope.formDate = function (params) {
		var d = new Date(params);
		var a = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
		for(var i = 0, len = a.length; i < len; i ++) {
			if(a[i] < 10) {
				a[i] = '0' + a[i];
			}
		}
		str = a[0] + '-' + a[1] + '-' + a[2]+" " +"13:00:00";
		return str;
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
				window.location.href = "takeOutDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 4300);
		} else if (type == "close") {
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
			setTimeout(function () {
				$window.location.href = "takeOutDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 1000);
		}
	};

	$scope.getTakeOutInfo();

}]);

