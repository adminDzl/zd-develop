(function() {
	 'use strict';
	 
	 app.controller('TDepOrderGrid',Grid);
	 
	 var editCtrl = "TDepOrderEdit";
	 app.controller(editCtrl,DCtrl);

	 var base = '/deploy/order/';
	 var editUrl = '../admin/pages/deploy/dep/order_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +"list";
		 
		 

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
	    	 HttpUtils.get(base + "findById",sendData,function (data) {
	    		 var site = {};
	    		 site.data= data;
	 			 site.title = '应用详情';
	 			 site.code = 3;
	 			 site.url =  editUrl,
	 			 site.ctrl = editCtrl,
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
	 }
     //打开页面
     function open(site,$modal) {
    	$modal.open({
 			templateUrl:site.url+'?v='+new Date().getTime(),
 			controller: site.ctrl,
 			controllerAs:'mm',
 			size:'lg',
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
			mm.form = site.data.data.orderEntity;
		}
		if(mm.site.code == 3){//查询详情
			mm.form = site.data.data.orderEntity;
		}
		//应用列表
		mm.appsList = site.data.data.appsPage.rows;
		//关系列表
		mm.selectedAppsList = site.data.data.selectedAppsList;

		mm.addSave = function () {
			//获取选中的应用id
			var appsId =[]; 
			$('input[name="appsId"]:checked').each(function(){ 
				appsId.push($(this).val()); 
			});
			
			if(appsId.length == 0){
				ModalCtrl.show('提示','下单失败，请至少选择一个应用！！！',modalCode.default);
				return;
			}
			
			//更新
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				sendData.appsId = appsId;
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				sendData.appsId = appsId;
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
	    //是否选中
		mm.isSelected = function(appsId){
	    	var flag = false;
	     	var selectedAppsList = mm.selectedAppsList;  //角色所有权限列表
	     	for(var i=0;i<selectedAppsList.length;i++) {
	     	   if(appsId==selectedAppsList[i].appId) {
	     		   flag = true;
	     	   }
	        }
	     	return flag;
	    }
	}
	
	app.filter("appImgUrl",function(){
		return function(url){
			if(url.indexOf("http") != -1){
				return url;
			}else{
				return Utils.fileServerViewUrl+url;
			}
		}
	})
})();



