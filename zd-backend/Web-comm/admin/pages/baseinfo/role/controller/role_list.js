(function() {
	 'use strict';
	 
	 app.controller('TRoleGrid',Grid);
	 
	 var editCtrl = "TRoleEdit";
	 app.controller(editCtrl,DCtrl);

	 var base = '/authority/role/';
	 var baseII = '/authority/auth/';
	 var editUrl = '../admin/pages/baseinfo/role/role_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,parkuserChoose,resourceChoose){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base + 'list';
		 
		 $scope.parkId;
		 $scope.isRemote = false;

	     //配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     //请求后台数据
	     function getGridData(){
	    	
	    	if(!$scope.isRemote){
	    		var sendData = {
    				searchKeys:currKeys,
    				pageNo: $scope.paginationConf.currentPage,
    				pageSize: $scope.paginationConf.pageSize
	    		}
	    		HttpUtils.get(base + '/list' , sendData ,function (data) {
	    			$scope.paginationConf.totalItems =data.data.page.total;
	    			$scope.rows = data.data.page.rows;
	    		});
	    	}else{
	    		//调用其它本地化园区接口
	    		romateList();
	    	}
	 	 }
	     
	     function romateList(){
    	 	var jsondata = {
    			searchKeys:currKeys,
    			pageNo: $scope.paginationConf.currentPage,
    			pageSize: $scope.paginationConf.pageSize
    		}
    		var sendData = {parkId:$scope.parkId,url:"/authority/role/list",type:"GET",data:JSON.stringify(jsondata)};
    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
    			$scope.paginationConf.totalItems =data.data.page.total;
    			$scope.rows = data.data.page.rows;
    		});
	     }
	     
	     //下属可登录园区
		/*function parkList(){
	    	var parkId = "";
	    	if(!$scope.parkId){
	    		parkId = $scope.parkId;
	    	}
	    	
	    	var sendData = {
	    		parkId:parkId
    		}
    		HttpUtils.get("/baseinfo/park/selete" , sendData ,function (data) {
    			$scope.parkList =data.data;
    		});
	     }
	     parkList();
	     
	     $scope.seletePark =  function (){
	    	 $scope.isRemote = false;
    		angular.forEach($scope.parkList,function(obj,i){
        		if(obj.id==$scope.parkId && obj.parkType=='local'){
        			$scope.isRemote = true;
        		}
        	});
    		getGridData();
	     }*/
	     
	     //新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.get(base + "init",sendData,function (data) {
		    	var site = {};  
		    	site.data= data;
		    	site.parkId = $scope.parkId;
	 			site.title = '新增';
	 			site.code = 1;
	 			site.url =  editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
		    });
	 	 };
	 	 
	 	 
	 	 
	     //修改
	     $scope.update = function (id) {
	    	var sendData = {id:id};
	 		HttpUtils.get(base + "init",sendData,function (data) {
	 			var site = {};
	 			site.data = data;
	 			site.parkId = $scope.parkId;
	 			site.title = '编辑';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }

	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     //删除
	     $scope.deleteById = function(id) {
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(base +  'deleteById',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','删除成功！',modalCode.success);
	 				}
	 			);
	 		});
	 	 };
	     
	     //用户
	 	$scope.userlist = function (roleId) {
	 		
	 		if(!$scope.isRemote){
	 			//查看已有用户
		 		var sendData = {
		 			roleId:roleId
		 		};
		 		HttpUtils.get(baseII+"usersOfRole" , sendData ,function (resp) {
		 			
		 			var list = resp.data.ids;
		 			var checkedList = [];
		 			angular.forEach(list,function(obj,i){
	        			if(obj){
	        				checkedList[i] = {userId:obj/*.id,userName:obj.realname*/};
	        			}
	        		});
		 			
		 			var param = checkedList;
		            parkuserChoose.chooseUsers(function (users) {
		            	saveRoleUsers(roleId,users);
		            },param);
		 			
		 		});
	 		}else{
	 			var jsondata = {roleId:roleId};
	    		var sendData = {parkId:$scope.parkId,url:"/baseinfo/user/roleUsers",type:"GET",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			var list = data.data.page.rows;
		 			var checkedList = [];
		 			angular.forEach(list,function(obj,i){
	        			if(obj){
	        				checkedList[i] = {userId:obj.id,userName:obj.realname};
	        			}
	        		});
		 			
		 			var param = checkedList;
		            parkuserChoose.chooseRemoteUsers(function (users) {
		            	saveRoleUsers(roleId,users);
		            },param,$scope.parkId);
	    		});
	 		}
	 		
	 		
        };
        
        var saveRoleUsers=function(roleId,users){
        	
        	var userIds = "";
        	angular.forEach(users,function(obj,i){
    			if(obj){
    				userIds += obj.userId+",";
    			}
    		});
        	
        	if(!$scope.isRemote){
        		var sendData = {
    	 			roleId:roleId,
    	 			userIds:userIds
    	 		};
    	 		HttpUtils.post(baseII+"saveUsersRole" , sendData ,function (data) {
    	 			ModalCtrl.show('提示',data.message,modalCode.success);
    	 		});
        	}else{
        		var jsondata = {
    				roleId:roleId,
    				userIds:userIds
    			};
	    		var sendData = {parkId:$scope.parkId,url:"/authority/aurelation/saveUsersRole",type:"POST",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			ModalCtrl.show('提示',data.message,modalCode.success);
	    		});
        	}
        	
        };
        
        //权限
	 	$scope.resourcelist= function (roleId,editable) {
	 		
	 		if(!$scope.isRemote){
	 			//查看已有用户
	 			var sendData = {
	 					roleId:roleId
	 			};
	 			HttpUtils.get(baseII+"powersOfRole" , sendData ,function (data) {
	 				
	 				var list = data.data.ids;
	 				var checkedList = [];
	 				angular.forEach(list,function(obj,i){
	 					if(obj){
	 						checkedList[i] = {id:obj};
	 					}
	 				});
	 				
	 				var param = checkedList;
	 				resourceChoose.chooses(function (data) {
	 					//console.log(data);
	 					saveRoleResource(roleId,data);
	 				},param,editable);
	 				
	 			});
	 		}else{
	 			var jsondata = {roleId:roleId};
	    		var sendData = {parkId:$scope.parkId,url:"/authority/aurelation/powersOfRole",type:"GET",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			var list = data.data.ids;
	 				var checkedList = [];
	 				angular.forEach(list,function(obj,i){
	 					if(obj){
	 						checkedList[i] = {id:obj};
	 					}
	 				});
	 				
	 				var param = checkedList;
	 				resourceChoose.choosesRemote(function (data) {
	 					//console.log(data);
	 					saveRoleResource(roleId,data);
	 				},param,$scope.parkId);
	    			
	    		});
	 		}
	 		
        };
        
        var saveRoleResource=function(roleId,users){
        	
        	var ids = "";
        	angular.forEach(users,function(obj,i){
    			if(obj){
    				ids += obj.id+",";
    			}
    		});
        	
        	if(!$scope.isRemote){
        		var sendData = {
        				roleId:roleId,
        				ids:ids
        		};
        		
        		HttpUtils.post(baseII+"saveRoleResources" , sendData ,function (data) {
        			ModalCtrl.show('提示',data.message,modalCode.success);
        		});
        	}else{
        		
        		var jsondata = {roleId:roleId,ids:ids};
	    		var sendData = {parkId:$scope.parkId,url:"/authority/aurelation/saveRoleResources",type:"POST",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			ModalCtrl.show('提示',data.message,modalCode.success);
	    		});
        		
        	}
        	
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



