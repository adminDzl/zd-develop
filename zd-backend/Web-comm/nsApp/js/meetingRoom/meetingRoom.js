var app = angular.module('myApp', []);

app.controller('meetingRoomCtrl', ['$scope', '$http', function ($scope, $http) {
	
	//会议室列表
	$scope.allMeetingRoom={};
	$scope.meetingRoomType=["全部","50人以下","51-100人","101-150人","151-300人","300人以上"];
	$scope.showMeetPerson=1;
	//$scope.token=getParam("access_token");
	$scope.token = Utils.getValueInPathByName("access_token");
	
	//切换参会人数
	/*$scope.changeMeetingPerson=function($event,id){
		$($event.currentTarget).addClass("select").siblings().removeClass('select');
		$scope.selectTypeList=$scope.allMeetingRoom.data[id].list;
		$scope.selectPerson=$scope.meetingRoomType[id];
	}*/
	//打开收起参会人数
	$scope.showAttendList=function(){
		if($scope.showMeetPerson){
			$scope.showMeetPerson=0;
			$(".attendance-select i").addClass("hide");
		}else{
			$scope.showMeetPerson=1;
			$(".attendance-select i").removeClass("hide");
		}
		$(".attendance-list").slideToggle();
	}
	//打开预订页面
	$scope.openReserve=function(id){
		console.log(id);
		window.location.href="meetingRoomReserve.html?&id=" + id + '&access_token=' + $scope.token;
	}
	
	// 获取会议室列表
	$scope.getMeetingRoom = function ($event,minPersonNum,maxPersonNum) {
		if($event){
			$($event.currentTarget).addClass("select").siblings().removeClass('select');
		}		
		var data = {
			minPersonNum: minPersonNum,
			maxPersonNum: maxPersonNum
		};
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + 'meetingroom/api/meetingroom/queryMeetingRoomList.do',
			params: data
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				console.log(result.data);
				$scope.meetingInfo = result.data.data;
				$scope.meetingList = $scope.meetingInfo.data;
				console.log($scope.meetingList);
			} else {
				Utils.setTipBox(result.data.message);
			}
		}, function (error) {
			Utils.setTipBox("链接服务器失败！");
		});
	};
	
	//获取会议室负责人电话
	$scope.getMeetingMobile = function () {
		$http({
			method: "get",
			headers: { 'Authorization': $scope.token },
			url: Utils.baseUrl + 'meetingroom/api/meetingroom/getMeetingDutyMobie.do',
			data: {}
		}).then(function (result) {
			if (result.data.result == true) {
				// 成功
				$scope.meetingMobile = result.data.data;
			} else {
				Utils.setTipBox(result.data.message);
			}
		}, function (error) {
			Utils.setTipBox("链接服务器失败！");
		});
	};
	
	$(function(){
		$scope.getMeetingRoom();
		$scope.getMeetingMobile();
		$scope.selectPerson=$scope.meetingRoomType[0];
	})
	
    
}]);
