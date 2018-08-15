(function () {
    'use strict';

    app.controller('TLogRuleGrid', Grid);

    var editCtrl = "TLogRuleEdit";
    app.controller(editCtrl, DCtrl);

    var base = '/logrule/';
    var editUrl = '../admin/pages/log/t_logrule_edit.html';

    function Grid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {
        var currKeys = undefined;

        $scope.url = base + 'list.do';

        //配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1};
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        //请求后台数据
        function getGridData() {
            var sendData = {
            	searchKeys: currKeys,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
                // category: $scope.category
            };
            HttpUtils.post($scope.url, sendData, function (data) {
                $scope.paginationConf.totalItems = data.data.total;
                $scope.rows = data.data.rows;
                $scope.categoryList = data.categoryList;
//	 			if(!$scope.category){
//	 				$scope.category = $scope.categoryList[0].id;
//	 			}
            });
        }

        //新增
        $scope.addNew = function () {
            var site = {};
            site.data = {};
            site.title = '新增';
            site.code = 1;
            site.url = editUrl,
            site.ctrl = editCtrl,
            site.refresh = function () {
                getGridData();
            };
            open(site, $modal);
        };
        //修改
        $scope.update = function (id) {
            var sendData = {id: id};
            HttpUtils.post(base + "initUpdate.do", sendData, function (data) {
                var site = {};
                site.data = data.data;
                site.title = '修改';
                site.code = 2;
                site.url = editUrl,
                site.ctrl = editCtrl,
                site.refresh = function () {
                    getGridData();
                };
                open(site, $modal);
            });
        }
        //搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        //删除 改变状态
        $scope.deleteById = function (id,status) {
            console.info(id+" _ "+status);
            ModalCtrl.show('提示', status==1?'您确定要删除吗？':'您确定要恢复吗？', modalCode.default, function () {
                var stu = status==1?-1:1;
                var sendData = {'id': id, 'status': stu};

                HttpUtils.post(base + 'updateSave.do', sendData, function () {
                    getGridData();
                    ModalCtrl.show('提示', status==1?'删除成功！':'恢复成功！', modalCode.success);
                });
            });
        }
    }

    //打开页面
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


    function DCtrl(site, $filter, modalCode, ModalCtrl, HttpUtils, $modalInstance) {
        var mm = this;
        mm.site = site;
        mm.form = {};//清空表单数据
        mm.select = [];

        if (mm.site.code == 1) {
            setSelectValue(site.data.rootObj, '根', 0);

        }
        if (mm.site.code == 2) {
            mm.form = site.data;
        }
        //追加节点
        function setSelectValue(data1, name, index) {
            mm.select.splice(index, mm.select.length);
            var en = {
                data: data1,
                layerName: name,
                selected: {layerObjId: ''}
            };
            mm.select.push(en);
        }

        //选择下一个节点
        mm.selectAction = function (row, index) {
            var sendData = {id: row.selected.layerObjId};
            HttpUtils.post('/layerobj/selectLayerObj.do', sendData, function (data) {
                var isEmpty = data.isEmpty;
                if (isEmpty) {
                    mm.form.layerObjId = row.selected.layerObjId;
                } else {
                    var layerObj = data.layerObj;
                    var layer = data.layer;
                    setSelectValue(layerObj, layer.name, index);
                }
            });
        }


        mm.addSelect = function (addrs) {
            addrs.push(i + 1, 0, {
                receive: {
                    projecName: angular.copy(receive.projecName)
                }
            });
        }

        mm.removeSelect = function (addrs, parent, i, item) {
            console.log(parent);
            if (addrs.length > 1)addrs.splice(i, 1);
            else parent.splice(parent.indexOf(item), 1);
        }


        mm.addSave = function () {
            var sendData = angular.copy(mm.form);
            if (mm.site.code == 1) {
                HttpUtils.post(base + 'addSave.do', sendData, function (data) {
                    mm.site.refresh();
                    ModalCtrl.show('提示', '新增成功', modalCode.success);
                });
            } else if (mm.site.code == 2) {
                HttpUtils.post(base + 'updateSave.do', sendData, function () {
                    mm.site.refresh();
                    ModalCtrl.show('提示', '修改成功！', modalCode.success);
                });
            }
            $modalInstance.close();
        };
        mm.close = function () {
            $modalInstance.close();
        }
    }

})();



