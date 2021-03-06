(function() {
	 'use strict';
	 
	 app.controller('TServiceGrid',InitGrid);
	 
	 var editCtrl = "TServiceEdit";
	 app.controller(editCtrl,InitEdit);

	 var base = '/authority/resource/';
	 //var initBase = '/authority/init/';
	 var editUrl = '../admin/pages/baseinfo/parkservice/panel_edit.html';

	 
	 function InitGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,DataUtils){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base + 'service/grid';
		 
		 $scope.parkId;
		 $scope.isRemote = false;
		 $scope.serviceList=[];

		 $scope.selected={};
		 $scope.nodeTree={};
		 $scope.nodeList=[];
		 initGrid();
	     function initGrid(){
			 var sendData = {};
			 HttpUtils.get( base + 'service/list', sendData ,function (response) {
			 	var data = response.data;
			 	var dataTrim = [];
			 	$.each(data,function(i,e){
			 		//保留类型为服务组的
			 		if(e.type2==4||e.type2==5){
				 		e.expanded=true;
				 		dataTrim.push(e);
			 		}
			 	});
			 	var nodeList = DataUtils.parseTree(dataTrim,'parentId','name');
		 		$scope.nodeList = [{id:"",label:"全部",children:nodeList,expanded:true}];
			 	$scope.serviceList = dataTrim;
			 });
	     }
	     $scope.onNodeSelect = function(treeNode) {
	    	 $scope.selected = treeNode;
	     }
	     // 配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize + selected.id', function () {
	    	 getGridData();
	 	 });
	     
	     // 请求后台数据
	     function getGridData(){
		 	var sendData = {
				searchKeys:currKeys,
				parentId: $scope.selected.id,
				//type2: 5,//只要服务类型，不要服务组
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.pageSize
			};
		 	HttpUtils.get($scope.url, sendData ,function (data) {
		 		$scope.paginationConf.totalItems =data.data.page.total;
		 		$scope.rows = data.data.page.rows;
		 	});
	 	 }

	     // 搜索
	     $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     
	     // 新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.get(base + "initEdit",sendData,function (resp) {
		    	var site = {};  
		    	site.data = resp.data;

	 			site.parentId = $scope.selected.id;
	 			site.parentList = $scope.serviceList;
	 			
	 			site.title = '新增';
	 			site.code = 1;
	 			site.url =  editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
 					initGrid();
	 				getGridData();
	 			};
	 			open(site,$modal);
		    });
	 	 };
	 	 
	     // 修改
	     $scope.update = function (id) {
	    	var sendData = {id:id};
	 		HttpUtils.get(base + "initEdit",sendData,function (resp) {
	 			var site = {};
	 			site.data = resp.data;
	 			
	 			site.parentList = $scope.serviceList;
	 			
	 			site.parkId = $scope.parkId;
	 			site.title = '编辑';
	 			site.code = 2;
	 			site.url =   editUrl,
	 			site.ctrl = editCtrl,
	 			site.refresh = function () {
 					initGrid();
	 				getGridData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }
	     // 删除
	     $scope.deleteById = function(id) {
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'ids':id};
	 			HttpUtils.post(base +  'deleteByIds',sendData,function (data) {
 						initGrid();
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
 			size:"lg",
 			resolve:{
 				site:function () {
 					return site;
 				}
 			}
 		});
     }

    
	function InitEdit($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		$scope.form = {orderNo:10};// 清空表单数据
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
				var imagePathPc=$("input[name='imagePathPc']").val();
				sendData.imagePathPc=imagePathPc;
				var imagePathMb=$("input[name='imagePathMb']").val();
				sendData.imagePathMb=imagePathMb;
				HttpUtils.post(base + 'service/addSave',sendData,function (data) {
					site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
					$modalInstance.close();
				});
			}else if(site.code == 2){
				var sendData = angular.copy($scope.form);
				var imagePathPc=$("input[name='imagePathPc']").val();
				sendData.imagePathPc=imagePathPc;
				var imagePathMb=$("input[name='imagePathMb']").val();
				sendData.imagePathMb=imagePathMb;
				
				HttpUtils.post( base + 'service/updateSave',sendData,function () {
					site.refresh();
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



