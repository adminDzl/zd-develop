(function() {
	 'use strict';
	 
	 app.controller('TParkUserGrid',Grid);
	 
	 var editCtrl = "TParkUserEdit";
	 var detailCtrl = "TParkUserDetail";
	 app.controller(editCtrl,DCtrl);
	 app.controller(detailCtrl,ECtrl);
	 app.controller("UpdateUserPasswordEdit",UpdatePasswordCtrl);

	 var base = '/baseinfo/user/';
	 var editUrl = '../admin/pages/baseinfo/user/user_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,userCompanyChoose,userParkChoose){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +"listParkUsers";

	     //配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     //请求后台数据
	     function getGridData(){
	 		var sendData = {
	 			searchKeys:currKeys,
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		}

	 		HttpUtils.get($scope.url, sendData ,function (data) {
	 			$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.rows = data.data.page.rows;
	 		});
	 		
	 	 }  
	     
	     //新增
	     $scope.addNew = function () {
	    	var sendData = {};
	    	HttpUtils.get(base + "init",sendData,function (data) {
		    	var site = {};
		    	site.data= data;
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
	 	 
	 	 //详情
	 	$scope.detail = function(id){
	    	 var sendData = {id:id};
	    	 HttpUtils.get(base + "getUserDetail",sendData,function (data) {
	    		 var site = {};
	    		 site.data= data.data;
	 			 site.title = '用户详情';
	 			 site.url =  "../admin/pages/baseinfo/user/user_detail.html",
	 			 site.ctrl = "TParkUserDetail",
	 			 open(site,$modal);
	    	 });
	     }
	 	 
	     //修改
	     $scope.update = function (id) {
	 		var sendData = {id:id};
	 		HttpUtils.get(base + "init",sendData,function (data) {
	 			var site = {};
	 			site.data = data;
	 			site.title = '修改';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }
	     //密码
	     $scope.updatePassword = function (row) {
	 			var site = {};
	 			site.data = row;
	 			site.title = '修改密码';
	 			site.code = 1;
	 			site.url =  "../admin/pages/baseinfo/user/user_password.html",
	 			site.ctrl = UpdatePasswordCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			openInitPassword(site,$modal);
	 	 }
	     
	     //搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.keyword = currKeys;
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
	 	 }
	     //移出园区
		 	$scope.removePark = function(id){
		    	 var sendData = {"userId":id};
		    	 HttpUtils.get(base + "removeUserParkRelation",sendData,function (data) {
		    		 getGridData();
	 				 ModalCtrl.show('提示','移出成功！',modalCode.success);
		    	 });
		     }
	     
	     
	     
	     
	     
	    
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
     function openInitPassword(site,$modal) {
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
		}

		mm.addSave = function () {
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				HttpUtils.post(base + 'addParkUserSave',sendData,function (data) {
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
			$modalInstance.close();
		}
		mm.joinDisabled = false;
		mm.addDisabled = true;
				
		//加入园区用户
	     mm.joinSave = function(){
	    	 var park = JSON.parse(localStorage.currPark);
	    	 if(!park){
	    		 ModalCtrl.show('提示','园区ID不为空！',modalCode.danger);
					//$modalInstance.close();
					return;
	    	 }
	    	 if(!mm.form.id){
	    		 ModalCtrl.show('提示','用户ID不为空！',modalCode.danger);
					//$modalInstance.close();
					return;
	    	 }
	    	 var sendData = {
	    			 "userId":mm.form.id,
	    			 "parkId":park.id
	    	 }
	    	 HttpUtils.post("/baseinfo/relation/saveUserPark",sendData,function (data) {
	    		 if(data.result){
	    			 mm.site.refresh();
					 ModalCtrl.show('提示','关联成功！',modalCode.success);		
	    		 }
	    	 });
	     }
	     
	     //检查用户是否已存在
	     mm.checkExist = function($event){
	    	 if(!mm.form.realname || !mm.form.mobile){
	    		 return false;
	    	 }
	    	 var sendData = {
	    			 "realname":mm.form.realname,
	    			 "mobile":mm.form.mobile
	    	};
	    	 HttpUtils.post(base + "checkUserExist",sendData,function (data) {
	    		 if(data.result){
	    			 if(data.data.flag == 2){
	    				 mm.addDisabled = false;
	    				 mm.joinDisabled = true;
	    				 mm.form.nickname = data.data.user.nickname;
	    				 mm.form.email = data.data.user.email;
	    				 mm.form.remark = data.data.user.remark;
	    				 mm.form.id = data.data.user.id;
	    				 mm.form.photoUrl = data.data.user.photoUrl;
	    			 }else if(data.data.flag == 3){
	    				 mm.addDisabled = false;
	    				 mm.joinDisabled = false;
	    				 mm.form.nickname = data.data.user.nickname;
	    				 mm.form.email = data.data.user.email;
	    				 mm.form.remark = data.data.user.remark;
	    				 mm.form.id = data.data.user.id;
	    				 mm.form.photoUrl = data.data.user.photoUrl;
	    			 }else{
	    				 mm.addDisabled = true;
	    				 mm.joinDisabled = false;
	    				 if(mm.site.code == 1){
		    				 mm.form.nickname = "";
		    				 mm.form.email = "";
		    				 mm.form.remark = "";
		    				 mm.form.id = "";
		    				 mm.form.photoUrl = "";
	    				 }
	    			 }	    			
	    		 }
	    	 });
	     }
		
		mm.close = function () {
			$modalInstance.close();
		}
	}
	

	function ECtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = site.data.userDetailMap;
		var parkNames="";
		var orgNames="";
		if(mm.form.parkList.length>0){
			for(var i = 0;i<mm.form.parkList.length;i++){ 
				parkNames=parkNames+mm.form.parkList[i].parkName+',';
			 }
		}
		if(mm.form.orgList.length>0){
			for(var i = 0;i<mm.form.orgList.length;i++){ 
				orgNames=orgNames+mm.form.orgList[i].orgName+',';
			 }
		}
		mm.form.parks=parkNames;
		mm.form.orgs=orgNames;
		
		mm.close = function () {
			$modalInstance.close();
		}
	}
	
	function UpdatePasswordCtrl($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		
		var userId = mm.site.data.id;
		
		mm.updateUserPassword = function () {
			var password=$scope.password;
			if(password.length<6){
				ModalCtrl.show('提示','请输入最少六位密码！',modalCode.danger);
				$modalInstance.close();
				return;
			}
			var sendData = {"userId":userId,"password":password};
			HttpUtils.post( base + 'updatePassword',sendData,function () {
				mm.site.refresh();
				ModalCtrl.show('提示','修改成功！',modalCode.success);
				$modalInstance.close();
			});
		}
		mm.close = function () {
			$modalInstance.close();
		}
	}
	
	
})();



