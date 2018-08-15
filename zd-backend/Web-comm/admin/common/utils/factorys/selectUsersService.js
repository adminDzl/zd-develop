/**
 * Created by zhaomin on 2016/10/11.
 * 
 * 返回user实体
 */
(function () {
    'use strict'

    app.factory('selectUsers',function ($modal) {
        return {
            selectUser:selectUser,
            selectUsers:selectUsers
        }

        function selectUser(sendback,param) {
            var site = {
                single:true,
                callback:function (user) {
                    sendback(user);
                }
            }
            if(param){
            	site.unitId = param.unitId;
            	site.title = param.title;
            }
            choose(site)
        }

        function selectUsers(sendback,param) {
            var site = {
                single:false,
                callback:function (users) {
                    sendback(users);
                }
            }
            if(param){
            	site.title = param.title;
            	site.users = param.users;
            	site.valide = param.valide;
            }            
            choose(site)
        }

        function choose(site,m) {
            $modal.open({
                templateUrl:'../../../pages/toolsViews/users_choose_dialog.html?version='+new Date().getTime(),
                controller:'SelectUsersDialogCtrl',
                size:'lg',
                backdrop:'static',
                resolve:{
                    site:function () {
                        return site;
                    }
                }
            })
        }
    })
    app.controller('SelectUsersDialogCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {

        var checkedList = (site.users && site.users.length>0)?site.users:[];
        var checked = undefined;
        var searParent = {
            unit:{
                id:site.unitId
            },
            keys:''
        };
        
        $scope.hideUnit = false;
        if(site.unitId){
        	$scope.hideUnit = true;
        }
        else{
            HttpUtils.post('/smacuser/initUnitCombobox.do',undefined,function (data) {
                $scope.units = data.unitIds;
            })        	
        }
        
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            console.log('change');
            getUsersList();
        });

        $scope.title = site.title;

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.checkClick = function (user) {
        	if(user.chk && site.valide && site.valide == "mobile" && !user.mobile){
        		user.chk = false;
        		ModalCtrl.show('提示','该用户没有电话号码！',modalCode.warning);
        		return;
        	}
        	
            if(site.single){
                if(checked && checked.chk){
                    checked.chk = false;
                }
                if(user.chk){
                    checked = user;
                }
            }else{
                if(user.chk && checkedList.indexOf(user)==-1){
                    checkedList.push(user);
                }else if(!user.chk && checkedList.indexOf(user)>-1){
                    checkedList.splice(checkedList.indexOf(user),1);
                }
            }

        }

        $scope.commit = function () {
            if(site.single){
                if(checked){
                    site.callback(checked);
                    $modalInstance.close();
                }else{
                    ModalCtrl.show('提示','请选择数据后再按提交！',modalCode.warning);
                }
            }else{
                if(checkedList.length>0){
                    site.callback(checkedList);
                    $modalInstance.close();
                }else{
                    ModalCtrl.show('提示','请选择数据后再按提交！',modalCode.warning);
                }
            }
        }

        $scope.searchFor = function (sear) {
            if(!sear.unit)sear.unit = {
                id:site.unitId
            };
            searParent = sear;
            var datas = {
                searchUnitId:sear.unit.id,
                pageSearchKeys:sear.keys ? sear.keys.split(' ').join('+'):"",
                pageNo: 1,
                pageSize: $scope.paginationConf.pageSize
            }
            console.log(datas);
            sendPost(datas);
        }

        function sendPost(data) {
        	HttpUtils.post('/smacuser/gridUser.do',data,function (data) {
                $scope.paginationConf.totalItems = data.data.total;
                $scope.users = data.data.rows;
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
                            if(checkedList[i].id == String($scope.users[j].id)){
                                $scope.users[j].chk = true;
                                checkedList[i] = $scope.users[j];
                                continue;
                            }
                        }
                    }
                }
            })
        }

        function getUsersList() {
            var postData = {
            	samrtiCompanyId:searParent.unit.id,
                pageSearchKeys:searParent.keys?searParent.keys.split(' ').join('+'):"",
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            }
            sendPost(postData);
        }
    });
})()