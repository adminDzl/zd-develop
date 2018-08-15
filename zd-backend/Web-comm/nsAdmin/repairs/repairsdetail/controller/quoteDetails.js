(function() {
	 'use strict';
	 var editUrl = '../nsAdmin/repairs/totalorder/';
	 app.controller('quoteDetailsCtrl',function($scope,$modal,$state,$stateParams,HttpUtils,ModalCtrl,modalCode,$element){
		 
		$scope.id = $stateParams.id;
		$scope.defaultTabs = [true,false,false];
		if($stateParams.tab){
			$scope.defaultTabs[$stateParams.tab] = true;
		}
		
		//type=all表示全部报事申请单，此界面进入隐藏详情页中的操作按钮
		$scope.type = $stateParams.type;
		$scope.site = {};
		$scope.form={};
		$scope.siteTrack = {};
		var picUrl =  undefined;
		//初始化参数
		function initOrderData(){
			var sendData = {
				id:$scope.id
		 	};
	 		HttpUtils.post("/pnc/orderchief/back/findById" , sendData ,function (data) {
	 			$scope.entity =data.data.entity; 
	 			$scope.site.processFlowDesc =data.data.processFlowDesc; 
	 			$scope.site.orderAttachments =data.data.attachmentURL; 
	 			$scope.site.orderTracks =data.data.orderTracks; 
	 			$scope.loginUserName = data.data.loginUserName;
	 		});
		}
		//订单轨迹
		function initOrderTrackData(){
			var sendData = {
				orderId:$scope.id
		 	};
	 		HttpUtils.post("/pnc/ordertrack/back/findOrderTrack" , sendData ,function (data) {
	 			//排序再组合
	 			$scope.siteTrack.orderTracks = listSort(data.data.orderTracks);
	 			
	 		});
		}
		//历史轨迹
		function initHistoryData(){
			var sendData = {
				orderId:$scope.id
		 	};
	 		HttpUtils.post("/pnc/ordertrack/back/findOrderAllProcessRecord" , sendData ,function (data) {
	 			$scope.site.orderProcessRecordList =data.data.orderProcessRecordList; 
	 		});
		}
		//下一步
		function initNextStepData(){
			var sendData = {
				orderId:$scope.id
	 		};
	 		HttpUtils.post("/pnc/orderchief/back/findNextStep" , sendData ,function (data) {
	 			$scope.siteTrack.nextStatusdData = data.data.nextStatusdData;
	 			$scope.form.nextOrderStatus = data.data.nextStatusdData.id;
	 		});
		}
		
		initOrderData();
		initOrderTrackData();
		initHistoryData();
		initNextStepData();
		

		function listSort(list){
			var arr = new Array();
			angular.forEach(list, function(en){
				var num = en.orderStatus-1;
				if(arr[num]){
					var li = arr[num];
					li.list.push(en);
					arr[num]=li;
				}else{
					var e ={
						text:en.orderStatusName,
						list:[en],
					};
					arr[num]=e;
				}
			});
			var ret = new Array();
			angular.forEach(arr, function(en){
				if(en && en.text){
					ret.push(en);
				}
			});
			console.log(ret);
			return ret;
		}
		
		
		//分配
		$scope.alloctOrder = function(){
			var site = {
    			title:'分配报事单',
    			orderId:$scope.entity.id,
    			orderStatus:$scope.entity.orderStatus,
    			userName:$scope.loginUserName,
    			refresh:function () {
    				initOrderData();
    				initOrderTrackData();
    				initHistoryData();
    			}
    		};
	    	$modal.open({
	            templateUrl: editUrl + 'quote_allocation.html',
	            controller: 'AlloctOrderCtrl',
    			controllerAs:'mm',
	            resolve: {
	                site: function () {
	                    return site;
	                }
	            }
	        });
		};
		//接单
		$scope.receivingOrder = function(){
			var site = {
    			title:'接单',
    			userName:$scope.loginUserName,
    			orderNum:$scope.entity.orderNum,
    			orderId:$scope.entity.id,
    			refresh:function () {
    				initOrderData();
    				initOrderTrackData();
    				initHistoryData();
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
		
		//订单处理
		$scope.getImgs = function (datas) {
			picUrl = datas;
        };

		function getUrlsToDatas(urls) {
            var datas = [];
            angular.forEach(urls,function (v) {
                datas.push({bigImgUrl:v.attachmentUrl});
            });
            return datas;
        };
        //保存或下一步
        $scope.addSaveAndNext = function(form,type){
			if(!form.remark || form.remark.length == 0){
				ModalCtrl.show('提示','请输入处理内容！',modalCode.info);
				return;
			};		
			var sendData = {
				orderId:$scope.entity.id,
				remark:form.remark,
				operateType:type,
				nextOrderStatus:form.nextOrderStatus
	 		};
			sendData.attachmentJson = JSON.stringify(getUrlsToDatas(picUrl));
			
	 		HttpUtils.post("/orderchief/processOrder.do" , sendData ,function (data) {
	 			if(data.errorMsg){
	 				ModalCtrl.show('提示',data.errorMsg,modalCode.info); 	
					return;
	 			}
	 			initOrderData();
				initOrderTrackData();
				initHistoryData();
				ModalCtrl.show('提示','处理成功！',modalCode.success);
				
				$state.go('app.quote_details',{id:$stateParams.id,v:+ Math.floor(Date.now() / 1000),tab:1});
	 		});
		};
		
		//退回
		$scope.addSaveBack = function(form){
			if(!form.remark || form.remark.length == 0){
				ModalCtrl.show('提示','请输入备注！',modalCode.info);
				return;
			}
			var sendData = {
				orderId:$scope.entity.id,
				remark:form.remark
	 		};
			sendData.attachmentJson = JSON.stringify(getUrlsToDatas(picUrl));
			
	 		HttpUtils.post("/orderchief/returnOrder.do" , sendData ,function (data) {
	 			if(data.errorMsg){
	 				ModalCtrl.show('提示',data.errorMsg,modalCode.info); 	
					return;
	 			}
	 			initOrderData();
				initOrderTrackData();
				initHistoryData();
				ModalCtrl.show('提示','退回成功！',modalCode.success);
	 		});
		};
		//关闭订单
		$scope.cancelOrder = function(){
			ModalCtrl.show('提示','是否关闭订单！',modalCode.info,cancelOrderDo);
		};
		
		function cancelOrderDo(){
			var sendData = {
				orderId:$scope.entity.id
	 		};
	 		HttpUtils.post("/orderchief/cancelOrder.do" , sendData ,function (data) {
	 			mm.site.refresh();
				ModalCtrl.show('提示','关闭订单成功！',modalCode.success);
				$modalInstance.close();
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
	
	app.controller('AlloctOrderCtrl',function (site,modalCode,ModalCtrl,HttpUtils,$modalInstance) {
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
		
	});
		
		
		
		
})();



