var app = angular.module('myApp', []);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
    });
}]);

app.controller('AppCtrl', ['$scope', '$http','$interval','$location', function ($scope, $http,$interval,$location) {
	
	
	//获取订单详情
	$scope.currentPage = 0;  
	$scope.totalPages = 1;  
	$scope.pageSize = 10;  
	$scope.orderList = [];  

	$scope.getOrderList=function(searchStr,pageNo){
		if(pageNo){
			$scope.currentPage=0;
			$scope.totalPages=1;
			$scope.orderList=[];
		}
		if ($scope.currentPage < $scope.totalPages) {  
        	$scope.currentPage++;
        	
			var start=$location.search().start+" 00:00:00";
			var end=$location.search().end + " 23:59:59";
			if(!searchStr){
				searchStr=decodeURI($location.search().searchStr);
			}
			$http.get(Utils.baseUrl+'pass/list',{  
			    params: { 'startDate':start , 'endDate':end , 'searchKey':searchStr,'pageSize':$scope.pageSize,pageNo:$scope.currentPage },
			    headers:{'Authorization':$location.search().access_token}
			})  
			.success(function(response){  
			    if(response.result){
			    	$scope.totalPages=response.data.page.pageCount;
			    	for(var i=0;i<response.data.page.rows.length;i++){
			    		if(response.data.page.rows[i].takeType==0){
			    			response.data.page.rows[i].needPassPersonnelName=response.data.page.rows[i].createUserName;
			    			response.data.page.rows[i].needPassPersonnelMobile=response.data.page.rows[i].createUserMobile;
			    		}
			    		$scope.orderList.push(response.data.page.rows[i]);
			    	}
				}else{
					Utils.setTipBox(response.message);
				}
			}).error(function (error) {
				$scope.closeOrOpenTipBox('close');
				var msg = "获取数据失败，请重试！";
				Utils.setTipBox(msg);
			}); 
        	
        }
	}
	
	$scope.goRenew=function(id){
		location.href="index.html?id="+id+"&access_token="+$location.search().access_token;;
	}
	
	//跳转详情页
	$scope.goDetail=function(id){
		location.href="order.html?id="+id+"&renew=1&access_token="+$location.search().access_token;;
	}
	
	$("body").keydown(function() {
		if (event.keyCode == "13") {//keyCode=13是回车键
			var searchStr=$("[name='searchStr']").val();
		    $scope.getOrderList(searchStr,1);
		}
	}); 
	
	$(function(){
		//获取订单详情
		$scope.getOrderList();
		var htmlHeight=window.screen.availHeight;
		var htmlHeader=$(".colorHeader").outerHeight();
		$(".historyListBox").css("height",((htmlHeight-htmlHeader)*0.0433)+"rem");
	})

}]);

// 定义滚动指令  
app.directive('whenScrolled', function() {  
    return function(scope, elm, attr) {  
        // 内层DIV的滚动加载  
        var raw = elm[0];  
        elm.bind('scroll', function() {  
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);  
            }  
        });  
    };  
});  
