(function () {
    'use strict';

    app.controller('orderlist', InitGrid);

    var editCtrl = "setOrderList";
    app.controller(editCtrl, InitEdit);

    var base = '/food/foodorder/';
    var editUrl = '../nsAdmin/restaurantbooking/orderlist/orderdetail.html';

    function InitGrid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {

        var currKeys = undefined;
        $scope.foodType = "";
        $scope.type = "";
        $scope.mealTime = "";
        $scope.mealTimeBegin = "";
        $scope.mealTimeEnd = "";
        $scope.orderTime = "";
        $scope.orderTimeBegin = "";
        $scope.orderTimeEnd = "";
        $scope.buyType = "";
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
                orderName: currKeys,
                foodType: $scope.foodType,  // 1午餐 2晚餐 3外卖
                type: $scope.type,  // 1个人 2单位
                mealTimeBegin: $scope.mealTimeBegin,
                mealTimeEnd: $scope.mealTimeEnd,
                orderTimeBegin: $scope.orderTimeBegin,
                orderTimeEnd: $scope.orderTimeEnd,
                buyType: $scope.buyType,  // 1微信 2月结
                pageNo: $scope.paginationConf.currentPage,
                orderStatus: $scope.orderStatus,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData, function (data) {
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.rows = data.data.page.rows;
            });
        }
        
        
         // 请求后台数据
        function exportData() {
            
            var foodOrderForm=$("#foodOrderForm");
            
            foodOrderForm.attr("action", "/ccpublic"+base + "exportFoodOrder");
            foodOrderForm.attr("method","post");
            
			foodOrderForm.submit();
        }


        // 搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }
        // 导出
        $scope.exportFoodOrder = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            currKeys = keys;
            exportData();
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


})();



