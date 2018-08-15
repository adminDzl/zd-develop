//获取url传递过来的参数
var loc = location.href;
//var message = loc.split("&");
var app = angular.module('myApp', []);

app.controller('AppCtrl', ['$scope', '$http','$interval', function ($scope, $http, $interval) {
	
	$scope.meetingRoomId = Utils.getValueInPathByName("id");
	$scope.meeting_day = "";
	$scope.meeting_time = "";
	$scope.theme = "";
	$scope.person = "";
	$scope.level = "";
	$scope.content = "";
	$scope.message = "";
	$scope.deviceIds="";
	var countDownFn;
	$scope.countDown = 3;
	$scope.token = Utils.getValueInPathByName("access_token");
	$scope.dataTime = "";
	$scope.meetingTime1 = [];
	$scope.selectTime1=[];
	$scope.selectTime=[];
	$scope.selectTime2=[];
	
	// 获取会议室详情
	$scope.meetingRoomDetail = function (id,callback) {	
		var data = {
			meetingId: id
		};
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + 'meetingroom/api/meetingroom/queryMeetingRoomInfo.do',
			params: data
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				$scope.meetingRoomInfo = result.data.data;
			    $scope.meetingTime1 = [
			    	{ time: $scope.meetingRoomInfo.morning,type: 1,timeType: "morning"},
			    	{ time: $scope.meetingRoomInfo.afternoon,type: 1,timeType: "afternoon"}
			    ]
			    $scope.reservedTime = $scope.meetingRoomInfo.timeList;
				callback(0);
			} else {
				Utils.setTipBox(result.data.message);
			}
		}, function (error) {
			Utils.setTipBox("链接服务器失败！");
		});
	};
	
	// 查询会议室的设备
	$scope.meetingRoomDevice = function (id) {	
		var data = {
			meetingId: id,
			freeType:1
		};
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + 'meetingroom/api/meetingroom/queryThingByMeeting.do',
			params: data
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				$scope.devices = result.data.data;
			} else {
				Utils.setTipBox(result.data.message);
			}
		}, function (error) {
			Utils.setTipBox("链接服务器失败！");
		});
	};
	
	$scope.reserveType1=function($event){
		if($($event.currentTarget).hasClass("select")){
			$($event.currentTarget).removeClass("select");
			if($(".yuyue-btn.yuyue.select").length>1){
				var firstIndex=$(".yuyue-btn.yuyue.select").eq(0).attr("data-index");
				for(var i= index;i<10;i++){
					$(".yuyue-btn").eq(i).removeClass("select");
				}
			}
		}else{
			$($event.currentTarget).addClass("select");
			if($(".yuyue-btn.yuyue.select").length>1){
				var firstIndex=$(".yuyue-btn.yuyue.select").eq(0).attr("data-index");
				for(var i= Number(firstIndex);i<index;i++){
					$(".yuyue-btn").eq(i).addClass("select");
				}
			}
		}
	}
	
	//点击选择时间框
	$scope.selectMeetingTime=function(){				
		$(".masking").fadeIn();
		$(".selectLeaderBox").addClass("show");
		if($(".selectLeaderBox").hasClass("show")){
			//type=1
			for(var i=0;i<$(".timeBox1").length;i++){
				var date=new Date;
				var time = $(".time-choose-table > table td.current").attr("data-day");
				$(".timeBox1").eq(i).attr("data-time",time + " " + $(".timeBox1").eq(i).find(".bookTime2").find($("p:first-child")).text());
				if($scope.reservedTime.length>0){
					for(var j=0;j<$scope.reservedTime.length;j++){
						if($(".timeBox1").eq(i).attr("data-time") == $scope.reservedTime[j]){
							$(".timeBox1").eq(i).addClass("hasReserved1");
						}
					}
				}
			}
			for(var i=0;i<$(".timeBox1").length;i++){
				if($(".timeBox1").eq(i).hasClass("hasReserved1")){
					$scope.meetingTime1[i].hasReserved1 = true;
				}else{
					$scope.meetingTime1[i].hasReserved1 = false;
				}
			}
			//type=2
			for(var i=0;i<$(".timeBox").length;i++){
				var date=new Date;
				var year=date.getFullYear(); 
				var time = $(".time-choose-table > table td.current").attr("data-day");
				$(".timeBox").eq(i).attr("data-time",time + " " + $(".timeBox").eq(i).find($("p:first-child")).text());
				if($scope.reservedTime.length>0){
					for(var j=0;j<$scope.reservedTime.length;j++){
						if($(".timeBox").eq(i).attr("data-time")===$scope.reservedTime[j]){
							$(".timeBox").eq(i).addClass("hasReserved");
						}
					}
				}
			}
			for(var i=0;i<$(".timeBox").length;i++){
				if($(".timeBox").eq(i).hasClass("hasReserved")){
					$scope.meetingTime[i].hasReserved = true;
				}else{
					$scope.meetingTime[i].hasReserved = false;
				}
			}	
		}			
	}
	
	//选择会议时间
	$scope.selectLeader=function($event){
		var _this=$($event.currentTarget);
		if(_this.hasClass("select")){
			_this.removeClass("select");
			
		}else{
			_this.addClass("select");
		}
	}
	
	//弹出框操作
	$scope.operationFn=function(type){
		$(".addOtherLeaderBox").hide();
		$(".selectLeaderBox").removeClass("show");
		$(".masking").fadeOut();
		$("html,body").animate({ scrollTop: 0 }, 300);		
	}
	
	//allstr:原始字符串，start,开始位置,end：结束位  置,str：要改变的字，changeStr:改变后的字
	$scope.changeStr=function(allstr,start,end,str,changeStr){ 
	 	if(allstr.substring(start-1,end-1) == str){
	      	return allstr.substring(0,start-1)+changeStr+allstr.substring(end,allstr.length); 
	 	}else{
	      	allstr; 
	  	}
	}
	
	//选择会议时间
	$scope.bookMeetingRoom=function(type){
		$(".selectLeaderBox").removeClass("show");
		$(".masking").fadeOut();
		$("html,body").animate({ scrollTop: 0 }, 300);
	}
	
	$scope.dayList=[];
	$scope.meetingTime=[
		{ time:"08:00-09:00",type:1 },
		{ time:"09:00-10:00",type:1 },
		{ time:"10:00-11:00",type:1 },
		{ time:"11:00-12:00",type:1 },
		{ time:"12:00-13:00",type:1 },
		{ time:"13:00-14:00",type:1 },
		{ time:"14:00-15:00",type:1 },
		{ time:"15:00-16:00",type:1 },
		{ time:"16:00-17:00",type:1 },
		{ time:"17:00-18:00",type:1 },
	]
	
	var currentTime;
	$scope.get7Day=function(){		
		var dayList=[];
		var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		var myDate = new Date();
		//获取当前月
		var yearStr=myDate.getFullYear();
		var monthStr=(myDate.getMonth()+1)>=10 ? (myDate.getMonth()+1) : "0"+(myDate.getMonth()+1);
		var dayStr=myDate.getDate()>=10 ? myDate.getDate() : "0"+myDate.getDate(); 
		var dateStr=yearStr + "-" + monthStr + "-" + dayStr;
		var weekStr=week[myDate.getDay()];
		var hour=myDate.getHours()>=10 ? myDate.getHours() : "0"+myDate.getHours();
		var minutes=myDate.getMinutes()>=10 ? myDate.getMinutes() : "0"+myDate.getMinutes();
		var seconds=myDate.getSeconds()>=10 ? myDate.getSeconds() : "0"+myDate.getSeconds();
		currentTime= hour+":"+minutes+":"+seconds;
		dayList.push({ day:dateStr,week:weekStr,type:0 });
		
		for(var i=1;i<7;i++){
			var myDates = new Date();
			myDates.setDate(myDates.getDate()+i); 
			var years=myDates.getFullYear();
			var weeks=week[myDates.getDay()];
			var months=(myDates.getMonth()+1)>=10 ? (myDates.getMonth()+1) : "0"+(myDates.getMonth()+1);
			var days=myDates.getDate()>=10 ? myDates.getDate() : "0"+myDates.getDate(); 
			var dates=years + "-" + months + "-" + days;
			dayList.push({ day:dates,week:weeks,type:1 });
		}
		$scope.dayList=dayList;
		console.log($scope.dayList);
	}
	
	//获取预约时间列表
	$scope.getMeetingTime=function(type,$event){
		var pastDue=0;
		var pastDue1=0;
		if(type==0){
			if($scope.meetingRoomInfo.timeType==1){
				if(currentTime<=$scope.meetingRoomInfo.morning.split("-")[0]+":00"){
					pastDue1=0;
				}else if(currentTime<$scope.meetingRoomInfo.morning.split("-")[1]+":00" && currentTime>$scope.meetingRoomInfo.morning.split("-")[0]+":00"){
					pastDue1=1;
				}else if(currentTime<$scope.meetingRoomInfo.afternoon.split("-")[1]+":00" && currentTime>=$scope.meetingRoomInfo.afternoon.split("-")[0]+":00"){
					pastDue1=2;
				}else if(currentTime>$scope.meetingRoomInfo.afternoon.split("-")[1]+":00"){
					pastDue1=2;
				}else{
					pastDue1=2;
				}
				for(var i=0;i<pastDue1;i++){
					$scope.meetingTime1[i].type=0;
				}
			}else if($scope.meetingRoomInfo.timeType==2){
				if(currentTime<"09:00:00"){
					pastDue=1;
				}else if(currentTime<"10:00:00"){
					pastDue=2;
				}else if(currentTime<"11:00:00"){
					pastDue=3;
				}else if(currentTime<"12:00:00"){
					pastDue=4;
				}else if(currentTime<"13:00:00"){
					pastDue=5;
				}else if(currentTime<"14:00:00"){
					pastDue=6;
				}else if(currentTime<"15:00:00"){
					pastDue=7;
				}else if(currentTime<"16:00:00"){
					pastDue=8;
				}else if(currentTime<"17:00:00"){
					pastDue=9;
				}else if(currentTime<"18:00:00"){
					pastDue=10;
				}else{
					pastDue=10;
				}
				
				for(var i=0;i<pastDue;i++){
					$scope.meetingTime[i].type=0;
				}
			}
			$('.head-time-choose td').eq(0).addClass("current").siblings().removeClass('current');
		}else{
			$($event.currentTarget).addClass("current").siblings().removeClass('current');
			for(var i=0;i<10;i++){
				$scope.meetingTime[i].type=1;
			}
			for(var i=0;i<2;i++){
				$scope.meetingTime1[i].type=1;
			}
			$(".yuyue-btn").removeClass("select");
		}
		//type=1
		$(".timeBox1").removeClass("hasReserved1");
		for(var i=0;i<$(".timeBox1").length;i++){
			var date=new Date;
			var year=date.getFullYear(); 
			var time = $(".time-choose-table > table td.current").attr("data-day");
			$(".timeBox1").eq(i).attr("data-time",time + " " + $(".timeBox1").eq(i).find(".bookTime2").find($("p:first-child")).text());
			if($scope.reservedTime.length>0){
				for(var j=0;j<$scope.reservedTime.length;j++){
					if($(".timeBox1").eq(i).attr("data-time")===$scope.reservedTime[j]){
						$(".timeBox1").eq(i).addClass("hasReserved1");
					}
				}
			}
		}
		for(var i=0;i<$(".timeBox1").length;i++){
			if($(".timeBox1").eq(i).hasClass("hasReserved1")){
				$scope.meetingTime1[i].hasReserved1 = true;
			}else{
				$scope.meetingTime1[i].hasReserved1 = false;
			}
		}
		//type=2
		$(".timeBox").removeClass("hasReserved");
		for(var i=0;i<$(".timeBox").length;i++){
			var date=new Date;
			var time = $(".time-choose-table > table td.current").attr("data-day");
			$(".timeBox").eq(i).attr("data-time",time + " " + $(".timeBox").eq(i).find($("p:first-child")).text());
			if($scope.reservedTime.length>0){
				for(var j=0;j<$scope.reservedTime.length;j++){
					if($(".timeBox").eq(i).attr("data-time")===$scope.reservedTime[j]){
						$(".timeBox").eq(i).addClass("hasReserved");
					}
				}
			}
		}
		for(var i=0;i<$(".timeBox").length;i++){
			if($(".timeBox").eq(i).hasClass("hasReserved")){
				$scope.meetingTime[i].hasReserved = true;
			}else{
				$scope.meetingTime[i].hasReserved = false;
			}
		}
	}
	//预约
	$scope.changeMeetType=function($event,index){
		if($($event.currentTarget).hasClass("yuyue")){
			if($($event.currentTarget).hasClass("select")){
				$($event.currentTarget).removeClass("select");
				for(var i=0;i<$scope.selectTime1.length;i++){
					if($scope.meetingRoomInfo.timeType==1){
						if($($event.currentTarget).parents(".timeBox1").attr("data-time")==$scope.selectTime1[i].time1){
				　　　　　　     	$scope.selectTime1.splice(i,1);
							$scope.selectTime.splice(i,1);
							$scope.selectTime2.splice(i,1);
							console.log($scope.selectTime1);
				　　　　    	}
					}
					else if($scope.meetingRoomInfo.timeType==2){
						if($($event.currentTarget).parents(".timeBox").attr("data-time")==$scope.selectTime1[i].time1){
				　　　　　　     	$scope.selectTime1.splice(i,1);
							$scope.selectTime.splice(i,1);
							$scope.selectTime2.splice(i,1);
							console.log($scope.selectTime1);
				　　　　    	}
					}	
				}
//			}else{
				$($event.currentTarget).addClass("select");
				if($scope.meetingRoomInfo.timeType==1){
					$scope.selectTime1.push(
						{ 
							time1: $($event.currentTarget).parents(".timeBox1").attr("data-time"),
							time2: $(".time-choose-table > table td.current").find("span").text(),
							time3: $($event.currentTarget).parents(".timeBox1").find(".bookTime1").find("p").text()						
						}
					)
				}
				else if($scope.meetingRoomInfo.timeType==2){
					$scope.selectTime1.push(
						{ 
							time1: $($event.currentTarget).parents(".timeBox").attr("data-time"),
							time2: $(".time-choose-table > table td.current").find("span").text()
						}
					)
					console.log($scope.selectTime1);
				}
			}
			//对象数组去重
			for(var i=0;i<$scope.selectTime1.length;i++){
			　　   var flag = true;
			　　  for(var j=0;j<$scope.selectTime.length;j++){
			　　　　    	if($scope.selectTime1[i].time1==$scope.selectTime[j].time1&&$scope.selectTime1[i].time2==$scope.selectTime[j].time2&&$scope.selectTime1[i].time3==$scope.selectTime[j].time3){
			　　　　　　     	flag = false;
			　　　　    	};
			　　  }; 
			　　	if(flag){
					//获取页面上的时间数据
			　　　　	$scope.selectTime.push($scope.selectTime1[i]);
					//获取上传的时间数据
				 	$scope.selectTime2.push($scope.selectTime1[i].time1);
			　　}
			}
			for(var i=0;i<$scope.selectTime2.length;i++){
				$scope.selectTime2[i]=$scope.selectTime2[i].substring(0,16)+'_'+$scope.selectTime2[i].substring(17,$scope.selectTime2[i].length)
			}
			console.log($scope.selectTime2);
		}else{
			return;
		}
	}
	
	//活动时间切换选择
	var currentTabIndex=1;
	$scope.changeTimeTab=function(type){
		var tabWidth=$(".time-choose-table > table td").width();
		
		if(type=="next"){
			if(currentTabIndex==5){
				return;
			}else{
				$(".time-choose-table > table").animate({"marginLeft":(tabWidth*currentTabIndex*-1)},300);
				currentTabIndex++;
				$(".left-span").removeClass("un-left-span");
				if(currentTabIndex==5){
					$(".right-span").addClass("un-right-span");
				}
			}
		}else{
			if(currentTabIndex==1){
				return;
			}else{
				currentTabIndex--;
				$(".right-span").removeClass("un-right-span");
				$(".time-choose-table > table").animate({"marginLeft":(tabWidth*(currentTabIndex-1)*-1)},300);
				if(currentTabIndex==1){
					$(".left-span").addClass("un-left-span");
				}
			}
		}
	}
	
	// 上传附件
	$('.main').delegate(':file', 'change', function () {
		Utils.uploadFilePreviewForm(this, "registration");
		//Utils.uploadFileFn("registration",this);
	});
	
	$scope.chooseDevice = function($event){
		if($($event.currentTarget).hasClass("select")){
			$($event.currentTarget).removeClass("select");
		}else{
			$($event.currentTarget).addClass("select");
		}
		/*if($(".yuyue-btn.yuyue.select").length>0){
			$scope.meeting_day = $(".time-choose-table > table td.current").attr("data-day");
			$scope.meeting_time=$scope.meetingTime[$(".yuyue-btn.yuyue.select").eq(0).attr("data-index")].time;
			$(".addOtherLeaderBox").hide();
			$(".selectLeaderBox").removeClass("show");
			$(".masking").fadeOut();
			$("html,body").animate({ scrollTop: 0 }, 300);	
		}*/
		/*console.log($(".radioBox3 ul li.select"));
		//var deviceIds=[];
		for(var i=0;i<$(".radioBox3 ul li.select").length;i++ ){
			//$scope.deviceIds.push($(".radioBox3 ul li.select")[i].attr("data-type"));
			console.log($(".radioBox3 ul li.select")[i].attr("data-type"));
		}
		//console.log($scope.deviceIds);*/
		var	radioList = [],
		selectList = $(".radioBox3 ul li.select");
	    $.each(selectList, function (index, item) {
			radioList.push($(item).attr("data-type")+"_1");
	    });
	    $scope.deviceIds=radioList.join(",");
	    console.log($scope.deviceIds);
	}
	
	// 确定提交申请
	$scope.submitBtn = function () {
		// 检测必填项是否存在空值 		
		var	fileUrlList = [],
			fileUrl = '';
			list = $('#commentPicture').find(".item");
		    $.each(list, function (index, item) {
				fileUrlList.push($(item).attr("data-path"));
				fileUrl = fileUrlList.join(";");
		    });
			data = {
				meetingId: $scope.meetingRoomId,
				orderTime: $scope.selectTime2.join(";"),
				meetingTopic: $scope.theme,
				numbers: parseInt($scope.person),
				meetingLevel: $scope.level,
				thingIds: $scope.deviceIds,
				banner: $scope.content,
				fileUrl: fileUrl,
				remark: $scope.remark,
			};
		// 为空判断处理 
		if (!data.orderTime) {
			Utils.setTipBox("请选择会议时间");
			return;
		} else if (!data.meetingTopic) {
			Utils.setTipBox("请填写会议主题");
			return;
		}else if (data.numbers > $scope.meetingRoomInfo.layTypeNum) {
			Utils.setTipBox("与会人数大于会议室可容纳总人数");
			return;
		}
		Utils.ajaxLoadData("post", Utils.baseUrl + 'meetingroom/api/meetingroom/addMeetingRoomOrder.do', data, function (data) {
			$scope.orderId = data.orderId;
			// 跳转页面
			$scope.closeOrOpenTipBox('open');
		});
	};
	
	//关闭提示框
	$scope.closeOrOpenTipBox = function (type) {
		if (type == "open") {
			$(".successfulBox").eq(0).addClass("show");
			$(".masking").fadeIn();
			$scope.countDown = 3;
			countDownFn = $interval($scope.countDownFn, 1000);
			setTimeout(function () {
				window.location.href = "meetingRoomDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 4300);
		} else if (type == "close") {
			$interval.cancel(countDownFn);
			$(".successfulBox").eq(0).removeClass("show");
			$(".masking").fadeOut();
			setTimeout(function () {
				window.location.href = "meetingRoomDetail.html?orderId=" + $scope.orderId + '&access_token=' + $scope.token;
			}, 1000);
		}
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
	
	$scope.meetingRoomDetail($scope.meetingRoomId,$scope.getMeetingTime);
	$scope.meetingRoomDevice($scope.meetingRoomId); 
	$scope.get7Day();
	//$scope.getMeetingTime(0);
	
}]);