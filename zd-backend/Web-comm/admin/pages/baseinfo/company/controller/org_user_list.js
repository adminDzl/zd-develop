(function() {
	 'use strict';
	 
	 app.controller('TOrgUsersGrid',Grid);
	 var base = '/baseinfo/user/';
	 var modelCode = 'userEntity';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +"listOrgUsers";
		 $scope.orgId = $stateParams.id;

	     //配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     //请求后台数据
	     function getGridData(){
	 		var sendData = {
	 			searchKeys:currKeys,
	 			orgId:$scope.orgId,
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		}

	 		HttpUtils.get($scope.url, sendData ,function (data) {
	 			$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.rows = data.data.page.rows;
	 		});
	 		
	 	 }  
	    
	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     
	     
	     //下载模板
	     $scope.toDataDownload = function(){
	    	 location.href= "/baseinfo/open/excelhead/excelTempExport?modelCode="+modelCode;
	     };
	     
	     
	   //导入数据
	     $scope.toDataImport = function(){
	         $('#dataImport').modal(); 
	         var fileInput = document.getElementById("fileInput");
	     	// for IE, Opera, Safari, Chrome
	          if (fileInput.outerHTML) {
	              fileInput.outerHTML = fileInput.outerHTML;
	          } else { // FF(包括3.5)
	              fileInput.value = "";
	          }
	     };
	     
	 	$scope.dataImport=function(){
			var fd = new FormData();
	        var file = document.querySelector('input[type=file]').files[0];
	        
	        if(!file){
	        	Utils.showTip(false,"请上传文件！");	
	        	return;
	        }
	        fd.append('file', file); 
	        fd.append('modelCode', modelCode);
	        fd.append('parkId', localStorage.currParkId);
	        fd.append('orgId', $scope.orgId);
	        $http({
		        method:'POST',
		        url:base + "importToParkAndOrg",
		        data: fd,
		        headers:{Authorization:localStorage.token,'Content-Type':undefined},
		        transformRequest: angular.identity 
	        }).success( function ( data ){
	        	 //上传成功的操作
			    if(data.result){
			    	$('#dataImport').modal("hide"); 
		    		 getGridData();
		    		 ModalCtrl.show('提示','导入数据成功',modalCode.success);
			    }else{
			    	ModalCtrl.show('提示','导入数据失败',modalCode.error);
			    }
	        })
		}
	     
	 }
	
})();



