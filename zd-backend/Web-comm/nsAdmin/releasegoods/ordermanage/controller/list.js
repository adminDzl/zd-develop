(function () {
    'use strict';
    app.filter('orderStatus', function() {
        return function (type) {
            var orderStatus = "";
            if (type == '1') {
                orderStatus = "审核通过";
            } else if (type == '2') {
                orderStatus = "审核驳回";
            } else if (type == '5') {
                orderStatus = "放行通过";
            } else if (type == '6') {
                orderStatus = "拒绝放行";
            }else if (type == '0'){
                orderStatus = '已提交';
            }
            return orderStatus;
        }
      });
    
    
    app.controller('LeaderGrid', InitGrid);

    var editCtrl = "LeaderGridEdit";
    app.controller(editCtrl, InitEdit);

    var base = '/pass/admin/order/';
    var editUrl = '../nsAdmin/releasegoods/ordermanage/panel_edit.html';

    /*列表接口：http://192.168.118.85:8087/pass/admin/order/list      (get请求)
    传参：searchKey:关键字，startDate:开始时间(控件精确到秒)，endDate:结束时间 orderStatus:订单状态  0：已提交；1：同意放行；2：拒绝放行
        pageNo：页数  pageSize：每页查询个数
    详情接口：http://192.168.118.85:8087/pass/admin/order/getById   (get请求)
    传参：id:xxx*/

    function InitGrid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {

        var currKeys = undefined,
            startDate ='',
            endDate ='';

        $scope.url = base + 'list';

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
                startDate: startDate,
                endDate: endDate,
                orderStatus: $scope.form.status1,
                goodsType2: $scope.form.goodsType2,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData, function (data) {
                console.log(data);
                $scope.paginationConf.totalItems = data.data.page.total;
                $scope.rows = data.data.page.rows;
            });
        }

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
        $scope.$watch('dateTime', function () {
            console.log($scope.dateTime)
            var str = $scope.dateTime;
            var timeList = str.split(" - ");
            startDate = timeList[0];
            endDate = timeList[1];
            getGridData();
        });

        $scope.selectStatus = function () {
            $scope.search();
        };
        $scope.selectGoodsType2 = function () {
            $scope.search();
        };

        // 搜索
        $scope.search = function (keys, e) {
            if (e && e.keyCode !== 13)
                return;
            currKeys = keys;
            $scope.paginationConf.currentPage == 1 ? getGridData() : $scope.paginationConf.currentPage = 1;
        }


       // 查看详情
        $scope.setTail = function (id) {
            var sendData = {
                id: id
            };
            HttpUtils.get(base + "getById",sendData,function (resp) {
                console.log(resp);
                var site = {};
                site.data = resp.data;
                site.parkId = $scope.parkId;
                site.title = '详情';
                site.code = 2;
                site.url =  editUrl,
                site.ctrl = editCtrl,
                open(site,$modal);
            });
        };
        
        $scope.getAllType = function(){
        	var sendData = {};
        	 HttpUtils.get("/pass/admin/ordertype/getAll", sendData, function (data) {
                 //console.log(data);
                 $scope.allType = data.data;
             });
        }

        $scope.getAllType();
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
        $scope.site = site;


        if (site.code == 2) {
            $scope.form = angular.copy(site.data);
        };


        $scope.close = function () {
            $modalInstance.close();
        }

    }


})();



