var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {

	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.token = Utils.getValueInPathByName("access_token");
    $scope.orderInfo = "";
	$scope.time = "";
    // 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carorder/orderInfo', data, function (data) {
			$scope.orderInfo = data;
			$scope.time = data.startTime + "~" + data.endTime;
			$scope.orderInfo.useType = $scope.orderInfo.useType == "1" ? "正常公务" : "特殊情况";
			$scope.$apply();
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
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/orderReceiving', data, function (data) {
			// 接单成功、到达出发地成功、用车完成等提示
			if (params == '6') {
				setTimeout(function(){
					window.location.href="orderDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
				},300);
			}else{
				$scope.getOrderInfo();
			}
		});
	};
	

	// 初始化获取订单信息
	$scope.getOrderInfo();
		

}]);