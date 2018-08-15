/**
 * 全部报事单
 */
(function(){
	
	'use strict';
	var editUrl = '../nsAdmin/repairs/totalorder/';
	app.controller('QuoteListCtrl',function($scope,$modal,$state,HttpUtils,ModalCtrl,modalCode,$element,$filter){
		
		var currKeys = undefined;
		$scope.site = {};
		$scope.form={};
		
		$scope.paginationConf = {
	    	pageSize: 10,
	        currentPage: 1
	    };
		//查询列表
		var flag = false;
		$scope.$watch('paginationConf.currentPage + paginationConf.pageSize', function () {
			 if(flag){
				 getAreaList();
			 }
	    });
	   
		//初始化参数
		function initParam(){
			var sendData = {
				orderType:0
		 	};
	 		HttpUtils.post("/pnc/orderchief/back/findSortChiefData" , {} ,function (data) {
				 console.log(data);
	 			if(data.data.sortChiefCombox){
	 				$scope.site.sortChiefCombox =data.data.sortChiefCombox; //获取一级分类
	 				$scope.site.areaCombox =data.data.areaCombox; //区域
		 			//$scope.form.sortChiefId = $scope.site.sortChiefCombox[0].id; 
		 			dataGrid();
	 			}
	 		});
		}
		
		initParam();
		
		function dataGrid(){
			//查询其它筛选条件
			flag = false;
			$scope.paginationConf.pageSize = 10; 
			$scope.paginationConf.currentPage = 1;
 			getAreaList();
 			flag = true;
		}
		
		 

		//查询其它筛选条件
		function initOtherParam(){
			var sendData = {
				chiefId:$scope.form.sortChiefId
			};
			HttpUtils.post("/pnc/orderchief/back/findSubChiefByChiefId" , sendData ,function (data) {
	 			$scope.site.sortSubCombox =data.data.sortSubCombox;
	 			$scope.site.orderStatusList = data.data.orderStatusList;
	 		});
		}
		
		$scope.site.orgList=[{
			id:1, 
			text:'员工自建'
		},{
			id:2,
			text:'用户提出'
		}];
		
		$scope.changeParam = function(id){
			if(id){
				$scope.form.sortChiefId = id;
				initOtherParam();
			}else{
				$scope.site.sortSubCombox ="";
	 			$scope.site.orderStatusList = "";
			}
		};
		
		
		//查询列表
	    function getAreaList() {
	    	var time = $scope.dateTime ? $scope.dateTime.split(' - '):[];
	    	$scope.form.startTime = time[0];
	    	$scope.form.endTime =time[1];
	    	
			var sendData = {
				sortChiefId:$scope.form.sortChiefId,
				sortSubId:$scope.form.sortSubId,
				orderStatus:$scope.form.orderStatus,
				orderSource:$scope.form.orderSource,
				startTime:$scope.form.startTime,
				endTime:$scope.form.endTime,
				overtimeFlag:$scope.form.endDateFlag,
				areaChiefId:$scope.form.areaChiefId,
				//orderType:$scope.form.orderType,
				otherSearchText:currKeys?currKeys.split(' ').join('+'):'',
	 			pageNo: $scope.paginationConf.currentPage,
	 			pageSize: $scope.paginationConf.pageSize
	 		};
	 		HttpUtils.post("/pnc/orderchief/back/list" , sendData ,function (data) {
				 console.log(data.data.page);
	 			$scope.paginationConf.totalItems =data.data.page.total;
	 			$scope.site.rows = data.data.page.rows;
	 			$scope.loginUserId = "";
	 			$scope.loginUserName = "";
	 			setTrtackHtml();
	 		});
		}

		$scope.$watch('dateTime', function () {
            var str = $scope.dateTime;
            var timeList = str.split(" - ");
            $scope.form.startTime = timeList[0];
            $scope.form.endTime = timeList[1];
            getAreaList();
        });

	    
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
		
	    //搜索
	    $scope.search = function (keys,e) {
	    	if(e && e.keyCode !== 13)
	 			return;
	    	currKeys = keys;
	    	
	 		$scope.paginationConf.currentPage == 1 ? getAreaList() : $scope.paginationConf.currentPage = 1;
	 	};
	    
	    //超期
	    $scope.dateOut = function (flag,type){
	    	
	    	$scope.flag1 = false;
	    	$scope.flag2 = false;
	    	
	    	if(type == 0){
	    		$scope.flag1 = !flag;
	    	}else{
	    		$scope.flag2 = !flag;
	    	}
	    	
	    	if(!flag){
	    		$scope.form.endDateFlag=type;
	    	}else{
	    		$scope.form.endDateFlag='';
	    	}
	    	$scope.search();
	    };
		
		
		
	    
	    
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
	    
	    $scope.nearDay = function(num){
			dataUtil(num);
	    	$scope.search();
	    };
	    
	    //导出
	    $scope.exportOrder = function(){
	    	var time = $scope.dateTime ? $scope.dateTime.split(' - '):[];
	    	$scope.form.startTime = time[0];
	    	$scope.form.endTime = time[1];
	    	
			var sendData = {
				sortChiefId:$scope.form.sortChiefId,
				sortSubId:$scope.form.sortSubId,
				orderStatus:$scope.form.orderStatus,
				orderSource:$scope.form.orderSource,
				startTime:$scope.form.startTime,
				endTime:$scope.form.endTime,
				endDateFlag:$scope.form.endDateFlag,
				orderType:$scope.form.orderType,
				otherSearchText:currKeys?currKeys.split(' ').join('+'):''
	 		};
	 		HttpUtils.post("/orderchief/back/exportOrder" , sendData ,function (data) {
	 			var filename = data.filename;
	 			if(filename){
	 				window.open("../../../"+ filename);
	 			}
	 		});
	    };
	    
	    //接单
	    $scope.receiving = function(row){
	    	var site = {
    			title:'接单',
    			userName:$scope.loginUserName,
    			orderNum:row.orderNum,
    			orderId:row.id,
    			refresh:function () {
    				getAreaList();
    			}
    		};
	    	$modal.open({
	            templateUrl: editUrl+'quote_receiving.html',
	            controller: 'ReceivCtrl',
    			controllerAs:'mm',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        });
	    };
	    
	    //处理
	    $scope.dispose = function(row){
	    	var site = {
    			title:'处理',
    			orderId:row.id,
    			refresh:function () {
    				getAreaList();
    			}
    		};
	    	$modal.open({
	            templateUrl: editUrl+'quote_dispose.html',
	            controller: 'DisposeCtrl',
    			controllerAs:'mm',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        });
	    };
	    
	    //订单详情
	    $scope.details = function (row) {
	    	
	    	var site ={};
	    	site.id = row.id;
	    	$state.go('app.quote_details',site);
		};
		//退回操作
	    $scope.back = function(row){
	    	var site = {
    			title:'退回',
    			orderId:row.id,
    			refresh:function () {
    				getAreaList();
    			}
    		};
	        $modal.open({
	            templateUrl: editUrl+'quote_back.html',
	            controller: 'BackCtrl',
    			controllerAs:'mm',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        });
	    };
	    
	    //关闭订单
	    $scope.cancelOrder = function(row){
			ModalCtrl.show('提示','是否关闭订单！',modalCode.info,function(){
				var sendData = {
						orderId:row.id
					};
			 		HttpUtils.post("/orderchief/back/cancelOrder" , sendData ,function (data) {
			 			getAreaList();
						ModalCtrl.show('提示','关闭订单成功！',modalCode.success);
			 		});
			});
		};
	    
	    //分配
	    $scope.allocation = function(row){
	    	var site = {
    			title:'分配报事单',
    			orderId:row.id,
    			orderStatus:row.orderStatus,
    			userName:$scope.loginUserName,
    			refresh:function () {
    				getAreaList();
    			}
    		};
	    	$modal.open({
	            templateUrl: editUrl+'quote_allocation.html',
	            controller: 'AllocatioCtrl',
    			controllerAs:'mm',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        });
	    };
	});
	
	//接单
	app.controller('ReceivCtrl',function ($filter,site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		
		var mm = this;
		mm.form = {};
		mm.site = site;
		if(mm.site.orderNum){
			mm.site.orderNum = "报事单号:" + mm.site.orderNum;
		};
		mm.close = function () {
			$modalInstance.close();
		};	
		
		//时间控件start
		mm.dateRangeOptions = {
			format: "YYYY-MM-DD HH:mm:ss",
	        singleDatePicker:true, 
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
		mm.addSave = function(form){
			
			if(!form.planFinishTime || form.planFinishTime.length == 0){
				ModalCtrl.show('提示','请选择计划完成时间！',modalCode.info);
				return;
			}
			
			var sendData = {
				orderId:mm.site.orderId,
				planFinishTime:form.planFinishTime
	 		};
	 		HttpUtils.post("/orderchief/takeOrder.do" , sendData ,function (data) {
	 			if(data.errorMsg){
	 				ModalCtrl.show('提示',data.errorMsg,modalCode.info); 	
					return;
	 			}
	 			mm.site.refresh();
				ModalCtrl.show('提示','接单成功！',modalCode.success);
				$modalInstance.close();
	 		});
		};
	});
	
	//退回
	app.controller('BackCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		
		var mm = this;
		mm.form = {};
		mm.site = site;
		var picUrl =  undefined;
		
		function getUrlsToDatas(urls) {
            var datas = [];
            angular.forEach(urls,function (v) {
                datas.push({bigImgUrl:v.attachmentUrl});
            });
            return datas;
        };
        mm.getImgs = function (datas) {
			picUrl = datas;
        };
		
		mm.addSave = function(form){
			if(!form.remark || form.remark.length == 0){
				ModalCtrl.show('提示','请输入备注！',modalCode.info);
				return;
			}
			var sendData = {
				orderId:mm.site.orderId,
				remark:form.remark
	 		};
			sendData.attachmentJson = JSON.stringify(getUrlsToDatas(picUrl));
			
	 		HttpUtils.post("/orderchief/returnOrder.do" , sendData ,function (data) {
	 			mm.site.refresh();
				ModalCtrl.show('提示','退回成功！',modalCode.success);
				$modalInstance.close();
	 		});
		};
		mm.close = function () {
			$modalInstance.close();
		};
	});
	//处理
	app.controller('DisposeCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		
		var mm = this;
		mm.form = {};
		mm.site = site;
		var picUrl =  undefined;
		//初始化
		function initData(){
			var sendData = {
				orderId:mm.site.orderId
	 		};
	 		HttpUtils.post("/orderchief/findNextStep.do" , sendData ,function (data) {
	 			mm.site.nextStatusdData = data.nextStatusdData;
	 			mm.form.nextOrderStatus = data.nextStatusdData.id;
	 		});
		}
		initData();
		
		function getUrlsToDatas(urls) {
            var datas = [];
            angular.forEach(urls,function (v) {
                datas.push({bigImgUrl:v.attachmentUrl});
            });
            return datas;
        };
        mm.getImgs = function (datas) {
			picUrl = datas;
        };
		//保存或下一步
		mm.addSave = function(form,type){
			if(!form.remark || form.remark.length == 0){
				ModalCtrl.show('提示','请输入处理内容！',modalCode.info);
				return;
			};		
			var sendData = {
				orderId:mm.site.orderId,
				remark:form.remark,
				operateType:type,
				nextOrderStatus:form.nextOrderStatus
	 		};
			sendData.attachmentJson = JSON.stringify(getUrlsToDatas(picUrl));
			
	 		HttpUtils.post("/orderchief/processOrder.do" , sendData ,function (data) {
	 			mm.site.refresh();
				ModalCtrl.show('提示','处理成功！',modalCode.success);
				$modalInstance.close();
	 		});
		};
		//关闭订单
		mm.cancelOrder = function(){
			ModalCtrl.show('提示','是否关闭订单！',modalCode.info,cancelOrderDo);
		};
		
		function cancelOrderDo(){
			var sendData = {
				orderId:mm.site.orderId
	 		};
	 		HttpUtils.post("/orderchief/cancelOrder.do" , sendData ,function (data) {
	 			mm.site.refresh();
				ModalCtrl.show('提示','关闭订单成功！',modalCode.success);
				$modalInstance.close();
	 		});
		};
		mm.close = function () {
			$modalInstance.close();
		};
	});
	
	app.controller('AllocatioCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
		var mm = this;
		mm.form = {};
		mm.site = site;
		mm.allotKeys = '';
		mm.TransferKeys = '';
		var ch = undefined;
		var ch2 = undefined;
		//初始化-分配下属
		function initAllotData(){
			var sendData = {
				orderId:mm.site.orderId,
				mobile:mm.allotKeys
	 		};
	 		HttpUtils.post("/orderchief/findSubordinate.do" , sendData ,function (data) {
	 			if(data.errorMsg){
	 				ModalCtrl.show('提示',data.errorMsg,modalCode.info); 	
					return;
	 			}
	 			mm.site.subordinateList = data.subordinateList;
	 		});
		}
		//初始化--移交
		function initTransferData(){
			var sendData = {
				orderId:mm.site.orderId,
				mobile:mm.TransferKeys
	 		};
	 		HttpUtils.post("/orderchief/findSameLevel.do" , sendData ,function (data) {
	 			if(data.errorMsg){
	 				ModalCtrl.show('提示',data.errorMsg,modalCode.info); 	
					return;
	 			}
	 			mm.site.showType = data.type;
	 			mm.site.sameLevelUserList = data.sameLevelUserList;
	 		});
		}
		initAllotData();
		initTransferData();

		//搜索
		mm.searchAllot = function(keys,e){
			if(e && e.keyCode !== 13)
	 			return;
			mm.allotKeys = keys;
			initAllotData();
		};
		mm.searchTransfer = function(keys,e){
			if(e && e.keyCode !== 13)
	 			return;
			mm.TransferKeys = keys;
			initTransferData();
		};
		
		//选择人--单选
		mm.chooseUser = function(item){
			if(ch){
	        	if(ch == item){
	            	ch.isChoose = !ch.isChoose;
	            }else{
	            	ch.isChoose = false;
	                ch = item;
	                ch.isChoose = true;
	            }
	        }else{
	        	ch = item;
	        	ch.isChoose = true;
	        }
		};
		
		mm.chooseUserOther = function(item,userId){
			if(ch2){
	        	if(ch2 == item){
	            	ch2.isChoose = !ch2.isChoose;
	            }else{
	            	ch2.isChoose = false;
	                ch2 = item;
	                ch2.isChoose = true;
	            }
	        }else{
	        	ch2 = item;
	        	ch2.isChoose = true;
	        }
			ch2.userId = userId;
		};
		
		//分配保存
		mm.addSaveAllot = function(){
			
			//检测数据
			if(!ch || !ch.userId){
				ModalCtrl.show('提示','请选择 处理人！',modalCode.warning); 	
				return;
			}
			
			var sendData = {
				orderId:mm.site.orderId,
				userId:ch.userId
	 		};
			
	 		HttpUtils.post("/orderchief/assignToSubordinate.do" , sendData ,function (data) {
	 			mm.site.refresh();
				ModalCtrl.show('提示','分配成功！',modalCode.success);
				$modalInstance.close();
	 		});
		};
		
		//移交保存
		mm.addSaveTransfer = function(form){
			
			//检测数据
			if(!ch2 || !ch2.userId){
				ModalCtrl.show('提示','请选择处理人！',modalCode.warning);
				return;
			}
			
			var sendData = {
				orderId:mm.site.orderId,
				userId:ch2.userId,
				remark:form.remark
	 		};
			
	 		HttpUtils.post("/orderchief/shiftToSameLevel.do" , sendData ,function (data) {
	 			mm.site.refresh();
				ModalCtrl.show('提示','移交成功！',modalCode.success);
				$modalInstance.close();
	 		});
		};
		
		//申请协助办理
		mm.invitedAssist = function(form,type){
			var userId = '';
			if(type==1 && ch){
				userId = ch.userId;
			}else if(type==2 && ch2){
				userId = ch2.userId;
			}
			
			//检测数据
			if(!userId){
				ModalCtrl.show('提示','请选择协助人！',modalCode.warning);
				return;
			}
			if(type==2 && !form.remark){
				ModalCtrl.show('提示','请输入备注！',modalCode.warning);
				return;
			}
			
			var sendData = {
				orderId:mm.site.orderId,
				userId:userId,
				remark:form.remark
	 		};
			
	 		HttpUtils.post("/orderchief/invitedAssist.do" , sendData ,function (data) {
	 			mm.site.refresh();
				ModalCtrl.show('提示','申请协助办理成功！',modalCode.success);
				$modalInstance.close();
	 		});
		};

		mm.close = function () {
			$modalInstance.close();
		};
		
		
//		//测试数据
//		mm.site.subordinateList = [
//           {   userId:1,
//        	   userName:'下属1'
//           },{
//        	   userId:2,
//        	   userName:'下属2'
//           },{
//        	   userId:3,
//        	   userName:'下属3'
//           },{
//        	   userId:4,
//        	   userName:'下属4'
//           },{
//        	   userId:5,
//        	   userName:'下属5'
//           },{
//        	   userId:6,
//        	   userName:'下属6'
//           },{
//        	   userId:7,
//        	   userName:'下属7'
//           }
//       ];
//		mm.site.showType = 1;
//		//队长级别
//		mm.site.sameLevelUserList0=[
//		   {   principalId:1,
//			   principalName:'队长1'
//           },{
//        	   principalId:2,
//        	   principalName:'队长2'
//           },{
//        	   principalId:3,
//        	   principalName:'队长3'
//           },{
//        	   principalId:4,
//        	   principalName:'队长4'
//           },{
//        	   principalId:5,
//        	   principalName:'队长5'
//           },{
//        	   principalId:6,
//        	   principalName:'队长6'
//           }
//		];
//		//搬运工级别
//		mm.site.sameLevelUserList1=[
//		   {   userId:1,
//        	   userName:'搬运工1'
//           },{
//        	   userId:2,
//        	   userName:'搬运工2'
//           },{
//        	   userId:3,
//        	   userName:'搬运工3'
//           },{
//        	   userId:4,
//        	   userName:'搬运工4'
//           },{
//        	   userId:5,
//        	   userName:'搬运工5'
//           },{
//        	   userId:6,
//        	   userName:'搬运工6'
//           }
//		];
		
		
		
	});
	
})()