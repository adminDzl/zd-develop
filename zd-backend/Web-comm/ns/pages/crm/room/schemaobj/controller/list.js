(function() {
	 'use strict';
	 
	 app.controller('CrmSchemaObjGrid',PageGrid);
	 
	 var editCtrl = "CrmSchemaObjEdit";
	 app.controller(editCtrl,PageEdit);

	 var base = '/crm/room/schemaObj/';
	 var schemaBase = '/crm/room/schema/';
	 var editUrl = '../admin/pages/crm/room/schemaobj/panel_edit.html';

	 
	 function PageGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,DataUtils){

		 $scope.schemaName="";
		 $scope.schemaList=[];
	     // 配置分页，监听分页
	     /*$scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });*/
		 $scope.schemaObjId=null;
		 $scope.schemaObj={};
		 $scope.schemaObjTree={};
		 $scope.schemaObjList=[];
	     $scope.onNodeSelect = function(schemaObj) {
			 $scope.schemaObjId = schemaObj.id;
	     }
	     $scope.$watch('schemaObjId', function () {
		     getViewData();
	     });
	     $scope.$watch('schemaObj', function () {
	    	 initGrid();
	     });
	     function initGrid(){
			 if($.trim($scope.schemaObj.schemaId)==""){
				var sendData = {};
				HttpUtils.get( schemaBase + 'list', sendData ,function (response) {
					var schemaList = response.data;
					$.each(schemaList,function(i,e){
						e.name = e.label;
					});
					$scope.schemaList = schemaList;
				});
				$scope.schemaName="";
			 }else{
				var sendData = {parentId:$scope.schemaObj.schemaId};
				HttpUtils.get( schemaBase + 'findLeaf', sendData ,function (response) {
					$scope.schemaList = response.data;
				});
				sendData = {schemaId:$scope.schemaObj.schemaId};
				HttpUtils.get( schemaBase + 'getConfigBySchemaId', sendData ,function (response) {
					if(response.data.entity!=null){
						$scope.schemaName = response.data.entity.keyName;
					}
				});
			 }
	     }
	     
	     // 请求后台数据
	     getGridData();
	     function getGridData(){
		 	var sendData = {
				/*searchKeys: $scope.searchKeys,
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.pageSize*/
			};
		 	HttpUtils.get(base + 'list', sendData ,function (response) {
		 		var schemaObjList = response.data;
			 	$.each(schemaObjList,function(i,e){
			 		e.expanded=true;
			 	});
		 		schemaObjList = DataUtils.parseTree(schemaObjList,'parentId','name');
		 		$scope.schemaObjList = [{id:"",label:"全部",children:schemaObjList,expanded:true}];
		 	});
	 	 }
	     function getViewData(){
	    	 if($.trim($scope.schemaObjId)!=""){
		    	 var sendData={id:$scope.schemaObjId};
				 HttpUtils.get(base + "findById",sendData,function (response) {
					 $scope.schemaObj = response.data.entity;
				 });
	    	 }else{
				 $scope.schemaObj = {};
	    	 }
	     }

	     // 搜索
	     /*$scope.search = function (e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }*/
	     
	     // 新增
	     $scope.addNew = function (schema) {
	    	var parentId = $scope.schemaObjId;
	    	var sendData = {schemaId:schema.id,parentId:parentId};
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
	     $scope.update = function () {
	    	 if($.trim($scope.schemaObjId)==''){
					ModalCtrl.show('提示','未选择对象！',modalCode.warning);
	    		 return;
	    	 }
		    var sendData = {id:$scope.schemaObjId,schemaId:$scope.schemaObj.schemaId};
	 		HttpUtils.get(base + "initEdit",sendData,function (response) {
	 			var site = {};
	 			site.data = response.data;
	 			site.title = '编辑';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
	 				getGridData();
	 				getViewData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }
	     // 删除
	     $scope.deleteById = function(id) {
	    	 var id=$scope.schemaObjId;
	    	 if($.trim(id)==''){
					ModalCtrl.show('提示','未选择对象！',modalCode.warning);
	    		 return;
	    	 }
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(base +  'deleteById',sendData,function (data) {
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
			if(site.data.model.schemaId==null){
				ModalCtrl.show('提示','缺少层级信息！',modalCode.danger);
				$modalInstance.close();
			}
			$scope.form = {schemaId:site.data.model.schemaId,modelData:{}};// 清空表单数据
			$scope.columns = site.data.model.columns;
			//$scope.site为外部引用参数对象 1为新增 2为修改
			$scope.site = site;
			if(site.code == 1){
				$scope.form.parentId = site.parentId;
			}
			if(site.code == 2){
				$scope.form = angular.copy(site.data.entity);
			};

			$scope.addSave = function () {
				if(site.code == 1){
					var sendData = angular.copy($scope.form);
					setModelData(sendData);
					HttpUtils.post(base + 'addSave',sendData,function (data) {
						$scope.site.refresh();
						ModalCtrl.show('提示','新增成功',modalCode.success);
						$modalInstance.close();
					});
				}else if(site.code == 2){
					var sendData = angular.copy($scope.form);
					setModelData(sendData);
					HttpUtils.post( base + 'updateSave',sendData,function () {
						$scope.site.refresh();
						ModalCtrl.show('提示','修改成功！',modalCode.success);
						$modalInstance.close();
					});
				}
			}
			$scope.close = function () {
				$modalInstance.close();
			}
			
			function setModelData(sendData){
				var customedAttrs = sendData.customedAttrs;
				sendData.customedAttrs=null;
				sendData.customedAttrsStr = JSON.stringify(customedAttrs,null,null);
			}
		}
	
	
})();



