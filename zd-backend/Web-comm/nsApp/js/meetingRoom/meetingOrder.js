var app = angular.module('myApp', []);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
    });
}]);

app.controller('AppCtrl', ['$scope', '$http','$interval','$location', function ($scope, $http,$interval,$location) {
	
	$scope.hasCarInfo=$location.search().type ? $location.search().type : 0 ;
	
	//评分
	$scope.selectStart=function($event){
		var _thisStartLevel= Number($($event.currentTarget).attr("data-start"));
		$($event.currentTarget).parent().find("li").removeClass("select");
		for(var i=1;i<=_thisStartLevel;i++){
			$($event.currentTarget).parent().find("li[data-start='"+i+"']").addClass("select");
		}
	}
	
	//提交评价
	$scope.getComment=function(){
		$scope.judgeState(3);
	}
	
	//取消订单
	$scope.cancelOrder=function(){
		$scope.judgeState(4);
	}
	
	//判断状态
	$scope.judgeState=function(orderState){
		//0:待审核 1：已审核 2：待评价 3：评价 4:已取消 5:已驳回
		if(orderState==0){
			$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
		}else if(orderState<=3){
			for(var i=0;i<(Number(orderState)+1);i++){
				$(".orderStateBox ul li").eq(i).addClass("select");
			}
			$(".orderStateBox ul li").removeClass("current");
			$(".orderStateBox ul li").eq(Number(orderState)).addClass("current");
			$(".orderStateBox > div em").css("width",Number(orderState)*33+'%');
		}else if(orderState==5 || orderState==4){
			$(".orderStateBox").addClass("rejectOrder");
		}
		$scope.hasCarInfo=orderState;
		$location.search('type',orderState) 
	}
	
	
	angular.element(document).ready(function () {
		var orderStateNum=0;
		if($location.search().type){
			orderStateNum=$location.search().type;
		}
		$scope.judgeState(orderStateNum);
	});
		

}]);