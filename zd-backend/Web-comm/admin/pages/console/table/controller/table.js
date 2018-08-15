(function () {
    'use strict';

    app.controller('TTableGrid', Grid);
    
  //  var editCtrl = "TTableEdit";
	// app.controller(editCtrl,DCtrl);
	 
	 var base = '/console/tableinfo/';
	 var editUrl = '../admin/pages/console/table/table_edit.html';
    

    function Grid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {
    	var currKeys = undefined;
        $scope.url = base + 'list';

        //配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1};
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        //请求后台数据
        function getGridData() {
            var sendData = {
            	searchKeys:currKeys,
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
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        
         //新增
	     $scope.addNew = function () {
	    	
	    	 $state.go("app.table_edit");
	    	 
//	    	var sendData = {};
//		    HttpUtils.get(base + "init",sendData,function (data) {
//		    	var site = {};
//	 			site.title = '新增';
//	 			site.code = 1;
//	 			site.url =  editUrl,
//	 			site.ctrl = editCtrl,
//	 			site.refresh = function () {
//	 				getGridData();
//	 			};
//	 			open(site,$modal);
//		    });
	 	 };
	 	 
	 	 //修改
	     $scope.update = function (id) {
	 		var sendData = {id:id};
	 		HttpUtils.get(base + "init",sendData,function (data) {
	 			var site = {};
	 			site.entity = data.data;
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

   
	function DCtrl(site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		mm.dataType=[{"id":"1","text":"用户"},{"id":"2","text":"订单"}];
		mm.parkList=[{"id":"a","text":"园区a","check":false},{"id":"b","text":"园区b","check":false},{"id":"c","text":"园区c","check":false}];
		mm.timeList=[{"id":"year","text":"年"},{"id":"month","text":"月"},{"id":"day","text":"日"}];
		mm.typeList=[{"id":"business","text":"商户","check":false},{"id":"company","text":"企业","check":false},{"id":"person","text":"个人","check":false}];
		mm.tableList=[{"id":"pie","text":"饼图"},{"id":"bar","text":"柱状图"},{"id":"line","text":"折线图"}];
		
		if(mm.site.code == 1){
			
		}
		if(mm.site.code == 2){
			mm.form = site.entity;
		}
		
		mm.addSave = function () {
			
			console.log(mm.form);
			
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
//				HttpUtils.post(base + 'addSave',sendData,function (data) {
//					mm.site.refresh();
//					ModalCtrl.show('提示','新增成功',modalCode.success);
//					$modalInstance.close();
//				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
//				HttpUtils.post( base + 'updateSave',sendData,function () {
//					mm.site.refresh();
//					ModalCtrl.show('提示','修改成功！',modalCode.success);
//					$modalInstance.close();
//				});
			}
			
		}
		
		mm.checkpark = function(en){
			
		}
		
		
		mm.close = function () {
			$modalInstance.close();
		}
	}
    
})();



