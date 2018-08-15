(function() {
	 'use strict';
	 
	 app.controller('TCompanyUserGrid',Grid);
	 
	 var editCtrl = "TCompanyUserEdit";
	 var detailCtrl = "TCompanyUserDetail";
	 app.controller(editCtrl,DCtrl);
	 app.controller(detailCtrl,ECtrl);
	 app.controller("UpdateOrgPasswordEdit",UpdatePasswordCtrl);

	 var base = '/baseinfo/user/';
	 var editUrl = '../admin/pages/baseinfo/user/user_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,userCompanyChoose,userParkChoose){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +"listOrgUsers";

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
	 			 site.ctrl = "TCompanyUserDetail",
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
	   //移出企业
		 	$scope.removeOrg = function(id){
		    	 var sendData = {"userId":id};
		    	 HttpUtils.get(base + "removeUserOrgRelation",sendData,function (data) {
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
				HttpUtils.post(base + 'addOrgUserSave',sendData,function (data) {
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



