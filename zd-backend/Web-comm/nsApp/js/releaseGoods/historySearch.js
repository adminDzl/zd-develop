var app = angular.module('myApp', []);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
    });
}]);

app.controller('AppCtrl', ['$scope', '$http','$interval','$location', function ($scope, $http,$interval,$location) {
	
	$scope.goSearch=function(){
		var startTime=$("[name='vistTimeStart']").val();
		var endTime=$("[name='vistTimeEnd']").val();
		var searchStr=$("[name='searchStr']").val();
		location.href="historyList.html?start="+startTime+"&end="+endTime+"&searchStr="+encodeURI(searchStr)+"&access_token="+$location.search().access_token;
	}
	
	$(function(){
		var ddd = new Date();
		var day =ddd.getDate();
		
		if(ddd.getMonth()<10){
		var month = "0"+(ddd.getMonth()+1); 
		}
		
		if(ddd.getDate()<10){
		 day = "0"+ddd.getDate(); 
		}
		
		var datew = ddd.getFullYear()+"-"+month+"-"+day;
		var datew = datew.toString();
		
		$("[name=vistTimeStart]").val(datew);
		$("[name=vistTimeEnd]").val(datew);
		
	})

}]);

