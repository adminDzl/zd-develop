(function() {
	 'use strict';
	 
	 app.controller('queryUserInfoController',Grid);
	 

	 var base = '/baseinfo/userinfo/';

	 
	 function Grid($scope, $http, $state, $stateParams,$window,HttpUtils,ModalCtrl,modalCode,$modal){
		 $scope.url = base +'detail';
	     //请求后台数据
	     function getUserInfo(){
	 		HttpUtils.get($scope.url, {} ,function (data) {
	 			$scope.userInfo = data.data.userDetailMap;
	 			var orgList=data.data.userDetailMap.orgList;
	 			var parkList=data.data.userDetailMap.parkList;
	 			$scope.userInfo.org="";
	 			$scope.userInfo.park="";
	 			if(orgList){
	 				for (var i = 0; i < orgList.length; i++) {
	 					if(i<(orgList.length-1)){
	 						
	 						$scope.userInfo.org=$scope.userInfo.org+orgList[i].orgName+',  ';
	 					}else{
	 						
	 						$scope.userInfo.org=$scope.userInfo.org+orgList[i].orgName;
	 					}
					}
	 			}
	 			if(parkList){
	 				for (var i = 0; i < parkList.length; i++) {
	 					if(i<(parkList.length-1)){
	 						$scope.userInfo.park=$scope.userInfo.park+parkList[i].parkName+',  ';
	 					}else{
	 						$scope.userInfo.park=$scope.userInfo.park+parkList[i].parkName;
	 					}
	 					
					}
	 			}
	 		});
	 	 }  
	     getUserInfo();
	     $scope.sexList=[{'value':0,'name':'女'},{'value':1,'name':'男'},{'value':2,'name':'保密'}];
	     
	     $scope.submit=function(obj){
	    	var photoUrl=$("input[name='photoUrl']").val();
			obj.photoUrl=photoUrl;
			HttpUtils.post(base + 'updateSave',obj,function (data) {
				 getUserInfo();
				ModalCtrl.show('提示','编辑成功',modalCode.success);
				$window.location.reload();
			});
	 	 
	     }
	     
	     
	 }
	 
	 app.filter("photoImgUrl",function(){
			return function(url){
				if(!url){
					return url;
				}
				if(url.indexOf("http") != -1){
					return url;
				}else{
					return Utils.fileServerViewUrl+url;
				}
			}
		})
})();



