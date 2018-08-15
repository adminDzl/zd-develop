var app =
    angular.module('app');

app.controller('listPushUserController', function ($scope, $rootScope, listPushUserService, $translate,ModalCtrl,modalCode) {
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: pageconfig.pageSize
    };

    $rootScope.searchPushUser = function () {
        $rootScope.idStr = "";
        var postData = {
            page: $scope.paginationConf.currentPage,
            rows: $scope.paginationConf.itemsPerPage,
            realname: $scope.realname,
            nickname: $scope.nickname,
            mobile: $scope.mobile,
            email: $scope.email,
            orgName: $scope.orgName,

            status: 1,
            groupId: $rootScope.groupId
        };

        listPushUserService.listUser(postData, function (data) {
            $rootScope.datas = data;
            $rootScope.totalItems = $scope.datas.total;

            Utils.colResizable(angular, ".orderSueTable");
        });
    };

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $rootScope.searchPushUser);

    //查询
    $scope.query = function () {
        $rootScope.searchPushUser();
    };


    var tree;
    $rootScope.list = [];
    $rootScope.doing_async = true;
    $rootScope.group_tree = tree = {};
    $rootScope.groupTreeList = function () {
        var postData = {

            status: 1
        };
        listPushUserService.groupTreeList(postData, function (data) {
            $rootScope.list = data.groupTree;
            $rootScope.doing_async = false;
        });
    };
    $rootScope.groupTreeList();


    $scope.navSelect = function (branch) {
        $rootScope.groupId = branch.id;
        $rootScope.searchPushUser();
    };

    $scope.chkUser = function (id, check) {
        if (check == true) {
            $rootScope.idStr = $rootScope.idStr + id + ',';
        } else {
            $rootScope.idStr = $rootScope.idStr.replace(id + ',', '');
        }
    };


    //用户加入群组
    $scope.groupIdStr = "";
    $scope.userToGroup = function () {
        if (!$rootScope.idStr) {
            Modal.alert({msg: "请选择要加入的用户！"});
            return;
        }
        $scope.groupIdStr = "";
        $scope.pushGroups = {};
        var postData = {

            status: 1

        };
        listPushUserService.groupTreeListEx(postData, function (data) {
            $scope.pushGroups = data.groupTree;
        });
        $('#pushGroups').modal();
        Utils.showTip();
    };


    //选择要加入的群组
    $scope.chkGroup = function (id, check) {
        if (check == true) {
            $scope.groupIdStr = id;
        } else {
            $scope.groupIdStr = "";
        }
    };

    //加入群组
    $scope.joinGroup = function () {
        if (!$scope.groupIdStr) {
            Modal.alert({msg: "请选择要加入的群组！"});
            return;
        }
        var postData = {
            groupId: $scope.groupIdStr,
            userIdStr: $rootScope.idStr
        };
        listPushUserService.joinGroup(postData, function (data) {
            if (data.result) {
                $rootScope.tipMessage = "用户保存成功！";
                $('#saveTip').modal();
                setTimeout(function () {
                    $('#saveTip').modal(("hide"));
                }, 1000);
            } else {
                $rootScope.tipMessage = "用户已存在！";
                $('#saveTip').modal();
                setTimeout(function () {
                    $('#saveTip').modal(("hide"));
                }, 1000);
            }
            $('#pushGroups').modal("hide");
            Utils.showTip();
            $rootScope.groupTreeList();
            $rootScope.groupId = "";
            $rootScope.searchPushUser();
        });
    };
    //移除群组（只能在单个群组中移除）
    $scope.removeFromGroup = function (obj) {
        ModalCtrl.show('提示', '您确定要删除吗？', modalCode.default, function () {
            var postData = {
                groupId: obj.groupId,
                userId: obj.id
            };
            listPushUserService.removeFromGroup(postData, function (data) {
                if (data.result == true) {
                    ModalCtrl.show('提示', '删除成功！', modalCode.success);
                    $rootScope.groupTreeList();
                    $rootScope.groupId = "";
                    $rootScope.searchPushUser();
                }
            });
        });
    };


    //查看用户详情
    $scope.viewPushUser = function (obj) {
        $scope.userDatas = angular.copy(obj);
        $('#viewPushUser').modal();
        Utils.showTip();
    };


});


