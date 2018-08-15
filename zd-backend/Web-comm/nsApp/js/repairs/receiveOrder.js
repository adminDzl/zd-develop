var app = angular.module('myApp', []);

app.controller('AppCtrl', ["$scope", "$http", function ($scope, $http) {

    $scope.orderInfo = "";
    $scope.orderId = Utils.getValueInPathByName("orderId");
    $scope.token = Utils.getValueInPathByName("access_token");

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
                $scope.judgeState($scope.orderInfo.orderChiefFrom[0].orderStatus);
            } else {
                Utils.setTipBox(result.data.message);
            }
        }, function (error) {
            Utils.setTipBox("链接服务器失败！");
        });
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

    // 接单或者已维修完成
    $scope.repairOperate = function (type) {
        var data = {
            id: $scope.orderId
        };
        var url = "";
        // $http({
        //     method: 'post',
        //     headers: { 'Authorization': $scope.token },
        //     url: Utils.baseUrls + "",
        //     data: data
        // }).then(function (result) {
        //     if (result.data.result == true) {
        //         // 成功
        //         if (type == "accept") {
        //             Utils.setTipBox("已接单");
        //         }else {
        //             window.location.href = "orderDetail.html?orderId=" + orderId + '&access_token=' + $scope.token;
        //         }
        //     } else {
        //         Utils.setTipBox(result.data.message);
        //     }
        // }, function (error) {
        //     Utils.setTipBox("链接服务器失败！");
        // });
        if (type == "accept") {
            url = Utils.baseUrl + 'pnc/orderchief/orderEvolving'
        }else {
            url = Utils.baseUrl + 'pnc/orderchief/finishOrder'
        }
        Utils.ajaxLoadData("post", url, data, function (data) {
			if (type == "accept") {
                Utils.setTipBox("已接单");
                $scope.getOrderInfo();
            }else {
                window.location.href = "orderDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
            }
		});
    };

    $scope.getOrderInfo();
}]);