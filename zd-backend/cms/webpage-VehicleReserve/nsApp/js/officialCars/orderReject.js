var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {
    
    $scope.rejectResaon = "";
	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.time = "";
	$scope.countDown = 3;
	var countDownFn;
    // 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carorder/orderInfo', data,$scope.token, function (data) {
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

    // 驳回或者通过
    $scope.rejectOrPass = function (type) {
        var data = {
            orderId: $scope.orderId,
		};
        if (type == "reject"){
            data.orderStatus = '2'; //驳回状态码为2
            data.repulseReason = $scope.rejectResaon;
        }else if (type == "pass"){
            data.orderStatus = '1';  // 通过状态码为1
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/updateOrderStatus', data,$scope.token, function (data) {
			if (data.result == true) {
                // 成功提示todo (调到订单详情页面)
                setTimeout(function(){
                    window.location.href="orderDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
                },1000);
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
    
    $scope.getOrderInfo();
}]);