var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

	$scope.level1 = "";
	$scope.level2 = "";
	$scope.describe = "";
	$scope.time = "";
	$scope.orderId = Utils.getValueInPathByName("orderId");
	//$scope.orderId = "244";
	$scope.processState = ""; //7：待审核；8：已审核；9：已驳回；10：已派单；11、已完成；12、已评价 ;0、已取消
	$scope.curOperationType = ""; // 0：取消；1：审批；2：派单；3：改单；4：评价
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.meetingTime = "";
	$scope.meetingStartTime = "";
	// 获取订单基本信息
	$scope.getOrderInfo = function () {
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'meetingroom/api/meetingroom/queryOrderInfo.do', data, function (data) {
			$scope.orderInfo = data;
			//$scope.meetingTime = data.orderDate + "  " + data.orderStartTime + "-" + data.orderEndTime;
			$scope.meetingStartTime = data.orderTimeList[0].substring(0,16);
			console.log($scope.orderInfo);
			$scope.curOperationType = data.operate;
			if (data && data.commRating){
				for (var i = 1; i <= data.commRating.ratingScore; i++) {
					$(".gradeBox ul li[data-start='" + i + "']").addClass("select");
				}
			}
			//订单状态处理
			if ($scope.orderInfo.orderStatus == 7) {
				$scope.processState = 0;
			}else if ($scope.orderInfo.orderStatus == 8){
				$scope.processState = 1;
			}else if ($scope.orderInfo.orderStatus == 9){
				$scope.processState = 5;
			}else if ($scope.orderInfo.orderStatus == 10){
				$scope.processState = 4;
			}else if ($scope.orderInfo.orderStatus == 11){
				$scope.processState = 2;
			}else if ($scope.orderInfo.orderStatus == 12){
				$scope.processState = 3;
			}else if ($scope.orderInfo.orderStatus == 0){
				$scope.processState = 6;
			}
			if($scope.orderInfo.orderStatus == 12){
				if ($scope.orderInfo.ratingScoreByService){
                	for(var i = 1; i <= $scope.orderInfo.ratingScoreByService; i++){
                    	$(".xin1 ul li[data-start='" + i + "']").addClass("select");
	                }
	            }
				if ($scope.orderInfo.ratingScoreByThings){
                	for(var i = 1; i <= $scope.orderInfo.ratingScoreByThings; i++){
                    	$(".xin2 ul li[data-start='" + i + "']").addClass("select");
	                }
	            }
			}
			//0：取消；1：审批；2：派单；3：改单；4：评价
			//$scope.orderInfo.curOperationType=4;
			//0：待审核；1：已审核；2：已完成；3、已评价；4、已派单 ;5：已驳回；6、已取消
			//$scope.processState = 3;
			$scope.judgeState($scope.processState);
			$scope.$apply();
		});
	};

	//审核-通过或驳回
    $scope.getOprateState = function (type) {
    	var data = {
            orderId: $scope.orderId,
            orderStatus: type,
            repulseReason: $scope.rejectResaon
        };
        console.log($scope.rejectResaon);
        // 为空判断处理
		if(data.type == 9 && !$scope.rejectResaon) {
			Utils.setTipBox("请输入驳回原因!");
			return;			
		}else{
			Utils.ajaxLoadData("post", Utils.baseUrl + 'meetingroom/api/meetingroom/auditOrderStatus.do', data, function (data) {
	            //$scope.getOrderInfo();
	            setTimeout(function(){
					window.location.href="meetingRoomDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
				},1000);
			});
		}
        
   }
    
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
                $scope.showDriverInfo($(".selectCarBox").slideUp());
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
	
    // 点击确定，显示维修人员电话
	$scope.showDriverInfo = function  (callback) {
		// 展示维修人员信息
        var id = $('.selectCarBox').find('ul> li.select').attr("data-id");
        var phone = $('.selectCarBox').find('ul> li.select').attr("data-phone");
        var name = $('.selectCarBox').find('ul> li.select').text();
        $scope.engineerTel = phone;
        $scope.engineerName = name;
        $scope.engineerId = id;
		callback;
    };
    //查询设备人员
    /*$scope.checkRepairers = function () {
		var data = {
			//meetingId: $scope.olderInfo.meetingId
		};
		Utils.ajaxLoadData("get", Utils.baseUrl + 'meetingroom/api/meetingroom/queryThinsgUsers.do', data, function (data) {
			$scope.repairers = data;
			console.log($scope.repairers);
		});
	};*/
    // 获取维修人员信息
    $scope.getRepairInfo = function (callback) {
        var data = {
            //meetingId: $scope.olderInfo.meetingId
        };
        $http({
            method: 'get',
            headers: { 'Authorization': $scope.token },
            url: Utils.baseUrl + "meetingroom/api/meetingroom/queryThinsgUsers.do",
            params: data
        }).then(function (result) {
            if (result.data.result == true) {
                // 成功
                $scope.repairsInfo = result.data.data;
                console.log($scope.repairsInfo);
                callback;
                if ($scope.repairsInfo.length == 0) {
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
    	$scope.getRepairInfo();
    	var engineers={
    		engineerId: $scope.engineerId,
    		engineerName: $scope.engineerName,
    		engineerTel: $scope.engineerTel
    	}
        var data = {
            orderId: $scope.orderId,
            thinsgUsers: JSON.stringify(engineers)
            ///thinsgUsers: JSON.stringify('{"engineerId":'+$scope.engineerId+',"engineerName":'+$scope.engineerName+',"engineerTel":'+$scope.engineerTel+"}")
        };
        /*if ($scope.olderInfo && $scope.olderInfo.id) {
            data.oldEngineerId = $scope.olderInfo.id;
            data.newEngineerId = $scope.orderInfo.engineerInfo.id;
            if (data.oldEngineerId == data.newEngineerId){
                Utils.setTipBox("新旧维修人员一直，不能重复派单");
            }
        }else{
            //data.newEngineerId = $scope.orderInfo.engineerInfo.id;
        }*/
		console.log(data.thinsgUsers);
        if (!data.thinsgUsers) {
			Utils.setTipBox("请选择维修人员！");
			return;
		} else if (!$scope.engineerTel) {
			Utils.setTipBox("请输入维修人员电话");
			return;
		} else {
			if ($scope.engineerTel) {
				var reg = /^1[0-9]{10}$/;
				var flag = reg.test($scope.engineerTel); //true
				if (!flag) {
					Utils.setTipBox("请输入正确维修人电话！");
					return;
				}
			}
		}
        Utils.ajaxLoadData("post", Utils.baseUrl + 'meetingroom/api/meetingroom/designateOrderStatus.do', data, function (data) {
			var msg = "派单成功";
			/*if($scope.curOperationType==2){
				msg="派单成功";
			}else if($scope.curOperationType==3){
				msg="改派成功";
			}*/
            Utils.setTipBox(msg);
            setTimeout(function(){
				window.location.href = "meetingRoomDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			},1000);
		});
    };
	
	//会场评分
	$scope.meetingStart = function ($event) {
		if ($scope.processState == 3){
			return;
		}
		var _thisStartLevel = Number($($event.currentTarget).attr("data-start"));
		$(".gradeBox1 ul li").removeClass("select");
		for (var i = 1; i <= _thisStartLevel; i++) {
			$(".gradeBox1 ul li[data-start='" + i + "']").addClass("select");
		}
		$scope.level1 = _thisStartLevel;
	};
	
	//设备评分
	$scope.devicesStart = function ($event) {
		if ($scope.processState == 3){
			return;
		}
		var _thisStartLevel = Number($($event.currentTarget).attr("data-start"));
		$(".gradeBox2 ul li").removeClass("select");
		for (var i = 1; i <= _thisStartLevel; i++) {
			$(".gradeBox2 ul li[data-start='" + i + "']").addClass("select");
		}
		$scope.level2 = _thisStartLevel;
	};

	// 点击选择文件
	$('.main').delegate(':file','change',function(){
		Utils.uploadFilePreviewForm(this, "registration");
	});

	//提交评价
	$scope.getComment = function () {
		var data = {
			orderId: $scope.orderId,
			ratingScoreByService: $scope.level1,
			ratingScoreByThings: $scope.level2,
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
		Utils.ajaxLoadData("post", Utils.baseUrl + 'meetingroom/api/meetingroom/addRating.do', data, function (data) {
			// 成功
			Utils.setTipBox("评价成功");
			setTimeout(function(){
				window.location.href = "meetingRoomDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			},1000);
		});
	};

	//取消订单
	$scope.cancelOrder = function () {
		// 发送请求，取消订单
		var data = {
			orderId: $scope.orderId,
		};
		Utils.ajaxLoadData("post", Utils.baseUrl + 'meetingroom/api/meetingroom/cancelMeetingOrder.do', data,function (data) {
			// 成功
			Utils.setTipBox("取消成功");
			setTimeout(function(){
				window.location.href = "meetingRoomDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			},1000);
		});
	};

	//判断状态
	$scope.judgeState = function (orderState) {
		//0：待审核；1：已审核；2：已完成；3、已评价；4、已派单 ;5：已驳回；6、已取消
		if (orderState == 0) {
			$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
		} 
		else if (orderState < 4) {
			console.log(111);
			for (var i = 0; i < (Number(orderState)+1); i++) {
				$(".orderStateBox ul li").eq(i).addClass("select");
			}
			$(".orderStateBox ul li").removeClass("current");
			$(".orderStateBox ul li").eq(Number(orderState)).addClass("current");
			$(".orderStateBox > div em").css("width", Number(orderState) * 33 + '%');
		} 
		else if (orderState == 4) {
			for (var i = 0; i < (Number(orderState)-1); i++) {
				$(".orderStateBox ul li").eq(i).addClass("select");
			}
			$(".orderStateBox ul li").removeClass("current");
			$(".orderStateBox ul li").eq(Number(orderState)-2).addClass("current");
			$(".orderStateBox > div em").css("width", (Number(orderState)-2) * 33 + '%');
		}
		else if (orderState == 5 || orderState == 6) {
			console.log(222);
			$(".orderStateBox").addClass("rejectOrder");
		}
	};

	$scope.share = function (type) {
		if (type == 'qq') {
			Utils.setTipBox('正在开发');
			return;
		}
		window.ccapi.shareTo({
			title: "物品放行", // 分享标题
			desc: "物品放行审核二维码", //分享描述
			link: 'http://qr.topscan.com/api.php?text=' + $scope.orderDetail.qrCodeUrl, // 分享链接
			imgUrl: 'http://qr.topscan.com/api.php?text=' + $scope.orderDetail.qrCodeUrl, // 分享图标完整url
			type: type == 'weixin' ? 'weixin' : 'qq', // 分享类型: weixin，qq，sms，email    

			success: function (res) {
			},
			fail: function (res) {
				Utils.setTipBox(res);
			}
		});
	};
	
	$scope.getOrderInfo();
	
}]);