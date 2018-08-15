(function () {
    'use strict';

    app.controller('orderlist', InitGrid);

    var editCtrl = "setOrderList";
    app.controller(editCtrl, InitEdit);

    var base = '/car/carorder/';
    var editUrl = '../nsAdmin/officialcars/car/orderdetail.html';

    function InitGrid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {

        var currKeys = undefined;
        $scope.orderTime = "";
        $scope.orderTimeBegin = "";
        $scope.orderTimeEnd = "";
        $scope.orderStatus = "";

        $scope.url = base + 'orderList';

        $scope.parkId;

        // 配置分页，监听分页
        $scope.paginationConf = { pageSize: 10, currentPage: 1 };
        $scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
            getGridData();
        });

        // 请求后台数据
        function getGridData() {
            var sendData = {
                searchKeys: currKeys,
                orderTimeBegin: $scope.orderTimeBegin,
                orderTimeEnd: $scope.orderTimeEnd,
                pageNo: $scope.paginationConf.currentPage,
                orderStatus: $scope.orderStatus,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData, function (data) {
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.rows = data.data.page.rows;
            });
        }

        // 搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        // 监控时间组件变化
        $scope.$watch('orderTime', function () {
            if ($scope.orderTime) {
                var str = $scope.orderTime;
                var timeList = str.split(" - ");
                $scope.orderTimeBegin = timeList[0];
                $scope.orderTimeEnd = timeList[1];
                getGridData();
            }
        });
        $scope.$watch('mealTime', function () {
            if ($scope.mealTime) {
                var str = $scope.mealTime;
                var timeList = str.split(" - ");
                $scope.mealTimeBegin = timeList[0];
                $scope.mealTimeEnd = timeList[1];
                getGridData();
            }
        });

        //日期范围初始化
        $scope.dateRangeOptions = {
            format: "YYYY-MM-DD HH:mm:ss",
            showDropdowns: true,//显示年月下拉选择     	                
            timePicker: true,//显示时间选择
            timePicker12Hour: false,//是否显示12小时制
            timePickerIncrement: 10, //时间增量，单位为分钟
            locale: {
                applyLabel: '确定',
                cancelLabel: '取消',
                fromLabel: '起始时间',
                toLabel: '结束时间',
                customRangeLabel: '自定义',
                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'],

                firstDay: 1
            }
        };

        // 查看详情
        $scope.set = function (id) {
            var sendData = {
                orderId: id
            };
            HttpUtils.get(base + "orderInfo", sendData, function (resp) {
                console.log(resp);
                var site = {};
                site.data = resp.data;
                site.parkId = $scope.parkId;
                site.title = '订单详情';
                site.url = editUrl;
                site.ctrl = editCtrl;
                open(site, $modal);
            });
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


    function InitEdit($scope, site, $filter, modalCode, ModalCtrl, HttpUtils, $modalInstance) {
        $scope.form = {};
        $scope.site = site;

        $scope.form = angular.copy(site.data);
        $scope.close = function () {
            $modalInstance.close();
        }

    }
    
    
    app.filter('orderStatus', function() {
        return function (type) {
            var orderStatus = "";
            if (type == '0') {
                orderStatus = "待审核";
            }else if (type == '1') {
                orderStatus = "已审核";
            } else if (type == '2') {
                orderStatus = "已驳回";
            } else if (type == '3') {
                orderStatus = "已派单";
            } else if (type == '4') {
                orderStatus = "已接单";
            }else if (type == '5'){
                orderStatus = '已到出发地';
            }else if (type == '6'){
                orderStatus = '用车完成';
            }else if (type == '7'){
                orderStatus = '已评价';
            }else if (type == '8'){
                orderStatus = '已取消';
            }
            return orderStatus;
        }
      });


})();



