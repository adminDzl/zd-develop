
(function () {
    'use strict'

    app.factory('parkChoose',function ($modal) {
    	var baseUrl = '/baseinfo/park/list';
        var baseHtmlPath = 'baseinfo/utils/parkchoose/park_choose.html';
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
            	site.gridHtmlPath = baseHtmlPath;
            }
            chooseHtml(site);
        };

        function chooseHtml(site,m) {
            $modal.open({
                templateUrl:'../admin/pages/'+site.gridHtmlPath+'?version='+new Date().getTime(),
                controller:'ParkChooseCtrl',
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
    app.controller('ParkChooseCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {
    	
    	$scope.title = '选择园区';
    	$scope.sear = {};
    	$scope.parkId = "-1";
    	if(site.sendData){
    		$scope.parkId= site.sendData.parkId;
    	}
    	
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
            getData();
        });
        
        function getData() {
        	
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
                		if(checkedList[i] == String($scope.rows[j].id)){
                			$scope.rows[j].chk = true;
                			 if(site.single){
                    			checked = $scope.rows[j];
                			}
                			continue;
                		}
                	}
                }
            });
        }
        
        $scope.searchFor = function (sear) {
        	currKeys = sear.keys;
        	$scope.paginationConf.currentPage == 1 ? getUsersList() : $scope.paginationConf.currentPage = 1;
        };

        

        $scope.close = function () {
            $modalInstance.close();
        };
        //选择事件
        $scope.checkClick = function (row) {
            var checkId = row.id;
            if(site.single){
            	if(checked && checked.chk){
            		checked.chk = false;
            	}
            	checked = undefined;
            	checkedList = [];
            	if(row.chk){
            		checked = row;
            		checkedList.push(checkId);
            	}
        	}else{
        		if(row.chk){
        			var flag = false;
        			angular.forEach(checkedList,function(obj,i){
        				if(obj.id == checkId){
        					flag = true;
        				}
        			});
        			if(!flag){
        				checkedList.push(checkId);
        			}
        		}else if(!row.chk){
        			var list = checkedList;
        			angular.forEach(list,function(obj,i){
        				if(obj.id == checkId){
        					checkedList.splice(checkedList.indexOf(obj),1);
        				}
        			});
        		}
        	}
        };
        //回调函数
        $scope.commit = function () {
        	site.callback(checkedList);
            $modalInstance.close();
        };

       
    });
})();