(function() {
	 'use strict';
	 var editUrl = '../nsAdmin/receptions/totalorder/';
	 app.controller('quoteDetailsCtrl',function($scope,$modal,$state,$stateParams,HttpUtils,ModalCtrl,modalCode,$element){
		
		$scope.id = $stateParams.id;
		$scope.defaultTabs = [true,false,false];
		if($stateParams.tab){
			$scope.defaultTabs[$stateParams.tab] = true;
		}
		
		$scope.entity = {};
		$scope.site = [];
		$scope.attachmentUrl = [];
		$scope.ratingFileUrl = [];
		$scope.commRating = {};
		
		initOrderData();
		
		//初始化参数
		function initOrderData() {
			if (!$stateParams.id) {
				return;
			}
			
			HttpUtils.get("/rec/order/findByOrderId", { orderId: $stateParams.id }, function (initData) {
				$scope.entity = initData.data.entity; 
				$scope.site = initData.data.processFlowDesc;
				$scope.attachmentUrl = initData.data.attachmentUrl;
				$scope.ratingFileUrl = initData.data.ratingFileUrl;
				$scope.commRating = initData.data.commRating;
			})
		}
	 });
})();



