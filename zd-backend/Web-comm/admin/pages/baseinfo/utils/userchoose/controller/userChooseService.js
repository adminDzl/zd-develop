/**
 * Created by longHuang on 2016/7/21.
 */
(function () {
    'use strict'

    app.factory('userChoose',function ($modal) {
        return {
            chooseUser:chooseUser,
            chooseUsers:chooseUsers,
            chooseRemoteUsers:chooseRemoteUsers,
            chooseUserView:chooseUserView
        }
        /**
         * param 接收[{userId:"",userName:""},{userId:"",userName:""}]数组;
         */
        //单选
        function chooseUser(sendback,param) {
            var site = {
                single:true,
                param:param,
                callback:function (user) {
                    sendback(user);
                }
            };
            choose(site);
        }
        //多选
        function chooseUsers(sendback,checkRows,parkId,paramMap) {
            var site = {
                single:false,
                checkRows:checkRows,
                parkId:parkId,
                paramMap:paramMap,
                callback:function (users) {
                    sendback(users);
                }
            };
            choose(site);
        };
        
        //远程多选
        function chooseRemoteUsers(sendback,param,parkId) {
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
        //查看
        function chooseUserView(sendback,param,parkId,paramMap) {
            var site = {
                single:true,
                param:param,
                parkId:parkId,
                paramMap:paramMap,
                callback:function (user) {
                    sendback(user);
                }
            };
            choose2(site);
        }

        function choose(site,m) {
        	var settings = {
                    templateUrl:'../admin/pages/baseinfo/utils/userchoose/users_choose_dialog.html?version='+new Date().getTime(),
                    controller:'UsersDialogCtrl',
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
        
        function choose2(site,m) {
        	var settings = {
                    templateUrl:'../admin/pages/baseinfo/utils/userchoose/users_choose_dialog2.html?version='+new Date().getTime(),
                    controller:'UsersDialogViewCtrl',
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
    app.controller('UsersDialogCtrl',function ($scope,site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$localStorage) {
    	
    	$scope.title = '选择负责人';
    	$scope.sear = {};
        var checkedList = []; 
        var checked = undefined;
        var currKeys = undefined;

        //选择指定人
        if(site.checkRows){
        	checkedList = site.checkRows;
        }
        
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
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
        	
        	
//        	if(!site.parkId){
//        		var sendData = {
//        			searchKeys:currKeys,
//                    pageNo: $scope.paginationConf.currentPage,
//                    pageSize: $scope.paginationConf.pageSize
//                };
        		var sendData = {
            			searchKeys:currKeys,
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.pageSize,
                        parkId: site.parkId
                    };
           	
               HttpUtils.get('/baseinfo/user/admin/choose',sendData,function (data) {
                   $scope.paginationConf.totalItems = data.data.page.total;
                   $scope.users = data.data.page.rows;
                   if(site.single){
                       for(var i=0;i<$scope.users.length;i++){
                           if(checked && checked.chk && checked.id == $scope.user[i].id){
                               $scope.user[i].chk = true;
                               continue;
                           }
                       }
                   }else{
                       for(var i=0;i<checkedList.length;i++){
                           for(var j=0;j<$scope.users.length;j++){
                               if(checkedList[i].userId == String($scope.users[j].id)){
                                   $scope.users[j].chk = true;
                                   continue;
                               }
                           }
                       }
                   }
               });
        	/*}else{
        		var jsondata = {
        				searchKeys:currKeys,
                        pageNo: $scope.paginationConf.currentPage,
                        pageSize: $scope.paginationConf.pageSize
                    };
	    		var sendData = {parkId:site.parkId,url:"/baseinfo/user/choose",type:"GET",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			$scope.paginationConf.totalItems = data.data.page.total;
	                   $scope.users = data.data.page.rows;
	                   if(site.single){
	                       for(var i=0;i<$scope.users.length;i++){
	                           if(checked && checked.chk && checked.id == $scope.user[i].id){
	                               $scope.user[i].chk = true;
	                               continue;
	                           }
	                       }
	                   }else{
	                       for(var i=0;i<checkedList.length;i++){
	                           for(var j=0;j<$scope.users.length;j++){
	                               if(checkedList[i].userId == String($scope.users[j].id)){
	                                   $scope.users[j].chk = true;
	                                   continue;
	                               }
	                           }
	                       }
	                   }
	    		});
        	}*/
        }
        
        $scope.searchFor = function (sear) {
        	currKeys = sear.keys;
        	$scope.paginationConf.currentPage == 1 ? getUsersList() : $scope.paginationConf.currentPage = 1;
        };

        

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.checkClick = function (user) {
            var userInfo = {
                userId:String(user.id),
                userName:user.realname
            }
            if(site.single){
                if(checked && checked.chk){
                    checked.chk = false;
                }
                if(user.chk){
                    checked = user;
                }
                else{
                	checked = null;
                }
            }else{
                if(user.chk && checkedList.indexOf(userInfo)==-1){
                    checkedList.push(userInfo);
                }else if(!user.chk){
                	var list = checkedList;
                	angular.forEach(list,function(obj,i){
                		if(obj.userId == userInfo.userId){
                			checkedList.splice(checkedList.indexOf(obj),1);
                		}
                	});
                }
            }

        };
        //回调函数
        $scope.commit = function () {
            if(site.single){
            	site.callback(checked);
            }else{
            	site.callback(checkedList);
            }
            $modalInstance.close();
        };

    });
    
    app.controller('UsersDialogViewCtrl',function ($scope,site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$localStorage) {
    	
    	$scope.title = '查看负责人';
    	$scope.sear = {};
        var checkedList = []; 
        var checked = undefined;
        var currKeys = undefined;

        //选择指定人
        if(site.checkRows){
        	checkedList = site.checkRows;
        }
        
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
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
        	
        	
        		var sendData = {
            			searchKeys:currKeys,
                        //pageNo: $scope.paginationConf.currentPage,
                        //pageSize: $scope.paginationConf.pageSize,
                        parkId: site.parkId
                    };
           	
               HttpUtils.get('/authority/init/parkAdmins',sendData,function (data) {
                   //$scope.paginationConf.totalItems = data.data.page.total;
                   $scope.users = data.data;
                   
               });
        	
        }
        
        $scope.searchFor = function (sear) {
        	currKeys = sear.keys;
        	$scope.paginationConf.currentPage == 1 ? getUsersList() : $scope.paginationConf.currentPage = 1;
        };

        

        $scope.close = function () {
            $modalInstance.close();
        };

        
        //回调函数
        $scope.commit = function () {
            if(site.single){
            	site.callback(checked);
            }else{
            	site.callback(checkedList);
            }
            $modalInstance.close();
        };

    });
    
})();