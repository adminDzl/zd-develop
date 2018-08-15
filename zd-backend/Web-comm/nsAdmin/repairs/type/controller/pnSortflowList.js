/**
 * 服务流程
 */
(function(){
	'use strict'
	
	app.controller('SortFlowListCtrl',function($scope,$modal,$state,$filter,$rootScope,$stateParams,Project,HttpUtils,ModalCtrl,modalCode){
		var count = 3;
		$scope.initPage = function(){
			if(!$stateParams.chiefId){
				return;
			}
			
			//审核流程
			HttpUtils.post('/sortflow/listByChiefId.do',{chiefId:$stateParams.chiefId},function (data) {
				$scope.flowItemList = data.flowList;
				angular.forEach($scope.flowItemList,function(flow,i){
					flow.isEdit = true;
					if(i < 4 || i>$scope.flowItemList.length-3){
						flow.isEdit = false;
					}
				});
			})
			
			//
			HttpUtils.post('/sortflow/checkSortFlowAlreadyUsed.do',{chiefId:$stateParams.chiefId},function (data) {
				$scope.sortFlowAlreadyUsed = data.sortFlowAlreadyUsed;
			})			
		}
		$scope.initPage();
		
		$scope.addNew = function(){
			if($scope.flowItemList && $scope.flowItemList.length > 5){
				count = $scope.flowItemList.length-3;
			}
			count++;
			$scope.flowItemList.splice(count,0,{isEdit:true});
		}
		
		$scope.deleteItem = function(index){
			ModalCtrl.show('提示','确认删除?',modalCode.info,function () {
				if(!$scope.deleteFlowList){
					$scope.deleteFlowList = [];
				}
				$scope.deleteFlowList.push($scope.flowItemList[index]);			
				$scope.flowItemList.splice(index,1);
			})
		}

	    //保存流程与审核
	    $scope.baseFlowFormSubmit = function(){
	    	var validateNull = false;
	    	angular.forEach($scope.flowItemList,function(obj,i){
	    		if(!obj.name){
	    			validateNull = true;
	    		}
	    	});
	    	if(validateNull){
	    		ModalCtrl.show('提示','流程名称不能为空！',modalCode.info);
	    		return;
	    	}
	    	
	    	var flowData = {};
	    	flowData.sortChiefId = $stateParams.chiefId;
	    	flowData.deletedFlowItemJson = JSON.stringify($scope.deleteFlowList);
	    	$.each($scope.flowItemList,function(i,order){
	    		flowData['flowList['+i+'].id'] = order.id;
	    		flowData['flowList['+i+'].sortChiefId'] = $stateParams.chiefId;
	    		flowData['flowList['+i+'].orderNo'] = i+1;
	    		flowData['flowList['+i+'].name'] = order.name;
	    		flowData['flowList['+i+'].frontName'] = order.frontName;
	    		flowData['flowList['+i+'].backName'] = order.backName;
	    	})
			HttpUtils.post('/sortflow/updateSave.do',flowData,function (responseResult) {
				ModalCtrl.show('消息提示','保存成功！',modalCode.success);
				$scope.initPage();
			})		    	
	    }
		   
	})
})()
