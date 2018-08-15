var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

	$scope.level = "";
	$scope.describe = "";
	$scope.time = "";
	$scope.orderId = Utils.getValueInPathByName("orderId");
	//$scope.orderId = "c2d4606cb24e4b4db78329f9d6042522";
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.processState = ""; //0:待审核  1：已审核  2：已评价   3:取消   4:驳回
	$scope.curOperationType = ""; //0:无操作  1:审核操作 2：评价操作 3：取消操作
	$scope.commit = "";
	$scope.attachmentUrl = "";
	$scope.ratingFileUrl = "";
	// 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'rec/order/findByOrderId', data, function (data) {
			$scope.orderInfo = data.entity;
			$scope.curOperationType = data.operate;
			$scope.commit = data.commRating;
			$scope.attachmentUrl = data.attachmentUrl;
			$scope.ratingFileUrl = data.ratingFileUrl? data.ratingFileUrl : "" ;
			if (data && data.commRating){
				for (var i = 1; i <= data.commRating.ratingScore; i++) {
					$(".gradeBox ul li[data-start='" + i + "']").addClass("select");
				}
			}
			if ($scope.orderInfo.orderStatus == 0) {
				$scope.processState = 0;
			}else if ($scope.orderInfo.orderStatus == 1){
				$scope.processState = 1;
			}else if ($scope.orderInfo.orderStatus == 2){
				$scope.processState = 2;
			}else if ($scope.orderInfo.orderStatus == 3){
				$scope.processState = 3;
			}else if ($scope.orderInfo.orderStatus == 4){
				$scope.processState = 4;
			}
			//0:待审核  1：已审核  2：已评价   3:取消   4:驳回
			$scope.judgeState($scope.processState);
			$scope.$apply();
		});
	};


	//评分
	$scope.selectStart = function ($event) {
		if ($scope.processState == 3){
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

	//取消订单
	$scope.cancelOrder = function () {
		// 发送请求，取消订单
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("post", Utils.baseUrl + 'rec/order/cancel', data,function (data) {
			// 成功
			Utils.setTipBox("取消成功");
			$scope.getOrderInfo();
		});
	};

	//判断状态
	$scope.judgeState = function (orderState) {
		//0:待审核  1：已审核  2：已评价   3:取消   4:驳回
		if (orderState == 0) {
			$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
		} else if (orderState <= 2) {
			for (var i = 0; i < (Number(orderState) + 1); i++) {
				$(".orderStateBox ul li").eq(i).addClass("select");
			}
			$(".orderStateBox ul li").removeClass("current");
			$(".orderStateBox ul li").eq(Number(orderState)).addClass("current");
			$(".orderStateBox > div em").css("width", Number(orderState) * 50 + '%');
		} else if (orderState == 3 || orderState == 4) {
			$(".orderStateBox").addClass("rejectOrder");
		}
	};

	// 通过
    $scope.accept = function () {
        var data = {
            orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("post", Utils.baseUrl + 'rec/order/accept', data, function (data) {
			//$scope.orderId = data.orderId;
			// 成功提示todo (调到订单详情页面)
			setTimeout(function(){
				window.location.href="orderDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
			},1000);
		});
	};
	// 驳回
    $scope.reject = function () {
        var data = {
            orderId: $scope.orderId,
            rejectReason: $scope.rejectResaon
		};
		if(!data.rejectReason){
			Utils.setTipBox("请输入驳回理由");
		}else{
			Utils.ajaxLoadData("post", Utils.baseUrl + 'rec/order/reject', data, function (data) {
				// 成功提示todo (调到订单详情页面)
				setTimeout(function(){
					window.location.href="orderDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
				},1000);
			});
		}		
	};
	
	//提交评价
	$scope.getComment = function () {
		var list = $('#commentPicture').find(".item"),
		fileUrlList = [];
		$.each(list, function (index, item) {
			fileUrlList.push($(item).attr("data-path"));
	    });
		var data = {
			orderId: $scope.orderId,
			ratingScore: $scope.level,
			ratingDesc: $scope.describe,
			ratingType: 0,
			ratingFileUrl: JSON.stringify(fileUrlList)
		};
		
		//data.ratingFileUrl = JSON.stringify(fileUrlList);
		/*if($(".selectRepairsFile ul li.item em").length>0){
			Utils.setTipBox("图片尚未上传完成，请稍候！");
			return ;
		}*/
		Utils.ajaxLoadData("post", Utils.baseUrl + 'rec/order/evaluate', data, function (data) {
			// 成功
			Utils.setTipBox("评价成功");
			$scope.getOrderInfo();
		});
	};
	
	$scope.init = function () {
		$scope.getOrderInfo();
	};

	$scope.init();

}]);