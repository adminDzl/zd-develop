
(function () {
    'use strict'

    app.factory('userCompanyChoose',function ($modal) {
    	var baseUrl = '/baseinfo/org/list';
        var baseHtmlPath = 'baseinfo/user/utils/companychoose/company_choose.html';
        var baseBacthHtmlPath = 'baseinfo/user/utils/companychoose/company_choose2.html';
        return {
        	choose:choose,
            chooses:chooses
        };
        //单选
        function choose(sendback,checkedIds,gridUrl,sendData,gridHtmlPath) {
            var site = {
                single:true,
                checkedIds:checkedIds,
                gridUrl:gridUrl,
                sendData:sendData,
                gridHtmlPath:gridHtmlPath,
                callback:function (entity) {
                    sendback(entity);
                }
            };
        	if(!site.gridUrl){
        		site.gridUrl = baseUrl;
        	}
            if(!site.gridHtmlPath){
            	site.gridHtmlPath = baseHtmlPath;
            }
            chooseHtml(site);
        }
        //多选,返回列表
        function chooses(sendback,checkedIds,gridUrl,sendData,gridHtmlPath) {
            var site = {
                single:false,
                checkedIds:checkedIds,
                gridUrl:gridUrl,
                sendData:sendData,
                gridHtmlPath:gridHtmlPath,
                callback:function (entities) {
                    sendback(entities);
                }
            };
        	if(!site.gridUrl){
        		site.gridUrl = baseUrl;
        	}
            if(!site.gridHtmlPath){
            	site.gridHtmlPath = baseBacthHtmlPath;
            }
            chooseHtml(site);
        };

        function chooseHtml(site,m) {
            $modal.open({
                templateUrl:'../admin/pages/'+site.gridHtmlPath+'?version='+new Date().getTime(),
                controller:'OrgChooseCtrl',
                size:'lg',
                backdrop:'static',
                resolve:{
                    site:function () {
                        return site;
                    }
                }
            });
        }
    });
    app.controller('OrgChooseCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {
    	
    	$scope.title = '选择企业';
    	$scope.sear = {};
        var checkedList = []; 
        var checked = undefined;
        var currKeys = undefined;

        //选择
        if(site.checkedIds){
        	checkedList = site.checkedIds;
        }
        
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
        	getGridData();
        });
        
        function getGridData() {
        	
        	var sendData = {
        		 searchKeys:currKeys,
                 pageNo: $scope.paginationConf.currentPage,
                 pageSize: $scope.paginationConf.pageSize
            };
        	if(site.sendData){
        		sendData = $.extend({},site.sendData,sendData);
        	}
            HttpUtils.get(site.gridUrl,sendData,function (data) {
            	$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.rows = data.data.page.rows;
                for(var i=0;i<checkedList.length;i++){
                	for(var j=0;j<$scope.rows.length;j++){
                		if(checkedList[i].id == String($scope.rows[j].id)){
                			$scope.rows[j].chk = true;
                			continue;
                		}
                	}
                }
            });
        }
        
      //全选
	     $scope.checkList = [];
	     $scope.checkAll = function(){
	    	 if($scope.checkListAll) {
	             $scope.checkList = [];
	             angular.forEach($scope.rows, function (i) {
	                 i.checked = true;
	                 $scope.checkList.push(i.id);
	             })
	         }else {
	             angular.forEach($scope.rows, function (i) {
	                 i.checked = false;
	                 $scope.checkList = [];
	             })
	         }
	    	 console.log($scope.checkList);
	     }
	     //单选
	     $scope.checkOne = function () {
	         angular.forEach($scope.rows , function (i) {
	             var index = $scope.checkList.indexOf(i.id);
	             if(i.checked && index === -1) {
	                 $scope.checkList.push(i.id);
	             } else if (!i.checked && index !== -1){
	                 $scope.checkList.splice(index, 1);
	             };
	         })

	         if ($scope.rows.length === $scope.checkList.length) {
	             $scope.checkListAll = true;
	         } else {
	             $scope.checkListAll = false;
	         }
	         console.log($scope.checkList);
	     }
        
        $scope.searchFor = function (sear) {
        	currKeys = sear.keys;
        	$scope.paginationConf.currentPage == 1 ? getUsersList() : $scope.paginationConf.currentPage = 1;
        };

        

        $scope.close = function () {
            $modalInstance.close();
        };
        //选择事件
        /*$scope.checkClick = function (row) {
            var en = {
                id:String(row.id)+"",
                name:row.name+""
            }
            if(site.single){
            	if(checked && checked.chk){
            		checked.chk = false;
            	}
            	checked = undefined;
            	checkedList = [];
            	if(row.chk){
            		checked = row;
            		checkedList.push(en);
            	}
        	}else{
        		if(row.chk){
        			var flag = false;
        			angular.forEach(checkedList,function(obj,i){
        				if(obj.id == en.id){
        					flag = true;
        				}
        			});
        			if(!flag){
        				checkedList.push(en);
        			}
        		}else if(!row.chk){
        			var list = checkedList;
        			angular.forEach(list,function(obj,i){
        				if(obj.id == en.id){
        					checkedList.splice(checkedList.indexOf(obj),1);
        				}
        			});
        		}
        	}
        };*/
        //回调函数
        $scope.commit = function () {
        	if($scope.checkList.length <= 0){
        		ModalCtrl.show('提示','请选择公司',modalCode.success);
        		return;
        	}
        	site.callback($scope.checkList);
            $modalInstance.close();
        };

        $scope.join = function(id){
	    	var sendData = {userId:site.sendData.userId,orgId:id};
			HttpUtils.post('/baseinfo/relation/saveUserOrg',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','加入企业成功',modalCode.success);
			});
        }
        $scope.leave = function(id){
	    	var sendData = {userId:site.sendData.userId,orgId:id};
			HttpUtils.post('/baseinfo/relation/deleteUserOrg',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','已退出企业',modalCode.success);
			});
        }
        
        $scope.updateDefault = function(id) {
	    	var sendData = {userId:site.sendData.userId,orgId:id};
			HttpUtils.post('/baseinfo/relation/updateUserDefaultOrg',sendData,function (data) {
				getGridData();
				ModalCtrl.show('提示','修改成功',modalCode.success);
			});
        }
    });
})();