(function() {
	 'use strict';
	 
	 app.controller('CrmSchemaGrid',PageGrid);
	 
	 var editCtrl = "CrmSchemaEdit";
	 app.controller(editCtrl,PageEdit);

	 var schemaBase = '/crm/room/schema/';
	 var base = '/crm/common/dict/';
	 var editUrl = '../admin/pages/crm/room/schema/panel_edit.html';

	 
	 function PageGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 $scope.url = base + 'grid';

		 $scope.schemaId=null;
		 $scope.schemaConfig={};
		 $scope.schemaTree={};
		 $scope.schemaList=[];
		 initGrid();
	     function initGrid(){
			 var sendData = {};
			 HttpUtils.get( schemaBase + 'list', sendData ,function (response) {
			 	var schemaList = response.data;
				$.each(schemaList,function(i,e){
					e.expanded=true;
					$.each(e.children,function(i,ee){
						ee.expanded=true;
					});
				});
			 	$scope.schemaList = schemaList;
			 });
	     }
	     $scope.onNodeSelect = function(schema) {
			 var sendData = {schemaId:schema.id};
			 $scope.schemaId = schema.id;
			 //$scope.schemaConfig = {};
			 HttpUtils.get( schemaBase + 'getConfigBySchemaId', sendData ,function (response) {
				if(response.data.entity!=null){
				    $scope.schemaConfig = response.data.entity;
			    	$scope.search();
				}else{
					$scope.schemaConfig={};
					sendData = {schemaName:schema.label,schemaId:schema.id};
					HttpUtils.post(schemaBase + 'saveConfig', sendData ,function (response) {
						$scope.schemaConfig = response.data.entity;
					    $scope.search();
					});
				}
			 });
	     }
	     // 配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     // 请求后台数据
	     function getGridData(){
	    	if($scope.schemaConfig.keyCode==null){
	    		console.log("info:no parentCode.")
	    		return;
	    	}
		 	var sendData = {
				searchKeys: $scope.searchKeys,
				parentCode: $scope.schemaConfig.keyCode,
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.pageSize
			};
		 	HttpUtils.get($scope.url, sendData ,function (data) {
		 		$scope.paginationConf.totalItems = data.data.page.total;
		 		$scope.rows = data.data.page.rows;
		 	});
	 	 }
	     // 保存层的属性编号
	     $scope.saveConfig = function () {
	    	 var sendData = {
	    		id:$scope.schemaConfig.id,
	    		keyCode:$scope.schemaConfig.keyCode,
	    		keyName:$scope.schemaConfig.keyName
	    	 };
			 HttpUtils.post(schemaBase + 'saveConfig', sendData ,function (data) {
			 	$scope.paginationConf.totalItems =data.data.page.total;
			 	$scope.rows = data.data.page.rows;
			 });
	 	 }

	     // 搜索
	     $scope.search = function (e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     
	     // 新增
	     $scope.addNew = function () {
	    	 var parentId = $scope.schemaConfig.id;
	    	 if(parentId==null){
				ModalCtrl.show('提示','请选择层级！',modalCode.warning);
				return;
	    	 }
	    	var sendData = {};
		    HttpUtils.get(base + "initEdit",sendData,function (response) {
		    	var site = {};  
		    	
		    	site.parentId = parentId;
		    	
		    	site.data = response.data;
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
	 	 
	     // 修改
	     $scope.update = function (id) {
	    	var sendData = {id:id};
	 		HttpUtils.get(base + "initEdit",sendData,function (response) {
	 			var site = {};
	 			site.data = response.data;
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
	     // 删除
	     $scope.deleteById = function(id) {
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(schemaBase +  'deleteColumn',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','删除成功！',modalCode.success);
	 				}
	 			);
	 		});
	 	 };
	     
	 }
     // 打开页面
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


		function PageEdit($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
			$scope.form = {};// 清空表单数据
			//$scope.site为外部引用参数对象 1为新增 2为修改
			$scope.site = site;
			if(site.code == 1){
				if(site.parentId==null){
					ModalCtrl.show('提示','缺少层级信息！',modalCode.danger);
					return;
				}
				$scope.form.parentId = site.parentId;
			}
			if(site.code == 2){
				$scope.form = angular.copy(site.data.entity);
			};

			$scope.addSave = function () {
				if(site.code == 1){
					var sendData = angular.copy($scope.form);
					HttpUtils.post(schemaBase + 'addColumn',sendData,function (data) {
						$scope.site.refresh();
						ModalCtrl.show('提示','新增成功',modalCode.success);
						$modalInstance.close();
					});
				}else if(site.code == 2){
					var sendData = angular.copy($scope.form);
					HttpUtils.post( schemaBase + 'updateColumn',sendData,function () {
						$scope.site.refresh();
						ModalCtrl.show('提示','修改成功！',modalCode.success);
						$modalInstance.close();
					});
				}
			}
			$scope.close = function () {
				$modalInstance.close();
			}
		}
	
	
})();



