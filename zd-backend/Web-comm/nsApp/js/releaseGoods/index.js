var app = angular.module('myApp', []);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
    });
}]);

app.controller('AppCtrl', ['$scope', '$http','$interval','$location', function ($scope, $http,$interval,$location) {
	
	$scope.orderData={};
	$scope.orderData.passType = 0;
	$scope.orderData.takeType=1;
	$scope.orderData.goodsType1=0;
	
	//物品类别
	// $scope.goodTypes=[
	// 	{name:"电脑类",id:0},
	// 	{name:"音响类",id:1},
	// 	{name:"家具类",id:2},
	// 	{name:"装饰材料类",id:3},
	// 	{name:"建筑材料类",id:4},
	// 	{name:"日用品类",id:5},
	// 	{name:"办公设备类",id:6},
	// 	{name:"机电设备类",id:7},
	// 	{name:"文档类",id:8},
	// 	{name:"其他类",id:9},
	// 	{name:"食物食材类",id:10},
	// 	{name:"危险物品类",id:11},
	// 	{name:"生活垃圾类",id:12},
	// 	{name:"报废资产类",id:13},
	// 	{name:"建筑垃圾类",id:14}
	// ];
	$scope.goodTypes = "";
	// 获取物品类别
	$scope.getGoodTypes = function (){
		$http.get(Utils.baseUrl+'pass/ordertype/getAll',{headers:{'Authorization':$location.search().access_token}}).success(function(response){  
		    if(response.result){
				console.log(response)
				$scope.goodTypes = response.data
			}else{
				setTimeout(function(){
					Utils.setTipBox(response.message);
				},200);
			}
		}).error(function (error) {
			var msg = "获取失败，请重试！";
			Utils.setTipBox(msg);
		}) 
	};
	$scope.getGoodTypes();
	
	//携物者类别
	$scope.takeType=[
		{name:"其他",id:1},
		{name:"本人",id:0}
	];
	
	//物品类别
	$scope.goodType1=[
		{name:"非工程类",id:0},
		{name:"工程类",id:1}
	];
	
	//导航分类选择
	$scope.changeType=function(type){
		if(type==0){
			$(".releaseGoodNav em").css("margin-left","7%");
			$scope.takeType=[
				{name:"其他",id:1},
				{name:"本人",id:0}
			];
		}else{
			$(".releaseGoodNav em").css("margin-left","86%");
			$scope.takeType=[
				{name:"其他",id:1},
				{name:"本人",id:0}
			];
		}
		$scope.orderData.passType=type;
	}
	
	//展开收起
	$scope.showMoreOrHideTypeList=function($event){
		var _this=$($event.currentTarget);
		if(_this.hasClass("showMore")){
			_this.parents(".moreTypeSelectBox > div").removeClass("showMore");
			_this.removeClass("showMore");
		}else{
			_this.addClass("showMore");
			_this.parents(".moreTypeSelectBox > div").addClass("showMore");
		}
	}
	
	//选择物品类别
	$scope.selectType=function($event){
		var _this=$($event.currentTarget);
		_this.addClass("select").siblings().removeClass("select");
	}
	
	//跳转至历史页面
	$scope.goHistory=function(){
		window.location.href="historySearch.html?access_token="+$location.search().access_token;
	}
	
	// 点击选择文件
	$('.main').delegate(':file','change',function(){
		Utils.uploadFilePreviewForm(this,"registration");
	});
	
	//提交订单
	$scope.submitReleaseGood=function(){
		
		if($(".fill-btn.confirm").text()=="提交中…"){
			return;
		}
		
		$scope.orderData.goodsType2=$(".moreTypeSelectBox > div ul li.select").attr("data-id");
		$scope.orderData.applyPassDate=$("[name='releaseTime']").val();
		$scope.orderData.applyPassStartTime=$("[name='releaseTime']").val() +" " + $("[name='releaseStartHour']").val();
		$scope.orderData.applyPassEndTime=$("[name='releaseTime']").val() +" " + $("[name='releaseEndHour']").val();
		
		$scope.orderData.file=[];
		
		if($("#commentPicture li.item").length>0){
			for(var i=0;i<$("#commentPicture li.item").length;i++){
				var thisLi=$("#commentPicture li.item").eq(i);
				var filePath=thisLi.attr("data-path");
				var shortpath=thisLi.attr("data-short");
				var imgWidth=thisLi.attr("data-width");
				var imgHeight=thisLi.attr("data-height");
				$scope.orderData.file.push({"orderType":5,"filePath":filePath,"shortpath":shortpath,"fileSize":imgWidth+","+imgHeight});
			}
		}
		
		if(!$scope.inputJudge($scope.orderData)){
			return;
		}
		
		$(".fill-btn.confirm").text("提交中…");
		
		$scope.closeOrOpenTipBox('loading');
		
		$http({
			method: 'POST',
			headers : { 'Authorization':$location.search().access_token, 'Content-Type': 'application/x-www-form-urlencoded' },
			url: Utils.baseUrl + 'pass/addSave',
			data: $.param({"entity":JSON.stringify($scope.orderData)})
		}).success(function(data) {
			if(data.result){
				setTimeout(function(){
					$scope.closeOrOpenTipBox('open',data.data.orderId);
				},2100);
			}else{
				$scope.closeOrOpenTipBox('close');
				setTimeout(function(){
					Utils.setTipBox(data.message);
				},200);
				$(".fill-btn.confirm").text("确定");
			}
		}).error(function (error) {
			$scope.closeOrOpenTipBox('close');
			var msg = "订单提交失败，请重试！";
			Utils.setTipBox(msg);
			$(".fill-btn.confirm").text("确定");
		});
	}
	
	//文本框校验
	$scope.inputJudge=function(data){
		if(data.passType==0 && data.takeType!=0){
			if(!data.needPassPersonnelName){
				Utils.setTipBox("请输入需放行人姓名！");
				return false;
			}else if(!data.needPassPersonnelMobile){
				Utils.setTipBox("请输入需放行人电话！");
				return false;
			}else if(data.needPassPersonnelMobile){
				var reg = /^1[0-9]{10}$/;
				var flag = reg.test(data.needPassPersonnelMobile); //true
				if(!flag){
					Utils.setTipBox("请输入正确电话号码！");
					return false;
				}
			}
			if(!data.needPassPersonnelDept){
				Utils.setTipBox("请输入需放行人单位！");
				return false;
			}
		}
		if(!data.goodsNumber){
			Utils.setTipBox("请输入物品名称及数量！");
			return false;
		}else if(!data.goodsType2){
			Utils.setTipBox("请选择物品类别！");
			return false;
		}else if($(".selectRepairsFile ul li.item em").length>0){
			Utils.setTipBox("图片尚未上传完成，请稍候！");
			return false;
		}else{
			return true;
		}
	}
	
	var countDownFn;
	
	//倒计时
	$scope.countDownFn=function(type){
		if($scope.countDown>0){
			$scope.countDown--;
		}else{
			if($scope.loadType=="load"){
				$interval.cancel(countDownFn);
				$scope.loadType="";
			}else{
				$interval.cancel(countDownFn);
				$(".successfulBox").removeClass("show");
				$(".masking").fadeOut();
			}
		}
	}
	
	//关闭提示框
	$scope.closeOrOpenTipBox=function(type,dataId){
		if(type=="open"){
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.orderState="提交成功";
			$scope.orderStateInfo="订单提交成功，等待审核…";
			$scope.countDown=3;
			countDownFn=$interval($scope.countDownFn,1000);  
			
			setTimeout(function(){
				window.location.href="orderDetail.html?id="+dataId+"&access_token="+$location.search().access_token;
			},3500);
		}else if(type=="close"){
			$interval.cancel(countDownFn);
			$(".successfulBox").removeClass("show");
			$(".masking").hide();
//			setTimeout(function(){
//				$window.location.href="orderDetail.html?type=0";
//			},1000);
		}else if(type=="loading"){
			$(".successfulBox").addClass("show");
			$(".masking").fadeIn();
			$scope.orderState="提交中…";
			$scope.orderStateInfo="订单提交中，请稍等…";
			$scope.countDown=2;
			$scope.loadType="load";
			countDownFn=$interval($scope.countDownFn,1000);  
		}
	}
	
	//获取订单详情
	$scope.getOrderDetail=function(id){
		$http.get(Utils.baseUrl+'pass/getById',{params: { 'id':id },headers:{'Authorization':$location.search().access_token}}).success(function(response){  
		    if(response.result){
		    	response.data.goodsType1=Number(response.data.goodsType1);
		    	
		    	if(response.data.passType=="0"){
		    		$(".orderNav.releaseGoodNav em").css("margin-left","7%");
		    	}else{
		    		$(".orderNav.releaseGoodNav em").css("margin-left","86%");
		    	}
		    	
		     	$scope.orderData=response.data;
		     	$(".moreTypeSelectBox > div ul li[data-id='"+ $scope.orderData.goodsType2 +"']").addClass("select");
			}else{
				setTimeout(function(){
					Utils.setTipBox(response.message);
				},200);
			}
		}).error(function (error) {
			var msg = "获取失败，请重试！";
			Utils.setTipBox(msg);
		}) 
	}

	
	$(function(){
		var time = new Date();
		var day =time.getDate();
		var month = time.getMonth()+1; 
		var hour = time.getHours();
		var minu = time.getMinutes();
		
		day=day<10? "0"+day : day;
		month=month<10 ? "0"+month : month;
		
		var datew = time.getFullYear()+"-"+month+"-"+day;
		var datew = datew.toString();
		
		$("[name=releaseTime]").val(datew);
		
		var endHour,endMinutes;
		if(minu>=30){
			hour=hour+1;
			hour=hour < 10 ? "0"+hour : hour; 
			minu="00";
			endHour=hour;
			endMinutes=30;
		}else{
			hour=hour < 10 ? "0"+hour : hour; 
			minu=30;
			endHour=hour+1;
			endMinutes="00";
		}
		var currentHour=hour + ":" + minu;
		var endHour=endHour + ":" + endMinutes;
		
		$("[name=releaseStartHour]").val(currentHour);
		$("[name=releaseEndHour]").val(endHour);
		
		$scope.renewId=$location.search().id;
		if($scope.renewId){
			$scope.getOrderDetail($scope.renewId);
		}
		
	})
	
}]);

app.filter("setNavClass",function($sce){
	return function(states){
		var className="";
		if(states==0){
			className="margin-left: 7%;";
		}else{
			className="margin-left: 86%;";
		}
		return className;
	}
});


app.directive('onFinishReleaseGoods', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
            	if(attr.ngRepeat=="item in goodTypes"){
            		$timeout(function() {
            			scope.$emit('ngReleaseGoodFinished');
	                });
            	}
            }
        }
    };
});