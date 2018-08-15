var app = angular.module('myApp', ['ngStorage']);

app.controller('AppCtrl', ['$scope', '$http', '$interval','$localStorage', function ($scope, $http, $interval,$localStorage) {

    $scope.orderStatus = "";
    $scope.orderId = Utils.getValueInPathByName("orderId");
    //$scope.orderId = "48fcb0a1d7034ca991c5c03ff1f1c2ab";
    $scope.token = Utils.getValueInPathByName("access_token");
    $scope.processState = ""; //1: 已提交  2：科室负责人审核  3：分管领导审核  4：事务局审核  5: 已完成 
	$scope.curOperationType = ""; //1:提交   2:撤销  3：进行中  4：已完成  5、驳回
	$scope.rejectResaon = "";
	$scope.isMyOrder = false;

    // 获取订单数据
    $scope.getOrderInfo = function () {
        $http({
            method: 'get',
            headers: { 'Authorization': $scope.token },
            url: Utils.baseUrl + "onecard/wordcardOrder/findById?id="+$scope.orderId,
        }).then(function (result) {
            if (result.data.result == true) {
                // 成功
                $scope.orderInfo = result.data.data.entity;
                $scope.isMyOrder = result.data.data.isMyOrder;
                $scope.curOperationType = $scope.orderInfo.orderStatus;
                console.log($scope.orderInfo);
                $scope.processState = $scope.orderInfo.nodeId;
                if ($scope.orderInfo.nodeId == 1) {
				$scope.processState = 1;
				}else if ($scope.orderInfo.nodeId == 2){
					$scope.processState = 2;
				}else if ($scope.orderInfo.nodeId == 3){
					$scope.processState = 3;
				}else if ($scope.orderInfo.nodeId == 4){
					$scope.processState = 4;
				}else if ($scope.orderInfo.nodeId == 5) {
					$scope.processState = 5;
				}
                $scope.judgeState($scope.processState);
            } else {
                Utils.setTipBox(result.data.message);
            }
        }, function (error) {
            Utils.setTipBox("链接服务器失败！");
        });
    };
	
	$scope.checkUserPrivs = function(callback){
    	var sendData = {};
        Utils.ajaxLoadData("get", Utils.baseUrl + '/baseinfo/userinfo/privs', sendData, function (resp) {
	        $localStorage.currPrivs = resp.privs;
	        callback();
		});
      }
	
    //判断状态
	$scope.judgeState = function (processState) {
		//1: 已提交  2：科室负责人审核  3：分管领导审核  4：事务局审核  5: 已完成  
		if(processState == 1) {
			$(".orderStateBox ul li:first-child").addClass("select").addClass("current");
		}else if (processState <= 5) {			
			//三层审核一直都是通过
			if($scope.curOperationType == 3 || $scope.curOperationType == 1 || $scope.curOperationType == 4){		
				for (var i = 0; i < (Number(processState)); i++) {
					$(".orderStateBox ul li").eq(i).addClass("select");
					$(".orderStateBox ul li").eq(i).removeClass("course");
				}
				$(".orderStateBox ul li").removeClass("current");
				$(".orderStateBox ul li").eq(Number(processState)-1).addClass("current");
				$(".orderStateBox > div em").css("width", (Number(processState)-1) * 25 + '%');
			}
			//审核驳回的三种情况
			else if($scope.curOperationType == 5){
				if(processState == 1){
					$(".orderStateBox ul li").addClass("check1");
					$(".orderStateBox > div em").css("width", (Number(processState)) * 100 + '%');
				}else if(processState == 2){
					$(".orderStateBox ul li").eq(1).removeClass("course");
					$(".orderStateBox ul li").addClass("check2");
					$(".orderStateBox > div em").css("width", (Number(processState)) * 50 + '%');
				}else if(processState == 3){
					$(".orderStateBox ul li").addClass("check3");
					$(".orderStateBox ul li").eq(1).removeClass("course");
					$(".orderStateBox ul li").eq(2).removeClass("course");
					$(".orderStateBox > div em").css("width", (Number(processState)) * 33 + '%');
				}
				$(".orderStateBox ul li:first-child").removeClass("check1 check2 check3");
			}		
		}
		if ($scope.curOperationType == 5 || $scope.curOperationType == 2) {
			$(".orderStateBox").addClass("rejectOrder");
			if(processState == 1){
				$(".orderStateBox.rejectOrder li:last-child").css("margin-left","72%");
			}
		}
    };

    // 文件上传
    $('.main').delegate(':file','change',function(){
		Utils.uploadFilePreviewForm(this, "registration");
	});
	
    //操作状态
    $scope.getOprateState = function (type) {
    	var data = {
            id: $scope.orderId,
            type: type,
            remark: $scope.rejectResaon
        };
        console.log($scope.rejectResaon);
        if(data.type==1){
        	data.node=$scope.processState+1;
        }
        if(data.type==2){
        	data.node=$scope.processState;
        }
        // 为空判断处理
		if(data.type == 2 && !data.remark) {
			Utils.setTipBox("请输入驳回原因!");
			return;			
		}else{
			Utils.ajaxLoadData("post", Utils.baseUrl + 'onecard/wordcardOrder/check', data, function (data) {
	            //$scope.getOrderInfo();
	            setTimeout(function(){
					window.location.href="orderDetail.html?orderId="+$scope.orderId + '&access_token=' + $scope.token;
				},1000);
			});
		}
        
    }
    $scope.checkUserPrivs($scope.getOrderInfo);		
}]);