var app = angular.module('myApp', []);

app.controller('AppCtrl', ["$scope", "$http", function ($scope, $http) {

    $scope.orderInfo = "";
    $scope.repairsInfo = "";
    $scope.orderId = Utils.getValueInPathByName("orderId");
    $scope.token = Utils.getValueInPathByName("access_token");
    $scope.olderInfo = "";

    //选择维修人员
	$scope.selectDriver=function($event,type){
		if(type=='open'){
			$scope.getRepairInfo($(".selectCarBox").slideDown());
		}else if(type=='confirm'){
			$scope.showDriverInfo($(".selectCarBox").slideUp());
		}else if(type=='close'){
            $(".selectCarBox").slideUp();
		}else{
			var _this=$($event.currentTarget);
			if(_this.hasClass("unselect")){
				return;
			}else{
                _this.addClass("select").siblings().removeClass("select");
			}
		}
		
	};

    // 点击确定，显示维修人员电话
	$scope.showDriverInfo = function  (callback) {
		// 展示维修人员信息
        var id = $('.selectCarBox').find('ul> li.select').attr("data-id");
        var phone = $('.selectCarBox').find('ul> li.select').attr("data-phone");
        var name = $('.selectCarBox').find('ul> li.select').text();
        $scope.orderInfo.engineerInfo.phome = phone;
        $scope.orderInfo.engineerInfo.name = name;
        $scope.orderInfo.engineerInfo.id = id;
		callback;
    };

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
                console.log($scope.orderInfo);
                if ($scope.orderInfo) {
                    $scope.olderInfo = angular.copy($scope.orderInfo.engineerInfo);
                }
            } else {
                Utils.setTipBox(result.data.message);
            }
        }, function (error) {
            Utils.setTipBox("链接服务器失败！");
        });
    };

    // 获取维修人员信息
    $scope.getRepairInfo = function (callback) {
        var data = {
            fdPncSortSubId: $scope.orderInfo.orderChiefFrom[0].sortSubId,
            fdAreaId: $scope.orderInfo.orderChiefFrom[0].areaChiefId
        };
        $http({
            method: 'get',
            headers: { 'Authorization': $scope.token },
            url: Utils.baseUrl + "pnc/pncsortprocessuser/findMaintainerList",
            params: data
        }).then(function (result) {
            if (result.data.result == true) {
                // 成功
                $scope.repairsInfo = result.data.data;
                callback;
                if ($scope.repairsInfo.engineersInfo.length == 0) {
                    $(".selectCarBox").slideUp();
                    $(".masking").fadeOut();
                    Utils.setTipBox("暂无可派单维修人员");
                }
            } else {
                Utils.setTipBox(result.data.message);
            }
        }, function (error) {
            Utils.setTipBox("链接服务器失败！");
        });
    };

    // 点击派单或者改派
    $scope.sendOrder = function () {
        var data = {
            orderId: $scope.orderId
        };
        if ($scope.olderInfo && $scope.olderInfo.id) {
            data.oldEngineerId = $scope.olderInfo.id;
            data.newEngineerId = $scope.orderInfo.engineerInfo.id;
            if (data.oldEngineerId == data.newEngineerId){
                Utils.setTipBox("新旧维修人员一直，不能重复派单");
            }
        }else{
            data.newEngineerId = $scope.orderInfo.engineerInfo.id;
        }

        if (!data.orderId) {
			Utils.setTipBox("请选择维修人员！");
			return;
		} else if (!$scope.orderInfo.engineerInfo.phome) {
			Utils.setTipBox("请输入维修人员电话");
			return;
		} else {
			if ($scope.orderInfo.engineerInfo.phome) {
				var reg = /^1[0-9]{10}$/;
				var flag = reg.test($scope.orderInfo.engineerInfo.phome); //true
				if (!flag) {
					Utils.setTipBox("请输入正确申请人电话！");
					return;
				}
			}
		}
        // $http({
        //     method: 'post',
        //     headers: { 'Authorization': $scope.token },
        //     url: Utils.baseUrls + "",
        //     data: data
        // }).then(function (result) {
        //     if (result.data.result == true) {
        //         // 成功
        //         var msg = type == '1' ? "派单成功！" : "改单成功！";
        //         Utils.setTipBox(msg);
        //     } else {
        //         Utils.setTipBox(result.data.message);
        //     }
        // }, function (error) {
        //     Utils.setTipBox("链接服务器失败！");
        // });
        Utils.ajaxLoadData("post", Utils.baseUrl + 'pnc/orderchief/sendOrder', data, function (data) {
			var msg = $scope.olderInfo && $scope.olderInfo.id ? "改派成功" : "派单成功！";
            Utils.setTipBox(msg);
            //$scope.getOrderInfo();
            window.location.href = "orderDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
		});
    };

    // 初始化
    $scope.init = function () {
        $scope.getOrderInfo();
    };

    $scope.init();
}]);