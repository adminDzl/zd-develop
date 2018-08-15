(function () {
    'use strict';

    app.controller('TOrgDeptGrid', Grid);
    
    var editCtrl = "TDeptEdit";
	 app.controller(editCtrl,DCtrl);
	 
	 var base = '/baseinfo/basDept/';
	 var editUrl = '../admin/pages/baseinfo/dept/department_edit.html';
    

    function Grid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal,parkChoose,companyChoose) {
    	var currKeys = undefined;
        $scope.url = base + 'orgDeptGrid';

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
            if (e && e.keyCode !== 13)
                return;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        
      //新增
	     $scope.addNew = function () {
	    	var sendData = {};
		    HttpUtils.get(base + "initEdit",sendData,function (data) {
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
	 		HttpUtils.get(base + "initEdit",sendData,function (data) {
	 			var site = {};
	 			site.data = data.data;
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
	     
	     
	     
	     //加入园区
	     $scope.joinPark = function(id){
	    	 
	    	 var checkIds=[];
	    	 var form = {};
	    	 HttpUtils.get(base +'getDeptPPark', {"fromId" : id,"type":"1"} ,function (data) {
	    		 var dataList=data.data;
	    		 for (var i = 0; i < dataList.length; i++) {
	    			 checkIds.push(dataList[i].toId);
				}
	    	 });
	    	 parkChoose.choose(function (data) {
		    		if(data && data.length>0){
		    			var parkId = data[0];
			         	if(!parkId){
			            	ModalCtrl.show('提示','请选择园区！',modalCode.warning);
			   	    	}
			         	//删除部门-园区关系
			         	HttpUtils.post('/baseinfo/relation/deleteDeptPark',{"deptId":id,"type":"1"},function (data) {
			         		saveDeptPark(id,parkId,"1");	
			         	});
			 		}
		            },checkIds);
	     }
	     //保存部门-园区关系
	     function saveDeptPark(deptId,parkId,type){
	    	var sendData = {deptId:deptId,parkId:parkId,"type":type};
			HttpUtils.post('/baseinfo/relation/saveDeptPark',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','加入园区成功',modalCode.success);
			});
	     }
	     
	     
	     
	     
	     
	     //加入企业
	     $scope.joinOrg = function(id){
	    	 
	    	 var checkOrgIds=[];
	    	 var form = {};
	    	 HttpUtils.get(base +'getDeptPOrg', {"fromId" : id,"type":"1"} ,function (data) {
	    		 var dataList=data.data;
	    		 for (var i = 0; i < dataList.length; i++) {
	    			 checkOrgIds.push(dataList[i].toId);
	    		 }
	    	 });
	    	 companyChoose.choose(function (data) {
	    		 if(data && data.length>0){
	    			 var orgPId = data[0];
	    			 if(!orgPId){
	    				 ModalCtrl.show('提示','请选择企业！',modalCode.warning);
	    			 }
	    			 //删除部门-企业关系
	    			 HttpUtils.post('/baseinfo/relation/deleteDeptOrg',{"deptId":id,"type":"1"},function (data) {
	    				 saveDeptOrg(id,orgPId,"1");	
	    			 });
	    		 }
	    	 },checkOrgIds,{type:"1"});
	    	 console.log(form);
	     }
	     //保存部门企业关系
	     function saveDeptOrg(deptId,orgPId,type){
	    	 var sendData = {fatherId:orgPId,childId:deptId,"type":type};
	    	 HttpUtils.post('/baseinfo/relation/saveDeptOrg',sendData,function (data) {
	    		 getGridData();
	    		 ModalCtrl.show('提示','加入企业成功',modalCode.success);
	    	 });
	     }
	     
	     //部门用户列表
	     $scope.userlist = function(id){
	    	 $state.go("app.deptUser",{id:id});
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
		
		
		HttpUtils.get(base + 'getCurrOrgDept', {}, function (data) {
        	mm.site.parentList=data.data;
        });
		if(mm.site.code == 1){

		}
		if(mm.site.code == 2){
			mm.form = site.data.entity;
		}

		mm.addSave = function () {
			if(mm.site.code == 1){
				var sendData = angular.copy(mm.form);
				sendData.type1='1';
				HttpUtils.post(base + 'addOrgDeptSave',sendData,function (data) {
					mm.site.refresh();
					ModalCtrl.show('提示','新增成功',modalCode.success);
					$modalInstance.close();
				});
			}else if(mm.site.code == 2){
				var sendData = angular.copy(mm.form);
				sendData.type1='1';
				HttpUtils.post( base + 'updateSave',sendData,function () {
					mm.site.refresh();
					ModalCtrl.show('提示','修改成功！',modalCode.success);
					$modalInstance.close();
				});
			}
			
		}
		mm.close = function () {
			
			$modalInstance.close();
		}
	}
    
})();



