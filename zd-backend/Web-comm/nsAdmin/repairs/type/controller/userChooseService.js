/**
 * Created by longHuang on 2016/7/21.
 */
(function () {
    'use strict'
    var editUrl = '../nsAdmin/repairs/type/';
    app.factory('userChoose',function ($modal) {
        return {
            chooseUser:chooseUser,
            chooseUsers:chooseUsers
        }

        function chooseUser(sendback,unitId) {
            var site = {
                single:true,
                unitId:unitId,
                callback:function (user) {
                    sendback(user);
                }
            }
            choose(site)
        }

        function chooseUsers(sendback) {
            var site = {
                single:false,
                callback:function (users) {
                    sendback(users);
                }
            }
            choose(site)
        }

        function choose(site,m) {
            $modal.open({
                templateUrl:editUrl+'users_choose_dialog.html?version='+new Date().getTime(),
                controller:'UsersDialogCtrl',
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
    app.controller('UsersDialogCtrl',function (site,$modalInstance,HttpUtils,ModalCtrl,modalCode,$scope) {

        var checkedList = [];
        var checked = undefined;
        $scope.sear = {};
        var searParent = {
            unit:{
                id:site.unitId
            },
            keys:''
        };
        //配置分页基本参数
        $scope.paginationConf = {
            pageSize: 8,
            currentPage: 1
        };

        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            console.log('change');
            getUsersList();
        });

        $scope.title = '选择负责人';

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.checkClick = function (user) {
            var userInfo = {
                userId:String(user.id)+"("+user.smartiUnitId+")",
                userName:user.name.replace(' ','')+"("+user.unitShortName+")"
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

        }

        $scope.commit = function () {
            if(site.single){
                if(checked){
                    site.callback(checked);
                    $modalInstance.close();
                }else{
                    ModalCtrl.show('提示','请选择负责人后再按提交！',modalCode.warning);
                }
            }else{
                if(checkedList.length>0){
                    site.callback(checkedList);
                    $modalInstance.close();
                }else{
                    ModalCtrl.show('提示','请选择负责人后再按提交！',modalCode.warning);
                }
            }
        }

        $scope.searchFor = function (sear) {
            if(!sear.unit)sear.unit = {
                id:site.unitId
            };
            searParent = sear;
            var datas = {
            	companyId:sear.unit.id,
            	searchKeys:sear.keys ? sear.keys.split(' ').join('+'):"",
                pageNo: 1,
                pageSize: $scope.paginationConf.pageSize
            }
            console.log(datas);
            sendPost(datas);
        }

        function sendPost(data) {
            HttpUtils.post('/pnc/baseuser/getCompanyEmployees',data,function (data) {
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.users = data.data.page.rows;
                if(site.single){
                    for(var i=0;i<$scope.users.length;i++){
                        if(checked && checked.chk && checked.id == $scope.users[i].id){
                            $scope.users[i].chk = true;
                            continue;
                        }
                    }
                }else{
                    for(var i=0;i<checkedList.length;i++){
                        for(var j=0;j<$scope.users.length;j++){
                            if(checkedList[i].userId == (String($scope.users[j].id)+"("+$scope.users[j].smartiUnitId+")")){
                                $scope.users[j].chk = true;
                                continue;
                            }
                        }
                    }
                }
            })
        }

        function getUsersList() {
            var postData = {
            	companyId:searParent.unit.id,
                searchKeys:searParent.keys?searParent.keys.split(' ').join('+'):"",
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            }
            sendPost(postData);
        }
    });
})()