//业务类
app.factory('listPushUserService', ['$http', '$translate', function ($http, $translate) {
    //获取左边群组
    var groupTreeList = function (postData, successCallback) {
        $http({
            method: 'POST',
            url: path + "/mp/getPushGroupTree.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };
    //加载用户
    var listUser = function (postData, successCallback) {

        $http({
            method: 'POST',
            url: path + "/mp/getUserListEx.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };
    //获取可加入群组
    var groupTreeListEx = function (postData, successCallback) {
        $http({
            method: 'POST',
            url: path + "/mp/getPushGroupTreeEx.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };
    //加入群组
    var joinGroup = function (postData, successCallback) {
        $http({
            method: 'POST',
            url: path + "/mp/joinGroup.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };
    //移出群组
    var removeFromGroup = function (postData, successCallback) {
        $http({
            method: 'POST',
            url: path + "/mp/removeFromGroup.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };


    return {
        groupTreeList: function (postData, successCallback) {
            return groupTreeList(postData, successCallback);
        },
        groupTreeListEx: function (postData, successCallback) {
            return groupTreeListEx(postData, successCallback);
        },
        joinGroup: function (postData, successCallback) {
            return joinGroup(postData, successCallback);
        },
        removeFromGroup: function (postData, successCallback) {
            return removeFromGroup(postData, successCallback);
        },
        listUser: function (postData, successCallback) {
            return listUser(postData, successCallback);
        }
    };
}]);


/*------------------------------------------------群组管理相关-------------------------------------------------*/


app.controller('listPushGroupController',  function ($scope, $rootScope, listPushGroupService, $translate,ModalCtrl,modalCode) {

    $scope.search = function () {
        var postData = {
            searchStr: $scope.searchStr,

            status: 1
        };

        listPushGroupService.list(postData, function (data) {
            $rootScope.pushGroupListDatas = data;

            Utils.colResizable(angular, ".orderSueTable");
        });
    };


    //查询
    $scope.query = function () {
        $scope.search();
    };


    //编辑
    $scope.toeditPushGroup = function (obj) {
        $rootScope.pushGroupDatas = {};
        listPushGroupService.getGroupDetail(obj, function (data) {
            $rootScope.pushGroupDatas = data.mpGroup;
        });
        $('#editPushGroup').modal();
        Utils.showTip();
    };
    //管理
    $rootScope.toManagePushGroup = function (obj) {
        $scope.search();
        $('#pushGroupList').modal();
        Utils.showTip();
    };

    //增加
    $rootScope.addPushGroup = function () {
        $rootScope.pushGroupDatas = {};
        $rootScope.pushGroupDatas.status = 1;
        $('#editPushGroup').modal();
        Utils.showTip();
    };

    //保存
    $rootScope.savePushGroup = function (obj) {
        var notNull = $translate.instant("error.notNull");

        if (!obj.name) {
            Utils.showTip(false, $translate.instant("tableTitle.isGroupName") + notNull);
            return;
        }

        listPushGroupService.existCheck(obj, function (data) {
            if (!data.result) {
                Utils.showTip(false, "该群组名已存在，请重新输入！");
                return;
            } else {
                listPushGroupService.savePushGroup(obj, function () {
                    $rootScope.groupTreeList();
                    $('#editPushGroup').modal("hide");
                    Utils.showTip();
                    $scope.search();
                });
            }

        });


    };
    //删除
    $scope.delPushGroup = function (obj) {
        ModalCtrl.show('提示', '您确定要删除吗？', modalCode.default, function () {
            listPushGroupService.delPushGroup({"id": obj.id}, function (data) {
                if (data.result == true) {
                    ModalCtrl.show('提示', '删除成功！', modalCode.success);
                    $scope.search();
                    $rootScope.groupTreeList();
                    $rootScope.groupId = "";
                    $rootScope.searchPushUser();
                }
            });
        });
    };
});

//业务类
app.factory('listPushGroupService', ['$http', '$translate', function ($http, $translate) {
    var list = function (postData, successCallback) {

        $http({
            method: 'POST',
            url: path + "/mp/getGroupList.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };

    var savePushGroup = function (postData, successCallback) {
        $http({
            method: 'POST',
            url: path + "/mp/saveGroup.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };
    var existCheck = function (postData, successCallback) {
        $http({
            method: 'POST',
            url: path + "/mp/existCheck.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };
    var delPushGroup = function (postData, successCallback) {

        $http({
            method: 'POST',
            url: path + "/mp/deleteGroup.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param(postData),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };


    var getGroupDetail = function (postData, successCallback) {

        $http({
            method: 'POST',
            url: path + "/mp/getGroupDetail.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data: $.param({"id": postData.id}),
            async: false
        }).success(function (data) {
            successCallback(data);
        });
    };

    return {
        list: function (postData, successCallback) {
            return list(postData, successCallback);
        },
        existCheck: function (postData, successCallback) {
            return existCheck(postData, successCallback);
        },
        savePushGroup: function (postData, successCallback) {
            return savePushGroup(postData, successCallback);
        },
        getGroupDetail: function (postData, successCallback) {
            return getGroupDetail(postData, successCallback);
        },
        delPushGroup: function (postData, successCallback) {
            return delPushGroup(postData, successCallback);
        }
    };
}]);


/*------------------------------------------------群组管理相关-------------------------------------------------*/






