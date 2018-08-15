var app = angular.module('myApp', []);

app.controller('AppCtrl', ["$scope", "$http", function ($scope, $http) {

    $scope.orderStatus = "";
    $scope.describe = "";
    $scope.orderId = Utils.getValueInPathByName("orderId");
    $scope.token = Utils.getValueInPathByName("access_token");
    $scope.userType = "";  // 1普通用户提单 2 物业人员提单
    $scope.level = "";

    // 获取订单数据
    $scope.getOrderInfo = function () {
        var data = {
            id: $scope.orderId
        };
        $http({
            method: 'get',
            headers: { 'Authorization': $scope.token },
            url: Utils.baseUrl + "pnc/orderchief/findById",
            params: data
        }).then(function (result) {
            if (result.data.result == true) {
                // 成功
                $scope.orderInfo = result.data.data;
                console.log($scope.orderInfo)
                $scope.orderStatus = $scope.orderInfo.orderChiefFrom[0].orderStatus;
                $scope.userType = $scope.orderInfo.role;
                if ($scope.userType == '1') {
                    if ($scope.orderInfo.ordinaryUser && $scope.orderInfo.ordinaryUser.star){
                        for (var i = 1; i <= $scope.orderInfo.ordinaryUser.star; i++) {
                            $(".pu ul li[data-start='" + i + "']").addClass("select");
                        }
                    }
                }else if($scope.userType == '2') {
                    if ($scope.orderInfo.repairUser && $scope.orderInfo.repairUser.star){
                        for (var i = 1; i <= $scope.orderInfo.repairUser.star; i++) {
                            $(".pu ul li[data-start='" + i + "']").addClass("select");
                        }
                    }
                }else if ($scope.userType == '3') {
                    if ($scope.orderInfo.adminUser && $scope.orderInfo.adminUser.star){
                        for (var i = 1; i <= $scope.orderInfo.adminUser.star; i++) {
                            $(".xin ul li[data-start='" + i + "']").addClass("select");
                        }
                    }
                }
                $scope.judgeState($scope.orderStatus);
            } else {
                Utils.setTipBox(result.data.message);
            }
        }, function (error) {
            Utils.setTipBox("链接服务器失败！");
        });
    };

    //评分
	$scope.selectStart = function ($event) {
		if ($scope.orderStatus == '5'){
			return;
        }
        _this = $($event.currentTarget);
		var _thisStartLevel = Number(_this.attr("data-start"));
		_this.parents(".gradeBox").find("ul li").removeClass("select");
		for (var i = 1; i <= _thisStartLevel; i++) {
			$(".gradeBox ul li[data-start='" + i + "']").addClass("select");
		}
		$scope.level = _thisStartLevel;
	};

    //判断状态
	$scope.judgeState = function (orderState) {
		//1:已提交 2：已派单 3：已接单 4：已维修 5:已评价 6:已取消
		if (orderState == 1) {
			$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
		} else if (orderState <= 5) {
			for (var i = 0; i < (Number(orderState)); i++) {
				$(".orderStateBox ul li").eq(i).addClass("select");
			}
			 $(".orderStateBox ul li").removeClass("current");
			 $(".orderStateBox ul li").eq(Number(orderState)-1).addClass("current");
			$(".orderStateBox > div em").css("width", (Number(orderState)-1) * 25 + '%');
		} else if (orderState == 6) {
			$(".orderStateBox").addClass("rejectOrder");
		}
    };

    // 文件上传
    $('.main').delegate(':file','change',function(){
		Utils.uploadFilePreviewForm(this, "registration");
	});

    // 取消订单
    $scope.cancelOrder = function () {
        var data = {
            id: $scope.orderId
        };
        Utils.ajaxLoadData("post", Utils.baseUrl + 'pnc/orderchief/cancel', data, function (data) {
            Utils.setTipBox("订单取消成功");
            $scope.getOrderInfo();
		});
    };

    // 改派订单
    $scope.sendOrder = function () {
        window.location.href = "orderSelectRepair.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
    };

    // 提交评价 普通用户 物业人员 行政人员
    $scope.getComment = function() {
        var data = {
            id: $scope.orderId,
            contents: $scope.describe,
            star: $scope.level
        },
            fileUrlList = [],
			list = $('#commentPicture').find(".item");
		$.each(list, function (index, item) {
			fileUrlList.push($(item).attr("data-path"));
        });
        if (fileUrlList.length > 0) {
            data.appraiseURL = JSON.stringify(fileUrlList);
        }
        if($(".selectRepairsFile ul li.item em").length>0){
			Utils.setTipBox("图片尚未上传完成，请稍候！");
			return ;
		}
        Utils.ajaxLoadData("post", Utils.baseUrl + 'pnc/orderchief/appraise', data, function (data) {
            Utils.setTipBox("评价成功");
            list.remove();
            $scope.getOrderInfo();
		});
    };

    $scope.getOrderInfo();

}]);