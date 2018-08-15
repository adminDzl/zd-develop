var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {

	$scope.orderInfo = {};

	// 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: "eb3f25c19493468eb80dca558f1d6c6f",
		};
		Utils.ajaxLoadData("get",Utils.baseUrl+'car/carorder/orderInfo',data,function(data){
			if (data.result == true) {
				$scope.orderInfo = data.data;
			};
		},function(error){
			// TODO错误处理
			console.log(error);
		});
	};
	
	$scope.countDown=3;
	var countDownFn;

	
	//倒计时
	$scope.countDownFn=function(){
		if($scope.countDown>0){
			$scope.countDown--;
		}else{
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
		}
	};
	
	//关闭提示框
	$scope.closeOrOpenTipBox=function(type){
		if(type=="open"){
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.countDown=3;
			countDownFn=$interval($scope.countDownFn,1000);  
			
			setTimeout(function(){
				window.location.href="orderDetail.html?access_token=" + $scope.token;
			},4300);
		}else if(type=="close"){
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
			setTimeout(function(){
				$window.location.href="orderDetail.html?access_token=" + $scope.token;
			},1000);
		}
	};

	$scope.getOrderInfo();
	

}]);