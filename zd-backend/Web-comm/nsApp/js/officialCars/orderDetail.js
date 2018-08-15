var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

	$scope.level = "";
	$scope.describe = "";
	$scope.time = "";
	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.hasCarInfo = ""; //0:待审核 1：已审核 2：待评价 3：评价 4:已取消 5:已驳回
	// 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carorder/orderInfo', data, function (data) {
			$scope.orderInfo = data;
			$scope.time = data.startTime + "~" + data.endTime;
			$scope.orderInfo.useType = $scope.orderInfo.useType == "1" ? "正常公务" : "特殊情况";
			if (data && data.commRating){
				for (var i = 1; i <= data.commRating.ratingScore; i++) {
					$(".gradeBox ul li[data-start='" + i + "']").addClass("select");
				}
			}
			if ($scope.orderInfo.orderStatus == 6) {
				$scope.hasCarInfo = 2;
			}else if ($scope.orderInfo.orderStatus == 7){
				$scope.hasCarInfo = 3;
			}else if ($scope.orderInfo.orderStatus == 8){
				$scope.hasCarInfo = 4;
			}else if ($scope.orderInfo.orderStatus == 2){
				$scope.hasCarInfo = 5;
			}else if ($scope.orderInfo.orderStatus == 0) {
				$scope.hasCarInfo = 0;
			}else{
				$scope.hasCarInfo = 1;
			}
			//0:待审核 1：已审核 2：待评价 3：评价 4:已取消 5:已驳回
			//0：待审批；1：已审批；2：已驳回；3：已派单；4、已接单；5、已到处理地；6、用车完成；7、已评价8、已取消
			$scope.judgeState($scope.hasCarInfo);
			$scope.$apply();
		});
	};


	//评分
	$scope.selectStart = function ($event) {
		if ($scope.hasCarInfo == 3){
			return;
		}
		var _thisStartLevel = Number($($event.currentTarget).attr("data-start"));
		$(".gradeBox ul li").removeClass("select");
		for (var i = 1; i <= _thisStartLevel; i++) {
			$(".gradeBox ul li[data-start='" + i + "']").addClass("select");
		}
		$scope.level = _thisStartLevel;
	};

	// 点击选择文件
	$('.main').delegate(':file','change',function(){
		Utils.uploadFilePreviewForm(this, "registration");
	});

	//提交评价
	$scope.getComment = function () {
		var data = {
			orderId: $scope.orderId,
			ratingScore: $scope.level,
			ratingDesc: $scope.describe
		};
		var items = $("#commentPicture li.item"),
		fileList = [];
		if (items.length != 0) {
			$.each(items, function (index, ele) {
				fileList.push($(ele).attr("data-path"));
			});
			data.ratingFileUrl = fileList.join(";");
		}
		if($(".selectRepairsFile ul li.item em").length>0){
			Utils.setTipBox("图片尚未上传完成，请稍候！");
			return ;
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/addRating', data, function (data) {
			// 成功
			Utils.setTipBox("评价成功");
			$scope.getOrderInfo();
		});
	};

	//取消订单
	$scope.cancelOrder = function () {
		// 发送请求，取消订单
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/cancelOrder', data,function (data) {
			// 成功
			Utils.setTipBox("取消成功");
			$scope.getOrderInfo();
		});
	};

	//判断状态
	$scope.judgeState = function (orderState) {
		//0:待审核 1：已审核 2：待评价 3：评价 4:已取消 5:已驳回
		if (orderState == 0) {
			$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
		} else if (orderState <= 3) {
			for (var i = 0; i < (Number(orderState) + 1); i++) {
				$(".orderStateBox ul li").eq(i).addClass("select");
			}
			$(".orderStateBox ul li").removeClass("current");
			$(".orderStateBox ul li").eq(Number(orderState)).addClass("current");
			$(".orderStateBox > div em").css("width", Number(orderState) * 33 + '%');
		} else if (orderState == 5 || orderState == 4) {
			$(".orderStateBox").addClass("rejectOrder");
		}
	};


	$scope.init = function () {
		$scope.getOrderInfo();
	};

	$scope.init();

}]);