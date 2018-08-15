(function() {
    'use strict';

    app.controller('typeGrid',InitGrid);

    var editCtrl = "typeGridEdit";
    app.controller(editCtrl,InitEdit);

    var base = '/pass/admin/ordertype/';
    var editUrl = '../nsAdmin/releasegoods/type/panel_edit.html';

    function InitGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){

        var currKeys = undefined;

        $scope.url = base + 'list';

       // $scope.parkId;
        $scope.isRemote = false;

        // 配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1 };
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        // 请求后台数据
        function getGridData(){
            var sendData = {
                searchKey:currKeys,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData ,function (data) {
                $scope.paginationConf.totalItems =data.data.page.total;
                $scope.rows = data.data.page.rows;
            });
        }

        // 搜索
        $scope.search = function (keys,e) {
            if(e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }


        // 新增
        $scope.addNew = function () {
            var sendData = {};
           // HttpUtils.get(base + "init",sendData,function (resp) {
                var site = {};
                site.data = {};
                //site.parkId = $scope.parkId;
                site.title = '新增';
                site.code = 1;
                site.url =  editUrl,
                    site.ctrl = editCtrl,
                    site.refresh = function () {
                        getGridData();
                    };
                open(site,$modal);
           // });
        };

        // 修改
        $scope.update = function (id) {
            var sendData = {id:id};
            HttpUtils.get(base + "findById",sendData,function (resp) {
                var site = {};
                site.data = resp.data;
               // site.parkId = $scope.parkId;
               // site.leaderInfo = $scope.leaderInfo;
                site.title = '编辑';
                site.code = 2;
                site.url =   editUrl,
                    site.ctrl = editCtrl,
                    site.refresh = function () {
                        getGridData();
                    };
                open(site,$modal);
            });
        }

        // 删除
        $scope.deleteById = function(id) {
        	ModalCtrl.show('提示','您确定要删除当前数据吗？',modalCode.default,function () {
        		   var sendData = {'id':id};
                   HttpUtils.post(base +  'deleteById',sendData,function (data) {
                           getGridData();
                           if(data.result == true){
                               ModalCtrl.show('提示','删除成功！',modalCode.success);

                           }else{
                               ModalCtrl.show(data.message, modalCode.error);
                           }
                       }
                   );
        	});
        };

        // 查看详情
        // $scope.setTail = function () {
        //     var sendData = {};
        //     HttpUtils.get(base + "initEdit",sendData,function (resp) {
        //         var site = {};
        //         site.data = resp.data;
        //         site.parkId = $scope.parkId;
        //         site.title = '详情';
        //         site.code = 1;
        //         site.url =  editUrl,
        //             site.ctrl = editCtrl,
        //             site.refresh = function () {
        //                 getGridData();
        //             };
        //         open(site,$modal);
        //     });
        // };

    }
    // 打开页面
    function open(site,$modal) {
        $modal.open({
            templateUrl:site.url+'?v='+new Date().getTime(),
            controller: site.ctrl,
            controllerAs:'mm',
            resolve:{
                site:function () {
                    return site;
                }
            }
        });
    }


    function InitEdit($scope,site,$filter,modalCode,ModalCtrl,HttpUtils,$modalInstance,$modal) {
        $scope.form = {};// 清空表单数据
        //$scope.site为外部引用参数对象 1为新增 2为修改
        $scope.site = site;
    
       // $scope.leaderInfo = site.leaderInfo;

        if(site.code == 1){
        	$scope.form.status="1";
        }
        if(site.code == 2){
            $scope.form = angular.copy(site.data);
        };
        $scope.addSave = function () {
            if(site.code == 1){
                var sendData = angular.copy($scope.form);
                HttpUtils.post(base + 'addSave',sendData,function (data) {
                    site.refresh();
                    ModalCtrl.show('提示','新增成功',modalCode.success);
                    $modalInstance.close();
                });
            }else if(site.code == 2){
                var sendData = angular.copy($scope.form);
                HttpUtils.post( base + 'updateSave',sendData,function () {
                    site.refresh();
                    ModalCtrl.show('提示','修改成功！',modalCode.success);
                    $modalInstance.close();
                });
            }
        }
       


        $scope.close = function () {
            $modalInstance.close();
        }

    }


})();



