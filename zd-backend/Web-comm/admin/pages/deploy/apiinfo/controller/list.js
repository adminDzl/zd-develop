(function() {
	 'use strict';
	 
	 app.controller('TRoleGrid',PageGrid);
	 
	 var editCtrl = "TRoleEdit";
	 app.controller(editCtrl,PageEdit);

	 var base = '/api/';
	 var editUrl = '../admin/pages/baseinfo/role/role_edit.html';

	 
	 function PageGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 $scope.url = base + 'list';

		 
	     // 配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });

		 $scope.initList = function (){
			 getGridData();
		 	HttpUtils.get(base + "initList", $scope.appInfo ,function (response) {
		 		$scope.data_microservice=response.data.data_microservice;
		 		$scope.data_group=response.data.data_group;
		 		$scope.data_tag=response.data.data_tag;
		 	});
		 }
		 $scope.initList();
		 
	     // 请求后台数据
	     function getGridData(){
		 	var sendData = {
				searchKeys: $scope.searchKeys,
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.pageSize
			};
		 	sendData = $.extend(sendData,$scope.appInfo);
		 	HttpUtils.get($scope.url, sendData ,function (response) {
		 		$scope.paginationConf.totalItems =response.data.page.total;
		 		$scope.rows = response.data.page.rows;
		 	});
	 	 }

	     // 搜索
	     $scope.search = function (e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     
	     // 详情
	     $scope.view = function (row) {
	    	var sendData = {serviceId:row.microServiceName};
	 		HttpUtils.get(base + "initView",sendData,function (response) {
	 			var host = response.data.host;
 				if($.trim(host)!=''){
 					window.open("http://"+host+"/swagger-ui.html#!/"+(row.tagName.replace(/-/g,"45")));
 				}else{
 					ModalCtrl.show('提示','连接不可用！',modalCode.info);
 				}
	 		});
	 	 }
	     
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
				
			}
			if(site.code == 2){
				$scope.form = angular.copy(site.data.entity);
			};

			$scope.addSave = function () {
				if(site.code == 1){
					var sendData = angular.copy($scope.form);
					HttpUtils.post(base + 'addSave',sendData,function (data) {
						$scope.site.refresh();
						ModalCtrl.show('提示','新增成功',modalCode.success);
						$modalInstance.close();
					});
				}else if(site.code == 2){
					var sendData = angular.copy($scope.form);
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
		}
	
	
})();



