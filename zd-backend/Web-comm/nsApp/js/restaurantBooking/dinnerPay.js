var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', '$interval', '$timeout', function ($scope, $http, $interval, $timeout) {

    $scope.token = Utils.getValueInPathByName("access_token");

    $scope.changeType = function () {
        var _thisType = $scope.bookingType;
        if (_thisType == "1") {
            $(".dinnerCount").attr("disabled", "disabled");
            // 个人预订
            var select = $(".dinnerMenuBox li.select"),
                price = select.attr("data-price");
            $scope.id = select.attr("data-id");
            $scope.number = 1;
            $scope.amount = "￥" + (($scope.number * price * 100) / 100).toFixed(2);
            $scope.amountAll = Math.floor($scope.number * price * 100);
        } else {
            $(".dinnerCount").removeAttr("disabled");
        }
    };




    //关闭提示框
    $scope.closeOrOpenTipBox = function (type) {
        if (type == "open") {
            $(".successfulBox").addClass("show");
            $(".masking").fadeIn();
            $scope.countDown = 3;
            countDownFn = $interval($scope.countDownFn, 1000);

            setTimeout(function () {
                window.location.href = "dinnerDetail.html";
            }, 4300);
        } else if (type == "close") {
            $interval.cancel(countDownFn);
            $(".successfulBox").removeClass("show");
            $(".masking").fadeOut();
            setTimeout(function () {
                $window.location.href = "dinnerDetail.html";
            }, 1000);
        }
    };

    //提交晚餐预订
    $scope.submit = function () {
        //Utils.setTipBox("程序员正在紧急开发中，敬请期待...");
        //$scope.closeOrOpenTipBox("open");
        //$scope.pay();
        $scope.createOrder();
    };

    function resetTime(time) {
        var timer = null;
        var t = time;
        var m = 0;
        var s = 0;
        m = Math.floor(t / 60 % 60);
        m < 10 && (m = '0' + m);
        s = Math.floor(t % 60);
        function countDown() {
            s--;
            s < 10 && (s = '0' + s);
            if (s.length >= 3) {
                s = 59;
                m = "0" + (Number(m) - 1);
            }
            if (m.length >= 3) {
                m = '00';
                s = '00';
                clearInterval(timer);
            }
            console.log(m + "分钟" + s + "秒");
        }
        timer = setInterval(countDown, 1000);
    }
    $scope.resetTime = function (time, str) {
        var timer = null;
        var t = time;
        var m = 0;
        var s = 0;
        m = Math.floor(t / 60 % 60);
        m < 10 && (m = '0' + m);
        s = Math.floor(t % 60);
        function countDown() {
            s--;
            s < 10 && (s = '0' + s);
            if (s.length >= 3) {
                s = 59;
                m = "0" + (Number(m) - 1);
            }
            if (m.length >= 3) {
                m = '00';
                s = '00';
                clearInterval(timer);
            }
            console.log(m + ":" + s);
        }
        timer = setInterval(countDown, 1000);
    };

    // 调取下单
    $scope.createOrder = function () {
        var data = {
            foodCategoryId: $scope.id,
            type: $scope.bookingType,
            orderTime: Utils.formDate(angular.copy($scope.time).toString()),
            boxCount: 1,
            priceAll: $scope.amountAll
        };
        if ($scope.bookingType == '2') {
            data.typeName = $scope.typeName;
        }
        if (!$scope.time) {
            Utils.setTipBox("请选择预订时间");
            return;
        }
        Utils.ajaxLoadData("post", Utils.baseUrl + 'food/foodorder/addOrder', data, function (data) {
            $scope.pay(data.prepay_id, data.nonce_str, data.timeStamp, data.sign);
        });
    };

    // 支付
    $scope.pay = function (prepayId, nonceStr, timeStamp, sign) {
        Utils.setTipBox(sign);
        window.ccapi.chooseWXPayV2({
            prepayId: prepayId,
            nonceStr: nonceStr,
            timeStamp: timeStamp,
            sign: sign,
            success: function (res) {
                // 支付成功后的回调函数
                var status = res.status; //true  or false
                if (status == true) {
                    Utils.setTipBox("成功");
                    // 成功之后的操作
                    //$window.location.href = "dinnerDetail.html";
                } else {
                    Utils.setTipBox("支付失败");
                }
            },
            fail: function (res) {
                Utils.setTipBox(res.errorMessage);
                // 如果用户取消支付，调到重新15分钟内重新支付页面

            }
        });
    };

    // 获取晚餐列表
    $scope.getMealList();


}]);