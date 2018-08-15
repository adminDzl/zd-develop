var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

	$scope.countDown = 3;
	var countDownFn;
	$scope.level = "";
	$scope.describe = "";
	$scope.time = "";
	$scope.orderId = Utils.getValueInPathByName("orderId");
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.hasCarInfo = ""; //0:待审核 1：已审核 2：待评价 3：评价 4:已取消 5:已驳回
	// 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'car/carorder/orderInfo', data,$scope.token, function (data) {
			if (data.result == true) {
				$scope.orderInfo = data.data;
				$scope.time = data.data.startTime + "~" + data.data.endTime;
				$scope.orderInfo.useType = $scope.orderInfo.useType == "1" ? "正常公务" : "特殊情况";
				if (data.data && data.data.commRating){
					for (var i = 1; i <= data.data.commRating.ratingScore; i++) {
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
			}else{
				// 错误处理 TODO
				console.log(data.result,data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			// TODO错误处理
			console.log(error);
			$scope.closeOrOpenErrorTipBox("open");
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
		if(this.files[0].type.indexOf("image")>-1){
			lrz(this.files[0], {
				width:1200,
				before: function() {
				},
				fail: function(err) {
				},
				always: function() {
				},
				done: function (results) {
					// 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
					setTimeout(function () {
						demo_report('客户端预压的图片', results.base64, results.base64.length * 0.8);
					}, 100);
				}
			});
			var sbForm = document.getElementById("registration");
			sbForm.action = Utils.uploadFileUrl;// Utils.uploadImageServer;
			var formdata = new FormData(sbForm);
			//直接返回文件的源数据
			var blob= this.files[0];
			formdata.append('filePath1', blob);
				$.ajax({
				url : sbForm.action,
				type : "POST",
				data : formdata,
				dataType:"text",
				processData : false,         // 告诉jQuery不要去处理发送的数据
				contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
				success:function(ret){
					var data = eval('('+ret+')');
					if(data.data[0])
					{
						//处理文件
						//$scope.currentInfo.fileName = data.data[0].storagePath;
					}
				}
			});
		}	
	});

	function demo_report(title, src, size) {
		var img = new Image(),
			li = document.createElement('li'),
			size = (size / 1024).toFixed(2) + 'KB';      
		if(size === 'NaNKB') size = '';
			img.onload = function () {
			li.className = 'item';;
			li.appendChild(img);
			$("#commentPicture li:first").before(li);
			if($("#commentPicture li").length==5){
				$("#commentPicture li:last").hide();
			}else{
				$("#commentPicture li:last").show();
			}
		};
		img.src = typeof src === 'string' ? src : URL.createObjectURL(src);
	}

	//提交评价
	$scope.getComment = function () {
		// 发送请求，取消订单
		var data = {
			orderId: $scope.orderId,
			ratingScore: $scope.level,
			ratingDesc: $scope.describe
		};
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/addRating', data,$scope.token, function (data) {
			if (data.result == true) {
				// 成功
				$scope.getOrderInfo();
			}else {
				// 错误处理 TODO
				console.log(data.result,data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			// TODO错误处理
			console.log(error);
			$scope.closeOrOpenErrorTipBox("open");
		});
	};

	//取消订单
	$scope.cancelOrder = function () {
		// 发送请求，取消订单
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("post", Utils.baseUrl + 'car/carorder/cancelOrder', data, $scope.token,function (data) {
			if (data.result == true) {
				// 成功
				$scope.getOrderInfo();
			}else {
				// 错误处理 TODO
				console.log(data.result,data.message);
				$scope.closeOrOpenErrorTipBox("open");
			}
		}, function (error) {
			// TODO错误处理
			console.log(error);
			$scope.closeOrOpenErrorTipBox("open");
		});
		
	};

	//倒计时
	$scope.countDownFn = function () {
		if ($scope.countDown > 0) {
			$scope.countDown--;
		} else {
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").fadeOut();
		}
	};

	// 错误提示框
	$scope.closeOrOpenErrorTipBox = function (type) {
		if (type == "open") {
			$(".errorfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.countDown = 3;
			countDownFn = $interval($scope.countDownFn, 1000);
		} else if (type == "close") {
			$interval.cancel(countDownFn);
			$(".errorfulBox").removeClass("show");
			$(".masking").fadeOut();
		}
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