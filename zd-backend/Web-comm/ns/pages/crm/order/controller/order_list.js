(function() {
	 'use strict';
	 
	 app.controller('CrmOrderGrid',Grid);
	 
	 var sellCtrl = "CrmOrderSell";
	 app.controller(sellCtrl,DCtrl);
	 
	 var rantCtrl = "CrmOrderRant";
	 app.controller(rantCtrl,DRentCtrl);
	 
	 var demandSelectCtrl= "CrmOrderDemandSelect";
	 app.controller(demandSelectCtrl,DeSelectCtrl);
	 
	 var customerSelectCtrlName= "CrmCustomerSelectSelect";
	 app.controller(customerSelectCtrlName,customerSelectCtrl);
	
	 var dictSelectCtrlName= "CrmDictSelectCtrl";
	 app.controller(dictSelectCtrlName, dictSelectCtrl);
	 
	 var base = '/crm/order/';
	 var dictUrl = '/crm/common/dict/list';
	 var sellUrl = '../admin/pages/crm/order/order_sell.html';
	 var rantUrl = '../admin/pages/crm/order/order_rent.html';
	 var demandUrl = '../admin/pages/crm/order/order_demand_select.html';
	 var customerUrl = '../admin/pages/crm/order/order_customer_select.html';
	 var dicthtmlUrl = '../admin/pages/crm/order/order_dict_select.html';
	 
	 var schemaObjUrl = '/crm/room/schemaObj/list';
	 var roomUrl = '/crm/room/list';
	 
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
	     
	     //销售
	     $scope.addSell = function () {
	    	var sendData = {};
	    	HttpUtils.get(base + "initGrid",sendData,function (data) {
		    	var site = {};
		    	site.data= data;
	 			site.title = '新增销售';
	 			site.code = 1;
	 			site.url =  sellUrl;
	 			site.ctrl = sellCtrl;
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
		    });
	 	 };
	 	 
	 	//销售
	     $scope.addRant = function () {
	    	var sendData = {};
	    	HttpUtils.get(base + "initGrid",sendData,function (data) {
		    	var site = {};
		    	site.data= data;
	 			site.title = '新增租赁';
	 			site.code = 1;
	 			site.url =  rantUrl;
	 			site.ctrl = rantCtrl;
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
	 			 site.url =  sellUrl;
	 			 site.ctrl = sellCtrl;
	 			 open(site,$modal);
	    	 });
	 	 }
	 	
	     //修改
	     $scope.update = function (id,type) {
	 		var sendData = {id:id};
	 		var url = base + "findRentById";
	 		if(type==2)url = base + "findSellById";
	 		HttpUtils.get(url,sendData,function (data) {
	 			var site = {};
	 			site.data = data;
	 			site.title = '修改';
	 			site.code = 2;
	 			site.url =  rantUrl;
	 			site.ctrl = rantCtrl;
	 			if(type==2){
	 				site.url =   sellUrl;
		 			site.ctrl = sellCtrl;
	 			}
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
	 		});
	 	 }
	     
	     
	   //修改阶段
	     $scope.updateStage = function (id,type,orderStage) {
	    	    var site = {};
	 			site.title = '修改阶段';
	 			site.url =  dicthtmlUrl;
	 			site.ctrl = dictSelectCtrlName;
	 			site.type = type;
	 			site.id = id;
	 			site.orderStage = orderStage;
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
	 	 }
	     
	   //删除
	     $scope.updateRoom = function(id) {
	 		ModalCtrl.show('提示','确定将该客户对应的房源进行再次租售！',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.get(base +  'updateRoom',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','转租售成功！',modalCode.success);
	 				}
	 			);
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
    
     //销售单
	function DCtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance,$http,$modal,$scope) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		mm.layerSelects=[];
		
		if(mm.site.code == 1){
			
			
		}
		if(mm.site.code == 2){
			mm.form = site.data.data.entity;
		}
		
		mm.getDict = function(code){
			var obj = {};
			HttpUtils.get(dictUrl,{parentCode:code},function (data) {
				
				 mm.sellPays = data.data;
				
			});
			
		};
		
		mm.getRoom = function(j,pid){
			HttpUtils.get(schemaObjUrl,{channel:"gradual",parentId:pid},function (data) {
				var layerSelect ={};
				layerSelect.layers = data.data;
				for ( var i = 0; i <mm.layerSelects.length; i++){
				   if(i>j){
					   mm.layerSelects.splice(i,1);
				   }
				}
				if(layerSelect.layers.length!=0){
					mm.layerSelects.push(layerSelect);
				}
				
				
				HttpUtils.get(roomUrl,{channel:"gradual",schemaObjId:pid,useStatus:1},function (data) {
					mm.roomList = data.data;
				});
			});
		};
		mm.getRoom(0,null);
		
		mm.selectRoom =function (r){
			if(!r){
				for ( var i = 0; i <mm.roomList.length; i++){
					var room =mm.roomList[i];
					if(mm.roomId == room.id){
						r = room;
						break;
					}
				}
			}
			mm.room = r;
		}
		mm.selected  ={};
		mm.selected.roomList = [];
		mm.addRoom =function (){
			var hasRoom = false;
			for ( var i = 0; i <mm.selected.roomList.length; i++){
				var room = mm.selected.roomList[i];
				if(mm.room && mm.room.id == room.id){
					hasRoom = true;
					break;
				}
			}
			
			if(!hasRoom)mm.selected.roomList.push(mm.room);
			mm.layerSelects=[];
			mm.roomList=[];
			mm.getRoom(0,null);
		}
		mm.delRoom =function (i){
			mm.selected.roomList.splice(i,1);
		}
	    mm.sellPays ={};
	    mm.sellPays = mm.getDict("ORDER_SELL_PAY");//销售订单支付方式
	    
	    if(!mm.form.order)mm.form.order  ={};
	   if(!mm.form.order.roomList) mm.form.order.roomList = [];
	    mm.toOrderRooms = function (){
	    	for ( var i = 0; i <mm.selected.roomList.length; i++){
				var room = mm.selected.roomList[i];
				var orderRoom = {};
				orderRoom.roomId = room.id;
				orderRoom.roomPrice = room.salePrice;
				orderRoom.roomArea = room.constructionArea;
				 mm.form.order.roomList.push(orderRoom);
			}
	    }
		mm.addSell = function () {
			mm.toOrderRooms();
			if(mm.site.code == 1){
				var sendData = angular.toJson(mm.form);
                 HttpUtils.postJson(base + 'addSell',sendData,function (data) {
					
					if(!data.result){
						ModalCtrl.show('提示',data.message,modalCode.error);
					}else{
						mm.site.refresh();
						ModalCtrl.show('提示','新增成功',modalCode.success);
					}
					
				});
			}else if(mm.site.code == 2){
				var sendData = angular.toJson(mm.form);
				HttpUtils.postJson( base + 'updateSell',sendData,function (data) {
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
		}
		
		//打开意向单页面
		mm.toDemand = function () {
			var site={}
	    	    site.title = '意向单';
	 			site.code = -1;
	 			site.url =  demandUrl;
	 			site.ctrl = demandSelectCtrl;
	 			/*site.refresh = function () {
	 				getGridData();
	 			};*/
	 			site.getDemand = function(demand){
	 				$scope.mm.demandCustimerName = demand.custimerName;
	 				$scope.mm.form.order.demandId = demand.id;
	 			}
	 			open(site,$modal);
	 	 };
	 	 
	 	//打开客户页面
		mm.toCustomer = function () {
			var site={}
	    	    site.title = '客户';
	 			site.code = -1;
	 			site.url =  customerUrl;
	 			site.ctrl = customerSelectCtrlName;
	 			/*site.refresh = function () {
	 				getGridData();
	 			};*/
	 			site.getCustomer = function(customer){
	 				$scope.mm.custimerName = customer.name;
	 				$scope.mm.form.order.customerId = customer.id;
	 			}
	 			open(site,$modal);
	 	 };
	}
	
	//租赁单
	function DRentCtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance,$http,$modal,$scope) {
		var mm = this;
		mm.site = site;
		mm.form = {orderRent:{rentalList:[{}]}};//清空表单数据
		mm.select=[];
		mm.layerSelects=[];
		if(mm.site.code == 1){
			
			
		}
		if(mm.site.code == 2){
			mm.form = site.data.data.entity;
			if(!mm.form.orderRent.rentalList ||!mm.form.orderRent.rentalList[0])mm.form.orderRent.rentalList=[{}];
		}
		
		
		mm.getDict = function(code){
			var obj = {};
			HttpUtils.get(dictUrl,{parentCode:code},function (data) {
				
				 mm.rentPays = data.data;
				
			});
			
		};
		
		mm.getRoom = function(j,pid){
			HttpUtils.get(schemaObjUrl,{channel:"gradual",parentId:pid,useStatus:1},function (data) {
				var layerSelect ={};
				layerSelect.layers = data.data;
				for ( var i = 0; i <mm.layerSelects.length; i++){
				   if(i>j){
					   mm.layerSelects.splice(i,1);
				   }
				}
				if(layerSelect.layers.length!=0){
					mm.layerSelects.push(layerSelect);
				}
				
				
				HttpUtils.get(roomUrl,{channel:"gradual",schemaObjId:pid},function (data) {
					mm.roomList = data.data;
				});
			});
		};
		mm.getRoom(0,null);
		
		mm.selectRoom =function (r){
			if(!r){
				for ( var i = 0; i <mm.roomList.length; i++){
					var room =mm.roomList[i];
					if(mm.roomId == room.id){
						r = room;
						break;
					}
				}
			}
			mm.room = r;
		}
		mm.selected  ={};
		mm.selected.roomList = [];
		mm.addRoom =function (){
			var hasRoom = false;
			for ( var i = 0; i <mm.selected.roomList.length; i++){
				var room = mm.selected.roomList[i];
				if(mm.room && mm.room.id == room.id){
					hasRoom = true;
					break;
				}
			}
			
			if(!hasRoom)mm.selected.roomList.push(mm.room);
			mm.layerSelects=[];
			mm.roomList=[];
			mm.getRoom(0,null);
		}
		mm.delRoom =function (i){
			mm.selected.roomList.splice(i,1);
		}
		
	    mm.rentPays ={};
	    mm.rentPays = mm.getDict("ORDER_RENT_PAY");//租赁订单支付方式
	    
	    mm.getReletWay = function(code){
			var obj = {};
			HttpUtils.get(dictUrl,{parentCode:code},function (data) {
				
				mm.reletWays = data.data;
				
			});
			
		};
	    mm.reletWays ={};
	    mm.reletWays = mm.getReletWay("ORDER_RENT_RELETWAY");//续租方式
	    
	    
	    if(!mm.form.order)mm.form.order  ={};
	    if(!mm.form.order.roomList)  mm.form.order.roomList = [];
	    mm.toOrderRooms = function (){
	    	for ( var i = 0; i <mm.selected.roomList.length; i++){
				var room = mm.selected.roomList[i];
				var orderRoom = {};
				orderRoom.roomId = room.id;
				orderRoom.roomPrice = room.rentPrice;
				orderRoom.roomArea = room.constructionArea;
				 mm.form.order.roomList.push(orderRoom);
			}
	    }
	    
		mm.addRent = function () {
			mm.toOrderRooms();
			if(mm.site.code == 1){
				//var sendData = angular.copy(mm.form);
				var sendData = angular.toJson(mm.form);
                 HttpUtils.postJson(base + 'addRent',sendData,function (data) {
					
					if(!data.result){
						ModalCtrl.show('提示',data.message,modalCode.error);
					}else{
						mm.site.refresh();
						ModalCtrl.show('提示','新增成功',modalCode.success);
					}
					
				});
			}else if(mm.site.code == 2){
				var sendData = angular.toJson(mm.form);
				HttpUtils.postJson( base + 'updateRent',sendData,function (data) {
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
		}
		
		//打开意向单页面
		mm.toDemand = function () {
			var site={}
	    	    site.title = '意向单';
	 			site.code = -1;
	 			site.url =  demandUrl;
	 			site.ctrl = demandSelectCtrl;
	 			/*site.refresh = function () {
	 				getGridData();
	 			};*/
	 			site.getDemand = function(demand){
	 				$scope.mm.demandCustimerName = demand.custimerName;
	 				$scope.mm.form.order.demandId = demand.id;
	 			}
	 			open(site,$modal);
	 	 };
	 	 
	 	//打开客户页面
		mm.toCustomer = function () {
			var site={}
	    	    site.title = '客户';
	 			site.code = -1;
	 			site.url =  customerUrl;
	 			site.ctrl = customerSelectCtrlName;
	 			/*site.refresh = function () {
	 				getGridData();
	 			};*/
	 			site.getCustomer = function(customer){
	 				$scope.mm.custimerName = customer.name;
	 				$scope.mm.form.order.customerId = customer.id;
	 			}
	 			open(site,$modal);
	 	 };
	 	mm.addRental = function (){
	 		var rental = {};
	 		mm.form.orderRent.rentalList.push(rental);
	 	};
	 	mm.delRental = function (i){
	 		mm.form.orderRent.rentalList.splice(i,1);
	 	};
	}
	//意向单选择
	function DeSelectCtrl(site,$scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,$modalInstance) {
		var currKeys = undefined;
		 $scope.url = "/crm/orderDemand/grid";
		 
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
	 			noOrder:"1",
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		}

	 		HttpUtils.get($scope.url, sendData ,function (data) {
	 			$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.demands = data.data.page.rows;
	 		});
	 		
	 	 }  
	   //搜索
	    $scope.search = function (keys,e) {
	 		if(e && e.keyCode !== 13)
	 			return;
	 		currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	}
	    $scope.chkDemand = function(demand){
	    	if($scope.demand && $scope.demand.id){
	    		//ModalCtrl.show('提示',"只能选择一条数据!",modalCode.error);
	    		return;
	    	}
	    	$scope.demand = demand;
	    }
	    
	    $scope.updateSelection = function($event, id){
	    	 var checkbox = $event.target;
	    	 if(!checkbox.checked){
	    		 $scope.demand = {};
	    	 }
	    }
	    mm.confirm =function(){
	    	if(!$scope.demand && !$scope.demand.id){
	    		//ModalCtrl.show('提示',"请选择一条数据！",modalCode.error);
	    		return;
	    	}
	        site.getDemand($scope.demand);
	        $modalInstance.close();
	    	
	    }
		mm.close = function () {
			$modalInstance.close();
		}
	}
	//客户选择
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
	};
	//订单阶段选择
	function dictSelectCtrl(site,$scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,$modalInstance) {
		
		var mm = this;
		mm.site = site;
		
	     
	   //请求后台数据
		mm.getGridDataAA = function (code){
	 	

	 		HttpUtils.get(dictUrl,{parentCode:code},function (data) {
				
	 			$scope.dicts = data.data;
				
	 			
			});
	 		
	 	 } 
	     var code = "ORDER_RENT_STAGE";//租赁阶段
	     if(mm.site.type == 2){
	    	 code = "ORDER_SELL_STAGE";//租赁阶段
	     }

	    mm.getGridDataAA(code);
	    console.log(mm.site.orderStage);
	    $scope.selected = [];
	    $scope.updateSelection = function($event,id){
	    	 var checkbox = $event.target;
	
	    	 if(checkbox.checked){
	    		 $scope.selected.push(id);
	    		 if($scope.selected.length>1){
	 				
	 	    		ModalCtrl.show('提示',"只能选择一条数据!",modalCode.error);
	 	    		return;
	 	    	}
	 	    	
	    	 }else{
	    		 if($scope.selected.indexOf(id)>-1){
	    			 var dix = $scope.selected.indexOf(id);
	    			 $scope.selected.splice(dix,1);  
	    		 }
	    	 }
	    }
	    mm.confirm =function(){
	    	if($scope.selected.length !=1 ){
	    		ModalCtrl.show('提示',"请选择一条数据！",modalCode.error);
	    		return;
	    	}
           HttpUtils.get(base+"updateOrderStage",{id:site.id,orderStage:$scope.selected[0]},function (data) {
				
        	   if(!data.result){
					ModalCtrl.show('提示',data.message,modalCode.error);
				}else{
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
				}
        	   
			});

	        $modalInstance.close();
	    	
	    }
		mm.close = function () {
			$modalInstance.close();
		};
	}
})();



