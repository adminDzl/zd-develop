/**
 * Created by longHuang on 2016/7/21.
 */
(function () {
    'use strict'

    app.factory('companyChoose',function ($modal) {
        return {
        	choose:choose,
            chooses:chooses
        };
        //单选
        function choose(sendback,param,jsonParam) {
            var site = {
                single:true,
                param:param,
                jsonParam:jsonParam,
                callback:function (user) {
                    sendback(user);
                }
            };
            chooseHtml(site);
        }
        //多选,返回列表
        function chooses(sendback,param) {
            var site = {
                single:false,
                param:param,
                callback:function (data) {
                    sendback(data);
                }
            };
            chooseHtml(site);
        };

        function chooseHtml(site,m) {
            $modal.open({
                templateUrl:'../admin/pages/baseinfo/utils/companychoose/t_company_choose.html?version='+new Date().getTime(),
                controller:'CompanyChooseCtrl',
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
    app.controller('CompanyChooseCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {
    	
    	$scope.title = '选择公司';
    	$scope.sear = {};
        var checkedList = []; 
        var checked = undefined;
        var currKeys = undefined;

        //选择
        if(site.param){
        	checkedList = site.param;
        }
        
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getUsersList();
        });
        
        function getUsersList(data) {
        	
        	var sendData = {
        		 searchKeys:currKeys,
                 pageNo: $scope.paginationConf.currentPage,
                 pageSize: $scope.paginationConf.pageSize
             };
        	sendData = $.extend({},site.jsonParam,sendData);
            HttpUtils.get('/baseinfo/organization/list',sendData,function (data) {
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
        };
        //回调函数
        $scope.commit = function () {
        	site.callback(checkedList);
            $modalInstance.close();
        };

       
    });
})();