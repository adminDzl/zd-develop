(function() {
	 'use strict';
	 
	 app.controller('CustomerGrid',InitGrid);
	 
	 var editCtrl = "CustomerEdit";
	 app.controller(editCtrl,InitEdit);

	 var base = '/crm/customer/';
	 //var initBase = '/authority/init/';
	 var editUrl = '../admin/pages/crm/customer/customer/panel_edit.html';
	 var tmplBase = '../admin/pages/crm/customer/customer/utils';
	 
	 function InitGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,contactChoose){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base + 'grid';
		 
		 $scope.parkId;
		 $scope.isRemote = false;

	     // 配置分页，监听分页
	     $scope.paginationConf = {pageSize: 10, currentPage: 1 };
	     $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
	    	 getGridData();
	 	 });
	     
	     // 请求后台数据
	     function getGridData(){
		 	var sendData = {
				searchKeys:currKeys,
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
	 	 
	     // 修改
	     $scope.update = function (id) {
	    	var sendData = {id:id};
	 		HttpUtils.get(base + "initEdit",sendData,function (resp) {
	 			var site = {};
	 			site.data = resp.data;
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
	     // 删除
	     $scope.deleteById = function(id) {
	 		ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'ids':id};
	 			HttpUtils.post(base +  'deleteByIds',sendData,function (data) {
	 					getGridData();
	 					if(data.result == true){
	 						ModalCtrl.show('提示','删除成功！',modalCode.success);

	 					}else{
	 						ModalCtrl.show(data.message, modalCode.error);
	 					}
	 				}
	 			);
	 		});
	 	 };
	 	 
	 	 
	        //联系人
		 	$scope.contact= function (id) {		 		
		 		$state.go("app.t_contact",{id:id});
		 		//查看已有联系人
/*		 		var sendData = {
		 				parkId:parkId
		 		};
		 		HttpUtils.get(base + "grid" , sendData ,function (resp) {
		 			
		 			var list = resp.data.ids;
		 			var checkedList = [];
		 			angular.forEach(list,function(obj,i){
		 				if(obj){
		 					checkedList[i] = {id:obj};
		 				}
		 			});
		 			
		 			contactChoose.chooseUser(function (data) {
						saveRoleResource(parkId,data);
		 			},checkedList,parkId=='platformPark'?false:true,{templateUrl:tmplBase+'/contact_choose.html?version='+new Date().getTime()});
		 			
		 		});*/

		 		
	        };
	        
	        //跟踪信息
	        $scope.setTail= function(id){
	        	$state.go("app.t_tail", {id:id});
	        };
	        
	        $scope.setCompany= function(id){
	        	$state.go("app.t_company", {id:id});
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

    
	function InitEdit($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		$scope.form = {};// 清空表单数据
		//$scope.site为外部引用参数对象 1为新增 2为修改
		$scope.site = site;
		
		if(site.code == 1){
			
		}
		if(site.code == 2){
			site.data.entity.cusType = site.data.entity.cusType + '';
			$scope.form = angular.copy(site.data.entity);
		};

		$scope.addSave = function () {
			if(site.code == 1){
				var sendData = angular.copy($scope.form);
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
					$modalInstance.close();
				});
			}else if(site.code == 2){
				var sendData = angular.copy($scope.form);
				HttpUtils.post( base + 'updateSave',sendData,function () {
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



