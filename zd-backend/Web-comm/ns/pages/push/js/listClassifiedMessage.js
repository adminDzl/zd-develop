var app =  
angular.module('app');

app.controller('listClassifiedMessageController', function ($scope, listClassifiedMessageService,$translate,$sce,ModalCtrl,modalCode) {
	$scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: pageconfig.pageSize
    };

	$scope.search = function (){
	    var postData = {
	    	 page: $scope.paginationConf.currentPage,
             rows: $scope.paginationConf.itemsPerPage,
             searchStr : $scope.searchStr,
             type : $scope.type,

             status : 1
        };
   
	    listClassifiedMessageService.list(postData, function(data){
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
  //推送类型
    $scope.types = [
                          {value: '', text: '全部'},
                          {value: 0, text: '菜单'},
                          {value: 1, text: '推送类型'}
                          ];
    $scope.type='';
    
    //加载消息推送类型列表
    $scope.getTreeList = function(){
    	$scope.ClassifiedMessageList=[];
    	var postData = {

	    		type : 0//查询推送消息类型
	    };
    	listClassifiedMessageService.getTreeList(postData,function(data){
    		$scope.classifiedMessageList = data.list;
        });
    };
    
    $scope.getTreeList();
    
    $scope.toeditClassifiedMessage = function(obj){
    	$scope.classifiedMessageDatas={};
    	$scope.classifiedMessageDatas.imgUrl ='';
    	listClassifiedMessageService.getClassifiedMessage(obj,function(data){
        	$scope.classifiedMessageDatas = data.classifiedMessage;
        });
    	$('#editClassifiedMessage').modal(); 
    };

    //增加
    $scope.addClassifiedMessage = function(){
    	$scope.classifiedMessageDatas = {};
    	$scope.classifiedMessageDatas.type =0;
    	$scope.classifiedMessageDatas.imgUrl ='';
    	$('#editClassifiedMessage').modal(); 
    	Utils.showTip();
    };
    
    //保存
    $scope.saveClassifiedMessage = function(obj){
		var imgPath=$("input[name='imgUrlPicture']").val();
    	obj.imgUrl = imgPath;
    	listClassifiedMessageService.saveClassifiedMessage(obj, function(){
    		$scope.tipMessage="操作成功！";
			$('#editTip').modal(); 
           $('#editClassifiedMessage').modal("hide"); 
           Utils.showTip();
           $scope.search();
        });
    };
    
    //删除
    $scope.delClassifiedMessage = function(obj){
        ModalCtrl.show('提示','您确定要删除吗？',modalCode.default,function () {
            listClassifiedMessageService.delClassifiedMessage({"id":obj.id},function(data){
                if(data.result==true){
                    ModalCtrl.show('提示','删除成功！',modalCode.success);
                    $scope.search();
                }
            });
        });
    };
});

//业务类
app.factory('listClassifiedMessageService', ['$http','$translate', function ($http,$translate) {
    var list = function (postData,successCallback) {
    	$http({
			method: 'POST',
			url: path + "/classifiedMessage/getClassifiedMessageList.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data:$.param(postData),
			async: false
		}).success(function(data) {
			 successCallback(data);
		});
    };
    var saveClassifiedMessage = function (postData,successCallback) {
    	$http({
    		method: 'POST',
    		url: path + "/classifiedMessage/saveClassifiedMessage.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data:$.param(postData),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    var delClassifiedMessage = function (postData,successCallback) {
    	
    	$http({
    		method: 'POST',
    		url: path + "/classifiedMessage/deleteClassifiedMessage.json",
            headers : { 'Content-Type': 'application/x-www-form-urlencoded',Authorization:localStorage.token },
            data:$.param(postData),
    		async: false
    	}).success(function(data) {
    		successCallback(data);
    	});
    };
    
    var getClassifiedMessage = function(postData,successCallback){
    	
    	$http({
    		method: 'POST',
    		url: path + "/classifiedMessage/getClassifiedMessage.json",
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
    
    
    
    return {
        list: function (postData,successCallback) {
            return list(postData,successCallback);
        },
        saveClassifiedMessage: function (postData,successCallback) {
        	return saveClassifiedMessage(postData,successCallback);
        },
        getClassifiedMessage: function (postData,successCallback) {
        	return getClassifiedMessage(postData,successCallback);
        },
        delClassifiedMessage: function (postData,successCallback) {
        	return delClassifiedMessage(postData,successCallback);
        },
        getTreeList: function (postData,successCallback) {
        	return getTreeList(postData,successCallback);
        }
    };
}]);

app.filter("typeFilter",function(){
	return function(pushStatus){
		if(pushStatus==0){
			return "菜单";
		}else if(pushStatus==1){
			return "推送类型";
		}
	}
});