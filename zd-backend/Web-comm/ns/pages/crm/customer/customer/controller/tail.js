(function () {
    'use strict';


    
    var base = '/crm/customerTail/';
    
    var editUrl = '../admin/pages/crm/customer/customer/tail_edit.html';
    
    app.controller('TailGrid', Grid);
    function Grid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {
    	var currKeys = undefined;
        $scope.url = '/crm/customerTail/grid';
        $scope.customerId = $stateParams.id;

        //配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1};
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        //请求后台数据
        function getGridData() {
            var sendData = {
            	searchKeys:currKeys,
            	customerId:$scope.customerId,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData, function (data) {
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.rows = data.data.page.rows;
                $scope.categoryList = data.categoryList;
            });
        }
        //搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
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
		    	site.customerId = $scope.customerId;
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
	    	var sendData = {
	    			id:id
	    	};
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
	 			var sendData = {'ids':id,'customerId':$scope.customerId};
	 			HttpUtils.post(base +  'deleteByIds',sendData,function (data) {
	 					getGridData();
	 					ModalCtrl.show('提示','删除成功！',modalCode.success);
	 				}
	 			);
	 		});
	 	 };
	 	 
	 	var editCtrl = "ContactEdit";
		app.controller(editCtrl,InitEdit);
	 	function InitEdit($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
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
					sendData.customerId=site.customerId;
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
    }
    
    //------------------个人用户----------------------------
//    app.controller('ParkPersonGrid', PGrid);
//    function PGrid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {
//    	var currKeys = undefined;
//        $scope.url = '/baseinfo/park/child';
//        $scope.parkId = $stateParams.id;
//
//        //配置分页，监听分页
//        $scope.paginationConf = {pageSize: 10, currentPage: 1};
//        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
//            getGridData();
//        });
//
//        //请求后台数据
//        function getGridData() {
//            var sendData = {
//            	searchKeys:currKeys,
//            	parkId:$scope.parkId,
//                pageNo: $scope.paginationConf.currentPage,
//                pageSize: $scope.paginationConf.pageSize
//            };
//            HttpUtils.get($scope.url, sendData, function (data) {
//                $scope.paginationConf.totalItems = data.data.page.total;
//                $scope.rows = data.data.page.rows;
//                $scope.categoryList = data.categoryList;
//            });
//        }
//        //搜索
//        $scope.search = function (keys, e) {
//            if (e && e.keyCode !== 13)
//                return;
//            currKeys = keys;
//            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
//        }
//    }
    
    
    //------------------下级园区------------------------------
    /*    app.controller('ChildParkGrid', CGrid);
   function CGrid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {
    	var currKeys = undefined;
        $scope.url = '/baseinfo/park/child';
        $scope.parkId = $stateParams.id;

        //配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1};
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        //请求后台数据
        function getGridData() {
            var sendData = {
            	searchKeys:currKeys,
            	parkId:$scope.parkId,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData, function (data) {
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.rows = data.data.page.rows;
                $scope.categoryList = data.categoryList;
            });
        }
        //搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        
      //修改
     $scope.save = function (id) {
 		var sendData = {parkId:id};
 		HttpUtils.get("/baseinfo/parkauthen/init",sendData,function (data) {
 			var site = {};
 			site.data = data;
 			site.fatherId= $scope.parkId;
 			site.parkId = id
 			site.title = '认证密码';
 			site.code = 2;
 			site.url =  '../admin/pages/baseinfo/park/park_authen_edit.html',
 			site.ctrl = "ChildParkAuthenEdit",
 			site.refresh = function () {
 				getGridData();
 			};
 			open(site,$modal);
 		});
 	 }
        
    }*/
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
    
     //设置下属园区的登录密码
 /*    var editCtrl = "ChildParkAuthenEdit";
	 app.controller(editCtrl,ECtrl);
	 function ECtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		
//		mm.select=[];
//		mm.site.parkTypeList = [{'id':'saas','name':'SaaS部署'},{'id':'local','name':'本地化部署'}]
//		mm.form.parkType = "saas";
		
		if(mm.site.code == 2){
			mm.form = site.data.data;
		}

		mm.addSave = function () {
			
			mm.form.parkId=mm.site.parkId;
			mm.form.fatherId=mm.site.fatherId;

			var sendData = angular.copy(mm.form);
			HttpUtils.post('/baseinfo/parkauthen/save',sendData,function (data) {
				mm.site.refresh();
				ModalCtrl.show('提示','保存成功',modalCode.success);
			});

			$modalInstance.close();
		}
		mm.close = function () {
			$modalInstance.close();
		}
	}*/

})();



