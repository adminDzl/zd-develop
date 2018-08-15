(function() {
    'use strict';

    app.controller('MeetingOrderGrid',InitGrid);
    var base = '/meeting-room/meetingorder/';
	
    function InitGrid($scope, $http, $state, $stateParams,HttpUtils,ModalCtrl,modalCode,$modal){

        var currKeys = undefined;

        $scope.url = base + 'listmap.do';

        $scope.parkId;
        $scope.isRemote = false;

        // 配置分页，监听分页
        $scope.paginationConf = {pageSize: 10, currentPage: 1 };
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        // 请求后台数据
        function getGridData(){
            var sendData = {
                searchKeys:currKeys,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData ,function (data) {
                $scope.paginationConf.totalItems =data.data.recordsTotal;
                $scope.rows = data.data.data;
            });
        }

        // 搜索
        $scope.search = function (keys,e) {
            if(e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
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

})();



