(function() {
	 'use strict';
	 
	 app.controller('TCodeGrid',Grid);
	 
	 var editCtrl = "TCodeEdit";
	 app.controller(editCtrl,DCtrl);

	 var base = '/codeitem/';
	 var editUrl = '../admin/pages/user/c_code_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base + 'list.do';

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
	 		HttpUtils.post($scope.url , sendData ,function (data) {
	 			$scope.paginationConf.totalItems =data.data.total;
	 			$scope.rows = data.data.rows;
	 		});
	 	 }  
	     
	     //新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.post(base + "initAdd.do",sendData,function (data) {
		    	var site = {};
		    	site.data= data;
	 			site.title = 'ADD';
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
	 		HttpUtils.post(base + "initUpdate.do",sendData,function (data) {
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
	 			HttpUtils.post(base +  'deleteById.do',sendData,function (data) {
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
    		size: 'lg',
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
				HttpUtils.post(base + 'addSave.do',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				HttpUtils.post( base + 'updateSave.do',sendData,function () {
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
	
	
})();



