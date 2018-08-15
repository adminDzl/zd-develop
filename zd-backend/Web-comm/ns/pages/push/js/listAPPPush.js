var app =  
angular.module('app');



app.controller('listAPPPushController',  function ($scope,listAPPPushService,$translate,$sce,ModalCtrl,modalCode) {
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

             taskType : 0 //app推送
        };
   
	    listAPPPushService.list(postData, function(data){
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
    	listAPPPushService.groupTreeListEx(postData,function(data){
    		$scope.pushGroups = data.groupTree;
        });
    };
    
    $scope.selectGroup();
    
    //加载消息推送类型列表
    $scope.getTreeList = function(){
    	$scope.ClassifiedMessageList=[];
    	var postData = {
            
	    		type : 1//查询推送消息类型
	    };
    	listAPPPushService.getTreeList(postData,function(data){
    		$scope.classifiedMessageList = data.list;
        });
    };
    
    $scope.getTreeList();
    
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
    //编辑
    $scope.toeditAPPPush = function(obj){
    	$scope.groupIdStr="";
    	$scope.groupNameStr="";
    	$scope.aPPPushDatas={};
    	listAPPPushService.getPushTaskDetail(obj,function(data){
        	$scope.aPPPushDatas = data.mpPushTask;
        	if(data.mpPushTask.pushTargetId&&data.mpPushTask.pushTargetId!=null&&data.mpPushTask.pushTargetId!="null"){
        		$scope.groupIdStr=data.mpPushTask.pushTargetId+",";
        		$scope.groupNameStr=data.mpPushTask.pushTargetName+",";
        	}
        	if($scope.aPPPushDatas.contentType == 0){
    	    	$("#contentDetail").show();
    	    	$("#contentUrl").hide();
        	}else{
    	    	$("#contentDetail").hide();
    	    	$("#contentUrl").show();
        	}
        	
        	if(data.mpPushTask.pushStatus==0){
        		$('#editAPPPush').modal(); 
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
    $scope.addAPPPush = function(){
    	$scope.aPPPushDatas = {};
    	$scope.groupIdStr="";
    	$scope.groupNameStr="";
    	$scope.aPPPushDatas.taskType ="0";//APP推送
    	$scope.aPPPushDatas.status ="1";
    	$scope.aPPPushDatas.contentType =0;
    	$scope.aPPPushDatas.sendType =0;
    	$scope.aPPPushDatas.targetType =1;
    	//默认显示富文本，隐藏url
    	$("#contentDetail").show();
    	$("#contentUrl").hide();
    	$('#editAPPPush').modal(); 
    	Utils.showTip();
    };
    
    //radio 内容类型 change事件
    $("input[name='contentType']").change(function() {
		var selectedValue = $("input[name='contentType']:checked").val();
		if (selectedValue == 0) {
	    	$("#contentDetail").show();
	    	$("#contentUrl").hide();
    	}else{
	    	$("#contentDetail").hide();
	    	$("#contentUrl").show();
    	}
	});
    $("input[name='targetType']").change(function() {
    	var selectedValue = $("input[name='targetType']:checked").val();
    	if (selectedValue == 1) {
    		$scope.selectGroup();
    	}
    });
    
    //详情查看
    $scope.viewAPPPushDetail = function(obj){
    	$scope.groupIdStr="";
    	$scope.groupNameStr="";
    	$scope.aPPPushDatas={};
    	listAPPPushService.getPushTaskDetail(obj,function(data){
        	$scope.aPPPushDatas = data.mpPushTask;
        	if(data.mpPushTask.pushTargetId&&data.mpPushTask.pushTargetId!=null&&data.mpPushTask.pushTargetId!="null"){
        		$scope.groupIdStr=data.mpPushTask.pushTargetId+",";
        		$scope.groupNameStr=data.mpPushTask.pushTargetName+",";
        	}
        });
    	$('#detailAPPPush').modal(); 
    	Utils.showTip();
    };
    //保存预览
    $scope.viewAPPPush = function(obj){
    	obj.sendTime=$("input[name='sendTime']").val();
    	obj.urlPath=$("input[name='urlPath']").val();
    	obj.content = $("input[name='mpcontent']").val();
    	$scope.contentDetail = $sce.trustAsHtml(obj.content);
    	if(obj.targetType==0){
    		$scope.groupIdStr="";
    	}else if(obj.targetType==1){
        	obj.pushTargetId=$scope.groupIdStr;
    	}else if(obj.targetType==2){
    		var userEntity =  angular.fromJson(obj.searchUserEntity);
        	obj.pushTargetId=userEntity.userId;
        	obj.pushTargetName=userEntity.realname;
        	$scope.groupNameStr = obj.pushTargetName;
    	}
    	
    	
    	if(!obj.title){
    		Utils.showTip(false,"消息标题不能为空！");
			return;
    	}
    	if(!obj.simpleDesc){
    		Utils.showTip(false,"消息描述不能为空！");
    		return;
    	}
    	
    	if(obj.contentType==1){//外部链接
    		var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/;
    		if(!obj.urlPath ||!reg.test(obj.urlPath)){
    			Utils.showTip(false,"请填入以http://或https://开头的合法url");
    			return;
    		}
    	}
    	if(obj.contentType==0&&!obj.content){//富文本
    			Utils.showTip(false,"内容详情不能为空！");
    			return;
    	}else if(obj.content.length>15000){
			Utils.showTip(false,"内容详情超过限制长度！");
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
    	
    	$scope.aPPPushDatas=angular.copy(obj);
    	$('#viewAPPPush').modal(); 
    	Utils.showTip();
    };
    //关闭预览
    $scope.closeView = function(){
    	$('#viewAPPPush').modal('hide');
    };
    
    
    
    //保存
    $scope.saveAPPPush = function(obj){
    	if(obj.targetType==1 || obj.targetType==0){
        	obj.pushTargetId=$scope.groupIdStr;
    	}else if(obj.targetType==2){
    		var userEntity =  angular.fromJson(obj.searchUserEntity);
        	obj.pushTargetId=userEntity.userId;
        	obj.pushTargetName=userEntity.realname;
    	}
    	
    	obj.sendTime=$("input[name='sendTime']").val();
    	obj.urlPath=$("input[name='urlPath']").val();
    	obj.content = $("input[name='mpcontent']").val();
    	if(obj.targetType==0){
    		$scope.groupIdStr="";
    	}
    	if(obj.contentType==1){//外部链接
    		var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/;
    		if(!obj.urlPath ||!reg.test(obj.urlPath)){
    			Utils.showTip(false,"请填入以http://或https://开头的合法url");
    			return;
    		}
    	}
    	if(obj.contentType==0&&!obj.content){//富文本
    			Utils.showTip(false,"内容详情不能为空！");
    			return;
    	}else if(obj.content.length>15000){
    			Utils.showTip(false,"内容详情超过限制长度！");
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


    	
    	listAPPPushService.saveAPPPush(obj, function(){
    		$scope.tipMessage="操作成功！";
			$('#editTip').modal(); 
			setTimeout(function(){$('#editTip').modal(("hide"));}, 1000);
           $('#viewAPPPush').modal("hide"); 
           $('#editAPPPush').modal("hide"); 
           Utils.showTip();
           $scope.search();
        });
       
    };
    //删除
    $scope.delAPPPush = function(obj){
    	if(obj.pushStatus==0){
            ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
                listAPPPushService.delAPPPush({"id":obj.id},function(data){
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
    
    //查询
	$scope.searchUserFunc = function (searchUser){
		if(searchUser==undefined || searchUser.length==0){
			$scope.searchUserError=true;
			return;
		}else{
			$scope.searchUserError=false;
		}
		listAPPPushService.searchUser({ "condition":searchUser }, function(data){
	         if(data.result){
	         	$scope.userList=data.list;
	         }
	    });
	};
});

//业务类
app.factory('listAPPPushService', ['$http','$translate', function ($http,$translate) {
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
    
var saveAPPPush = function (postData,successCallback) {
    	$http({
    		method: 'POST',
    		url: path + "/mp/sendPushTask.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
    		data:$.param(postData),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    var delAPPPush = function (postData,successCallback) {
    	
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
    
    var getTreeList = function(postData,successCallback){
    	$http({
    		method: 'POST',
    		url: path + "/classifiedMessage/getTreeList.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
    		data:$.param(postData),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    
    var searchUser = function (condition,successCallback) {
    	$http({
			method: 'POST',
			url: path + "/notify/searchClientId.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
			data:$.param(condition)
		}).success(function(data) {
			 successCallback(data);
		});
    }
    
    
    
    return {
        list: function (postData,successCallback) {
            return list(postData,successCallback);
        },
        groupTreeListEx: function (postData,successCallback) {
        	return groupTreeListEx(postData,successCallback);
        },
        saveAPPPush: function (postData,successCallback) {
        	return saveAPPPush(postData,successCallback);
        },
        getPushTaskDetail: function (postData,successCallback) {
        	return getPushTaskDetail(postData,successCallback);
        },
        delAPPPush: function (postData,successCallback) {
        	return delAPPPush(postData,successCallback);
        },
        getTreeList: function (postData,successCallback) {
        	return getTreeList(postData,successCallback);
        },
        searchUser: function (condition,successCallback) {
            return searchUser(condition,successCallback);
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
});




