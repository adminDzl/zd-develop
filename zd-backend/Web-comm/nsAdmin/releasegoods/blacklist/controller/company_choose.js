
(function () {
    'use strict'
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
        		 searchKey:currKeys,
                 pageNo: $scope.paginationConf.currentPage,
                 pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get('/pass/amdin/orderblack/getOrgList',sendData,function (data) {
            	$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.rows = data.data.page.rows;
                 if(site.single){
                    for(var i=0;i<$scope.rows.length;i++){
                        if(checked && checked.chk && checked.id == $scope.user[i].id){
                            $scope.user[i].chk = true;
                            continue;
                        }
                    }
                }else{
                    for(var i=0;i<checkedList.length;i++){
                        for(var j=0;j<$scope.rows.length;j++){
                            if(checkedList[i].userId == String($scope.rows[j].id)){
                                $scope.rows[j].chk = true;
                                continue;
                            }
                        }
                    }
                }
            });
        }
        
        $scope.searchFor = function (sear) {
        	currKeys = sear.keys;
        	$scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
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
})();