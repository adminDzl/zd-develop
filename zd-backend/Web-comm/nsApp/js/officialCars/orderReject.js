var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {
    
    $scope.rejectResaon = "";
	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.token = Utils.getValueInPathByName("access_token");
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

    // 驳回或者通过
    $scope.rejectOrPass = function (type) {
        var data = {
            orderId: $scope.orderId,
		};
        if (type == "reject"){
            data.orderStatus = '2'; //驳回状态码为2
            if(!$scope.rejectResaon){
            	Utils.setTipBox("请输入驳回理由!");
				return;
            }else{
            	data.repulseReason = $scope.rejectResaon;
            }
        }else if (type == "pass"){
			data.orderStatus = '1';  // 通过状态码为1
			if($scope.rejectResaon){
				Utils.setTipBox("通过时请勿输入驳回理由!");
				return;
			}
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/updateOrderStatus', data, function (data) {
			// 成功提示todo (调到订单详情页面)
			setTimeout(function(){
				window.location.href="orderDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
			},1000);
		});
	};
    
    $scope.getOrderInfo();
}]);