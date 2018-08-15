(function () {
    'use strict';

    app.controller('ServicePcGrid', Grid);
    
    var editCtrl = "ServicePcEdit";
	 app.controller(editCtrl,DCtrl);
	 
	 var base = '/authority/tree/resource/';
	 var treeBase = '/basetree/';
	 var indexBase = '/ccplus/index/';
	 //var editUrl = '../admin/pages/ccplus/service/servicepc_edit.html';
	 var editUrl = '../admin/pages/ccplus/service/panel_choose.html';
     var treeCode = "PAGE_TREE";
     var treeUrl = '/basetree/';
     var serviceType = 5;

    function Grid($rootScope,$scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal,DataUtils,parkserviceChoose) {
        $scope.url = base + 'grid';

        //配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1};
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize + selected.id', function () {
            getGridData();
        });

        /*testFront();
        function testFront(){
		   	 HttpUtils.get("/ccplus/index/page", {"treeCode":"app_default"}, function (response) {
		   	 });
        }*/
        //请求后台数据
        function getGridData() {
        	if($.trim($scope.selected.id)==''){
        		return;
        	}
        	$rootScope.idStr="";
            var sendData = {
            	searchKeys:$scope.searchKeys,
            	treeId:$scope.selected.id,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize,
                type2:serviceType
            };
            HttpUtils.get($scope.url, sendData, function (response) {
            	$scope.paginationConf.totalItems =response.data.page.total;
		 		$scope.rows = response.data.page.rows;
            });
        }
        //搜索
        $scope.search = function (e) {
            if (e && e.keyCode !== 13){
                return;
			}
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
	     //获取树
	     var tree;
	     $scope.rootNodeId="";
	     $scope.rootNodeList = [];
	     $scope.selected = {};
	     $scope.$watch('rootNodeId', reloadTree);
	     function reloadTree(){
	    	 if($.trim($scope.rootNodeId)!=""){
		    	 HttpUtils.get(treeUrl+"listAllChild", {"parentId":$scope.rootNodeId}, function (response) {
					var nodeList = response.data;
					$.each(nodeList,function(i,e){
						e.expanded=true;
					});
					nodeList = DataUtils.parseTree(nodeList,'parentId','name');
					 $scope.nodeList = nodeList;
			    	 if(nodeList.length>0){
				    	 $scope.selected = nodeList[0];
			    	 }else{
			    		 $scope.selected = {};
			    	 }
			    	 $scope.categoryList=response.data;
		    	 });
	    	 }else{
	    		 $scope.nodeList=[];
	    		 $scope.selected = {};
		    	 $scope.categoryList=[];
	    	 }
	     }
	     $scope.nodeList = [];
	 	 $scope.my_tree = {};
	     $scope.categoryList = [];
	     $scope.initTree = function() {
	    	 $scope.rootNodeId = null;
	    	 HttpUtils.get(treeUrl+"findByCode", {"treeCode":treeCode}, function (response) {
    		 var treeId = response.data.entity.id;
		    	 HttpUtils.get(treeUrl+"listAllChild", {"parentId":treeId}, function (response) {
					var nodeList = response.data;
					nodeList = DataUtils.parseTree(nodeList,'parentId','name');
					$scope.rootNodeList = nodeList;
					if(nodeList.length>0){
						//取出PC端下的各主题的树
						$scope.rootNodeId = nodeList[0].id;
					}
		    	 });
	    	 });
	     }
	     $scope.initTree();
	     //导航选择
	     $scope.navSelect = function(branch) {
	    	 $scope.selected=branch;
	     }

	      //绑定
		 $scope.bindData= function(){
			 parkserviceChoose.chooses(function(rows){
				 var ids="";
				 for(var x in rows){
					 if(x==0){
						 ids+=rows[x].id;
					 }else{
						 ids+=","+rows[x].id;
					 }
				 }
		    	if(rows && rows.length>0){
		 			var sendData = {fromIds:ids,toId:$scope.selected.id};
		 			HttpUtils.post(treeBase +  'bindToTree',sendData,function (data) {
		 				getGridData();
		 				ModalCtrl.show('提示','添加成功！',modalCode.success);
		 			});
		    	}
			 },[],{sendData:{type2:5}});
		 }
	     //解绑
		 $scope.unbindData= function(id){
		 		var sendData = {fromIds:id,toId:$scope.selected.id};
		 		HttpUtils.post(treeBase +  'removeFromTree',sendData,function (data) {
		 			getGridData();
		 			ModalCtrl.show('提示','移除成功！',modalCode.success);
		 		});
		 }

		 	//复制到...
		     $scope.deepCopy = function () {
				 if($.trim($scope.selected.id)!=''){
				    	 var site = {};
		 			site.title = '复制到'+$scope.selected.name;
		 			site.treeId = $scope.selected.id;
		 			site.categoryList = $scope.categoryList;
		 			site.code = 2;
		 			site.url =   editUrl,
		 			site.ctrl = editCtrl,
		 			site.refresh = function () {
		 				reloadTree();
		 				//getGridData();
		 			};
		 			open(site,$modal);
				}else{
		 			ModalCtrl.show('提示','请选择要复制的对象！',modalCode.warning);
				}
		 	 }
		     //置顶
			 $scope.setTop= function(){
			    if($.trim($scope.selected.id)!=''){
			 		var sendData = {id:$scope.selected.id};
			 		HttpUtils.post(treeBase +  'setTop',sendData,function (data) {
		 				reloadTree();
			 			//getGridData();
			 			ModalCtrl.show('提示','设置成功！',modalCode.success);
			 		});
			    }else{
		 			ModalCtrl.show('提示','请选择要设为默认的对象！',modalCode.warning);
			    }
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

   
	function DCtrl($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		$scope.form = {oldId:site.treeId};// 清空表单数据
		//$scope.site为外部引用参数对象 1为新增 2为修改
		$scope.site = site;

		$scope.addSave = function () {
			var sendData = angular.copy($scope.form);
			if($scope.channel=="2"){
				HttpUtils.post( base + 'deepCopy',sendData,function () {
					site.refresh();
					ModalCtrl.show('提示','复制成功！',modalCode.success);
					$modalInstance.close();
				});
			}else{
				HttpUtils.post( treeBase + 'deepCopy',sendData,function () {
					site.refresh();
					ModalCtrl.show('提示','复制成功！',modalCode.success);
					$modalInstance.close();
				});
			}
		}
		$scope.close = function () {
			$modalInstance.close();
		}
		
		
	}
    
})();



