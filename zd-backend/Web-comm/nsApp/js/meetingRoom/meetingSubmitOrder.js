var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http,$interval) {
	
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
	}
	
	//关闭提示框
	$scope.closeOrOpenTipBox=function(type){
		if(type=="open"){
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.countDown=3;
			countDownFn=$interval($scope.countDownFn,1000);  
			
			setTimeout(function(){
				window.location.href="meetingOrder.html?type=0";
			},4300);
		}else if(type=="close"){
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
			setTimeout(function(){
				$window.location.href="meetingOrder.html?type=0";
			},1000);
		}
	}
	

}]);