var app = angular.module("myApp", []);

app.controller("AppCtrl", ['$scope', '$http', function ($scope, $http) {

    // 获取基本参数
    $scope.token = Utils.getValueInPathByName("access_token");
    $scope.orderId = Utils.getValueInPathByName("orderId");
    $scope.orderNum = Utils.getValueInPathByName("orderNum");

    // 点击进入详情
    $scope.getDetail = function () {
        window.location.href = "orderDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
    };

    // 点击返回申请首页
    $scope.toHome = function () {
        window.location.href = "index.html?&access_token=" + $scope.token;
    };
}]);