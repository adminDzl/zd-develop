(function () {
    'use strict';

    app.controller('DriverGrid', InitGrid);

    var editCtrl = "DriverGridEdit";
    app.controller(editCtrl, InitEdit);
    var editUrl = '../nsAdmin/releasegoods/blacklist/panel_edit.html';

    function InitGrid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {

        var currKeys = undefined;

        $scope.parkId;
        $scope.isRemote = false;

        // 配置分页，监听分页
        $scope.paginationConf = { pageSize: 10, currentPage: 1 };
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        // 请求后台数据
        function getGridData() {
            var sendData = {
                searchKey: currKeys,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get('/pass/amdin/orderblack/list', sendData, function (data) {
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.rows = data.data.page.rows;
                $scope.parkId = data.data.page.parkId;
            });
        }

        // 搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }

        // 新增
        $scope.addNew = function () {
            var site = {};
            site.parkId = $scope.parkId;
            site.title = '新增';
            site.code = 1;
            site.url = editUrl,
                site.ctrl = editCtrl,
                site.refresh = function () {
                    getGridData();
                };
            open(site, $modal);
        };

        // 修改
        $scope.update = function (id) {
            var sendData = { id: id };
            HttpUtils.get(base + "initEdit", sendData, function (resp) {
                var site = {};
                site.data = resp.data;
                site.parkId = $scope.parkId;
                site.title = '编辑';
                site.code = 2;
                site.url = editUrl,
                    site.ctrl = editCtrl,
                    site.refresh = function () {
                        getGridData();
                    };
                open(site, $modal);
            });
        }

        // 查看详情
        $scope.view = function (id) {
            var sendData = { id: id };
            HttpUtils.get(base + "initEdit", sendData, function (resp) {
                var site = {};
                site.data = resp.data;
                site.parkId = $scope.parkId;
                site.title = '详情';
                site.code = 3;
                site.url = editUrl,
                    site.ctrl = editCtrl,
                    site.refresh = function () {
                        getGridData();
                    };
                open(site, $modal);
            });
        }
        // 删除
        $scope.deleteById = function (id) {
            var sendData = { 'id': id };
            HttpUtils.post('/pass/amdin/orderblack/deleteById', sendData, function (data) {
                getGridData();
                if (data.result == true) {
                    ModalCtrl.show('提示', '删除成功！', modalCode.success);
                } else {
                    ModalCtrl.show(data.message, modalCode.error);
                }
            }
            );
        };

    }
    // 打开页面
    function open(site, $modal) {
        $modal.open({
            templateUrl: site.url + '?v=' + new Date().getTime(),
            controller: site.ctrl,
            controllerAs: 'mm',
            resolve: {
                site: function () {
                    return site;
                }
            }
        });
    }


    function InitEdit($scope, site, $filter, modalCode, ModalCtrl, HttpUtils, $modalInstance, $modal) {
        $scope.form = {};// 清空表单数据
        //$scope.site为外部引用参数对象 1为新增 2为修改

        $scope.form.type = 1;
        $scope.site = site;

        if (site.code == 1) {

        }
        if (site.code == 2) {
            $scope.form = angular.copy(site.data);
        };

        $scope.addSave = function () {
                var sendData = {
                    type: $scope.form.type,
                    relationId: $scope.form.id
                };
                HttpUtils.post('/pass/amdin/orderblack/addSave', sendData, function (data) {
                    site.refresh();
                    ModalCtrl.show('提示', '新增成功', modalCode.success);
                    $modalInstance.close();
                });
        };
        // 获取用户信息
        $scope.getUserInfo = function () {

            if ($scope.form.type == 1) {
                // 个人
                //配置分页，监听分页
                var currKeys = undefined;
                var paginationConf = { pageSize: 10, currentPage: 1 };
                var sendData = {
                    searchKey: currKeys,
                    pageNo: paginationConf.currentPage,
                    pageSize: paginationConf.pageSize
                }
                var sitess = {
                    url: "../nsAdmin/releasegoods/blacklist/users_choose_dialog.html",
                    ctrl: "UsersDialogCtrl",
                    parkId: $scope.site.parkId,
                    single: true,
                    callback: function (name) {
                        console.log(name);
                        $scope.form.name = name.realname;
                        $scope.form.id = name.id;
                    }
                };
                open(sitess, $modal)
            } else {
                // 公司
                //配置分页，监听分页
                var currKeys = undefined;
                var paginationConf = { pageSize: 10, currentPage: 1 };
                var sendData = {
                    searchKey: currKeys,
                    pageNo: paginationConf.currentPage,
                    pageSize: paginationConf.pageSize
                }
                var sitess = {
                    url: "../nsAdmin/releasegoods/blacklist/company_choose.html",
                    ctrl: "OrgChooseCtrl",
                    parkId: $scope.site.parkId,
                    single: true,
                    callback: function (name) {
                        console.log(name);
                        $scope.form.name = name.name;
                        $scope.form.id = name.id;
                    }
                };
                open(sitess, $modal)
            }
        }
        $scope.close = function () {
            $modalInstance.close();
        }

    }


})();



