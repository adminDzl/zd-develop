(function () {
    'use strict';
    app.filter('orderStatus', function() {
        return function (type) {
            var orderStatus = "";
            if (type == '1') {
                orderStatus = "提交";
            } else if (type == '2') {
            	orderStatus = "已取消";
            } else if (type == '3') {
            	orderStatus = "审核中";
            } else if (type == '4') {
                orderStatus = "完成";
            }else if (type == '5'){
                orderStatus = '驳回';
            }
            return orderStatus;
        }
      });
    app.controller('wordcardOrderGrid', InitGrid);

    var editCtrl = "wordcardOrderGridEdit";
    app.controller(editCtrl, InitEdit);

    var base = '/onecard/wordcardOrder/';
    var editUrl = '../nsAdmin/onecard/wordcard/panel_detail.html';

    /*列表接口：http://192.168.118.85:8087/pass/admin/order/list      (get请求)
    传参：searchKey:关键字，startTime:开始时间(控件精确到秒)，endTime:结束时间 orderStatus:订单状态  0：已提交；1：同意放行；2：拒绝放行
        pageNo：页数  pageSize：每页查询个数
    详情接口：http://192.168.118.85:8087/pass/admin/order/getById   (get请求)
    传参：id:xxx*/

    function InitGrid($scope, $http, $state, $stateParams, HttpUtils, ModalCtrl, modalCode, $modal) {

        var currKeys = undefined,
            startTime ='',
            endTime ='';

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
            	searchKeys: currKeys,
                startTime: startTime,
                endTime: endTime,
                orderStatus: $scope.form.status1,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.pageSize
            };
            HttpUtils.get($scope.url, sendData, function (data) {
             
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
            if(str){
            	var timeList = str.split(" - ");
                startTime = timeList[0];
                endTime = timeList[1];
            }
            
            getGridData();
        });

        $scope.selectStatus = function () {
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
            HttpUtils.get(base + "findById",sendData,function (resp) {
                var site = {};
                site.data = resp.data.entity;
                site.parkId = $scope.parkId;
                site.title = '详情';
                site.code = 2;
                site.url =  editUrl,
                site.ctrl = editCtrl,
                open(site,$modal);
                site.curOperationType = site.data.orderStatus;
            	site.processState = site.data.nodeId;
	            if (site.data.nodeId == 1) {
					site.processState = 1;
				}else if (site.data.nodeId == 2){
					site.processState = 2;
				}else if (site.data.nodeId == 3){
					site.processState = 3;
				}else if (site.data.nodeId == 4){
					site.processState = 4;
				}else if (site.data.nodeId == 5) {
					site.processState = 5;
				}           
            });
        };

    }
    // 打开页面
    function open(site, $modal) {
        var modalInstance = $modal.open({
            templateUrl: site.url + '?v=' + new Date().getTime(),
            controller: site.ctrl,
            controllerAs: 'mm',
            resolve: {
                site: function () {
                    return site;
                }
            }
        });
        modalInstance.opened.then(function() {    // 模态窗口打开之后执行的函数
	         setTimeout(function(){
	         	if(site.processState == 1){
					$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
				}else if (site.processState <= 5){			
					//三层审核一直都是通过
					if(site.curOperationType == 3 || site.curOperationType == 1 || site.curOperationType == 4){		
						for (var i = 0; i < (Number(site.processState)); i++) {
							$(".orderStateBox ul li").eq(i).addClass("select");
							$(".orderStateBox ul li").eq(i).removeClass("course");
						}  
						$(".orderStateBox ul li").removeClass("current");
						$(".orderStateBox ul li").eq(Number(site.processState)-1).addClass("current");
						$(".orderStateBox > div em").css("width", (Number(site.processState)-1) * 25 + '%');
					}
					//审核驳回的三种情况
					else if(site.curOperationType == 5){
						if(site.processState == 2){
							$(".orderStateBox ul li").addClass("check1");
							$(".orderStateBox > div em").css("width", (Number(site.processState)-1) * 100 + '%');
						}else if(site.processState == 3){
							$(".orderStateBox ul li").eq(1).removeClass("course");
							$(".orderStateBox ul li").addClass("check2");
							$(".orderStateBox > div em").css("width", (Number(site.processState)-1) * 50 + '%');
						}else if(site.processState == 4){
							$(".orderStateBox ul li").addClass("check3");
							$(".orderStateBox ul li").eq(1).removeClass("course");
							$(".orderStateBox ul li").eq(2).removeClass("course");
							$(".orderStateBox > div em").css("width", (Number(site.processState)-1) * 33 + '%');
						}
						$(".orderStateBox ul li:first-child").removeClass("check1 check2 check3");
					}		
				}
				if (site.curOperationType == 5 || site.curOperationType == 2) {
					$(".orderStateBox").addClass("rejectOrder");
				}
				console.log(site.curOperationType);
	        },100);
            
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



