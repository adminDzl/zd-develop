/**
 * Created by longHuang on 2016/7/21.
 */
(function () {
    'use strict'
    app.controller('DutyDialogCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {
    	
    	$scope.title = '选择职务';
    	$scope.sear = {};
        var checkedList = []; 
        var checked = undefined;
        var currKeys = undefined;
        console.log(site);
        //选择指定人
        
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getDutyList();
        });
        
        function getDutyList(data) {

            console.log(data);
        	
        	if(!site.parkId){
        		var sendData = {
        			searchKeys:currKeys,
                    pageNo: $scope.paginationConf.currentPage,
                    pageSize: $scope.paginationConf.pageSize
                };
           	
               HttpUtils.get('/car/dutyinfo/list',sendData,function (data) {
                   $scope.paginationConf.totalItems = data.data.page.total;
                   $scope.dutys = data.data.page.rows;
                   if(site.single){
                       for(var i=0;i<$scope.dutys.length;i++){
                           if(checked && checked.chk && checked.id == $scope.duty[i].id){
                               $scope.duty[i].chk = true;
                               continue;
                           }
                       }
                   }else{
                       for(var i=0;i<checkedList.length;i++){
                           for(var j=0;j<$scope.dutys.length;j++){
                               if(checkedList[i].dutyId == String($scope.dutys[j].id)){
                                   $scope.dutys[j].chk = true;
                                   continue;
                               }
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
	    		var sendData = {parkId:site.parkId,url:"/car/dutyinfo/list",type:"GET",data:JSON.stringify(jsondata)};
	    		HttpUtils.post("/remote/invoke" , sendData ,function (data) {
	    			$scope.paginationConf.totalItems = data.data.page.total;
	                   $scope.dutys = data.data.page.rows;
	                   if(site.single){
	                       for(var i=0;i<$scope.dutys.length;i++){
	                           if(checked && checked.chk && checked.id == $scope.duty[i].id){
	                               $scope.duty[i].chk = true;
	                               continue;
	                           }
	                       }
	                   }else{
	                       for(var i=0;i<checkedList.length;i++){
	                           for(var j=0;j<$scope.dutys.length;j++){
	                               if(checkedList[i].dutyId == String($scope.dutys[j].id)){
	                                   $scope.dutys[j].chk = true;
	                                   continue;
	                               }
	                           }
	                       }
	                   }
	    		});
        	}
        }
        
        $scope.searchFor = function (sear) {
        	currKeys = sear.keys;
        	$scope.paginationConf.currentPage == 1 ? getDutyList() : $scope.paginationConf.currentPage = 1;
        };

        

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.checkClick = function (duty) {
            var dutyInfo = {
                dutyId:String(duty.id),
                dutyName:duty.dutyName
            }
            if(site.single){
                if(checked && checked.chk){
                    checked.chk = false;
                }
                if(duty.chk){
                    checked = duty;
                }
                else{
                	checked = null;
                }
            }else{
                if(duty.chk && checkedList.indexOf(dutyInfo)==-1){
                    checkedList.push(dutyInfo);
                }else if(!duty.chk){
                	var list = checkedList;
                	angular.forEach(list,function(obj,i){
                		if(obj.dutyId == dutyInfo.dutyId){
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