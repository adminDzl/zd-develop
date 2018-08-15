(function() {
	 'use strict';
	 
	 app.controller('TParkResGrid',Grid);
	 
	 var editCtrl = "TParkResEdit";
	 app.controller(editCtrl,DCtrl);

	 var base = '/authority/init/admin/';
	 //var editUrl = '../admin/pages/baseinfo/role/role_edit.html';
	 var tmplBase = '../admin/pages/baseinfo/parkresourceadmin/utils';
	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,userChoose,resourceChoose){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base + 'park';
		 
		 $scope.parkId;
		 $scope.isRemote = false;

	     //配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     //请求后台数据
	     function getGridData(){
	    	
//	    	if(!$scope.isRemote){
	    		var sendData = {
    				searchKeys:currKeys,
    				pageNo: $scope.paginationConf.currentPage,
    				pageSize: $scope.paginationConf.pageSize
	    		}
	    		HttpUtils.get($scope.url , sendData ,function (data) {
	    			$scope.paginationConf.totalItems =data.data.page.total;
	    			$scope.rows = data.data.page.rows;
	    		});
//	    	}else{
//	    		//调用其它本地化园区接口
//	    		romateList();
//	    	}
	 	 }
	     

	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }

	     //用户
	 	$scope.userlist = function (parkId) {
	 		
	 			//查看已有用户
		 		var sendData = {
		 			parkId:parkId
		 		};
		 		HttpUtils.get(base + "parkAdmins" , sendData ,function (resp) {

	 				var list = resp.data.ids;
	 				var checkedRows = [];
	 				angular.forEach(list,function(obj,i){
	 					if(obj){
	 						checkedRows[i] = {userId:obj};
	 					}
	 				});
		 			
	 				userChoose.chooseUsers(function (users) {
		            	saveRoleUsers(parkId,users);
		            },checkedRows,parkId,{templateUrl:tmplBase+'/users_choose_dialog.html?version='+new Date().getTime()});
		 			
		 		});
	 		
	 		
	 		
        };
        
        var saveRoleUsers=function(parkId,users){
        	
        	var userIds = "";
        	if(parkId=='platformPark'&&users.length==0){
	 			ModalCtrl.show('提示',"至少需要选择一个用户作为平台管理员",modalCode.danger);
	 			return;
        	}
        	angular.forEach(users,function(obj,i){
    			if(obj){
    				userIds += obj.userId+",";
    			}
    		});
        	
        		var sendData = {
    	 			parkId:parkId,
    	 			userIds:userIds,
    	 			
    	 		};
    	 		HttpUtils.post(base + "saveParkAdmins" , sendData ,function (data) {
    	 			ModalCtrl.show('提示',data.message,modalCode.success);
    	 		});
        	
        };
        //权限
	 	$scope.resourcelist= function (parkId) {
	 		
	 		//if(!$scope.isRemote){
	 			//查看已有用户
	 			var sendData = {
	 					parkId:parkId
	 			};
	 			HttpUtils.get(base + "parkResources" , sendData ,function (resp) {
	 				
	 				var list = resp.data.ids;
	 				var checkedList = [];
	 				angular.forEach(list,function(obj,i){
	 					if(obj){
	 						checkedList[i] = {id:obj};
	 					}
	 				});
	 				
	 				//var param = checkedList;
	 				resourceChoose.chooses(function (data) {
	 					//console.log(data);
	 					saveRoleResource(parkId,data);
	 				},checkedList,parkId=='platformPark'?false:true,{templateUrl:tmplBase+'/t_resource_choose.html?version='+new Date().getTime()});
	 				
	 			});
//	 		}else{
//	 			var jsondata = {roleId:roleId};
//	    		var sendData = {parkId:$scope.parkId,url:"/authority/aurelation/powersOfRole",type:"GET",data:JSON.stringify(jsondata)};
//	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
//	    			var list = data.data.ids;
//	 				var checkedList = [];
//	 				angular.forEach(list,function(obj,i){
//	 					if(obj){
//	 						checkedList[i] = {id:obj};
//	 					}
//	 				});
//	 				
//	 				var param = checkedList;
//	 				resourceChoose.choosesRemote(function (data) {
//	 					//console.log(data);
//	 					saveRoleResource(roleId,data);
//	 				},param,$scope.parkId);
//	    			
//	    		});
//	 		}
	 		
        };
        
        var saveRoleResource=function(rowId,choosenObjs){
        	
        	var ids = "";
        	angular.forEach(choosenObjs,function(obj,i){
    			if(obj){
    				ids += obj.id+",";
    			}
    		});
        	
//        	if(!$scope.isRemote){
        		var sendData = {
        				parkId:rowId,
        				ids:ids
        		};
        		
        		HttpUtils.post(base+"saveParkResources" , sendData ,function (data) {
        			ModalCtrl.show('提示',data.message,modalCode.success);
        		});
//        	}else{
//        		
//        		var jsondata = {roleId:roleId,apis:ids};
//	    		var sendData = {parkId:$scope.parkId,url:"/authority/aurelation/saveRoleApis",type:"POST",data:JSON.stringify(jsondata)};
//	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
//	    			ModalCtrl.show('提示',data.message,modalCode.success);
//	    		});
//        		
//        	}
        	
        };

	 }
     //打开页面
     function open(site,$modal) {
    	$modal.open({
 			templateUrl:site.url+'?v='+new Date().getTime(),
 			controller: site.ctrl,
 			controllerAs:'mm',
 			resolve:{
 				site:function () {
 					return site;
 				}
 			}
 		});
 	 }

    
	function DCtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		if(mm.site.code == 1){
			
			
		}
		if(mm.site.code == 2){
			mm.form = site.data.data;
		};

		mm.addSave = function () {
			
			if(!mm.site.parkId){
				localSave()
			}else{
				remoteSave();
			}
			$modalInstance.close();
		};
		
		function localSave(){
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
				});
			}
		}
		
		mm.close = function () {
			$modalInstance.close();
		};
		
		function remoteSave(){
			if(mm.site.code == 1){
				var jsondata = angular.copy(mm.form);
	    		var sendData = {parkId:mm.site.parkId,url:base + 'addSave',type:"POST",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
	    		});
			}else{
				var jsondata = angular.copy(mm.form);
	    		var sendData = {parkId:mm.site.parkId,url:base + 'updateSave',type:"POST",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
	    		});
			}
		}
		
		
	}
	
	
})();



