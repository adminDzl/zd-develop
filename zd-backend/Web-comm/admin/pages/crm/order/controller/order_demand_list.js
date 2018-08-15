(function() {
	 'use strict';
	 
	 app.controller('CrmOrderDemandGrid',Grid);
	 
	 var editCtrl = "CrmOrderDemandEdit";
	 app.controller(editCtrl,DCtrl);
	 
	 var customerSelectCtrlName= "CrmCustomerSelectSelect";
	 app.controller(customerSelectCtrlName,customerSelectCtrl);
	 
	 var base = '/crm/orderDemand/';
	 var editUrl = '../admin/pages/crm/order/order_demand_edit.html';
	 var customerUrl = '../admin/pages/crm/order/order_customer_select.html';
	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +"grid";
		 
		

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
	    	HttpUtils.get(base + "initGrid",sendData,function (data) {
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
	 			 site.title = '意向单详情';
	 			 site.code = 3;
	 			 site.url =  editUrl,
	 			 site.ctrl = editCtrl,
	 			 open(site,$modal);
	    	 });
	 	 }
	 	
	     //修改
	     $scope.update = function (id) {
	 		var sendData = {id:id};
	 		HttpUtils.get(base + "initEdit",sendData,function (data) {
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
 			resolve:{
 				site:function () {
 					return site;
 				}
 			}
 		});
 	 }
    
	function DCtrl(site,$scope,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance,$http,$modal) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		
		if(mm.site.code == 1){
			
			
		}
		if(mm.site.code == 2){
			mm.form = site.data.data.entity;
		}
		
		mm.addSave = function () {
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
                 HttpUtils.post(base + 'addSave',sendData,function (data) {
					
					if(!data.result){
						ModalCtrl.show('提示',data.message,modalCode.error);
					}else{
						mm.site.refresh();
						ModalCtrl.show('提示','新增成功',modalCode.success);
					}
					
				});
			}else if(mm.site.code == 2){
				var sendData = angular.fromJson(mm.form);
				HttpUtils.post( base + 'updateSave',sendData,function (data) {
					if(!data.result){
						ModalCtrl.show('提示',data.message,modalCode.error);
					}else{
						mm.site.refresh();
						ModalCtrl.show('提示','修改成功！',modalCode.success);
					}
					
				});
			}
			$modalInstance.close();
		}
		mm.close = function () {
			$modalInstance.close();
		};
		
		//打开客户页面
		mm.toCustomer = function () {
			var site={}
	    	    site.title = '客户';
	 			site.code = -1;
	 			site.url =  customerUrl,
	 			site.ctrl = customerSelectCtrlName,
	 			/*site.refresh = function () {
	 				getGridData();
	 			};*/
	 			site.getCustomer = function(customer){
	 				$scope.mm.form.custimerName = customer.name;
	 				$scope.mm.custimerName = customer.name;
	 				$scope.mm.form.linkPhone = customer.mobile;
	 				$scope.mm.form.customerId = customer.id;
	 			}
	 			open(site,$modal);
	 	 };
	};
	
	function customerSelectCtrl(site,$scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,$modalInstance) {
		var currKeys = undefined;
		 $scope.url = "/crm/customer/grid";
		 
		var mm = this;
		mm.site = site;
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
	 			$scope.customers = data.data.page.rows;
	 		});
	 		
	 	 }  
	   //搜索
	    $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	}
	    $scope.chkCustomer = function(customer){
	    	if($scope.customer && $scope.customer.id){
	    		//ModalCtrl.show('提示',"只能选择一条数据!",modalCode.error);
	    		return;
	    	}
	    	$scope.customer = customer;
	    }
	    
	    $scope.updateSelection = function($event, id){
	    	 var checkbox = $event.target;
	    	 if(!checkbox.checked){
	    		 $scope.customer = {};
	    	 }
	    }
	    mm.confirm =function(){
	    	if(!$scope.customer && !$scope.customer.id){
	    		//ModalCtrl.show('提示',"请选择一条数据！",modalCode.error);
	    		return;
	    	}
	        site.getCustomer($scope.customer);
	        $modalInstance.close();
	    	
	    }
		mm.close = function () {
			$modalInstance.close();
		}
	}
})();



