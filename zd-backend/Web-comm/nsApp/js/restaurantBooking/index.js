var app = angular.module('myApp', []);


app.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {


	$scope.token = Utils.getValueInPathByName("access_token");

	$scope.url = "../../img/back/restaurant.png";
	$scope.tipOne = "100G的参考分量";
	$scope.tipTwo = "每百克卡路里含量80cal";

	$scope.menuData = [];
	var counter = 1;

	// 获取菜单信息
	//$scope.getMenuInfo = function () {
	var dropload = $('.content').dropload({
		scrollArea: window,
		loadDownFn: function (me) {
			var data = {
				pageNo: counter,
				pageSize: 10
			};
			$.ajax({
				url: Utils.baseUrl + 'food/foodinfo/list',
				data: data,
				dataType: "json",
				type: 'get',
				beforeSend: function (request) {
					request.setRequestHeader("Authorization", $scope.token);
				},
				success: function (data) {
					if (data.result == true) {
						counter++;
						for (var i = 0; i < data.data.page.rows.length; i++) {
							$scope.menuData.push(data.data.page.rows[i]);
						}
						$scope.$apply();
						if (10 > data.data.page.rows.length) {
							// 锁定
							me.lock();
							// 无数据
							me.noData();
						}
						// 每次数据加载完，必须重置
						me.resetload();
					} else {
						// 即使加载出错，也得重置
						//me.resetload();
						Utils.setTipBox(data.message);
					}
				},
				async: true,
				error: function (errorMsg) {
					var msg = "链接服务器失败";
					Utils.setTipBox(msg);
					// 即使加载出错，也得重置
					me.resetload();
				}
			});
		}
	});

	//关闭查看卡路里图框
	$scope.closeOrOpenFoodBox = function (type) {
		if (type == "open") {
			$(".detailFoodBox").eq(0).addClass("show");
			$(".masking").fadeIn();
		} else if (type == "close") {
			$(".detailFoodBox").eq(0).removeClass("show");
			$(".masking").fadeOut();
		}
	};

	// 点击查看卡路里图
	$scope.selectFood = function ($event) {
		var _this = $($event.currentTarget);
		if (_this.attr("data-url")) {
			$scope.url = _this.attr("data-url");
			$scope.tipOne = "100G的参考分量";
			$scope.tipTwo = "每百克卡路里含量" + _this.attr("data-cal") + "cal";
			var src = $scope.url;
			var img = new Image();
			img.src = src;
			img.onerror = function () {
				$scope.url = '../../img/back/restaurant.png';
				$scope.tipOne = "图片加载失败";
				$scope.tipTwo = "请检查您的网络是否连接";
				$scope.$apply();
			};
			$scope.closeOrOpenFoodBox('open');
		}else {
			Utils.setTipBox("暂无参考...");
		}
		
	};

	// 点赞操作
	$scope.setFoodLike = function ($event) {
		var _this = $($event.currentTarget);
		$scope.laud(_this);
	};

	// 点赞发送请求
	$scope.laud = function (_this) {
		var data = {
			id: _this.attr('data-id')
		};
		Utils.ajaxLoadData("post", Utils.baseUrl + 'food/foodinfo/updateStarCount', data, function (data) {
			// 成功
			//Utils.setTipBox("点赞成功");
			var starCount =  data.starCount;
			if(starCount > 0){
				_this.attr("class", "f-r foodLike select");
				Utils.setTipBox("点赞成功");
			}else{
				_this.attr("class", "f-r foodLike");
				Utils.setTipBox("取消点赞");
			}
			
			var num = Number(_this.find("span").text()) + starCount;
			_this.find("span").text(num);
		});
	};

	//导航操作
	$scope.navOperate = function (type) {
		if (type == "lunch") {
			setTimeout(function () {
				window.location.href = "index.html?access_token=" + $scope.token;
			}, 300);
		} else if (type == "dinner") {
			//Utils.setTipBox("程序员正在紧急开发中...");
			setTimeout(function () {
				window.location.href = "dinnerBooking.html?access_token=" + $scope.token;
			}, 300);
		} else if (type == "takeOut") {
			//Utils.setTipBox("程序员正在紧急开发中...");
			setTimeout(function () {
				window.location.href = "takeOut.html?access_token=" + $scope.token;
			}, 300);
		}

	};

	// 初始化加载数据
	//$scope.getMenuInfo();

}]);