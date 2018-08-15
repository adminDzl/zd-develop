var app =  
angular.module('app');

app.controller('listSMSPushController',  function ($scope, listSMSPushService,$translate,ModalCtrl,modalCode) {
	$scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: pageconfig.pageSize
    };
	
	$scope.search = function (){
	    var postData = {
	    	 page: $scope.paginationConf.currentPage,
             rows: $scope.paginationConf.itemsPerPage,
             searchStr : $scope.searchStr,
             pushStatus : $scope.pushStatus,
             status : $scope.status,
             sendType : $scope.sendType,
             taskType : 2 //短信推送
        };
   
	    listSMSPushService.list(postData, function(data){
	         $scope.datas = data;
	         $scope.totalItems = $scope.datas.total;
	         
	         Utils.colResizable(angular,".orderSueTable");
	    });
	};
	  
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search);
	
	//查询
    $scope.query = function (){
		$scope.search();
	};
	 //是否发布
    $scope.statuss = [
                       {value: '', text: '全部'},
                       {value: -1, text: '冻结'},
                       {value: 1,  text: '开放'}
                  ];
    $scope.status='';
    
    //推送状态
    $scope.pushStatuss = [
                       {value: '', text: '全部'},
                       {value: 0, text: '待推送'},
                       {value: 1, text: '推送中'},
                       {value: 2, text: '已完成'}
                  ];
    $scope.pushStatus='';
    
  //推送类型
    $scope.sendTypes = [
                          {value: '', text: '全部'},
                          {value: 0, text: '立即推送'},
                          {value: 1, text: '定时推送'}
                          ];
    $scope.sendType='';
    
    $scope.selectGroup = function(){
    	$scope.pushGroups={};
    	var postData = {
	    		status : 1
	    };
    	listSMSPushService.groupTreeListEx(postData,function(data){
    		$scope.pushGroups = data.groupTree;
        });
    };
    
    $scope.selectGroup();
    
    
    //选择要加入的群组
    $scope.chkGroup= function (id,name,check) {
	        if (check == true) {
	        	$scope.groupIdStr = $scope.groupIdStr + id + ',';
	        	$scope.groupNameStr = $scope.groupNameStr + name + ',';
	        } else {
	        	if($scope.groupIdStr){
	        		$scope.groupIdStr = $scope.groupIdStr.replace(id + ',', '');
	        		$scope.groupNameStr = $scope.groupNameStr.replace(name + ',', '');
	        	}
	        }
	    };
	    
	 //获取日发送量上限和已使用量
     $scope.getSMSPushCount = function (){
	   
	   listSMSPushService.getSMSPushCount({}, function(data){
	    	$scope.allWaitSMSCount=data.allWaitSMSCount;
	    	$scope.allSendedSMSCount=data.allSendedSMSCount;
	    	$scope.smsDayAvailableCount=data.smsDayCount-data.allWaitSMSCount-data.allSendedSMSCount;
		   });
		};
	    
		
    //编辑
    $scope.toeditSMSPush = function(obj){
    	$scope.getSMSPushCount();
    	$scope.groupIdStr="";
    	$scope.groupNameStr="";
    	$scope.SMSPushDatas={};
    	listSMSPushService.getPushTaskDetail(obj,function(data){
        	$scope.SMSPushDatas = data.mpPushTask;
        	if(data.mpPushTask.pushTargetId&&data.mpPushTask.pushTargetId!=null&&data.mpPushTask.pushTargetId!="null"){
        		$scope.groupIdStr=data.mpPushTask.pushTargetId+",";
        		$scope.groupNameStr=data.mpPushTask.pushTargetName+",";
        	}
        	$scope.viewContent = '【XXX园区】'+$scope.SMSPushDatas.content;
        	if($scope.SMSPushDatas.contentType == 0){
    	    	$("#contentDetail").show();
    	    	$("#contentUrl").hide();
        	}else{
    	    	$("#contentDetail").hide();
    	    	$("#contentUrl").show();
        	}
        	
        	if(data.mpPushTask.pushStatus==0){
        		$('#editSMSPush').modal(); 
        		Utils.showTip();
        	}else if(data.mpPushTask.pushStatus==1){
        		Utils.showTip();
        		$scope.tipMessage="任务正在推送中";
    			$('#editTip').modal(); 
    			setTimeout(function(){$('#editTip').modal(("hide"));}, 1000);
        		$scope.search();
        	}else if(data.mpPushTask.pushStatus==2){
        		Utils.showTip();
        		$scope.tipMessage="任务已推送完成";
    			$('#editTip').modal(); 
    			setTimeout(function(){$('#editTip').modal(("hide"));}, 1000);
        		$scope.search();
        	}
        });
    };

    //增加
    $scope.addSMSPush = function(){
    	$scope.getSMSPushCount();
    	$scope.SMSPushDatas = {};
    	$scope.viewContent = '【XXX园区】';
    	$scope.groupIdStr="";
    	$scope.groupNameStr="";
    	$scope.SMSPushDatas.taskType ="2";//短信推送
    	$scope.SMSPushDatas.status ="1";
    	$scope.SMSPushDatas.sendType =0;
    	$scope.SMSPushDatas.targetType =1;
    	$('#editSMSPush').modal(); 
    	Utils.showTip();
    };
    //内容预览
    $scope.viewSMS = function(content){
    	$scope.viewContent = '【XXX园区】'+content;
    };
    
    //radio 内容类型 change事件
    $("input[name='targetType']").change(function() {
    	var selectedValue = $("input[name='targetType']:checked").val();
    	if (selectedValue == 1) {
    		$scope.selectGroup();
    	}
    });
    //详情查看
    $scope.viewSMSPushDetail = function(obj){

    	$scope.groupIdStr="";
    	$scope.groupNameStr="";
    	$scope.SMSPushDatas={};
    	listSMSPushService.getPushTaskDetail(obj,function(data){
        	$scope.SMSPushDatas = data.mpPushTask;
        	if(data.mpPushTask.pushTargetId&&data.mpPushTask.pushTargetId!=null&&data.mpPushTask.pushTargetId!="null"){
        		$scope.groupIdStr=data.mpPushTask.pushTargetId+",";
        		$scope.groupNameStr=data.mpPushTask.pushTargetName+",";
        	}
        });
    	$('#detailSMSPush').modal(); 
    	Utils.showTip();
    
    };
    //保存预览
    $scope.viewSMSPush = function(obj){
    	obj.sendTime=$("input[name='sendTime']").val();
    	if(obj.targetType==0){
    		$scope.groupIdStr="";
    	}
    	obj.pushTargetId=$scope.groupIdStr;
    	if(!obj.content){
    			Utils.showTip(false,"内容不能为空！");
    			return;
    	}
    	if(obj.targetType==1&&!obj.pushTargetId){//指定群组
    		Utils.showTip(false,"请选择要指定的群组！");
			return;
    	}
		var promise = listSMSPushService.getTargetCount(obj); //获得承诺接口  
	    promise.then(function(data) {  // 成功回调
	    	if(data.result==true){ 
	    		if(data.totalUser<=$scope.smsDayAvailableCount){
					$scope.flag=true;
				}else{
					$scope.flag=false;
				}
    		}
	    }, function(data) {  // 错误回调
	    	Utils.showTip(false,"请求接口调用失败！");
    		return;
	    }).then(function() {
	    	if(!$scope.flag){
        		Utils.showTip(false,"发送对象超过今日可用余量！");
        		return;
        	}
	    	if(obj.sendType==1&&!obj.sendTime){//定时推送
	    		Utils.showTip(false,"请指定推送时间！");
	    		return;
	    	}
	    	$scope.SMSPushDatas=angular.copy(obj);
	    	
	    	$('#viewSMSPush').modal(); 
	    	Utils.showTip();
	    });
    };
    
    //保存
    $scope.saveSMSPush = function(obj){
    		
    	obj.pushTargetId=$scope.groupIdStr;
    	obj.sendTime=$("input[name='sendTime']").val();
    	if(obj.targetType==0){
    		$scope.groupIdStr="";
    	}
    	if(!obj.content){
    			Utils.showTip(false,"内容不能为空！");
    			return;
    	}
    	if(obj.targetType==1&&!obj.pushTargetId){//指定群组
    		Utils.showTip(false,"请选择要指定的群组！");
			return;
    	}
    	
    	if(obj.sendType==1&&!obj.sendTime){//定时推送
    		Utils.showTip(false,"请指定推送时间！");
    		return;
    	}
    	
    	
    	listSMSPushService.saveSMSPush(obj, function(){
    		$scope.tipMessage="操作成功！";
			$('#editTip').modal(); 
			setTimeout(function(){$('#editTip').modal(("hide"));}, 1000);
           $('#viewSMSPush').modal("hide"); 
           $('#editSMSPush').modal("hide"); 
           Utils.showTip();
           $scope.search();
        });
       
    };
    //删除
    $scope.delSMSPush = function(obj){
    	if(obj.pushStatus==0){
            ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
                listSMSPushService.delSMSPush({"id":obj.id},function(data){
                    if(data.result==true){
                        ModalCtrl.show('提示','删除成功！',modalCode.success);
                        $scope.search();
                    }
                });
            });
    	}else if(obj.pushStatus==1){
    		Utils.showTip();
    		$scope.tipMessage="任务正在推送中";
			$('#editTip').modal(); 
			setTimeout(function(){$('#editTip').modal(("hide"));}, 1000);
    		$scope.search();
    	}else if(obj.pushStatus==2){
    		Utils.showTip();
    		$scope.tipMessage="任务已推送完成";
			$('#editTip').modal(); 
			setTimeout(function(){$('#editTip').modal(("hide"));}, 1000);
    		$scope.search();
    	}
    }; 
});

