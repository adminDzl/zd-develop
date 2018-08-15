(function() {
	 'use strict';
	 
	 app.controller('TParkGrid',Grid);
	 
	 var editCtrl = "TParkEdit";
	 app.controller(editCtrl,DCtrl);

	 var base = '/baseinfo/park/';
	 var editUrl = '../admin/pages/baseinfo/park/park_edit.html';

	 
	 function Grid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal,parkChoose){
	 	
		 var currKeys = undefined;
		 
		 $scope.url = base +'manageList';
		 
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
	 		$scope.keyword = currKeys;
	 		$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
	 	 }
	     //删除
	     $scope.deleteById = function(id,status1) {
	    	 var msg = '';
	    	if(status1 == 1){
	    		status1 = -1;
	    		msg = '禁用成功';
	    	}else{
	    		status1 = 1;
	    		msg = '开放成功';
	    	}
	    	 
	    	var sendData = {
	    		 'id':id,
	    		 'status1':status1
	    	};
			HttpUtils.post( base + 'updateSave',sendData,function () {
				getGridData();
				ModalCtrl.show('提示',msg,modalCode.success);
			});
	    	 
	 		/*ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
	 			var sendData = {'id':id};
	 			HttpUtils.post(base +  'deleteById',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','删除成功！',modalCode.success);
	 				}
	 			);
	 		});*/
	 	 }
	     //园区数据初始化
	     $scope.parkInit = function(id) {
	    	 ModalCtrl.show('提示','您确定要初始化当前园区数据吗？',modalCode.default,function () {
	    		 var sendData = {'parkId':id};
	    		 HttpUtils.post('/baseinfo/parkInit/parkInit',sendData,function (data) {
	    			 getGridData();
	    			 ModalCtrl.show('提示','初始化成功！',modalCode.success);
	    		 }
	    		 );
	    	 });
	     }
	     //加入园区
	     $scope.joinPark = function(id){
	    	 var checkIds=[];
	    	 var form = {};
	    	 HttpUtils.get(base +'getParkPPark', {"fromId" : id} ,function (data) {
	    		 var dataList=data.data;
	    		 for (var i = 0; i < dataList.length; i++) {
	    			 checkIds.push(dataList[i].toId);
				}
	    	 });
	    	 parkChoose.choose(function (data) {
	    		if(data && data.length>0){
	    			var orgId = data[0];
		         	if(!orgId){
		            	ModalCtrl.show('提示','请选择园区！',modalCode.warning);
		   	    	}
		         	if(id == orgId){
		            	ModalCtrl.show('提示','不能选择自己！',modalCode.warning);
		            	return;
		   	    	}else{
		   	    	}
		         	//删除园区-园区关系
		         	HttpUtils.post('/baseinfo/relation/deleteParkPark',{"parkId":id},function (data) {
		         		saveParkPark(id,orgId);	
		         	});
		 		}
	            },checkIds,"",{"parkId":id});
	    	 console.log(form);
	     }
	     
	   //保存园区-园区关系
	     function saveParkPark(parkId,orgId){
	    	var sendData = {fatherId:orgId,childId:parkId};
			HttpUtils.post('/baseinfo/relation/saveParkPark',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','加入园区成功',modalCode.success);
			});
	     }
	     
	     
	     $scope.parkUsers = function(id){
	    	 $state.go("app.parkmember",{id:id});
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
    
	function DCtrl(site,$scope,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		mm.keyCode = {};
		HttpUtils.get('/baseinfo/dictionary/findListBykeyCode',{"keyCode":"PARK_INDUSTRY"},function (data) {
			mm.site.industryList = data.data;
		});
			
		mm.site.parkTypeList = [{'id':'saas','name':'SaaS部署'},{'id':'local','name':'本地化部署'}]
		mm.form.parkType = "saas";
		
		
		if(mm.site.code == 1){
			//new PCAS("province","city","district","江苏省","苏州市","沧浪区");
		}
		if(mm.site.code == 2){
			mm.form = site.data.data;
			
			try {
				if(site.data.data.geographyX && site.data.data.geographyY){
					mm.form.geography = (site.data.data.geographyX || "")+","+(site.data.data.geographyY || "");
				}
				
			} catch (e) {}
			mm.form.location = {"province":mm.form.province,"city":mm.form.city,"district":mm.form.district};
			//$scope.location = {"province":'广东',"city":'广州',"district":'荔湾区'};
		}

		mm.addSave = function () {
			mm.form.province = mm.form.location.province||'';
			mm.form.city = mm.form.location.city||'';
			mm.form.district = mm.form.location.district||'';
			
			if(mm.site.code == 1){		
				
				
				if(!mm.form.name){
					ModalCtrl.show('提示','请输入名称',modalCode.warning);
					return false;
				}
				if(!mm.form.parkType){
					ModalCtrl.show('提示','请输入名称',modalCode.warning);
					return false;
				}
				
				if(!mm.form.address){
					ModalCtrl.show('提示','请输入详细地址',modalCode.warning);
					return false;
				}
				
				if(!mm.form.parkTel){
					ModalCtrl.show('提示','请输入客服热线',modalCode.warning);
					return false;
				}
				
				var geography = mm.form.geography;
				var strArr = [];
				strArr=geography.split(","); //字符分割 
				mm.form.geographyX = strArr[0];
				mm.form.geographyY = strArr[1];
				
				if(!mm.form.geography){
					ModalCtrl.show('提示','请输入园区方位',modalCode.warning);
					return false;
				}
				
				
				var sendData = angular.copy(mm.form);
				
				
				
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
				});
			}else if(mm.site.code == 2){
				
				var geography = mm.form.geography;
				var strArr = [];
				strArr=geography.split(","); //字符分割 
				mm.form.geographyX = strArr[0];
				mm.form.geographyY = strArr[1];
				
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

	
	
})();



