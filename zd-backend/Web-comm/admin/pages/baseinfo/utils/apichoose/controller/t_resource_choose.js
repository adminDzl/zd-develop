/**
 * Created by longHuang on 2016/7/21.
 */
(function () {
    'use strict'

    app.factory('apiChoose',function ($modal) {
        return {
            chooses:chooses,
            choosesRemote:choosesRemote
        };
        /**
         * param 参数;
         */
        //多选,返回列表
        function chooses(sendback,param) {
            var site = {
                single:false,
                param:param,
                callback:function (data) {
                    sendback(data);
                }
            };
            choose(site);
        };
        
      //远程多选
        function choosesRemote(sendback,param,parkId) {
            var site = {
                single:false,
                parkId:parkId,
                param:param,
                callback:function (users) {
                    sendback(users);
                }
            };
            choose(site);
        };

        function choose(site,m) {
            $modal.open({
                templateUrl:'../admin/pages/baseinfo/utils/apichoose/t_resource_choose.html?version='+new Date().getTime(),
                controller:'ResourceChooseCtrl',
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
    app.controller('ResourceChooseCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {
    	
    	$scope.title = '选择角色权限';
    	$scope.sear = {};
        var checkedList = []; 
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
        	
        	if(!site.parkId){
        		var sendData = {
        				searchKeys:currKeys,
        				pageNo: $scope.paginationConf.currentPage,
        				pageSize: $scope.paginationConf.pageSize
        		};
        		
        		HttpUtils.get('/api/choose',sendData,function (data) {
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
        		
        	}else{
        		var jsondata = {
        				searchKeys:currKeys,
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.pageSize
                    };
	    		var sendData = {parkId:site.parkId,url:"/api/choose",type:"GET",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
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
            var en = {
                id:String(row.id),
            }
            if(row.chk && checkedList.indexOf(en)==-1){
            	checkedList.push(en);
            }else if(!row.chk){
            	var list = checkedList;
            	angular.forEach(list,function(obj,i){
            		if(obj.id == en.id){
            			checkedList.splice(checkedList.indexOf(obj),1);
            		}
            	});
            }

        };
        //回调函数
        $scope.commit = function () {
        	site.callback(checkedList);
            $modalInstance.close();
        };

        

       
    });
})();