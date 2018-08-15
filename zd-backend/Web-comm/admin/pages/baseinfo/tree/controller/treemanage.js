(function () {
    'use strict';

    app.controller('TTreeManageGrid', Grid);
    
    var editCtrl = "TTreeManageEdit";
	 app.controller(editCtrl,DCtrl);
	 
	 var base = '/basetree/';
	 var editUrl = '../admin/pages/baseinfo/tree/treemanage_edit.html';
	 var viewUrl = '../admin/pages/baseinfo/tree/treemanage_view.html';
    

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
            });
        }
        //搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13){
                return;
			}
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        
      //新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.get(base + "init",sendData,function (data) {
		    	var site = {};
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
	     
	   //预览树
	     var tree;
	 	$scope.my_tree = tree = {};
	     $scope.viewTree = function (id) {
	    	var sendData = {"id":id};
		    HttpUtils.get(base + "viewTree",sendData,function (data) {
		    	var site = {};
	 			site.title = '预览';
	 			site.code = 1;
	 			site.url =  viewUrl,
	 			site.ctrl = editCtrl,
	 			site.dataList = data.data,
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			if(data.data.length>0){
	 				open(site,$modal);
	 			}else{
	 				ModalCtrl.show('提示','请增加子节点后预览',modalCode.success);
					$modalInstance.close();
	 			}
		    });
	 	 };
	 	 
        
    }
    
  //打开页面
    function open(site,$modal) {
   	$modal.open({
			templateUrl:site.url+'?v='+new Date().getTime(),
			controller: site.ctrl,
			controllerAs:'mm',
			size:'lg',
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
        mm.site.statusList=[{'value':'1','name':'正常'},{'value':'-1','name':'删除'}];
        HttpUtils.get(base + 'getParentData', {}, function (data) {
        	mm.site.parentList=data.data;
        });

		if(mm.site.code == 1){

		}
	     
		if(mm.site.code == 2){
			mm.form = site.entity;
		}
		if(mm.site.code == 3){
			mm.form = site.entity;
		}

		mm.addSave = function () {
			if(!validate()){
				return;
			}
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				HttpUtils.post(base + 'addSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
					$modalInstance.close();
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
					$modalInstance.close();
				});
			}
			
		}
		mm.site.editSave = function (sendData) {
				if(!validate(mm.site.currentItem)){
					return;
				}
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
					$modalInstance.close();
				});
		}
		function validate(form){
			if(form==null){
				form = mm.form;
			}
			var flag = true;
			if($.trim(form.parentId)==''&&$.trim(form.treeCode)==''){
				ModalCtrl.show('提示','根节点必须有编码！',modalCode.danger);
				flag=false;
			}
			return flag;
		}
		mm.close = function () {
			$modalInstance.close();
		}
		  //导航选择
		mm.navSelect = function(branch) {
 			HttpUtils.get('/basetree/findById',{'id':branch.id},function (data) {
	 			mm.site.currentItem = data.data;
	 		});
	     };
		mm.site.selectChange = function(id) {
			if(id==null||id==""){
				mm.site.currentItem.treeCode = "";
			}else{
				var sendData = {'id':id};
				HttpUtils.get('/basetree/findById',sendData,function (data) {
					mm.site.currentItem.treeCode = data.data.treeCode;
				});
			}
			
		};
	     
	}
	
	
	
    
})();



