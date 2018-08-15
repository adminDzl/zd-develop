var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {

	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.token = Utils.getValueInPathByName("access_token");
    $scope.orderInfo = "";
	$scope.time = "";
	$scope.countDown = 3;
	var countDownFn;
    // 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carorder/orderInfo', data, $scope.token, function (data) {
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

    // 司机操作 接单、到达出发地、用车完成
    $scope.driverOperate = function (params) {
        var data = {
            orderId: $scope.orderId
		};
        if (params == '4') {
            data.orderStatus = "4";
        } else if (params == '5'){
            data.orderStatus = "5";
        }else if (params == '6') {
            data.orderStatus = "6";
        }
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/orderReceiving', data, $scope.token, function (data) {
			if (data.result == true) {
                // 接单成功、到达出发地成功、用车完成等提示
                if (params == '6') {
                    setTimeout(function(){
                        window.location.href="orderDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
                    },300);
                }else{
                    $scope.getOrderInfo();
                }
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