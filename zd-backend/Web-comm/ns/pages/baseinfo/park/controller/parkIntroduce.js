(function() {
	 'use strict';
	 
	 app.controller('queryParkInfoController',Grid);
	 

	 var base = '/baseinfo/park/';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
		 $scope.url = base +'findById';
	     //请求后台数据
	     function getParkInfo(){
	 		HttpUtils.get($scope.url, {} ,function (data) {
	 			$scope.parkInfo = data.data;
	 			$scope.parkInfo.coordinate = data.data.geographyX+','+data.data.geographyY;
	 		});
	 	 }  
	     getParkInfo();
	     
	     $scope.submit=function(obj){
	    	var parkLogo=$("input[name='parkLogo']").val();
			var parkLogoApp=$("input[name='parkLogoApp']").val();
			var coordinate=$("input[name='coordinate']").val();
			if(coordinate){
				obj.geographyX=coordinate.substring(0,coordinate.indexOf(","));
				obj.geographyY=coordinate.substring(coordinate.indexOf(",")+1,coordinate.length);
			}
			obj.parkLogo=parkLogo;
			obj.parkLogoApp=parkLogoApp;

			HttpUtils.post(base + 'updateSave',obj,function (data) {
				 getParkInfo();
				ModalCtrl.show('提示','编辑成功',modalCode.success);
			});
	 	 
	     }
	     
	     
	 }
	 
	 app.filter("logoImgUrl",function(){
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



