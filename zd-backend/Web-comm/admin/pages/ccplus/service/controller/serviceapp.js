(function () {
    'use strict';

    app.controller('ServiceAppGrid', Grid);
    
    var editCtrl = "ServiceAppEdit";
	 app.controller(editCtrl,DCtrl);
	 
	 var base = '/authority/resource/';
	 var editUrl = '../admin/pages/ccplus/service/serviceapp_edit.html';
	 var choiceUrl = '../admin/pages/ccplus/service/serviceapp_choice.html';
     var treeCode = "CCPLUSAPP";
     var treeUrl = '/basetree/';
     var serviceType = 4;

    function Grid($rootScope,$scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {
    	var currKeys = undefined;
    	var currTreeId = undefined;
        $scope.url = base + 'grid';

        //配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1};
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        //请求后台数据
        function getGridData() {
        	$rootScope.idStr="";
            var sendData = {
            	searchKeys:currKeys,
            	treeId:currTreeId,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize,
                type1:serviceType
            };
            HttpUtils.get($scope.url, sendData, function (data) {
            	$scope.paginationConf.totalItems =data.data.page.total;
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
	     //所有
	     $scope.searchAll = function (keys,e) {
	    	 if(e && e.keyCode !== 13)
	    		 return;
	    	 currKeys = keys;
	    	 currTreeId = "";
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
	     
	     $scope.apiInfo = function(row){
		    	var uri = row.ext1;
		    	var appname = "SYSTEM";
		    	//获取微服务具体地址
		    	var sendData = {'appname':appname};
	 			HttpUtils.get('/api/host',sendData,function (data) {
	 				
	 				var host = data.data;
	 				if(uri && host){

	 					window.open(host+"/swagger-ui.html"+uri);
	 					
	 				}else{
	 					ModalCtrl.show('提示','连接不可用！',modalCode.info);
	 				}
	 				
	 			});
		     }
	     //获取树
	     var tree;
	     $scope.list = [];
	 	 $scope.my_tree = tree = {};
	     $scope.getTreeData = function() {
	    	 HttpUtils.get(treeUrl+"getTreeData", {"treeCode":treeCode}, function (data) {
	    		 $scope.list=data.data;
	    	 });
	     }
	     $scope.getTreeData();
	   //导航选择
	     $scope.navSelect = function(branch) {
	    	 currTreeId=branch.id;
	    	 getGridData();
	     }
	     
	     
	     
	     
	     
	     
		 $scope.chkData= function (id,check) {
		        if (check == true) {
		        	$rootScope.idStr = $rootScope.idStr + id + ',';
		        } else {
		        	$rootScope.idStr = $rootScope.idStr.replace(id + ',', '');
		        }
		    };
		 
		 
		    
		  //用户加入群组
		   
		    $scope.userToGroup = function(){
		    	if(!$rootScope.idStr){
		    		ModalCtrl.show('提示','请选择要加入的数据',modalCode.success);
					$modalInstance.close();
					return;
		    	}
		    	var site = {};
		    	site.groupIdStr="";
	 			site.title = '选择节点';
	 			site.code = 3;
	 			site.url =  choiceUrl,
	 			site.ctrl = editCtrl,
	 			HttpUtils.get(treeUrl+'getTreeDataByCode', {"treeCode":treeCode}, function (data) {
	 				site.treeList=data.data;
		    	 });
	 			site.refresh = function () {
	 				getGridData();
	 			};
	 			open(site,$modal);
		    
		    	

		    	 
		    };
		    
		    
		    
			    
/*			    //移除群组（只能在单个群组中移除）
			    $scope.removeFromGroup = function(obj){
			    	var msgs = $translate.instant("confirmTip.sureDelete");
			    	Modal.confirm({msg: msgs}).on( function (e) {
						if(e){
							var postData = {
					    			groupId : obj.groupId,
					    			userId : obj.id
					    	};
							listPushUserService.removeFromGroup(postData,function(data){
			    		        if(data.result==true){ 
									$scope.groupTreeList();
									$scope.groupId="";
									$scope.searchPushUser();
					    		}
			    			}); 	 
				        };
				  	});
			    }; */
	     
	     
	     
	     
	    
	     
        
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

   
	function DCtrl($rootScope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.site = site;
		mm.form = {};//清空表单数据
		mm.select=[];
		mm.site.requestMethods=['GET','POST' ,'DELETE','PUT','PATCH'];
        mm.site.apiScopes=[{'value':0,'name':'内外'},{'value':1,'name':'外部'} ,{'value':2,'name':'内部'}];
        mm.site.verificationTypes=[{'value':1,'name':'不验证'},{'value':2,'name':'登录密码'} ,{'value':3,'name':'Token验证'}];
        mm.site.statusList=[{'value':1,'name':'正常'},{'value':-1,'name':'删除'}];

		if(mm.site.code == 1){

		}
		if(mm.site.code == 2){
			mm.form = site.entity;
		}

		mm.addSave = function () {
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
		mm.close = function () {
			$modalInstance.close();
		}
		
		
		
		
		 //选择要加入的群组
		 mm.chkGroup= function (id,check) {
			 if (check == true) {
				 site.groupIdStr = id ;
		        } else {
		        	site.groupIdStr ="";
		        }
		    };
	    
		    //加入群组
		    mm.joinGroup = function(){
		    	if(!site.groupIdStr){
		    		ModalCtrl.show('提示','请选择要加入的群组',modalCode.success);
					$modalInstance.close();
		    		return;
		    	}
		    	

				var sendData = {
		    		toId :site.groupIdStr,
		    		fromIds:$rootScope.idStr
		    	};
				HttpUtils.post( treeUrl + 'bindToTree',sendData,function (data) {
					if(data.result){
						
						mm.site.refresh();
						ModalCtrl.show('提示','绑定成功！',modalCode.success);
						$modalInstance.close();
					}else{
						mm.site.refresh();
						ModalCtrl.show('提示','绑定失败！',modalCode.success);
						$modalInstance.close();
					}
				});
		    };
		    
		
		
		
		
		
		
		
		
	}
    
})();



