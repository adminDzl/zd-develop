/**
 * Created by longHuang on 2016/7/21.
 */
(function () {
    'use strict'

    app.factory('resourceChoose',function ($modal) {
        return {
            chooses:chooses,
            choosesRemote:choosesRemote
        };
        /**
         * param 参数;
         */
        //多选,返回列表
        function chooses(sendback,checkedRows,editable,paramMap) {
            var site = {
                single:false,
                checkedRows:checkedRows,
                editable:editable!=null?editable:true,
                paramMap:paramMap,
                callback:function (data) {
                    sendback(data);
                }
            };
            choose(site);
        };
        
      //远程多选
        function choosesRemote(sendback,checkedRows,editable) {
            var site = {
                single:false,
                parkId:parkId,
                checkedRows:checkedRows,
                editable:editable!=null?editable:true,
                callback:function (users) {
                    sendback(users);
                }
            };
            choose(site);
        };

        function choose(site,m) {
        	var settings = {
                templateUrl:'../admin/pages/baseinfo/utils/resourcechoose/t_resource_choose.html?version='+new Date().getTime(),
                controller:'ResourceChooseCtrl',
                size:'lg',
                backdrop:'static',
                resolve:{
                    site:function () {
                        return site;
                    }
                }
            }
        	if(site.paramMap&&site.paramMap.templateUrl){
        		settings.templateUrl = site.paramMap.templateUrl;
        	}
            $modal.open(settings);
        }
    });
    app.controller('ResourceChooseCtrl',function ($scope,site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$localStorage,DataUtils) {
    	
    	$scope.title = '选择角色权限';
    	$scope.sear = {};
    	$scope.isCheckedList;
        var checkedList = []; 
        var currKeys = undefined;
        $scope.type1 = "2";
        //选择
        if(site.checkedRows){
        	checkedList = site.checkedRows;
        	$scope.isCheckedList = site.checkedRows;
        }
        $scope.editable=site.editable;
        
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize + type1', function () {
            getUsersList();
        });
        
        $scope.hasPower=true;
        powerCtrl();
        function powerCtrl(){
            if(site.paramMap&&site.paramMap.powerKey){
            	var required = site.paramMap.powerKey;
                var currPrivs = $localStorage.currPrivs;
                var hasPower = false;
                if(currPrivs){
                	for(var x in currPrivs){
                		var p = currPrivs[x];
                		if(p==required){
                			hasPower = true;
                			break;
                		}
                	}
                } 
                $scope.hasPower=hasPower;
            }      
        }
        
        function getUsersList(data) {
        	
        	if(!site.parkId){
        		var sendData = {
        				searchKeys:currKeys,
        				type1:$scope.type1,
        				pageNo: $scope.paginationConf.currentPage,
        				pageSize: $scope.paginationConf.pageSize
        		};
        		
        		HttpUtils.get('/baseinfo/userinfo/resources'/*'/authority/resource/grid'*/,sendData,function (data) {
        			/*$scope.paginationConf.totalItems =data.data.page.total;
        			$scope.rows = data.data.page.rows;
        			for(var i=0;i<checkedList.length;i++){
        				for(var j=0;j<$scope.rows.length;j++){
        					if(checkedList[i].id == String($scope.rows[j].id)){
        						$scope.rows[j].chk = true;
        						continue;
        					}
        				}
        			}*/
        			
        			var treeData = data.data;
        			var nodeList = DataUtils.parseTree(treeData,'parentId','name');
    		 		$scope.nodeList = [{id:"",name:"全部",children:nodeList,expanded:true}];
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
        	site.callback($scope.isCheckedList);
            $modalInstance.close();
        };

        

       
    });
})();