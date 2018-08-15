var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	
	$scope.orderId = Utils.getValueInPathByName("orderId");
	// 获取订单信息
	$scope.getOrderInfo = function () {
        var data = {
            orderId: $scope.orderId
        };
		Utils.ajaxLoadData("get", Utils.baseUrl + 'food/foodorder/orderInfo', data, function (data) {
            $scope.orderInfo = data;
			$scope.$apply();
		});
    };

    $scope.share = function (type) {
        if (type == 'qq'){
            Utils.setTipBox('暂不支持qq分享');
            return;
        }
        window.ccapi.shareTo({
            title: "外卖预订", // 分享标题
            desc: "外卖预订取餐二维码", //分享描述
            link: 'http://qr.topscan.com/api.php?text='+$scope.orderInfo.qrUrl, // 分享链接
            imgUrl: 'http://qr.topscan.com/api.php?text='+$scope.orderInfo.qrUrl, // 分享图标完整url
            type: type =='weixin'? 'weixin' : 'qq', // 分享类型: weixin，qq，sms，email    
            
            success: function(res) {
            },
            fail: function(res) {
                Utils.setTipBox(res);
            }
        }); 
    };

    $scope.getOrderInfo();

	

}]);