//业务类
app.factory('listSMSPushService', ['$http','$q','$translate', function ($http,$q,$translate) {
    var list = function (postData,successCallback) {
    	
    	$http({
			method: 'POST',
			url: path + "/mp/getPushTaskList.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
			data:$.param(postData),
			async: false
		}).success(function(data) {
			 successCallback(data);
		});
    };
    
    
    
    var groupTreeListEx = function (postData,successCallback) {
    	$http({
    		method: 'POST',
    		url: path + "/mp/getPushGroupTreeEx.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
    		data:$.param(postData),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    
var saveSMSPush = function (postData,successCallback) {
    	$http({
    		method: 'POST',
    		url: path + "/mp/savePushTask.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
    		data:$.param(postData),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    var delSMSPush = function (postData,successCallback) {
    	
    	$http({
    		method: 'POST',
    		url: path + "/mp/deletePushTask.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
    		data:$.param(postData),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    
    var getPushTaskDetail = function(postData,successCallback){
    	
    	$http({
    		method: 'POST',
    		url: path + "/mp/getPushTaskDetail.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
    		data:$.param({"id":postData.id}),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    
    var getSMSPushCount = function(postData,successCallback){
    	
    	$http({
    		method: 'POST',
    		url: path + "/mp/getSMSPushCount.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    
    return {
        list: function (postData,successCallback) {
            return list(postData,successCallback);
        },
        groupTreeListEx: function (postData,successCallback) {
        	return groupTreeListEx(postData,successCallback);
        },
        saveSMSPush: function (postData,successCallback) {
        	return saveSMSPush(postData,successCallback);
        },
        getPushTaskDetail: function (postData,successCallback) {
        	return getPushTaskDetail(postData,successCallback);
        },
        getSMSPushCount: function (postData,successCallback) {
        	return getSMSPushCount(postData,successCallback);
        },
        delSMSPush: function (postData,successCallback) {
        	return delSMSPush(postData,successCallback);
        },
        getTargetCount : function(postData) {  
            var deferred = $q.defer();//声明承诺
            $http({method: 'POST',
                headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
                url: path + '/mp/getTargetCount.json?targetType='+postData.targetType+'&groupIds='+postData.pushTargetId}).
            success(function(data) {  
              deferred.resolve(data);//请求成功
            }).  
            error(function(data) {  
              deferred.reject(data); //请求失败
            });  
            return deferred.promise;   // 返回承诺，这里返回的<strong><span style="color: #ff0000;">不是数据</span></strong>，而是API
          }
    };
}]);


app.filter("pushStatusStr",function(){
	return function(pushStatus){
		if(pushStatus==0){
			return "待推送";
		}else if(pushStatus==1){
			return "推送中";
		}else if(pushStatus==2){
			return "已完成";
		}
	}
})




