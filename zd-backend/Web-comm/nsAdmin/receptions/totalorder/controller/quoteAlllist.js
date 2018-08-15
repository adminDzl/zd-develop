/**
 * 公务接待
 */
(function(){
	
	'use strict';
	var receptionsUrl = '../nsAdmin/receptions/totalorder/';
	app.controller('QuoteListCtrl',function($scope,$modal,$state,HttpUtils,ModalCtrl,modalCode,$element,$filter){
		
		var currKeys = undefined;
		$scope.site = {};
		$scope.form={};
		
		$scope.paginationConf = {
	    	pageSize: 10,
	        currentPage: 1
	    };
		
		getSearchList();
		
		//查询列表
		var flag = false;
		$scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
			 if(flag){
				 getSearchList();
			 }
	    });
		
		function dataGrid(){
			//查询其它筛选条件
			flag = false;
			$scope.paginationConf.pageSize = 10; 
			$scope.paginationConf.currentPage = 1;
			getSearchList();
 			flag = true;
		}
		
		//查询列表
	    function getSearchList() {
	    	
	    	var time = $scope.dateTime ? $scope.dateTime.split(' - '):[];
	    	$scope.form.startTime = time[0];
	    	$scope.form.endTime =time[1];
	    	
			var sendData = {
				orderStatus:$scope.form.orderStatus,
				startTime:$scope.form.startTime,
				endTime:$scope.form.endTime,
				otherSearchText:currKeys,
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		};
	 		HttpUtils.post("/rec/order/list" , sendData ,function (data) {
				 console.log(data.data.page);
	 			$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.site.rows = data.data.page.rows;
	 			setTrtackHtml();
	 		});
		}
	    
	    //搜索
	    $scope.search = function (keys,e) {
	    	if(e && e.keyCode !== 13)
	 			return;
	    	currKeys = keys;
	 		$scope.paginationConf.currentPage == 1 ? getSearchList() : $scope.paginationConf.currentPage = 1, flag=true;
	 	};
		
	 	function dataUtil(num){
	    	var myDate = new Date();
	    	myDate.setHours(23, 59, 0, 0);
	    	
	    	var oldDateTime = (new Date(myDate.getTime()-((num-1)*24*60*60*1000)));
	    	oldDateTime.setHours(0, 0, 0, 0);  
	    	
	    	var startDate = $filter('date')(oldDateTime,'yyyy-MM-dd HH:mm:ss');
	    	var endDate = $filter('date')(myDate,'yyyy-MM-dd HH:mm:ss');
	    	
	    	$("#searchDate").daterangepicker({startDate:startDate, endDate:endDate});
	    	$scope.dateTime = startDate +' - '+ endDate;
	   }
	 	
	 	//日期范围初始化
	    $scope.dateRangeOptions = {
	            format: "YYYY-MM-DD HH:mm:ss",
	            showDropdowns : true,//显示年月下拉选择     	                
	            timePicker: true,//显示时间选择
	            timePicker12Hour:false,//是否显示12小时制
	            timePickerIncrement : 10, //时间增量，单位为分钟
	            locale : {  
	            	applyLabel : '确定',  
	                cancelLabel : '取消',  
	                fromLabel : '起始时间',  
	                toLabel : '结束时间',  
	                customRangeLabel : '自定义',  
	                daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
	                monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
	                             '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
	                
	                firstDay : 1  
	            }
	    };
	    
	    //订单详情
	    $scope.details = function (row) {
	    	var site ={};
	    	site.id = row.id;
	    	$state.go('app.receptions_detail',site);
		};
	 	
		function setTrtackHtml(){
	    	angular.forEach($scope.site.rows, function(row){
	    		var html = '<div class="details_title">'+row.orderStatusName+'</div>';
	    		angular.forEach(row.orderTracksOfOrderStatus, function(item){
	    			var ele ='<div class="custom_txt">'+
	    						'<div>'+
	    					  		'<span>'+item.processUserTypeName+' '+item.processUserName+'</span>'+
	    					  		'<span class="custom_txtstyle">'+item.prefixContent+'</span>'+
	    					  	'</div>'+
	    					  	'<div>'+
	    					  	'<span>操作：<em style="color: #ff9900;">'+item.operateRemark+'</em></span>'+
	    					  	'</div>'+
	    					  '</div>'+
	    					  '<div style="clear: both;"></div>'+
	    					  '<span class="custom_time">'+item.processTime+'</span>';
	    			html += ele;
	    		});
	    		row.orderTracksHtml = html;
	    	});
	    }
		
	});
	
})()