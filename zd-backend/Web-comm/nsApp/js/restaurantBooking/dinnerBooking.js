var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', '$interval', '$timeout', function ($scope, $http, $interval, $timeout) {

	var countDownFn;
	$scope.bookingType = "2";  // 1是个人 2单位
	$scope.countDown = 3;
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.orderId = "";
	$scope.dinnerMealList = "";
	$scope.time = "";
	$scope.number = 1;
	$scope.amount = "";
	$scope.amountAll = "";
	$scope.id = "";
	$scope.typeName = "";
	$scope.unitbuydinner = "";

	// 获取套餐列表
	$scope.getMealList = function () {
		Utils.ajaxLoadData("get", Utils.baseUrl + 'food/foodcategorydetail/list', {}, function (data) {
			$scope.dinnerMealList = data.page.rows;
			$scope.unitbuydinner = data.unitbuydinner;
			if (data.unitbuydinner == false){
				$scope.bookingType = "1";
			}
			$timeout(function () {
				$scope.$watch('number', function (newO, old, scope) {
					if ($scope.number) {
						var select = $(".dinnerMenuBox li.select"),
							price = select.attr("data-price");
						$scope.id = select.attr("data-id");
						$scope.amount = "￥" + (($scope.number * price * 100) / 100).toFixed(2);
						$scope.amountAll = Math.floor($scope.number * price * 100);
					}
				});
			}, 300);
			$scope.$apply();
			var nowDate = new Date(),
				wekDay = nowDate.getDay(),
				setDates = new Date(),
				nowHours = nowDate.getHours();
			if (wekDay == 0 || wekDay == 6 || wekDay == 5) {
				if ((wekDay == 5 && nowHours >= 15) || wekDay == 0 || wekDay == 6) {
					$(".dinnerMenuBox li").eq(0).addClass("select").siblings().removeClass("select");
					if (wekDay == 5){
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+3))+ " " +"17:30 ~ 18:30";
					}else if (wekDay == 6){
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+2))+ " " +"17:30 ~ 18:30";
					} else if (wekDay == 0) {
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+1))+ " " +"17:30 ~ 18:30";
					}
				}else{
					$(".dinnerMenuBox li").eq(wekDay-1).addClass("select").siblings().removeClass("select");
					$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()))+ " " +"17:30 ~ 18:30";
				}
			}else {
				if (nowHours >= 15) {
					$(".dinnerMenuBox li").eq(wekDay).addClass("select").siblings().removeClass("select");
					$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+1)) + " " +"17:30 ~ 18:30";
				}else {
					$(".dinnerMenuBox li").eq(wekDay-1).addClass("select").siblings().removeClass("select");
					$scope.time = $scope.formDate(setDates.setDate(setDates.getDate())) + " " +"17:30 ~ 18:30";
				}
			}
			$scope.center(".dinnerMenuBox li.select");
		});
	};

	// 获取单位名称
	$scope.getUnitName = function () {
		Utils.ajaxLoadData("get", Utils.baseUrl + 'food/foodorder/getTypeName', {}, function (data) {
			$scope.typeNameList = data.typeNameList;
			$scope.typeName = data.typeNameList[0].id
		});
	};

	// 让星期几图片居中
	$scope.center = function (element) {
		
		var select = $(element),
			num = select.attr('data-index'),
			width = select.eq(0).outerWidth(true);
		
		$scope.selectSetMeal=$scope.dinnerMealList[num-1]; 
		
		if (num == '2') {
			$(".dinnerMenuBox").scrollLeft(0.5 * width);
		} else if (num == '3') {
			$(".dinnerMenuBox").scrollLeft(1.5 * width);
		} else if (num == '4') {
			$(".dinnerMenuBox").scrollLeft(2.5 * width);
		} else if (num == '5') {
			$(".dinnerMenuBox").scrollLeft(4 * width);
		}
	};

	$scope.selectCombo = function ($event,item) {
		var _this = $($event.currentTarget);
		var selectWek = Number(_this.attr("data-index"));
		$scope.selectTip(selectWek,item);
	};

	// 根据点击套餐，提示可选
	$scope.selectTip = function (selectWek,item) {
		var nowDate = new Date(),
			setDates = new Date(),
			wekDay = nowDate.getDay(),
			nowHours = nowDate.getHours();
		if (wekDay == 0 || wekDay == 6 || wekDay == 5) {
			if ((wekDay == 5 && nowHours >= 15) || wekDay == 0 || wekDay == 6) {
				if (selectWek == 1) {
					$(".dinnerMenuBox li").eq(0).addClass("select").siblings().removeClass("select");
					if (wekDay == 5){
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+3))+ " " +"17:30 ~ 18:30";
					}else if (wekDay == 6){
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+2))+ " " +"17:30 ~ 18:30";
					} else if (wekDay == 0) {
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+1))+ " " +"17:30 ~ 18:30";
					}
				} else {
					Utils.setTipBox("周六周日及周五超过三点，只能选择周一套餐");
				}
			} else {
				// 可以预定周五和周一的
				if (selectWek == 5) {
					$(".dinnerMenuBox li").eq(selectWek - 1).addClass("select").siblings().removeClass("select");
					$scope.time = $scope.formDate(angular.copy(nowDate))+ " " +"17:30 ~ 18:30";
				} else if (selectWek == 1) {
					$(".dinnerMenuBox li").eq(selectWek - 1).addClass("select").siblings().removeClass("select");
					$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+3))+ " " +"17:30 ~ 18:30";
				} else {
					Utils.setTipBox("您只能选择当日或者周一套餐");
				}
			}
		} else {
			if (wekDay == selectWek || wekDay + 1 == selectWek) {
				if (nowHours >= 15) {
					if (selectWek == wekDay) {
						Utils.setTipBox("超过三点，只能选择现在套餐");
					} else {
						$(".dinnerMenuBox li").eq(selectWek - 1).addClass("select").siblings().removeClass("select");
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+1))+ " " +"17:30 ~ 18:30";
					}
				} else {
					$(".dinnerMenuBox li").eq(selectWek - 1).addClass("select").siblings().removeClass("select");
					if (selectWek == wekDay){
						$scope.time = $scope.formDate(angular.copy(nowDate))+ " " +"17:30 ~ 18:30";
					}else {
						$scope.time = $scope.formDate(setDates.setDate(setDates.getDate()+1))+ " " +"17:30 ~ 18:30";
					}
				}
			} else {
				Utils.setTipBox("您只能选择当日或者次日套餐");
			}
		}
		$scope.center(".dinnerMenuBox li.select");
		$scope.changeType();
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
		str = a[0] + '-' + a[1] + '-' + a[2];
		return str;
	};

	$scope.changeType = function () {
		var _thisType = $scope.bookingType;
		if (_thisType == "1") {
			$(".dinnerCount").attr("disabled", "disabled");
			// 个人预订
			var select = $(".dinnerMenuBox li.select"),
				price = select.attr("data-price");
			$scope.id = select.attr("data-id");
			$scope.number = 1;
			$scope.amount = "￥" + (($scope.number * price * 100) / 100).toFixed(2);
			$scope.amountAll = Math.floor($scope.number * price * 100);
		} else {
			$(".dinnerCount").removeAttr("disabled");
		}
	};

	//选择饭盒
	$scope.selectLunchBox = function ($event) {
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

	// 导航操作
	$scope.navOperate = function (type) {
		if (type == "lunch") {
			setTimeout(function () {
				window.location.href = "index.html?access_token=" + $scope.token;
			}, 300);
		} else if (type == "takeOut") {
			setTimeout(function () {
				window.location.href = "takeOut.html?access_token=" + $scope.token;
			}, 300);
		}

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

	// 调取下单
	$scope.createOrder = function () {
		var data = {
			foodCategoryId: $scope.id,
			type: $scope.bookingType,
			orderTime: $scope.time.split(" ")[0]+" "+"18:30:00",
			boxCount: $('.radioBtn').hasClass("select") ? 1 : 0,
			orderNum: $scope.number,
			priceAll: $scope.amountAll
		};
		if (!$scope.time) {
			Utils.setTipBox("请选择预订时间");
			return;
		}
		if ($scope.bookingType == '2') {
			data.typeId = $scope.typeName;
			// 单位的，不需要微信支付
			Utils.ajaxLoadData("post", Utils.baseUrl + 'food/foodorder/addOrder', data, function (data) {
				$scope.orderId = data.orderId;
				$scope.closeOrOpenTipBox("open");
			});
		} else {
			Utils.ajaxLoadData("post", Utils.baseUrl + 'food/foodorder/addOrder', data, function (data) {
				$scope.orderId = data.orderId;
				$scope.pay(data.prepay_id, data.nonce_str, data.timeStamp, data.sign);
			});
		}

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

	// 获取晚餐列表
	$scope.getMealList();
	$scope.getUnitName();


}]).filter("gowek", function () {
	return function (type) {
		var wek = "";
		if (type == '1') {
			wek = "周一";
		} else if (type == '2') {
			wek = "周二";
		} else if (type == '3') {
			wek = "周三";
		} else if (type == '4') {
			wek = "周四";
		} else if (type == '5') {
			wek = "周五";
		}
		return wek;
	}
});